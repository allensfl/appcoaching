// Klienten-Daten
const clients = [
    {
        id: 'sarah',
        name: 'Sarah Müller',
        role: 'Projektmanagerin',
        avatar: '👩‍💼',
        lastSession: '2024-01-20',
        totalSessions: 12,
        currentGoal: 'Work-Life-Balance verbessern',
        status: 'aktiv',
        notes: 'Sehr engagiert, arbeitet gerne mit Visualisierungen'
    },
    {
        id: 'marcus',
        name: 'Marcus Schmidt',
        role: 'Vertriebsleiter', 
        avatar: '👨‍💼',
        lastSession: '2024-01-18',
        totalSessions: 8,
        currentGoal: 'Führungskompetenz stärken',
        status: 'aktiv',
        notes: 'Sehr analytisch, mag strukturierte Ansätze'
    },
    {
        id: 'lisa',
        name: 'Lisa Weber',
        role: 'Marketing-Direktorin',
        avatar: '👩‍🎨',
        lastSession: '2024-01-15',
        totalSessions: 15,
        currentGoal: 'Kreativität und Innovation fördern',
        status: 'aktiv',
        notes: 'Kreativ und offen für neue Methoden'
    },
    {
        id: 'werner',
        name: 'Werner Hoffmann',
        role: 'IT-Leiter',
        avatar: '👨‍💻',
        lastSession: '2024-01-22',
        totalSessions: 6,
        currentGoal: 'Stressmanagement und Delegation',
        status: 'aktiv',
        notes: 'Technisch versiert, bevorzugt systematische Herangehensweise'
    }
];

// Echte GT1-GT12 Prompts aus der bereitgestellten Dokumentation
const prompts = {
    // GT-Prompts (Geißler Triadisch 1-12)
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
    
    // Solution Finder Prompts
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
    SF3: {
        text: "Was ist bereits gut und sollte so bleiben?",
        category: "SF",
        phase: 2,
        description: "Ressourcen-Fokus"
    },
    SF4: {
        text: "Wann war es schon einmal besser? Was war damals anders?",
        category: "SF",
        phase: 2,
        description: "Ausnahmen finden"
    },
    SF5: {
        text: "Was würden andere bemerken, wenn Sie einen Schritt weitergekommen sind?",
        category: "SF",
        phase: 3,
        description: "Externe Perspektive"
    },
    
    // Diagnostische Prompts
    DIAG1: {
        text: "Wie geht es Ihnen damit?",
        category: "DIAG",
        phase: 2,
        description: "Emotionale Befindlichkeit"
    },
    DIAG2: {
        text: "Was löst das in Ihnen aus?",
        category: "DIAG",
        phase: 2, 
        description: "Innere Reaktion"
    },
    DIAG3: {
        text: "Welche Gedanken gehen Ihnen durch den Kopf?",
        category: "DIAG",
        phase: 2,
        description: "Gedankenmuster"
    },
    DIAG4: {
        text: "Was spüren Sie körperlich dabei?",
        category: "DIAG",
        phase: 2,
        description: "Körperwahrnehmung"
    },
    DIAG5: {
        text: "Welche Erinnerungen kommen hoch?",
        category: "DIAG",
        phase: 2,
        description: "Assoziationen"
    },
    
    // Lösungsorientierte Prompts  
    LÖS1: {
        text: "Was wäre, wenn das Problem nicht mehr da wäre?",
        category: "LÖS",
        phase: 3,
        description: "Lösungsvision"
    },
    LÖS2: {
        text: "Welche Fähigkeiten haben Sie, die hilfreich sein könnten?",
        category: "LÖS", 
        phase: 3,
        description: "Ressourcen aktivieren"
    },
    LÖS3: {
        text: "Was würde X (wichtige Person) Ihnen raten?",
        category: "LÖS",
        phase: 3,
        description: "Perspektivwechsel"
    },
    LÖS4: {
        text: "Welche Unterstützung bräuchten Sie?",
        category: "LÖS",
        phase: 3,
        description: "Support-Bedarf"
    },
    LÖS5: {
        text: "Was wäre ein kleiner, machbarer Schritt?",
        category: "LÖS",
        phase: 4,
        description: "Konkrete Handlung"
    },
    
    // Meta-Coaching Prompts
    META1: {
        text: "Wie erleben Sie unser Gespräch?",
        category: "META",
        phase: 4,
        description: "Prozess-Reflexion"
    },
    META2: {
        text: "Was ist für Sie hilfreich gewesen?",
        category: "META",
        phase: 4,
        description: "Wirksamkeit bewerten"
    },
    META3: {
        text: "Was nehmen Sie mit?",
        category: "META",
        phase: 4,
        description: "Essenz extrahieren"
    },
    META4: {
        text: "Welche Fragen sind noch offen?",
        category: "META",
        phase: 4,
        description: "Offene Punkte"
    },
    META5: {
        text: "Wie geht es für Sie weiter?",
        category: "META",
        phase: 4,
        description: "Transfer planen"
    }
};

// Coaching Templates
const coachingTemplates = [
    {
        id: 'spannungsfeld',
        name: 'Spannungsfeld-Analyse',
        description: 'Systematische Bearbeitung von Spannungsfeldern mit GT4-GT12',
        phases: ['GT4', 'GT5', 'GT6', 'GT7', 'GT8', 'GT9', 'GT10', 'GT11', 'GT12'],
        duration: '45-60 Minuten',
        method: 'Triadische Gesprächsführung'
    },
    {
        id: 'lösungsfokus',
        name: 'Lösungsfokussiertes Coaching',
        description: 'Ressourcenorientierte Lösungsentwicklung',
        phases: ['SF1', 'SF2', 'SF3', 'SF4', 'SF5', 'LÖS1', 'LÖS2', 'LÖS5'],
        duration: '30-45 Minuten', 
        method: 'Solution Focused Coaching'
    }
];

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { clients, prompts, coachingTemplates };
}

// Global verfügbar machen
window.clients = clients;
window.prompts = prompts;
window.coachingTemplates = coachingTemplates;