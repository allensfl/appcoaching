// CLEAN data.js - Syntax Error behoben
// Echte Geißler GT1-GT12 Prompts ohne Syntax-Probleme

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

// ECHTE GEISSLER GT1-GT12 PROMPTS - SYNTAX CLEAN
const prompts = {
    GT1: {
        text: "Ich habe folgendes Anliegen: [PROBLEMBESCHREIBUNG]. Kannst du mir helfen, das strukturiert zu durchdenken?",
        category: "GT",
        phase: 1,
        description: "GT1 - ERSTANLIEGEN: Initiale Problembeschreibung mit KI-Unterstützung"
    },
    GT2: {
        text: "Hier noch zusätzliche Informationen zu meinem Anliegen: [ERGÄNZUNGEN]. Bitte fasse meine Situation strukturiert zusammen und gliedere in: - Ist-Situation (was ist jetzt) - Soll-Situation (was soll werden) - Erste Hypothesen zu möglichen Ursachen",
        category: "GT",
        phase: 1,
        description: "GT2 - ZUSATZINFORMATIONEN: Erweiterte Problem- und Zielbeschreibung"
    },
    GT3: {
        text: "Ich habe folgendes Bild gewählt: [BILDBESCHREIBUNG]. Was sagt dieses Bild über mein Coaching-Ziel aus? Welche unbewussten Aspekte meines Anliegens könnte es widerspiegeln?",
        category: "GT",
        phase: 1,
        description: "GT3 - SYMBOLBILD-ANALYSE: Immersive Bildarbeit zur Zielklärung"
    },
    GT4: {
        text: "Bitte analysiere mein Anliegen und identifiziere mit Hilfe des Textbausteins Ausbalancierungsprobleme das Ausbalancierungsproblem, das am besten zu meiner Situation passt. Erkläre, warum diese Spannungspole für mich relevant sind.",
        category: "GT",
        phase: 2,
        description: "GT4 - AUSBALANCIERUNGSPROBLEME: Identifikation von Spannungsfeldern"
    },
    GT5: {
        text: "Hier ist meine Schlüsselsituation: [DETAILLIERTE BESCHREIBUNG]. In diesem Moment fühlte ich: [AFFEKT/EMOTION]. Bitte analysiere diese Situation und hilf mir zu verstehen, was da passiert ist.",
        category: "GT",
        phase: 2,
        description: "GT5 - SCHLÜSSELSITUATION: Identifikation von Auslösesituation und Kernaffekt"
    },
    GT6: {
        text: "Versetze dich bitte in die Perspektive der Bremse/des Widerstands, die in meinem obigen Transkript erwähnt wird. Welche weiteren Argumente könnte diese innere Stimme vorbringen? Was könnte ihre positive Absicht sein?",
        category: "GT",
        phase: 2,
        description: "GT6 - AVATAR-PERSPEKTIVE: Tiefenpsychologisches Interview mit innerem Team"
    },
    GT7: {
        text: "Analysiere das obige Transkript sowie alle momentan vorliegenden Informationen zu meiner Coaching-Problematik mit Hilfe der Kategorien von Ausbalancierungsproblemen. Welche Muster erkennst du? Welche Spannungsfelder sind zentral?",
        category: "GT",
        phase: 2,
        description: "GT7 - KATEGORIEN-ANALYSE: KI-Analyse der Persönlichkeitsanteile und Ursachen"
    },
    GT8: {
        text: "Formuliere auf Basis der bisherigen Erkenntnisse ein übergeordnetes Lern- und Entwicklungsziel für mich. Mache es inspirierend und motivierend, aber auch konkret umsetzbar.",
        category: "GT",
        phase: 3,
        description: "GT8 - LERNZIEL FORMULIEREN: Übergeordnetes Entwicklungsziel definieren"
    },
    GT9: {
        text: "Gehe bitte von dieser Rangpositionierung meiner inneren Anteile aus und kläre, wie die verschiedenen Probleme und Widerstände, die auftauchen könnten, zu bewältigen wären. Welche Strategien helfen bei der Umsetzung?",
        category: "GT",
        phase: 3,
        description: "GT9 - WIDERSTAND-ANALYSE: Antizipation von Umsetzungswiderständen"
    },
    GT10: {
        text: "Analysiere dieses Transkript: Welche realitätsprägenden Überzeugungen und inneren Regeln erkennst du, die meine Umsetzung hemmen könnten? Welche alternativen, stärkenden Glaubenssätze wären hilfreich?",
        category: "GT",
        phase: 3,
        description: "GT10 - GLAUBENSSÄTZE IDENTIFIZIEREN: KI-Analyse der Umsetzungswiderstände"
    },
    GT11: {
        text: "Bitte entwickle eine Erfolgsimagination in Ich-Form für mein Ziel: [ZIEL]. Nutze emotionale, sinnliche Sprache und male mir aus, wie es sich anfühlt, wenn ich mein Ziel erreicht habe. Mache es so konkret und motivierend wie möglich.",
        category: "GT",
        phase: 3,
        description: "GT11 - ERFOLGSIMAGINATION: Entwicklung neuen Erlebens des Erfolgs"
    },
    GT12: {
        text: "Erstelle einen konkreten Projektplan mit spezifischen Aktivitäten für die nächsten 4-6 Wochen. Berücksichtige meine verfügbare Zeit: [ZEITANGABE] und meine Ressourcen: [RESSOURCEN]. Teile die Schritte in machbare Wochenziele auf.",
        category: "GT",
        phase: 4,
        description: "GT12 - PROJEKTPLANUNG: Transfer in den Alltag mit konkretem Umsetzungsplan"
    },
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
    AVA1: {
        text: "Ich möchte eine Avatar-Aufstellung für mein Spannungsfeld durchführen. Bitte hilf mir, die drei wichtigsten inneren Anteile zu identifizieren: Teamchefin (Ziel), Unterstützerin (Ressource) und Bremse (Widerstand).",
        category: "AVA",
        phase: 2,
        description: "Avatar-Setup für DelightEx - Vorbereitung der Aufstellung"
    },
    AVA2: {
        text: "Basierend auf meiner Avatar-Aufstellung: Was sagt die Bremse zu meinem Vorhaben? Welche Ängste und Bedenken äußert sie?",
        category: "AVA",
        phase: 2,
        description: "Avatar-Interview mit dem Widerstand - Tiefenexploration"
    },
    AVA3: {
        text: "Was antwortet die Unterstützerin auf die Bedenken der Bremse? Wie können beide Seiten integriert werden?",
        category: "AVA",
        phase: 3,
        description: "Avatar-Integration - Vermittlung zwischen den Anteilen"
    },
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

// Coaching Templates
const coachingTemplates = [
    {
        id: 'vollstaendig_geissler',
        name: 'Vollständiges Geißler Triadisches Coaching',
        description: 'Kompletter 12-Schritte-Prozess mit allen GT1-GT12 Prompts',
        phases: ['GT1', 'GT2', 'GT3', 'GT4', 'GT5', 'GT6', 'GT7', 'GT8', 'GT9', 'GT10', 'GT11', 'GT12'],
        duration: '90-120 Minuten',
        method: 'Wissenschaftlich fundierte Triadische Gesprächsführung nach Harald Geißler'
    }
];

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { clients, prompts, coachingTemplates };
}

// SOFORTIGE GLOBAL-ZUWEISUNG
window.clients = clients;
window.prompts = prompts;
window.coachingTemplates = coachingTemplates;

// Debug-Ausgabe
console.log('🎯 CLEAN Geißler data.js geladen!');
console.log('✅ Clients:', clients.length);
console.log('✅ Prompts:', Object.keys(prompts).length);
console.log('✅ GT1-GT12 Prompts nach Harald Geißler');

// Event für app.js
if (typeof window !== 'undefined') {
    setTimeout(() => {
        const event = new Event('dataLoaded');
        window.dispatchEvent(event);
        console.log('📡 dataLoaded Event dispatched');
    }, 100);
}