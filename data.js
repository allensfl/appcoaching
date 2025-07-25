// COACHING DATA & TEMPLATES
// Basierend auf der professionellen Coaching-Wissensbasis

// KLIENTEN-DATENBANK
const clients = [
    {
        id: "sarah",
        name: "Sarah Müller",
        role: "Projektmanagerin", 
        company: "Tech Solutions GmbH",
        avatar: "SM",
        email: "sarah.mueller@techsolutions.de",
        phone: "+49 30 12345678",
        currentIssues: ["Zeitmanagement", "Teamführung", "Work-Life-Balance"],
        coachingHistory: [
            {
                date: "2025-01-15",
                phase: "Ersttermin",
                focus: "Anliegen-Exploration",
                notes: "Hohe Arbeitsbelastung, Delegationsprobleme"
            }
        ],
        preferences: {
            communicationStyle: "direkt",
            learningType: "visuell",
            pace: "strukturiert"
        }
    },
    {
        id: "marcus",
        name: "Marcus Schmidt",
        role: "Vertriebsleiter",
        company: "Innovation Sales AG", 
        avatar: "MS",
        email: "m.schmidt@innovation-sales.com",
        phone: "+49 40 98765432",
        currentIssues: ["Führungsstil", "Konflikte im Team", "Strategieentwicklung"],
        coachingHistory: [
            {
                date: "2025-01-20",
                phase: "Problemanalyse",
                focus: "Führungsverhalten",
                notes: "Autoritärer Stil, Team demotiviert"
            }
        ],
        preferences: {
            communicationStyle: "analytisch",
            learningType: "auditiv",
            pace: "intensiv"
        }
    },
    {
        id: "lisa",
        name: "Lisa Weber",
        role: "Marketing-Direktorin",
        company: "Creative Marketing Hub",
        avatar: "LW", 
        email: "lisa.weber@creative-hub.de",
        phone: "+49 89 55567890",
        currentIssues: ["Entscheidungsfindung", "Selbstvertrauen", "Karriereplanung"],
        coachingHistory: [
            {
                date: "2025-01-10",
                phase: "Zielklärung",
                focus: "Karriere-Vision",
                notes: "Unsicherheit über nächste Schritte"
            }
        ],
        preferences: {
            communicationStyle: "empathisch",
            learningType: "kinästhetisch", 
            pace: "behutsam"
        }
    },
    {
        id: "werner",
        name: "Werner Hoffmann",
        role: "IT-Leiter",
        company: "Digital Systems GmbH",
        avatar: "WH",
        email: "w.hoffmann@digital-systems.de", 
        phone: "+49 69 44478901",
        currentIssues: ["Change Management", "Technologie-Strategien", "Mitarbeiterentwicklung"],
        coachingHistory: [
            {
                date: "2025-01-25",
                phase: "Lösungsentwicklung",
                focus: "Change-Prozess",
                notes: "Widerstand im Team gegen neue Technologien"
            }
        ],
        preferences: {
            communicationStyle: "sachlich",
            learningType: "visuell-analytisch",
            pace: "systematisch"
        }
    }
];

