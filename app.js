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

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 KI-Coaching App wird initialisiert...');
    
    // Daten-Validierung mit Fallback
    validateData();
    
    // UI initialisieren
    initializeApp();
    
    // Event Listeners einrichten
    setupEventListeners();
    
    console.log('✅ Triadisches KI-Coaching App vollständig geladen - ECHTE GT1-GT12 PROMPTS');
});

function validateData() {
    let attempts = 0;
    const maxAttempts = 20;
    
    function checkData() {
        attempts++;
        
        // Clients prüfen
        if (!window.clients || !Array.isArray(window.clients) || window.clients.length === 0) {
            if (attempts < maxAttempts) {
                console.log(`Warte auf Daten... Versuch ${attempts}/${maxAttempts}`);
                setTimeout(checkData, 100);
                return;
            } else {
                console.log('⚠️ Fallback: Verwende integrierte Klienten-Daten');
                window.clients = fallbackClients;
            }
        }
        
        // Prompts prüfen
        if (!window.prompts || Object.keys(window.prompts).length === 0) {
            console.log('⚠️ Prompts nicht verfügbar - verwende Notfall-System');
        }
        
        console.log(`✅ Clients Array verfügbar: ${window.clients?.length || 0} Klienten`);
        console.log(`🔍 Prompts verfügbar: ${Object.keys(window.prompts || {}).length}`);
        console.log(`✅ ${window.clients?.length || 0} Klienten + ${Object.keys(window.prompts || {}).length} Prompts geladen`);
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
        
        // Alt+S für Suche
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            document.getElementById('promptSearch')?.focus();
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
    
    // Coach-KI Assistant
    const coachInput = document.getElementById('coachInput');
    if (coachInput) {
        coachInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleCoachQuery();
            }
        });
    }
    
    // Quick Actions
    document.querySelectorAll('.quick-action').forEach(btn => {
        btn.addEventListener('click', function() {
            sendCoachQuery(this.dataset.query);
        });
    });
    
    console.log('✅ Event Listeners bereit');
}

function renderClientsOverview() {
    const container = document.getElementById('clientsContainer');
    if (!container || !window.clients) return;
    
    const clientsArray = window.clients || fallbackClients;
    console.log(`📋 Verfügbare Klienten: ${JSON.stringify(clientsArray.map(c => c.name))}`);
    
    container.innerHTML = clientsArray.map(client => `
        <div class="client-card" onclick="selectClient('${client.id}')">
            <div class="client-avatar">${client.avatar}</div>
            <div class="client-info">
                <h3>${client.name}</h3>
                <p class="client-role">${client.role}</p>
                <p class="client-goal">${client.currentGoal}</p>
                <div class="client-stats">
                    <span>📅 ${client.lastSession}</span>
                    <span>📊 ${client.totalSessions} Sessions</span>
                </div>
            </div>
            <div class="client-status ${client.status}">${client.status}</div>
        </div>
    `).join('');
}

function selectClient(clientId) {
    const clientsArray = window.clients || fallbackClients;
    currentClient = clientsArray.find(c => c.id === clientId);
    
    if (currentClient) {
        document.querySelectorAll('.client-card').forEach(card => {
            card.classList.remove('selected');
        });
        event.target.closest('.client-card').classList.add('selected');
        
        document.getElementById('startSessionBtn').style.display = 'block';
        updateClientInfo();
    }
}

function startSession() {
    if (!currentClient) return;
    
    sessionActive = true;
    sessionDuration = 0;
    
    // Timer starten
    sessionTimer = setInterval(() => {
        sessionDuration++;
        updateSessionTimer();
    }, 1000);
    
    // UI Updates
    document.getElementById('sessionStatus').textContent = 'Session aktiv';
    document.getElementById('sessionStatus').className = 'status active';
    
    switchTab('coaching');
    updateClientInfo();
}

