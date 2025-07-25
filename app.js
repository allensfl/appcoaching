// KI-Coaching App - SYNTAX-FEHLER BEHOBEN
// Vollständige app.js ohne Unexpected EOF
// Datum: 26. Juli 2025

// === PROMPT DATABASE (GT/SF/DIAG/LÖS/META) ===
const prompts = {
    // Geißler Triadisch (GT1-GT12)
    GT1: {
        shortcut: "GT1",
        title: "Erstanliegen explorieren",
        category: "GT",
        phase: 1,
        content: "Was beschäftigt Sie denn gerade? Womit kann ich Ihnen heute helfen?",
        description: "Offene Frage zur Exploration des Anliegens"
    },
    GT2: {
        shortcut: "GT2", 
        title: "Problem konkretisieren",
        category: "GT",
        phase: 1,
        content: "Können Sie mir das Problem noch etwas genauer beschreiben? Was genau bereitet Ihnen Schwierigkeiten?",
        description: "Problemspezifizierung und Konkretisierung"
    },
    GT3: {
        shortcut: "GT3",
        title: "Ziel definieren", 
        category: "GT",
        phase: 1,
        content: "Was wäre Ihr Wunschzustand? Wie sähe eine gute Lösung für Sie aus?",
        description: "Zielexploration und Lösungsvision"
    },
    GT4: {
        shortcut: "GT4",
        title: "Spannungsfeld identifizieren",
        category: "GT", 
        phase: 1,
        content: "Zwischen welchen Polen bewegen Sie sich? Was steht sich da gegenüber?",
        description: "Ausbalancierungsproblem erkennen"
    },
    SF1: {
        shortcut: "SF1",
        title: "Lösungsorientierter Einstieg",
        category: "SF",
        phase: 1,
        content: "Stellen Sie sich vor, Ihr Problem wäre gelöst. Woran würden Sie das merken?",
        description: "Lösungsfokussierte Perspektive"
    },
    DIAG1: {
        shortcut: "DIAG1",
        title: "Emotionale Befindlichkeit",
        category: "DIAG",
        phase: 2,
        content: "Auf einer Skala von 1-10: Wie würden Sie Ihre aktuelle emotionale Verfassung einschätzen?",
        description: "Skalierung emotionaler Zustand"
    },
    LÖS1: {
        shortcut: "LÖS1",
        title: "Wunderfrage",
        category: "LÖS",
        phase: 3,
        content: "Angenommen, über Nacht geschieht ein Wunder und Ihr Problem ist gelöst. Was wäre anders?",
        description: "Klassische Wunderfrage nach de Shazer"
    },
    META1: {
        shortcut: "META1",
        title: "Prozess-Check",
        category: "META",
        phase: 0,
        content: "Wie erleben Sie unser Gespräch bisher? Was ist hilfreich für Sie?",
        description: "Zwischenbilanz des Coaching-Prozesses"
    }
};

// === GLOBALE VARIABLEN ===
let currentState = {
    selectedClient: null,
    sessionActive: false,
    sessionStartTime: null,
    currentTemplate: null,
    currentPhase: 1,
    collaborationMode: false,
    collaborationData: null
};

let collaborationProtection = {
    isProtected: false,
    protectedData: null,
    lastUpdate: 0
};

let activeCategory = "all";

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 KI-Coaching App wird initialisiert...');
    updateDebugInfo('App wird initialisiert...');
    
    // Vereinfachte Initialisierung ohne mehrfache Versuche
    if (typeof clients !== 'undefined' && Array.isArray(clients)) {
        initializeApp();
    } else {
        console.error('❌ KRITISCH: clients Array nicht verfügbar');
        updateDebugInfo('❌ FEHLER: clients Array fehlt');
        
        // Notfall-Clients definieren
        window.clients = [
            {
                id: 'marcus',
                name: 'Marcus Schmidt',
                role: 'Vertriebsleiter',
                company: 'Innovation Corp',
                avatar: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="30" fill="#3b82f6"/><text x="30" y="35" text-anchor="middle" font-size="20" fill="white">MS</text></svg>'
            }
        ];
        
        setTimeout(() => {
            initializeApp();
        }, 500);
    }
});

