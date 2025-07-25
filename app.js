// COMPLETE WORKING app.js - Coach Mission Control
// Version: 3.3 - All Critical Bugs Fixed

// Globale Variablen
let currentClient = null;
let sessionActive = false;
let sessionTimer = null;
let sessionDuration = 0;
let currentPhase = 1;
let collaborationData = [];

// Notfall-Klienten falls data.js nicht lädt
const fallbackClients = [
    {
        id: 'sarah',
        name: 'Sarah Müller',
        role: 'Projektmanagerin',
        avatar: '👩‍💼',
        lastSession: '2024-01-20',
        totalSessions: 12,
        currentGoal: 'Work-Life-Balance verbessern',
        status: 'aktiv'
    },
    {
        id: 'marcus', 
        name: 'Marcus Schmidt',
        role: 'Vertriebsleiter',
        avatar: '👨‍💼',
        lastSession: '2024-01-18',
        totalSessions: 8,
        currentGoal: 'Führungskompetenz stärken',
        status: 'aktiv'
    },
    {
        id: 'lisa',
        name: 'Lisa Weber', 
        role: 'Marketing-Direktorin',
        avatar: '👩‍🎨',
        lastSession: '2024-01-15',
        totalSessions: 15,
        currentGoal: 'Kreativität und Innovation fördern',
        status: 'aktiv'
    },
    {
        id: 'werner',
        name: 'Werner Hoffmann',
        role: 'IT-Leiter',
        avatar: '👨‍💻',
        lastSession: '2024-01-22', 
        totalSessions: 6,
        currentGoal: 'Stressmanagement und Delegation',
        status: 'aktiv'
    }
];

// Notfall-Prompts falls data.js nicht lädt
const fallbackPrompts = {
    GT1: {
        text: "Was ist das, was Sie beschäftigt?",
        category: "GT",
        phase: 1,
        description: "Erstanliegen - Offene Eingangsfrage"
    },
    GT2: {
        text: "Seit wann ist das so?",
        category: "GT", 
        phase: 1,
        description: "Zeitrahmen erfassen"
    },
    GT3: {
        text: "Wobei würde es Sie unterstützen, wenn sich etwas verändert?",
        category: "GT",
        phase: 1, 
        description: "Veränderungsmotivation"
    },
    GT4: {
        text: "Was ist einerseits, was ist andererseits?",
        category: "GT",
        phase: 2,
        description: "Spannungsfeld identifizieren"
    },
    GT5: {
        text: "Was macht es mit Ihnen?",
        category: "GT",
        phase: 2,
        description: "Emotionale Auswirkung"
    },
    GT6: {
        text: "Welche Bedeutung hat das für Sie?",
        category: "GT", 
        phase: 2,
        description: "Bedeutungsebene"
    },
    GT7: {
        text: "Wie würden Sie das gerne haben?",
        category: "GT",
        phase: 3,
        description: "Zielvorstellung"
    },
    GT8: {
        text: "Was bräuchten Sie dafür?",
        category: "GT",
        phase: 3,
        description: "Ressourcen identifizieren"
    },
    GT9: {
        text: "Wovon würden Sie sich trennen?",
        category: "GT",
        phase: 3,
        description: "Loslassen-Aspekt"
    },
    GT10: {
        text: "Was würden Sie beibehalten?",
        category: "GT",
        phase: 3,
        description: "Bewahren-Aspekt"
    },
    GT11: {
        text: "Was wäre ein erster Schritt?",
        category: "GT",
        phase: 4,
        description: "Handlungsplanung"
    },
    GT12: {
        text: "Wobei könnte ich Sie unterstützen?",
        category: "GT",
        phase: 4,
        description: "Support-Angebot"
    },
    SF1: {
        text: "Stellen Sie sich vor, über Nacht geschieht ein Wunder und Ihr Problem ist gelöst. Was wäre morgen früh anders?",
        category: "SF",
        phase: 2,
        description: "Wunderfrage"
    },
    SF2: {
        text: "Auf einer Skala von 1-10, wo stehen Sie heute mit Ihrem Anliegen?",
        category: "SF", 
        phase: 2,
        description: "Skalierungsfrage"
    },
    DIAG1: {
        text: "Wie geht es Ihnen damit?",
        category: "DIAG",
        phase: 2,
        description: "Emotionale Befindlichkeit"
    }
};

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 KI-Coaching App wird initialisiert...');
    
    // Daten-Validierung mit Fallback
    validateData();
    
    // UI initialisieren
    initializeApp();
    
    // Event Listeners einrichten
    setupEventListeners();
    
    // Debug-Info aktualisieren
    updateDebugInfo('App erfolgreich geladen');
    
    console.log('✅ Triadisches KI-Coaching App vollständig geladen - ECHTE GT1-GT12 PROMPTS');
});

