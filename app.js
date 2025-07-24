// KI-Coaching App - Finale Version mit KI-Response Fix
// Datum: 24. Juli 2025
// Status: Vollständige Lösung für Kollaborations-Sync + KI-Response

let currentState = {
    selectedClient: null,
    sessionActive: false,
    sessionStartTime: null,
    currentTemplate: null,
    collaborationMode: false,
    collaborationData: null
};

// Anti-Override Protection System
let collaborationProtection = {
    isProtected: false,
    protectedData: null,
    lastUpdate: 0
};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 KI-Coaching App wird initialisiert...');
    initializeApp();
    setupEventListeners();
    startCollaborationMonitoring();
    
    // Debug-Tool für Troubleshooting
    window.debugCollaborationSync = debugCollaborationSync;
});

function initializeApp() {
    console.log('📋 App-Initialisierung gestartet');
    loadClients();
    loadTemplates();
    restoreSessionState();
    checkCollaborationMode();
}

// === CLIENT MANAGEMENT ===
function loadClients() {
    const clientGrid = document.getElementById('clientGrid');
    if (!clientGrid) return;
    
    clientGrid.innerHTML = '';
    
    clients.forEach(client => {
        const clientCard = createClientCard(client);
        clientGrid.appendChild(clientCard);
    });
}

function createClientCard(client) {
    const card = document.createElement('div');
    card.className = 'client-card';
    card.innerHTML = `
        <div class="client-avatar">
            <img src="${client.avatar}" alt="${client.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"60\\" height=\\"60\\" viewBox=\\"0 0 60 60\\"><circle cx=\\"30\\" cy=\\"30\\" r=\\"30\\" fill=\\"%23ddd\\"/><text x=\\"30\\" y=\\"35\\" text-anchor=\\"middle\\" font-size=\\"20\\" fill=\\"white\\">${client.name.charAt(0)}</text></svg>'">
        </div>
        <h3>${client.name}</h3>
        <p class="client-role">${client.role}</p>
        <p class="client-info">${client.company}</p>
        <button onclick="selectClient('${client.id}')" class="btn-primary">Auswählen</button>
    `;
    return card;
}

function selectClient(clientId) {
    console.log('👤 Klient ausgewählt:', clientId);
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    currentState.selectedClient = client;
    updateClientDisplay();
    saveSessionState();
    
    // UI Updates
    document.querySelectorAll('.client-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.client-card').classList.add('selected');
}

function updateClientDisplay() {
    const display = document.getElementById('selectedClientDisplay');
    if (!display || !currentState.selectedClient) return;
    
    const client = currentState.selectedClient;
    display.innerHTML = `
        <div class="selected-client-info">
            <img src="${client.avatar}" alt="${client.name}" class="client-avatar-small">
            <div>
                <h4>${client.name}</h4>
                <p>${client.role} bei ${client.company}</p>
            </div>
        </div>
    `;
    display.style.display = 'block';
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
    saveSessionState();
    
    // Session-Timer starten
    startSessionTimer();
}

