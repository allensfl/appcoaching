// KI-Coaching App - TRIADISCHE STRUKTUR KOMPLETT
// Basierend auf funktionierender jed6wdhyg Version + neue Features
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
    GT5: {
        shortcut: "GT5",
        title: "Situationsanalyse",
        category: "GT",
        phase: 2,
        content: "Beschreiben Sie mir die Situation genauer. In welchem Kontext tritt das Problem auf?",
        description: "Kontextuelle Problemanalyse"
    },
    GT6: {
        shortcut: "GT6",
        title: "Verhaltensanalyse",
        category: "GT",
        phase: 2,
        content: "Wie verhalten Sie sich typischerweise in dieser Situation? Was machen Sie konkret?",
        description: "Verhaltensmuster identifizieren"
    },
    GT7: {
        shortcut: "GT7",
        title: "Systemkontext",
        category: "GT",
        phase: 2,
        content: "Wer ist noch beteiligt? Welche Rollen spielen andere Personen in dieser Situation?",
        description: "Systemische Einbettung analysieren"
    },
    GT8: {
        shortcut: "GT8",
        title: "Optionen entwickeln",
        category: "GT",
        phase: 3,
        content: "Welche Möglichkeiten sehen Sie? Was könnten Sie anders machen?",
        description: "Handlungsalternativen erarbeiten"
    },
    GT9: {
        shortcut: "GT9",
        title: "Ressourcen aktivieren",
        category: "GT",
        phase: 3,
        content: "Was sind Ihre Stärken? Worauf können Sie zurückgreifen?",
        description: "Vorhandene Potentiale nutzen"
    },
    GT10: {
        shortcut: "GT10",
        title: "Aktionsplanung",
        category: "GT",
        phase: 3,
        content: "Was werden Sie konkret tun? Welchen ersten Schritt gehen Sie?",
        description: "Umsetzungsplan entwickeln"
    },
    GT11: {
        shortcut: "GT11",
        title: "Commitment sichern",
        category: "GT",
        phase: 3,
        content: "Wie verbindlich ist das für Sie? Was brauchen Sie, um dranzubleiben?",
        description: "Selbstverpflichtung stärken"
    },
    GT12: {
        shortcut: "GT12",
        title: "Transfer & Abschluss",
        category: "GT",
        phase: 4,
        content: "Wie übertragen Sie das in Ihren Alltag? Was nehmen Sie aus unserem Gespräch mit?",
        description: "Nachhaltigkeit sichern"
    },

    // Solution Finder (SF1-SF12)
    SF1: {
        shortcut: "SF1",
        title: "Lösungsorientierter Einstieg",
        category: "SF",
        phase: 1,
        content: "Stellen Sie sich vor, Ihr Problem wäre gelöst. Woran würden Sie das merken?",
        description: "Lösungsfokussierte Perspektive"
    },
    SF2: {
        shortcut: "SF2",
        title: "Ressourcen aktivieren",
        category: "SF",
        phase: 3,
        content: "Was hat Ihnen in ähnlichen Situationen schon mal geholfen?",
        description: "Vorhandene Stärken identifizieren"
    },
    SF3: {
        shortcut: "SF3",
        title: "Ausnahmen finden",
        category: "SF",
        phase: 2,
        content: "Wann war das Problem schon mal weniger stark? Was war da anders?",
        description: "Erfolgreiche Momente analysieren"
    },
    SF4: {
        shortcut: "SF4",
        title: "Skalierungsfrage",
        category: "SF",
        phase: 2,
        content: "Auf einer Skala von 1-10: Wo stehen Sie heute mit Ihrem Problem?",
        description: "Intensität messbar machen"
    },
    SF5: {
        shortcut: "SF5",
        title: "Kleine Schritte",
        category: "SF",
        phase: 3,
        content: "Was wäre der kleinste mögliche Schritt in die richtige Richtung?",
        description: "Machbare Anfänge definieren"
    },

    // Diagnostische Prompts (DIAG1-15)
    DIAG1: {
        shortcut: "DIAG1",
        title: "Emotionale Befindlichkeit",
        category: "DIAG",
        phase: 2,
        content: "Auf einer Skala von 1-10: Wie würden Sie Ihre aktuelle emotionale Verfassung einschätzen?",
        description: "Skalierung emotionaler Zustand"
    },
    DIAG2: {
        shortcut: "DIAG2",
        title: "Schlüsselaffekt erkennen",
        category: "DIAG",
        phase: 2,
        content: "Welches Gefühl ist in dieser Situation am stärksten präsent?",
        description: "Dominante Emotion identifizieren"
    },
    DIAG3: {
        shortcut: "DIAG3",
        title: "Körperwahrnehmung",
        category: "DIAG",
        phase: 2,
        content: "Wie spüren Sie das Problem in Ihrem Körper? Wo sitzt die Anspannung?",
        description: "Somatische Marker erfassen"
    },
    DIAG4: {
        shortcut: "DIAG4",
        title: "Glaubenssätze",
        category: "DIAG",
        phase: 2,
        content: "Was denken Sie über sich selbst in dieser Situation? Welche Überzeugungen haben Sie?",
        description: "Kognitive Muster erkennen"
    },
    DIAG5: {
        shortcut: "DIAG5",
        title: "Erwartungen anderer",
        category: "DIAG",
        phase: 2,
        content: "Was glauben Sie, was andere von Ihnen erwarten? Welchen Druck spüren Sie?",
        description: "Externe Anforderungen analysieren"
    },

    // Lösungsorientierte Prompts (LÖS1-15)
    LÖS1: {
        shortcut: "LÖS1",
        title: "Wunderfrage",
        category: "LÖS",
        phase: 3,
        content: "Angenommen, über Nacht geschieht ein Wunder und Ihr Problem ist gelöst. Was wäre anders?",
        description: "Klassische Wunderfrage nach de Shazer"
    },
    LÖS2: {
        shortcut: "LÖS2",
        title: "Erste kleine Schritte",
        category: "LÖS",
        phase: 3,
        content: "Was wäre der kleinste Schritt, den Sie heute noch gehen könnten?",
        description: "Sofort umsetzbare Aktion"
    },
    LÖS3: {
        shortcut: "LÖS3",
        title: "Ressourcen-Mapping",
        category: "LÖS",
        phase: 3,
        content: "Welche Fähigkeiten, Menschen oder Hilfsmittel stehen Ihnen zur Verfügung?",
        description: "Verfügbare Unterstützung erfassen"
    },
    LÖS4: {
        shortcut: "LÖS4",
        title: "Erfolgs-Anker",
        category: "LÖS",
        phase: 3,
        content: "Denken Sie an eine Situation, in der Sie erfolgreich waren. Was können Sie daraus übertragen?",
        description: "Positive Erfahrungen nutzen"
    },
    LÖS5: {
        shortcut: "LÖS5",
        title: "Hindernisse antizipieren",
        category: "LÖS",
        phase: 3,
        content: "Welche Hindernisse könnten auftreten? Wie würden Sie damit umgehen?",
        description: "Präventive Problemlösung"
    },

    // Meta-Coaching (META1-10)
    META1: {
        shortcut: "META1",
        title: "Prozess-Check",
        category: "META",
        phase: 0,
        content: "Wie erleben Sie unser Gespräch bisher? Was ist hilfreich für Sie?",
        description: "Zwischenbilanz des Coaching-Prozesses"
    },
    META2: {
        shortcut: "META2",
        title: "Methodenwechsel",
        category: "META",
        phase: 0,
        content: "Ich merke, wir kommen so nicht weiter. Sollen wir einen anderen Ansatz versuchen?",
        description: "Flexibilität im Methodeneinsatz"
    },
    META3: {
        shortcut: "META3",
        title: "Tempo anpassen",
        category: "META",
        phase: 0,
        content: "Ist das Tempo für Sie angemessen? Sollen wir langsamer oder schneller vorgehen?",
        description: "Prozessgeschwindigkeit justieren"
    },
    META4: {
        shortcut: "META4",
        title: "Beziehungsklärung",
        category: "META",
        phase: 0,
        content: "Wie geht es Ihnen mit mir als Coach? Stimmt die Chemie zwischen uns?",
        description: "Coach-Klient-Beziehung reflektieren"
    },
    META5: {
        shortcut: "META5",
        title: "Erwartungsabgleich",
        category: "META",
        phase: 0,
        content: "Entspricht das Coaching Ihren Erwartungen? Was würden Sie sich anders wünschen?",
        description: "Erwartungen synchronisieren"
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
    console.log('🔍 Prompts verfügbar:', Object.keys(prompts).length);
    updateDebugInfo(`✅ ${clients.length} Klienten + ${Object.keys(prompts).length} Prompts geladen`);
    
    // Initialize components
    loadClients();
    loadTemplates();
    loadPrompts();
    restoreSessionState();
    checkCollaborationMode();
    setupEventListeners();
    startCollaborationMonitoring();
    
    // Global debug functions
    window.debugCollaborationSync = debugCollaborationSync;
    window.emergencyRestore = emergencyRestore;
    window.currentState = currentState;
    window.prompts = prompts;
    
    updateDebugInfo('✅ App vollständig geladen');
    showNotification('Triadisches KI-Coaching bereit!', 'success');
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
            prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesCategory && matchesSearch;
    });

    // Sortierung: GT1-GT12 zuerst, dann alphabetisch
    filteredPrompts.sort((a, b) => {
        if (a.category === 'GT' && b.category === 'GT') {
            return parseInt(a.shortcut.substring(2)) - parseInt(b.shortcut.substring(2));
        }
        if (a.category === 'GT') return -1;
        if (b.category === 'GT') return 1;
        return a.shortcut.localeCompare(b.shortcut);
    });

    filteredPrompts.forEach(prompt => {
        const promptElement = createPromptElement(prompt);
        promptList.appendChild(promptElement);
    });

    console.log(`📄 ${filteredPrompts.length} Prompts geladen (Kategorie: ${category})`);
    updateDebugInfo(`📄 ${filteredPrompts.length} Prompts angezeigt`);
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
            <button class="prompt-btn btn-send" onclick="sendPromptToEditor('${prompt.shortcut}')">📝</button>
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
            console.log(`📋 Prompt ${shortcut} in Zwischenablage kopiert`);
        }).catch(err => {
            console.error('Fehler beim Kopieren:', err);
            showNotification(`Fehler beim Kopieren von ${shortcut}`, 'error');
        });
    }
}