function stopSession() {
    sessionActive = false;
    if (sessionTimer) {
        clearInterval(sessionTimer);
        sessionTimer = null;
    }
    
    document.getElementById('sessionStatus').textContent = 'Session beendet';
    document.getElementById('sessionStatus').className = 'status';
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
    // Tab-Buttons aktualisieren
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    
    // Content anzeigen
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`)?.classList.add('active');
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
}

function renderPrompts() {
    const container = document.getElementById('promptsContainer');
    if (!container) return;
    
    const promptsObj = window.prompts || {};
    const promptsList = Object.entries(promptsObj);
    
    if (promptsList.length === 0) {
        container.innerHTML = '<p>⚠️ Prompts werden geladen...</p>';
        return;
    }
    
    container.innerHTML = promptsList.map(([key, prompt]) => `
        <div class="prompt-card" data-category="${prompt.category}" data-phase="${prompt.phase}">
            <div class="prompt-header">
                <span class="prompt-id">${key}</span>
                <span class="prompt-category ${prompt.category.toLowerCase()}">${prompt.category}</span>
            </div>
            <div class="prompt-text">${prompt.text}</div>
            <div class="prompt-description">${prompt.description}</div>
            <div class="prompt-actions">
                <button onclick="copyPrompt('${key}')" title="Kopieren">📋</button>
                <button onclick="editPrompt('${key}')" title="Bearbeiten">📝</button>
                <button onclick="sendToCollaboration('${key}')" title="An Kollaboration senden">📤</button>
            </div>
        </div>
    `).join('');
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
        const newText = prompt(prompt.text);
        if (newText && newText !== prompt.text) {
            window.prompts[promptKey].text = newText;
            renderPrompts();
            showNotification(`📝 ${promptKey} bearbeitet`);
        }
    }
}

function sendToCollaboration(promptKey) {
    const prompt = window.prompts?.[promptKey];
    if (!prompt) return;
    
    // Daten für Kollaboration vorbereiten
    const collaborationItem = {
        id: Date.now(),
        type: 'prompt',
        promptKey: promptKey,
        text: prompt.text,
        category: prompt.category,
        timestamp: new Date().toLocaleTimeString(),
        sender: 'Coach',
        status: 'sent'
    };
    
    // Zu Kollaboration hinzufügen
    collaborationData.push(collaborationItem);
    
    // In localStorage speichern für Echtzeit-Sync
    localStorage.setItem('collaborationData', JSON.stringify(collaborationData));
    
    // KI-Antwort generieren
    setTimeout(() => {
        generateAIResponse(collaborationItem);
    }, 2000);
    
    // Zur Kollaboration wechseln
    switchTab('collaboration');
    updateCollaborationView();
    
    showNotification(`📤 ${promptKey} an Kollaboration gesendet`);
}

function generateAIResponse(promptItem) {
    let aiResponse = '';
    
    // Intelligente Antworten basierend auf Prompt-Kategorie
    switch (promptItem.category) {
        case 'GT':
            if (promptItem.promptKey === 'GT4') {
                aiResponse = `Ich spüre ein Spannungsfeld zwischen **Kontrolle und Loslassen**. Einerseits möchte ich alles unter Kontrolle haben und nichts dem Zufall überlassen. Andererseits merke ich, dass dieses ständige Kontrollbedürfnis mich erschöpft und mir die Spontaneität nimmt.
                
**Empfehlung:** Dieses Spannungsfeld eignet sich perfekt für eine Avatar-Aufstellung. Möchten Sie das DelightEx Avatar-Tool nutzen?`;
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
            
**Körperlich** spüre ich: [Coachee beschreibt Körperwahrnehmungen]`;
            break;
            
        case 'LÖS':
            aiResponse = `Das ist ein sehr hilfreicher Ansatz! Wenn ich an meine **Stärken** denke, dann sind das definitiv: [Coachee zählt Ressourcen auf]
            
**Nächste Schritte:** Das könnte ich konkret angehen...`;
            break;
            
        case 'META':
            aiResponse = `Unser Gespräch erlebe ich als sehr **erhellend**. Besonders hilfreich war die Arbeit mit den Spannungsfeldern - das hat mir eine neue Perspektive eröffnet.
            
**Mitnehmen werde ich:** Die Erkenntnis über meine beiden Pole und die ersten Schritte zur Integration.`;
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
    localStorage.setItem('collaborationData', JSON.stringify(collaborationData));
    updateCollaborationView();
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
    const saved = localStorage.getItem('collaborationData');
    if (saved) {
        try {
            collaborationData = JSON.parse(saved);
        } catch (e) {
            collaborationData = [];
        }
    }
    
    updateCollaborationView();
    
    // Echtzeit-Monitoring
    setInterval(() => {
        const current = localStorage.getItem('collaborationData');
        if (current && current !== JSON.stringify(collaborationData)) {
            try {
                collaborationData = JSON.parse(current);
                updateCollaborationView();
            } catch (e) {
                console.log('Kollaboration sync error:', e);
            }
        }
    }, 500);
}

