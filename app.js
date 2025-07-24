// COMPLETE FIXED app.js - Kollaborations-Sync Bug behoben
// Ersetze die komplette app.js mit diesem Code

// Global Variables
let selectedClient = null;
let currentStep = 1;
let currentEditingStep = 1;
let sessionStartTime = null;
let sessionNotes = [];
let sessionId = null;
let collaborationData = {
    prompt: '',
    response: '',
    loading: false,
    timestamp: null,
    step: 1,
    approved: false,
    feedback: ''
};

// Coach-KI Variables
let coachKIHistory = [];
let currentEditingTemplate = null;

// Workflow State
let workflowStep = 1; // 1 = Edit, 2 = Collaborate, 3 = KI Response

// Check if we're in collaboration mode
const urlParams = new URLSearchParams(window.location.search);
const isCollaborationMode = urlParams.has('session') || window.location.pathname.includes('/session/');

if (isCollaborationMode) {
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('collaborationMode').style.display = 'block';
    document.body.className = 'collaboration-mode';
    initCollaborationMode();
}

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    if (!isCollaborationMode) {
        updateTime();
        setInterval(updateTime, 1000);
        generateStepsNavigation();
        loadTemplates();
        generateSessionId();
        initializeAutoSave();
        initializeCoachKI();
    }
});

// Session Management
function generateSessionId() {
    sessionId = 'CMC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    updateCollaborationLink();
}

function updateCollaborationLink() {
    const baseUrl = window.location.origin + window.location.pathname;
    const collaborationUrl = `${baseUrl}?session=${sessionId}`;
    const linkElement = document.getElementById('collaborationLink');
    if (linkElement) {
        linkElement.textContent = collaborationUrl;
    }
}

function copyCollaborationLink() {
    const linkElement = document.getElementById('collaborationLink');
    if (!linkElement) return;
    
    navigator.clipboard.writeText(linkElement.textContent).then(() => {
        // Visual feedback
        const originalText = linkElement.textContent;
        const originalBg = linkElement.style.background;
        
        linkElement.textContent = '✅ Link kopiert!';
        linkElement.style.background = 'rgba(16, 185, 129, 0.3)';
        
        setTimeout(() => {
            linkElement.textContent = originalText;
            linkElement.style.background = originalBg;
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        alert('Link: ' + linkElement.textContent);
    });
}

function openCollaborationWindow() {
    const collaborationUrl = document.getElementById('collaborationLink').textContent;
    const newWindow = window.open(collaborationUrl, 'CoachingCollaboration', 'width=1000,height=800,scrollbars=yes,resizable=yes');
    
    // Store reference for communication
    window.collaborationWindow = newWindow;
    
    // Setup message listener for cross-window communication
    window.addEventListener('message', function(event) {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'collaborationUpdate') {
            // Update our local data
            collaborationData = event.data.data;
            updateCollaborationStatus();
        }
        
        if (event.data.type === 'promptApproval') {
            handlePromptApproval(event.data.approved, event.data.feedback);
        }
    });
    
    updateCollaborationStatus();
}

// FIXED: Kollaborations-Sync Bug behoben
function initCollaborationMode() {
    const sessionParam = urlParams.get('session') || window.location.pathname.split('/session/')[1];
    const sessionIdElement = document.getElementById('collaborationSessionId');
    if (sessionIdElement) {
        sessionIdElement.textContent = sessionParam || 'DEMO';
    }
    
    console.log("🔄 Kollaboration initialisiert für Session:", sessionParam);
    
    // Initialize step progress
    updateCollaborationProgress(1);
    
    // KRITISCH: Verhindere Demo-Override von echten Daten
    let hasRealData = false;
    
    // Start listening for messages from parent window
    window.addEventListener('message', function(event) {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'collaborationData') {
            console.log("📨 CollaborationData empfangen:", event.data.data);
            hasRealData = true; // Markiere dass echte Daten da sind
            updateCollaborationDisplay(event.data.data);
        }
    });
    
    // Aggressive localStorage Überwachung mit Polling
    function checkForStoredData() {
        try {
            const savedData = localStorage.getItem('collaborationData');
            if (savedData) {
                const data = JSON.parse(savedData);
                console.log("💾 Gespeicherte Daten gefunden:", data);
                
                // Nur verwenden wenn es echte Prompt-Daten sind (nicht Demo)
                if (data.prompt && !data.prompt.includes('Demo:') && !data.prompt.includes('Warten auf') && data.prompt.length > 20) {
                    hasRealData = true;
                    updateCollaborationDisplay(data);
                    console.log("✅ Echte Prompt-Daten geladen");
                }
            }
        } catch (e) {
            console.warn('❌ Fehler beim Laden der Kollaborationsdaten:', e);
        }
    }
    
    // Sofort prüfen
    checkForStoredData();
    
    // Aggressive Polling alle 200ms für 30 Sekunden
    const pollInterval = setInterval(checkForStoredData, 200);
    setTimeout(() => {
        clearInterval(pollInterval);
        console.log("⏰ Polling beendet");
    }, 30000);
    
    // Storage Event Listener (zusätzlich)
    window.addEventListener('storage', function(event) {
        if (event.key === 'collaborationData') {
            console.log("🔔 Storage Event:", event.newValue);
            checkForStoredData();
        }
    });
    
    // DEMO-OVERRIDE NUR WENN KEINE ECHTEN DATEN nach 2 Sekunden
    setTimeout(() => {
        if (!hasRealData) {
            console.log("⚠️ Keine echten Daten - zeige Demo-Prompt");
            updateCollaborationDisplay({
                prompt: 'Demo: Warten auf ersten Prompt vom Coach...',
                response: '',
                loading: false,
                step: 1
            });
        } else {
            console.log("✅ Echte Daten vorhanden - Demo-Override übersprungen");
        }
    }, 2000);
}

