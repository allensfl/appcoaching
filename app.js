// ===== GLOBALE VARIABLEN =====
let currentClient = null;
let sessionStartTime = null;
let timerInterval = null;
let currentPhase = 1;

// ===== ECHTE GT-PROMPTS (WORTWÖRTLICH) =====
const prompts = {
    'GT1': {
        title: 'Schritt 1: Erstanliegen',
        text: 'Was ist für Sie heute wichtig? Was beschäftigt Sie? Womit soll ich Ihnen helfen?',
        category: 'GT',
        phase: 1
    },
    'GT2': {
        title: 'Schritt 2: Konkretisierung',
        text: 'Können Sie das konkreter beschreiben? Was genau ist passiert? Worum geht es dabei?',
        category: 'GT',
        phase: 1
    },
    'GT3': {
        title: 'Schritt 3: Emotionale Befindlichkeit',
        text: 'Wie geht es Ihnen damit? Was löst das in Ihnen aus? Welche Gefühle haben Sie dabei?',
        category: 'GT',
        phase: 1
    },
    'GT4': {
        title: 'Schritt 4: Spannungsfeld',
        text: 'In welchem Spannungsfeld bewegen Sie sich? Zwischen welchen Polen stehen Sie?',
        category: 'GT',
        phase: 2
    },
    'GT5': {
        title: 'Schritt 5: Systemischer Kontext',
        text: 'Wer ist noch beteiligt? Wie sehen die anderen das? Welche Rollen spielen die verschiedenen Beteiligten?',
        category: 'GT',
        phase: 2
    },
    'GT6': {
        title: 'Schritt 6: Bisherige Lösungsversuche',
        text: 'Was haben Sie bisher versucht? Was war hilfreich? Was hat nicht funktioniert?',
        category: 'GT',
        phase: 2
    },
    'GT7': {
        title: 'Schritt 7: Zielklärung',
        text: 'Was wollen Sie erreichen? Wie soll es werden? Was ist Ihr Ziel?',
        category: 'GT',
        phase: 3
    },
    'GT8': {
        title: 'Schritt 8: Ressourcen',
        text: 'Was können Sie gut? Welche Stärken haben Sie? Worauf können Sie zurückgreifen?',
        category: 'GT',
        phase: 3
    },
    'GT9': {
        title: 'Schritt 9: Handlungsoptionen',
        text: 'Welche Möglichkeiten sehen Sie? Was könnten Sie tun? Welche Optionen haben Sie?',
        category: 'GT',
        phase: 3
    },
    'GT10': {
        title: 'Schritt 10: Entscheidung',
        text: 'Wofür entscheiden Sie sich? Was wollen Sie konkret angehen? Was ist Ihr nächster Schritt?',
        category: 'GT',
        phase: 4
    },
    'GT11': {
        title: 'Schritt 11: Umsetzungsplanung',
        text: 'Wie setzen Sie das um? Bis wann? Was brauchen Sie dafür? Wer kann Sie unterstützen?',
        category: 'GT',
        phase: 4
    },
    'GT12': {
        title: 'Schritt 12: Transfer',
        text: 'Wie übertragen Sie das in Ihren Alltag? Was nehmen Sie mit? Wie bleiben Sie dran?',
        category: 'GT',
        phase: 4
    },
    'SF1': {
        title: 'Wunderfrage',
        text: 'Stellen Sie sich vor, über Nacht geschieht ein Wunder und Ihr Problem ist gelöst. Was wäre morgen früh anders?',
        category: 'SF',
        phase: 3
    },
    'SF2': {
        title: 'Skalierungsfrage',
        text: 'Auf einer Skala von 1-10: Wo stehen Sie heute? Was wäre ein Schritt in Richtung höherer Zahl?',
        category: 'SF',
        phase: 2
    },
    'DIAG1': {
        title: 'Emotionscheck',
        text: 'Auf einer Skala von 1-10: Wie belastet fühlen Sie sich gerade? Was trägt zu dieser Bewertung bei?',
        category: 'DIAG',
        phase: 1
    },
    'LÖS1': {
        title: 'Erste kleine Schritte',
        text: 'Was wäre der kleinste Schritt, den Sie heute noch gehen könnten? Was würde das bewirken?',
        category: 'LÖS',
        phase: 4
    },
    'META1': {
        title: 'Prozess-Reflexion',
        text: 'Wie erleben Sie unser Gespräch bisher? Was ist hilfreich? Was brauchen Sie noch?',
        category: 'META',
        phase: 2
    }
};