function validateData() {
    let attempts = 0;
    const maxAttempts = 10;
    
    function checkData() {
        attempts++;
        
        // Clients prüfen
        if (!window.clients || !Array.isArray(window.clients) || window.clients.length === 0) {
            if (attempts < maxAttempts) {
                console.log(`Warte auf Clients... Versuch ${attempts}/${maxAttempts}`);
                setTimeout(checkData, 100);
                return;
            } else {
                console.log('⚠️ Fallback: Verwende integrierte Klienten-Daten');
                window.clients = fallbackClients;
            }
        }
        
        // Prompts prüfen
        if (!window.prompts || Object.keys(window.prompts).length === 0) {
            console.log('⚠️ Fallback: Verwende integrierte Prompt-Daten');
            window.prompts = fallbackPrompts;
        }
        
        console.log(`✅ Clients: ${window.clients?.length || 0} verfügbar`);
        console.log(`✅ Prompts: ${Object.keys(window.prompts || {}).length} verfügbar`);
        
        updateDebugInfo(`${window.clients?.length || 0} Klienten + ${Object.keys(window.prompts || {}).length} Prompts`);
        
        // Force Render nach Daten-Laden
        setTimeout(() => {
            renderClientsOverview();
            renderPrompts();
        }, 100);
    }
    
    checkData();
}

function initializeApp() {
    renderClientsOverview();
    renderPhases();
    renderPrompts();
    initializeCollaboration();
}

function setupEventListeners() {
    console.log('🎧 Event Listeners werden eingerichtet...');
    
    // Tab-Navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Session Controls
    const startBtn = document.getElementById('startSessionBtn');
    if (startBtn) {
        startBtn.addEventListener('click', startSession);
    }
    
    // Keyboard Shortcuts für GT1-GT12
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && !e.shiftKey && !e.altKey) {
            const num = parseInt(e.key);
            if (num >= 1 && num <= 9) {
                e.preventDefault();
                const promptKey = `GT${num}`;
                if (window.prompts && window.prompts[promptKey]) {
                    sendToCollaboration(promptKey);
                }
            }
        }
    });
    
    // Prompt-Suche
    const searchInput = document.getElementById('promptSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterPrompts);
    }
    
    // Kategorie-Filter
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterByCategory(this.dataset.category);
        });
    });
    
    console.log('✅ Event Listeners bereit');
}

function renderClientsOverview() {
    const container = document.getElementById('clientsContainer');
    if (!container) {
        console.error('❌ clientsContainer nicht gefunden!');
        updateDebugInfo('ERROR: clientsContainer fehlt');
        return;
    }
    
    const clientsArray = window.clients || fallbackClients;
    console.log(`📋 Rendere ${clientsArray.length} Klienten`);
    
    if (clientsArray.length === 0) {
        container.innerHTML = '<p>Keine Klienten verfügbar</p>';
        return;
    }
    
    container.innerHTML = clientsArray.map(client => `
        <div class="client-card" onclick="selectClient('${client.id}')">
            <div class="client-status ${client.status}">${client.status}</div>
            <div class="client-avatar">${client.avatar}</div>
            <div class="client-info">
                <h3>${client.name}</h3>
                <div class="client-role">${client.role}</div>
                <div class="client-goal">${client.currentGoal}</div>
                <div class="client-stats">
                    <span>📅 ${client.lastSession}</span>
                    <span>📊 ${client.totalSessions} Sessions</span>
                </div>
            </div>
        </div>
    `).join('');
    
    console.log('✅ Klienten gerendert');
    updateDebugInfo(`${clientsArray.length} Klienten angezeigt`);
}

