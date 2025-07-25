// COACH MISSION CONTROL - Data.js
// Vollständige Geißler Triadische Coaching Prompts
// Wissenschaftlich fundierte 12-Schritte-Methode nach Harald Geißler

// === ECHTE GEISSLER GT1-GT12 PROMPTS ===
const prompts = {
    // ======= PHASE 1: PROBLEM & ZIELBESCHREIBUNG (Schritte 1-4) =======
    GT1: {
        text: "Ich habe folgendes Anliegen: [PROBLEMBESCHREIBUNG]. Kannst du mir helfen, das strukturiert zu durchdenken?",
        category: "GT",
        phase: 1,
        step: "Erstanliegen",
        description: "Fokus auf konkrete Umsetzung und Überwindung von Hindernissen. Für Klienten, die bereits Klarheit haben.",
        prompts: ["GT9", "GT10", "GT11", "GT12"],
        phases: "Phase 3-4: Hindernisse überwinden → Konkreter Plan",
        suitableFor: "Umsetzungsprobleme, Prokrastination, Motivationsschwierigkeiten"
    },
    {
        id: 7,
        name: "Führungskräfte-Coaching",
        duration: "100 Min",
        method: "GT1,GT4,GT6,GT9,META1",
        category: "Leadership",
        description: "Speziell für Führungskräfte entwickelt mit Fokus auf Rollenkonflikte und Führungsherausforderungen.",
        prompts: ["GT1", "GT4", "GT6", "GT9", "META1"],
        phases: "Problem → Spannungsfeld → Widerstände → Strategien → Reflexion",
        suitableFor: "Führungskräfte, Rollenkonflikte, Teamführung"
    },
    {
        id: 8,
        name: "Team-Konflikt-Coaching",
        duration: "90 Min",
        method: "GT1,GT5,AVA2,GT7,GT8",
        category: "Konflikt",
        description: "Systematische Bearbeitung von Teamkonflikten und zwischenmenschlichen Herausforderungen.",
        prompts: ["GT1", "GT5", "AVA2", "GT7", "GT8"],
        phases: "Problem → Schlüsselsituation → Perspektiven → Muster → Ziel",
        suitableFor: "Teamkonflikte, zwischenmenschliche Probleme, Kommunikation"
    }
];

// === GLOBALE ZUWEISUNG FÜR SOFORTIGE VERFÜGBARKEIT ===
window.prompts = prompts;
window.clients = clients;
window.templates = templates;
window.ausbalancierungsprobleme = ausbalancierungsprobleme;

// === DEBUG OUTPUT ===
console.log('✅ Coach Mission Control Data geladen:');
console.log('📝 Prompts:', Object.keys(prompts).length);
console.log('👥 Klienten:', clients.length);
console.log('📋 Templates:', templates.length);
console.log('⚖️ Ausbalancierungsprobleme:', Object.keys(ausbalancierungsprobleme).length);

// === EVENT FÜR APP.JS ===
document.dispatchEvent(new CustomEvent('dataLoaded', {
    detail: {
        prompts: prompts,
        clients: clients,
        templates: templates,
        ausbalancierungsprobleme: ausbalancierungsprobleme
    }
}));

// === EXPORTIERUNG FÜR MODULE ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        prompts,
        clients,
        templates,
        ausbalancierungsprobleme
    };
}

