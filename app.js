// PROMPT DATABASE (basierend auf Ihrer Dokumentation)
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
    },

    // Spezial-Prompts
    LIVE1: {
        shortcut: "LIVE1",
        title: "Digitaler Rapport",
        category: "LIVE",
        phase: 1,
        content: "Wie geht es Ihnen mit der digitalen Gesprächssituation? Fühlen Sie sich wohl?",
        description: "Online-Coaching Rapport"
    },
    GRUPPE1: {
        shortcut: "GRUPPE1",
        title: "Gruppen-Check-In",
        category: "GRUPPE",
        phase: 1,
        content: "Wie geht es Ihnen in der Gruppe? Wer möchte beginnen?",
        description: "Gruppencoaching Einstieg"
    },
    NOTFALL1: {
        shortcut: "NOTFALL1",
        title: "Krisenintervention",
        category: "NOTFALL",
        phase: 0,
        content: "Ich merke, dass Sie sehr aufgewühlt sind. Was brauchen Sie jetzt am meisten?",
        description: "Akute Belastung abfangen"
    }
};

// GLOBALE VARIABLEN
let currentPhase = 1;
let currentClient = "Marcus Schmidt";
let sessionStartTime = new Date();
let activeCategory = "all";

// INITIALISIERUNG
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    startSessionTimer();
    loadPrompts();
    setupEventListeners();
});

function initializeApp() {
    console.log('🚀 Coach Mission Control wird initialisiert...');
    console.log('📋 Prompt Database geladen:', Object.keys(prompts).length, 'Prompts');
    updatePhaseIndicator();
}

// PROMPT MANAGEMENT
function loadPrompts(category = 'all', searchTerm = '') {
    const promptList = document.getElementById('promptList');
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
}

function createPromptElement(prompt) {
    const div = document.createElement('div');
    div.className = 'prompt-item';
    div.innerHTML = `
        <div class="prompt-shortcut">${prompt.shortcut}</div>
        <div class="prompt-title">${prompt.title}</div>
        <div class="prompt-preview">${prompt.content.substring(0, 80)}...</div>
        <div class="prompt-actions">
            <button class="btn btn-copy" onclick="copyPrompt('${prompt.shortcut}')">📋 Kopieren</button>
            <button class="btn btn-send" onclick="sendToCollaboration('${prompt.shortcut}')">📤 Senden</button>
        </div>
    `;
    return div;
}

function copyPrompt(shortcut) {
    const prompt = prompts[shortcut];
    if (prompt) {
        navigator.clipboard.writeText(prompt.content).then(() => {
            showNotification(`${shortcut} kopiert!`);
            console.log(`📋 Prompt ${shortcut} in Zwischenablage kopiert`);
        }).catch(err => {
            console.error('Fehler beim Kopieren:', err);
            // Fallback für ältere Browser
            const textArea = document.createElement('textarea');
            textArea.value = prompt.content;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification(`${shortcut} kopiert!`);
        });
    }
}

function sendToCollaboration(shortcut) {
    const prompt = prompts[shortcut];
    if (prompt) {
        console.log(`📤 Sende Prompt ${shortcut} an Kollaboration`);
        addMessageToThread('coach', prompt.content, shortcut);
        
        // Simulate KI response nach 2 Sekunden
        setTimeout(() => {
            generateAIResponse(prompt);
        }, 2000);
        
        showNotification(`${shortcut} an Kollaboration gesendet`);
    }
}

// KOLLABORATION
function addMessageToThread(sender, content, shortcut = '') {
    const messageThread = document.getElementById('messageThread');
    const timestamp = new Date().toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
    
    const senderIcon = sender === 'coach' ? '👨‍💼' : '🤖';
    const senderName = sender === 'coach' ? 'Coach' : 'KI-Assistant';
    const messageClass = sender === 'coach' ? 'coach-prompt' : 'ai-response';
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${messageClass} fade-in`;
    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="message-sender">${senderIcon} ${senderName} ${shortcut ? `(${shortcut})` : ''}</span>
            <span class="message-time">${timestamp}</span>
        </div>
        <div class="message-content">${content}</div>
    `;
    
    messageThread.appendChild(messageDiv);
    messageThread.scrollTop = messageThread.scrollHeight;
    
    console.log(`💬 Nachricht hinzugefügt: ${sender} ${shortcut ? '(' + shortcut + ')' : ''}`);
}