// COACHING TEMPLATES basierend auf Geißler Triadik
const coachingTemplates = [
    {
        id: "gt_erstanliegen",
        title: "GT Erstanliegen-Exploration",
        category: "Geißler Triadisch",
        phase: 1,
        description: "Systematische Anliegen-Exploration nach Geißler",
        prompts: [
            {
                step: 1,
                prompt: "GT1",
                text: "Was beschäftigt Sie denn gerade? Womit kann ich Ihnen heute helfen?",
                purpose: "Offene Anliegen-Exploration"
            },
            {
                step: 2,
                prompt: "GT2", 
                text: "Können Sie mir das Problem noch etwas genauer beschreiben?",
                purpose: "Problemkonkretisierung"
            },
            {
                step: 3,
                prompt: "GT3",
                text: "Was wäre Ihr Wunschzustand? Wie sähe eine gute Lösung aus?",
                purpose: "Zielklärung"
            },
            {
                step: 4,
                prompt: "GT4",
                text: "Zwischen welchen Polen bewegen Sie sich? Was steht sich gegenüber?",
                purpose: "Spannungsfeld-Identifikation"
            }
        ],
        duration: "20-30 Minuten",
        outcome: "Klares Anliegen und Spannungsfeld identifiziert"
    },
    
    {
        id: "sf_loesungsfokus",
        title: "SF Lösungsfokussierte Intervention", 
        category: "Solution Finder",
        phase: 3,
        description: "Ressourcenorientierte Lösungsentwicklung",
        prompts: [
            {
                step: 1,
                prompt: "SF1",
                text: "Stellen Sie sich vor, Ihr Problem wäre gelöst. Woran würden Sie das merken?",
                purpose: "Lösungsvision aktivieren"
            },
            {
                step: 2,
                prompt: "SF2",
                text: "Was hat Ihnen in ähnlichen Situationen schon mal geholfen?",
                purpose: "Ressourcen identifizieren"
            },
            {
                step: 3,
                prompt: "SF3", 
                text: "Wann war das Problem schon mal weniger stark? Was war da anders?",
                purpose: "Ausnahmen finden"
            },
            {
                step: 4,
                prompt: "SF4",
                text: "Auf einer Skala von 1-10: Wo stehen Sie heute?",
                purpose: "Skalierung für Fortschritt"
            }
        ],
        duration: "15-25 Minuten",
        outcome: "Konkrete Lösungsansätze und nächste Schritte"
    },

    {
        id: "diag_emotional",
        title: "DIAG Emotionale Diagnostik",
        category: "Diagnostisch",
        phase: 2,
        description: "Systematische emotionale Befindlichkeits-Analyse",
        prompts: [
            {
                step: 1,
                prompt: "DIAG1",
                text: "Auf einer Skala von 1-10: Wie würden Sie Ihre emotionale Verfassung einschätzen?",
                purpose: "Emotionale Baseline"
            },
            {
                step: 2,
                prompt: "DIAG2",
                text: "Welches Gefühl ist in dieser Situation am stärksten präsent?",
                purpose: "Schlüsselaffekt identifizieren"
            },
            {
                step: 3,
                prompt: "DIAG3",
                text: "Wie spüren Sie das Problem in Ihrem Körper?",
                purpose: "Somatische Marker"
            },
            {
                step: 4,
                prompt: "DIAG4",
                text: "Was denken Sie über sich selbst in dieser Situation?",
                purpose: "Kognitive Muster"
            }
        ],
        duration: "15-20 Minuten", 
        outcome: "Emotionales Profil und Körperwahrnehmung geklärt"
    },

    {
        id: "loes_wunderfrage",
        title: "LÖS Wunderfragen-Intervention",
        category: "Lösungsorientiert",
        phase: 3,
        description: "Klassische lösungsorientierte Techniken nach de Shazer",
        prompts: [
            {
                step: 1,
                prompt: "LÖS1",
                text: "Angenommen, über Nacht geschieht ein Wunder und Ihr Problem ist gelöst. Was wäre anders?",
                purpose: "Lösungsvision kreieren"
            },
            {
                step: 2, 
                prompt: "LÖS2",
                text: "Was wäre der kleinste Schritt, den Sie heute noch gehen könnten?",
                purpose: "Erste konkrete Aktion"
            },
            {
                step: 3,
                prompt: "LÖS3",
                text: "Welche Fähigkeiten, Menschen oder Hilfsmittel stehen Ihnen zur Verfügung?",
                purpose: "Ressourcen-Mapping"
            },
            {
                step: 4,
                prompt: "LÖS4",
                text: "Denken Sie an eine Situation, in der Sie erfolgreich waren. Was können Sie übertragen?",
                purpose: "Erfolgs-Transfer"
            }
        ],
        duration: "20-30 Minuten",
        outcome: "Konkrete Handlungsschritte und Ressourcen-Aktivierung"
    },

    {
        id: "meta_prozess",
        title: "META Prozess-Reflexion",
        category: "Meta-Coaching", 
        phase: 0,
        description: "Reflexion des Coaching-Prozesses und der Beziehung",
        prompts: [
            {
                step: 1,
                prompt: "META1",
                text: "Wie erleben Sie unser Gespräch bisher? Was ist hilfreich?",
                purpose: "Prozess-Feedback"
            },
            {
                step: 2,
                prompt: "META2", 
                text: "Sollen wir einen anderen Ansatz versuchen?",
                purpose: "Methodenflexibilität"
            },
            {
                step: 3,
                prompt: "META3",
                text: "Ist das Tempo für Sie angemessen?",
                purpose: "Tempo-Justierung"
            },
            {
                step: 4,
                prompt: "META4",
                text: "Wie geht es Ihnen mit mir als Coach?",
                purpose: "Beziehungsklärung"
            }
        ],
        duration: "10-15 Minuten",
        outcome: "Optimierter Coaching-Prozess und gestärkte Arbeitsbeziehung"
    },

    {
        id: "spannungsfeld_avatar",
        title: "Spannungsfeld Avatar-Aufstellung",
        category: "Systemisch",
        phase: 2,
        description: "Visualisierung von Spannungsfeldern durch Avatar-Arbeit",
        prompts: [
            {
                step: 1,
                prompt: "GT4",
                text: "Zwischen welchen Polen bewegen Sie sich?",
                purpose: "Spannungsfeld identifizieren"
            },
            {
                step: 2,
                prompt: "AVATAR1",
                text: "Wenn Sie die eine Seite als Person darstellen würden, wie würde sie aussehen?",
                purpose: "Pol A personifizieren"
            },
            {
                step: 3,
                prompt: "AVATAR2", 
                text: "Und die andere Seite? Welche Eigenschaften hat diese Person?",
                purpose: "Pol B personifizieren"
            },
            {
                step: 4,
                prompt: "AVATAR3",
                text: "Was würden diese beiden Personen zueinander sagen?",
                purpose: "Dialog zwischen Polen"
            }
        ],
        duration: "25-35 Minuten",
        outcome: "Visualisiertes Spannungsfeld und Lösungsansätze",
        tools: ["DelightEx Avatar Tool"]
    },

    {
        id: "live_digital",
        title: "LIVE Digital Coaching Setup",
        category: "Online-Coaching",
        phase: 1,
        description: "Spezielle Techniken für digitales Coaching",
        prompts: [
            {
                step: 1,
                prompt: "LIVE1",
                text: "Wie geht es Ihnen mit der digitalen Gesprächssituation?",
                purpose: "Digitaler Rapport"
            },
            {
                step: 2,
                prompt: "LIVE2",
                text: "Haben Sie einen ruhigen Ort für unser Gespräch?",
                purpose: "Setting klären"
            },
            {
                step: 3,
                prompt: "LIVE3",
                text: "Können Sie mich gut sehen und hören?",
                purpose: "Technische Verbindung"
            },
            {
                step: 4,
                prompt: "GT1",
                text: "Was beschäftigt Sie denn gerade?",
                purpose: "Inhaltlicher Einstieg"
            }
        ],
        duration: "5-10 Minuten Vorbereitung",
        outcome: "Optimale digitale Coaching-Umgebung"
    },

    {
        id: "notfall_intervention",
        title: "NOTFALL Krisenintervention",
        category: "Notfall",
        phase: 0,
        description: "Stabilisierung bei akuten Belastungen",
        prompts: [
            {
                step: 1,
                prompt: "NOTFALL1",
                text: "Ich merke, dass Sie sehr aufgewühlt sind. Was brauchen Sie jetzt am meisten?",
                purpose: "Akute Stabilisierung"
            },
            {
                step: 2,
                prompt: "NOTFALL2",
                text: "Können Sie mir auf einer Skala von 1-10 sagen, wie belastet Sie sich fühlen?",
                purpose: "Belastungsgrad einschätzen"
            },
            {
                step: 3,
                prompt: "NOTFALL3",
                text: "Haben Sie jemanden, der Sie unterstützen kann?",
                purpose: "Unterstützungssystem"
            },
            {
                step: 4,
                prompt: "NOTFALL4",
                text: "Sollen wir professionelle Hilfe einbeziehen?",
                purpose: "Weitere Schritte"
            }
        ],
        duration: "10-20 Minuten",
        outcome: "Stabilisierung und Weitervermittlung wenn nötig",
        warning: "Bei Suizidgefahr sofort professionelle Hilfe einbeziehen!"
    }
];