// MEILENSTEIN MARKER
console.log('🎉 HISTORISCH: Vollständige Geißler GT1-GT12 Prompts geladen - 25.07.2025, 15:30 Uhr');PHASE 1: PROBLEM & ZIELBESCHREIBUNG - Strukturierte Erfassung des Coaching-Anliegens",
        methodology: "Offene Eingangsfrage zur Erfassung des Hauptanliegens"
    },

    GT2: {
        text: "Hier noch zusätzliche Informationen zu meinem Anliegen: [ERGÄNZUNGEN]. Bitte fasse meine Situation strukturiert zusammen und gliedere in:\n- Ist-Situation (was ist jetzt)\n- Soll-Situation (was soll werden)\n- Erste Hypothesen zu möglichen Ursachen",
        category: "GT",
        phase: 1,
        step: "Zusatzinformationen",
        description: "Strukturierung der Situation in Ist-/Soll-Zustand und erste Ursachenhypothesen",
        methodology: "Systematische Informationssammlung und -strukturierung"
    },

    GT3: {
        text: "Ich habe folgendes Bild gewählt: [BILDBESCHREIBUNG]. Was sagt dieses Bild über mein Coaching-Ziel aus? Welche unbewussten Aspekte meines Anliegens könnte es widerspiegeln?",
        category: "GT",
        phase: 1,
        step: "Symbolbild-Analyse",
        description: "Erschließung unbewusster Aspekte durch Bildanalyse und Symbolarbeit",
        methodology: "Projektive Technik zur Aufdeckung unbewusster Inhalte"
    },

    GT4: {
        text: "Bitte analysiere mein Anliegen und identifiziere mit Hilfe des Textbausteins 'Ausbalancierungsprobleme' das Ausbalancierungsproblem, das am besten zu meiner Situation passt. Erkläre, warum diese Spannungspole für mich relevant sind.",
        category: "GT",
        phase: 1,
        step: "Ausbalancierungsprobleme",
        description: "Identifikation der zentralen Spannungsfelder und Polaritäten",
        methodology: "Systematische Spannungsfeld-Analyse nach Geißler"
    },

    // ======= PHASE 2: PROBLEMANALYSE (Schritte 5-7) =======
    GT5: {
        text: "Hier ist meine Schlüsselsituation: [DETAILLIERTE BESCHREIBUNG]. In diesem Moment fühlte ich: [AFFEKT/EMOTION]. Bitte analysiere diese Situation und hilf mir zu verstehen, was da passiert ist.",
        category: "GT",
        phase: 2,
        step: "Schlüsselsituation",
        description: "PHASE 2: PROBLEMANALYSE - Analyse der entscheidenden Situation mit emotionalen Aspekten",
        methodology: "Situationsanalyse mit Fokus auf affektive Komponenten"
    },

    GT6: {
        text: "Versetze dich bitte in die Perspektive der 'Bremse/des Widerstands', die in meinem obigen Transkript erwähnt wird. Welche weiteren Argumente könnte diese innere Stimme vorbringen? Was könnte ihre positive Absicht sein?",
        category: "GT",
        phase: 2,
        step: "Avatar-Perspektive",
        description: "Verstehen der inneren Widerstände und deren positive Absichten durch Perspektivwechsel",
        methodology: "Avatar-Technik zur Externalisierung innerer Konflikte"
    },

    GT7: {
        text: "Analysiere das obige Transkript sowie alle momentan vorliegenden Informationen zu meiner Coaching-Problematik mit Hilfe der Kategorien von Ausbalancierungsproblemen. Welche Muster erkennst du? Welche Spannungsfelder sind zentral?",
        category: "GT",
        phase: 2,
        step: "Kategorien-Analyse",
        description: "Systematische Musteranalyse der Spannungsfelder mit dem Kategorien-System",
        methodology: "Umfassende Problemanalyse mittels Ausbalancierungskategorien"
    },

    // ======= PHASE 3: LÖSUNGSSTRATEGIE (Schritte 8-11) =======
    GT8: {
        text: "Formuliere auf Basis der bisherigen Erkenntnisse ein übergeordnetes Lern- und Entwicklungsziel für mich. Mache es inspirierend und motivierend, aber auch konkret umsetzbar.",
        category: "GT",
        phase: 3,
        step: "Lernziel formulieren",
        description: "PHASE 3: LÖSUNGSSTRATEGIE - Entwicklung eines inspirierenden und umsetzbaren Hauptziels",
        methodology: "Zielformulierung auf Basis der Problemanalyse"
    },

    GT9: {
        text: "Gehe bitte von dieser Rangpositionierung meiner inneren Anteile aus und kläre, wie die verschiedenen Probleme und Widerstände, die auftauchen könnten, zu bewältigen wären. Welche Strategien helfen bei der Umsetzung?",
        category: "GT",
        phase: 3,
        step: "Widerstand-Analyse",
        description: "Strategien zur Überwindung von Umsetzungshindernissen und inneren Widerständen",
        methodology: "Systematische Widerstandsanalyse und Strategieentwicklung"
    },

    GT10: {
        text: "Analysiere dieses Transkript: Welche realitätsprägenden Überzeugungen und inneren Regeln erkennst du, die meine Umsetzung hemmen könnten? Welche alternativen, stärkenden Glaubenssätze wären hilfreich?",
        category: "GT",
        phase: 3,
        step: "Glaubenssätze identifizieren",
        description: "Transformation limitierender Überzeugungen in stärkende Glaubenssätze",
        methodology: "Kognitive Umstrukturierung limitierender Beliefs"
    },

    GT11: {
        text: "Bitte entwickle eine Erfolgsimagination in Ich-Form für mein Ziel: [ZIEL]. Nutze emotionale, sinnliche Sprache und male mir aus, wie es sich anfühlt, wenn ich mein Ziel erreicht habe. Mache es so konkret und motivierend wie möglich.",
        category: "GT",
        phase: 3,
        step: "Erfolgsimagination",
        description: "Emotionale Verankerung des Zielerreichungszustands durch sinnliche Imagination",
        methodology: "Visualisierungstechnik zur Motivation und Zielfokussierung"
    },

    // ======= PHASE 4: UMSETZUNG (Schritt 12) =======
    GT12: {
        text: "Erstelle einen konkreten Projektplan mit spezifischen Aktivitäten für die nächsten 4-6 Wochen. Berücksichtige meine verfügbare Zeit: [ZEITANGABE] und meine Ressourcen: [RESSOURCEN]. Teile die Schritte in machbare Wochenziele auf.",
        category: "GT",
        phase: 4,
        step: "Projektplanung",
        description: "PHASE 4: UMSETZUNG - Konkreter Aktionsplan mit zeitlichen und ressourcenbezogenen Faktoren",
        methodology: "Strukturierte Handlungsplanung mit realistischen Meilensteinen"
    },

    // ======= ERGÄNZENDE PROMPTS =======
    
    // Avatar-Aufstellungen für DelightEx Integration
    AVA1: {
        text: "Stelle dir vor, deine verschiedenen inneren Anteile stehen in einem Raum. Wo würdest du den 'Sicherheitsaspekt', den 'Wachstumsaspekt' und den 'Zweifel' positionieren? Beschreibe ihre Körperhaltung und ihren Gesichtsausdruck.",
        category: "Avatar",
        phase: 2,
        step: "Innere Aufstellung",
        description: "Räumliche Darstellung innerer Konflikte durch Avatar-Aufstellung",
        methodology: "DelightEx Avatar-Integration für triadisches Coaching"
    },

    AVA2: {
        text: "Wechsle nacheinander in die Position jedes Avatars. Was würde jeder zu deinem Anliegen sagen? Beginne mit dem 'Sicherheitsaspekt'.",
        category: "Avatar",
        phase: 2,
        step: "Perspektivwechsel",
        description: "Systematischer Perspektivwechsel durch Avatar-Rollen",
        methodology: "Empathische Rollenarbeit zur Konfliktlösung"
    },

    AVA3: {
        text: "Gibt es eine Position im Raum, von der aus alle drei Aspekte gleichermaßen gesehen und gehört werden können? Stelle dich dorthin und beschreibe, was du wahrnimmst.",
        category: "Avatar",
        phase: 3,
        step: "Integration",
        description: "Integration der verschiedenen inneren Anteile durch Metaposition",
        methodology: "Systemische Integration durch räumliche Neupositionierung"
    },

    // Solution Finder
    SF1: {
        text: "Wenn du dir vorstellst, dein Problem wäre bereits gelöst - was wäre dann anders? Beschreibe einen typischen Tag in diesem Zustand.",
        category: "Solution",
        phase: 3,
        step: "Zukunftsfokus",
        description: "Lösungsorientierte Zukunftsprojektion",
        methodology: "Solution-focused Brief Therapy Ansatz"
    },

    SF2: {
        text: "Auf einer Skala von 1-10, wo stehst du heute bezüglich deines Ziels? Was bräuchte es, um einen Punkt höher zu kommen?",
        category: "Solution",
        phase: 3,
        step: "Skalierung",
        description: "Prozessfortschritt durch Skalierung messbar machen",
        methodology: "Skalierungstechnik für konkrete Schritte"
    },

    // Meta-Coaching Prompts
    META1: {
        text: "Wie geht es dir mit unserem Coaching-Prozess bis hierhin? Was hilft dir besonders, was irritiert dich eventuell?",
        category: "Meta",
        phase: 0,
        step: "Prozessreflexion",
        description: "Reflexion des Coaching-Prozesses selbst",
        methodology: "Meta-Kommunikation zur Prozessoptimierung"
    },

    META2: {
        text: "Wenn du unserem Coaching-Prozess einen Namen geben würdest - wie würde er heißen? Was charakterisiert ihn für dich?",
        category: "Meta",
        phase: 0,
        step: "Prozessmetapher",
        description: "Metaphorische Beschreibung des Coaching-Verlaufs",
        methodology: "Narrative Techniken zur Prozessreflexion"
    }
};