// FIXED: Anti-Override-Schutz für echte Prompts
function updateCollaborationDisplay(data) {
    console.log("🔄 UpdateCollaborationDisplay aufgerufen mit:", data);
    
    const promptElement = document.getElementById('collaborationPromptText');
    const responseElement = document.getElementById('collaborationResponseText');
    const actionsElement = document.getElementById('collaborationActions');
    const feedbackElement = document.getElementById('collaborationFeedback');
    
    // Update step progress
    if (data.step) {
        updateCollaborationProgress(data.step);
    }
    
    // KRITISCH: Prompt-Display mit Anti-Override-Schutz
    if (data.prompt && promptElement) {
        // Nur echte Prompts anzeigen (keine Demo-Texte)
        const isRealPrompt = data.prompt && 
                            !data.prompt.includes('Demo:') && 
                            !data.prompt.includes('Warten auf') &&
                            data.prompt.length > 20; // Echte Prompts sind länger
        
        if (isRealPrompt) {
            console.log("✅ Zeige echten Prompt:", data.prompt.substring(0, 50) + "...");
            
            promptElement.innerHTML = `
                <div style="background: #f8faff; padding: 15px; border-radius: 8px; border: 1px solid #667eea;">
                    ${data.prompt.replace(/\n/g, '<br>')}
                </div>
            `;
            
            // ANTI-VERSCHWINDEN: Element sichtbar halten
            promptElement.style.display = 'block';
            promptElement.style.visibility = 'visible';
            
            // Show approval actions if prompt is waiting for approval
            if (!data.approved && actionsElement) {
                actionsElement.style.display = 'flex';
                console.log("👆 Approval-Buttons angezeigt");
            }
            
            // Backup in localStorage mit Timestamp
            try {
                localStorage.setItem('lastRealPrompt', JSON.stringify({
                    prompt: data.prompt,
                    timestamp: Date.now(),
                    step: data.step
                }));
                console.log("💾 Backup erstellt");
            } catch(e) {
                console.warn("Backup-Speicherung fehlgeschlagen:", e);
            }
            
        } else if (data.prompt.includes('Demo:') || data.prompt.includes('Warten auf')) {
            console.log("⚠️ Demo-Prompt erkannt - prüfe Backup");
            
            // Versuche letzten echten Prompt wiederherzustellen
            try {
                const backup = localStorage.getItem('lastRealPrompt');
                if (backup) {
                    const backupData = JSON.parse(backup);
                    const age = Date.now() - backupData.timestamp;
                    
                    // Wenn Backup weniger als 10 Minuten alt
                    if (age < 600000) {
                        console.log("🔄 Wiederherstellung aus Backup");
                        promptElement.innerHTML = `
                            <div style="background: #f8faff; padding: 15px; border-radius: 8px; border: 1px solid #667eea;">
                                ${backupData.prompt.replace(/\n/g, '<br>')}
                            </div>
                        `;
                        promptElement.style.display = 'block';
                        promptElement.style.visibility = 'visible';
                        
                        if (actionsElement) {
                            actionsElement.style.display = 'flex';
                        }
                        return; // Wichtig: Demo-Update verhindern
                    }
                }
            } catch(e) {
                console.warn("Backup-Wiederherstellung fehlgeschlagen:", e);
            }
            
            // Nur als letzter Ausweg Demo-Text anzeigen
            console.log("📝 Zeige Demo-Text");
            promptElement.innerHTML = `
                <div style="background: #f8faff; padding: 15px; border-radius: 8px; border: 1px solid #667eea;">
                    ${data.prompt.replace(/\n/g, '<br>')}
                </div>
            `;
        } else {
            // Normaler Prompt-Text
            promptElement.innerHTML = `
                <div style="background: #f8faff; padding: 15px; border-radius: 8px; border: 1px solid #667eea;">
                    ${data.prompt.replace(/\n/g, '<br>')}
                </div>
            `;
            
            // Show approval actions if prompt is waiting for approval
            if (!data.approved && actionsElement) {
                actionsElement.style.display = 'flex';
            }
        }
    }
    
    // Response-Handling (unverändert aber mit Logging)
    if (data.loading && responseElement) {
        console.log("⏳ Loading-State anzeigen");
        responseElement.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>KI analysiert den Prompt...</p>
            </div>
        `;
        if (actionsElement) actionsElement.style.display = 'none';
    } else if (data.response && responseElement) {
        console.log("✅ KI-Response anzeigen");
        responseElement.innerHTML = `
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border: 1px solid #10b981;">
                ${data.response}
            </div>
        `;
        
        // Show feedback section
        if (feedbackElement) {
            feedbackElement.style.display = 'block';
        }
        if (actionsElement) actionsElement.style.display = 'none';
    }
}

function updateCollaborationProgress(step) {
    const progressFill = document.getElementById('collaborationProgress');
    const progressText = document.getElementById('collaborationProgressText');
    const currentStepElement = document.getElementById('collaborationCurrentStep');
    
    const percentage = (step / 12) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    if (currentStepElement) {
        currentStepElement.textContent = step;
    }
    
    const stepInfo = coachingSteps.find(s => s.id === step);
    if (progressText && stepInfo) {
        progressText.textContent = `Schritt ${step}: ${stepInfo.title}`;
    }
}

// Kollaborations-Funktionen für Coachee
function approvePrompt() {
    // Send approval to parent window
    if (window.parent !== window) {
        window.parent.postMessage({
            type: 'promptApproval',
            approved: true,
            feedback: ''
        }, window.location.origin);
    }
    
    // Update UI
    const actionsElement = document.getElementById('collaborationActions');
    if (actionsElement) {
        actionsElement.innerHTML = '<div style="color: #10b981; font-weight: 600;">✅ Prompt freigegeben - Wird an KI gesendet...</div>';
    }
}

function requestChanges() {
    const changes = prompt('Welche Änderungen möchten Sie am Prompt?');
    if (changes) {
        // Send feedback to parent window
        if (window.parent !== window) {
            window.parent.postMessage({
                type: 'promptApproval',
                approved: false,
                feedback: changes
            }, window.location.origin);
        }
        
        // Update UI
        const actionsElement = document.getElementById('collaborationActions');
        if (actionsElement) {
            actionsElement.innerHTML = `
                <div style="color: #f59e0b; font-weight: 600;">
                    ✏️ Änderungswunsch gesendet: "${changes}"
                </div>
            `;
        }
    }
}

function sendFeedback() {
    const feedbackText = document.getElementById('coacheeFeedback')?.value;
    if (feedbackText && feedbackText.trim()) {
        // Send feedback to parent window
        if (window.parent !== window) {
            window.parent.postMessage({
                type: 'coacheeFeedback',
                feedback: feedbackText.trim()
            }, window.location.origin);
        }
        
        // Clear and show confirmation
        document.getElementById('coacheeFeedback').value = '';
        
        const feedbackElement = document.getElementById('collaborationFeedback');
        if (feedbackElement) {
            feedbackElement.innerHTML = `
                <div style="color: #10b981; font-weight: 600; text-align: center; padding: 20px;">
                    ✅ Ihr Feedback wurde an den Coach gesendet!
                </div>
            `;
        }
    }
}

// FIXED: Robuste Broadcast-Funktion mit Retry-Mechanismus
function broadcastToCollaboration(data) {
    collaborationData = { ...collaborationData, ...data, timestamp: new Date() };
    
    console.log("📡 Broadcasting to collaboration:", collaborationData);
    
    // 1. PostMessage an Collaboration Window (höchste Priorität)
    if (window.collaborationWindow && !window.collaborationWindow.closed) {
        try {
            window.collaborationWindow.postMessage({
                type: 'collaborationData',
                data: collaborationData
            }, window.location.origin);
            console.log("✅ PostMessage gesendet");
        } catch(e) {
            console.warn("❌ PostMessage fehlgeschlagen:", e);
        }
    }
    
    // 2. LocalStorage mit Retry-Mechanismus
    let retryCount = 0;
    const maxRetries = 3;
    
    function saveToStorage() {
        try {
            localStorage.setItem('collaborationData', JSON.stringify(collaborationData));
            console.log("✅ LocalStorage gespeichert (Versuch " + (retryCount + 1) + ")");
        } catch (e) {
            console.warn("❌ LocalStorage Speicherung fehlgeschlagen:", e);
            if (retryCount < maxRetries) {
                retryCount++;
                setTimeout(saveToStorage, 100 * retryCount); // Exponential backoff
            }
        }
    }
    
    saveToStorage();
    
    // 3. Zusätzlicher Broadcast über Custom Event
    try {
        window.dispatchEvent(new CustomEvent('collaborationUpdate', {
            detail: collaborationData
        }));
        console.log("✅ Custom Event dispatched");
    } catch(e) {
        console.warn("❌ Custom Event fehlgeschlagen:", e);
    }
    
    // 4. Backup-Storage für kritische Prompts
    if (data.prompt && data.prompt.length > 20) {
        try {
            localStorage.setItem('collaborationBackup', JSON.stringify({
                data: collaborationData,
                timestamp: Date.now(),
                sessionId: sessionId
            }));
            console.log("✅ Backup erstellt");
        } catch(e) {
            console.warn("❌ Backup fehlgeschlagen:", e);
        }
    }
}

function updateCollaborationStatus() {
    const statusElement = document.getElementById('collaborationStatusText');
    const feedbackDisplay = document.getElementById('coacheeFeedbackDisplay');
    const feedbackText = document.getElementById('feedbackText');
    
    if (!statusElement) return;
    
    if (window.collaborationWindow && !window.collaborationWindow.closed) {
        statusElement.innerHTML = '🟢 Live verbunden mit Coachee';
        
        if (collaborationData.feedback && feedbackDisplay && feedbackText) {
            feedbackDisplay.style.display = 'block';
            feedbackText.textContent = collaborationData.feedback;
        }
    } else {
        statusElement.innerHTML = '🟡 Bereit für Kollaboration';
        if (feedbackDisplay) {
            feedbackDisplay.style.display = 'none';
        }
    }
}

// Client Selection
function selectClient(clientId) {
    if (!clients[clientId]) return;
    
    // Remove previous selection
    document.querySelectorAll('.client-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selection to clicked card
    const selectedCard = document.querySelector(`[onclick="selectClient('${clientId}')"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    selectedClient = clientId;
    
    // Activate start button
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.classList.add('active');
        startButton.textContent = `🚀 Demo mit ${clients[clientId].name} starten`;
    }
}

function startSession() {
    if (!selectedClient) return;

    sessionStartTime = new Date();
    
    // Hide client selection, show dashboard
    document.getElementById('clientSelection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    
    // Update session title
    const titleElement = document.getElementById('sessionTitle');
    if (titleElement) {
        titleElement.textContent = `Coach Mission Control - Demo mit ${clients[selectedClient].name}`;
    }

    // Initialize chat
    addChatMessage('coach', `Hallo ${clients[selectedClient].name}, willkommen zu unserem Coaching! Lassen Sie uns mit der Zieldefinition beginnen.`);
    
    setTimeout(() => {
        addChatMessage('client', getClientResponse(1));
    }, 2000);

    // Set current step and add welcome note
    setCurrentStep(1);
    addSystemNote('Demo-Session gestartet mit ' + clients[selectedClient].name, 'custom');
    
    // Broadcast session start to collaboration window
    broadcastToCollaboration({
        prompt: `Demo-Session gestartet mit ${clients[selectedClient].name}\n\nErster Schritt: Ziel & Problem definieren\n\nWarten auf Coach-Prompt...`,
        response: '',
        loading: false,
        step: 1
    });
}

// Steps Navigation
function generateStepsNavigation() {
    const stepsGrid = document.getElementById('stepsGrid');
    if (!stepsGrid) return;
    
    stepsGrid.innerHTML = '';

    coachingSteps.forEach(step => {
        const stepButton = document.createElement('div');
        stepButton.className = 'step-button';
        stepButton.dataset.step = step.id;
        stepButton.innerHTML = `<strong>${step.id}</strong><br>${step.title}`;
        stepButton.addEventListener('click', () => setCurrentStep(step.id));
        stepsGrid.appendChild(stepButton);
    });
}

function setCurrentStep(stepId) {
    if (stepId < 1 || stepId > 12) return;
    
    currentStep = stepId;
    
    // Update step buttons
    document.querySelectorAll('.step-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-step="${stepId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Update current step info
    const step = coachingSteps.find(s => s.id === stepId);
    if (step) {
        updateCurrentStepInfo(step);
        updateCoachTools(step);
    }
    
    // Update collaboration data
    collaborationData.step = stepId;
    broadcastToCollaboration({ step: stepId });
}

function updateCurrentStepInfo(step) {
    const stepInfo = document.getElementById('currentStepInfo');
    if (!stepInfo) return;
    
    stepInfo.innerHTML = `
        <div class="step-title">Schritt ${step.id}: ${step.title}</div>
        <div class="step-description">${step.description}</div>
        <div class="action-buttons">
            <button class="btn btn-primary" onclick="editPrompt(${step.id})">✏️ KI-Prompt gemeinsam bearbeiten</button>
            <button class="btn btn-secondary" onclick="nextStep()">⏭️ Nächster Schritt</button>
        </div>
    `;
}

function updateCoachTools(step) {
    const coachTools = document.getElementById('coachTools');
    if (!coachTools) return;
    
    coachTools.innerHTML = `
        <div class="tool-section">
            <h4>🎯 Aktueller Fokus: ${step.title}</h4>
            <p style="font-size: 0.8em; color: #666;">${step.description}</p>
        </div>
        <div class="tool-section">
            <h4>💡 Coach-Techniken</h4>
            <button class="btn btn-secondary" onclick="addCoachNote('Nachfrage')" style="width:100%; margin-bottom:5px; font-size:0.8em;">❓ Nachfragen</button>
            <button class="btn btn-secondary" onclick="addCoachNote('Spiegelung')" style="width:100%; margin-bottom:5px; font-size:0.8em;">🪞 Spiegeln</button>
            <button class="btn btn-secondary" onclick="addCoachNote('Ressourcen')" style="width:100%; margin-bottom:5px; font-size:0.8em;">💪 Ressourcen</button>
        </div>
        <div class="tool-section">
            <h4>📊 Session-Info</h4>
            <p style="font-size: 0.8em;">Client: ${selectedClient ? clients[selectedClient].name : 'Nicht gewählt'}</p>
            <p style="font-size: 0.8em;">Schritt: ${step.id}/12</p>
            <p style="font-size: 0.8em;">Notizen: ${sessionNotes.length}</p>
            <p style="font-size: 0.8em;">Session: ${sessionId || 'Nicht gestartet'}</p>
            <p style="font-size: 0.8em;">Sync: ${window.collaborationWindow && !window.collaborationWindow.closed ? '🟢 Aktiv' : '🟡 Bereit'}</p>
        </div>
    `;
}

function nextStep() {
    if (currentStep < 12) {
        setCurrentStep(currentStep + 1);
        addChatMessage('coach', `Gut, dann gehen wir zu Schritt ${currentStep} über.`);
    }
}

// Template System (ERWEITERT)
function loadTemplates() {
    const templateList = document.getElementById('templateList');
    if (!templateList) return;
    
    templateList.innerHTML = templateRepository.map(template => `
        <div class="template-item" onclick="selectTemplate('${template.title}')">
            <div class="template-title">${template.title}</div>
            <div class="template-preview">${template.preview}</div>
            <div class="template-actions">
                <button class="btn btn-primary" onclick="event.stopPropagation(); useTemplate('${template.title}')">✅ Verwenden</button>
                <button class="btn btn-secondary" onclick="event.stopPropagation(); editTemplate('${template.title}')">✏️ Bearbeiten</button>
            </div>
        </div>
    `).join('');
}

function filterTemplates() {
    const searchTerm = document.getElementById('templateSearch')?.value.toLowerCase() || '';
    const templateList = document.getElementById('templateList');
    if (!templateList) return;
    
    const filteredTemplates = templateRepository.filter(template => 
        template.keywords.some(keyword => keyword.includes(searchTerm)) ||
        template.title.toLowerCase().includes(searchTerm) ||
        template.preview.toLowerCase().includes(searchTerm)
    );
    
    templateList.innerHTML = filteredTemplates.map(template => `
        <div class="template-item" onclick="selectTemplate('${template.title}')">
            <div class="template-title">${template.title}</div>
            <div class="template-preview">${template.preview}</div>
            <div class="template-actions">
                <button class="btn btn-primary" onclick="event.stopPropagation(); useTemplate('${template.title}')">✅ Verwenden</button>
                <button class="btn btn-secondary" onclick="event.stopPropagation(); editTemplate('${template.title}')">✏️ Bearbeiten</button>
            </div>
        </div>
    `).join('');
}

function selectTemplate(title) {
    // Template-Auswahl für direktes Verwenden
    useTemplate(title);
}

function useTemplate(title) {
    const template = templateRepository.find(t => t.title === title);
    if (template) {
        // Open prompt editor with template
        currentEditingStep = currentStep;
        const promptTextElement = document.getElementById('promptText');
        if (promptTextElement) {
            promptTextElement.value = template.prompt;
        }
        
        // Clear variables
        ['var1', 'var2', 'var3'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        
        // Show modal and start workflow
        setWorkflowStep(1);
        const modal = document.getElementById('promptModal');
        if (modal) modal.style.display = 'block';
        
        updatePromptPreview();
        addSystemNote(`Template verwendet: ${template.title}`, 'intervention');
    }
}

function editTemplate(title) {
    const template = templateRepository.find(t => t.title === title);
    if (!template) return;
    
    currentEditingTemplate = template;
    
    // Populate template editor
    document.getElementById('templateTitle').value = template.title;
    document.getElementById('templatePrompt').value = template.prompt;
    document.getElementById('templateVariables').value = template.keywords.join(', ');
    
    // Show template edit modal
    const modal = document.getElementById('templateEditModal');
    if (modal) modal.style.display = 'block';
}

function useEditedTemplate() {
    const title = document.getElementById('templateTitle')?.value;
    const prompt = document.getElementById('templatePrompt')?.value;
    const variables = document.getElementById('templateVariables')?.value.split(',').map(v => v.trim());
    
    if (title && prompt) {
        // Create temporary template
        const editedTemplate = {
            title: title,
            prompt: prompt,
            keywords: variables,
            preview: prompt.substring(0, 50) + '...'
        };
        
        // Use the edited template
        currentEditingStep = currentStep;
        const promptTextElement = document.getElementById('promptText');
        if (promptTextElement) {
            promptTextElement.value = editedTemplate.prompt;
        }
        
        closeTemplateEditModal();
        
        // Open prompt modal
        setWorkflowStep(1);
        const modal = document.getElementById('promptModal');
        if (modal) modal.style.display = 'block';
        
        updatePromptPreview();
        addSystemNote(`Bearbeitetes Template verwendet: ${title}`, 'intervention');
    }
}

// Notes System
function addQuickNote(type) {
    const prompts = {
        observation: 'Was beobachten Sie beim Klienten?',
        intervention: 'Welche Intervention setzen Sie ein?', 
        resource: 'Welche Ressource wird sichtbar?',
        hypothesis: 'Welche Hypothese entwickeln Sie?'
    };
    
    const userInput = prompt(prompts[type]);
    if (userInput && userInput.trim()) {
        addSystemNote(userInput.trim(), type);
    }
}

function addSystemNote(text, type) {
    const note = {
        id: Date.now() + Math.random(),
        timestamp: new Date(),
        type: type,
        text: text,
        step: currentStep
    };
    
    sessionNotes.push(note);
    renderNotes();
}

function renderNotes() {
    const notesList = document.getElementById('notesList');
    if (!notesList) return;
    
    if (sessionNotes.length === 0) {
        notesList.innerHTML = '<div style="text-align: center; color: #666; font-style: italic; font-size: 0.8em;">Noch keine Notizen...</div>';
        return;
    }
    
    const notesHTML = sessionNotes
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, appConfig.ui.maxNotesDisplay)
        .map(note => {
            const timeStr = note.timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
            const typeIcon = {
                observation: '👁️',
                intervention: '⚡',
                resource: '💪',
                hypothesis: '🧠',
                custom: '📝'
            };
            
            return `
                <div class="note-item note-${note.type}">
                    <div class="note-timestamp">
                        ${typeIcon[note.type] || '📝'} ${timeStr} - S${note.step}
                    </div>
                    <div style="margin-top: 4px; font-size: 0.8em;">${note.text}</div>
                </div>
            `;
        }).join('');
    
    notesList.innerHTML = notesHTML;
}

// Chat System
function addChatMessage(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const timestamp = new Date().toLocaleTimeString('de-DE', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    messageDiv.innerHTML = `
        <div class="timestamp">${timestamp}</div>
        <div class="text">${message}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getClientResponse(step) {
    if (!selectedClient || !clientResponses[selectedClient]) {
        return "Das ist ein wichtiger Punkt. Darüber muss ich nachdenken.";
    }
    
    return clientResponses[selectedClient][step] || 
           "Das ist interessant. Lassen Sie mich darüber nachdenken.";
}

function addCoachNote(technique) {
    if (!coachingTechniques[technique]) return;
    
    const message = coachingTechniques[technique];
    addChatMessage('coach', message);
    addSystemNote(`Technik: ${technique}`, 'intervention');
}

// ERWEITERTE PROMPT-WORKFLOW FUNKTIONEN
function editPrompt(stepId) {
    currentEditingStep = stepId;
    const step = coachingSteps.find(s => s.id === stepId);
    if (!step) return;
    
    // Update step number in modal
    const stepNumberElement = document.getElementById('currentStepNumber');
    if (stepNumberElement) {
        stepNumberElement.textContent = stepId;
    }
    
    const promptTextElement = document.getElementById('promptText');
    if (promptTextElement) {
        promptTextElement.value = step.prompt;
    }
    
    // Clear variables
    ['var1', 'var2', 'var3'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });
    
    // Set workflow to step 1 (editing)
    setWorkflowStep(1);
    
    // Show modal
    const modal = document.getElementById('promptModal');
    if (modal) modal.style.display = 'block';
    
    updatePromptPreview();
}

function setWorkflowStep(step) {
    workflowStep = step;
    
    // Hide all workflow steps
    document.querySelectorAll('.workflow-step').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show current step
    const currentStepElement = document.getElementById(`step${step}`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
}

function updatePromptPreview() {
    const promptText = document.getElementById('promptText')?.value || '';
    const var1 = document.getElementById('var1')?.value || '';
    const var2 = document.getElementById('var2')?.value || '';
    const var3 = document.getElementById('var3')?.value || '';

    let finalPrompt = promptText
        .replace(/\[PROBLEM\]/g, var1 || `[Problem: ${selectedClient ? clients[selectedClient].problem : 'wird noch definiert'}]`)
        .replace(/\[DETAILS\]/g, var2 || '[Details: werden noch ergänzt]')
        .replace(/\[KONTEXT\]/g, var3 || '[Kontext: wird noch spezifiziert]');

    // Update preview
    const previewElement = document.getElementById('promptPreview');
    if (previewElement) {
        previewElement.textContent = finalPrompt;
    }
}

function sendToCollaboration() {
    const promptText = document.getElementById('promptText')?.value || '';
    const var1 = document.getElementById('var1')?.value || '';
    const var2 = document.getElementById('var2')?.value || '';
    const var3 = document.getElementById('var3')?.value || '';

    let finalPrompt = promptText
        .replace(/\[PROBLEM\]/g, var1 || `[Problem: ${selectedClient ? clients[selectedClient].problem : 'wird noch definiert'}]`)
        .replace(/\[DETAILS\]/g, var2 || '[Details: werden noch ergänzt]')
        .replace(/\[KONTEXT\]/g, var3 || '[Kontext: wird noch spezifiziert]');

    // Send to collaboration window
    broadcastToCollaboration({
        prompt: finalPrompt,
        loading: false,
        approved: false,
        step: currentEditingStep
    });
    
    // Move to collaboration step
    setWorkflowStep(2);
    
    // Update status
    updateCollaborationStatus();
}

function goBackToEdit() {
    setWorkflowStep(1);
}

function handlePromptApproval(approved, feedback) {
    collaborationData.approved = approved;
    collaborationData.feedback = feedback;
    
    const sendButton = document.getElementById('sendToKIBtn');
    const statusElement = document.getElementById('coacheeStatus');
    
    if (approved) {
        if (sendButton) sendButton.disabled = false;
        if (statusElement) {
            statusElement.textContent = '🟢 Coachee hat Prompt freigegeben';
            statusElement.style.background = '#d1fae5';
            statusElement.style.color = '#065f46';
        }
    } else {
        if (statusElement) {
            statusElement.textContent = `🟡 Änderungswunsch: ${feedback}`;
            statusElement.style.background = '#fef3c7';
            statusElement.style.color = '#92400e';
        }
        
        // Optional: Automatically go back to editing with feedback
        setTimeout(() => {
            alert(`Änderungswunsch vom Coachee:\n\n"${feedback}"`);
            goBackToEdit();
        }, 1000);
    }
    
    updateCollaborationStatus();
}

function closePromptModal() {
    const modal = document.getElementById('promptModal');
    if (modal) modal.style.display = 'none';
    
    // Reset workflow
    setWorkflowStep(1);
    workflowStep = 1;
}

function resetPrompt() {
    const step = coachingSteps.find(s => s.id === currentEditingStep);
    if (!step) return;
    
    const promptTextElement = document.getElementById('promptText');
    if (promptTextElement) {
        promptTextElement.value = step.prompt;
    }
    
    ['var1', 'var2', 'var3'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });
    
    updatePromptPreview();
}

async function sendCollaborativePromptToKI() {
    const promptText = document.getElementById('promptText')?.value || '';
    const var1 = document.getElementById('var1')?.value || '';
    const var2 = document.getElementById('var2')?.value || '';
    const var3 = document.getElementById('var3')?.value || '';

    let finalPrompt = promptText
        .replace(/\[PROBLEM\]/g, var1 || (selectedClient ? clients[selectedClient].problem : 'Unbekanntes Problem'))
        .replace(/\[DETAILS\]/g, var2 || (selectedClient ? clients[selectedClient].background : 'Keine Details'))
        .replace(/\[KONTEXT\]/g, var3 || 'Coaching-Kontext');

    // Move to KI response step
    setWorkflowStep(3);
    
    // Show loading
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) loadingIndicator.classList.add('show');
    
    const responseSection = document.getElementById('kiResponseSection');
    if (responseSection) responseSection.style.display = 'none';
    
    // Broadcast loading state
    broadcastToCollaboration({
        prompt: finalPrompt,
        loading: true,
        response: '',
        step: currentEditingStep
    });

    try {
        // Simulate API call with realistic delay
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
        
        const response = generateSmartResponse(currentEditingStep, selectedClient, var1, var2, var3);
        
        if (loadingIndicator) loadingIndicator.classList.remove('show');
        
        const responseText = document.getElementById('kiResponseText');
        if (responseText) responseText.innerHTML = response;
        
        if (responseSection) responseSection.style.display = 'block';
        
        // Broadcast response to collaboration window
        broadcastToCollaboration({
            prompt: finalPrompt,
            response: response,
            loading: false,
            step: currentEditingStep
        });
        
    } catch (error) {
        console.error('KI request error:', error);
        
        if (loadingIndicator) loadingIndicator.classList.remove('show');
        
        const responseText = document.getElementById('kiResponseText');
        if (responseText) {
            responseText.innerHTML = 'Fehler bei der KI-Anfrage. Bitte versuchen Sie es erneut.';
        }
        
        if (responseSection) responseSection.style.display = 'block';
        
        broadcastToCollaboration({
            response: 'Fehler bei der KI-Anfrage. Bitte versuchen Sie es erneut.',
            loading: false
        });
    }
}

function generateSmartResponse(step, client, var1, var2, var3) {
    if (!client || !clients[client]) {
        return `<strong>🤖 KI-Coaching-Analyse Schritt ${step}:</strong><br><br>
        Professionelle Unterstützung für Ihren Coaching-Prozess.<br><br>
        <em>In der Vollversion erhalten Sie hier detaillierte, personalisierte KI-Analysen.</em>`;
    }
    
    const clientName = clients[client].name;
    const problem = var1 || clients[client].problem;
    
    // Verwende die Prompts aus dem Dokument für spezifische Schritte
    const stepPrompts = {
        1: `<strong>🎯 KI-Coaching-Analyse für ${clientName}:</strong><br><br>
        <strong>Zentrale Herausforderung:</strong> ${problem}<br><br>
        <strong>Empfohlene Coaching-Fragen:</strong><br>
        • "Was würde sich für Sie wie ein Erfolg anfühlen?"<br>
        • "Welche Rolle spielt Sicherheit vs. Sinnhaftigkeit?"<br>
        • "In 5 Jahren - worauf möchten Sie zurückblicken?"<br><br>
        <strong>Coach-Strategie:</strong> Schaffen Sie Vertrauen und normalisieren Sie die Ambivalenz. Diese Unsicherheit ist völlig natürlich bei wichtigen Lebensentscheidungen.`,
        
        2: `<strong>📝 IST-Situation Analyse für ${clientName}:</strong><br><br>
        Erstellen Sie einen in Ich-Form geschriebenen Bericht, in dem alle vorliegenden Informationen der Problem- und Zielbeschreibung zusammengefasst sind.<br><br>
        <strong>Gliederung:</strong><br>
        • <strong>IST-Situation:</strong> ${problem}<br>
        • <strong>Äußere Rahmenbedingungen:</strong> Berufliche Sicherheit vs. persönliche Werte<br>
        • <strong>Psychische Prozesse:</strong> Ambivalenz zwischen Sicherheit und Sinnhaftigkeit<br>
        • <strong>Verhaltensweisen:</strong> Zögerliches Verhalten bei wichtigen Entscheidungen<br><br>
        <strong>Coach-Hinweis:</strong> Nutzen Sie ressourcenorientierte Fragen zur Stärkung der Selbstwahrnehmung.`,
        
        3: `<strong>🖼️ Zielvisualisierung für ${clientName}:</strong><br><br>
        <strong>Bildarbeit-Analyse:</strong> "Welches Bild repräsentiert Ihr Coaching-Ziel am besten?"<br><br>
        <strong>Reflexionsfragen:</strong><br>
        • "Was sagt dieses Bild über Ihr Coaching-Ziel aus?"<br>
        • "In welcher Beziehung stehen Bild und Zielbeschreibung zueinander?"<br>
        • "Welche Bedeutung hat das gewählte Bild für Ihre Coachingproblematik?"<br><br>
        <strong>Coach-Strategie:</strong> Die Bildarbeit ermöglicht es, tiefere emotionale Aspekte der Problematik zu erkunden und neue Perspektiven zu entwickeln.`,
        
        4: `<strong>⚖️ Ausbalancierungsproblem-Analyse für ${clientName}:</strong><br><br>
        <strong>Identifiziertes Ausbalancierungsproblem:</strong> Sicherheit vs. Veränderungsbereitschaft<br><br>
        <strong>Diagnostische Fragen:</strong><br>
        • "Wie stark ist Ihr Bedürfnis nach Sicherheit vs. nach Veränderung?"<br>
        • "Welche Erfahrungen haben diese Balance geprägt?"<br>
        • "Was würde passieren, wenn Sie mehr Risiko eingehen würden?"<br><br>
        <strong>Coach-Hinweis:</strong> Nutzen Sie die Textbausteine zu Ausbalancierungsproblemen für eine tiefere diagnostische Klärung.`,
        
        7: `<strong>🎭 Innere Anteile-Analyse für ${clientName}:</strong><br><br>
        <strong>Die "Bremse" spricht:</strong><br>
        • "Was, wenn der neue Job nicht das hält, was er verspricht?"<br>
        • "Die finanzielle Sicherheit ist doch nicht zu unterschätzen!"<br>
        • "Besser ein bekanntes Übel als ein unbekanntes Risiko!"<br><br>
        <strong>Ranking der Ausbalancierungsdimensionen:</strong><br>
        1. Sicherheit vs. Risikobereitschaft<br>
        2. Anpassung vs. Authentizität<br>
        3. Stabilität vs. Wachstum<br><br>
        <strong>Coach-Strategie:</strong> Würdigen Sie beide Seiten der Ambivalenz und helfen Sie bei der Integration der unterschiedlichen Bedürfnisse.`,
        
        8: `<strong>🎯 Lern- und Entwicklungsziel für ${clientName}:</strong><br><br>
        <strong>Übergeordnetes Ziel:</strong> Entwicklung einer ausgewogenen Entscheidungskompetenz zwischen Sicherheit und persönlicher Erfüllung.<br><br>
        <strong>Spezifische Lernziele:</strong><br>
        • Stärkung des Vertrauens in die eigene Intuition<br>
        • Entwicklung von Risikoabwägungsstrategien<br>
        • Integration von Sicherheits- und Wachstumsbedürfnissen<br><br>
        <strong>Coach-Hinweis:</strong> Dieses Ziel geht über die aktuelle Entscheidung hinaus und fördert nachhaltige Persönlichkeitsentwicklung.`,
        
        10: `<strong>🧠 Umsetzungswiderstände-Analyse für ${clientName}:</strong><br><br>
        <strong>Realitätsprägende Überzeugungen:</strong><br>
        • "Nur finanzielle Sicherheit schützt vor Existenzängsten"<br>
        • "Veränderungen sind grundsätzlich riskant"<br>
        • "Man sollte dankbar sein für das, was man hat"<br><br>
        <strong>Innere Regeln:</strong><br>
        • Handlungsstrategie: "Erst die Sicherheit, dann die Erfüllung"<br>
        • Willensbildung: "Bauchgefühl ist nicht so wichtig wie rationale Argumente"<br><br>
        <strong>Coach-Strategie:</strong> Arbeiten Sie sanft an der Hinterfragung dieser limitierenden Glaubenssätze.`,
        
        11: `<strong>✨ Erfolgsimagination für ${clientName}:</strong><br><br>
        <strong>Szenario 1 - Beruflicher Wechsel:</strong><br>
        "Ich stehe morgens auf und freue mich auf meinen Arbeitstag. Meine Arbeit im nachhaltigen Bereich erfüllt mich und ich weiß, dass ich einen sinnvollen Beitrag leiste. Ja, das Gehalt ist niedriger, aber ich lebe bewusster und brauche weniger. Die innere Zufriedenheit strahlt auch auf mein Privatleben aus..."<br><br>
        <strong>Szenario 2 - Transformation im aktuellen Job:</strong><br>
        "Ich habe Wege gefunden, auch in meiner aktuellen Position nachhaltige Projekte zu initiieren. Die finanzielle Sicherheit gibt mir den Freiraum, ehrenamtlich in Umweltprojekten aktiv zu werden. Ich habe das Beste aus beiden Welten vereint..."<br><br>
        <strong>Coach-Hinweis:</strong> Beide Visionen zeigen realistische Wege auf und reduzieren die Schwarz-Weiß-Denkweise.`
    };
    
    return stepPrompts[step] || `<strong>🤖 KI-Coaching-Analyse Schritt ${step}:</strong><br><br>
    Professionelle Unterstützung für ${clientName} bei der Herausforderung "${problem}".<br><br>
    <strong>In der Vollversion:</strong> Hier erhalten Sie detaillierte, personalisierte KI-Analysen basierend auf modernsten Coaching-Methoden.<br><br>
    <em>Diese Demo zeigt nur einen kleinen Ausschnitt der Möglichkeiten.</em>`;
}

function adoptCollaborativeResponse() {
    const responseText = document.getElementById('kiResponseText');
    if (!responseText) return;
    
    const response = responseText.innerHTML;
    addChatMessage('ai', response);
    
    closePromptModal();
    addSystemNote(`KI-Analyse für Schritt ${currentEditingStep} gemeinsam erarbeitet`, 'intervention');
}

function retryPrompt() {
    sendCollaborativePromptToKI();
}

function nextCoachingStep() {
    closePromptModal();
    if (currentStep < 12) {
        setCurrentStep(currentStep + 1);
        addChatMessage('coach', `Sehr gut! Lassen Sie uns nun zu Schritt ${currentStep} übergehen.`);
    }
}

// COACH-KI SYSTEM (NEU)
function initializeCoachKI() {
    coachKIHistory = [
        {
            sender: 'ki',
            message: 'Hallo! Ich bin Ihr privater KI-Berater für Prozessfragen, Tools und Methoden. Wie kann ich Ihnen helfen?',
            timestamp: new Date()
        }
    ];
}

function showCoachKIModal() {
    const modal = document.getElementById('coachKIModal');
    if (modal) modal.style.display = 'block';
    
    renderCoachKIHistory();
}

function closeCoachKIModal() {
    const modal = document.getElementById('coachKIModal');
    if (modal) modal.style.display = 'none';
}

function renderCoachKIHistory() {
    const messagesContainer = document.getElementById('coachChatMessages');
    if (!messagesContainer || !coachKIHistory) return;
    
    messagesContainer.innerHTML = coachKIHistory.map(msg => {
        const messageClass = msg.sender === 'coach' ? 'coach-message' : 'ki-message';
        const senderLabel = msg.sender === 'coach' ? '👨‍💼 Coach:' : '🤖 Coach-KI:';
        
        return `
            <div class="${messageClass}">
                <strong>${senderLabel}</strong> ${msg.message}
            </div>
        `;
    }).join('');
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function askCoachKI(question) {
    // Add coach question to history
    coachKIHistory.push({
        sender: 'coach',
        message: question,
        timestamp: new Date()
    });
    
    // Generate contextual KI response
    const response = generateCoachKIResponse(question);
    
    coachKIHistory.push({
        sender: 'ki',
        message: response,
        timestamp: new Date()
    });
    
    renderCoachKIHistory();
}

function sendCoachKIQuestion() {
    const input = document.getElementById('coachKIInput');
    if (!input || !input.value.trim()) return;
    
    const question = input.value.trim();
    input.value = '';
    
    askCoachKI(question);
}

function generateCoachKIResponse(question) {
    const currentStepInfo = coachingSteps.find(s => s.id === currentStep);
    const clientInfo = selectedClient ? clients[selectedClient] : null;
    
    // Contextual responses based on question type and current situation
    const responsePatterns = {
        'technik': `Für Schritt ${currentStep} (${currentStepInfo?.title}) empfehle ich folgende Techniken:\n\n• **Systemische Fragen:** "Wer in Ihrem Umfeld würde sagen...?"\n• **Skalierungsfragen:** "Auf einer Skala von 1-10..."\n• **Ressourcen-Fragen:** "Was hat Ihnen in ähnlichen Situationen geholfen?"\n\nBei ${clientInfo?.name || 'diesem Klienten'} würde ich besonders auf **Ambivalenz-Würdigung** setzen.`,
        
        'widerstand': `Widerstand ist oft ein Zeichen für nicht ausreichend gewürdigte Bedürfnisse. Versuchen Sie:\n\n• **Paradoxe Intervention:** "Vielleicht ist es noch nicht der richtige Zeitpunkt für Veränderung?"\n• **Reframing:** "Der Widerstand zeigt, wie wichtig Sicherheit für Sie ist"\n• **Joining:** "Ich verstehe diese Vorsicht sehr gut"\n\nWichtig: Gehen Sie VOR den Widerstand, nicht dagegen!`,
        
        'fragen': `Für den aktuellen Coaching-Moment mit ${clientInfo?.name || 'Ihrem Klienten'} eignen sich:\n\n• **Vertiefende Fragen:** "Was ist das Wichtigste an...?"\n• **Hypothetische Fragen:** "Angenommen, das Problem wäre gelöst..."\n• **Skalierungsfragen:** "Wo stehen Sie heute bei diesem Thema?"\n• **Ausnahme-Fragen:** "Wann war es schon mal anders?"\n\nFokus auf Schritt ${currentStep}: ${currentStepInfo?.description}`,
        
        'prozess': `Sie befinden sich in Schritt ${currentStep}/12: **${currentStepInfo?.title}**\n\nIhr Klient ${clientInfo?.name || ''} zeigt typische Anzeichen für **${getProcessAssessment()}**.\n\n**Nächste Schritte:**\n• Vertiefen Sie die aktuelle Thematik\n• Achten Sie auf non-verbale Signale\n• Bei Blockaden: Tempo reduzieren\n• Bei Energie: Momentum nutzen\n\n**Timing:** Durchschnittlich 8-12 Minuten pro Schritt optimal.`
    };
    
    // Simple pattern matching
    for (const [pattern, response] of Object.entries(responsePatterns)) {
        if (question.toLowerCase().includes(pattern)) {
            return response;
        }
    }
    
    // Default contextual response
    return `Ihre Frage "${question}" ist sehr relevant für den aktuellen Coaching-Prozess.\n\nIm Kontext von Schritt ${currentStep} (${currentStepInfo?.title}) würde ich empfehlen:\n\n• **Hypothesenbildung:** Welche Annahme haben Sie über die Dynamik?\n• **Prozess-Check:** Wie erlebt der Klient gerade den Prozess?\n• **Intervention-Test:** Probieren Sie eine kleine Intervention und beobachten Sie die Reaktion\n\nMöchten Sie eine spezifischere Beratung zu einem bestimmten Aspekt?`;
}

function getProcessAssessment() {
    if (!selectedClient) return 'einen typischen Coaching-Verlauf';
    
    const assessments = {
        'sarah': 'Entscheidungsambivalenz - zwischen Sicherheit und Werten',
        'marcus': 'Midlife-Transition - Sinnfindung und Neuorientierung', 
        'lisa': 'Work-Life-Balance-Konflikt - Beruf vs. Familie',
        'werner': 'Übergangsphase - Identität und neue Rollen'
    };
    
    return assessments[selectedClient] || 'einen individuellen Entwicklungsprozess';
}

// Template Edit Modal Functions
function closeTemplateEditModal() {
    const modal = document.getElementById('templateEditModal');
    if (modal) modal.style.display = 'none';
    currentEditingTemplate = null;
}

// Modal Functions
function showSalesModal() {
    const modal = document.getElementById('salesModal');
    if (modal) modal.style.display = 'block';
}

function closeSalesModal() {
    const modal = document.getElementById('salesModal');
    if (modal) modal.style.display = 'none';
}

function showExportModal() {
    const modal = document.getElementById('exportModal');
    if (modal) modal.style.display = 'block';
}

function closeExportModal() {
    const modal = document.getElementById('exportModal');
    if (modal) modal.style.display = 'none';
}

// Export Functions (bleibt unverändert)
function exportNotes() {
    if (sessionNotes.length === 0) {
        alert('Keine Notizen zum Exportieren vorhanden.');
        return;
    }
    
    const sessionDuration = sessionStartTime ? Math.round((new Date() - sessionStartTime) / 60000) : 0;
    
    let markdown = `# Coach Mission Control - Demo Session\n\n`;
    markdown += `**Klient:** ${selectedClient ? clients[selectedClient].name : 'Unbekannt'}\n`;
    markdown += `**Session-ID:** ${sessionId}\n`;
    markdown += `**Datum:** ${new Date().toLocaleDateString('de-DE')}\n`;
    markdown += `**Dauer:** ${sessionDuration} Minuten\n`;
    markdown += `**Schritt:** ${currentStep}/12\n\n`;
    
    markdown += `## 📝 Session-Notizen\n\n`;
    
    sessionNotes.forEach(note => {
        const timeStr = note.timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        const typeIcon = { observation: '👁️', intervention: '⚡', resource: '💪', hypothesis: '🧠', custom: '📝' };
        markdown += `**${timeStr} (S${note.step}) ${typeIcon[note.type] || '📝'}:** ${note.text}\n\n`;
    });
    
    markdown += `---\n*Erstellt mit Coach Mission Control Demo - Triadisches Coaching*`;
    
    downloadFile(
        JSON.stringify(sessionData, null, 2), 
        `Coach-Session-${selectedClient || 'demo'}-${sessionId}-${new Date().toISOString().split('T')[0]}.json`, 
        'application/json'
    );
    closeExportModal();
}

function exportDemo() {
    const sessionDuration = sessionStartTime ? Math.round((new Date() - sessionStartTime) / 60000) : 0;
    
    let report = `# Coach Mission Control - Triadisches Coaching Demo\n\n`;
    report += `## 🎯 Management Summary\n\n`;
    report += `**System:** Coach Mission Control - Triadisches KI-Coaching mit Real-Time Kollaboration\n`;
    report += `**Demo-Klient:** ${selectedClient ? clients[selectedClient].name : 'Nicht gewählt'}\n`;
    report += `**Session-ID:** ${sessionId}\n`;
    report += `**Demo-Dauer:** ${sessionDuration} Minuten\n`;
    report += `**Durchgeführte Schritte:** ${currentStep}/12\n`;
    report += `**Kollaboration:** ${window.collaborationWindow && !window.collaborationWindow.closed ? '✅ Aktiv getestet' : '🟡 Vorbereitet'}\n`;
    report += `**Coach-KI Nutzung:** ${coachKIHistory.length - 1} Beratungen\n\n`;
    
    report += `## ✅ Getestete Kernfunktionen:\n\n`;
    report += `**🔗 Triadisches Coaching:** Coach + Klient + KI in separaten Fenstern\n`;
    report += `**📱 Real-Time Kollaboration:** Live-Synchronisation zwischen Coach und Coachee\n`;
    report += `**🎛️ 12-Schritte-Methodik:** Strukturierter Coaching-Prozess\n`;
    report += `**🤖 KI-Integration:** Gemeinsame Prompt-Entwicklung und Analyse\n`;
    report += `**📚 Template-Repository:** Professionelle Coaching-Techniken mit Bearbeitung\n`;
    report += `**💬 Coach-KI Beratung:** Separates Fenster für Prozess- und Methodenberatung\n`;
    report += `**📝 Live-Notizen-System:** Dokumentation während der Session\n`;
    report += `**📊 Export-Funktionen:** Professionelle Dokumentation\n`;
    report += `**⚙️ Workflow-Management:** 3-stufiger Kollaborationsprozess\n\n`;
    
    report += `---\n*Demo durchgeführt am ${new Date().toLocaleDateString('de-DE')} | Session: ${sessionId}*`;
    
    downloadFile(report, `Coach-Mission-Control-Demo-${new Date().toISOString().split('T')[0]}.md`, 'text/markdown');
    closeExportModal();
}

// Utility Functions
function downloadFile(content, filename, mimeType) {
    try {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download error:', error);
        alert('Fehler beim Download. Bitte versuchen Sie es erneut.');
    }
}

function updateTime() {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = new Date().toLocaleTimeString('de-DE');
    }
}

// Auto-save functionality
function initializeAutoSave() {
    setInterval(function() {
        if (sessionNotes.length > 0 && sessionId) {
            try {
                localStorage.setItem('coachMissionControlSession', JSON.stringify({
                    sessionId: sessionId,
                    notes: sessionNotes,
                    client: selectedClient,
                    step: currentStep,
                    timestamp: new Date(),
                    collaborationData: collaborationData,
                    coachKIHistory: coachKIHistory
                }));
            } catch (e) {
                console.warn('Auto-save failed:', e);
            }
        }
    }, appConfig.collaboration.autoSaveInterval);
}

// Load auto-saved session data
function loadAutoSavedSession() {
    try {
        const savedSession = localStorage.getItem('coachMissionControlSession');
        if (savedSession) {
            const data = JSON.parse(savedSession);
            const timeDiff = new Date() - new Date(data.timestamp);
            
            // If data is less than 2 hours old, offer to restore
            if (timeDiff < 7200000 && data.sessionId && confirm('Eine vorherige Session wurde gefunden. Wiederherstellen?')) {
                sessionNotes = data.notes || [];
                selectedClient = data.client;
                currentStep = data.step || 1;
                sessionId = data.sessionId;
                collaborationData = data.collaborationData || collaborationData;
                coachKIHistory = data.coachKIHistory || coachKIHistory;
                
                if (selectedClient) {
                    selectClient(selectedClient);
                }
                
                updateCollaborationLink();
                renderNotes();
                
                return true;
            }
        }
    } catch (e) {
        console.warn('Could not load auto-saved session:', e);
    }
    return false;
}

// Keyboard Shortcuts (ERWEITERT)
document.addEventListener('keydown', function(e) {
    // Ctrl+S: Export session
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        exportSession();
    }
    
    // Escape: Close modals
    if (e.key === 'Escape') {
        closePromptModal();
        closeSalesModal();
        closeExportModal();
        closeCoachKIModal();
        closeTemplateEditModal();
    }
    
    // Ctrl+K: Copy collaboration link
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        copyCollaborationLink();
    }
    
    // Ctrl+N: Add quick note
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        addQuickNote('custom');
    }
    
    // Ctrl+O: Open collaboration window
    if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        openCollaborationWindow();
    }
    
    // Ctrl+H: Open Coach-KI (Help)
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        showCoachKIModal();
    }
    
    // Enter in Coach-KI input
    if (e.key === 'Enter' && !e.shiftKey && e.target.id === 'coachKIInput') {
        e.preventDefault();
        sendCoachKIQuestion();
    }
});