// ===== INITIALISIERUNG =====
function initializeApp() {
    console.log('🚀 KI-Coaching App wird initialisiert...');
    
    // Event Listeners
    setupEventListeners();
    
    // UI Rendern
    renderPrompts();
    updateClientDisplay();
    
    console.log('✅ App vollständig geladen -', Object.keys(prompts).length, 'Prompts verfügbar');
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    console.log('🎧 Event Listeners werden eingerichtet');
    
    // Tab Navigation
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.tab;
            showTab(target);
        });
    });
    
    // Prompt Suche
    const searchInput = document.getElementById('promptSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterPrompts);
    }
    
    // Kategorien Filter
    document.querySelectorAll('.category-filter').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            filterPromptsByCategory(category);
            
            // Visual Feedback
            document.querySelectorAll('.category-filter').forEach(b => b.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && !e.altKey && !e.shiftKey) {
            const numbers = ['1','2','3','4','5','6','7','8','9'];
            const keyIndex = numbers.indexOf(e.key);
            
            if (keyIndex !== -1) {
                e.preventDefault();
                const promptId = `GT${keyIndex + 1}`;
                
                if (prompts[promptId]) {
                    loadPromptToEditor(promptId);
                    console.log(`⌨️ Shortcut Ctrl+${keyIndex + 1} → ${promptId} geladen`);
                }
            }
        }
    });
    
    // Coach-KI Assistant
    const coachInput = document.getElementById('coachKIInput');
    if (coachInput) {
        coachInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                askCoachKI(coachInput.value);
                coachInput.value = '';
            }
        });
    }
    
    // Quick Actions
    document.querySelectorAll('.quick-action').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            askCoachKI(action);
        });
    });
    
    console.log('✅ Event Listeners bereit');
}

// ===== KLIENTEN MANAGEMENT =====
function selectClient(clientId) {
    const clients = {
        'sarah': { name: 'Sarah Müller', avatar: '👩‍💼', role: 'Projektmanagerin' },
        'marcus': { name: 'Marcus Schmidt', avatar: '👨‍💼', role: 'Vertriebsleiter' },
        'lisa': { name: 'Lisa Weber', avatar: '👩‍💻', role: 'Marketing-Direktorin' },
        'werner': { name: 'Werner Hoffmann', avatar: '👨‍🔧', role: 'IT-Leiter' }
    };
    
    currentClient = clients[clientId];
    
    if (currentClient) {
        // Visual Feedback
        document.querySelectorAll('.client-card').forEach(card => card.classList.remove('selected'));
        event.target.closest('.client-card').classList.add('selected');
        
        // Enable Session Button
        const startBtn = document.getElementById('startSessionBtn');
        if (startBtn) {
            startBtn.disabled = false;
            startBtn.textContent = `🎯 Session mit ${currentClient.name} starten`;
        }
        
        updateClientDisplay();
        
        console.log('👤 Klient ausgewählt:', currentClient.name);
    }
}