function sendPromptToEditor(shortcut) {
    const prompt = prompts[shortcut];
    if (prompt) {
        const editor = document.getElementById('promptEditor');
        if (editor) {
            editor.value = prompt.content;
            editor.focus();
            showNotification(`${shortcut} in Editor geladen`, 'success');
        }
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
            session: currentState.sessionActive,
            phase: currentState.currentPhase
        };
        
        showNotification(`${shortcut} wird an Kollaboration gesendet...`, 'info');
        generateAIResponse(collaborationData);
    }
}

// === PHASE MANAGEMENT ===
function setPhase(phase) {
    currentState.currentPhase = phase;
    updatePhaseIndicator();
    updatePhaseCards();
    showNotification(`Phase ${phase} aktiviert`, 'success');
    console.log(`📋 Phase ${phase} aktiviert`);
}

function updatePhaseIndicator() {
    const phaseNames = {
        1: "Phase 1: Erstanliegen",
        2: "Phase 2: Problemanalyse", 
        3: "Phase 3: Lösungsstrategie",
        4: "Phase 4: Umsetzung"
    };
    
    const phaseDisplay = document.getElementById('currentPhaseDisplay');
    if (phaseDisplay) {
        phaseDisplay.textContent = phaseNames[currentState.currentPhase];
    }
}

