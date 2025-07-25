// KORREKTE data.js - Echte Geißler Triadische GT1-GT12 Prompts
// Wissenschaftlich fundierte 12-Schritte Methode nach Harald Geißler

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

// ECHTE GEISSLER TRIADISCHE GT1-GT12 PROMPTS
// Wissenschaftlich fundierte 12-Schritte Methode nach Harald Geißler
const prompts = {
    // === PHASE 1: PROBLEM & ZIELBESCHREIBUNG (Schritte 1-4) ===
    
    GT1: {
        text: "Ich habe folgendes Anliegen: [PROBLEMBESCHREIBUNG]. Kannst du mir helfen, das strukturiert zu durchdenken?",
        category: "GT",
        phase: 1,
        description: "GT1 - ERSTANLIEGEN: Initiale Problembeschreibung mit KI-Unterstützung",
        methodInfo: "Schritt 1: Einleitung und erste Problem-/Zielbeschreibung"
    },
    
    GT2: {
        text: "Hier noch zusätzliche Informationen zu meinem Anliegen: [ERGÄNZUNGEN]. Bitte fasse meine Situation strukturiert zusammen und gliedere in: - Ist-Situation (was ist jetzt) - Soll-Situation (was soll werden) - Erste Hypothesen zu möglichen Ursachen",
        category: "GT",
        phase: 1,
        description: "GT2 - ZUSATZINFORMATIONEN: Erweiterte Problem- und Zielbeschreibung",
        methodInfo: "Schritt 2: Strukturierte Zusammenfassung in Ist- und Soll-Zustand"
    },
    
    GT3: {
        text: "Ich habe folgendes Bild gewählt: [BILDBESCHREIBUNG]. Was sagt dieses Bild über mein Coaching-Ziel aus? Welche unbewussten Aspekte meines Anliegens könnte es widerspiegeln?",
        category: "GT",
        phase: 1,
        description: "GT3 - SYMBOLBILD-ANALYSE: Immersive Bildarbeit zur Zielklärung",
        methodInfo: "Schritt 3: Bildgestützte Methode für emotionale Tiefe"
    },
    
    GT4: {
        text: "Bitte analysiere mein Anliegen und identifiziere mit Hilfe des Textbausteins „ausbalancierungsprobleme" dasjenige Ausbalancierungsproblem, das am besten zu meiner Situation passt. Erkläre, warum diese Spannungspole für mich relevant sind.",
        category: "GT",
        phase: 1,
        description: "GT4 - AUSBALANCIERUNGSPROBLEME: Identifikation von Spannungsfeldern",
        methodInfo: "Schritt 4: Überprüfung auf fehlende Informationen und Kernkonflikt"
    },
    
    // === PHASE 2: PROBLEMANALYSE (Schritte 5-7) ===
    
    GT5: {
        text: "Hier ist meine Schlüsselsituation: [DETAILLIERTE BESCHREIBUNG]. In diesem Moment fühlte ich: [AFFEKT/EMOTION]. Bitte analysiere diese Situation und hilf mir zu verstehen, was da passiert ist.",
        category: "GT",
        phase: 2,
        description: "GT5 - SCHLÜSSELSITUATION: Identifikation von Auslösesituation und Kernaffekt",
        methodInfo: "Schritt 5: Schlüsselsituation und Schlüsselaffekt bestimmen"
    },
    
    GT6: {
        text: "Versetze dich bitte in die Perspektive der „Bremse/des Widerstands", die in meinem obigen Transkript erwähnt wird. Welche weiteren Argumente könnte diese innere Stimme vorbringen? Was könnte ihre positive Absicht sein?",
        category: "GT",
        phase: 2,
        description: "GT6 - AVATAR-PERSPEKTIVE: Tiefenpsychologisches Interview mit innerem Team",
        methodInfo: "Schritt 6: Avatar-Aufstellung und Interview mit Persönlichkeitsanteilen"
    },
    
    GT7: {
        text: "Analysiere das obige Transkript sowie alle momentan vorliegenden Informationen zu meiner Coaching-Problematik mit Hilfe der Kategorien von Ausbalancierungsproblemen. Welche Muster erkennst du? Welche Spannungsfelder sind zentral?",
        category: "GT",
        phase: 2,
        description: "GT7 - KATEGORIEN-ANALYSE: KI-Analyse der Persönlichkeitsanteile und Ursachen",
        methodInfo: "Schritt 7: Systematische Auswertung der Avatar-Interviews"
    },
    
    // === PHASE 3: LÖSUNGSSTRATEGIE (Schritte 8-11) ===
    
    GT8: {
        text: "Formuliere auf Basis der bisherigen Erkenntnisse ein übergeordnetes Lern- und Entwicklungsziel für mich. Mache es inspirierend und motivierend, aber auch konkret umsetzbar.",
        category: "GT",
        phase: 3,
        description: "GT8 - LERNZIEL FORMULIEREN: Übergeordnetes Entwicklungsziel definieren",
        methodInfo: "Schritt 8: Das Thema hinter dem Thema - nachhaltiges Lernziel"
    },
    
    GT9: {
        text: "Gehe bitte von dieser Rangpositionierung meiner inneren Anteile aus und kläre, wie die verschiedenen Probleme und Widerstände, die auftauchen könnten, zu bewältigen wären. Welche Strategien helfen bei der Umsetzung?",
        category: "GT",
        phase: 3,
        description: "GT9 - WIDERSTAND-ANALYSE: Antizipation von Umsetzungswiderständen",
        methodInfo: "Schritt 9: Innere Widerstände aufstellen und verstehen"
    },
    
    GT10: {
        text: "Analysiere dieses Transkript: Welche realitätsprägenden Überzeugungen und inneren Regeln erkennst du, die meine Umsetzung hemmen könnten? Welche alternativen, stärkenden Glaubenssätze wären hilfreich?",
        category: "GT",
        phase: 3,
        description: "GT10 - GLAUBENSSÄTZE IDENTIFIZIEREN: KI-Analyse der Umsetzungswiderstände",
        methodInfo: "Schritt 10: Tieferliegende Überzeugungen und Regeln aufdecken"
    },
    
    GT11: {
        text: "Bitte entwickle eine Erfolgsimagination in Ich-Form für mein Ziel: [ZIEL]. Nutze emotionale, sinnliche Sprache und male mir aus, wie es sich anfühlt, wenn ich mein Ziel erreicht habe. Mache es so konkret und motivierend wie möglich.",
        category: "GT",
        phase: 3,
        description: "GT11 - ERFOLGSIMAGINATION: Entwicklung neuen Erlebens des Erfolgs",
        methodInfo: "Schritt 11: Immersive Erfolgsimagination - emotionales Umtraining"
    },
    
    // === PHASE 4: UMSETZUNG (Schritt 12) ===
    
    GT12: {
        text: "Erstelle einen konkreten Projektplan mit spezifischen Aktivitäten für die nächsten 4-6 Wochen. Berücksichtige meine verfügbare Zeit: [ZEITANGABE] und meine Ressourcen: [RESSOURCEN]. Teile die Schritte in machbare Wochenziele auf.",
        category: "GT",
        phase: 4,
        description: "GT12 - PROJEKTPLANUNG: Transfer in den Alltag mit konkretem Umsetzungsplan",
        methodInfo: "Schritt 12: Umsetzungsunterstützung und Nachhaltigkeit"
    },
    
    // === ERGÄNZENDE PROMPTS FÜR SPEZIELLE ANWENDUNGEN ===
    
    // Solution Finder Ergänzungen
    SF1: {
        text: "Stellen Sie sich vor, über Nacht geschieht ein Wunder und Ihr Problem ist gelöst. Was wäre morgen früh anders?",
        category: "SF",
        phase: 2,
        description: "Wunderfrage - Alternative zu GT11 für lösungsfokussierte Ansätze"
    },
    
    SF2: {
        text: "Auf einer Skala von 1-10, wo stehen Sie heute mit Ihrem Anliegen?",
        category: "SF",
        phase: 2,
        description: "Skalierungsfrage - Standortbestimmung und Fortschrittsmessung"
    },
    
    // Avatar-Spezial-Prompts für DelightEx Integration
    AVA1: {
        text: "Ich möchte eine Avatar-Aufstellung für mein Spannungsfeld durchführen. Bitte hilf mir, die drei wichtigsten inneren Anteile zu identifizieren: Teamchefin (Ziel), Unterstützerin (Ressource) und Bremse (Widerstand).",
        category: "AVA",
        phase: 2,
        description: "Avatar-Setup für DelightEx - Vorbereitung der Aufstellung"
    },
    
    AVA2: {
        text: "Basierend auf meiner Avatar-Aufstellung: Was sagt die 'Bremse' zu meinem Vorhaben? Welche Ängste und Bedenken äußert sie?",
        category: "AVA",
        phase: 2,
        description: "Avatar-Interview mit dem Widerstand - Tiefenexploration"
    },
    
    AVA3: {
        text: "Was antwortet die 'Unterstützerin' auf die Bedenken der Bremse? Wie können beide Seiten integriert werden?",
        category: "AVA",
        phase: 3,
        description: "Avatar-Integration - Vermittlung zwischen den Anteilen"
    },
    
    // Meta-Coaching für Prozessreflexion
    META1: {
        text: "Wie erleben Sie unser triadisches Coaching bisher? Was war besonders hilfreich?",
        category: "META",
        phase: 4,
        description: "Prozess-Reflexion - Coaching-Erfahrung bewerten"
    },
    
    META2: {
        text: "Welche Erkenntnisse aus unserem Coaching nehmen Sie mit? Was hat Sie am meisten überrascht?",
        category: "META",
        phase: 4,
        description: "Lerntransfer - Essenzen und Überraschungen"
    }
};