// === AUSBALANCIERUNGSPROBLEME NACH GEISSLER ===
const ausbalancierungsprobleme = {
    "Autonomie vs Verbundenheit": "Zwischen Selbstständigkeit und sozialen Bindungen",
    "Sicherheit vs Entfaltung": "Zwischen Stabilität und Wachstum/Risiko",
    "Gegenwart vs Zukunft": "Zwischen Hier-und-Jetzt und langfristiger Planung",
    "Innen vs Außen": "Zwischen Selbstreflexion und Weltbezug",
    "Struktur vs Flexibilität": "Zwischen Ordnung und Spontaneität",
    "Leistung vs Entspannung": "Zwischen Produktivität und Regeneration",
    "Nähe vs Distanz": "Zwischen Intimität und Abgrenzung",
    "Kontrolle vs Vertrauen": "Zwischen Steuerung und Loslassen",
    "Kontinuität vs Wandel": "Zwischen Beständigkeit und Veränderung",
    "Perfektion vs Akzeptanz": "Zwischen hohen Standards und Selbstannahme",
    "Individual vs Kollektiv": "Zwischen persönlichen und Gruppeninteressen",
    "Rational vs Emotional": "Zwischen Verstand und Gefühl",
    "Aktivität vs Passivität": "Zwischen Handeln und Geschehenlassen",
    "Offenheit vs Schutz": "Zwischen Verletzlichkeit und Selbstschutz",
    "Konkurrenz vs Kooperation": "Zwischen Wettkampf und Zusammenarbeit",
    "Tradition vs Innovation": "Zwischen Bewährtem und Neuem",
    "Einfachheit vs Komplexität": "Zwischen Reduktion und Differenzierung",
    "Idealismus vs Pragmatismus": "Zwischen Visionen und Realitätssinn"
};