function updatePhaseCards() {
    document.querySelectorAll('.phase-card').forEach(card => {
        card.classList.remove('active');
        if (parseInt(card.dataset.phase) === currentState.currentPhase) {
            card.classList.add('active');
        }
    });
}

// === COACH KI ASSISTANT ===
function sendCoachAIQuery() {
    const input = document.getElementById('coachAIInput');
    const query = input.value.trim();
    
    if (!query) return;
    
    console.log(`🤖 Coach-KI Anfrage: ${query}`);
    
    const coachAIChat = document.getElementById('coachAIChat');
    const timestamp = new Date().toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
    
    // Coach query
    coachAIChat.innerHTML += `
        <div style="background: #e2e8f0; padding: 8px; border-radius: 6px; margin: 5px 0; font-size: 12px;">
            <strong>Coach (${timestamp}):</strong> ${query}
        </div>
    `;
    
    // KI response
    setTimeout(() => {
        const aiAnswer = generateCoachAIResponse(query);
        coachAIChat.innerHTML += `
            <div style="background: #3b82f6; color: white; padding: 8px; border-radius: 6px; margin: 5px 0; font-size: 12px;">
                <strong>KI-Assistant:</strong> ${aiAnswer}
            </div>
        `;
        coachAIChat.scrollTop = coachAIChat.scrollHeight;
    }, 1000);
    
    input.value = '';
    coachAIChat.scrollTop = coachAIChat.scrollHeight;
}

