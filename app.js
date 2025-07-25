// Coach Mission Control - Hauptanwendung
// Triadisches Coaching mit KI-Unterstützung + 85+ Prompts

// ===== GLOBALE VARIABLEN =====
let currentClient = null;
let currentSession = null;
let selectedPrompt = null;
let sessionActive = false;

// ===== INITIALISIERUNG =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Coach Mission Control wird initialisiert...');
    
    // Warten auf data.js oder Fallback verwenden
    if (window.prompts && window.clients) {
        initializeApp();
    } else {
        // Fallback-Daten laden
        loadFallbackData();
        setTimeout(initializeApp, 100);
    }
    
    // Tab-Navigation initialisieren
    initializeTabs();
    
    // Debug-Panel starten
    updateDebugPanel();
    
    console.log('✅ App erfolgreich initialisiert');
});

// ===== FALLBACK-DATEN =====
function loadFallbackData() {
    console.log('⚡ Lade Fallback-Daten...');
    
    // Minimale Fallback-Prompts falls data.js nicht lädt
    window.prompts = {
        GT1: {
            text: "Ich habe folgendes Anliegen: [PROBLEMBESCHREIBUNG]. Kannst du mir helfen, das strukturiert zu durchdenken?",
            category: "GT",
            phase: 1,
            description: "ERSTANLIEGEN - Offene Eingangsfrage zur Problemdefinition"
        },
        SF1: {
            text: "Du bist mein Coaching Solution Finder. Spiegle mir mein Anliegen wider und hilf mir, es klarer zu verstehen. Was hörst du zwischen den Zeilen?",
            category: "SF",
            phase: 1,
            description: "COACHING SOLUTION FINDER - Klarheit durch Spiegelung"
        }
    };
    
    // Fallback-Klienten
    window.clients = [
        {
            id: 1,
            name: "Sarah Müller",
            age: 42,
            profession: "Projektmanagerin",
            topics: ["Work-Life-Balance", "Führung", "Stressmanagement"]
        },
        {
            id: 2,
            name: "Thomas Weber",
            age: 58,
            profession: "Senior Manager",
            topics: ["Ruhestand", "Sinnfindung", "Neuorientierung"]
        }
    ];
    
    console.log('✅ Fallback-Daten geladen');
}

// ===== TAB-NAVIGATION =====
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Alle Tabs deaktivieren
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Gewählten Tab aktivieren
            btn.classList.add('active');
            document.getElementById(targetTab + 'Tab').classList.add('active');
            
            // Spezielle Aktionen für bestimmte Tabs
            if (targetTab === 'coaching') {
                renderPrompts(); // Prompts bei Tab-Wechsel neu rendern
            }
        });
    });
}

// ===== APP-INITIALISIERUNG =====
function initializeApp() {
    console.log('🎯 Initialisiere Hauptfunktionen...');
    
    // Klienten anzeigen
    renderClients();
    
    // Prompts anzeigen
    renderPrompts();
    
    // Event-Listener registrieren
    setupEventListeners();
    
    // Filter initialisieren
    setupFilters();
    
    // Kategorie-Filter mit allen verfügbaren Kategorien füllen
    populateCategoryFilter();
    
    console.log('✅ App vollständig initialisiert');
}

// ===== KATEGORIE-FILTER BEFÜLLEN =====
function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;
    
    // Alle verfügbaren Kategorien aus den Prompts extrahieren
    const categories = [...new Set(Object.values(window.prompts || {}).map(p => p.category))];
    
    // Kategorie-Namen mapping
    const categoryNames = {
        'GT': 'Geißler Triadisch (GT)',
        'SF': 'Solution Finder (SF)', 
        'DIAG': 'Diagnostik (DIAG)',
        'LÖS': 'Lösungsorientiert (LÖS)',
        'META': 'Meta-Coaching (META)',
        'WARN': 'Warnsignale (WARN)',
        'QK': 'Qualitätskontrolle (QK)',
        'PAAR': 'Paar-Coaching (PAAR)',
        'GRUPPE': 'Gruppen-Coaching (GRUPPE)',
        'LIVE': 'Live-Support (LIVE)',
        'MOBIL': 'Mobile Integration (MOBIL)',
        'AVA': 'Avatar-Aufstellungen (AVA)'
    };
    
    // Filter-Optionen erstellen
    categoryFilter.innerHTML = '<option value="all">Alle Kategorien</option>';
    categories.sort().forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = categoryNames[cat] || cat;
        categoryFilter.appendChild(option);
    });
    
    console.log('✅ Kategorie-Filter mit', categories.length, 'Kategorien befüllt');
}