function stopSession() {
    console.log('⏹️ Session beendet');
    currentState.sessionActive = false;
    currentState.sessionStartTime = null;
    
    updateSessionUI();
    saveSessionState();
    
    // Optional: Session-Export anbieten
    if (confirm('Möchten Sie die Session-Daten exportieren?')) {
        exportSession();
    }
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
        const elapsed = now - currentState.sessionStartTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
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

// === TEMPLATE MANAGEMENT ===
function loadTemplates() {
    const container = document.getElementById('templateContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Search Bar
    const searchBar = document.createElement('div');
    searchBar.className = 'template-search';
    searchBar.innerHTML = `
        <input type="text" id="templateSearch" placeholder="Templates durchsuchen..." onkeyup="filterTemplates()">
        <button onclick="clearTemplateSearch()" class="btn-secondary">Zurücksetzen</button>
    `;
    container.appendChild(searchBar);
    
    // Template Grid
    const grid = document.createElement('div');
    grid.className = 'template-grid';
    grid.id = 'templateGrid';
    
    coachingTemplates.forEach(template => {
        const card = createTemplateCard(template);
        grid.appendChild(card);
    });
    
    container.appendChild(grid);
}

function createTemplateCard(template) {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `
        <h3>${template.title}</h3>
        <p class="template-category">${template.category}</p>
        <p class="template-description">${template.description}</p>
        <div class="template-actions">
            <button onclick="useTemplate('${template.id}')" class="btn-primary">Verwenden</button>
            <button onclick="editTemplate('${template.id}')" class="btn-secondary">Bearbeiten</button>
        </div>
    `;
    return card;
}

function filterTemplates() {
    const search = document.getElementById('templateSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.template-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const category = card.querySelector('.template-category').textContent.toLowerCase();
        const description = card.querySelector('.template-description').textContent.toLowerCase();
        
        const matches = title.includes(search) || category.includes(search) || description.includes(search);
        card.style.display = matches ? 'block' : 'none';
    });
}

function clearTemplateSearch() {
    document.getElementById('templateSearch').value = '';
    filterTemplates();
}

function useTemplate(templateId) {
    console.log('📝 Template verwendet:', templateId);
    const template = coachingTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    currentState.currentTemplate = template;
    
    // Template in Editor laden
    const editor = document.getElementById('promptEditor');
    if (editor) {
        editor.value = template.prompt;
    }
    
    // UI Feedback
    showNotification(`Template "${template.title}" wurde geladen.`);
}

function editTemplate(templateId) {
    console.log('✏️ Template bearbeitet:', templateId);
    const template = coachingTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    const editor = document.getElementById('promptEditor');
    if (editor) {
        editor.value = template.prompt;
        editor.focus();
    }
    
    currentState.currentTemplate = template;
    showNotification(`Template "${template.title}" im Editor geöffnet.`);
}

// === COLLABORATION SYSTEM ===
function checkCollaborationMode() {
    // Check if we're in an iframe (collaboration mode)
    const isInIframe = window !== window.parent;
    
    if (isInIframe) {
        console.log('🤝 Kollaborationsmodus erkannt');
        currentState.collaborationMode = true;
        setupCollaborationMode();
    }
}

function setupCollaborationMode() {
    document.body.classList.add('collaboration-mode');
    
    // Hide main navigation in collaboration mode
    const nav = document.querySelector('.main-nav');
    if (nav) nav.style.display = 'none';
    
    // Show collaboration interface
    const collabInterface = document.getElementById('collaborationInterface');
    if (collabInterface) {
        collabInterface.style.display = 'block';
    }
}

function startCollaborationMonitoring() {
    console.log('🔍 Kollaborations-Monitoring gestartet');
    
    // Aggressive localStorage monitoring
    setInterval(() => {
        try {
            const stored = localStorage.getItem('collaborationData');
            if (stored) {
                const data = JSON.parse(stored);
                handleCollaborationUpdate(data);
            }
        } catch (error) {
            console.error('Collaboration monitoring error:', error);
        }
    }, 200); // Very frequent checks
    
    // PostMessage listener for cross-frame communication
    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'collaboration') {
            console.log('📨 PostMessage empfangen:', event.data);
            handleCollaborationUpdate(event.data);
        }
    });
}

function handleCollaborationUpdate(data) {
    if (!data || !data.prompt) return;
    
    const now = Date.now();
    
    // Anti-Override Protection
    if (collaborationProtection.isProtected && 
        collaborationProtection.lastUpdate && 
        (now - collaborationProtection.lastUpdate) < 5000) {
        console.log('🛡️ Anti-Override Schutz aktiv - Update ignoriert');
        return;
    }
    
    // Update protection system
    collaborationProtection.isProtected = true;
    collaborationProtection.protectedData = data;
    collaborationProtection.lastUpdate = now;
    
    console.log('🔄 Kollaborations-Update verarbeitet:', data);
    
    currentState.collaborationData = data;
    updateCollaborationDisplay(data);
    
    // Clear protection after delay
    setTimeout(() => {
        collaborationProtection.isProtected = false;
    }, 10000);
}

function updateCollaborationDisplay(data) {
    const display = document.getElementById('collaborationDisplay');
    if (!display) return;
    
    console.log('🖥️ Kollaborations-Display wird aktualisiert');
    
    display.innerHTML = `
        <div class="collaboration-content">
            <div class="prompt-section">
                <h3>Coaching-Prompt</h3>
                <div class="prompt-display">${escapeHtml(data.prompt)}</div>
            </div>
            
            ${data.aiResponse ? `
                <div class="ai-response-section">
                    <h3>KI-Antwort</h3>
                    <div class="ai-response-display">${escapeHtml(data.aiResponse)}</div>
                </div>
            ` : ''}
            
            <div class="collaboration-actions">
                <button onclick="approvePrompt()" class="btn-success">✅ Genehmigen</button>
                <button onclick="rejectPrompt()" class="btn-danger">❌ Ablehnen</button>
                <button onclick="requestChanges()" class="btn-warning">🔄 Änderungen anfordern</button>
            </div>
        </div>
    `;
    
    display.style.display = 'block';
}

// === COLLABORATION ACTIONS ===
function sendToCollaboration() {
    const editor = document.getElementById('promptEditor');
    if (!editor || !editor.value.trim()) {
        alert('Bitte geben Sie einen Prompt ein.');
        return;
    }
    
    console.log('📤 Sende an Kollaboration:', editor.value);
    
    const collaborationData = {
        type: 'collaboration',
        prompt: editor.value.trim(),
        timestamp: new Date().toISOString(),
        client: currentState.selectedClient,
        session: currentState.sessionActive
    };
    
    // Simulate AI response generation
    generateAIResponse(collaborationData);
}

function generateAIResponse(collaborationData) {
    console.log('🤖 Generiere KI-Antwort...');
    
    // Show loading state
    showNotification('KI-Antwort wird generiert...', 'info');
    
    // Simulate AI processing delay
    setTimeout(() => {
        const aiResponse = generateSimulatedResponse(collaborationData.prompt);
        
        const fullData = {
            ...collaborationData,
            aiResponse: aiResponse,
            aiGeneratedAt: new Date().toISOString()
        };
        
        // Store in localStorage with protection
        try {
            localStorage.setItem('collaborationData', JSON.stringify(fullData));
            console.log('💾 Kollaborations-Daten gespeichert:', fullData);
        } catch (error) {
            console.error('Fehler beim Speichern der Kollaborations-Daten:', error);
        }
        
        // Send via PostMessage
        try {
            window.parent.postMessage(fullData, '*');
            console.log('📨 PostMessage gesendet:', fullData);
        } catch (error) {
            console.error('Fehler beim Senden der PostMessage:', error);
        }
        
        // Update own display if in collaboration mode
        if (currentState.collaborationMode) {
            handleCollaborationUpdate(fullData);
        }
        
        showNotification('KI-Antwort wurde generiert und gesendet.', 'success');
    }, 2000);
}

function generateSimulatedResponse(prompt) {
    const responses = [
        `Basierend auf Ihrem Prompt "${prompt.substring(0, 50)}..." empfehle ich einen strukturierten Ansatz. Beginnen Sie mit einer offenen Frage, um die Perspektive Ihres Klienten zu verstehen. Führen Sie dann durch gezielte Nachfragen zu tieferen Einsichten.`,
        
        `Für diesen Coaching-Kontext schlage ich vor, zunächst den aktuellen Zustand zu explorieren. Nutzen Sie aktives Zuhören und Paraphrasieren, um Verständnis zu zeigen. Anschließend können Sie gemeinsam Ziele und Handlungsschritte entwickeln.`,
        
        `Ihr Prompt zeigt eine gute Coaching-Richtung. Ich empfehle, mit einer Skalierungsfrage zu beginnen: "Auf einer Skala von 1-10, wie zufrieden sind Sie aktuell mit...?" Dies hilft, den Status quo zu bewerten und Entwicklungspotentiale zu identifizieren.`,
        
        `Dieser Ansatz eignet sich gut für eine lösungsfokussierte Coaching-Session. Konzentrieren Sie sich auf Ressourcen und bereits vorhandene Stärken Ihres Klienten. Fragen Sie nach Ausnahmen: "Wann hat es schon einmal gut funktioniert?"`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function approvePrompt() {
    console.log('✅ Prompt genehmigt');
    const data = currentState.collaborationData;
    
    if (data) {
        data.status = 'approved';
        data.approvedAt = new Date().toISOString();
        
        // Update storage
        localStorage.setItem('collaborationData', JSON.stringify(data));
        
        // Notify parent window
        window.parent.postMessage({
            type: 'collaboration_approved',
            data: data
        }, '*');
    }
    
    showNotification('Prompt wurde genehmigt!', 'success');
}

function rejectPrompt() {
    console.log('❌ Prompt abgelehnt');
    const reason = prompt('Grund für die Ablehnung (optional):');
    
    const data = currentState.collaborationData;
    if (data) {
        data.status = 'rejected';
        data.rejectedAt = new Date().toISOString();
        data.rejectionReason = reason || '';
        
        localStorage.setItem('collaborationData', JSON.stringify(data));
        
        window.parent.postMessage({
            type: 'collaboration_rejected',
            data: data
        }, '*');
    }
    
    showNotification('Prompt wurde abgelehnt.', 'warning');
}

function requestChanges() {
    console.log('🔄 Änderungen angefordert');
    const changes = prompt('Welche Änderungen sind gewünscht?');
    
    if (!changes) return;
    
    const data = currentState.collaborationData;
    if (data) {
        data.status = 'changes_requested';
        data.changesRequestedAt = new Date().toISOString();
        data.requestedChanges = changes;
        
        localStorage.setItem('collaborationData', JSON.stringify(data));
        
        window.parent.postMessage({
            type: 'collaboration_changes_requested',
            data: data
        }, '*');
    }
    
    showNotification('Änderungen wurden angefordert.', 'info');
}

// === EXPORT FUNCTIONS ===
function exportSession() {
    if (!currentState.selectedClient) {
        alert('Keine aktive Session zum Exportieren.');
        return;
    }
    
    const sessionData = {
        client: currentState.selectedClient,
        startTime: currentState.sessionStartTime,
        endTime: new Date(),
        template: currentState.currentTemplate,
        collaborationData: currentState.collaborationData,
        exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(sessionData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `coaching-session-${currentState.selectedClient.name}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Session-Daten wurden exportiert.', 'success');
}

function exportAsMarkdown() {
    if (!currentState.collaborationData) {
        alert('Keine Kollaborations-Daten zum Exportieren.');
        return;
    }
    
    const data = currentState.collaborationData;
    const markdown = `# Coaching Session Export

## Klient
**Name:** ${data.client ? data.client.name : 'Unbekannt'}
**Datum:** ${new Date(data.timestamp).toLocaleString('de-DE')}

## Coaching-Prompt
\`\`\`
${data.prompt}
\`\`\`

## KI-Antwort
${data.aiResponse || 'Keine KI-Antwort verfügbar'}

## Status
**Status:** ${data.status || 'Pending'}
**Exportiert am:** ${new Date().toLocaleString('de-DE')}
`;
    
    const blob = new Blob([markdown], {type: 'text/markdown'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `coaching-session-${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    
    showNotification('Markdown-Export abgeschlossen.', 'success');
}

// === UTILITY FUNCTIONS ===
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    // Type-specific colors
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// === STATE MANAGEMENT ===
function saveSessionState() {
    try {
        const stateToSave = {
            ...currentState,
            savedAt: new Date().toISOString()
        };
        localStorage.setItem('coachingAppState', JSON.stringify(stateToSave));
        console.log('💾 Session-State gespeichert');
    } catch (error) {
        console.error('Fehler beim Speichern des Session-States:', error);
    }
}

function restoreSessionState() {
    try {
        const saved = localStorage.getItem('coachingAppState');
        if (saved) {
            const parsedState = JSON.parse(saved);
            
            // Merge with current state
            currentState = {
                ...currentState,
                ...parsedState,
                sessionStartTime: parsedState.sessionStartTime ? new Date(parsedState.sessionStartTime) : null
            };
            
            console.log('🔄 Session-State wiederhergestellt');
            
            // Update UI accordingly
            if (currentState.selectedClient) {
                updateClientDisplay();
            }
            if (currentState.sessionActive) {
                updateSessionUI();
                startSessionTimer();
            }
        }
    } catch (error) {
        console.error('Fehler beim Wiederherstellen des Session-States:', error);
    }
}

// === EVENT LISTENERS ===
function setupEventListeners() {
    console.log('🎧 Event Listeners werden eingerichtet');
    
    // Prompt Editor
    const editor = document.getElementById('promptEditor');
    if (editor) {
        editor.addEventListener('input', () => {
            // Auto-save draft
            localStorage.setItem('promptDraft', editor.value);
        });
        
        // Restore draft
        const draft = localStorage.getItem('promptDraft');
        if (draft && !editor.value) {
            editor.value = draft;
        }
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
    
    // Window events
    window.addEventListener('beforeunload', () => {
        saveSessionState();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 's':
                    e.preventDefault();
                    saveSessionState();
                    showNotification('State gespeichert!');
                    break;
                case 'e':
                    e.preventDefault();
                    if (currentState.collaborationData) {
                        exportAsMarkdown();
                    }
                    break;
            }
        }
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
}

// === DEBUG FUNCTIONS ===
function debugCollaborationSync() {
    console.log('🔍 DEBUG: Kollaborations-Sync Status');
    console.log('Current State:', currentState);
    console.log('Collaboration Protection:', collaborationProtection);
    console.log('LocalStorage Data:', localStorage.getItem('collaborationData'));
    
    // Test data injection
    const testData = {
        type: 'collaboration',
        prompt: 'Debug Test Prompt ' + new Date().toLocaleTimeString(),
        aiResponse: 'Debug Test Response ' + new Date().toLocaleTimeString(),
        timestamp: new Date().toISOString()
    };
    
    console.log('Injecting test data:', testData);
    handleCollaborationUpdate(testData);
}

// Emergency restore function
function emergencyRestore() {
    console.log('🚨 Emergency Restore aktiviert');
    
    // Clear protection
    collaborationProtection = {
        isProtected: false,
        protectedData: null,
        lastUpdate: 0
    };
    
    // Force reload of collaboration data
    const stored = localStorage.getItem('collaborationData');
    if (stored) {
        try {
            const data = JSON.parse(stored);
            handleCollaborationUpdate(data);
            showNotification('Emergency Restore abgeschlossen', 'success');
        } catch (error) {
            console.error('Emergency Restore Fehler:', error);
            showNotification('Emergency Restore fehlgeschlagen', 'error');
        }
    }
}

// Make emergency function globally available
window.emergencyRestore = emergencyRestore;

console.log('✅ KI-Coaching App vollständig geladen - Version: Finale mit KI-Response Fix');