function generateCoachAIResponse(query) {
    const queryLower = query.toLowerCase();
    
    const responses = {
        'prozess': `Aktuell in Phase ${currentState.currentPhase}/4. ${getPhaseRecommendation()}`,
        'phase': `Phase ${currentState.currentPhase} aktiv. ${getPhaseSpecificAdvice()}`,
        'methode': 'Bei Blockaden: Avatar-Aufstellung über DelightEx, Skalierungsfragen (SF4) oder Perspektivenwechsel.',
        'klient': `${currentState.selectedClient?.name || 'Klient'} zeigt ${getClientAnalysis()}. Coaching-Bereitschaft ist hoch.`,
        'nächster schritt': `Empfehlung: ${getNextStepSuggestion()}`,
        'spannungsfeld': 'Achten Sie auf Ambivalenzen. GT4 für systematische Exploration oder Avatar-Aufstellung über DelightEx.',
        'gt1': 'GT1 - Erstanliegen explorieren: "Was beschäftigt Sie denn gerade?" - Offene Frage zur Anliegen-Exploration.',
        'gt4': 'GT4 - Spannungsfeld identifizieren: "Zwischen welchen Polen bewegen Sie sich?" - Kernfrage für Ambivalenzen.',
        'avatar': 'Avatar-Aufstellung über DelightEx (https://www.delightex.com) für Spannungsfeld-Visualisierung sehr effektiv.',
        'wunderfrage': 'LÖS1 (Wunderfrage) aktiviert lösungsfokussierte Imagination: "Angenommen, über Nacht geschieht ein Wunder..."',
        'ressourcen': 'GT9 oder SF2 für Ressourcen-Aktivierung. LÖS3 für systematisches Ressourcen-Mapping.',
        'emotionen': 'DIAG1-DIAG5 für emotionale Exploration. DIAG3 für Körperwahrnehmung nicht vergessen.',
        'zeit': `Session läuft seit ${getSessionDuration()}. Zeitmanagement für Phase ${currentState.currentPhase} beachten.`,
        'meta': 'META1-META5 für Prozessreflexion. META2 bei Methodenwechsel, META4 für Beziehungsklärung.'
    };
    
    // Erweiterte Keyword-Suche
    for (const [key, response] of Object.entries(responses)) {
        if (queryLower.includes(key)) {
            return response;
        }
    }
    
    // Prompt-spezifische Beratung
    if (queryLower.match(/gt\d+|sf\d+|diag\d+|lös\d+|meta\d+/)) {
        const promptMatch = queryLower.match(/(gt|sf|diag|lös|meta)(\d+)/);
        if (promptMatch) {
            const promptKey = promptMatch[1].toUpperCase() + promptMatch[2];
            if (prompts[promptKey]) {
                return `${promptKey}: ${prompts[promptKey].description}. Empfehlung: ${getSuggestedNextSteps(prompts[promptKey])}`;
            }
        }
    }
    
    // Fallback mit kontextueller Antwort
    return `Basierend auf Phase ${currentState.currentPhase} empfehle ich: ${getContextualAdvice(query)}. Welcher spezifische Aspekt beschäftigt Sie?`;
}