// ===== KLIENTEN-RENDERING =====
function renderClients() {
    const container = document.getElementById('clientsContainer');
    if (!container) return;
    
    const clients = window.clients || [];
    
    container.innerHTML = clients.map(client => `
        <div class="client-card" data-client-id="${client.id}">
            <div class="client-name">${client.name}</div>
            <div class="client-info">
                <div class="client-age">${client.age} Jahre • ${client.profession}</div>
                <div class="client-topics">
                    ${client.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // Click-Handler für Klienten-Auswahl
    container.addEventListener('click', (e) => {
        const clientCard = e.target.closest('.client-card');
        if (clientCard) {
            selectClient(parseInt(clientCard.dataset.clientId));
        }
    });
    
    console.log('✅ Klienten gerendert:', clients.length);
}

// ===== PROMPT-RENDERING (ERWEITERT FÜR 85+ PROMPTS) =====
function renderPrompts() {
    const container = document.getElementById('promptsContainer');
    if (!container) return;
    
    const prompts = window.prompts || {};
    const promptsList = Object.entries(prompts);
    
    if (promptsList.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #64748b; background: white; border-radius: 12px; border: 2px dashed #cbd5e1;">
                <h3>🚀 Prompt-Bibliothek wird geladen...</h3>
                <p>Prüfe die data.js Datei.</p>
                <button onclick="forcePromptLoad()" style="background: #3b82f6; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; margin-top: 10px;">🔄 Neu laden</button>
            </div>
        `;
        return;
    }
    
    // Prompts nach Kategorie sortieren
    const sortedPrompts = promptsList.sort(([keyA, promptA], [keyB, promptB]) => {
        // Erst nach Kategorie, dann nach Key sortieren
        if (promptA.category !== promptB.category) {
            return promptA.category.localeCompare(promptB.category);
        }
        return keyA.localeCompare(keyB);
    });
    
    container.innerHTML = sortedPrompts.map(([key, prompt]) => {
        // Kategorie-Farben
        const categoryColors = {
            'GT': '#3b82f6',     // Blau
            'SF': '#10b981',     // Grün  
            'DIAG': '#f59e0b',   // Orange
            'LÖS': '#8b5cf6',    // Lila
            'META': '#6b7280',   // Grau
            'WARN': '#ef4444',   // Rot
            'QK': '#ef4444',     // Rot
            'PAAR': '#ec4899',   // Pink
            'GRUPPE': '#06b6d4', // Cyan
            'LIVE': '#84cc16',   // Lime
            'MOBIL': '#f97316',  // Orange-Rot
            'AVA': '#8b5cf6'     // Lila
        };
        
        const categoryColor = categoryColors[prompt.category] || '#64748b';
        
        return `
            <div class="prompt-card" data-prompt-key="${key}" data-category="${prompt.category}" data-phase="${prompt.phase}" 
                 style="margin-bottom: 1rem; padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 12px; background: white; cursor: pointer; transition: all 0.3s ease;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                    <strong style="color: ${categoryColor}; font-size: 1.1rem;">${key}</strong>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <span style="background: ${categoryColor}20; color: ${categoryColor}; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${prompt.category}</span>
                        ${prompt.phase ? `<span style="background: #f1f5f9; color: #475569; padding: 0.25rem 0.5rem; border-radius: 8px; font-size: 0.75rem;">Phase ${prompt.phase}</span>` : ''}
                    </div>
                </div>
                <div style="font-weight: 600; margin-bottom: 0.75rem; line-height: 1.4; color: #1e293b;">
                    ${prompt.description}
                </div>
                <div style="font-size: 0.9rem; color: #64748b; margin-bottom: 1rem; line-height: 1.5;">
                    ${prompt.text.length > 150 ? prompt.text.substring(0, 150) + '...' : prompt.text}
                </div>
                ${prompt.methodeninfo ? `<div style="font-size: 0.85rem; color: #6b7280; margin-bottom: 1rem; font-style: italic;">${prompt.methodeninfo}</div>` : ''}
                <div style="display: flex; gap: 0.75rem;">
                    <button onclick="usePrompt('${key}')" style="background: ${categoryColor}; color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; flex: 1;">📤 Verwenden</button>
                    <button onclick="showPromptDetails('${key}')" style="background: #f8fafc; color: #475569; padding: 0.5rem 1rem; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer; font-weight: 500;">👁️ Details</button>
                </div>
            </div>
        `;
    }).join('');
    
    console.log('✅ Prompts gerendert:', promptsList.length);
    
    // Statistik anzeigen
    const stats = getPromptStatistics();
    console.log('📊 Prompt-Statistiken:', stats);
}

