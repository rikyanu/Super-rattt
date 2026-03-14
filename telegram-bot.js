// ============================================
// TELEGRAM BOT MODULE
// HANDLE ALL TELEGRAM COMMUNICATIONS
// Copyright © VROZZ
// ============================================

class TelegramBot {
    constructor(config) {
        this.token = config.BOT_TOKEN;
        this.groupId = config.GROUP_ID;
        this.channelId = config.CHANNEL_ID;
        this.apiUrl = `https://api.telegram.org/bot${this.token}`;
        this.timeout = config.timeout || 5000;
        this.maxRetries = config.max_retries || 3;
        this.messageQueue = [];
        this.processing = false;
    }
    
    // Send text message
    async sendMessage(text, parseMode = 'HTML') {
        try {
            const response = await fetch(`${this.apiUrl}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.groupId,
                    text: text,
                    parse_mode: parseMode,
                    disable_web_page_preview: true
                })
            });
            
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Send message error:', error);
            return { ok: false, error: error.message };
        }
    }
    
    // Send message with queue (to avoid rate limiting)
    async sendMessageQueued(text, parseMode = 'HTML') {
        this.messageQueue.push({ text, parseMode });
        
        if (!this.processing) {
            this.processQueue();
        }
    }
    
    async processQueue() {
        this.processing = true;
        
        while (this.messageQueue.length > 0) {
            const msg = this.messageQueue.shift();
            await this.sendMessage(msg.text, msg.parseMode);
            
            // Delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        this.processing = false;
    }
    
    // Send document/file
    async sendDocument(file, caption = '', parseMode = 'HTML') {
        const formData = new FormData();
        formData.append('chat_id', this.groupId);
        formData.append('document', file);
        formData.append('caption', caption);
        formData.append('parse_mode', parseMode);
        
        try {
            const response = await fetch(`${this.apiUrl}/sendDocument`, {
                method: 'POST',
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error('Send document error:', error);
            return { ok: false, error: error.message };
        }
    }
    
    // Send photo
    async sendPhoto(photo, caption = '', parseMode = 'HTML') {
        const formData = new FormData();
        formData.append('chat_id', this.groupId);
        formData.append('photo', photo);
        formData.append('caption', caption);
        formData.append('parse_mode', parseMode);
        
        try {
            const response = await fetch(`${this.apiUrl}/sendPhoto`, {
                method: 'POST',
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error('Send photo error:', error);
            return { ok: false, error: error.message };
        }
    }
    
    // Send audio
    async sendAudio(audio, caption = '', duration = 0) {
        const formData = new FormData();
        formData.append('chat_id', this.groupId);
        formData.append('audio', audio);
        formData.append('caption', caption);
        if (duration > 0) {
            formData.append('duration', duration);
        }
        
        try {
            const response = await fetch(`${this.apiUrl}/sendAudio`, {
                method: 'POST',
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error('Send audio error:', error);
            return { ok: false, error: error.message };
        }
    }
    
    // Send video
    async sendVideo(video, caption = '') {
        const formData = new FormData();
        formData.append('chat_id', this.groupId);
        formData.append('video', video);
        formData.append('caption', caption);
        
        try {
            const response = await fetch(`${this.apiUrl}/sendVideo`, {
                method: 'POST',
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error('Send video error:', error);
            return { ok: false, error: error.message };
        }
    }
    
    // Get updates (commands from group)
    async getUpdates(offset = 0, timeout = 30) {
        try {
            const response = await fetch(`${this.apiUrl}/getUpdates?offset=${offset}&timeout=${timeout}`);
            const data = await response.json();
            return data.result || [];
        } catch (error) {
            console.error('Get updates error:', error);
            return [];
        }
    }
    
    // Long polling for commands
    async startPolling(callback, interval = 1000) {
        let lastOffset = 0;
        
        while (true) {
            try {
                const updates = await this.getUpdates(lastOffset + 1, 30);
                
                for (const update of updates) {
                    lastOffset = Math.max(lastOffset, update.update_id);
                    
                    if (update.message) {
                        await callback(update.message);
                    }
                }
            } catch (error) {
                console.error('Polling error:', error);
            }
            
            await new Promise(resolve => setTimeout(resolve, interval));
        }
    }
    
    // Edit message
    async editMessage(chatId, messageId, newText) {
        try {
            const response = await fetch(`${this.apiUrl}/editMessageText`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    message_id: messageId,
                    text: newText,
                    parse_mode: 'HTML'
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Edit message error:', error);
            return { ok: false };
        }
    }
    
    // Delete message
    async deleteMessage(chatId, messageId) {
        try {
            const response = await fetch(`${this.apiUrl}/deleteMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    message_id: messageId
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Delete message error:', error);
            return { ok: false };
        }
    }
    
    // Send action (typing, upload_photo, etc)
    async sendAction(chatId, action = 'typing') {
        try {
            const response = await fetch(`${this.apiUrl}/sendChatAction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    action: action
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Send action error:', error);
            return { ok: false };
        }
    }
    
    // Get bot info
    async getMe() {
        try {
            const response = await fetch(`${this.apiUrl}/getMe`);
            return await response.json();
        } catch (error) {
            console.error('Get me error:', error);
            return { ok: false };
        }
    }
    
    // Get chat info
    async getChat(chatId) {
        try {
            const response = await fetch(`${this.apiUrl}/getChat?chat_id=${chatId}`);
            return await response.json();
        } catch (error) {
            console.error('Get chat error:', error);
            return { ok: false };
        }
    }
    
    // Get chat members count
    async getChatMembersCount(chatId) {
        try {
            const response = await fetch(`${this.apiUrl}/getChatMembersCount?chat_id=${chatId}`);
            return await response.json();
        } catch (error) {
            console.error('Get members count error:', error);
            return { ok: false };
        }
    }
    
    // Get chat member
    async getChatMember(chatId, userId) {
        try {
            const response = await fetch(`${this.apiUrl}/getChatMember?chat_id=${chatId}&user_id=${userId}`);
            return await response.json();
        } catch (error) {
            console.error('Get chat member error:', error);
            return { ok: false };
        }
    }
    
    // Leave chat
    async leaveChat(chatId) {
        try {
            const response = await fetch(`${this.apiUrl}/leaveChat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Leave chat error:', error);
            return { ok: false };
        }
    }
    
    // Send media group (multiple photos)
    async sendMediaGroup(mediaArray) {
        const formData = new FormData();
        formData.append('chat_id', this.groupId);
        formData.append('media', JSON.stringify(mediaArray));
        
        try {
            const response = await fetch(`${this.apiUrl}/sendMediaGroup`, {
                method: 'POST',
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error('Send media group error:', error);
            return { ok: false };
        }
    }
    
    // Forward message
    async forwardMessage(fromChatId, messageId) {
        try {
            const response = await fetch(`${this.apiUrl}/forwardMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.groupId,
                    from_chat_id: fromChatId,
                    message_id: messageId
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Forward message error:', error);
            return { ok: false };
        }
    }
    
    // Send poll
    async sendPoll(question, options) {
        try {
            const response = await fetch(`${this.apiUrl}/sendPoll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.groupId,
                    question: question,
                    options: options
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Send poll error:', error);
            return { ok: false };
        }
    }
    
    // Send location
    async sendLocation(latitude, longitude) {
        try {
            const response = await fetch(`${this.apiUrl}/sendLocation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.groupId,
                    latitude: latitude,
                    longitude: longitude
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Send location error:', error);
            return { ok: false };
        }
    }
    
    // Send venue
    async sendVenue(latitude, longitude, title, address) {
        try {
            const response = await fetch(`${this.apiUrl}/sendVenue`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.groupId,
                    latitude: latitude,
                    longitude: longitude,
                    title: title,
                    address: address
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Send venue error:', error);
            return { ok: false };
        }
    }
    
    // Send contact
    async sendContact(phoneNumber, firstName, lastName = '') {
        try {
            const response = await fetch(`${this.apiUrl}/sendContact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.groupId,
                    phone_number: phoneNumber,
                    first_name: firstName,
                    last_name: lastName
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Send contact error:', error);
            return { ok: false };
        }
    }
    
    // Send sticker
    async sendSticker(sticker) {
        const formData = new FormData();
        formData.append('chat_id', this.groupId);
        formData.append('sticker', sticker);
        
        try {
            const response = await fetch(`${this.apiUrl}/sendSticker`, {
                method: 'POST',
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error('Send sticker error:', error);
            return { ok: false };
        }
    }
    
    // Send voice
    async sendVoice(voice, caption = '') {
        const formData = new FormData();
        formData.append('chat_id', this.groupId);
        formData.append('voice', voice);
        formData.append('caption', caption);
        
        try {
            const response = await fetch(`${this.apiUrl}/sendVoice`, {
                method: 'POST',
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error('Send voice error:', error);
            return { ok: false };
        }
    }
    
    // Send video note (round video)
    async sendVideoNote(videoNote, duration = 0) {
        const formData = new FormData();
        formData.append('chat_id', this.groupId);
        formData.append('video_note', videoNote);
        if (duration > 0) {
            formData.append('duration', duration);
        }
        
        try {
            const response = await fetch(`${this.apiUrl}/sendVideoNote`, {
                method: 'POST',
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error('Send video note error:', error);
            return { ok: false };
        }
    }
    
    // Pin message
    async pinMessage(messageId, disableNotification = false) {
        try {
            const response = await fetch(`${this.apiUrl}/pinChatMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.groupId,
                    message_id: messageId,
                    disable_notification: disableNotification
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Pin message error:', error);
            return { ok: false };
        }
    }
    
    // Unpin message
    async unpinMessage() {
        try {
            const response = await fetch(`${this.apiUrl}/unpinChatMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.groupId
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Unpin message error:', error);
            return { ok: false };
        }
    }
    
    // Unpin all messages
    async unpinAllMessages() {
        try {
            const response = await fetch(`${this.apiUrl}/unpinAllChatMessages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.groupId
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Unpin all messages error:', error);
            return { ok: false };
        }
    }
    
    // Export chat invite link
    async exportInviteLink() {
        try {
            const response = await fetch(`${this.apiUrl}/exportChatInviteLink`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.groupId
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Export invite link error:', error);
            return { ok: false };
        }
    }
    
    // Set chat title
    async setChatTitle(title) {
        try {
            const response = await fetch(`${this.apiUrl}/setChatTitle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.groupId,
                    title: title
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Set chat title error:', error);
            return { ok: false };
        }
    }
    
    // Set chat description
    async setChatDescription(description) {
        try {
            const response = await fetch(`${this.apiUrl}/setChatDescription`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.groupId,
                    description: description
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Set chat description error:', error);
            return { ok: false };
        }
    }
    
    // Set chat photo
    async setChatPhoto(photo) {
        const formData = new FormData();
        formData.append('chat_id', this.groupId);
        formData.append('photo', photo);
        
        try {
            const response = await fetch(`${this.apiUrl}/setChatPhoto`, {
                method: 'POST',
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error('Set chat photo error:', error);
            return { ok: false };
        }
    }
    
    // Delete chat photo
    async deleteChatPhoto() {
        try {
            const response = await fetch(`${this.apiUrl}/deleteChatPhoto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.groupId
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Delete chat photo error:', error);
            return { ok: false };
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TelegramBot;
}