function initializeApp() {
    console.log('📋 App-Initialisierung gestartet');
    updateDebugInfo('App-Initialisierung läuft...');
    
    // Ensure clients array exists
    if (!window.clients || !Array.isArray(window.clients)) {
        window.clients = [
            {
                id: 'marcus',
                name: 'Marcus Schmidt',
                role: 'Vertriebsleiter', 
                company: 'Innovation Corp',
                avatar: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="30" fill="#3b82f6"/><text x="30" y="35" text-anchor="middle" font-size="20" fill="white">MS</text></svg>'
            }
        ];
    }
    
    // Make clients globally available
    if (typeof clients === 'undefined') {
        window.clients = window.clients || [];
    }
    
    console.log('✅ Clients Array verfügbar:', window.clients.length, 'Klienten');
    console.log('🔍 Prompts verfügbar:', Object.keys(prompts).length);
    updateDebugInfo(`✅ ${window.clients.length} Klienten + ${Object.keys(prompts).length} Prompts geladen`);
    
    // Initialize components
    loadClients();
    loadTemplates();
    loadPrompts();
    restoreSessionState();
    setupEventListeners();
    startCollaborationMonitoring();
    
    updateDebugInfo('✅ App vollständig geladen');
    showNotification('Triadisches KI-Coaching bereit!', 'success');
}

function updateDebugInfo(message) {
    const debugElement = document.getElementById('debugInfo');
    if (debugElement) {
        debugElement.textContent = message;
    }
    console.log('DEBUG:', message);
}

// === CLIENT MANAGEMENT ===
function loadClients() {
    const clientGrid = document.getElementById('clientGrid');
    if (!clientGrid) {
        console.error('❌ clientGrid Element nicht gefunden');
        return;
    }
    
    const clientsToUse = window.clients || [];
    console.log('👥 Lade', clientsToUse.length, 'Klienten...');
    clientGrid.innerHTML = '';
    
    if (clientsToUse.length === 0) {
        clientGrid.innerHTML = '<p>Keine Klienten verfügbar. Laden Sie data.js.</p>';
        return;
    }
    
    clientsToUse.forEach(client => {
        const clientCard = createClientCard(client);
        clientGrid.appendChild(clientCard);
    });
    
    console.log('✅ Klienten erfolgreich geladen');
}

function createClientCard(client) {
    const card = document.createElement('div');
    card.className = 'client-card';
    card.addEventListener('click', () => selectClient(client.id));
    
    card.innerHTML = `
        <div class="client-avatar">
            <img src="${client.avatar}" alt="${client.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
        </div>
        <h3>${client.name}</h3>
        <p class="client-role">${client.role}</p>
        <p class="client-info">${client.company}</p>
        <button class="btn-primary">Auswählen</button>
    `;
    
    return card;
}