// ===== PROMPT-STATISTIKEN =====
function getPromptStatistics() {
    const prompts = window.prompts || {};
    const stats = {
        total: Object.keys(prompts).length,
        byCategory: {},
        byPhase: {}
    };
    
    Object.values(prompts).forEach(prompt => {
        // Nach Kategorie
        stats.byCategory[prompt.category] = (stats.byCategory[prompt.category] || 0) + 1;
        
        // Nach Phase
        const phase = prompt.phase || 'Meta';
        stats.byPhase[phase] = (stats.byPhase[phase] || 0) + 1;
    });
    
    return stats;
}

// ===== PROMPT VERWENDEN =====
function usePrompt(promptKey) {
    const prompt = window.prompts[promptKey];
    if (!prompt) return;
    
    // Prompt in Editor laden
    const editor = document.getElementById('promptEditor');
    if (editor) {
        editor.value = `${promptKey}: ${prompt.description}\n\n${prompt.text}\n\n${prompt.methodeninfo ? `Methodik: ${prompt.methodeninfo}` : ''}`;
    }
    
    // Prompt als ausgewählt markieren
    selectedPrompt = { key: promptKey, ...prompt };
    
    // Visuelle Markierung
    document.querySelectorAll('.prompt-card').forEach(card => {
        card.classList.remove('selected');
        card.style.transform = '';
        card.style.boxShadow = '';
    });
    
    const selectedCard = document.querySelector(`[data-prompt-key="${promptKey}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        selectedCard.style.transform = 'translateY(-2px)';
        selectedCard.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.2)';
        selectedCard.style.borderColor = '#3b82f6';
    }
    
    // Erfolgs-Notification
    showNotification(`✅ ${promptKey} geladen!`, 'success');
    
    console.log('✅ Prompt geladen:', promptKey);
}

// ===== PROMPT DETAILS ANZEIGEN =====
function showPromptDetails(promptKey) {
    const prompt = window.prompts[promptKey];
    if (!prompt) return;
    
    const details = `
Prompt: ${promptKey}
Kategorie: ${prompt.category}
Phase: ${prompt.phase || 'Meta'}

Beschreibung:
${prompt.description}

Volltext:
${prompt.text}

${prompt.methodeninfo ? `Methodeninfo:\n${prompt.methodeninfo}` : ''}
    `.trim();
    
    alert(details);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; 
        background: ${colors[type]}; color: white;
        padding: 12px 20px; border-radius: 8px; z-index: 1000;
        font-weight: 500; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// ===== KLIENTEN-AUSWAHL =====
function selectClient(clientId) {
    const client = window.clients.find(c => c.id === clientId);
    if (!client) return;
    
    // Visuelle Auswahl
    document.querySelectorAll('.client-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-client-id="${clientId}"]`).classList.add('selected');
    
    // Globale Variable setzen
    currentClient = client;
    
    // Session-Button anzeigen
    const actionSection = document.getElementById('clientActionSection');
    if (actionSection) {
        actionSection.style.display = 'block';
    }
    
    updateDebugPanel();
    console.log('✅ Klient ausgewählt:', client.name);
}