// Cross-window message handling (ERWEITERT)
window.addEventListener('message', function(event) {
    if (event.origin !== window.location.origin) return;
    
    switch (event.data.type) {
        case 'collaborationUpdate':
            collaborationData = event.data.data;
            updateCollaborationStatus();
            break;
            
        case 'promptApproval':
            handlePromptApproval(event.data.approved, event.data.feedback);
            break;
            
        case 'coacheeFeedback':
            collaborationData.feedback = event.data.feedback;
            updateCollaborationStatus();
            
            // Add feedback to chat
            addChatMessage('client', `💬 Feedback zur KI-Analyse: ${event.data.feedback}`);
            addSystemNote(`Coachee-Feedback erhalten: ${event.data.feedback}`, 'observation');
            break;
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    try {
        localStorage.removeItem('collaborationData');
    } catch (e) {
        // Ignore errors
    }
});

// Initialize auto-saved session on load
document.addEventListener('DOMContentLoaded', function() {
    if (!isCollaborationMode) {
        loadAutoSavedSession();
    }
});

// Periodic sync check for collaboration
setInterval(function() {
    if (window.collaborationWindow && window.collaborationWindow.closed) {
        // Collaboration window was closed
        window.collaborationWindow = null;
        updateCollaborationStatus();
    }
}, 1000);

// Performance monitoring
const performanceMetrics = {
    sessionStart: null,
    stepTransitions: [],
    collaborationEvents: [],
    aiRequests: []
};

function trackPerformance(event, data = {}) {
    const timestamp = Date.now();
    
    switch (event) {
        case 'sessionStart':
            performanceMetrics.sessionStart = timestamp;
            break;
        case 'stepTransition':
            performanceMetrics.stepTransitions.push({ timestamp, ...data });
            break;
        case 'collaboration':
            performanceMetrics.collaborationEvents.push({ timestamp, ...data });
            break;
        case 'aiRequest':
            performanceMetrics.aiRequests.push({ timestamp, ...data });
            break;
    }
}

// Enhanced error handling
window.addEventListener('error', function(event) {
    console.error('Application error:', event.error);
    
    // In production, send to error tracking service
    if (typeof reportError === 'function') {
        reportError({
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error,
            sessionId: sessionId,
            currentStep: currentStep,
            selectedClient: selectedClient
        });
    }
});

// Service worker registration for PWA capability (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }).catch(function(err) {
            console.log('ServiceWorker registration failed');
        });
    });
}