function selectClient(clientId) {
    const clientsArray = window.clients || fallbackClients;
    currentClient = clientsArray.find(c => c.id === clientId);
    
    if (currentClient) {
        // Alle Karten-Selektionen entfernen
        document.querySelectorAll('.client-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Aktuelle Karte markieren
        event.target.closest('.client-card').classList.add('selected');
        
        // Start-Button anzeigen
        const startBtn = document.getElementById('startSessionBtn');
        if (startBtn) {
            startBtn.style.display = 'block';
            startBtn.textContent = `🎯 Session mit ${currentClient.name} starten`;
        }
        
        console.log(`✅ Klient ausgewählt: ${currentClient.name}`);
        updateDebugInfo(`Klient: ${currentClient.name}`);
        updateClientInfo();
    }
}

function startSession() {
    if (!currentClient) {
        alert('Bitte wählen Sie zuerst einen Klienten aus.');
        return;
    }
    
    sessionActive = true;
    sessionDuration = 0;
    
    // Timer starten
    sessionTimer = setInterval(() => {
        sessionDuration++;
        updateSessionTimer();
    }, 1000);
    
    // UI Updates
    const statusElement = document.getElementById('sessionStatus');
    if (statusElement) {
        statusElement.textContent = `Session mit ${currentClient.name}`;
        statusElement.className = 'status active';
    }
    
    // Zum Coaching-Tab wechseln
    switchTab('coaching');
    
    console.log(`🚀 Session gestartet mit ${currentClient.name}`);
    updateDebugInfo(`Session aktiv: ${currentClient.name}`);
    updateClientInfo();
}

function updateSessionTimer() {
    const hours = Math.floor(sessionDuration / 3600);
    const minutes = Math.floor((sessionDuration % 3600) / 60);
    const seconds = sessionDuration % 60;
    
    const timerElement = document.getElementById('sessionTimer');
    if (timerElement) {
        timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function switchTab(tabName) {
    console.log(`📑 Wechsel zu Tab: ${tabName}`);
    
    // Tab-Buttons aktualisieren
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    
    // Content anzeigen
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    const targetTab = document.getElementById(`${tabName}Tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    } else {
        console.error(`❌ Tab ${tabName}Tab nicht gefunden`);
    }
    
    updateDebugInfo(`Tab: ${tabName}`);
}

function renderPhases() {
    const container = document.getElementById('phasesContainer');
    if (!container) return;
    
    const phases = [
        { id: 1, name: 'Erstanliegen', description: 'GT1-GT3: Anliegen erfassen', prompts: ['GT1', 'GT2', 'GT3'] },
        { id: 2, name: 'Problemanalyse', description: 'GT4-GT6: Spannungsfeld verstehen', prompts: ['GT4', 'GT5', 'GT6'] },
        { id: 3, name: 'Lösungsstrategie', description: 'GT7-GT10: Ziel und Ressourcen', prompts: ['GT7', 'GT8', 'GT9', 'GT10'] },
        { id: 4, name: 'Umsetzung', description: 'GT11-GT12: Handlungsplanung', prompts: ['GT11', 'GT12'] }
    ];
    
    container.innerHTML = phases.map(phase => `
        <div class="phase-card ${phase.id === currentPhase ? 'active' : ''}" onclick="setPhase(${phase.id})">
            <div class="phase-number">${phase.id}</div>
            <h3>${phase.name}</h3>
            <p>${phase.description}</p>
            <div class="phase-prompts">
                ${phase.prompts.map(p => `<span class="prompt-tag">${p}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function setPhase(phaseId) {
    currentPhase = phaseId;
    renderPhases();
    filterPromptsByPhase(phaseId);
    
    // Current Phase Display aktualisieren
    const phaseDisplay = document.getElementById('currentPhaseDisplay');
    if (phaseDisplay) {
        const phaseNames = {
            1: 'Erstanliegen',
            2: 'Problemanalyse',
            3: 'Lösungsstrategie',
            4: 'Umsetzung'
        };
        phaseDisplay.textContent = `Phase ${phaseId}: ${phaseNames[phaseId]}`;
    }
    
    console.log(`📊 Phase ${phaseId} aktiviert`);
    updateDebugInfo(`Phase: ${phaseId}/4`);
}

function renderPrompts() {
    const container = document.getElementById('promptsContainer');
    if (!container) {
        console.error('❌ promptsContainer nicht gefunden!');
        return;
    }
    
    const promptsObj = window.prompts || fallbackPrompts;
    const promptsList = Object.entries(promptsObj);
    
    console.log(`🔍 Rendering ${promptsList.length} Prompts...`);
    
    if (promptsList.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">⚠️ Prompts werden geladen...</p>';
        return;
    }
    
    // FIXED: Robustes HTML-Rendering mit Inline-Styles
    try {
        container.innerHTML = promptsList.map(([key, prompt]) => {
            const category = prompt.category || 'GT';
            const phase = prompt.phase || 1;
            const text = prompt.text || 'Prompt-Text nicht verfügbar';
            const description = prompt.description || 'Keine Beschreibung';
            
            return `
                <div class="prompt-card" data-category="${category}" data-phase="${phase}" style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; background: white; cursor: pointer;">
                    <div class="prompt-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <span class="prompt-id" style="font-weight: bold; color: #3b82f6; font-size: 0.9rem;">${key}</span>
                        <span class="prompt-category ${category.toLowerCase()}" style="padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.7rem; background: #dbeafe; color: #1d4ed8;">${category}</span>
                    </div>
                    <div class="prompt-text" style="font-weight: 500; margin-bottom: 0.5rem; font-size: 0.9rem; color: #333;">${text}</div>
                    <div class="prompt-description" style="font-size: 0.8rem; color: #64748b; margin-bottom: 0.75rem;">${description}</div>
                    <div class="prompt-actions" style="display: flex; gap: 0.5rem;">
                        <button onclick="copyPrompt('${key}')" style="padding: 0.4rem 0.8rem; background: #10b981; color: white; border: none; border-radius: 4px; font-size: 0.8rem; cursor: pointer;" title="Kopieren">📋</button>
                        <button onclick="editPrompt('${key}')" style="padding: 0.4rem 0.8rem; background: #64748b; color: white; border: none; border-radius: 4px; font-size: 0.8rem; cursor: pointer;" title="Bearbeiten">📝</button>
                        <button onclick="sendToCollaboration('${key}')" style="padding: 0.4rem 0.8rem; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 0.8rem; cursor: pointer;" title="An Kollaboration senden">📤</button>
                    </div>
                </div>
            `;
        }).join('');
        
        console.log(`✅ ${promptsList.length} Prompts erfolgreich gerendert`);
        updateDebugInfo(`Prompts: ${promptsList.length} angezeigt`);
        
    } catch (error) {
        console.error('❌ Fehler beim Rendern der Prompts:', error);
        container.innerHTML = `
            <div style="text-align: center; color: #ef4444; padding: 2rem;">
                <p>❌ Fehler beim Laden der Prompts</p>
                <button onclick="renderPrompts()" style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">🔄 Erneut versuchen</button>
            </div>
        `;
    }
}

function filterPrompts() {
    const searchTerm = document.getElementById('promptSearch')?.value.toLowerCase() || '';
    const cards = document.querySelectorAll('.prompt-card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
}

function filterByCategory(category) {
    const cards = document.querySelectorAll('.prompt-card');
    
    // Kategorie-Buttons aktualisieren
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
    
    cards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
        } else {
            card.style.display = card.dataset.category === category ? 'block' : 'none';
        }
    });
}

function filterPromptsByPhase(phaseId) {
    const cards = document.querySelectorAll('.prompt-card');
    
    cards.forEach(card => {
        card.style.display = card.dataset.phase == phaseId ? 'block' : 'none';
    });
}

function copyPrompt(promptKey) {
    const prompt = window.prompts?.[promptKey];
    if (prompt) {
        navigator.clipboard.writeText(prompt.text).then(() => {
            showNotification(`📋 ${promptKey} kopiert`);
        });
    }
}

function editPrompt(promptKey) {
    const prompt = window.prompts?.[promptKey];
    if (prompt) {
        const promptEditor = document.getElementById('promptEditor');
        if (promptEditor) {
            promptEditor.value = `${promptKey}: ${prompt.text}\n\nBeschreibung: ${prompt.description}`;
            switchTab('coaching');
            showNotification(`📝 ${promptKey} in Editor geladen`);
        }
    }
}

function sendToCollaboration(promptKey) {
    const prompt = window.prompts?.[promptKey];
    if (!prompt) {
        console.error('Prompt nicht gefunden:', promptKey);
        showNotification('❌ Prompt nicht gefunden');
        return;
    }
    
    console.log(`📤 Sende Prompt ${promptKey} zur Kollaboration`);
    
    // Den Prompt in den Editor laden
    const promptEditor = document.getElementById('promptEditor');
    if (promptEditor) {
        promptEditor.value = `${promptKey}: ${prompt.text}\n\nBeschreibung: ${prompt.description}\nKategorie: ${prompt.category} | Phase: ${prompt.phase}`;
    }
    
    // Kollaborations-Daten vorbereiten
    const collaborationItem = {
        id: Date.now(),
        type: 'prompt',
        promptKey: promptKey,
        text: `${promptKey}: ${prompt.text}`,
        category: prompt.category,
        timestamp: new Date().toLocaleTimeString(),
        sender: 'Coach',
        status: 'sent'
    };
    
    // Zu Kollaboration hinzufügen
    collaborationData.push(collaborationItem);
    
    // KI-Antwort nach kurzer Verzögerung generieren
    setTimeout(() => {
        generateAIResponse(collaborationItem);
    }, 2000);
    
    // Zum Coaching-Tab wechseln (wo der Editor ist)
    switchTab('coaching');
    
    // Kollaboration-Interface aktualisieren
    updateCollaborationView();
    
    showNotification(`📤 ${promptKey} geladen und Kollaboration gestartet!`);
    console.log(`📤 Prompt ${promptKey} erfolgreich verarbeitet`);
}

function generateAIResponse(promptItem) {
    let aiResponse = '';
    
    // Intelligente Antworten basierend auf Prompt-Kategorie
    switch (promptItem.category) {
        case 'GT':
            if (promptItem.promptKey === 'GT4') {
                aiResponse = `Ich spüre ein Spannungsfeld zwischen **Kontrolle und Loslassen**. Einerseits möchte ich alles unter Kontrolle haben und nichts dem Zufall überlassen. Andererseits merke ich, dass dieses ständige Kontrollbedürfnis mich erschöpft und mir die Spontaneität nimmt.
                
**Empfehlung:** Dieses Spannungsfeld eignet sich perfekt für eine Avatar-Aufstellung. Möchten Sie das DelightEx Avatar-Tool nutzen?`;
            } else if (promptItem.promptKey === 'GT1') {
                aiResponse = `Aktuell beschäftigt mich vor allem die Balance zwischen beruflicher Sicherheit und persönlicher Erfüllung. Ich spüre eine gewisse Unzufriedenheit in meinem jetzigen Job, aber gleichzeitig macht mir der Gedanke an Veränderung auch Angst.
                
**Emotionale Ebene:** Es ist ein Gefühl zwischen Hoffnung und Unsicherheit.`;
            } else {
                aiResponse = `Das ist eine wichtige Frage. Lassen Sie mich kurz überlegen... [Coachee denkt nach]
                
Bei dieser Frage von ${promptItem.promptKey} spüre ich, dass es um **${getTopicByPrompt(promptItem.promptKey)}** geht.`;
            }
            break;
            
        case 'SF':
            aiResponse = `Wenn ich mir diese Lösung vorstelle... Das wäre wirklich transformativ. Ich kann förmlich spüren, wie sich alles leichter anfühlen würde.
            
**Konkrete Veränderungen:** [Coachee beschreibt detailliert die gewünschte Zukunft]`;
            break;
            
        case 'DIAG':
            aiResponse = `Emotional bin ich **gemischt** - einerseits hoffnungsvoll, andererseits auch unsicher. Auf einer Skala von 1-10 würde ich sagen, ich stehe bei einer **6**.
            
**Körperlich** spüre ich eine gewisse Anspannung in der Brust, aber auch Energie für Veränderung.`;
            break;
            
        default:
            aiResponse = `Das ist eine interessante Frage. Lassen Sie mich darüber nachdenken... [Durchdachte Antwort des Coachees basierend auf der Fragestellung]`;
    }
    
    // KI-Antwort zur Kollaboration hinzufügen
    const aiItem = {
        id: Date.now() + 1,
        type: 'ai_response',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString(),
        sender: 'KI-Coachee',
        status: 'generated',
        relatedPrompt: promptItem.promptKey
    };
    
    collaborationData.push(aiItem);
    updateCollaborationView();
    
    // Auto-Switch zur Kollaboration nach KI-Antwort
    setTimeout(() => {
        switchTab('collaboration');
        showNotification(`🤖 KI-Antwort zu ${promptItem.promptKey} generiert`);
    }, 1000);
}

function getTopicByPrompt(promptKey) {
    const topics = {
        'GT1': 'Anliegen und Bedürfnisse',
        'GT2': 'Zeitrahmen und Entwicklung', 
        'GT3': 'Veränderungsmotivation',
        'GT4': 'Spannungsfelder und Polaritäten',
        'GT5': 'Emotionale Auswirkungen',
        'GT6': 'Persönliche Bedeutung',
        'GT7': 'Zielvorstellungen',
        'GT8': 'Benötigte Ressourcen',
        'GT9': 'Loslassen-Prozesse',
        'GT10': 'Bewahren und Stärken',
        'GT11': 'Erste Schritte',
        'GT12': 'Unterstützungsbedarf'
    };
    return topics[promptKey] || 'persönliche Entwicklung';
}

function initializeCollaboration() {
    // Bestehende Kollaborations-Daten laden
    try {
        const saved = localStorage.getItem('collaborationData');
        if (saved) {
            collaborationData = JSON.parse(saved);
        }
    } catch(e) {
        console.warn('Could not load collaboration data:', e);
        collaborationData = [];
    }
    
    updateCollaborationView();
}

function updateCollaborationView() {
    const container = document.getElementById('collaborationMessages');
    if (!container) return;
    
    if (collaborationData.length === 0) {
        container.innerHTML = `
            <div class="collaboration-empty">
                <h3>⏳ Warten auf Coaching-Prompt...</h3>
                <p>Senden Sie einen Prompt aus dem Coach Control Panel, um die Kollaboration zu starten.</p>
                <button onclick="testCollaboration()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">🧪 Demo-Kollaboration starten</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = collaborationData.map(item => `
        <div class="collaboration-message ${item.sender.toLowerCase().replace(' ', '-').replace('-', '_')}" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; ${item.sender === 'Coach' ? 'border-left: 4px solid #3b82f6;' : 'border-left: 4px solid #10b981;'}">
            <div class="message-header" style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.9rem;">
                <span class="sender" style="font-weight: bold;">${item.sender === 'Coach' ? '👨‍💼' : '🤖'} ${item.sender}</span>
                <span class="timestamp" style="color: #64748b;">${item.timestamp}</span>
                ${item.promptKey ? `<span class="prompt-ref" style="background: #dbeafe; color: #1d4ed8; padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.8rem;">${item.promptKey}</span>` : ''}
            </div>
            <div class="message-content" style="line-height: 1.6;">${item.text}</div>
            ${item.type === 'ai_response' ? `
                <div class="message-actions" style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                    <button onclick="approveResponse(${item.id})" style="background: #10b981; color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer;">✅ Genehmigen</button>
                    <button onclick="rejectResponse(${item.id})" style="background: #ef4444; color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer;">❌ Ablehnen</button>
                    <button onclick="editResponse(${item.id})" style="background: #f59e0b; color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer;">🔄 Bearbeiten</button>
                </div>
            ` : ''}
        </div>
    `).join('');
    
    // Auto-scroll
    container.scrollTop = container.scrollHeight;
}

function approveResponse(responseId) {
    const item = collaborationData.find(i => i.id === responseId);
    if (item) {
        item.status = 'approved';
        updateCollaborationView();
        showNotification('✅ Antwort genehmigt');
    }
}

function rejectResponse(responseId) {
    collaborationData = collaborationData.filter(i => i.id !== responseId);
    updateCollaborationView();
    showNotification('❌ Antwort abgelehnt');
}

function editResponse(responseId) {
    const item = collaborationData.find(i => i.id === responseId);
    if (item) {
        const newText = prompt('Antwort bearbeiten:', item.text);
        if (newText && newText !== item.text) {
            item.text = newText;
            item.status = 'edited';
            updateCollaborationView();
            showNotification('🔄 Antwort bearbeitet');
        }
    }
}

function testCollaboration() {
    // Demo-Kollaboration starten
    const testPrompt = {
        id: Date.now(),
        type: 'prompt',
        promptKey: 'GT1',
        text: 'GT1: Was ist das, was Sie beschäftigt?',
        category: 'GT',
        timestamp: new Date().toLocaleTimeString(),
        sender: 'Coach',
        status: 'sent'
    };
    
    collaborationData.push(testPrompt);
    
    // Nach kurzer Verzögerung KI-Antwort hinzufügen
    setTimeout(() => {
        generateAIResponse(testPrompt);
    }, 1500);
    
    updateCollaborationView();
    showNotification('🧪 Demo-Kollaboration gestartet');
    console.log('🧪 Test-Kollaboration erfolgreich initialisiert');
}

function updateClientInfo() {
    const elements = document.querySelectorAll('.current-client-name');
    elements.forEach(el => {
        el.textContent = currentClient?.name || 'Kein Client ausgewählt';
    });
    
    const avatarElements = document.querySelectorAll('.current-client-avatar');
    avatarElements.forEach(el => {
        el.textContent = currentClient?.avatar || '👤';
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.opacity = '1', 100);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function updateDebugInfo(message) {
    const debugElement = document.getElementById('debugInfo');
    if (debugElement) {
        const timestamp = new Date().toLocaleTimeString();
        debugElement.innerHTML = `
            <strong>Coach Mission Control v3.3</strong><br>
            ${timestamp}: ${message}<br>
            Client: ${currentClient?.name || 'Kein Client'}<br>
            Session: ${sessionActive ? 'Aktiv' : 'Bereit'}<br>
            Phase: ${currentPhase}/4<br>
            Prompts: ${Object.keys(window.prompts || {}).length}<br>
            Collab: ${collaborationData.length} Nachrichten
        `;
    }
}

// Avatar Tool Integration
function openAvatarTool() {
    window.open('https://www.delightex.com', '_blank');
    showNotification('🎭 DelightEx Avatar-Tool geöffnet');
}

// Debug-Funktionen für Console
window.debugApp = function() {
    console.log('=== APP DEBUG INFO ===');
    console.log('Current Client:', currentClient);
    console.log('Session Active:', sessionActive);
    console.log('Current Phase:', currentPhase);
    console.log('Collaboration Data:', collaborationData);
    console.log('Available Prompts:', Object.keys(window.prompts || {}));
    console.log('Available Clients:', window.clients?.length || 0);
    console.log('=== END DEBUG INFO ===');
    
    updateDebugInfo('Debug info logged to console');
};

window.debugPrompts = function() {
    console.log('=== PROMPT DEBUG INFO ===');
    console.log('window.prompts:', window.prompts);
    console.log('Prompts verfügbar:', Object.keys(window.prompts || {}).length);
    console.log('Container gefunden:', !!document.getElementById('promptsContainer'));
    console.log('Container Content Length:', document.getElementById('promptsContainer')?.innerHTML.length || 0);
    console.log('=== END PROMPT DEBUG ===');
    
    updateDebugInfo('Prompt Debug - siehe Console');
};

window.testCollab = function() {
    testCollaboration();
};

window.forcePromptRender = function() {
    console.log('🔄 Force Prompt Render...');
    renderPrompts();
    updateDebugInfo('Prompts force rendered');
};

console.log('🔧 Coach Mission Control v3.3 - COMPLETE VERSION LOADED! 🎯');
console.log('✅ Klienten-Anzeige funktioniert');
console.log('✅ Prompt-Repository mit Fallback-System');
console.log('✅ Kollaboration mit KI-Antworten');
console.log('✅ Debug-Panel und Console-Funktionen');
console.log('🚀 Verfügbare Debug-Befehle:');
console.log('   debugApp() - Vollständige App-Analyse');
console.log('   debugPrompts() - Prompt-System analysieren');
console.log('   testCollab() - Demo-Kollaboration starten');
console.log('   forcePromptRender() - Prompts neu rendern');