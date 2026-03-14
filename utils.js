// ============================================
// UTILITY FUNCTIONS MODULE
// FUNGSI-FUNGSI PEMBANTU
// Copyright © VROZZ
// ============================================

const Utils = {
    // Generate random ID
    generateId: (prefix = 'ID') => {
        return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Sleep for ms
    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    
    // Get current timestamp
    now: () => Date.now(),
    
    // Format date
    formatDate: (timestamp, format = 'default') => {
        const date = new Date(timestamp);
        
        switch(format) {
            case 'iso':
                return date.toISOString();
            case 'local':
                return date.toLocaleString();
            case 'time':
                return date.toLocaleTimeString();
            case 'date':
                return date.toLocaleDateString();
            default:
                return date.toString();
        }
    },
    
    // Get browser info
    getBrowserInfo: () => {
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
            product: navigator.product,
            appVersion: navigator.appVersion,
            appName: navigator.appName,
            appCodeName: navigator.appCodeName
        };
    },
    
    // Get screen info
    getScreenInfo: () => {
        return {
            width: screen.width,
            height: screen.height,
            availWidth: screen.availWidth,
            availHeight: screen.availHeight,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth,
            orientation: screen.orientation ? screen.orientation.type : 'unknown'
        };
    },
    
    // Get geolocation
    getGeolocation: () => {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                resolve({ error: 'Geolocation not supported' });
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    resolve({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                        accuracy: pos.coords.accuracy,
                        altitude: pos.coords.altitude,
                        altitudeAccuracy: pos.coords.altitudeAccuracy,
                        heading: pos.coords.heading,
                        speed: pos.coords.speed,
                        timestamp: pos.timestamp
                    });
                },
                (err) => {
                    resolve({ error: err.message });
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    },
    
    // Get battery info
    getBatteryInfo: async () => {
        if (!navigator.getBattery) {
            return { error: 'Battery API not supported' };
        }
        
        try {
            const battery = await navigator.getBattery();
            return {
                level: battery.level * 100 + '%',
                charging: battery.charging,
                chargingTime: battery.chargingTime,
                dischargingTime: battery.dischargingTime
            };
        } catch (e) {
            return { error: e.message };
        }
    },
    
    // Get network info
    getNetworkInfo: async () => {
        const info = {};
        
        // Connection API
        if (navigator.connection) {
            info.connection = {
                type: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt,
                saveData: navigator.connection.saveData
            };
        }
        
        // Get public IP
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            info.ip = data.ip;
        } catch (e) {
            info.ip = 'unknown';
        }
        
        return info;
    },
    
    // Get clipboard text
    getClipboard: async () => {
        try {
            const text = await navigator.clipboard.readText();
            return { text: text };
        } catch (e) {
            return { error: e.message };
        }
    },
    
    // Set clipboard text
    setClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return { success: true };
        } catch (e) {
            return { error: e.message };
        }
    },
    
    // Vibrate device
    vibrate: (pattern) => {
        if (!navigator.vibrate) {
            return { error: 'Vibration not supported' };
        }
        
        navigator.vibrate(pattern);
        return { success: true };
    },
    
    // Get all cookies
    getCookies: () => {
        return document.cookie;
    },
    
    // Get localStorage
    getLocalStorage: () => {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data[key] = localStorage.getItem(key);
        }
        return data;
    },
    
    // Get sessionStorage
    getSessionStorage: () => {
        const data = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            data[key] = sessionStorage.getItem(key);
        }
        return data;
    },
    
    // Clear all storage
    clearStorage: () => {
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear cookies (by expiring them)
        document.cookie.split(';').forEach(c => {
            document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });
        
        return { success: true };
    },
    
    // Download file from URL
    downloadFile: (url, filename = '') => {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || url.split('/').pop() || 'download';
        a.click();
        return { success: true, filename: a.download };
    },
    
    // Download data as file
    downloadData: (data, filename = 'data.txt', type = 'text/plain') => {
        const blob = new Blob([data], { type: type });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        
        URL.revokeObjectURL(url);
        
        return { success: true, filename: filename };
    },
    
    // File to Base64
    fileToBase64: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    },
    
    // Base64 to Blob
    base64ToBlob: (base64, type = 'application/octet-stream') => {
        const byteCharacters = atob(base64.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: type });
    },
    
    // Generate random string
    randomString: (length = 10) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },
    
    // Generate random number
    randomNumber: (min = 0, max = 100) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // Get URL parameters
    getUrlParams: () => {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        
        for (const [key, value] of params) {
            result[key] = value;
        }
        
        return result;
    },
    
    // Check if element exists
    elementExists: (selector) => {
        return document.querySelector(selector) !== null;
    },
    
    // Get all inputs
    getAllInputs: () => {
        const inputs = document.querySelectorAll('input, textarea, select');
        return Array.from(inputs).map(input => ({
            type: input.type || input.tagName,
            name: input.name,
            id: input.id,
            value: input.value,
            checked: input.checked,
            disabled: input.disabled,
            readonly: input.readOnly
        }));
    },
    
    // Get all forms data
    getAllFormsData: () => {
        const forms = document.forms;
        const result = [];
        
        for (let i = 0; i < forms.length; i++) {
            const form = forms[i];
            const formData = new FormData(form);
            const data = {};
            
            for (const [key, value] of formData) {
                data[key] = value;
            }
            
            result.push({
                id: form.id,
                name: form.name,
                action: form.action,
                method: form.method,
                data: data
            });
        }
        
        return result;
    },
    
    // Check if mobile
    isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // Check if iOS
    isIOS: () => {
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    },
    
    // Check if Android
    isAndroid: () => {
        return /Android/.test(navigator.userAgent);
    },
    
    // Check if Windows
    isWindows: () => {
        return /Windows/.test(navigator.userAgent);
    },
    
    // Check if Mac
    isMac: () => {
        return /Mac/.test(navigator.userAgent);
    },
    
    // Check if Linux
    isLinux: () => {
        return /Linux/.test(navigator.userAgent) && !/Android/.test(navigator.userAgent);
    },
    
    // Encode HTML special characters
    escapeHtml: (text) => {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    },
    
    // Decode HTML entities
    unescapeHtml: (text) => {
        const map = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#039;': "'"
        };
        return text.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) { return map[m]; });
    },
    
    // Validate email
    isValidEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Validate phone number (Indonesia)
    isValidPhone: (phone) => {
        const re = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;
        return re.test(phone);
    },
    
    // Format currency
    formatCurrency: (amount, currency = 'IDR') => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Deep clone object
    deepClone: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },
    
    // Merge objects
    merge: (target, source) => {
        return Object.assign({}, target, source);
    },
    
    // Check if object is empty
    isEmpty: (obj) => {
        return Object.keys(obj).length === 0;
    },
    
    // Get object size
    objectSize: (obj) => {
        return Object.keys(obj).length;
    },
    
    // Convert object to query string
    toQueryString: (obj) => {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    },
    
    // Parse query string
    parseQueryString: (str) => {
        return str.split('&').reduce((acc, curr) => {
            const [key, value] = curr.split('=');
            acc[decodeURIComponent(key)] = decodeURIComponent(value);
            return acc;
        }, {});
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}