// ===== SESSION-START =====
function startSession() {
    if (!currentClient) {
        alert('Bitte wählen Sie zuerst einen Klienten aus.');
        return;
    }
    
    // Session aktivieren
    sessionActive = true;
    currentSession = {
        client: currentClient,
        startTime: new Date(),
        phase: 1,
        prompts: []
    };
    
    // Zur Coaching-Tab wechseln
    switchToTab('coaching');
    
    // Session-Info anzeigen
    const sessionInfo = document.getElementById('sessionInfo');
    if (sessionInfo) {
        sessionInfo.style.display = 'block';
        document.getElementById('currentClient').textContent = currentClient.name;
        document.getElementById('currentPhase').textContent = 'Phase 1: Problem & Ziel';
        document.getElementById('sessionStatus').textContent = 'Aktiv';
    }
    
    updateDebugPanel();
    console.log('🚀 Session gestartet für:', currentClient.name);
}

// ===== TAB-WECHSEL =====
function switchToTab(tabName) {
    // Alle Tabs deaktivieren
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Gewählten Tab aktivieren
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// ===== EVENT-LISTENER SETUP =====
function setupEventListeners() {
    // Session-Start Button
    const startBtn = document.getElementById('startSessionBtn');
    if (startBtn) {
        startBtn.addEventListener('click', startSession);
    }
    
    // Editor-Buttons
    const sendBtn = document.getElementById('sendToCollaboration');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendToCollaboration);
    }
    
    const clearBtn = document.getElementById('clearEditor');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            document.getElementById('promptEditor').value = '';
            selectedPrompt = null;
            document.querySelectorAll('.prompt-card').forEach(card => {
                card.classList.remove('selected');
                card.style.transform = '';
                card.style.boxShadow = '';
                card.style.borderColor = '';
            });
        });
    }
    
    // Kollaborations-Buttons
    const sendToAIBtn = document.getElementById('sendToAI');
    if (sendToAIBtn) {
        sendToAIBtn.addEventListener('click', sendToAI);
    }
    
    console.log('✅ Event-Listener registriert');
}

// ===== FILTER-SETUP =====
function setupFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const phaseFilter = document.getElementById('phaseFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterPrompts);
    }
    if (phaseFilter) {
        phaseFilter.addEventListener('change', filterPrompts);
    }
}

// ===== PROMPT-FILTERUNG =====
function filterPrompts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const phaseFilter = document.getElementById('phaseFilter').value;
    
    const promptCards = document.querySelectorAll('.prompt-card');
    let visibleCount = 0;
    
    promptCards.forEach(card => {
        const promptKey = card.dataset.promptKey;
        const prompt = window.prompts[promptKey];
        
        let showCard = true;
        
        if (categoryFilter !== 'all' && prompt.category !== categoryFilter) {
            showCard = false;
        }
        
        if (phaseFilter !== 'all' && prompt.phase.toString() !== phaseFilter) {
            showCard = false;
        }
        
        card.style.display = showCard ? 'block' : 'none';
        if (showCard) visibleCount++;
    });
    
    console.log(`📊 Filter angewendet: ${visibleCount} von ${promptCards.length} Prompts sichtbar`);
}