// SPANNUNGSFELDER-DATENBANK (vereinfacht)
const spannungsfelder = [
    {
        id: "autonomie_verbindung",
        name: "Autonomie ↔ Verbindung",
        description: "Spannung zwischen Selbstständigkeit und Zugehörigkeit",
        keywords: ["unabhängig", "team", "allein", "gruppe", "selbstständig", "verbunden"],
        interventions: ["GT4", "AVATAR1", "LÖS1"],
        typicalContexts: ["Führung", "Partnerschaft", "Karriere"]
    },
    {
        id: "kontrolle_loslassen", 
        name: "Kontrolle ↔ Loslassen",
        description: "Spannung zwischen Steuerung und Vertrauen",
        keywords: ["kontrolle", "loslassen", "steuerung", "vertrauen", "sicherheit", "flexibilität"],
        interventions: ["GT4", "DIAG2", "LÖS3"],
        typicalContexts: ["Management", "Delegation", "Veränderung"]
    },
    {
        id: "leistung_entspannung",
        name: "Leistung ↔ Entspannung", 
        description: "Spannung zwischen Anstrengung und Erholung",
        keywords: ["leistung", "entspannung", "stress", "ruhe", "arbeit", "pause"],
        interventions: ["GT4", "DIAG1", "LÖS2"],
        typicalContexts: ["Work-Life-Balance", "Burnout-Prävention", "Zeitmanagement"]
    },
    {
        id: "naehe_distanz",
        name: "Nähe ↔ Distanz",
        description: "Spannung zwischen Intimität und Abgrenzung", 
        keywords: ["nähe", "distanz", "abgrenzung", "intimität", "grenzen", "verbindung"],
        interventions: ["GT4", "DIAG3", "AVATAR1"],
        typicalContexts: ["Beziehungen", "Teamführung", "Kommunikation"]
    },
    {
        id: "struktur_spontanitaet",
        name: "Struktur ↔ Spontaneität",
        description: "Spannung zwischen Planung und Flexibilität",
        keywords: ["struktur", "spontaneität", "planung", "flexibilität", "routine", "überraschung"],
        interventions: ["GT4", "SF4", "LÖS1"],
        typicalContexts: ["Projektmanagement", "Kreativität", "Organisation"]
    }
];

