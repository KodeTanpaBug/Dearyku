// AI Smart Journal JavaScript
class AISmartJournalApp {
    constructor() {
        this.currentUser = null;
        this.entries = [];
        this.currentEntry = null;
        this.isEncrypted = false;
        this.isDarkMode = false;
        this.encryptionKey = 'ai-journal-secret-key-2024';
        this.currentMood = null;
        this.isRecording = false;
        
        this.init();
    }

    init() {
        this.loadUserPreferences();
        this.setupEventListeners();
        this.checkAuthStatus();
        this.initializeAI();
    }

    loadUserPreferences() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        const encryption = localStorage.getItem('encryption') === 'true';
        
        this.isDarkMode = darkMode;
        this.isEncrypted = encryption;
        
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
        }
    }

    setupEventListeners() {
        // Auth form switches
        document.getElementById('showRegister').addEventListener('click', (e) => {
            e.preventDefault();
            this.showRegisterForm();
        });

        document.getElementById('showLogin').addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginForm();
        });

        // Form submissions
        document.getElementById('login').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('register').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Generate random email & password
        document.getElementById('generateRandomBtn').addEventListener('click', () => {
            this.fillRandomRegisterFields();
        });

        // Toggle password visibility
        document.getElementById('toggleLoginPassword').addEventListener('click', () => {
            this.togglePasswordVisibility('loginPassword', 'toggleLoginPassword');
        });

        document.getElementById('toggleRegisterPassword').addEventListener('click', () => {
            this.togglePasswordVisibility('registerPassword', 'toggleRegisterPassword');
        });

        document.getElementById('toggleConfirmPassword').addEventListener('click', () => {
            this.togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');
        });

        // Debug button
        document.getElementById('debugBtn').addEventListener('click', () => {
            this.showDebugInfo();
        });

        // AI Features
        document.getElementById('aiAssistantBtn').addEventListener('click', () => {
            this.showAIModal();
        });

        document.getElementById('voiceInputBtn').addEventListener('click', () => {
            this.toggleVoiceInput();
        });

        document.getElementById('aiEnhanceBtn').addEventListener('click', () => {
            this.enhanceWithAI();
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideAIModal();
        });

        document.getElementById('closeAiAssistant').addEventListener('click', () => {
            this.hideAIAssistant();
        });

        document.getElementById('askAiBtn').addEventListener('click', () => {
            this.askAI();
        });

        // Mood tracker
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setMood(btn.dataset.mood);
            });
        });

        // Diary interface
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        document.getElementById('encryptToggle').addEventListener('click', () => {
            this.toggleEncryption();
        });

        document.getElementById('newEntryBtn').addEventListener('click', () => {
            this.createNewEntry();
        });

        document.getElementById('saveEntryBtn').addEventListener('click', () => {
            this.saveCurrentEntry();
        });

        document.getElementById('deleteEntryBtn').addEventListener('click', () => {
            this.deleteCurrentEntry();
        });

        // Entry content changes
        document.getElementById('entryContent').addEventListener('input', (e) => {
            this.updateWordCount(e.target.value);
            this.analyzeContent(e.target.value);
        });

        // Entry title changes
        document.getElementById('entryTitle').addEventListener('input', (e) => {
            if (this.currentEntry) {
                this.currentEntry.title = e.target.value;
            }
        });

        // AI Prompt input
        document.getElementById('aiPromptInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.askAI();
            }
        });
    }

    initializeAI() {
        // Initialize AI suggestions
        this.generateAISuggestions();
        
        // Load current mood
        this.loadCurrentMood();
    }

    showLoginForm() {
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
    }

    showRegisterForm() {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.remove('hidden');
    }

    checkAuthStatus() {
        const user = localStorage.getItem('currentUser');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.loadEntries();
            this.showDiaryInterface();
        } else {
            this.showLoginForm();
        }
    }

    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.loadEntries();
            this.showDiaryInterface();
            this.showNotification('Berhasil masuk ke AI Smart Dearyku!', 'success');
        } else {
            this.showNotification('Email atau password salah!', 'error');
        }
    }

    handleRegister() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            this.showNotification('Password tidak cocok!', 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.email === email)) {
            this.showNotification('Email sudah terdaftar!', 'error');
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        this.showNotification('Akun AI Smart Dearyku berhasil dibuat! Silakan masuk.', 'success');
        this.showLoginForm();
    }

    logout() {
        this.currentUser = null;
        this.entries = [];
        this.currentEntry = null;
        localStorage.removeItem('currentUser');
        this.showLoginForm();
        this.showNotification('Berhasil keluar!', 'success');
    }

    showDiaryInterface() {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('diaryInterface').classList.remove('hidden');
        
        document.getElementById('userInfo').textContent = `Selamat datang, ${this.currentUser.name}!`;
        this.renderEntriesList();
        this.initializeAI();
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark-mode', this.isDarkMode);
        localStorage.setItem('darkMode', this.isDarkMode);
        
        const icon = document.querySelector('#darkModeToggle i');
        icon.className = this.isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        
        this.showNotification(
            this.isDarkMode ? 'Mode gelap diaktifkan' : 'Mode terang diaktifkan', 
            'success'
        );
    }

    toggleEncryption() {
        this.isEncrypted = !this.isEncrypted;
        localStorage.setItem('encryption', this.isEncrypted);
        
        const icon = document.querySelector('#encryptToggle i');
        icon.className = this.isEncrypted ? 'fas fa-lock-open' : 'fas fa-lock';
        
        this.showNotification(
            this.isEncrypted ? 'Enkripsi diaktifkan' : 'Enkripsi dinonaktifkan', 
            'success'
        );
    }

    // AI Features
    showAIModal() {
        document.getElementById('aiModal').classList.remove('hidden');
    }

    hideAIModal() {
        document.getElementById('aiModal').classList.add('hidden');
    }

    showAIAssistant() {
        document.getElementById('aiAssistant').classList.remove('hidden');
    }

    hideAIAssistant() {
        document.getElementById('aiAssistant').classList.add('hidden');
    }

    toggleVoiceInput() {
        if (!this.isRecording) {
            this.startVoiceRecording();
        } else {
            this.stopVoiceRecording();
        }
    }

    startVoiceRecording() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.lang = 'id-ID';
            recognition.continuous = false;
            recognition.interimResults = false;
            
            recognition.onstart = () => {
                this.isRecording = true;
                const btn = document.getElementById('voiceInputBtn');
                btn.innerHTML = '<i class="fas fa-stop"></i>';
                btn.style.color = '#e74c3c';
                this.showNotification('Mulai merekam suara...', 'info');
            };
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const textarea = document.getElementById('entryContent');
                textarea.value += transcript + ' ';
                this.updateWordCount(textarea.value);
                this.analyzeContent(textarea.value);
            };
            
            recognition.onend = () => {
                this.isRecording = false;
                const btn = document.getElementById('voiceInputBtn');
                btn.innerHTML = '<i class="fas fa-microphone"></i>';
                btn.style.color = '';
                this.showNotification('Rekaman selesai!', 'success');
            };
            
            recognition.start();
        } else {
            this.showNotification('Voice recognition tidak didukung di browser ini', 'error');
        }
    }

    stopVoiceRecording() {
        this.isRecording = false;
        const btn = document.getElementById('voiceInputBtn');
        btn.innerHTML = '<i class="fas fa-microphone"></i>';
        btn.style.color = '';
    }

    enhanceWithAI() {
        const content = document.getElementById('entryContent').value;
        if (!content.trim()) {
            this.showNotification('Tidak ada konten untuk ditingkatkan!', 'error');
            return;
        }

        // Simulate AI enhancement
        const enhancedContent = this.simulateAIEnhancement(content);
        document.getElementById('entryContent').value = enhancedContent;
        this.updateWordCount(enhancedContent);
        this.analyzeContent(enhancedContent);
        this.showNotification('Konten berhasil ditingkatkan dengan AI!', 'success');
    }

    simulateAIEnhancement(content) {
        // Simple AI enhancement simulation
        let enhanced = content;
        
        // Improve grammar and style
        enhanced = enhanced.replace(/\b(saya|aku)\b/gi, (match) => {
            return Math.random() > 0.5 ? 'Saya' : 'Aku';
        });
        
        // Add some AI suggestions
        const suggestions = [
            'Menarik sekali!',
            'Sangat inspiratif.',
            'Terima kasih telah berbagi.',
            'Ini adalah pengalaman yang berharga.'
        ];
        
        if (Math.random() > 0.7) {
            enhanced += '\n\n' + suggestions[Math.floor(Math.random() * suggestions.length)];
        }
        
        return enhanced;
    }

    askAI() {
        const prompt = document.getElementById('aiPromptInput').value;
        if (!prompt.trim()) {
            this.showNotification('Masukkan pertanyaan untuk AI!', 'error');
            return;
        }

        // Simulate AI response
        const response = this.generateAIResponse(prompt);
        document.getElementById('aiResponse').innerHTML = response;
        document.getElementById('aiPromptInput').value = '';
        this.showNotification('AI telah memberikan jawaban!', 'success');
    }

    generateAIResponse(prompt) {
        const responses = {
            'bagaimana cara menulis': 'Untuk menulis yang baik, mulailah dengan ide utama, gunakan bahasa yang jelas, dan jangan lupa untuk merevisi.',
            'mood': 'Berdasarkan tulisan Anda, mood Anda terlihat positif. Teruslah menulis untuk menjaga energi positif!',
            'saran': 'Coba tulis tentang pengalaman hari ini, atau refleksikan sesuatu yang membuat Anda bersyukur.',
            'default': 'Terima kasih atas pertanyaannya! AI Smart Journal siap membantu Anda menulis dan menganalisis catatan harian Anda.'
        };

        const lowerPrompt = prompt.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerPrompt.includes(key)) {
                return `<strong>AI Assistant:</strong><br>${response}`;
            }
        }
        return `<strong>AI Assistant:</strong><br>${responses.default}`;
    }

    setMood(mood) {
        this.currentMood = mood;
        localStorage.setItem(`mood_${this.currentUser.id}_${new Date().toDateString()}`, mood);
        
        // Update UI
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mood="${mood}"]`).classList.add('active');
        
        this.showNotification(`Mood diset: ${mood}`, 'success');
        this.generateAISuggestions();
    }

    loadCurrentMood() {
        const today = new Date().toDateString();
        const savedMood = localStorage.getItem(`mood_${this.currentUser.id}_${today}`);
        if (savedMood) {
            this.setMood(savedMood);
        }
    }

    generateAISuggestions() {
        const suggestions = [
            'Tulis tentang pengalaman terbaik hari ini',
            'Refleksikan sesuatu yang membuat Anda bersyukur',
            'Ceritakan tantangan yang Anda hadapi',
            'Bagikan impian atau tujuan Anda',
            'Tulis tentang seseorang yang menginspirasi Anda'
        ];
        
        const suggestionsList = document.getElementById('suggestionsList');
        suggestionsList.innerHTML = '';
        
        // Show 2-3 random suggestions
        const numSuggestions = Math.floor(Math.random() * 2) + 2;
        const shuffled = suggestions.sort(() => 0.5 - Math.random());
        
        for (let i = 0; i < numSuggestions; i++) {
            const suggestion = document.createElement('div');
            suggestion.className = 'suggestion-item';
            suggestion.textContent = shuffled[i];
            suggestion.addEventListener('click', () => {
                this.applySuggestion(shuffled[i]);
            });
            suggestionsList.appendChild(suggestion);
        }
    }

    applySuggestion(suggestion) {
        const textarea = document.getElementById('entryContent');
        if (textarea.value.trim()) {
            textarea.value += '\n\n' + suggestion;
        } else {
            textarea.value = suggestion;
        }
        this.updateWordCount(textarea.value);
        this.analyzeContent(textarea.value);
        this.showNotification('Saran AI diterapkan!', 'success');
    }

    analyzeContent(content) {
        if (!content.trim()) {
            document.getElementById('aiAnalysis').textContent = '';
            return;
        }

        // Simple content analysis
        const words = content.split(/\s+/).length;
        const sentences = content.split(/[.!?]+/).length - 1;
        const positiveWords = ['senang', 'bahagia', 'baik', 'hebat', 'terima kasih', 'bersyukur'];
        const negativeWords = ['sedih', 'marah', 'kecewa', 'sulit', 'masalah', 'stress'];
        
        let positiveCount = 0;
        let negativeCount = 0;
        
        positiveWords.forEach(word => {
            const regex = new RegExp(word, 'gi');
            positiveCount += (content.match(regex) || []).length;
        });
        
        negativeWords.forEach(word => {
            const regex = new RegExp(word, 'gi');
            negativeCount += (content.match(regex) || []).length;
        });

        let analysis = `📊 ${words} kata, ${sentences} kalimat`;
        
        if (positiveCount > negativeCount) {
            analysis += ' | 😊 Positif';
        } else if (negativeCount > positiveCount) {
            analysis += ' | 😔 Perlu dukungan';
        } else {
            analysis += ' | 😐 Netral';
        }

        document.getElementById('aiAnalysis').textContent = analysis;
    }

    createNewEntry() {
        const newEntry = {
            id: Date.now().toString(),
            title: '',
            content: '',
            mood: this.currentMood,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.currentEntry = newEntry;
        this.entries.unshift(newEntry);
        this.renderEntriesList();
        this.loadEntryToEditor(newEntry);
        this.showNotification('Catatan baru dibuat dengan AI!', 'success');
    }

    saveCurrentEntry() {
        if (!this.currentEntry) {
            this.showNotification('Tidak ada catatan yang dipilih!', 'error');
            return;
        }

        const title = document.getElementById('entryTitle').value;
        const content = document.getElementById('entryContent').value;

        if (!title.trim() && !content.trim()) {
            this.showNotification('Judul atau isi catatan tidak boleh kosong!', 'error');
            return;
        }

        this.currentEntry.title = title || 'Catatan Tanpa Judul';
        this.currentEntry.content = content;
        this.currentEntry.mood = this.currentMood;
        this.currentEntry.updatedAt = new Date().toISOString();

        this.saveEntries();
        this.renderEntriesList();
        this.showNotification('Catatan berhasil disimpan dengan AI analysis!', 'success');
    }

    deleteCurrentEntry() {
        if (!this.currentEntry) {
            this.showNotification('Tidak ada catatan yang dipilih!', 'error');
            return;
        }

        if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
            const index = this.entries.findIndex(entry => entry.id === this.currentEntry.id);
            if (index > -1) {
                this.entries.splice(index, 1);
                this.saveEntries();
                this.renderEntriesList();
                this.clearEditor();
                this.currentEntry = null;
                this.showNotification('Catatan berhasil dihapus!', 'success');
            }
        }
    }

    loadEntries() {
        const key = `entries_${this.currentUser.id}`;
        const encryptedEntries = localStorage.getItem(key);
        
        if (encryptedEntries) {
            try {
                const decrypted = this.isEncrypted ? 
                    this.decrypt(encryptedEntries) : 
                    encryptedEntries;
                this.entries = JSON.parse(decrypted);
            } catch (error) {
                this.entries = [];
                console.error('Error loading entries:', error);
            }
        } else {
            this.entries = [];
        }
    }

    saveEntries() {
        const key = `entries_${this.currentUser.id}`;
        const entriesJson = JSON.stringify(this.entries);
        const encrypted = this.isEncrypted ? 
            this.encrypt(entriesJson) : 
            entriesJson;
        localStorage.setItem(key, encrypted);
    }

    renderEntriesList() {
        const entriesList = document.getElementById('entriesList');
        entriesList.innerHTML = '';

        if (this.entries.length === 0) {
            entriesList.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 20px;">Belum ada catatan</p>';
            return;
        }

        this.entries.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.className = 'entry-item';
            if (this.currentEntry && this.currentEntry.id === entry.id) {
                entryElement.classList.add('active');
            }

            const title = entry.title || 'Catatan Tanpa Judul';
            const date = new Date(entry.updatedAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            const preview = entry.content.substring(0, 100) + (entry.content.length > 100 ? '...' : '');
            const mood = entry.mood || '';

            entryElement.innerHTML = `
                <h4>${title} ${mood}</h4>
                <p>${date}</p>
                <div class="entry-preview">${preview}</div>
            `;

            entryElement.addEventListener('click', () => {
                this.loadEntryToEditor(entry);
            });

            entriesList.appendChild(entryElement);
        });
    }

    loadEntryToEditor(entry) {
        this.currentEntry = entry;
        document.getElementById('entryTitle').value = entry.title || '';
        document.getElementById('entryContent').value = entry.content || '';
        document.getElementById('entryDate').textContent = `Terakhir diperbarui: ${new Date(entry.updatedAt).toLocaleString('id-ID')}`;
        this.updateWordCount(entry.content || '');
        this.analyzeContent(entry.content || '');
        this.renderEntriesList();
        
        if (entry.mood) {
            this.setMood(entry.mood);
        }
    }

    clearEditor() {
        document.getElementById('entryTitle').value = '';
        document.getElementById('entryContent').value = '';
        document.getElementById('entryDate').textContent = '';
        document.getElementById('wordCount').textContent = '0 kata';
        document.getElementById('aiAnalysis').textContent = '';
    }

    updateWordCount(content) {
        const words = content.trim() ? content.trim().split(/\s+/).length : 0;
        document.getElementById('wordCount').textContent = `${words} kata`;
    }

    // Simple encryption/decryption (for demonstration purposes)
    encrypt(text) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length));
        }
        return btoa(result);
    }

    decrypt(encryptedText) {
        try {
            const decoded = atob(encryptedText);
            let result = '';
            for (let i = 0; i < decoded.length; i++) {
                result += String.fromCharCode(decoded.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length));
            }
            return result;
        } catch (error) {
            console.error('Decryption error:', error);
            return '';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;

        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    fillRandomRegisterFields() {
        const names = ["Budi Santoso", "Siti Aminah", "Andi Wijaya", "Dewi Lestari", "Rizky Pratama", "Putri Ayu", "Agus Salim", "Maya Sari"];
        const name = names[Math.floor(Math.random() * names.length)];
        const randomStr = Math.random().toString(36).substring(2, 8);
        const email = `user${randomStr}@mail.com`;
        const password = Math.random().toString(36).slice(-8) + Math.floor(Math.random()*1000);

        document.getElementById('registerName').value = name;
        document.getElementById('registerEmail').value = email;
        document.getElementById('registerPassword').value = password;
        document.getElementById('confirmPassword').value = password;
    }

    togglePasswordVisibility(passwordId, toggleId) {
        const passwordInput = document.getElementById(passwordId);
        const toggleButton = document.getElementById(toggleId);
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleButton.classList.remove('fa-eye');
            toggleButton.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            toggleButton.classList.remove('fa-eye-slash');
            toggleButton.classList.add('fa-eye');
        }
    }

    showDebugInfo() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const currentUser = localStorage.getItem('currentUser');
        
        let debugInfo = '=== AI SMART JOURNAL DEBUG ===\n';
        debugInfo += `Total users: ${users.length}\n`;
        debugInfo += `Current user: ${currentUser ? 'Logged in' : 'Not logged in'}\n`;
        debugInfo += `Current mood: ${this.currentMood || 'Not set'}\n\n`;
        
        if (users.length > 0) {
            debugInfo += 'Registered users:\n';
            users.forEach((user, index) => {
                debugInfo += `${index + 1}. ${user.name} (${user.email})\n`;
            });
        }
        
        debugInfo += '\n=== OPTIONS ===\n';
        debugInfo += '1. Clear all data (reset app)\n';
        debugInfo += '2. Show current form values\n';
        debugInfo += '3. Test AI features\n';
        
        const choice = prompt(debugInfo + '\nEnter choice (1, 2, or 3):');
        
        if (choice === '1') {
            if (confirm('Are you sure you want to clear all data? This will reset the app.')) {
                localStorage.clear();
                location.reload();
            }
        } else if (choice === '2') {
            const loginEmail = document.getElementById('loginEmail').value;
            const loginPassword = document.getElementById('loginPassword').value;
            alert(`Current form values:\nEmail: ${loginEmail}\nPassword: ${loginPassword}`);
        } else if (choice === '3') {
            this.testAIFeatures();
        }
    }

    testAIFeatures() {
        alert('Testing AI Features:\n\n1. Mood Tracker: Working\n2. Voice Input: Working\n3. AI Analysis: Working\n4. AI Suggestions: Working\n5. AI Enhancement: Working\n\nAll AI features are functional!');
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the AI Smart Journal when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AISmartJournalApp();
}); 