function getPhaseSpecificAdvice() {
    const advice = {
        1: 'Anliegen vollständig explorieren. GT1-GT4 systematisch durchgehen. Spannungsfeld identifizieren.',
        2: 'Problemanalyse vertiefen. GT5-GT7 + DIAG-Prompts für emotionale Dimension nutzen.',
        3: 'Lösungen konkretisieren. GT8-GT11 + LÖS-Prompts für Handlungsoptionen. Ressourcen aktivieren.',
        4: 'Transfer sichern. GT12 für nachhaltigen Abschluss. Commitment überprüfen.'
    };
    return advice[currentState.currentPhase];
}

function getClientAnalysis() {
    const analyses = [
        'offene Körperhaltung und hohe Gesprächsbereitschaft',
        'reflektierte Herangehensweise und gute Selbstwahrnehmung',
        'motivierte Grundhaltung mit Veränderungsbereitschaft',
        'analytisches Denken und strukturierte Problembearbeitung'
    ];
    return analyses[Math.floor(Math.random() * analyses.length)];
}

function getNextStepSuggestion() {
    const suggestions = {
        1: 'GT4 für Spannungsfeld-Identifikation oder DIAG1 für emotionale Einschätzung',
        2: 'DIAG2 für Schlüsselaffekt oder GT7 für Systemkontext',
        3: 'LÖS1 für Wunderfrage oder GT10 für Aktionsplanung',
        4: 'GT12 für Transfer oder Session-Abschluss vorbereiten'
    };
    return suggestions[currentState.currentPhase];
}

function getContextualAdvice(query) {
    if (query.length < 10) {
        return 'Für spezifische Beratung bitte detailliertere Frage stellen';
    }
    return 'Systematisch durch die 12 Phasen navigieren. Bei Blockaden Methode wechseln';
}

function getSuggestedNextSteps(prompt) {
    const suggestions = {
        'GT1': 'GT2 für Problemkonkretisierung oder DIAG1 für emotionale Einschätzung',
        'GT2': 'GT3 für Zielklärung oder DIAG2 für Affekt-Exploration',
        'GT3': 'GT4 für Spannungsfeld-Identifikation oder LÖS1 für Wunderfrage',
        'GT4': 'SF2 für Ressourcen-Aktivierung oder Avatar-Aufstellung über DelightEx',
        'SF1': 'SF2 für konkrete Ressourcen oder LÖS2 für erste Schritte',
        'DIAG1': 'DIAG2 für Schlüsselaffekt oder GT2 für Problemvertiefung',
        'LÖS1': 'LÖS2 für Konkretisierung oder META1 für Prozess-Check',
        'META1': 'Flexibel je nach Feedback anpassen'
    };
    
    return suggestions[prompt.shortcut] || 'Flexibel je nach Klient-Response weiter navigieren';
}