// COACHING METHODEN & TOOLS
const coachingMethods = [
    {
        id: "avatar_aufstellung",
        name: "Avatar-Aufstellung",
        description: "3D-Visualisierung von Spannungsfeldern und Systemen",
        tool: "DelightEx (ehemals CoSpaces)",
        url: "https://www.delightex.com",
        bestFor: ["Spannungsfelder", "Systemaufstellungen", "Inneres Team"],
        duration: "15-30 Minuten",
        phase: [2, 3]
    },
    {
        id: "skalierung",
        name: "Skalierungsfragen",
        description: "Messbarkeit von subjektiven Zuständen",
        tool: "Verbal",
        bestFor: ["Fortschrittsmessung", "Problemintensität", "Zielerreichung"],
        duration: "5-10 Minuten",
        phase: [2, 3, 4]
    },
    {
        id: "wunderfrage",
        name: "Wunderfrage",
        description: "Lösungsorientierte Imagination nach de Shazer",
        tool: "Verbal",
        bestFor: ["Lösungsvision", "Kreativität", "Perspektivenwechsel"],
        duration: "10-20 Minuten", 
        phase: [3]
    },
    {
        id: "ressourcen_mapping",
        name: "Ressourcen-Mapping",
        description: "Systematische Erfassung verfügbarer Stärken",
        tool: "Visuell/Digital",
        bestFor: ["Stärkenaktivierung", "Selbstvertrauen", "Lösungsentwicklung"],
        duration: "15-25 Minuten",
        phase: [3]
    },
    {
        id: "timeline_arbeit",
        name: "Timeline-Arbeit", 
        description: "Zeitliche Perspektive auf Vergangenheit und Zukunft",
        tool: "Visuell",
        bestFor: ["Zielsetzung", "Traumabearbeitung", "Zukunftsplanung"],
        duration: "20-40 Minuten",
        phase: [3, 4]
    }
];

// EXPORT für globale Verfügbarkeit
window.clients = clients;
window.coachingTemplates = coachingTemplates; 
window.spannungsfelder = spannungsfelder;
window.coachingMethods = coachingMethods;

// HILFSFUNKTIONEN
window.findClientById = function(id) {
    return clients.find(client => client.id === id);
};

window.findTemplateById = function(id) {
    return coachingTemplates.find(template => template.id === id);
};

window.detectSpannungsfeld = function(text) {
    const textLower = text.toLowerCase();
    return spannungsfelder.find(sf => 
        sf.keywords.some(keyword => textLower.includes(keyword))
    );
};

window.getMethodsForPhase = function(phase) {
    return coachingMethods.filter(method => 
        method.phase.includes(phase)
    );
};

window.getPromptsForCategory = function(category) {
    return Object.values(prompts).filter(prompt => 
        prompt.category === category
    );
};

// CONSOLE OUTPUT
console.log('📋 Data.js geladen:');
console.log(`👥 Clients: ${clients.length}`);
console.log(`📝 Templates: ${coachingTemplates.length}`);
console.log(`⚖️ Spannungsfelder: ${spannungsfelder.length}`);
console.log(`🛠️ Methoden: ${coachingMethods.length}`);
console.log('✅ Coaching-Datenbank bereit!');