// ===== AN KOLLABORATION SENDEN =====
function sendToCollaboration() {
    const editor = document.getElementById('promptEditor');
    const content = editor.value.trim();
    
    if (!content) {
        alert('Bitte geben Sie einen Prompt ein.');
        return;
    }
    
    // Zur Kollaborations-Tab wechseln
    switchToTab('collaboration');
    
    // Nachricht in Kollaboration anzeigen
    const messagesContainer = document.getElementById('collaborationMessages');
    if (messagesContainer) {
        messagesContainer.innerHTML = `
            <div class="message coach" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; border-left: 4px solid #3b82f6;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span style="font-weight: bold;">👨‍💼 Coach</span>
                    <span style="color: #64748b; font-size: 0.9rem;">${new Date().toLocaleTimeString()}</span>
                    ${selectedPrompt ? `<span style="background: #dbeafe; color: #1d4ed8; padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.8rem;">${selectedPrompt.key}</span>` : ''}
                </div>
                <div style="margin-bottom: 1rem;">${content}</div>
                <div style="font-size: 0.9rem; color: #64748b;">Prompt wurde an den Coachee gesendet. Klicken Sie "An KI senden" für eine Antwort.</div>
            </div>
        `;
    }
    
    // Kollaborations-Aktionen anzeigen
    const actions = document.getElementById('collaborationActions');
    if (actions) {
        actions.style.display = 'flex';
    }
    
    console.log('✅ Prompt an Kollaboration gesendet');
}

// ===== AN KI SENDEN =====
function sendToAI() {
    const messagesContainer = document.getElementById('collaborationMessages');
    if (!messagesContainer) return;
    
    // Intelligente KI-Antwort basierend auf Prompt-Inhalt
    const editor = document.getElementById('promptEditor');
    const promptContent = editor.value.toLowerCase();
    
    let aiResponse = generateIntelligentAIResponse(promptContent);
    
    // KI-Antwort hinzufügen
    messagesContainer.innerHTML += `
        <div class="message ai" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; border-left: 4px solid #8b5cf6;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                <span style="font-weight: bold;">🤖 KI-Coach</span>
                <span style="color: #64748b; font-size: 0.9rem;">${new Date().toLocaleTimeString()}</span>
            </div>
            <div style="line-height: 1.6;">${aiResponse}</div>
        </div>
    `;
    
    // Weitere Aktionen anzeigen
    const actions = document.getElementById('collaborationActions');
    if (actions) {
        actions.innerHTML = `
            <button onclick="getAlternativeResponse()" style="background: #8b5cf6; color: white; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer;">🔄 Andere Coach-Formulierung</button>
            <button onclick="editPrompt()" style="background: #64748b; color: white; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer;">✏️ Prompt bearbeiten</button>
            <button onclick="nextPrompt()" style="background: #10b981; color: white; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer;">➡️ Nächster Prompt</button>
        `;
    }
    
    console.log('✅ KI-Antwort generiert');
}

// ===== INTELLIGENTE KI-ANTWORTEN =====
function generateIntelligentAIResponse(promptContent) {
    // Erweiterte Themen-Erkennung basierend auf Prompt-Kategorien
    if (promptContent.includes('gt1') || promptContent.includes('erstanliegen')) {
        return `Vielen Dank für das Vertrauen, dass Sie dieses wichtige Anliegen mit mir teilen. Was Sie beschreiben, zeigt bereits eine wichtige Reflexionsfähigkeit. Ihre Bereitschaft, sich strukturiert mit dieser Herausforderung auseinanderzusetzen, ist ein wertvoller erster Schritt. Lassen Sie uns gemeinsam die verschiedenen Aspekte Ihres Anliegens durchdenken und dabei sowohl die emotionalen als auch die praktischen Dimensionen berücksichtigen.`;
    }
    
    if (promptContent.includes('solution finder') || promptContent.includes('sf1')) {
        return `Was ich zwischen den Zeilen höre, ist eine Person, die bereit ist für Veränderung und gleichzeitig noch nach dem besten Weg sucht. Ihre Art, das Thema zu beschreiben, zeigt mir sowohl Ihre Reflektionsfähigkeit als auch Ihren Wunsch nach konstruktiven Lösungen. Besonders bemerkenswert finde ich [spezifischer Aspekt]. Das deutet auf wichtige Ressourcen hin, die wir für Ihren Weg nutzen können.`;
    }
    
    if (promptContent.includes('diag') || promptContent.includes('spannungsfeld')) {
        return `In Ihrer Beschreibung erkenne ich ein klassisches Spannungsfeld zwischen [Pol A] und [Pol B]. Diese Art von innerer Reibung ist sehr normal und oft ein Zeichen dafür, dass wichtige Entwicklungsschritte anstehen. Solche Spannungen entstehen meist dann, wenn verschiedene Lebensbereiche oder Werte miteinander konkurrieren. Das ist nicht problematisch, sondern zeigt Ihre Differenziertheit.`;
    }
    
    if (promptContent.includes('lös') || promptContent.includes('vision') || promptContent.includes('imagination')) {
        return `Lassen Sie uns gemeinsam ein kraftvolles Bild Ihrer Zukunft entwickeln. Wenn Sie Ihr Ziel erreicht haben, stelle ich mir vor, dass Sie eine neue Art von Gelassenheit und Selbstvertrauen ausstrahlen. Sie haben Ihre Herausforderung nicht nur gemeistert, sondern sind daran gewachsen. Diese Vision soll Sie motivieren und Ihnen als innerer Kompass dienen.`;
    }
    
    if (promptContent.includes('meta') || promptContent.includes('prozess')) {
        return `An diesem Punkt im Coaching-Prozess ist es wichtig, kurz innezuhalten und zu reflektieren. Was ist bisher hilfreich für Sie gewesen? Wo spüren Sie bereits Bewegung oder neue Klarheit? Diese Zwischenbilanz hilft uns, den weiteren Weg optimal zu gestalten und sicherzustellen, dass wir auf dem richtigen Pfad sind.`;
    }
    
    if (promptContent.includes('ruhestand') || promptContent.includes('übergang')) {
        return `Übergangsphasen wie der Ruhestand bringen oft gemischte Gefühle mit sich - das ist völlig normal. Einerseits die Vorfreude auf neue Freiheiten, andererseits Unsicherheit über die Gestaltung dieser neuen Lebensphase. Ihre Sorgen sind berechtigt und gleichzeitig ein Zeichen dafür, dass Sie diesen Übergang bewusst angehen möchten. Das ist eine wichtige Ressource.`;
    }
    
    // Standard-Antwort für unbekannte Prompts
    return `Vielen Dank für das Vertrauen, dass Sie Ihr Anliegen mit mir teilen. Was Sie beschreiben, zeigt wichtige Reflexions- und Entwicklungsbereitschaft. Ihre Offenheit für diesen Coaching-Prozess ist bereits eine wertvolle Ressource. Lassen Sie uns gemeinsam strukturiert an Ihrem Thema arbeiten und dabei sowohl Ihre Stärken als auch die Herausforderungen im Blick behalten.`;
}

// ===== ZUSÄTZLICHE FUNKTIONEN =====
function getAlternativeResponse() {
    const messagesContainer = document.getElementById('collaborationMessages');
    const aiMessages = messagesContainer.querySelectorAll('.message.ai');
    const lastAIMessage = aiMessages[aiMessages.length - 1];
    
    if (lastAIMessage) {
        const alternatives = [
            "Das ist ein sehr wichtiges Thema, das Sie da ansprechen. Ihre Reflexion zeigt mir, dass Sie bereits wichtige Schritte in Richtung Lösung gehen. Lassen Sie uns gemeinsam herausfinden, welche Ressourcen und Möglichkeiten Sie bereits haben.",
            "Ich kann gut verstehen, dass Sie sich Gedanken dazu machen. Diese Art von Herausforderung erfordert eine durchdachte Herangehensweise. Ihre Offenheit, darüber zu sprechen, ist bereits ein wichtiger Baustein für eine Lösung.",
            "Vielen Dank für diese ehrliche Einschätzung. Was Sie beschreiben, kenne ich aus vielen Coaching-Gesprächen. Menschen in Ihrer Situation entwickeln oft sehr kreative und erfolgreiche Strategien."
        ];
        
        const randomResponse = alternatives[Math.floor(Math.random() * alternatives.length)];
        const contentDiv = lastAIMessage.querySelector('div:last-child');
        if (contentDiv) {
            contentDiv.innerHTML = randomResponse;
        }
    }
}

function editPrompt() {
    switchToTab('coaching');
}