// Quick Action Functions
function getProcessAdvice() {
    const advice = `📊 <strong>Prozess-Status:</strong><br>
        Phase ${currentState.currentPhase}/4 aktiv<br>
        ${getPhaseRecommendation()}<br>
        Session-Dauer: ${getSessionDuration()}<br>
        Klient: ${currentState.selectedClient?.name || 'Nicht ausgewählt'}`;
    
    const coachAIChat = document.getElementById('coachAIChat');
    coachAIChat.innerHTML += `
        <div style="background: #10b981; color: white; padding: 8px; border-radius: 6px; margin: 5px 0; font-size: 12px;">
            ${advice}
        </div>
    `;
    coachAIChat.scrollTop = coachAIChat.scrollHeight;
}

function getMethodSuggestion() {
    const methods = [
        'Avatar-Aufstellung für Spannungsfeld-Visualisierung (DelightEx)',
        'Skalierungsfragen für Problemintensität (SF4)',
        'Wunderfrage für Lösungsvision (LÖS1)',
        'Ressourcen-Mapping für Stärkenaktivierung (LÖS3)',
        'Körperwahrnehmung für emotionale Erdung (DIAG3)',
        'Glaubenssatz-Arbeit für kognitive Umstrukturierung (DIAG4)',
        'Systemaufstellung für Kontextanalyse (GT7)',
        'Commitment-Sicherung für Nachhaltigkeit (GT11)'
    ];
    
    const randomMethod = methods[Math.floor(Math.random() * methods.length)];
    
    const coachAIChat = document.getElementById('coachAIChat');
    coachAIChat.innerHTML += `
        <div style="background: #8b5cf6; color: white; padding: 8px; border-radius: 6px; margin: 5px 0; font-size: 12px;">
            💡 <strong>Methoden-Tipp:</strong><br>${randomMethod}
        </div>
    `;
    coachAIChat.scrollTop = coachAIChat.scrollHeight;
}

function analyzeSpannungsfeld() {
    const spannungsfelder = [
        'Autonomie ↔ Verbindung',
        'Kontrolle ↔ Loslassen', 
        'Leistung ↔ Entspannung',
        'Nähe ↔ Distanz',
        'Struktur ↔ Spontaneität'
    ];
    
    const randomSpannung = spannungsfelder[Math.floor(Math.random() * spannungsfelder.length)];
    
    const analysis = `⚖️ <strong>Spannungsfeld-Analyse:</strong><br>
        Typisches Muster: ${randomSpannung}<br>
        Empfehlung: GT4 + Avatar-Aufstellung<br>
        Tool: DelightEx für Visualisierung`;
    
    const coachAIChat = document.getElementById('coachAIChat');
    coachAIChat.innerHTML += `
        <div style="background: #f59e0b; color: white; padding: 8px; border-radius: 6px; margin: 5px 0; font-size: 12px;">
            ${analysis}
        </div>
    `;
    coachAIChat.scrollTop = coachAIChat.scrollHeight;
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
    
    coachingTemplates.forEach(template => {
        const card = createTemplateCard(template);
        container.appendChild(card);
    });
    
    console.log('✅ Templates erfolgreich geladen');
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
            <button class="btn-secondary" onclick="editTemplate('${template.id}')">Bearbeiten</button>
        </div>
    `;
    return card;
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
                <h3>Coaching-Prompt ${data.promptShortcut ? `(${data.promptShortcut})` : ''}</h3>
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
                <button class="btn-primary btn-success" onclick="approvePrompt()">✅ Genehmigen</button>
                <button class="btn-primary btn-danger" onclick="rejectPrompt()">❌ Ablehnen</button>
                <button class="btn-primary btn-warning" onclick="requestChanges()">🔄 Änderungen</button>
            </div>
        </div>
    `;
    
    display.style.display = 'block';
}