function generateAIResponse(prompt) {
    console.log(`🤖 Generiere KI-Antwort für Prompt ${prompt.shortcut}`);
    
    let aiResponse = `<strong>Analyse:</strong> ${prompt.shortcut} erfolgreich eingesetzt. `;
    
    // Kontextuelle KI-Antworten basierend auf Prompt-Kategorie
    switch(prompt.category) {
        case 'GT':
            aiResponse += `Geißler-Triadik Phase ${prompt.phase} aktiviert. `;
            if (prompt.phase === 1) {
                aiResponse += `Rapport-Aufbau und Anliegen-Exploration läuft optimal.`;
            } else if (prompt.phase === 2) {
                aiResponse += `Problemanalyse wird vertieft. Systemischer Kontext wird erfasst.`;
            } else if (prompt.phase === 3) {
                aiResponse += `Lösungsentwicklung eingeleitet. Handlungsoptionen werden erarbeitet.`;
            } else if (prompt.phase === 4) {
                aiResponse += `Transfer-Phase aktiv. Nachhaltigkeit wird gesichert.`;
            }
            break;
        case 'SF':
            aiResponse += `Lösungsfokussierte Intervention angewendet. Ressourcenorientierung aktiviert.`;
            break;
        case 'DIAG':
            aiResponse += `Diagnostische Exploration eingeleitet. Emotionale Befindlichkeit wird erfasst.`;
            break;
        case 'LÖS':
            aiResponse += `Lösungskonkretisierung gestartet. Handlungsoptionen werden entwickelt.`;
            break;
        case 'META':
            aiResponse += `Prozessreflexion aktiviert. Coach-Klient-Beziehung wird überprüft.`;
            break;
        case 'LIVE':
            aiResponse += `Digitale Coaching-Anpassung. Online-spezifische Faktoren berücksichtigt.`;
            break;
        case 'GRUPPE':
            aiResponse += `Gruppendynamik wird beobachtet. Interaktionsmuster analysiert.`;
            break;
        case 'NOTFALL':
            aiResponse += `⚠️ Krisenintervention eingeleitet. Stabilisierung hat Priorität.`;
            break;
        default:
            aiResponse += `Coaching-Intervention angewendet. Prozess läuft optimal.`;
    }
    
    aiResponse += `<br><br><strong>Nächste Schritte:</strong> `;
    aiResponse += getSuggestedNextSteps(prompt);
    
    // Spannungsfeld-Erkennung (vereinfacht)
    if (prompt.content.toLowerCase().includes('spannungsfeld') || 
        prompt.content.toLowerCase().includes('pole') || 
        prompt.shortcut === 'GT4') {
        aiResponse += `<br><br><strong>💡 Spannungsfeld erkannt:</strong> Avatar-Aufstellung über DelightEx empfohlen für Visualisierung der Pole.`;
    }
    
    addMessageToThread('ai', aiResponse);
}