function startSession() {
    if (!currentClient) {
        alert('Bitte wählen Sie zuerst einen Klienten aus.');
        return;
    }
    
    sessionStartTime = new Date();
    startTimer();
    showTab('coaching');
    
    console.log('🎯 Session gestartet mit:', currentClient.name);
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((new Date() - sessionStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        const timerElement = document.getElementById('sessionTimer');
        if (timerElement) {
            timerElement.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function updateClientDisplay() {
    const displays = ['currentClientDisplay', 'coachingClientDisplay'];
    
    displays.forEach(id => {
        const element = document.getElementById(id);
        if (element && currentClient) {
            element.innerHTML = `${currentClient.avatar} ${currentClient.name}`;
        }
    });
}

// ===== PHASEN MANAGEMENT =====
function setPhase(phaseId) {
    currentPhase = phaseId;
    
    // Update Visual
    document.querySelectorAll('.phase-card').forEach(card => {
        card.classList.remove('active');
    });
    
    const activeCard = document.querySelector(`[data-phase="${phaseId}"]`);
    if (activeCard) {
        activeCard.classList.add('active');
    }
    
    // Update Phase Status
    const phaseStatus = document.getElementById('phaseStatus');
    if (phaseStatus) {
        const phaseNames = {
            1: 'Phase 1: Erstanliegen',
            2: 'Phase 2: Analyse', 
            3: 'Phase 3: Lösungen',
            4: 'Phase 4: Umsetzung'
        };
        phaseStatus.textContent = phaseNames[phaseId];
    }
    
    // Filter Prompts by Phase
    filterPromptsByPhase(phaseId);
    
    console.log('📊 Phase gewechselt zu:', phaseId);
}

// ===== PROMPT MANAGEMENT =====
function renderPrompts() {
    const container = document.getElementById('promptsContainer');
    if (!container) return;
    
    const promptsArray = Object.entries(prompts);
    
    container.innerHTML = promptsArray.map(([id, prompt]) => `
        <div class="prompt-card" data-category="${prompt.category}" data-phase="${prompt.phase}">
            <div class="prompt-header">
                <span class="prompt-id">${id}</span>
                <span class="prompt-category">${prompt.category}</span>
            </div>
            <h4>${prompt.title}</h4>
            <p class="prompt-text">${prompt.text}</p>
            <div class="prompt-actions">
                <button onclick="copyPrompt('${id}')" class="btn-small">📋 Copy</button>
                <button onclick="loadPromptToEditor('${id}')" class="btn-small">📝 Load</button>
                <button onclick="sendPromptDirectly('${id}')" class="btn-small primary">📤 Send</button>
            </div>
        </div>
    `).join('');
}

function copyPrompt(promptId) {
    const prompt = prompts[promptId];
    if (prompt) {
        navigator.clipboard.writeText(prompt.text).then(() => {
            showToast('Prompt kopiert!');
        });
    }
}

function loadPromptToEditor(promptId) {
    const prompt = prompts[promptId];
    if (prompt) {
        const textarea = document.getElementById('promptTextarea');
        if (textarea) {
            textarea.value = prompt.text;
            showTab('coaching'); // Switch to coaching tab
            showToast(`${promptId} in Editor geladen`);
        }
    }
}

function sendPromptDirectly(promptId) {
    const prompt = prompts[promptId];
    if (prompt) {
        // Load to editor first
        loadPromptToEditor(promptId);
        // Then send to collaboration
        setTimeout(() => {
            sendToCollaboration();
        }, 100);
    }
}

// ===== PROMPT EDITOR =====
function copyPromptText() {
    const textarea = document.getElementById('promptTextarea');
    if (textarea && textarea.value) {
        navigator.clipboard.writeText(textarea.value).then(() => {
            showToast('Text kopiert!');
        });
    }
}

function clearEditor() {
    const textarea = document.getElementById('promptTextarea');
    if (textarea) {
        textarea.value = '';
        showToast('Editor geleert');
    }
}

function sendToCollaboration() {
    const textarea = document.getElementById('promptTextarea');
    if (!textarea || !textarea.value.trim()) {
        alert('Bitte geben Sie einen Prompt ein oder wählen Sie einen aus dem Repository.');
        return;
    }
    
    const promptText = textarea.value.trim();
    
    // Save to localStorage for collaboration
    const collaborationData = {
        prompt: promptText,
        sender: 'Coach',
        timestamp: new Date().toISOString(),
        client: currentClient?.name || 'Unbekannt'
    };
    
    localStorage.setItem('collaborationData', JSON.stringify(collaborationData));
    
    // Switch to collaboration tab
    showTab('collaboration');
    
    // Update collaboration thread
    updateCollaborationThread(collaborationData);
    
    console.log('📤 Prompt an Kollaboration gesendet:', promptText.substring(0, 50) + '...');
    showToast('Prompt an Kollaboration gesendet!');
}

// ===== KOLLABORATION =====
function updateCollaborationThread(data) {
    const thread = document.getElementById('collaborationThread');
    if (!thread) return;
    
    // Clear initial message
    thread.innerHTML = '';
    
    // Coach Message
    const coachMessage = document.createElement('div');
    coachMessage.className = 'message coach-message';
    coachMessage.innerHTML = `
        <div class="message-header">
            <span class="sender">👨‍💼 Coach</span>
            <span class="timestamp">${new Date(data.timestamp).toLocaleTimeString()}</span>
        </div>
        <div class="message-content">${data.prompt}</div>
    `;
    thread.appendChild(coachMessage);
    
    // Add AI Response after delay
    setTimeout(() => {
        generateAIResponse(data.prompt, thread);
    }, 2000);
    
    // Scroll to bottom
    thread.scrollTop = thread.scrollHeight;
}

function generateAIResponse(promptText, thread) {
    // Simple AI response based on prompt type
    let aiResponse = 'Das ist ein wichtiger Punkt. Lassen Sie uns das gemeinsam weiter erkunden.';
    
    if (promptText.includes('Spannungsfeld') || promptText.includes('Polen')) {
        aiResponse = 'Spannungsfelder sind oft der Schlüssel zur Lösung. Zwischen welchen Polen bewegen Sie sich genau? Eine Avatar-Aufstellung könnte hier hilfreich sein.';
    } else if (promptText.includes('Gefühle') || promptText.includes('Ihnen damit')) {
        aiResponse = 'Ihre Gefühle sind völlig verständlich und wichtig. Sie zeigen uns, was Ihnen wirklich am Herzen liegt.';
    } else if (promptText.includes('Ziel') || promptText.includes('erreichen')) {
        aiResponse = 'Ein klares Ziel ist der erste Schritt zur Veränderung. Was wäre Ihr ideales Ergebnis?';
    } else if (promptText.includes('Stärken') || promptText.includes('gut')) {
        aiResponse = 'Ressourcen zu aktivieren ist kraftvoll. Sie haben mehr Stärken, als Sie vielleicht gerade sehen.';
    }
    
    const aiMessage = document.createElement('div');
    aiMessage.className = 'message ai-message';
    aiMessage.innerHTML = `
        <div class="message-header">
            <span class="sender">🤖 KI-Assistant</span>
            <span class="timestamp">${new Date().toLocaleTimeString()}</span>
        </div>
        <div class="message-content">${aiResponse}</div>
        <div class="message-actions">
            <button onclick="approveResponse()" class="btn-small success">✅ Genehmigen</button>
            <button onclick="modifyResponse()" class="btn-small">🔄 Bearbeiten</button>
        </div>
    `;
    thread.appendChild(aiMessage);
    
    // Scroll to bottom
    thread.scrollTop = thread.scrollHeight;
}

function clearCollaboration() {
    const thread = document.getElementById('collaborationThread');
    if (thread) {
        thread.innerHTML = `
            <div class="initial-message">
                <p>⏳ Warten auf Coaching-Prompt...</p>
                <p>Sobald Sie einen Prompt aus dem Coaching-Bereich senden, erscheint er hier für den Coachee.</p>
            </div>
        `;
    }
    localStorage.removeItem('collaborationData');
    showToast('Kollaboration geleert');
}

function approveResponse() {
    showToast('KI-Antwort genehmigt und an Coachee gesendet');
    console.log('✅ KI-Antwort genehmigt');
}

function modifyResponse() {
    const newResponse = prompt('Antwort bearbeiten:');
    if (newResponse) {
        showToast('Geänderte Antwort gesendet');
        console.log('🔄 Antwort geändert:', newResponse);
    }
}

// ===== COACH-KI ASSISTANT =====
function askCoachKI(query) {
    const output = document.getElementById('coachKIOutput');
    if (!output) return;
    
    // Loading State
    output.innerHTML = '<div class="ai-thinking">🤖 Coach-KI denkt nach...</div>';
    
    setTimeout(() => {
        const responses = {
            'Prozess-Beratung': `📊 <strong>Prozess-Status:</strong><br>
                • Aktuelle Phase: ${currentPhase}/4<br>
                • Klient: ${currentClient?.name || 'Nicht ausgewählt'}<br>
                • Empfehlung: ${getPhaseRecommendation()}`,
            
            'Methoden-Tipp': getRandomMethodTip(),
            
            'Spannungsfeld': `⚖️ <strong>Spannungsfeld-Arbeit:</strong><br>
                • Nutzen Sie GT4 zur Identifikation<br>
                • DelightEx Avatar-Tool für Aufstellung<br>
                • Beide Pole würdigen, Balance finden<br>
                💡 <a href="https://www.delightex.com" target="_blank">DelightEx öffnen</a>`
        };
        
        let response = responses[query] || `🤖 <strong>Coach-KI Analyse:</strong><br>
            Ihre Anfrage "${query}" wurde verarbeitet.<br>
            Aktueller Kontext: ${currentClient?.name || 'Kein Klient'} - Phase ${currentPhase}<br>
            💡 Weitere Unterstützung verfügbar über Quick Actions.`;
        
        output.innerHTML = `
            <div class="ai-response">
                <div class="response-header">
                    <span class="ai-icon">🤖</span>
                    <span class="response-time">${new Date().toLocaleTimeString()}</span>
                </div>
                <div class="response-content">${response}</div>
            </div>
        `;
    }, 1000);
}

function getPhaseRecommendation() {
    const recommendations = {
        1: 'Vertrauen aufbauen, Erstanliegen klären (GT1-GT3)',
        2: 'Tiefere Analyse, Spannungsfelder erkunden (GT4-GT6)', 
        3: 'Lösungen entwickeln, Ressourcen aktivieren (GT7-GT9)',
        4: 'Umsetzung planen, Transfer sicherstellen (GT10-GT12)'
    };
    return recommendations[currentPhase];
}

function getRandomMethodTip() {
    const tips = [
        '🎭 <strong>Avatar-Aufstellung:</strong> Spannungsfelder visualisieren mit DelightEx',
        '📊 <strong>Skalierungsfragen:</strong> Fortschritt messbar machen (SF2)',
        '🔍 <strong>Wunderfrage:</strong> Lösungsvisionen entwickeln (SF1)',
        '⚡ <strong>Ressourcen-Mapping:</strong> Stärken aktivieren (GT8)',
        '🎯 <strong>Timeline-Arbeit:</strong> Zeitliche Entwicklung verstehen'
    ];
    return tips[Math.floor(Math.random() * tips.length)];
}

// ===== TEMPLATES =====
function loadTemplate(templateId) {
    const templates = {
        'konflikt': ['GT1', 'GT3', 'GT4', 'GT5', 'GT7', 'GT9', 'GT10', 'GT11'],
        'entscheidung': ['GT1', 'GT2', 'GT7', 'GT8', 'GT9', 'SF1', 'GT10', 'GT11'],
        'spannungsfeld': ['GT4', 'SF1', 'DIAG1', 'LÖS1', 'META1'],
        'ressourcen': ['GT8', 'SF2', 'SF3', 'LÖS1', 'META1']
    };
    
    const templatePrompts = templates[templateId];
    if (templatePrompts) {
        showTab('coaching');
        showToast(`Template "${templateId}" geladen`);
        
        // Highlight relevant prompts
        setTimeout(() => {
            document.querySelectorAll('.prompt-card').forEach(card => {
                card.classList.remove('template-highlight');
            });
            
            templatePrompts.forEach(promptId => {
                const card = document.querySelector(`.prompt-card .prompt-id:contains("${promptId}")`);
                if (card) {
                    card.closest('.prompt-card').classList.add('template-highlight');
                }
            });
        }, 500);
    }
}

// ===== FILTER FUNKTIONEN =====
function filterPrompts() {
    const searchTerm = document.getElementById('promptSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.prompt-card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
}

function filterPromptsByCategory(category) {
    const cards = document.querySelectorAll('.prompt-card');
    
    cards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
        } else {
            const cardCategory = card.dataset.category;
            card.style.display = cardCategory === category ? 'block' : 'none';
        }
    });
}

function filterPromptsByPhase(phase) {
    const cards = document.querySelectorAll('.prompt-card');
    
    cards.forEach(card => {
        const cardPhase = parseInt(card.dataset.phase);
        card.style.display = cardPhase === phase ? 'block' : 'none';
    });
}

// ===== UI HELPER FUNKTIONEN =====
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show target tab
    const targetTab = document.getElementById(tabName);
    const targetButton = document.querySelector(`[data-tab="${tabName}"]`);
    
    if (targetTab) targetTab.classList.add('active');
    if (targetButton) targetButton.classList.add('active');
}

function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ===== UTILITY FUNKTIONEN =====
function exportSession() {
    const sessionData = {
        client: currentClient,
        phase: currentPhase,
        timestamp: new Date().toISOString(),
        collaborationData: localStorage.getItem('collaborationData')
    };
    
    const dataStr = JSON.stringify(sessionData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `coaching-session-${currentClient?.name || 'unknown'}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showToast('Session exportiert');
}

function openAvatarTool() {
    window.open('https://www.delightex.com', '_blank');
    showToast('DelightEx Avatar Tool geöffnet');
}

// ===== DEBUG FUNKTIONEN =====
function validateData() {
    console.log('🔍 Daten-Validierung:');
    console.log('Prompts:', Object.keys(prompts).length);
    console.log('Current Client:', currentClient?.name || 'Nicht ausgewählt');
    console.log('Current Phase:', currentPhase);
    console.log('Session Active:', !!sessionStartTime);
}

function debugCollaborationSync() {
    const stored = localStorage.getItem('collaborationData');
    console.log('🔧 Kollaboration Debug:');
    console.log('localStorage:', stored ? 'Daten verfügbar' : 'Leer');
    console.log('Thread Element:', !!document.getElementById('collaborationThread'));
    if (stored) {
        console.log('Stored Data:', JSON.parse(stored));
    }
}

// ===== APP START =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 DOM geladen, starte App...');
    initializeApp();
});