// KI-Coaching App - VOLLSTÄNDIG SYNCHRONISIERT
// Datum: 25. Juli 2025 - ALLE EVENT-HANDLER KORREKT

let currentState = {
    selectedClient: null,
    sessionActive: false,
    sessionStartTime: null,
    currentTemplate: null,
    collaborationMode: false,
    collaborationData: null
};

let collaborationProtection = {
    isProtected: false,
    protectedData: null,
    lastUpdate: 0
};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 KI-Coaching App wird initialisiert...');
    updateDebugInfo('App wird initialisiert...');
    
    // Mehrfache Versuche für data.js Loading
    let attempts = 0;
    const maxAttempts = 10;
    
    const tryInit = () => {
        attempts++;
        updateDebugInfo(`Initialisierungsversuch ${attempts}/${maxAttempts}`);
        
        if (typeof clients !== 'undefined' && Array.isArray(clients)) {
            initializeApp();
        } else if (attempts < maxAttempts) {
            setTimeout(tryInit, 200);
        } else {
            console.error('❌ KRITISCH: Daten konnten nicht geladen werden nach', maxAttempts, 'Versuchen');
            updateDebugInfo('❌ FEHLER: Daten nicht geladen');
            showNotification('Kritischer Fehler beim Laden der Daten', 'error');
        }
    };
    
    tryInit();
});

function initializeApp() {
    console.log('📋 App-Initialisierung gestartet');
    updateDebugInfo('App-Initialisierung läuft...');
    
    // Validate data
    if (!Array.isArray(clients) || clients.length === 0) {
        console.error('❌ KRITISCHER FEHLER: clients Array nicht verfügbar oder leer');
        updateDebugInfo('❌ Clients Array fehlt');
        showNotification('Klienten-Daten konnten nicht geladen werden', 'error');
        return;
    }
    
    console.log('✅ Clients Array verfügbar:', clients.length, 'Klienten');
    console.log('📋 Verfügbare Klienten:', clients.map(c => c.name));
    updateDebugInfo(`✅ ${clients.length} Klienten geladen`);
    
    // Initialize components
    loadClients();
    loadTemplates();
    restoreSessionState();
    checkCollaborationMode();
    setupEventListeners(); // KRITISCH: Event-Handler setup
    startCollaborationMonitoring();
    
    // Global debug functions
    window.debugCollaborationSync = debugCollaborationSync;
    window.emergencyRestore = emergencyRestore;
    window.currentState = currentState;
    
    updateDebugInfo('✅ App vollständig geladen');
    showNotification('App erfolgreich geladen!', 'success');
}

function updateDebugInfo(message) {
    const debugElement = document.getElementById('debugInfo');
    if (debugElement) {
        debugElement.textContent = message;
    }
}

// === CLIENT MANAGEMENT ===
function loadClients() {
    const clientGrid = document.getElementById('clientGrid');
    if (!clientGrid) {
        console.error('❌ clientGrid Element nicht gefunden');
        updateDebugInfo('❌ clientGrid fehlt');
        return;
    }
    
    console.log('👥 Lade', clients.length, 'Klienten in clientGrid...');
    clientGrid.innerHTML = '';
    
    clients.forEach(client => {
        const clientCard = createClientCard(client);
        clientGrid.appendChild(clientCard);
    });
    
    console.log('✅ Klienten erfolgreich geladen');
    updateDebugInfo(`✅ ${clients.length} Klienten angezeigt`);
}