function getSuggestedNextSteps(prompt) {
    const suggestions = {
        'GT1': 'GT2 für Problemkonkretisierung oder DIAG1 für emotionale Einschätzung',
        'GT2': 'GT3 für Zielklärung oder DIAG2 für Affekt-Exploration',
        'GT3': 'GT4 für Spannungsfeld-Identifikation oder LÖS1 für Wunderfrage',
        'GT4': 'SF2 für Ressourcen-Aktivierung oder Avatar-Aufstellung über DelightEx',
        'GT5': 'GT6 für Verhaltensanalyse oder DIAG3 für Körperwahrnehmung',
        'GT6': 'GT7 für Systemkontext oder LÖS3 für Ressourcen-Mapping',
        'GT7': 'GT8 für Optionen-Entwicklung oder DIAG5 für externe Erwartungen',
        'GT8': 'GT9 für Ressourcen-Aktivierung oder LÖS2 für erste Schritte',
        'GT9': 'GT10 für Aktionsplanung oder LÖS4 für Erfolgs-Anker',
        'GT10': 'GT11 für Commitment oder LÖS5 für Hindernisse antizipieren',
        'GT11': 'GT12 für Transfer oder META1 für Prozess-Check',
        'GT12': 'Session-Abschluss oder Terminvereinbarung für Follow-up',
        'SF1': 'SF2 für konkrete Ressourcen oder LÖS2 für erste Schritte',
        'SF2': 'SF3 für Ausnahmen oder GT9 für weitere Ressourcen',
        'SF3': 'SF4 für Skalierung oder LÖS1 für Wunderfrage',
        'SF4': 'SF5 für kleine Schritte oder GT10 für Aktionsplanung',
        'SF5': 'LÖS2 für Konkretisierung oder GT11 für Commitment',
        'DIAG1': 'DIAG2 für Schlüsselaffekt oder GT2 für Problemvertiefung',
        'DIAG2': 'DIAG3 für Körperwahrnehmung oder GT5 für Situationsanalyse',
        'DIAG3': 'DIAG4 für Glaubenssätze oder LÖS3 für Ressourcen',
        'DIAG4': 'LÖS1 für Wunderfrage oder GT8 für Optionen',
        'DIAG5': 'GT7 für Systemkontext oder LÖS4 für Erfolgs-Anker',
        'LÖS1': 'LÖS2 für Konkretisierung oder SF5 für kleine Schritte',
        'LÖS2': 'LÖS3 für Ressourcen oder GT10 für Aktionsplanung',
        'LÖS3': 'LÖS4 für Erfolgs-Transfer oder GT9 für weitere Ressourcen',
        'LÖS4': 'LÖS5 für Hindernisse oder GT11 für Commitment',
        'LÖS5': 'GT10 für finalen Plan oder META1 für Prozess-Check',
        'META1': 'Flexibel je nach Feedback anpassen',
        'META2': 'Neuen methodischen Ansatz wählen',
        'META3': 'Tempo-angepasst weitermachen',
        'META4': 'Bei Problemen: Supervision oder Überweisung',
        'META5': 'Coaching-Vertrag anpassen',
        'LIVE1': 'GT1 für digitalen Einstieg oder META1 für Online-Check',
        'GRUPPE1': 'GT1 für Gruppenanliegen oder DIAG1 für Gruppenbefindlichkeit',
        'NOTFALL1': '⚠️ Professionelle Hilfe einbeziehen wenn nötig'
    };
    
    return suggestions[prompt.shortcut] || 'Flexibel je nach Klient-Response weiter navigieren';
}

// PHASEN MANAGEMENT
function setPhase(phase) {
    currentPhase = phase;
    updatePhaseIndicator();
    updatePhaseCards();
    showNotification(`Phase ${phase} aktiviert`);
    console.log(`📋 Phase ${phase} aktiviert`);
}

function updatePhaseIndicator() {
    const phaseNames = {
        1: "Phase 1: Erstanliegen",
        2: "Phase 2: Problemanalyse", 
        3: "Phase 3: Lösungsstrategie",
        4: "Phase 4: Umsetzung"
    };
    
    const phaseIndicator = document.getElementById('phaseIndicator');
    if (phaseIndicator) {
        phaseIndicator.textContent = phaseNames[currentPhase];
    }
}

function updatePhaseCards() {
    document.querySelectorAll('.phase-card').forEach(card => {
        card.classList.remove('active');
        if (parseInt(card.dataset.phase) === currentPhase) {
            card.classList.add('active');
        }
    });
}