// === KLIENTEN-DATEN ===
const clients = [
    {
        id: 1,
        name: "Sarah Müller",
        age: 34,
        profession: "Marketing Managerin",
        challenge: "Work-Life-Balance und Karriereplanung",
        avatar: "👩‍💼",
        background: "Ambitionierte Führungskraft mit jungem Kind, sucht Balance zwischen Karriere und Familie",
        goals: ["Bessere Work-Life-Balance", "Karriereentscheidung treffen", "Stressmanagement"],
        strengths: ["Analytisches Denken", "Empathie", "Organisationstalent"],
        lastSession: "2025-07-20"
    },
    {
        id: 2,
        name: "Dr. Michael Weber",
        age: 45,
        profession: "Führungskraft IT-Bereich",
        challenge: "Führungsstil und Teamkommunikation",
        avatar: "👨‍💼",
        background: "Erfahrener Fachexperte in neuer Führungsrolle, technischer Background",
        goals: ["Führungskompetenzen entwickeln", "Teamkommunikation verbessern", "Delegation lernen"],
        strengths: ["Technische Expertise", "Problemlösungsfähigkeit", "Zuverlässigkeit"],
        lastSession: "2025-07-18"
    },
    {
        id: 3,
        name: "Lisa Chen",
        age: 28,
        profession: "Software Entwicklerin",
        challenge: "Selbstvertrauen und Kommunikation im Team",
        avatar: "👩‍💻",
        background: "Talentierte Entwicklerin, introvertiert, möchte sich stärker einbringen",
        goals: ["Selbstvertrauen stärken", "Kommunikation verbessern", "Sichtbarkeit erhöhen"],
        strengths: ["Technische Brillanz", "Detailgenauigkeit", "Lernbereitschaft"],
        lastSession: "2025-07-22"
    },
    {
        id: 4,
        name: "Thomas Schmidt",
        age: 52,
        profession: "Projektleiter im Maschinenbau",
        challenge: "Veränderungsmanagement und Generationenkonflikt",
        avatar: "👨‍🔧",
        background: "Erfahrener Projektleiter, steht vor Digitalisierungsherausforderungen",
        goals: ["Change Management", "Digitale Transformation", "Brücke zwischen Generationen"],
        strengths: ["Erfahrung", "Ruhe", "Vermittlungsfähigkeit"],
        lastSession: "2025-07-19"
    }
];