function createClientCard(client) {
    const card = document.createElement('div');
    card.className = 'client-card';
    
    // WICHTIG: Korrekte Event-Handler
    card.addEventListener('click', () => selectClient(client.id));
    
    card.innerHTML = `
        <div class="client-avatar">
            <img src="${client.avatar}" alt="${client.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"60\\" height=\\"60\\" viewBox=\\"0 0 60 60\\"><circle cx=\\"30\\" cy=\\"30\\" r=\\"30\\" fill=\\"%23ddd\\"/><text x=\\"30\\" y=\\"35\\" text-anchor=\\"middle\\" font-size=\\"20\\" fill=\\"white\\">${client.name.charAt(0)}</text></svg>'">
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
    updateDebugInfo(`Wähle Klient: ${clientId}`);
    
    if (!Array.isArray(clients)) {
        console.error('❌ FEHLER: clients ist kein Array:', typeof clients);
        updateDebugInfo('❌ clients Array fehlt');
        showNotification('Fehler beim Laden der Klienten-Daten', 'error');
        return;
    }
    
    const client = clients.find(c => c.id === clientId);
    if (!client) {
        console.error('❌ Klient nicht gefunden:', clientId);
        updateDebugInfo(`❌ Klient ${clientId} nicht gefunden`);
        showNotification('Klient konnte nicht gefunden werden', 'error');
        return;
    }
    
    console.log('✅ Klient erfolgreich ausgewählt:', client.name);
    currentState.selectedClient = client;
    updateClientDisplay();
    saveSessionState();
    
    // UI Updates
    document.querySelectorAll('.client-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Find clicked card and select it
    const allCards = document.querySelectorAll('.client-card');
    allCards.forEach(card => {
        if (card.querySelector('h3').textContent === client.name) {
            card.classList.add('selected');
        }
    });
    
    updateDebugInfo(`✅ ${client.name} ausgewählt`);
    showNotification(`Klient ${client.name} ausgewählt`, 'success');
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
        updateDebugInfo('❌ Kein Klient ausgewählt');
        return;
    }
    
    console.log('🎯 Session gestartet für:', currentState.selectedClient.name);
    updateDebugInfo(`🎯 Session: ${currentState.selectedClient.name}`);
    
    currentState.sessionActive = true;
    currentState.sessionStartTime = new Date();
    
    updateSessionUI();
    saveSessionState();
    startSessionTimer();
    
    showNotification(`Session mit ${currentState.selectedClient.name} gestartet`, 'success');
}

function stopSession() {
    console.log('⏹️ Session beendet');
    updateDebugInfo('⏹️ Session beendet');
    
    currentState.sessionActive = false;
    currentState.sessionStartTime = null;
    
    updateSessionUI();
    saveSessionState();
    
    showNotification('Session beendet', 'info');
    
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
    
    if (!Array.isArray(coachingTemplates)) {
        console.error('❌ coachingTemplates nicht verfügbar');
        return;
    }
    
    console.log('📚 Lade', coachingTemplates.length, 'Templates...');
    container.innerHTML = '';
    
    const searchBar = document.createElement('div');
    searchBar.className = 'template-search';
    searchBar.innerHTML = `
        <input type="text" id="templateSearch" placeholder="Templates durchsuchen...">
        <button class="btn-secondary" onclick="clearTemplateSearch()">Zurücksetzen</button>
    `;
    container.appendChild(searchBar);
    
    // Event-Handler für Search
    const searchInput = searchBar.querySelector('#templateSearch');
    searchInput.addEventListener('keyup', filterTemplates);
    
    const grid = document.createElement('div');
    grid.className = 'template-grid';
    grid.id = 'templateGrid';
    
    coachingTemplates.forEach(template => {
        const card = createTemplateCard(template);
        grid.appendChild(card);
    });
    
    container.appendChild(grid);
    console.log('✅ Templates erfolgreich geladen');
}

function createTemplateCard(template) {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `
        <h3>${template.title}</h3>
        <p class="template-category">${template.category}</p>
        <p class="template-description">${template.description}</p>
        <div class="template-actions">
            <button class="btn-primary use-template-btn" data-template-id="${template.id}">Verwenden</button>
            <button class="btn-secondary edit-template-btn" data-template-id="${template.id}">Bearbeiten</button>
        </div>
    `;
    
    // Event-Handler für Template-Buttons
    card.querySelector('.use-template-btn').addEventListener('click', () => useTemplate(template.id));
    card.querySelector('.edit-template-btn').addEventListener('click', () => editTemplate(template.id));
    
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
    const searchInput = document.getElementById('templateSearch');
    if (searchInput) {
        searchInput.value = '';
        filterTemplates();
    }
}

function useTemplate(templateId) {
    console.log('📝 Template verwendet:', templateId);
    
    if (!Array.isArray(coachingTemplates)) {
        console.error('❌ coachingTemplates nicht verfügbar');
        return;
    }
    
    const template = coachingTemplates.find(t => t.id === templateId);
    if (!template) {
        console.error('❌ Template nicht gefunden:', templateId);
        return;
    }
    
    currentState.currentTemplate = template;
    
    const editor = document.getElementById('promptEditor');
    if (editor) {
        editor.value = template.prompt;
    }
    
    showNotification(`Template "${template.title}" wurde geladen.`, 'success');
}

function editTemplate(templateId) {
    console.log('✏️ Template bearbeitet:', templateId);
    
    if (!Array.isArray(coachingTemplates)) {
        console.error('❌ coachingTemplates nicht verfügbar');
        return;
    }
    
    const template = coachingTemplates.find(t => t.id === templateId);
    if (!template) {
        console.error('❌ Template nicht gefunden:', templateId);
        return;
    }
    
    const editor = document.getElementById('promptEditor');
    if (editor) {
        editor.value = template.prompt;
        editor.focus();
    }
    
    currentState.currentTemplate = template;
    showNotification(`Template "${template.title}" im Editor geöffnet.`, 'info');
}

// === COLLABORATION SYSTEM ===
function checkCollaborationMode() {
    const isInIframe = window !== window.parent;
    
    if (isInIframe) {
        console.log('🤝 Kollaborationsmodus erkannt');
        currentState.collaborationMode = true;
        setupCollaborationMode();
    }
}

function setupCollaborationMode() {
    document.body.classList.add('collaboration-mode');
    
    const nav = document.querySelector('.main-nav');
    if (nav) nav.style.display = 'none';
    
    const collabInterface = document.getElementById('collaborationInterface');
    if (collabInterface) {
        collabInterface.style.display = 'block';
    }
}

function startCollaborationMonitoring() {
    console.log('🔍 Kollaborations-Monitoring gestartet');
    
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
    }, 200);
    
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
    
    if (collaborationProtection.isProtected && 
        collaborationProtection.lastUpdate && 
        (now - collaborationProtection.lastUpdate) < 5000) {
        console.log('🛡️ Anti-Override Schutz aktiv - Update ignoriert');
        return;
    }
    
    collaborationProtection.isProtected = true;
    collaborationProtection.protectedData = data;
    collaborationProtection.lastUpdate = now;
    
    console.log('🔄 Kollaborations-Update verarbeitet:', data);
    updateDebugInfo('🔄 Kollaboration aktualisiert');
    
    currentState.collaborationData = data;
    updateCollaborationDisplay(data);
    
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
            ` : `
                <div class="ai-response-section">
                    <h3>KI-Antwort</h3>
                    <div class="ai-loading">
                        <p>🤖 KI generiert Antwort...</p>
                        <div class="loading-spinner"></div>
                    </div>
                </div>
            `}
            
            <div class="collaboration-actions">
                <button class="btn-success approve-btn">✅ Genehmigen</button>
                <button class="btn-danger reject-btn">❌ Ablehnen</button>
                <button class="btn-warning changes-btn">🔄 Änderungen anfordern</button>
            </div>
        </div>
    `;
    
    // Event-Handler für Collaboration-Buttons
    const approveBtn = display.querySelector('.approve-btn');
    const rejectBtn = display.querySelector('.reject-btn');
    const changesBtn = display.querySelector('.changes-btn');
    
    if (approveBtn) approveBtn.addEventListener('click', approvePrompt);
    if (rejectBtn) rejectBtn.addEventListener('click', rejectPrompt);
    if (changesBtn) changesBtn.addEventListener('click', requestChanges);
    
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
    updateDebugInfo('📤 Sende an Kollaboration');
    
    const collaborationData = {
        type: 'collaboration',
        prompt: editor.value.trim(),
        timestamp: new Date().toISOString(),
        client: currentState.selectedClient,
        session: currentState.sessionActive
    };
    
    showNotification('Prompt wird an Kollaboration gesendet...', 'info');
    generateAIResponse(collaborationData);
}

function generateAIResponse(collaborationData) {
    console.log('🤖 Generiere KI-Antwort...');
    updateDebugInfo('🤖 KI-Antwort wird generiert');
    
    showNotification('KI-Antwort wird generiert...', 'info');
    
    try {
        localStorage.setItem('collaborationData', JSON.stringify(collaborationData));
        window.parent.postMessage(collaborationData, '*');
    } catch (error) {
        console.error('Fehler beim Speichern der Prompt-Daten:', error);
    }
    
    setTimeout(() => {
        const aiResponse = generateSimulatedResponse(collaborationData.prompt);
        
        const fullData = {
            ...collaborationData,
            aiResponse: aiResponse,
            aiGeneratedAt: new Date().toISOString()
        };
        
        try {
            localStorage.setItem('collaborationData', JSON.stringify(fullData));
            window.parent.postMessage(fullData, '*');
        } catch (error) {
            console.error('Fehler beim Speichern der vollständigen Kollaborations-Daten:', error);
        }
        
        if (currentState.collaborationMode) {
            handleCollaborationUpdate(fullData);
        }
        
        updateDebugInfo('✅ KI-Antwort generiert');
        showNotification('KI-Antwort wurde generiert und gesendet.', 'success');
    }, 2000);
}

function generateSimulatedResponse(prompt) {
    const promptLower = prompt.toLowerCase();
    
    if (typeof dataUtils !== 'undefined' && dataUtils.getRandomAIResponse) {
        if (promptLower.includes('ziel') || promptLower.includes('smart')) {
            return dataUtils.getRandomAIResponse('goal-setting');
        } else if (promptLower.includes('führung') || promptLower.includes('team') || promptLower.includes('leadership')) {
            return dataUtils.getRandomAIResponse('leadership');
        } else if (promptLower.includes('zeit') || promptLower.includes('priorität') || promptLower.includes('produktiv')) {
            return dataUtils.getRandomAIResponse('time-management');
        }
    }
    
    const responses = [
        `Basierend auf Ihrem Prompt "${prompt.substring(0, 50)}..." empfehle ich einen strukturierten Ansatz. Beginnen Sie mit einer offenen Frage, um die Perspektive Ihres Klienten zu verstehen.`,
        `Für diesen Coaching-Kontext schlage ich vor, zunächst den aktuellen Zustand zu explorieren. Nutzen Sie aktives Zuhören und Paraphrasieren, um Verständnis zu zeigen.`,
        `Ihr Prompt zeigt eine gute Coaching-Richtung. Ich empfehle, mit einer Skalierungsfrage zu beginnen: "Auf einer Skala von 1-10, wie zufrieden sind Sie aktuell mit...?"`,
        `Dieser Ansatz eignet sich gut für eine lösungsfokussierte Coaching-Session. Konzentrieren Sie sich auf Ressourcen und bereits vorhandene Stärken Ihres Klienten.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function approvePrompt() {
    console.log('✅ Prompt genehmigt');
    updateDebugInfo('✅ Prompt genehmigt');
    
    const data = currentState.collaborationData;
    if (data) {
        data.status = 'approved';
        data.approvedAt = new Date().toISOString();
        
        localStorage.setItem('collaborationData', JSON.stringify(data));
        window.parent.postMessage({
            type: 'collaboration_approved',
            data: data
        }, '*');
    }
    
    showNotification('Prompt wurde genehmigt!', 'success');
}