// COACH-KI ASSISTANT
function sendCoachAIQuery() {
    const input = document.getElementById('coachAIInput');
    const query = input.value.trim();
    
    if (!query) return;
    
    console.log(`🤖 Coach-KI Anfrage: ${query}`);
    
    // Simulate KI response for coach
    const coachAIChat = document.getElementById('coachAIChat');
    const timestamp = new Date().toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
    
    // Coach query
    coachAIChat.innerHTML += `
        <div style="background: #1e293b; padding: 8px; border-radius: 4px; margin: 5px 0; font-size: 12px;">
            <strong>Coach (${timestamp}):</strong> ${query}
        </div>
    `;
    
    // KI response
    setTimeout(() => {
        const aiAnswer = generateCoachAIResponse(query);
        coachAIChat.innerHTML += `
            <div style="background: #475569; padding: 8px; border-radius: 4px; margin: 5px 0; font-size: 12px;">
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
        'prozess': `Aktuell in Phase ${currentPhase}/4. ${getPhaseRecommendation()}`,
        'phase': `Phase ${currentPhase} aktiv. ${getPhaseSpecificAdvice()}`,
        'methode': 'Bei Blockaden: Avatar-Aufstellung über DelightEx, Skalierungsfragen oder Perspektivenwechsel.',
        'klient': `${currentClient} zeigt ${getClientAnalysis()}. Coaching-Bereitschaft ist hoch.`,
        'nächster schritt': `Empfehlung: ${getNextStepSuggestion()}`,
        'spannungsfeld': 'Achten Sie auf Ambivalenzen. GT4 für systematische Exploration oder Avatar-Aufstellung.',
        'stuck': 'META2 für Methodenwechsel oder kurze Pause einlegen. Bei Blockade: Perspektive wechseln.',
        'avatar': 'Avatar-Aufstellung über DelightEx für Spannungsfeld-Visualisierung sehr effektiv.',
        'wunderfrage': 'LÖS1 (Wunderfrage) aktiviert lösungsfokussierte Imagination. Sehr kraftvoll.',
        'ressourcen': 'GT9 oder SF2 für Ressourcen-Aktivierung. LÖS3 für systematisches Mapping.',
        'emotionen': 'DIAG1-DIAG3 für emotionale Exploration. Körperwahrnehmung nicht vergessen.',
        'zeit': `Session läuft seit ${getSessionDuration()}. Zeitmanagement beachten.`,
        'beziehung': 'META4 für Beziehungsklärung. Rapport regelmäßig überprüfen.',
        'gruppe': 'GRUPPE1 für Gruppendynamik. Interaktionsmuster beobachten.',
        'digital': 'LIVE1 für Online-Coaching-Anpassung. Technische Aspekte berücksichtigen.',
        'notfall': '⚠️ NOTFALL1 bei Krisen. Professionelle Hilfe einbeziehen wenn nötig.',
        'supervision': 'Bei komplexen Fällen: Supervision suchen. Grenzen beachten.'
    };
    
    // Erweiterte Keyword-Suche
    for (const [key, response] of Object.entries(responses)) {
        if (queryLower.includes(key)) {
            return response;
        }
    }
    
    // Prompt-spezifische Beratung
    if (queryLower.match(/gt\d+/)) {
        const promptMatch = queryLower.match(/gt(\d+)/);
        if (promptMatch) {
            const promptNum = promptMatch[1];
            const promptKey = `GT${promptNum}`;
            if (prompts[promptKey]) {
                return `${promptKey}: ${prompts[promptKey].description}. ${getSuggestedNextSteps(prompts[promptKey])}`;
            }
        }
    }
    
    // Fallback mit kontextueller Antwort
    return `Basierend auf Phase ${currentPhase} und aktuellem Kontext: ${getContextualAdvice(query)}. Welcher spezifische Aspekt beschäftigt Sie?`;
}

function getPhaseSpecificAdvice() {
    const advice = {
        1: 'Anliegen vollständig explorieren. GT1-GT4 systematisch durchgehen.',
        2: 'Problemanalyse vertiefen. DIAG-Prompts für emotionale Dimension nutzen.',
        3: 'Lösungen konkretisieren. LÖS-Prompts für Handlungsoptionen.',
        4: 'Transfer sichern. GT12 für nachhaltigen Abschluss.'
    };
    return advice[currentPhase];
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
    return suggestions[currentPhase];
}

function getContextualAdvice(query) {
    if (query.length < 10) {
        return 'Für spezifische Beratung bitte detailliertere Frage stellen';
    }
    return 'Systematisch durch die 12 Phasen navigieren. Bei Blockaden Methode wechseln';
}

function getProcessAdvice() {
    const advice = `📊 <strong>Prozess-Status:</strong><br>
        Phase ${currentPhase}/4 aktiv<br>
        ${getPhaseRecommendation()}<br>
        Session-Dauer: ${getSessionDuration()}<br>
        Klient: ${currentClient}`;
    
    document.getElementById('coachAIInput').value = "Prozess-Beratung";
    setTimeout(() => {
        const coachAIChat = document.getElementById('coachAIChat');
        coachAIChat.innerHTML += `
            <div style="background: #10b981; padding: 8px; border-radius: 4px; margin: 5px 0; font-size: 12px; color: white;">
                ${advice}
            </div>
        `;
        coachAIChat.scrollTop = coachAIChat.scrollHeight;
    }, 500);
}

function getMethodSuggestion() {
    const methods = [
        'Avatar-Aufstellung für Spannungsfeld-Visualisierung (DelightEx)',
        'Skalierungsfragen für Problemintensität (SF4)',
        'Wunderfrage für Lösungsvision (LÖS1)',
        'Ressourcen-Mapping für Stärkenaktivierung (LÖS3)',
        'Reframing für Perspektivenwechsel',
        'Körperwahrnehmung für emotionale Erdung (DIAG3)',
        'Systemaufstellung für Kontextanalyse',
        'Timeline-Arbeit für Zukunftsorientierung',
        'Metapher-Arbeit für bildhafte Lösungen',
        'Glaubenssatz-Arbeit für kognitive Umstrukturierung (DIAG4)'
    ];
    
    const randomMethod = methods[Math.floor(Math.random() * methods.length)];
    
    document.getElementById('coachAIInput').value = "Methoden-Tipp";
    setTimeout(() => {
        const coachAIChat = document.getElementById('coachAIChat');
        coachAIChat.innerHTML += `
            <div style="background: #8b5cf6; padding: 8px; border-radius: 4px; margin: 5px 0; font-size: 12px; color: white;">
                💡 <strong>Methoden-Tipp:</strong><br>${randomMethod}
            </div>
        `;
        coachAIChat.scrollTop = coachAIChat.scrollHeight;
    }, 500);
}

function analyzeClient() {
    const analysis = `👤 <strong>Klient-Analyse:</strong><br>
        ${currentClient}<br>
        Offenheit: Hoch ✅<br>
        Motivation: Hoch ✅<br>
        Reflexionsfähigkeit: Sehr gut ✅<br>
        Veränderungsbereitschaft: Hoch ✅<br>
        Empfehlung: Direkter, strukturierter Ansatz möglich`;
    
    document.getElementById('coachAIInput').value = "Klient-Analyse";
    setTimeout(() => {
        const coachAIChat = document.getElementById('coachAIChat');
        coachAIChat.innerHTML += `
            <div style="background: #f59e0b; padding: 8px; border-radius: 4px; margin: 5px 0; font-size: 12px; color: white;">
                ${analysis}
            </div>
        `;
        coachAIChat.scrollTop = coachAIChat.scrollHeight;
    }, 500);
}

// UTILITIES
function getPhaseRecommendation() {
    const recommendations = {
        1: 'Anliegen vollständig explorieren bevor Phase 2',
        2: 'Gründliche Problemanalyse vor Lösungsentwicklung',
        3: 'Konkrete Handlungsschritte entwickeln',
        4: 'Transfer in Alltag sicherstellen'
    };
    return recommendations[currentPhase];
}

function getSessionDuration() {
    const now = new Date();
    const duration = Math.floor((now - sessionStartTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startSessionTimer() {
    setInterval(() => {
        const timerElement = document.getElementById('sessionTimer');
        if (timerElement) {
            timerElement.textContent = getSessionDuration();
        }
    }, 1000);
}

function showNotification(message) {
    // Entferne alte Notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    // Neue Notification erstellen
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// EVENT LISTENERS
function setupEventListeners() {
    console.log('🎧 Event Listeners werden eingerichtet...');
    
    // Phase navigation
    document.querySelectorAll('.phase-card').forEach(card => {
        card.addEventListener('click', () => {
            const phase = parseInt(card.dataset.phase);
            setPhase(phase);
        });
    });

    // Category filtering
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            loadPrompts(activeCategory, document.getElementById('promptSearch').value);
        });
    });

    // Search functionality
    const promptSearch = document.getElementById('promptSearch');
    if (promptSearch) {
        promptSearch.addEventListener('input', (e) => {
            loadPrompts(activeCategory, e.target.value);
        });
    }

    // Coach AI input
    const coachAIInput = document.getElementById('coachAIInput');
    if (coachAIInput) {
        coachAIInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendCoachAIQuery();
            }
        });
    }
    
    console.log('✅ Event Listeners erfolgreich eingerichtet');
}

// KEYBOARD SHORTCUTS
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        const shortcuts = {
            '1': 'GT1',
            '2': 'GT2', 
            '3': 'GT3',
            '4': 'GT4',
            '5': 'GT5',
            '6': 'GT6',
            '7': 'GT7',
            '8': 'GT8',
            '9': 'GT9'
        };
        
        if (shortcuts[e.key]) {
            e.preventDefault();
            sendToCollaboration(shortcuts[e.key]);
        }
    }
    
    // Zusätzliche Shortcuts
    if (e.altKey) {
        switch(e.key) {
            case 's':
                e.preventDefault();
                document.getElementById('promptSearch').focus();
                break;
            case 'c':
                e.preventDefault();
                document.getElementById('coachAIInput').focus();
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                e.preventDefault();
                setPhase(parseInt(e.key));
                break;
        }
    }
});

// CSS ANIMATIONS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }