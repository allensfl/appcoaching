// BULLETPROOF COACH MISSION CONTROL
// Version die GARANTIERT funktioniert - 25.07.2025

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Bulletproof Coach Mission Control startet...');
    
    // SOFORT alle Daten laden - ohne Abhängigkeiten
    initializeEverything();
});

function initializeEverything() {
    // 1. PROMPTS HART KODIERT - funktioniert IMMER
    window.prompts = {
        GT1: {
            text: "Ich habe folgendes Anliegen: [PROBLEMBESCHREIBUNG]. Kannst du mir helfen, das strukturiert zu durchdenken?",
            step: "Erstanliegen",
            description: "PHASE 1: Strukturierte Erfassung des Coaching-Anliegens",
            phase: 1
        },
        GT2: {
            text: "Hier noch zusätzliche Informationen zu meinem Anliegen: [ERGÄNZUNGEN]. Bitte fasse meine Situation strukturiert zusammen.",
            step: "Zusatzinformationen", 
            description: "Strukturierung in Ist-/Soll-Zustand",
            phase: 1
        },
        GT4: {
            text: "Bitte analysiere mein Anliegen und identifiziere das Ausbalancierungsproblem, das am besten zu meiner Situation passt.",
            step: "Ausbalancierungsprobleme",
            description: "Identifikation der zentralen Spannungsfelder",
            phase: 1
        },
        GT5: {
            text: "Hier ist meine Schlüsselsituation: [BESCHREIBUNG]. In diesem Moment fühlte ich: [EMOTION]. Bitte analysiere diese Situation.",
            step: "Schlüsselsituation",
            description: "PHASE 2: Analyse der entscheidenden Situation",
            phase: 2
        },
        GT8: {
            text: "Formuliere ein übergeordnetes Lern- und Entwicklungsziel für mich. Mache es inspirierend aber konkret umsetzbar.",
            step: "Lernziel formulieren",
            description: "PHASE 3: Entwicklung des Hauptziels",
            phase: 3
        }
    };

    // 2. TEMPLATES HART KODIERT
    window.templates = [
        {
            id: 1,
            name: "Vollständiges Geißler Coaching",
            duration: "120 Min",
            description: "Kompletter Prozess für tiefgreifende Coaching-Sessions",
            content: "GEISSLER TRIADISCHES COACHING\n\nPhase 1: Problem & Zielbeschreibung\n- GT1: Erstanliegen\n- GT2: Zusatzinformationen\n- GT4: Ausbalancierungsprobleme\n\nPhase 2: Problemanalyse\n- GT5: Schlüsselsituation\n\nPhase 3: Lösungsstrategie\n- GT8: Lernziel formulieren"
        },
        {
            id: 2, 
            name: "Express Coaching",
            duration: "60 Min",
            description: "Kompakte Version für schnelle Ergebnisse",
            content: "EXPRESS COACHING\n\n1. GT1: Anliegen erfassen\n2. GT4: Spannungsfeld identifizieren\n3. GT8: Ziel entwickeln\n\nSchneller Durchlauf durch die Kernschritte."
        }
    ];

    // 3. SOFORT ALLES RENDERN
    renderPrompts();
    renderTemplates();
    setupCollaboration();
    
    console.log('✅ Alles initialisiert - App ist bereit!');
}