function rejectPrompt() {
    console.log('❌ Prompt abgelehnt');
    updateDebugInfo('❌ Prompt abgelehnt');
    
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
    updateDebugInfo('🔄 Änderungen angefordert');
    
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
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
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
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
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
            
            currentState = {
                ...currentState,
                ...parsedState,
                sessionStartTime: parsedState.sessionStartTime ? new Date(parsedState.sessionStartTime) : null
            };
            
            console.log('🔄 Session-State wiederhergestellt');
            
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
    updateDebugInfo('🎧 Event Listeners setup');
    
    // Session-Buttons - KRITISCH
    const startBtn = document.getElementById('startSessionBtn');
    const stopBtn = document.getElementById('stopSessionBtn');
    
    if (startBtn) {
        startBtn.addEventListener('click', startSession);
        console.log('✅ Start-Button Event-Handler verbunden');
    } else {
        console.error('❌ Start-Button nicht gefunden');
        updateDebugInfo('❌ Start-Button fehlt');
    }
    
    if (stopBtn) {
        stopBtn.addEventListener('click', stopSession);
        console.log('✅ Stop-Button Event-Handler verbunden');
    }
    
    // Coaching-Buttons
    const sendBtn = document.getElementById('sendToCollaborationBtn');
    const exportBtn = document.getElementById('exportMarkdownBtn');
    
    if (sendBtn) sendBtn.addEventListener('click', sendToCollaboration);
    if (exportBtn) exportBtn.addEventListener('click', exportAsMarkdown);
    
    // Prompt Editor
    const editor = document.getElementById('promptEditor');
    if (editor) {
        editor.addEventListener('input', () => {
            localStorage.setItem('promptDraft', editor.value);
        });
        
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
    window.addEventListener('beforeunload', saveSessionState);
    
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
    
    updateDebugInfo('✅ Event Listeners bereit');
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

// === DEBUG FUNCTIONS ===
function debugCollaborationSync() {
    console.log('🔍 DEBUG: Kollaborations-Sync Status');
    console.log('Current State:', currentState);
    console.log('Collaboration Protection:', collaborationProtection);
    console.log('LocalStorage Data:', localStorage.getItem('collaborationData'));
    console.log('Clients Array:', Array.isArray(clients) ? `✅ Array mit ${clients.length} Einträgen` : `❌ Nicht verfügbar: ${typeof clients}`);
    console.log('Templates Array:', Array.isArray(coachingTemplates) ? `✅ Array mit ${coachingTemplates.length} Einträgen` : `❌ Nicht verfügbar: ${typeof coachingTemplates}`);
    
    const testData = {
        type: 'collaboration',
        prompt: 'Debug Test Prompt ' + new Date().toLocaleTimeString(),
        aiResponse: 'Debug Test Response ' + new Date().toLocaleTimeString(),
        timestamp: new Date().toISOString()
    };
    
    console.log('Injecting test data:', testData);
    handleCollaborationUpdate(testData);
}

function emergencyRestore() {
    console.log('🚨 Emergency Restore aktiviert');
    updateDebugInfo('🚨 Emergency Restore');
    
    collaborationProtection = {
        isProtected: false,
        protectedData: null,
        lastUpdate: 0
    };
    
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
    
    if (!Array.isArray(clients)) {
        console.error('❌ KRITISCH: clients Array fehlt');
        updateDebugInfo('❌ KRITISCH: clients fehlt');
        showNotification('Kritischer Fehler: Klienten-Daten fehlen', 'error');
    } else {
        console.log('✅ Clients Array OK:', clients.length, 'Einträge');
    }
    
    if (!Array.isArray(coachingTemplates)) {
        console.error('❌ WARNING: coachingTemplates Array fehlt');
        showNotification('Warning: Template-Daten fehlen', 'warning');
    } else {
        console.log('✅ Templates Array OK:', coachingTemplates.length, 'Einträge');
    }
}

// Global error handler
window.addEventListener('error', function(event) {
    console.error('🚨 Global Error:', event.error);
    updateDebugInfo('🚨 Global Error aufgetreten');
    
    if (event.error && event.error.message && event.error.message.includes('clients.find')) {
        console.error('❌ DETECTED: clients.find Error!');
        showNotification('Klienten-Daten-Fehler erkannt. Versuche Reparatur...', 'error');
        
        setTimeout(() => {
            if (typeof clients === 'undefined' || !Array.isArray(clients)) {
                console.log('🔧 Versuche data.js neu zu laden...');
                const script = document.createElement('script');
                script.src = 'data.js';
                script.onload = () => {
                    console.log('✅ data.js neu geladen');
                    initializeApp();
                };
                document.head.appendChild(script);
            }
        }, 1000);
    }
});

console.log('✅ KI-Coaching App vollständig geladen - Version: VOLLSTÄNDIG SYNCHRONISIERT mit Event-Handlers');