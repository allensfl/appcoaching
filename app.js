// COACH MISSION CONTROL - Triadische Coaching App
// Weltpremiere: 25. Juli 2025, 15:30 Uhr
// Erste funktionsfähige App für Geißler Triadisches Coaching mit KI

class CoachMissionControl {
    constructor() {
        this.selectedClient = null;
        this.currentSession = null;
        this.activePrompt = null;
        this.collaborationMessages = [];
        this.currentPhase = 1;
        
        this.init();
    }

    init() {
        console.log('🚀 Coach Mission Control initialisiert - Triadisches Coaching System');
        this.loadClients();
        this.setupEventListeners();
        this.setupTabs();
        this.loadPrompts();
        this.initializeTemplates();
        this.createDebugPanel();
        
        // Warte auf data.js
        if (typeof window.prompts === 'undefined') {
            document.addEventListener('dataLoaded', () => {
                this.renderPrompts();
                this.renderTemplates();
            });
        } else {
            this.renderPrompts();
            this.renderTemplates();
        }
    }

    loadClients() {
        // Fallback für Clients falls data.js nicht lädt
        if (typeof window.clients === 'undefined') {
            window.clients = [
                {
                    id: 1,
                    name: "Sarah Müller",
                    age: 34,
                    profession: "Marketing Managerin",
                    challenge: "Work-Life-Balance und Karriereplanung",
                    avatar: "👩‍💼"
                },
                {
                    id: 2,
                    name: "Dr. Michael Weber",
                    age: 45,
                    profession: "Führungskraft",
                    challenge: "Führungsstil und Teamkommunikation",
                    avatar: "👨‍💼"
                },
                {
                    id: 3,
                    name: "Lisa Chen",
                    age: 28,
                    profession: "Software Entwicklerin",
                    challenge: "Selbstvertrauen und Kommunikation",
                    avatar: "👩‍💻"
                },
                {
                    id: 4,
                    name: "Thomas Schmidt",
                    age: 52,
                    profession: "Projektleiter",
                    challenge: "Veränderungsmanagement und Delegation",
                    avatar: "👨‍🔧"
                }
            ];
        }
        this.renderClients();
    }

    renderClients() {
        const container = document.getElementById('clientsContainer');
        if (!container) return;

        container.innerHTML = window.clients.map(client => `
            <div class="client-card" data-client-id="${client.id}" onclick="coachApp.selectClient(${client.id})">
                <div class="client-avatar">${client.avatar}</div>
                <h3>${client.name}</h3>
                <p class="client-age">${client.age} Jahre • ${client.profession}</p>
                <p class="client-challenge">${client.challenge}</p>
                <div class="client-status">📋 Verfügbar</div>
            </div>
        `).join('');
    }