// Advanced session analytics
function getSessionAnalytics() {
    const sessionDuration = sessionStartTime ? Date.now() - sessionStartTime.getTime() : 0;
    
    return {
        sessionId: sessionId,
        duration: sessionDuration,
        stepsCompleted: currentStep,
        notesCount: sessionNotes.length,
        collaborationActive: !!(window.collaborationWindow && !window.collaborationWindow.closed),
        coachKIInteractions: coachKIHistory.length - 1,
        templatesUsed: sessionNotes.filter(n => n.text.includes('Template verwendet')).length,
        performance: performanceMetrics,
        client: selectedClient,
        timestamp: new Date().toISOString()
    };
}

// Export session analytics
function exportAnalytics() {
    const analytics = getSessionAnalytics();
    downloadFile(
        JSON.stringify(analytics, null, 2),
        `Coach-Analytics-${sessionId}-${new Date().toISOString().split('T')[0]}.json`,
        'application/json'
    );
}

// NEUE EMERGENCY RESTORE FUNKTIONEN
function emergencyRestoreCollaboration() {
    console.log("🚨 Emergency Restore gestartet");
    
    // Prüfe alle möglichen Datenquellen
    const sources = [
        'collaborationData',
        'collaborationBackup', 
        'lastRealPrompt'
    ];
    
    for (const source of sources) {
        try {
            const stored = localStorage.getItem(source);
            if (stored) {
                const data = JSON.parse(stored);
                console.log(`🔄 Wiederherstellung aus ${source}:`, data);
                
                if (source === 'collaborationBackup') {
                    updateCollaborationDisplay(data.data);
                } else if (source === 'lastRealPrompt') {
                    updateCollaborationDisplay({
                        prompt: data.prompt,
                        step: data.step || 1,
                        loading: false,
                        approved: false
                    });
                } else {
                    updateCollaborationDisplay(data);
                }
                
                return true; // Erfolgreich wiederhergestellt
            }
        } catch(e) {
            console.warn(`❌ Wiederherstellung aus ${source} fehlgeschlagen:`, e);
        }
    }
    
    console.log("❌ Keine wiederherstellbaren Daten gefunden");
    return false;
}