// Phasen-Definitionen für strukturierten Ablauf
const coachingPhases = [
    {
        id: 1,
        name: "Problem & Zielbeschreibung",
        description: "Anliegen erfassen, strukturieren und vertiefen",
        steps: ["GT1", "GT2", "GT3", "GT4"],
        duration: "20-30 Minuten",
        keyOutput: "Klare Problembeschreibung mit identifiziertem Spannungsfeld"
    },
    {
        id: 2,
        name: "Problemanalyse", 
        description: "Tiefenanalyse mit Avatar-Aufstellungen",
        steps: ["GT5", "GT6", "GT7"],
        duration: "25-35 Minuten",
        keyOutput: "Verständnis der inneren Dynamik und Ursachen"
    },
    {
        id: 3,
        name: "Lösungsstrategie",
        description: "Entwicklung nachhaltiger Veränderungsansätze",
        steps: ["GT8", "GT9", "GT10", "GT11"],
        duration: "30-40 Minuten", 
        keyOutput: "Lernziel, Widerstandsanalyse und Erfolgsimagination"
    },
    {
        id: 4,
        name: "Umsetzung",
        description: "Transfer in den Alltag",
        steps: ["GT12"],
        duration: "15-20 Minuten",
        keyOutput: "Konkreter Projektplan für die nächsten 4-6 Wochen"
    }
];