function nextPrompt() {
    // Intelligente Prompt-Empfehlung basierend auf aktuellem Prompt
    if (!selectedPrompt) {
        usePrompt('GT1');
        return;
    }
    
    const currentKey = selectedPrompt.key;
    const currentCategory = selectedPrompt.category;
    
    // GT-Sequenz
    if (currentCategory === 'GT') {
        const currentNumber = parseInt(currentKey.replace('GT', ''));
        const nextNumber = currentNumber + 1;
        const nextKey = `GT${nextNumber}`;
        
        if (window.prompts[nextKey]) {
            usePrompt(nextKey);
            switchToTab('coaching');
            return;
        }
    }
    
    // SF-Sequenz
    if (currentCategory === 'SF') {
        const sfSequence = ['SF1', 'ZIEL', 'SKALA', 'TEAM', 'DIALOG', 'NAMEN', 'VAL', 'TRANSFORM', 'STÄRKEN', 'INTEGRATION', 'PLAN', 'VISION'];
        const currentIndex = sfSequence.indexOf(currentKey);
        const nextIndex = currentIndex + 1;
        
        if (nextIndex < sfSequence.length && window.prompts[sfSequence[nextIndex]]) {
            usePrompt(sfSequence[nextIndex]);
            switchToTab('coaching');
            return;
        }
    }
    
    // Fallback zu GT1
    usePrompt('GT1');
    switchToTab('coaching');
}

// ===== TEMPLATE-RENDERING (ENTFERNT - Prompts sind im Coaching-Tab) =====
// Templates wurden entfernt, da das komplette Prompt Repository 
// direkt im Coaching-Tab verfügbar ist - viel effizienter!

// ===== DEBUG-PANEL =====
function updateDebugPanel() {
    const statusEl = document.getElementById('debugStatus');
    const clientEl = document.getElementById('debugClient');
    const sessionEl = document.getElementById('debugSession');
    const phaseEl = document.getElementById('debugPhase');
    
    if (statusEl) statusEl.textContent = sessionActive ? 'Session aktiv' : 'Bereit';
    if (clientEl) clientEl.textContent = currentClient ? currentClient.name : 'Nicht ausgewählt';
    if (sessionEl) sessionEl.textContent = sessionActive ? 'Aktiv' : 'Inaktiv';
    if (phaseEl) phaseEl.textContent = currentSession ? `Phase ${currentSession.phase}` : '-';
}

// ===== DEBUG-FUNKTIONEN (für Console) =====
function debugApp() {
    console.log('🔧 Debug-Informationen:');
    console.log('- Aktueller Klient:', currentClient);
    console.log('- Session aktiv:', sessionActive);
    console.log('- Ausgewählter Prompt:', selectedPrompt);
    console.log('- Verfügbare Prompts:', Object.keys(window.prompts || {}));
    console.log('- Verfügbare Klienten:', window.clients?.length || 0);
    console.log('- Prompt-Statistiken:', getPromptStatistics());
}

function debugPrompts() {
    console.log('📝 Prompt-Debug:');
    const stats = getPromptStatistics();
    console.log('- Anzahl Prompts:', stats.total);
    console.log('- Nach Kategorie:', stats.byCategory);
    console.log('- Nach Phase:', stats.byPhase);
    console.log('- Container vorhanden:', !!document.getElementById('promptsContainer'));
}

function forcePromptLoad() {
    console.log('⚡ Force-Loading Prompts...');
    renderPrompts();
    populateCategoryFilter();
    showNotification('🔄 Prompts neu geladen!', 'info');
}

function testCollab() {
    console.log('🤝 Test Kollaboration...');
    switchToTab('collaboration');
    sendToCollaboration();
}

// Globale Funktionen für HTML-Buttons
window.usePrompt = usePrompt;
window.showPromptDetails = showPromptDetails;
window.getAlternativeResponse = getAlternativeResponse;
window.editPrompt = editPrompt;
window.nextPrompt = nextPrompt;
window.debugApp = debugApp;
window.debugPrompts = debugPrompts;
window.forcePromptLoad = forcePromptLoad;
window.testCollab = testCollab;

console.log('🎯 Coach Mission Control vollständig geladen mit 85+ Prompts!');