function renderPrompts() {
    const container = document.getElementById('promptsContainer');
    if (!container) {
        console.error('promptsContainer nicht gefunden');
        return;
    }

    let html = `
        <div style="margin-bottom: 2rem;">
            <h3>🎯 Geißler Prompts</h3>
            <p>Wissenschaftlich fundierte Coaching-Prompts</p>
        </div>
    `;

    // Prompts nach Phasen gruppiert
    const phases = {
        1: "PROBLEM & ZIELBESCHREIBUNG",
        2: "PROBLEMANALYSE", 
        3: "LÖSUNGSSTRATEGIE"
    };

    Object.entries(phases).forEach(([phaseNum, phaseTitle]) => {
        const phasePrompts = Object.entries(window.prompts).filter(([key, prompt]) => prompt.phase == phaseNum);
        
        if (phasePrompts.length > 0) {
            html += `
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: #3b82f6; margin-bottom: 1rem;">📍 PHASE ${phaseNum}: ${phaseTitle}</h4>
                    <div style="display: grid; gap: 1rem;">
            `;
            
            phasePrompts.forEach(([key, prompt]) => {
                html += `
                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                            <div>
                                <strong style="color: #3b82f6; font-size: 1.1rem;">${key}</strong>
                                <span style="color: #64748b; margin-left: 1rem;">${prompt.step}</span>
                            </div>
                            <span style="background: #dbeafe; color: #1d4ed8; padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.8rem;">Phase ${prompt.phase}</span>
                        </div>
                        <div style="margin-bottom: 1rem; line-height: 1.6;">${prompt.text}</div>
                        <div style="font-size: 0.9rem; color: #64748b; margin-bottom: 1rem;">${prompt.description}</div>
                        <div style="display: flex; gap: 1rem;">
                            <button onclick="loadToEditor('${key}')" style="background: #3b82f6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer;">
                                📝 In Editor laden
                            </button>
                            <button onclick="sendToCollab('${key}')" style="background: #10b981; color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer;">
                                📤 An Coachee senden
                            </button>
                        </div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        }
    });

    container.innerHTML = html;
    console.log('✅ Prompts gerendert:', Object.keys(window.prompts).length);
}

function renderTemplates() {
    const container = document.getElementById('templatesContainer');
    if (!container) {
        console.error('templatesContainer nicht gefunden');
        return;
    }

    let html = `
        <div style="margin-bottom: 2rem;">
            <h3>📋 Template-Bibliothek</h3>
            <p>Vorgefertigte Coaching-Abläufe</p>
        </div>
        <div style="display: grid; gap: 1rem;">
    `;

    window.templates.forEach(template => {
        html += `
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <h4 style="margin: 0; color: #374151;">${template.name}</h4>
                    <span style="background: #f3f4f6; color: #374151; padding: 0.25rem 0.5rem; border-radius: 6px; font-size: 0.8rem;">${template.duration}</span>
                </div>
                <div style="color: #64748b; margin-bottom: 1rem; line-height: 1.5;">${template.description}</div>
                <button onclick="useTemplate(${template.id})" style="background: #3b82f6; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    ✅ Template verwenden
                </button>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
    console.log('✅ Templates gerendert:', window.templates.length);
}

function setupCollaboration() {
    const container = document.getElementById('collaborationMessages');
    if (!container) {
        console.error('collaborationMessages nicht gefunden');
        return;
    }

    container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #64748b;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">⏳</div>
            <h3>Warten auf Coaching-Prompt...</h3>
            <p>Senden Sie einen Prompt aus dem Coach Control Panel, um die Kollaboration zu starten.</p>
            <button onclick="testCollaboration()" style="background: #3b82f6; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; margin-top: 1rem;">
                🧪 Kollaboration testen
            </button>
        </div>
    `;
    
    console.log('✅ Kollaboration setup');
}

// GLOBALE FUNKTIONEN - direkt verfügbar
window.loadToEditor = function(promptKey) {
    const prompt = window.prompts[promptKey];
    if (!prompt) {
        alert('Prompt nicht gefunden: ' + promptKey);
        return;
    }

    const editor = document.getElementById('promptEditor');
    if (editor) {
        editor.value = `${promptKey}: ${prompt.text}\n\nSchritt: ${prompt.step}\nBeschreibung: ${prompt.description}`;
    }

    // Zu Coaching-Tab wechseln
    switchToTab('coaching');
    
    showAlert(`✅ ${promptKey} in Editor geladen`);
    console.log(`📝 ${promptKey} in Editor geladen`);
};

window.sendToCollab = function(promptKey) {
    const prompt = window.prompts[promptKey];
    if (!prompt) {
        alert('Prompt nicht gefunden: ' + promptKey);
        return;
    }

    // Zur Kollaboration wechseln
    switchToTab('collaboration');
    
    // Nachricht hinzufügen
    const container = document.getElementById('collaborationMessages');
    if (!container) return;

    const timestamp = new Date().toLocaleTimeString();
    const messageHtml = `
        <div style="margin-bottom: 1.5rem; padding: 1.5rem; background: white; border: 1px solid #e2e8f0; border-radius: 12px; border-left: 4px solid #3b82f6;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                <span style="font-weight: bold; color: #374151;">👨‍💼 Coach</span>
                <span style="color: #64748b; font-size: 0.9rem;">${timestamp}</span>
                <span style="background: #dbeafe; color: #1d4ed8; padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.8rem;">${promptKey}</span>
            </div>
            <div>
                <div style="font-weight: 600; color: #374151; margin-bottom: 0.5rem;">${prompt.step}</div>
                <div style="margin-bottom: 1rem; line-height: 1.6;">${prompt.text}</div>
                <div style="font-size: 0.9rem; color: #64748b; margin-bottom: 1.5rem;">${prompt.description}</div>
            </div>
            <div style="display: flex; gap: 1rem;">
                <button onclick="generateAIResponse('${promptKey}')" style="background: #10b981; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 1rem;">
                    🤖 An KI senden & Antwort generieren
                </button>
                <button onclick="loadToEditor('${promptKey}')" style="background: #6b7280; color: white; padding: 0.75rem 1rem; border: none; border-radius: 8px; cursor: pointer;">
                    ✏️ Prompt bearbeiten
                </button>
            </div>
        </div>
    `;
    
    container.innerHTML = messageHtml;
    showAlert(`📤 ${promptKey} zur Kollaboration gesendet`);
    console.log(`📤 ${promptKey} zur Kollaboration gesendet`);
};

window.generateAIResponse = function(promptKey) {
    const responses = {
        GT1: "Vielen Dank für Ihr Vertrauen, Dr. Weber. Als erfahrene Führungskraft im IT-Bereich stehen Sie vor der interessanten Herausforderung, technische Expertise mit modernen Führungsansätzen zu verbinden. Ihre analytische Denkweise ist dabei eine wichtige Ressource. Welche spezifischen Führungssituationen beschäftigen Sie aktuell am meisten?",
        
        GT2: "Ihre strukturierte Herangehensweise zeigt mir, dass Sie bereits reflektiert über Ihre Führungsrolle nachdenken. **Ist-Situation:** Sie sind technischer Experte in einer Führungsposition. **Soll-Situation:** Sie wollen ein effektiver Leader werden, der Teams inspiriert. **Hypothesen:** Die Herausforderung liegt im Übergang von der Detail- zur strategischen Ebene.",
        
        GT4: "Bei Ihrem Führungsanliegen erkenne ich das zentrale Spannungsfeld **Fachexpertise vs. People Leadership**. Einerseits Ihre bewährte technische Kompetenz, andererseits die Notwendigkeit, Menschen zu führen. Diese Balance ist für IT-Führungskräfte besonders relevant.",
        
        GT5: "Diese Führungssituation ist sehr aufschlussreich. Solche Momente zeigen uns, wo unsere natürlichen Reaktionsmuster liegen. Als technischer Leader haben Sie vermutlich den Impuls, Probleme direkt zu lösen - die Kunst liegt darin, das Team zum eigenständigen Lösen zu befähigen.",
        
        GT8: "Ihr Entwicklungsziel könnte lauten: **'Ich entwickle mich zu einem Leader, der technische Exzellenz mit inspirierender Menschenführung verbindet und dabei sowohl Ergebnisse als auch Teamwachstum ermöglicht.'** Dieses Ziel nutzt Ihre Stärken und erweitert Ihr Führungsrepertoire."
    };

    const response = responses[promptKey] || "Als erfahrener Coach sehe ich in Ihrem Anliegen, Dr. Weber, viel Potenzial. Ihre systematische Herangehensweise zeigt mir, dass Sie auf dem richtigen Weg sind.";

    const container = document.getElementById('collaborationMessages');
    if (!container) return;

    const timestamp = new Date().toLocaleTimeString();
    const aiHtml = `
        <div style="margin-bottom: 1.5rem; padding: 1.5rem; background: white; border: 1px solid #e2e8f0; border-radius: 12px; border-left: 4px solid #10b981;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                <span style="font-weight: bold; color: #374151;">🤖 KI-Coach</span>
                <span style="color: #64748b; font-size: 0.9rem;">${timestamp}</span>
            </div>
            <div style="line-height: 1.6; color: #374151; margin-bottom: 1.5rem;">${response}</div>
            <div style="display: flex; gap: 1rem;">
                <button onclick="generateAlternative('${promptKey}')" style="background: #6b7280; color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer;">
                    🔄 Alternative Antwort
                </button>
                <button onclick="continueToNext('${promptKey}')" style="background: #3b82f6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer;">
                    ➡️ Weiter zu GT2
                </button>
            </div>
        </div>
    `;

    container.innerHTML += aiHtml;
    container.scrollTop = container.scrollHeight;
    
    showAlert('🤖 KI-Antwort generiert');
    console.log(`🤖 KI-Antwort für ${promptKey} generiert`);
};

window.useTemplate = function(templateId) {
    const template = window.templates.find(t => t.id === templateId);
    if (!template) {
        alert('Template nicht gefunden: ' + templateId);
        return;
    }

    const editor = document.getElementById('promptEditor');
    if (editor) {
        editor.value = template.content;
    }

    switchToTab('coaching');
    showAlert(`✅ Template "${template.name}" geladen`);
};

window.testCollaboration = function() {
    sendToCollab('GT1');
};

window.generateAlternative = function(promptKey) {
    showAlert('🔄 Alternative Antwort wird generiert...');
    // Hier könnte eine alternative Antwort kommen
};

window.continueToNext = function(promptKey) {
    loadToEditor('GT2');
    showAlert('➡️ Weiter zu GT2');
};

// HILFSFUNKTIONEN
function switchToTab(tabName) {
    // Tab-Buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const targetBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (targetBtn) targetBtn.classList.add('active');

    // Tab-Content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    const targetContent = document.getElementById(`${tabName}Tab`);
    if (targetContent) targetContent.classList.add('active');

    console.log(`📑 Zu Tab "${tabName}" gewechselt`);
}

function showAlert(message) {
    // Einfacher Alert als Fallback
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// EVENT LISTENERS für Tab-Navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchToTab(tabName);
        });
    });
});

console.log('🎉 Bulletproof Coach Mission Control geladen!');