// Debug-Hilfsfunktion für Browser Console
window.debugCollaborationSync = function() {
    console.log("=== COLLABORATION DEBUG ===");
    console.log("CollaborationData:", localStorage.getItem('collaborationData'));
    console.log("CollaborationBackup:", localStorage.getItem('collaborationBackup'));
    console.log("LastRealPrompt:", localStorage.getItem('lastRealPrompt'));
    console.log("Current collaborationData:", collaborationData);
    
    // Versuche Emergency Restore
    console.log("Teste Emergency Restore...");
    return emergencyRestoreCollaboration();
};

// Advanced debugging helpers
function debugCollaboration() {
    console.log('=== COLLABORATION DEBUG INFO ===');
    console.log('Session ID:', sessionId);
    console.log('Collaboration Data:', collaborationData);
    console.log('Window Status:', {
        exists: !!window.collaborationWindow,
        closed: window.collaborationWindow?.closed
    });
    console.log('Current Step:', currentStep);
    console.log('Workflow Step:', workflowStep);
    console.log('=== END DEBUG INFO ===');
}

// Make debug function available globally for development
window.debugCollaboration = debugCollaboration;
window.getSessionAnalytics = getSessionAnalytics;

console.log('🔧 Coach Mission Control v3.1 - KOLLABORATIONS-SYNC FIXED! 🎯');
console.log('✅ Race Condition Problem behoben');
console.log('✅ Anti-Override-Schutz für echte Prompts');
console.log('✅ Robuste Backup- und Restore-Mechanismen');
console.log('✅ Aggressive localStorage-Überwachung mit Polling');
console.log('✅ Emergency Restore Funktionen');
console.log('🚀 Type debugCollaborationSync() für Debug-Informationen');dFile(markdown, `Coach-Demo-${selectedClient || 'session'}-${sessionId}-${new Date().toISOString().split('T')[0]}.md`, 'text/markdown');
    closeExportModal();
}

function exportSession() {
    const sessionData = {
        meta: {
            sessionId: sessionId,
            client: selectedClient ? clients[selectedClient] : null,
            startTime: sessionStartTime,
            currentStep: currentStep,
            duration: sessionStartTime ? Math.round((new Date() - sessionStartTime) / 60000) : 0,
            version: appConfig.version
        },
        notes: sessionNotes,
        collaboration: {
            linkGenerated: !!sessionId,
            collaborationData: collaborationData,
            windowOpen: !!(window.collaborationWindow && !window.collaborationWindow.closed)
        },
        coachKI: {
            conversationLength: coachKIHistory.length,
            lastQuestion: coachKIHistory.length > 1 ? coachKIHistory[coachKIHistory.length - 2].message : null
        },
        messages: Array.from(document.querySelectorAll('.message')).map(msg => ({
            sender: msg.className.replace('message ', ''),
            text: msg.querySelector('.text')?.textContent || '',
            timestamp: msg.querySelector('.timestamp')?.textContent || ''
        }))
    };
    
    downloa