// === COACHING TEMPLATES ===
const templates = [
    {
        id: 1,
        name: "Vollständiges Geißler Triadisches Coaching",
        duration: "120 Min",
        method: "GT1-GT12",
        category: "Vollprogramm",
        description: "Kompletter 12-Schritte-Prozess nach Harald Geißler für tiefgreifende Coaching-Prozesse. Wissenschaftlich fundierte Methode für nachhaltige Veränderungen.",
        prompts: ["GT1", "GT2", "GT3", "GT4", "GT5", "GT6", "GT7", "GT8", "GT9", "GT10", "GT11", "GT12"],
        phases: "Alle 4 Phasen: Problem → Analyse → Lösung → Umsetzung",
        suitableFor: "Komplexe Anliegen, tiefgreifende Veränderungen, strategische Entscheidungen"
    },
    {
        id: 2,
        name: "Spannungsfeld-Coaching mit Avatar-Aufstellungen",
        duration: "90 Min",
        method: "GT1,GT4,AVA1,AVA2,AVA3,GT8",
        category: "Avatar-Integration",
        description: "Speziell für DelightEx entwickelte Kombination aus Geißler-Methodik und Avatar-Aufstellungen für die Arbeit mit inneren Konflikten.",
        prompts: ["GT1", "GT4", "AVA1", "AVA2", "AVA3", "GT8"],
        phases: "Problem → Spannungsfeld → Avatar-Arbeit → Zielentwicklung",
        suitableFor: "Innere Konflikte, Entscheidungsfindung, Werteklarifikation"
    },
    {
        id: 3,
        name: "Express Triadisches Coaching",
        duration: "45-60 Min",
        method: "GT1,GT4,GT8,GT12",
        category: "Express",
        description: "Kompakte Version für schnelle Ergebnisse und erste Klarheit. Kernschritte aller vier Phasen in konzentrierter Form.",
        prompts: ["GT1", "GT4", "GT8", "GT12"],
        phases: "Schnelldurchlauf: Problem → Spannungsfeld → Ziel → Plan",
        suitableFor: "Zeitdruck, erste Orientierung, konkrete Fragestellungen"
    },
    {
        id: 4,
        name: "Intensive Problemanalyse",
        duration: "90 Min",
        method: "GT1-GT7",
        category: "Analyse",
        description: "Fokus auf tiefgreifende Problemanalyse und Musterverständnis. Besonders geeignet für komplexe, verwirrende Situationen.",
        prompts: ["GT1", "GT2", "GT3", "GT4", "GT5", "GT6", "GT7"],
        phases: "Phase 1-2: Problem verstehen und analysieren",
        suitableFor: "Unklare Situationen, wiederkehrende Probleme, Selbstreflexion"
    },
    {
        id: 5,
        name: "Kreative Zielentwicklung",
        duration: "75 Min",
        method: "GT3,GT8,GT11,SF1,SF2",
        category: "Zielfindung",
        description: "Kreativer Ansatz zur Zielentwicklung mit Symbolarbeit und Zukunftsimaginationen.",
        prompts: ["GT3", "GT8", "GT11", "SF1", "SF2"],
        phases: "Kreativität → Vision → Imagination → Umsetzung",
        suitableFor: "Orientierungslosigkeit, neue Lebensphasen, Visionsentwicklung"
    },
    {
        id: 6,
        name: "Umsetzungs-Coaching",
        duration: "60 Min",
        method: "GT9,GT10,GT11,GT12",
        category: "Implementation",
        description: "