function updateCollaborationView() {
    const container = document.getElementById('collaborationMessages');
    if (!container) return;
    
    if (collaborationData.length === 0) {
        container.innerHTML = `
            <div class="collaboration-empty">
                <h3>⏳ Warten auf Coaching-Prompt...</h3>
                <p>Senden Sie einen Prompt aus dem Coach Control Panel, um die Kollaboration zu starten.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = collaborationData.map(item => `
        <div class="collaboration-message ${item.sender.toLowerCase().replace(' ', '-').replace('-', '_')}">
            <div class="message-header">
                <span class="sender">${item.sender}</span>
                <span class="timestamp">${item.timestamp}</span>
                ${item.promptKey ? `<span class="prompt-ref">${item.promptKey}</span>` : ''}
            </div>
            <div class="message-content">${item.text}</div>
            ${item.type === 'ai_response' ? `
                <div class="message-actions">
                    <button onclick="approveResponse(${item.id})" class="approve-btn">✅ Genehmigen</button>
                    <button onclick="rejectResponse(${item.id})" class="reject-btn">❌ Ablehnen</button>
                    <button onclick="editResponse(${item.id})" class="edit-btn">🔄 Änderungen</button>
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
        localStorage.setItem('collaborationData', JSON.stringify(collaborationData));
        updateCollaborationView();
        showNotification('✅ Antwort genehmigt');
    }
}

function rejectResponse(responseId) {
    collaborationData = collaborationData.filter(i => i.id !== responseId);
    localStorage.setItem('collaborationData', JSON.stringify(collaborationData));
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
            localStorage.setItem('collaborationData', JSON.stringify(collaborationData));
            updateCollaborationView();
            showNotification('🔄 Antwort bearbeitet');
        }
    }
}

function handleCoachQuery() {
    const input = document.getElementById('coachInput');
    if (!input || !input.value.trim()) return;
    
    const query = input.value.trim();
    input.value = '';
    
    sendCoachQuery(query);
}

function sendCoachQuery(query) {
    // Query zur Coach-KI Historie hinzufügen
    addCoachMessage('Coach', query);
    
    // KI-Antwort generieren
    setTimeout(() => {
        const response = generateCoachAIResponse(query);
        addCoachMessage('Coach-KI', response);
    }, 1000);
}

function generateCoachAIResponse(query) {
    const lowerQuery = query.toLowerCase();
    
    // Intelligente Antworten basierend auf Query
    if (lowerQuery.includes('gt4') || lowerQuery.includes('spannungsfeld')) {
        return `**GT4-Einsatz - Spannungsfeld-Identifikation:**

🎯 GT4 "Was ist einerseits, was ist andererseits?" ist perfekt um Polaritäten zu erfassen.

**Vorgehensweise:**
• Nach beiden Polen fragen
• Spannungsfeld benennen lassen
• DelightEx Avatar-Aufstellung empfehlen
• Integration in GT7-GT10 vorbereiten

**Next Steps:** GT5 (emotionale Auswirkung) → GT6 (Bedeutung)`;
    }
    
    if (lowerQuery.includes('phase')) {
        return `**Aktueller Prozess-Status:**

📍 **Phase ${currentPhase}/4** - ${getPhaseName(currentPhase)}
👤 **Client:** ${currentClient?.name || 'Kein Client ausgewählt'}
⏱️ **Session:** ${sessionActive ? 'Aktiv' : 'Nicht gestartet'}

**Empfehlung:** ${getPhaseRecommendation(currentPhase)}`;
    }
    
    if (lowerQuery.includes('prozess')) {
        return `**Prozess-Beratung:**

🔄 **12-Phasen-Ablauf** (Geißler Triadisch):
• **Phase 1-3:** Anliegen erfassen (GT1-GT3)
• **Phase 4-6:** Spannungsfeld verstehen (GT4-GT6)  
• **Phase 7-10:** Lösungsraum öffnen (GT7-GT10)
• **Phase 11-12:** Handlung planen (GT11-GT12)

**Aktuelle Empfehlung:** ${getProcessAdvice()}`;
    }
    
    if (lowerQuery.includes('methoden')) {
        const methods = [
            '🎭 **Avatar-Aufstellung** (DelightEx) - für Spannungsfelder',
            '🔍 **Lösungsfokus** (SF1-SF5) - für Ressourcen-Aktivierung', 
            '📊 **Skalierung** (SF2) - für Fortschritts-Messung',
            '🎯 **Wunderfrage** (SF1) - für Ziel-Klarheit',
            '🧠 **Meta-Reflexion** (META1-META5) - für Prozess-Bewertung'
        ];
        return `**Methoden-Empfehlung:**\n\n${methods[Math.floor(Math.random() * methods.length)]}\n\n**Integration:** Diese Methode passt optimal zu Phase ${currentPhase} und kann mit den GT-Prompts kombiniert werden.`;
    }
    
    return `**Coach-KI Antwort:**

Ihre Anfrage "${query}" wurde verarbeitet. 

**Kontext:** 
• Client: ${currentClient?.name || 'Nicht ausgewählt'}
• Phase: ${currentPhase}/4
• Session: ${sessionActive ? 'Aktiv' : 'Bereit'}

**Empfehlung:** Nutzen Sie die GT-Prompts systematisch und beobachten Sie die Spannungsfeld-Dynamik beim Coachee.`;
}

function addCoachMessage(sender, message) {
    const container = document.getElementById('coachMessages');
    if (!container) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `coach-message ${sender.toLowerCase().replace('-', '_')}`;
    messageDiv.innerHTML = `
        <div class="message-header">
            <strong>${sender}</strong>
            <span class="timestamp">${new Date().toLocaleTimeString()}</span>
        </div>
        <div class="message-content">${message}</div>
    `;
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function getPhaseName(phase) {
    const names = {
        1: 'Erstanliegen',
        2: 'Problemanalyse', 
        3: 'Lösungsstrategie',
        4: 'Umsetzung'
    };
    return names[phase] || 'Unbekannt';
}

function getPhaseRecommendation(phase) {
    const recommendations = {
        1: 'Beginnen Sie mit GT1 für offenes Anliegen, dann GT2 für Zeitrahmen',
        2: 'GT4 für Spannungsfeld-Identifikation ist zentral - bereiten Sie Avatar-Aufstellung vor',
        3: 'GT7-GT8 für Ziel und Ressourcen, GT9-GT10 für Bewahren/Loslassen-Balance',
        4: 'GT11 für konkrete Schritte, GT12 für Unterstützungs-Angebot'
    };
    return recommendations[phase] || 'Flexibel auf den Coachee eingehen';
}

function getProcessAdvice() {
    if (!currentClient) return 'Wählen Sie zuerst einen Klienten aus';
    if (!sessionActive) return 'Starten Sie die Session für gezielten Prozess-Support';
    return `Bei ${currentClient.name} empfiehlt sich systematisches Vorgehen mit GT-Prompts`;
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
    // Einfache Benachrichtigung
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
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.opacity = '1', 100);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Debug-Funktionen
function debugCollaborationSync() {
    console.log('🔍 Kollaboration Debug:');
    console.log('- Daten im Speicher:', collaborationData.length);
    console.log('- LocalStorage:', localStorage.getItem('collaborationData')?.length || 0);
    console.log('- Letzte Aktivität:', collaborationData[collaborationData.length - 1]?.timestamp);
}

// Avatar Tool Integration
function openAvatarTool() {
    window.open('https://www.delightex.com', '_blank');
    showNotification('🎭 DelightEx Avatar-Tool geöffnet');
}