// KI-Coaching App - Finale Version mit clients.find Fix
// Datum: 25. Juli 2025
// Status: Vollständige Lösung für alle Probleme

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
    
    // Warten bis data.js geladen ist
    if (typeof clients === 'undefined') {
        console.log('⏳ Warte auf data.js...');
        setTimeout(initializeApp, 100);
    } else {
        initializeApp();
    }
});

function initializeApp() {
    console.log('📋 App-Initialisierung gestartet');
    
    // Verify data is loaded
    if (typeof clients === 'undefined' || !Array.isArray(clients)) {
        console.error('❌ KRITISCHER FEHLER: clients Array nicht verfügbar');
        showNotification('Daten konnten nicht geladen werden. Seite wird neu geladen...', 'error');
        setTimeout(() => window.location.reload(), 2000);
        return;
    }
    
    console.log('✅ Clients Array verfügbar:', clients.length, 'Klienten');
    
    loadClients();
    loadTemplates();
    restoreSessionState();
    checkCollaborationMode();
    setupEventListeners();
    startCollaborationMonitoring();
    
    // Debug-Tool für Troubleshooting
    window.debugCollaborationSync = debugCollaborationSync;
    window.emergencyRestore = emergencyRestore;
    
    showNotification('App erfolgreich geladen!', 'success');
}

// === CLIENT MANAGEMENT ===
function loadClients() {
    const clientGrid = document.getElementById('clientGrid');
    if (!clientGrid) {
        console.error('❌ clientGrid Element nicht gefunden');
        return;
    }
    
    if (!Array.isArray(clients) || clients.length === 0) {
        console.error('❌ Clients Array ist leer oder nicht verfügbar');
        clientGrid.innerHTML = '<p class="error-message">Keine Klienten-Daten verfügbar</p>';
        return;
    }
    
    console.log('👥 Lade', clients.length, 'Klienten...');
    clientGrid.innerHTML = '';
    
    clients.forEach(client => {
        const clientCard = createClientCard(client);
        clientGrid.appendChild(clientCard);
    });
    
    console.log('✅ Klienten erfolgreich geladen');
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
    console.log('👤 Klient wird ausgewählt:', clientId);
    
    // KRITISCHER FIX: Verify clients array exists and is array
    if (!Array.isArray(clients)) {
        console.error('❌ FEHLER: clients ist kein Array:', typeof clients, clients);
        showNotification('Fehler beim Laden der Klienten-Daten', 'error');
        return;
    }
    
    const client = clients.find(c => c.id === clientId);
    if (!client) {
        console.error('❌ Klient nicht gefunden:', clientId);
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
    
    // Find and select the clicked card
    const clickedCard = event?.target?.closest('.client-card');
    if (clickedCard) {
        clickedCard.classList.add('selected');
    }
    
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
        return;
    }
    
    console.log('🎯 Session gestartet für:', currentState.selectedClient.name);
    currentState.sessionActive = true;
    currentState.sessionStartTime = new Date();
    
    updateSessionUI();
    saveSessionState();
    startSessionTimer();
    
    showNotification(`Session mit ${currentState.selectedClient.name} gestartet`, 'success');
}

function stopSession() {
    console.log('⏹️ Session beendet');
    currentState.sessionActive = false;
    currentState.sessionStartTime = null;
    
    updateSessionUI();
    saveSessionState();
    
    showNotification('Session beendet', 'info');
    
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
    
    if (!Array.isArray(coachingTemplates)) {
        console.error('❌ coachingTemplates nicht verfügbar');
        return;
    }
    
    console.log('📚 Lade', coachingTemplates.length, 'Templates...');
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
    
    // Template in Editor laden
    const editor = document.getElementById('promptEditor');
    if (editor) {
        editor.value = template.prompt;
    }
    
    // UI Feedback
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
    const nav = document.querySelector