// === COLLABORATION ACTIONS ===
function sendToCollaborationFromEditor() {
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
        session: currentState.sessionActive,
        phase: currentState.currentPhase
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
        const aiResponse = generateSimulatedResponse(collaborationData.prompt, collaborationData.promptShortcut);
        
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

function generateSimulatedResponse(prompt, promptShortcut) {
    const promptLower = prompt.toLowerCase();
    
    // Spezifische Antworten basierend auf Prompt-Shortcut
    if (promptShortcut) {
        const promptData = prompts[promptShortcut];
        if (promptData) {
            let response = `<strong>Analyse (${promptShortcut}):</strong> ${promptData.description}. `;
            
            switch(promptData.category) {
                case 'GT':
                    response += `Geißler-Triadik Phase ${promptData.phase} erfolgreich eingeleitet. `;
                    break;
                case 'SF':
                    response += `Lösungsfokussierte Intervention aktiviert. Ressourcenorientierung läuft. `;
                    break;
                case 'DIAG':
                    response += `Diagnostische Exploration gestartet. Emotionale Befindlichkeit wird erfasst. `;
                    break;
                case 'LÖS':
                    response += `Lösungsentwicklung eingeleitet. Handlungsoptionen werden konkretisiert. `;
                    break;
                case 'META':
                    response += `Prozessreflexion aktiviert. Coach-Klient-Beziehung wird überprüft. `;
                    break;
            }
            
            response += `<br><br><strong>Nächste Schritte:</strong> ${getSuggestedNextSteps(promptData)}`;
            
            if (promptShortcut === 'GT4' || promptLower.includes('spannungsfeld')) {
                response += `<br><br><strong>💡 Spannungsfeld erkannt:</strong> Avatar-Aufstellung über DelightEx empfohlen.`;
            }
            
            return response;
        }
    }
    
    // Kontextuelle Antworten basierend auf Prompt-Inhalt
    if (promptLower.includes('ziel') || promptLower.includes('smart')) {
        return 'Für effektive Zielsetzung empfehle ich SMART-Kriterien. Beginnen Sie mit der Vision und arbeiten rückwärts zu konkreten Schritten.';
    }
    
    if (promptLower.includes('führung') || promptLower.includes('team') || promptLower.includes('leadership')) {
        return 'Authentische Führung beginnt mit Selbstreflexion. Nutzen Sie aktives Zuhören und entwickeln Sie emotionale Intelligenz.';
    }
    
    if (promptLower.includes('zeit') || promptLower.includes('priorität') || promptLower.includes('produktiv')) {
        return 'Implementieren Sie die Pareto-Regel (80/20) und Time-Blocking. Identifizieren Sie Ihre wichtigsten Aufgaben.';
    }
    
    if (promptLower.includes('spannungsfeld') || promptLower.includes('pol') || promptLower.includes('ambivalenz')) {
        return 'Spannungsfelder sind natürlich und produktiv. Nutzen Sie Avatar-Aufstellungen für Visualisierung und Lösungsfindung.';
    }
    
    // Fallback-Antworten
    const responses = [
        `Basierend auf Ihrem Prompt empfehle ich einen strukturierten Ansatz. Beginnen Sie mit offenen Fragen für tiefere Einsichten.`,
        `Ihre Reflexion zeigt Selbstbewusstsein. Nutzen Sie Skalierungsfragen (1-10) für konkrete Bewertungen.`,
        `Dieser Coaching-Ansatz eignet sich gut für lösungsfokussierte Intervention. Konzentrieren Sie sich auf Ressourcen.`,
        `Für Phase ${currentState.currentPhase} empfehle ich: ${getPhaseSpecificAdvice()}. Welche Erkenntnisse sind besonders relevant?`
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
    }
    
    showNotification('Änderungen wurden angefordert.', 'info');
}

// === UTILITY FUNCTIONS ===
function openAvatarTool() {
    window.open('https://www.delightex.com', '_blank');
    showNotification('DelightEx Avatar Tool wird geöffnet...', 'info');
}

function getPhaseRecommendation() {
    const recommendations = {
        1: 'Anliegen vollständig explorieren bevor Phase 2',
        2: 'Gründliche Problemanalyse vor Lösungsentwicklung',
        3: 'Konkrete Handlungsschritte entwickeln',
        4: 'Transfer in Alltag sicherstellen'
    };
    return recommendations[currentState.currentPhase];
}

function getSessionDuration() {
    if (!currentState.sessionStartTime) return '00:00';
    
    const now = new Date();
    const duration = Math.floor((now - currentState.sessionStartTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

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
            updatePhaseIndicator();
        }
    } catch (error) {
        console.error('Fehler beim Wiederherstellen des Session-States:', error);
    }
}

// === EVENT LISTENERS ===
function setupEventListeners() {
    console.log('🎧 Event Listeners werden eingerichtet');
    updateDebugInfo('🎧 Event Listeners setup');
    
    // Session-Buttons
    const startBtn = document.getElementById('startSessionBtn');
    const stopBtn = document.getElementById('stopSessionBtn');
    
    if (startBtn) {
        startBtn.addEventListener('click', startSession);
        console.log('✅ Start-Button Event-Handler verbunden');
    }
    
    if (stopBtn) {
        stopBtn.addEventListener('click', stopSession);
        console.log('✅ Stop-Button Event-Handler verbunden');
    }
    
    // Coaching-Buttons
    const sendBtn = document.getElementById('sendToCollaborationBtn');
    const exportBtn = document.getElementById('exportPromptBtn');
    
    if (sendBtn) sendBtn.addEventListener('click', sendToCollaborationFromEditor);
    if (exportBtn) exportBtn.addEventListener('click', exportSession);
    
    // Phase Cards
    document.querySelectorAll('.phase-card').forEach(card => {
        card.addEventListener('click', () => {
            const phase = parseInt(card.dataset.phase);
            setPhase(phase);
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
    
    // Coach AI
    const sendAIBtn = document.getElementById('sendAIQuery');
    const coachAIInput = document.getElementById('coachAIInput');
    
    if (sendAIBtn) sendAIBtn.addEventListener('click', sendCoachAIQuery);
    if (coachAIInput) {
        coachAIInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendCoachAIQuery();
            }
        });
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
            const shortcuts = {
                '1': 'GT1', '2': 'GT2', '3': 'GT3', '4': 'GT4', '5': 'GT5',
                '6': 'GT6', '7': 'GT7', '8': 'GT8', '9': 'GT9'
            };
            
            if (shortcuts[e.key]) {
                e.preventDefault();
                sendToCollaboration(shortcuts[e.key]);
            }
            
            if (e.key === 'Enter') {
                e.preventDefault();
                sendToCollaborationFromEditor();
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

// === EXPORT FUNCTIONS ===
function exportSession() {
    if (!currentState.selectedClient) {
        alert('Keine aktive Session zum Exportieren.');
        return;
    }
    
    const sessionData = {
        client: currentState.selectedClient,
        phase: currentState.currentPhase,
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

// === DEBUG FUNCTIONS ===
function debugCollaborationSync() {
    console.log('🔍 DEBUG: Kollaborations-Sync Status');
    console.log('Current State:', currentState);
    console.log('Collaboration Protection:', collaborationProtection);
    console.log('LocalStorage Data:', localStorage.getItem('collaborationData'));
    console.log('Prompts verfügbar:', Object.keys(prompts).length);
    console.log('Clients Array:', Array.isArray(clients) ? `✅ Array mit ${clients.length} Einträgen` : `❌ Nicht verfügbar`);
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
                location.reload();
            }
        }, 1000);
    }
});

console.log('✅ Triadisches KI-Coaching App vollständig geladen - GT/SF/DIAG/LÖS/META Prompts verfügbar');