// Triadische Coaching-Templates
const coachingTemplates = [
    {
        id: 'vollstaendig_geissler',
        name: 'Vollständiges Geißler Triadisches Coaching',
        description: 'Kompletter 12-Schritte-Prozess mit allen GT1-GT12 Prompts',
        phases: ['GT1', 'GT2', 'GT3', 'GT4', 'GT5', 'GT6', 'GT7', 'GT8', 'GT9', 'GT10', 'GT11', 'GT12'],
        duration: '90-120 Minuten',
        method: 'Wissenschaftlich fundierte Triadische Gesprächsführung nach Harald Geißler'
    },
    {
        id: 'spannungsfeld_avatar',
        name: 'Spannungsfeld-Coaching mit Avatar-Aufstellungen',
        description: 'Fokus auf GT4-GT7 mit intensiver Avatar-Arbeit',
        phases: ['GT1', 'GT4', 'GT5', 'AVA1', 'AVA2', 'GT6', 'GT7', 'AVA3', 'GT11'],
        duration: '60-75 Minuten',
        method: 'Triadisches Coaching mit DelightEx Avatar-Integration'
    },
    {
        id: 'express_coaching',
        name: 'Express Triadisches Coaching',
        description: 'Kompakte Version für schnelle Problemlösung',
        phases: ['GT1', 'GT4', 'GT5', 'GT8', 'GT11', 'GT12'],
        duration: '45-60 Minuten',
        method: 'Fokussierte Anwendung der Kernschritte'
    }
];

// Ausbalancierungsprobleme (18 Dimensionen nach Geißler)
const ausbalancierungsprobleme = [
    { id: 1, name: 'Minderwertigkeit ↔ Großartigkeit', beschreibung: 'Selbstwert und Selbsteinschätzung' },
    { id: 2, name: 'Anerkennungsstreben ↔ Egozentrik', beschreibung: 'Sozialer Bezug vs. Selbstzentrierung' },
    { id: 3, name: 'Selbstinszenierung ↔ Zurückhaltung', beschreibung: 'Sichtbarkeit vs. Bescheidenheit' },
    { id: 4, name: 'Kontrolle ↔ Vertrauen', beschreibung: 'Steuerung vs. Loslassen' },
    { id: 5, name: 'Rationalität ↔ Intuition', beschreibung: 'Verstand vs. Bauchgefühl' },
    { id: 6, name: 'Nähe ↔ Distanz', beschreibung: 'Beziehungsgestaltung und Abgrenzung' },
    { id: 7, name: 'Anpassung ↔ Autonomie', beschreibung: 'Konformität vs. Eigenständigkeit' },
    { id: 8, name: 'Leistung ↔ Entspannung', beschreibung: 'Aktivität vs. Regeneration' }
];

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        clients, 
        prompts, 
        coachingPhases,
        coachingTemplates,
        ausbalancierungsprobleme 
    };
}

// SOFORTIGE GLOBAL-ZUWEISUNG
window.clients = clients;
window.prompts = prompts;
window.coachingPhases = coachingPhases;
window.coachingTemplates = coachingTemplates;
window.ausbalancierungsprobleme = ausbalancierungsprobleme;

// Debug-Ausgabe zur Bestätigung
console.log('🎯 KORREKTE Geißler data.js geladen!');
console.log(`✅ ${clients.length} Klienten verfügbar`);
console.log(`✅ ${Object.keys(prompts).length} Prompts verfügbar (GT1-GT12 + Ergänzungen)`);
console.log(`✅ ${coachingPhases.length} Coaching-Phasen definiert`);
console.log(`✅ ${coachingTemplates.length} Templates verfügbar`);
console.log('📋 Wissenschaftlich fundierte GT1-GT12 Prompts nach Harald Geißler geladen');

// Trigger für app.js
if (typeof window !== 'undefined') {
    setTimeout(() => {
        const event = new Event('dataLoaded');
        window.dispatchEvent(event);
        console.log('📡 dataLoaded Event dispatched - Geißler Prompts bereit');
    }, 100);
}