function selectClient(clientId) {
    console.log('👤 Klient wird ausgewählt:', clientId);
    
    const clientsToUse = window.clients || [];
    const client = clientsToUse.find(c => c.id === clientId);
    
    if (!client) {
        console.error('❌ Klient nicht gefunden:', clientId);
        showNotification('Klient konnte nicht gefunden werden', 'error');
        return;
    }
    
    console.log('✅ Klient erfolgreich ausgewählt:', client.name);
    currentState.selectedClient = client;
    
    // UI Updates
    document.querySelectorAll('.client-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Find and select clicked card
    const allCards = document.querySelectorAll('.client-card');
    allCards.forEach(card => {
        if (card.querySelector('h3').textContent === client.name) {
            card.classList.add('selected');
        }
    });
    
    showNotification(`Klient ${client.name} ausgewählt`, 'success');
}

// === SESSION MANAGEMENT ===
function startSession() {
    if (!currentState.selectedClient) {
        alert('Bitte wählen Sie zuerst einen Klienten aus.');
        return;
    }
    
    console.log('🎯 Session gestartet für:', currentState.selectedClient.name);
    currentState.sessionActive = true;
    currentState.sessionStartTime = new Date();
    
    updateSessionUI();
    startSessionTimer();
    
    showNotification(`Session mit ${currentState.selectedClient.name} gestartet`, 'success');
}

function stopSession() {
    console.log('⏹️ Session beendet');
    currentState.sessionActive = false;
    currentState.sessionStartTime = null;
    
    updateSessionUI();
    showNotification('Session beendet', 'info');
}

function updateSessionUI() {
    const startBtn = document.getElementById('startSessionBtn');
    const stopBtn = document.getElementById('stopSessionBtn');
    const timer = document.getElementById('sessionTimer');
    
    if (currentState.sessionActive) {
        if (startBtn) startBtn.style.display = 'none';
        if (stopBtn) stopBtn.style.display = 'inline-block';
        if (timer) timer.style.display = 'block';
    } else {
        if (startBtn) startBtn.style.display = 'inline-block';
        if (stopBtn) stopBtn.style.display = 'none';
        if (timer) timer.style.display = 'none';
    }
}

function startSessionTimer() {
    if (!currentState.sessionActive) return;
    
    const timer = document.getElementById('sessionTimer');
    if (!timer) return;
    
    const updateTimer = () => {
        if (!currentState.sessionActive || !currentState.sessionStartTime) return;
        
        const now = new Date();
        const elapsed = Math.floor((now - currentState.sessionStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    updateTimer();
    const interval = setInterval(() => {
        if (!currentState.sessionActive) {
            clearInterval(interval);
            return;
        }
        updateTimer();
    }, 1000);
}

// === PROMPT MANAGEMENT ===
function loadPrompts(category = 'all', searchTerm = '') {
    const promptList = document.getElementById('promptList');
    if (!promptList) return;
    
    promptList.innerHTML = '';

    const filteredPrompts = Object.values(prompts).filter(prompt => {
        const matchesCategory = category === 'all' || prompt.category === category;
        const matchesSearch = searchTerm === '' || 
            prompt.shortcut.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.content.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesCategory && matchesSearch;
    });

    filteredPrompts.forEach(prompt => {
        const promptElement = createPromptElement(prompt);
        promptList.appendChild(promptElement);
    });

    console.log(`📄 ${filteredPrompts.length} Prompts geladen`);
}

function createPromptElement(prompt) {
    const div = document.createElement('div');
    div.className = 'prompt-item';
    div.innerHTML = `
        <div class="prompt-shortcut">${prompt.shortcut}</div>
        <div class="prompt-title">${prompt.title}</div>
        <div class="prompt-preview">${prompt.content.substring(0, 60)}...</div>
        <div class="prompt-actions">
            <button class="prompt-btn btn-copy" onclick="copyPrompt('${prompt.shortcut}')">📋</button>
            <button class="prompt-btn btn-send" onclick="sendToCollaboration('${prompt.shortcut}')">📤</button>
        </div>
    `;
    return div;
}

function copyPrompt(shortcut) {
    const prompt = prompts[shortcut];
    if (prompt) {
        navigator.clipboard.writeText(prompt.content).then(() => {
            showNotification(`${shortcut} kopiert!`, 'success');
        }).catch(() => {
            showNotification(`Fehler beim Kopieren von ${shortcut}`, 'error');
        });
    }
}

function sendToCollaboration(shortcut) {
    const prompt = prompts[shortcut];
    if (prompt) {
        console.log(`📤 Sende Prompt ${shortcut} an Kollaboration`);
        
        const collaborationData = {
            type: 'collaboration',
            prompt: prompt.content,
            promptShortcut: shortcut,
            promptTitle: prompt.title,
            timestamp: new Date().toISOString(),
            client: currentState.selectedClient,
            phase: currentState.currentPhase
        };
        
        showNotification(`${shortcut} wird an Kollaboration gesendet...`, 'info');
        generateAIResponse(collaborationData);
    }
}

// === COLLABORATION SYSTEM ===
function startCollaborationMonitoring() {
    console.log('🔍 Kollaborations-Monitoring gestartet');
    
    // Simplified monitoring
    setInterval(() => {
        try {
            const stored = localStorage.getItem('collaborationData');
            if (stored) {
                const data = JSON.parse(stored);
                updateCollaborationDisplay(data);
            }
        } catch (error) {
            console.error('Collaboration monitoring error:', error);
        }
    }, 1000);
}

function generateAIResponse(collaborationData) {
    console.log('🤖 Generiere KI-Antwort...');
    
    try {
        localStorage.setItem('collaborationData', JSON.stringify(collaborationData));
    } catch (error) {
        console.error('Storage error:', error);
    }
    
    setTimeout(() => {
        const aiResponse = generateSimulatedResponse(collaborationData.prompt, collaborationData.promptShortcut);
        
        const fullData = {
            ...collaborationData,
            aiResponse: aiResponse,
            aiGeneratedAt: new Date().toISOString()
        };
        
        try {
            localStorage.setItem('collaborationData', JSON.stringify(fullData));
        } catch (error) {
            console.error('Storage error:', error);
        }
        
        updateCollaborationDisplay(fullData);
        showNotification('KI-Antwort wurde generiert.', 'success');
    }, 2000);
}

function generateSimulatedResponse(prompt, promptShortcut) {
    if (promptShortcut) {
        const promptData = prompts[promptShortcut];
        if (promptData) {
            let response = `<strong>Analyse (${promptShortcut}):</strong> ${promptData.description}. `;
            
            switch(promptData.category) {
                case 'GT':
                    response += `Geißler-Triadik Phase ${promptData.phase} erfolgreich eingeleitet.`;
                    break;
                case 'SF':
                    response += `Lösungsfokussierte Intervention aktiviert.`;
                    break;
                case 'DIAG':
                    response += `Diagnostische Exploration gestartet.`;
                    break;
                case 'LÖS':
                    response += `Lösungsentwicklung eingeleitet.`;
                    break;
                case 'META':
                    response += `Prozessreflexion aktiviert.`;
                    break;
            }
            
            if (promptShortcut === 'GT4') {
                response += `<br><br><strong>💡 Spannungsfeld erkannt:</strong> Avatar-Aufstellung über DelightEx empfohlen.`;
            }
            
            return response;
        }
    }
    
    return 'Basierend auf Ihrem Prompt empfehle ich einen strukturierten Ansatz. Beginnen Sie mit offenen Fragen für tiefere Einsichten.';
}

function updateCollaborationDisplay(data) {
    const display = document.getElementById('collaborationDisplay');
    if (!display || !data) return;
    
    console.log('🖥️ Kollaborations-Display wird aktualisiert');
    
    display.innerHTML = `
        <div class="collaboration-content">
            <div class="prompt-section">
                <h3>Coaching-Prompt ${data.promptShortcut ? `(${data.promptShortcut})` : ''}</h3>
                <div class="prompt-display">${escapeHtml(data.prompt)}</div>
            </div>
            
            ${data.aiResponse ? `
                <div class="ai-response-section">
                    <h3>KI-Antwort</h3>
                    <div class="ai-response-display">${data.aiResponse}</div>
                </div>
            ` : `
                <div class="ai-response-section">
                    <h3>KI-Antwort</h3>
                    <div class="ai-loading">
                        <p>🤖 KI generiert Antwort...</p>
                    </div>
                </div>
            `}
            
            <div class="collaboration-actions">
                <button class="btn-primary" onclick="approvePrompt()">✅ Genehmigen</button>
                <button class="btn-primary" onclick="rejectPrompt()">❌ Ablehnen</button>
            </div>
        </div>
    `;
}

function approvePrompt() {
    showNotification('Prompt wurde genehmigt!', 'success');
}

function rejectPrompt() {
    showNotification('Prompt wurde abgelehnt.', 'warning');
}

// === TEMPLATE MANAGEMENT ===
function loadTemplates() {
    const container = document.getElementById('templateContainer');
    if (!container) return;
    
    const templates = window.coachingTemplates || [];
    console.log('📚 Lade', templates.length, 'Templates...');
    
    container.innerHTML = '';
    
    if (templates.length === 0) {
        container.innerHTML = '<p>Keine Templates verfügbar.</p>';
        return;
    }
    
    templates.forEach(template => {
        const card = createTemplateCard(template);
        container.appendChild(card);
    });
}

function createTemplateCard(template) {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `
        <h3>${template.title}</h3>
        <div class="template-category">${template.category}</div>
        <p class="template-description">${template.description}</p>
        <div class="template-actions">
            <button class="btn-primary" onclick="useTemplate('${template.id}')">Verwenden</button>
        </div>
    `;
    return card;
}

function useTemplate(templateId) {
    const templates = window.coachingTemplates || [];
    const template = templates.find(t => t.id === templateId);
    
    if (!template) {
        showNotification('Template nicht gefunden', 'error');
        return;
    }
    
    const editor = document.getElementById('promptEditor');
    if (editor) {
        editor.value = template.prompt;
    }
    
    showNotification(`Template "${template.title}" geladen`, 'success');
}

// === UTILITY FUNCTIONS ===
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    console.log(`📢 ${type}: ${message}`);
    
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function restoreSessionState() {
    // Simplified state restoration
    console.log('🔄 Session-State Wiederherstellung...');
}

// === EVENT LISTENERS ===
function setupEventListeners() {
    console.log('🎧 Event Listeners werden eingerichtet');
    
    // Session-Buttons
    const startBtn = document.getElementById('startSessionBtn');
    const stopBtn = document.getElementById('stopSessionBtn');
    
    if (startBtn) {
        startBtn.addEventListener('click', startSession);
    }
    
    if (stopBtn) {
        stopBtn.addEventListener('click', stopSession);
    }
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href').substring(1);
            showSection(target);
        });
    });
    
    // Category Buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            loadPrompts(activeCategory, document.getElementById('promptSearch')?.value || '');
        });
    });
    
    // Search
    const promptSearch = document.getElementById('promptSearch');
    if (promptSearch) {
        promptSearch.addEventListener('input', (e) => {
            loadPrompts(activeCategory, e.target.value);
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            const shortcuts = {
                '1': 'GT1', '2': 'GT2', '3': 'GT3', '4': 'GT4'
            };
            
            if (shortcuts[e.key]) {
                e.preventDefault();
                sendToCollaboration(shortcuts[e.key]);
            }
        }
    });
    
    console.log('✅ Event Listeners bereit');
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// === GLOBAL FUNCTIONS ===
window.copyPrompt = copyPrompt;
window.sendToCollaboration = sendToCollaboration;
window.useTemplate = useTemplate;
window.approvePrompt = approvePrompt;
window.rejectPrompt = rejectPrompt;
window.selectClient = selectClient;
window.startSession = startSession;
window.stopSession = stopSession;

console.log('✅ Triadisches KI-Coaching App vollständig geladen - SYNTAX-FEHLER BEHOBEN');