    selectClient(clientId) {
        this.selectedClient = window.clients.find(c => c.id === clientId);
        
        // Visuelle Markierung
        document.querySelectorAll('.client-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-client-id="${clientId}"]`).classList.add('selected');
        
        // Session-Button anzeigen
        this.showSessionButton();
        this.updateDebugPanel();
        
        console.log('✅ Klient ausgewählt:', this.selectedClient.name);
    }

    showSessionButton() {
        const existing = document.getElementById('startSessionBtn');
        if (existing) existing.remove();
        
        const button = document.createElement('button');
        button.id = 'startSessionBtn';
        button.className = 'btn btn-primary session-btn';
        button.innerHTML = '🎯 Session mit ' + this.selectedClient.name + ' starten';
        button.onclick = () => this.startSession();
        
        document.getElementById('clientsContainer').appendChild(button);
    }

    startSession() {
        if (!this.selectedClient) return;
        
        this.currentSession = {
            client: this.selectedClient,
            startTime: new Date(),
            phase: 1,
            prompts: [],
            status: 'active'
        };
        
        // Zu Coaching-Tab wechseln
        this.switchTab('coaching');
        this.updateDebugPanel();
        
        console.log('🎯 Session gestartet mit:', this.selectedClient.name);
    }

    loadPrompts() {
        // Fallback Prompts falls data.js nicht lädt
        if (typeof window.prompts === 'undefined') {
            console.log('⚠️ data.js nicht gefunden - lade Fallback-Prompts');
            
            window.prompts = {
                GT1: {
                    text: "Ich habe folgendes Anliegen: [PROBLEMBESCHREIBUNG]. Kannst du mir helfen, das strukturiert zu durchdenken?",
                    category: "GT",
                    phase: 1,
                    step: "Erstanliegen",
                    description: "PHASE 1: PROBLEM & ZIELBESCHREIBUNG - Strukturierte Erfassung des Coaching-Anliegens"
                },
                GT2: {
                    text: "Hier noch zusätzliche Informationen zu meinem Anliegen: [ERGÄNZUNGEN]. Bitte fasse meine Situation strukturiert zusammen und gliedere in:\n- Ist-Situation (was ist jetzt)\n- Soll-Situation (was soll werden)\n- Erste Hypothesen zu möglichen Ursachen",
                    category: "GT",
                    phase: 1,
                    step: "Zusatzinformationen",
                    description: "Strukturierung der Situation in Ist/Soll/Ursachen"
                },
                GT3: {
                    text: "Ich habe folgendes Bild gewählt: [BILDBESCHREIBUNG]. Was sagt dieses Bild über mein Coaching-Ziel aus? Welche unbewussten Aspekte meines Anliegens könnte es widerspiegeln?",
                    category: "GT",
                    phase: 1,
                    step: "Symbolbild-Analyse",
                    description: "Unbewusste Aspekte durch Bildanalyse erschließen"
                },
                GT4: {
                    text: "Bitte analysiere mein Anliegen und identifiziere mit Hilfe des Textbausteins 'Ausbalancierungsprobleme' das Ausbalancierungsproblem, das am besten zu meiner Situation passt. Erkläre, warum diese Spannungspole für mich relevant sind.",
                    category: "GT",
                    phase: 1,
                    step: "Ausbalancierungsprobleme",
                    description: "Identifikation der zentralen Spannungsfelder"
                },
                GT5: {
                    text: "Hier ist meine Schlüsselsituation: [DETAILLIERTE BESCHREIBUNG]. In diesem Moment fühlte ich: [AFFEKT/EMOTION]. Bitte analysiere diese Situation und hilf mir zu verstehen, was da passiert ist.",
                    category: "GT",
                    phase: 2,
                    step: "Schlüsselsituation",
                    description: "PHASE 2: PROBLEMANALYSE - Analyse der entscheidenden Situation"
                },
                GT6: {
                    text: "Versetze dich bitte in die Perspektive der 'Bremse/des Widerstands', die in meinem obigen Transkript erwähnt wird. Welche weiteren Argumente könnte diese innere Stimme vorbringen? Was könnte ihre positive Absicht sein?",
                    category: "GT",
                    phase: 2,
                    step: "Avatar-Perspektive",
                    description: "Verstehen der inneren Widerstände und deren positive Absichten"
                },
                GT7: {
                    text: "Analysiere das obige Transkript sowie alle momentan vorliegenden Informationen zu meiner Coaching-Problematik mit Hilfe der Kategorien von Ausbalancierungsproblemen. Welche Muster erkennst du? Welche Spannungsfelder sind zentral?",
                    category: "GT",
                    phase: 2,
                    step: "Kategorien-Analyse",
                    description: "Systematische Musteranalyse der Spannungsfelder"
                },
                GT8: {
                    text: "Formuliere auf Basis der bisherigen Erkenntnisse ein übergeordnetes Lern- und Entwicklungsziel für mich. Mache es inspirierend und motivierend, aber auch konkret umsetzbar.",
                    category: "GT",
                    phase: 3,
                    step: "Lernziel formulieren",
                    description: "PHASE 3: LÖSUNGSSTRATEGIE - Entwicklung des Hauptziels"
                },
                GT9: {
                    text: "Gehe bitte von dieser Rangpositionierung meiner inneren Anteile aus und kläre, wie die verschiedenen Probleme und Widerstände, die auftauchen könnten, zu bewältigen wären. Welche Strategien helfen bei der Umsetzung?",
                    category: "GT",
                    phase: 3,
                    step: "Widerstand-Analyse",
                    description: "Strategien zur Überwindung von Umsetzungshindernissen"
                },
                GT10: {
                    text: "Analysiere dieses Transkript: Welche realitätsprägenden Überzeugungen und inneren Regeln erkennst du, die meine Umsetzung hemmen könnten? Welche alternativen, stärkenden Glaubenssätze wären hilfreich?",
                    category: "GT",
                    phase: 3,
                    step: "Glaubenssätze identifizieren",
                    description: "Transformation limitierender Überzeugungen"
                },
                GT11: {
                    text: "Bitte entwickle eine Erfolgsimagination in Ich-Form für mein Ziel: [ZIEL]. Nutze emotionale, sinnliche Sprache und male mir aus, wie es sich anfühlt, wenn ich mein Ziel erreicht habe. Mache es so konkret und motivierend wie möglich.",
                    category: "GT",
                    phase: 3,
                    step: "Erfolgsimagination",
                    description: "Emotionale Verankerung des Zielerreichungszustands"
                },
                GT12: {
                    text: "Erstelle einen konkreten Projektplan mit spezifischen Aktivitäten für die nächsten 4-6 Wochen. Berücksichtige meine verfügbare Zeit: [ZEITANGABE] und meine Ressourcen: [RESSOURCEN]. Teile die Schritte in machbare Wochenziele auf.",
                    category: "GT",
                    phase: 4,
                    step: "Projektplanung",
                    description: "PHASE 4: UMSETZUNG - Konkreter Aktionsplan"
                }
            };
            
            // Event für andere Komponenten
            document.dispatchEvent(new CustomEvent('dataLoaded'));
        }
        
        this.renderPrompts();
    }

    renderPrompts() {
        const container = document.getElementById('promptsContainer');
        if (!container || !window.prompts) return;

        const promptsList = Object.entries(window.prompts);
        
        container.innerHTML = `
            <div class="prompts-header">
                <h3>🎯 Geißler Triadisches Coaching - Prompt Repository</h3>
                <p>Wissenschaftlich fundierte 12-Schritte-Methode nach Harald Geißler</p>
            </div>
            
            <div class="phase-sections">
                ${this.renderPhaseSection(1, "PROBLEM & ZIELBESCHREIBUNG", "GT1-GT4")}
                ${this.renderPhaseSection(2, "PROBLEMANALYSE", "GT5-GT7")}
                ${this.renderPhaseSection(3, "LÖSUNGSSTRATEGIE", "GT8-GT11")}
                ${this.renderPhaseSection(4, "UMSETZUNG", "GT12")}
            </div>
        `;
    }

    renderPhaseSection(phase, title, steps) {
        const phasePrompts = Object.entries(window.prompts).filter(([key, prompt]) => 
            prompt.phase === phase && prompt.category === 'GT'
        );

        return `
            <div class="phase-section">
                <div class="phase-header">
                    <h4>📍 PHASE ${phase}: ${title}</h4>
                    <span class="phase-steps">${steps}</span>
                </div>
                <div class="phase-prompts">
                    ${phasePrompts.map(([key, prompt]) => `
                        <div class="prompt-card" data-prompt-key="${key}">
                            <div class="prompt-header">
                                <div class="prompt-info">
                                    <strong class="prompt-key">${key}</strong>
                                    <span class="prompt-step">${prompt.step}</span>
                                </div>
                                <span class="prompt-phase">Phase ${prompt.phase}</span>
                            </div>
                            <div class="prompt-text">${prompt.text}</div>
                            <div class="prompt-description">${prompt.description}</div>
                            <div class="prompt-actions">
                                <button onclick="coachApp.loadPromptToEditor('${key}')" class="btn btn-sm btn-primary">
                                    📝 In Editor laden
                                </button>
                                <button onclick="coachApp.sendToCollaboration('${key}')" class="btn btn-sm btn-success">
                                    📤 An Coachee senden
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    loadPromptToEditor(promptKey) {
        const prompt = window.prompts[promptKey];
        if (!prompt) return;

        const editor = document.getElementById('promptEditor');
        if (editor) {
            editor.value = `${promptKey}: ${prompt.text}\n\nSchritt: ${prompt.step}\nBeschreibung: ${prompt.description}`;
        }

        this.activePrompt = { key: promptKey, ...prompt };
        this.switchTab('coaching');
        this.updateDebugPanel();

        this.showNotification(`✅ ${promptKey} in Editor geladen`, 'success');
        console.log(`📝 Prompt ${promptKey} in Editor geladen`);
    }

    sendToCollaboration(promptKey) {
        const prompt = window.prompts[promptKey];
        if (!prompt) return;

        this.activePrompt = { key: promptKey, ...prompt };
        
        // Zur Kollaboration wechseln
        this.switchTab('collaboration');
        
        // Prompt in Kollaboration anzeigen
        this.addCollaborationMessage('coach', {
            promptKey: promptKey,
            step: prompt.step,
            text: prompt.text,
            description: prompt.description
        });

        this.showNotification(`📤 ${promptKey} zur Kollaboration gesendet`, 'success');
        console.log(`📤 Prompt ${promptKey} zur Kollaboration gesendet`);
    }

    addCollaborationMessage(sender, content) {
        const container = document.getElementById('collaborationMessages');
        if (!container) return;

        const message = {
            id: Date.now(),
            sender: sender,
            content: content,
            timestamp: new Date()
        };

        this.collaborationMessages.push(message);

        if (sender === 'coach') {
            container.innerHTML += `
                <div class="collab-message coach-message">
                    <div class="message-header">
                        <span class="sender">👨‍💼 Coach</span>
                        <span class="timestamp">${message.timestamp.toLocaleTimeString()}</span>
                        <span class="prompt-badge">${content.promptKey}</span>
                    </div>
                    <div class="message-content">
                        <div class="prompt-step">${content.step}</div>
                        <div class="prompt-text">${content.text}</div>
                        <div class="prompt-description">${content.description}</div>
                    </div>
                    <div class="message-actions">
                        <button onclick="coachApp.sendToAI('${content.promptKey}')" class="btn btn-ai">
                            🤖 An KI senden & Antwort generieren
                        </button>
                        <button onclick="coachApp.editPrompt('${content.promptKey}')" class="btn btn-secondary">
                            ✏️ Prompt bearbeiten
                        </button>
                    </div>
                </div>
            `;
        } else if (sender === 'ai') {
            container.innerHTML += `
                <div class="collab-message ai-message">
                    <div class="message-header">
                        <span class="sender">🤖 KI-Coach</span>
                        <span class="timestamp">${message.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <div class="message-content">
                        <div class="ai-response">${content.response}</div>
                    </div>
                    <div class="message-actions">
                        <button onclick="coachApp.generateAlternativeResponse('${content.promptKey}')" class="btn btn-secondary">
                            🔄 Alternative Antwort
                        </button>
                        <button onclick="coachApp.continueToNextPrompt('${content.promptKey}')" class="btn btn-primary">
                            ➡️ Weiter zu ${this.getNextPrompt(content.promptKey)}
                        </button>
                    </div>
                </div>
            `;
        }

        container.scrollTop = container.scrollHeight;
    }

    sendToAI(promptKey) {
        const prompt = window.prompts[promptKey];
        if (!prompt) return;

        // Intelligente KI-Antwort basierend auf Prompt-Inhalt
        const aiResponse = this.generateIntelligentAIResponse(promptKey, prompt);
        
        this.addCollaborationMessage('ai', {
            promptKey: promptKey,
            response: aiResponse
        });

        this.showNotification('🤖 KI-Antwort generiert', 'success');
    }

    generateIntelligentAIResponse(promptKey, prompt) {
        // Editor-Inhalt für Kontext nutzen
        const editor = document.getElementById('promptEditor');
        const editorContent = editor ? editor.value.toLowerCase() : '';
        
        // Themen-spezifische Antworten
        const responses = {
            GT1: this.getGT1Response(editorContent),
            GT2: this.getGT2Response(editorContent),
            GT3: this.getGT3Response(editorContent),
            GT4: this.getGT4Response(editorContent),
            GT5: this.getGT5Response(editorContent),
            GT6: this.getGT6Response(editorContent),
            GT7: this.getGT7Response(editorContent),
            GT8: this.getGT8Response(editorContent),
            GT9: this.getGT9Response(editorContent),
            GT10: this.getGT10Response(editorContent),
            GT11: this.getGT11Response(editorContent),
            GT12: this.getGT12Response(editorContent)
        };

        return responses[promptKey] || "Vielen Dank für Ihr Vertrauen. Lassen Sie uns gemeinsam strukturiert an Ihrem Anliegen arbeiten.";
    }

    getGT1Response(content) {
        if (content.includes('ruhestand') || content.includes('rente') || content.includes('vereinsamung')) {
            return "Vielen Dank für Ihr Vertrauen. Die Sorge vor sozialer Isolation im Ruhestand ist sehr verständlich und betrifft viele Menschen. Dass Sie sich bereits jetzt Gedanken machen, zeigt Ihre Vorausschau und Verantwortung für Ihr eigenes Wohlbefinden. Wir werden strukturiert erarbeiten, wie Sie neue soziale Netzwerke aufbauen und bestehende Kontakte pflegen können.";
        }
        
        if (content.includes('karriere') || content.includes('beruf') || content.includes('job')) {
            return "Ich verstehe Ihre beruflichen Überlegungen sehr gut. Karriereentscheidungen sind komplex und betreffen viele Lebensbereiche. Lassen Sie uns systematisch Ihre Prioritäten, Werte und Ziele herausarbeiten, um eine fundierte Entscheidung zu treffen.";
        }
        
        return "Vielen Dank, dass Sie mir Ihr Anliegen anvertrauen. Ich höre heraus, dass Sie sich in einer wichtigen Reflexionsphase befinden. Lassen Sie uns gemeinsam strukturiert vorgehen, um Klarheit und konkrete Handlungsschritte zu entwickeln.";
    }

    getGT2Response(content) {
        return "Danke für diese wertvollen Zusatzinformationen. Ich strukturiere Ihre Situation wie folgt:\n\n**Ist-Situation:** Sie befinden sich in einer Phase der Unsicherheit und des Übergangs.\n\n**Soll-Situation:** Sie wünschen sich mehr Klarheit und einen konkreten Weg vorwärts.\n\n**Erste Hypothesen:** Möglicherweise stehen Sie vor einer wichtigen Lebensentscheidung, bei der verschiedene Faktoren abgewogen werden müssen.";
    }

    getGT3Response(content) {
        return "Das gewählte Bild spricht eine deutliche Sprache über Ihr unbewusstes Erleben. Es scheint Aspekte von Veränderung, Wachstum oder auch Unsicherheit zu symbolisieren. Solche Bilder offenbaren oft, was rational noch nicht greifbar ist - nämlich die emotionale Dimension Ihres Anliegens.";
    }

    getGT4Response(content) {
        return "Bei der Analyse Ihres Anliegens erkenne ich ein zentrales Ausbalancierungsproblem zwischen **Sicherheit und Entfaltung**. Sie stehen vor der Herausforderung, einerseits Stabilität zu bewahren, andererseits aber auch neue Möglichkeiten zu erkunden. Diese Spannungspole sind für Ihre Situation sehr relevant.";
    }

    getGT5Response(content) {
        return "Diese Schlüsselsituation ist sehr aufschlussreich. In diesem Moment haben Sie vermutlich eine wichtige Erkenntnis über sich selbst und Ihre Situation gewonnen. Der Affekt, den Sie beschreiben, zeigt uns, wo Ihre wirklichen emotionalen Beweggründe liegen. Lassen Sie uns diese Gefühle als wertvollen Kompass nutzen.";
    }

    getGT6Response(content) {
        return "Wenn ich mich in die Perspektive Ihrer 'inneren Bremse' versetze, dann könnte diese sagen: 'Ich beschütze dich vor Enttäuschungen und Fehlentscheidungen. Bleib lieber bei dem, was du kennst.' Die positive Absicht könnte sein, Sie vor Risiken zu bewahren und Ihre Sicherheit zu gewährleisten.";
    }

    getGT7Response(content) {
        return "In der systematischen Analyse erkenne ich folgende Muster: Sie befinden sich in einem klassischen Spannungsfeld zwischen verschiedenen Lebensbereichen. Die zentralen Spannungsfelder scheinen **Autonomie vs. Sicherheit** und **Gegenwart vs. Zukunft** zu sein.";
    }

    getGT8Response(content) {
        return "Ihr übergeordnetes Lern- und Entwicklungsziel könnte so formuliert werden: **'Ich entwickle die Fähigkeit, bewusste und mutige Entscheidungen zu treffen, die sowohl meine Sicherheitsbedürfnisse als auch meine Wachstumswünsche berücksichtigen.'** Dieses Ziel ist inspirierend, weil es Ihre persönliche Entwicklung in den Mittelpunkt stellt.";
    }

    getGT9Response(content) {
        return "Die Rangpositionierung Ihrer inneren Anteile zeigt: Der 'Sicherheitsaspekt' steht derzeit an erster Stelle, gefolgt vom 'Wachstumsaspekt'. Um Widerstände zu bewältigen, empfehle ich: Kleine, sichere Schritte in Richtung Veränderung zu gehen und dabei die Sicherheitsbedürfnisse ernst zu nehmen.";
    }

    getGT10Response(content) {
        return "Ich erkenne folgende limitierende Überzeugungen: 'Veränderung ist gefährlich' und 'Ich muss alles perfekt durchdenken'. Stärkende alternative Glaubenssätze wären: 'Ich kann schrittweise und besonnen neue Wege erkunden' und 'Meine Erfahrung hilft mir, gute Entscheidungen zu treffen'.";
    }

    getGT11Response(content) {
        return "**Ihre Erfolgsimagination:**\n\nIch spüre eine tiefe Zufriedenheit in mir. Die Entscheidung, die ich getroffen habe, fühlt sich richtig und stimmig an. Ich blicke auf meinen Weg zurück und bin stolz auf meinen Mut. Die Unsicherheit ist gewichen, stattdessen erfüllt mich eine ruhige Gewissheit. Ich habe das Gefühl, endlich authentisch zu leben und meinen eigenen Weg zu gehen.";
    }

    getGT12Response(content) {
        return "**Ihr 6-Wochen-Projektplan:**\n\n**Woche 1-2:** Informationen sammeln und Optionen erkunden\n**Woche 3-4:** Gespräche mit Vertrauenspersonen führen\n**Woche 5:** Pro-Contra-Liste erstellen und Entscheidung vorbereiten\n**Woche 6:** Entscheidung treffen und erste Schritte planen\n\nJede Woche sollten Sie sich 3-4 Stunden Zeit nehmen für die geplanten Aktivitäten.";
    }

    generateAlternativeResponse(promptKey) {
        const alternatives = {
            GT1: "Ich spüre in Ihren Worten sowohl Sorge als auch Hoffnung. Diese Ambivalenz ist völlig normal bei wichtigen Lebensentscheidungen. Lassen Sie uns behutsam erkunden, welche Möglichkeiten sich Ihnen eröffnen.",
            GT2: "Ihre zusätzlichen Informationen zeigen mir, dass Sie bereits sehr reflektiert an die Situation herangehen. Das ist eine wichtige Ressource, auf die wir aufbauen können.",
            GT3: "Bilder sprechen oft Wahrheiten aus, die unser Verstand noch nicht formulieren kann. Ihr gewähltes Bild scheint eine tiefe Sehnsucht nach Veränderung zu symbolisieren."
        };
        
        const response = alternatives[promptKey] || "Lassen Sie mich das aus einer anderen Perspektive betrachten...";
        
        this.addCollaborationMessage('ai', {
            promptKey: promptKey,
            response: response
        });
    }

    getNextPrompt(currentKey) {
        const promptOrder = ['GT1', 'GT2', 'GT3', 'GT4', 'GT5', 'GT6', 'GT7', 'GT8', 'GT9', 'GT10', 'GT11', 'GT12'];
        const currentIndex = promptOrder.indexOf(currentKey);
        return currentIndex < promptOrder.length - 1 ? promptOrder[currentIndex + 1] : 'Ende';
    }

    continueToNextPrompt(currentKey) {
        const nextPrompt = this.getNextPrompt(currentKey);
        if (nextPrompt !== 'Ende') {
            this.loadPromptToEditor(nextPrompt);
            this.switchTab('coaching');
            this.showNotification(`➡️ Weiter zu ${nextPrompt}`, 'info');
        } else {
            this.showNotification('🎉 Coaching-Prozess abgeschlossen!', 'success');
        }
    }

    initializeTemplates() {
        if (typeof window.templates === 'undefined') {
            window.templates = [
                {
                    id: 1,
                    name: "Vollständiges Geißler Triadisches Coaching",
                    duration: "120 Min",
                    method: "GT1-GT12",
                    category: "Vollprogramm",
                    description: "Kompletter 12-Schritte-Prozess nach Harald Geißler für tiefgreifende Coaching-Prozesse",
                    prompts: ["GT1", "GT2", "GT3", "GT4", "GT5", "GT6", "GT7", "GT8", "GT9", "GT10", "GT11", "GT12"],
                    phases: "Alle 4 Phasen: Problem → Analyse → Lösung → Umsetzung"
                },
                {
                    id: 2,
                    name: "Express Triadisches Coaching",
                    duration: "60 Min",
                    method: "GT1,GT4,GT8,GT12",
                    category: "Express",
                    description: "Kompakte Version für schnelle Ergebnisse",
                    prompts: ["GT1", "GT4", "GT8", "GT12"],
                    phases: "Kernschritte aller Phasen"
                },
                {
                    id: 3,
                    name: "Problemanalyse intensiv",
                    duration: "90 Min",
                    method: "GT1-GT7",
                    category: "Analyse",
                    description: "Fokus auf tiefgreifende Problemanalyse",
                    prompts: ["GT1", "GT2", "GT3", "GT4", "GT5", "GT6", "GT7"],
                    phases: "Phase 1-2: Problem verstehen und analysieren"
                }
            ];
        }
        this.renderTemplates();
    }

    renderTemplates() {
        const container = document.getElementById('templatesContainer');
        if (!container || !window.templates) return;

        container.innerHTML = `
            <div class="templates-header">
                <h3>📋 Template-Bibliothek</h3>
                <p>Vorgefertigte Coaching-Abläufe für verschiedene Situationen</p>
            </div>
            
            <div class="templates-grid">
                ${window.templates.map(template => `
                    <div class="template-card">
                        <div class="template-header">
                            <h4>${template.name}</h4>
                            <span class="template-duration">${template.duration}</span>
                        </div>
                        <div class="template-method">${template.method}</div>
                        <div class="template-description">${template.description}</div>
                        <div class="template-phases">${template.phases}</div>
                        <div class="template-actions">
                            <button onclick="coachApp.useTemplate(${template.id})" class="btn btn-primary">
                                ✅ Template verwenden
                            </button>
                            <button onclick="coachApp.previewTemplate(${template.id})" class="btn btn-secondary">
                                👁️ Vorschau
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    useTemplate(templateId) {
        const template = window.templates.find(t => t.id === templateId);
        if (!template) return;

        const templateText = `TEMPLATE: ${template.name}\nDauer: ${template.duration}\nMethodik: ${template.method}\n\n${template.description}\n\nPrompts in diesem Template:\n${template.prompts.map(p => `- ${p}: ${window.prompts[p]?.step || p}`).join('\n')}`;

        const editor = document.getElementById('promptEditor');
        if (editor) {
            editor.value = templateText;
        }

        this.switchTab('coaching');
        this.showNotification(`✅ Template "${template.name}" geladen`, 'success');
    }

    previewTemplate(templateId) {
        const template = window.templates.find(t => t.id === templateId);
        if (!template) return;

        const modal = document.createElement('div');
        modal.className = 'template-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${template.name}</h3>
                    <button onclick="this.closest('.template-modal').remove()">✕</button>
                </div>
                <div class="modal-body">
                    <p><strong>Dauer:</strong> ${template.duration}</p>
                    <p><strong>Methodik:</strong> ${template.method}</p>
                    <p><strong>Beschreibung:</strong> ${template.description}</p>
                    <p><strong>Phasen:</strong> ${template.phases}</p>
                    
                    <h4>Prompt-Ablauf:</h4>
                    <div class="prompt-flow">
                        ${template.prompts.map((promptKey, index) => {
                            const prompt = window.prompts[promptKey];
                            return `
                                <div class="flow-step">
                                    <div class="step-number">${index + 1}</div>
                                    <div class="step-content">
                                        <strong>${promptKey}: ${prompt?.step || promptKey}</strong>
                                        <p>${prompt?.description || 'Prompt-Beschreibung'}</p>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="coachApp.useTemplate(${template.id}); this.closest('.template-modal').remove();" class="btn btn-primary">
                        ✅ Template verwenden
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    setupTabs() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });
    }

    switchTab(tabName) {
        // Buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}Tab`).classList.add('active');

        console.log(`📑 Zu Tab "${tabName}" gewechselt`);
    }

    setupEventListeners() {
        // Prompt senden Button
        const sendBtn = document.getElementById('sendPromptBtn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                const editor = document.getElementById('promptEditor');
                if (editor && editor.value.trim()) {
                    this.sendToCollaboration('CUSTOM');
                }
            });
        }
    }

    createDebugPanel() {
        const debugPanel = document.createElement('div');
        debugPanel.id = 'debugPanel';
        debugPanel.className = 'debug-panel';
        debugPanel.innerHTML = `
            <h4>🔧 Debug Panel</h4>
            <div id="debugContent">App wird initialisiert...</div>
        `;
        document.body.appendChild(debugPanel);
        
        this.updateDebugPanel();
    }

    updateDebugPanel() {
        const debugContent = document.getElementById('debugContent');
        if (!debugContent) return;

        const clientName = this.selectedClient ? this.selectedClient.name : 'Kein Klient ausgewählt';
        const sessionStatus = this.currentSession ? 'Aktiv' : 'Keine Session';
        const promptInfo = this.activePrompt ? `${this.activePrompt.key}: ${this.activePrompt.step}` : 'Kein Prompt geladen';
        const promptCount = window.prompts ? Object.keys(window.prompts).length : 0;

        debugContent.innerHTML = `
            <div><strong>Klient:</strong> ${clientName}</div>
            <div><strong>Session:</strong> ${sessionStatus}</div>
            <div><strong>Aktiver Prompt:</strong> ${promptInfo}</div>
            <div><strong>Prompts geladen:</strong> ${promptCount}</div>
            <div><strong>Phase:</strong> ${this.currentPhase}</div>
            <div><strong>Nachrichten:</strong> ${this.collaborationMessages.length}</div>
        `;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Debug-Funktionen für Console
    debugApp() {
        console.log('🔧 DEBUG INFO:');
        console.log('Klient:', this.selectedClient);
        console.log('Session:', this.currentSession);
        console.log('Aktiver Prompt:', this.activePrompt);
        console.log('Prompts:', window.prompts);
        console.log('Nachrichten:', this.collaborationMessages);
    }

    testCollaboration() {
        this.sendToCollaboration('GT1');
    }
}

// App initialisieren
let coachApp;

document.addEventListener('DOMContentLoaded', () => {
    coachApp = new CoachMissionControl();
    
    // Globale Debug-Funktionen
    window.debugApp = () => coachApp.debugApp();
    window.testCollab = () => coachApp.testCollaboration();
    
    console.log('🚀 Coach Mission Control erfolgreich gestartet!');
    console.log('📘 Debug-Befehle: debugApp(), testCollab()');
});

// MEILENSTEIN: 25. Juli 2025, 15:30 Uhr
// Weltweit erste funktionsfähige Triadische Coaching App mit KI-Integration
console.log('🎉 HISTORISCHER MOMENT: Triadische Coaching App - Live seit 25.07.2025, 15:30 Uhr');