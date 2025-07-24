// Globale Variablen
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
    timestamp: null
};
let selectedImageForStep3 = null; // Für Schritt 3: Ausgewähltes Bild
let avatarStatements = {}; // Für Schritt 6 & 9: Aussagen der Avatare

// OpenAI API Key - BITTE HIER DEINEN ECHTEN KEY EINFÜGEN!
// ACHTUNG: Für eine echte Produktionsumgebung sollte dieser Key serverseitig sicher verwaltet werden.
const OPENAI_API_KEY = ""; 

// Daten (früher in data.js, jetzt direkt hier integriert)
const templateRepository = [
    {
        title: "🌐 Systemische Zirkuläre Frage",
        keywords: ["systemisch", "zirkulär", "umfeld", "beziehung"],
        preview: "Wer in Ihrem Umfeld würde sagen...",
        prompt: "Entwickle 3-5 systemische zirkuläre Fragen für [PROBLEM]. Format: 'Wer würde...' oder 'Was würde [Person] sagen...'"
    },
    {
        title: "💪 Ressourcen-Aktivierung", 
        keywords: ["ressourcen", "stärken", "erfolg", "potentiale"],
        preview: "Erzählen Sie von einem Erfolg...",
        prompt: "Analysiere Stärken und Ressourcen in [SITUATION]. Erfolgsgeschichten, Bewältigungsstrategien, soziale Unterstützung."
    },
    {
        title: "⚖️ Skalierungsfrage",
        keywords: ["skalierung", "skala", "grad", "bewertung"], 
        preview: "Auf einer Skala von 1-10...",
        prompt: "Entwickle Skalierungsfragen für [THEMA]. Dimensionen: Klarheit, Motivation, Selbstvertrauen."
    },
    {
        title: "🎨 Metaphern-Arbeit",
        keywords: ["metapher", "bild", "symbol", "landschaft"],
        preview: "Wenn Ihre Situation ein Bild wäre...", 
        prompt: "Entwickle Metaphern-Fragen für [SITUATION]. Landschaft, Wetter, Reise, Gebäude, Tiere."
    },
    {
        title: "✨ Wunderfrage",
        keywords: ["wunder", "zukunft", "veränderung", "lösung"],
        preview: "Über Nacht geschieht ein Wunder...",
        prompt: "Formuliere detaillierte Wunderfrage für [PROBLEM]. Was wäre anders? Wer würde es merken?"
    },
    {
        title: "👥 Teile-Arbeit",
        keywords: ["teile", "anteile", "ambivalenz", "konflikt"],
        preview: "Ein Teil von Ihnen möchte...",
        prompt: "Analysiere innere Anteile bei [KONFLIKT]. Welche Stimmen? Welche Bedürfnisse?"
    },
    {
        title: "🔍 Ausnahmen erforschen",
        keywords: ["ausnahme", "unterschied", "besser", "anders"],
        preview: "Wann war es schon mal anders?",
        prompt: "Erfrage Ausnahmen vom Problem bei [SITUATION]. Wann besser? Was anders?"
    },
    {
        title: "🎯 Zielfokussierung",
        keywords: ["ziel", "fokus", "richtung", "zeichen"],
        preview: "Was wäre das erste Zeichen...",
        prompt: "Entwickle zielgerichtete Fragen für [ZIEL]. Konkrete Schritte, messbare Ergebnisse."
    },
    {
        title: "🔄 Reframing-Techniken",
        keywords: ["reframing", "perspektive", "umdeutung", "sichtweise"],
        preview: "Betrachten wir das aus einem anderen Blickwinkel...",
        prompt: "Entwickle Reframing-Optionen für [PROBLEM]. Alternative Sichtweisen, positive Umdeutungen."
    },
    {
        title: "🌱 Entwicklungsschritte",
        keywords: ["entwicklung", "wachstum", "schritte", "prozess"],
        preview: "Welcher kleine Schritt könnte der erste sein?",
        prompt: "Definiere konkrete Entwicklungsschritte für [ZIEL]. Kleine, erreichbare Meilensteine."
    }
];

const clients = {
    sarah: {
        name: "Sarah Weber",
        age: "35 Jahre, Marketing-Managerin", 
        problem: "Karrierewechsel-Entscheidung zwischen Sicherheit und Nachhaltigkeit",
        background: "10 Jahre Marketing-Erfahrung, träumt von nachhaltiger Arbeit"
    },
    marcus: {
        name: "Marcus Schmidt",
        age: "48 Jahre, Ingenieur",
        problem: "Midlife-Krise und Wunsch nach beruflicher Neuorientierung", 
        background: "20 Jahre in derselben Firma, fühlt sich unterfordert"
    },
    lisa: {
        name: "Dr. Lisa Müller",
        age: "42 Jahre, Ärztin",
        problem: "Work-Life-Balance als Chirurgin mit Familie",
        background: "Burnout-Symptome, liebt ihren Beruf aber Familie leidet"
    },
    werner: {
        name: "Werner Hoffmann", 
        age: "62 Jahre, Abteilungsleiter",
        problem: "Übergang in den Ruhestand und neue Lebenssinn-Findung",
        background: "Jahrzehntelange Führungsrolle, Angst vor Identitätsverlust"
    }
};

const coachingSteps = [
    { 
        id: 1, 
        title: "Einleitung & Problem-/Zielbeschreibung", 
        description: "Das Coaching beginnt mit der initialen Schilderung des Problems und Ziels durch den Klienten. Der Coach formuliert dies kompakt und gibt es als ersten Prompt in die KI ein, um ein ressourcenorientiertes Feedback zu erhalten.", 
        prompt: "Analysiere das Problem '[PROBLEM]' und das Ziel '[ZIEL]' des Klienten. Paraphrasiere es, normalisiere die Situation und hebe erste Stärken oder positive Ansätze hervor, um Vertrauen aufzubauen und ein ressourcenorientiertes Feedback zu geben. Formuliere es freundlich und unterstützend."
    },
    { 
        id: 2, 
        title: "Erweiterte Problem- & Zielbeschreibung", 
        description: "Die Problem- und Zielbeschreibung wird vertieft und strukturiert. Zusätzliche Details zur Situation, zum Ist-Zustand und zum gewünschten Soll-Zustand werden erfasst und in einem zweiten Prompt an die KI übergeben. Die KI soll daraus einen strukturierten Bericht in Ich-Form erstellen.", 
        prompt: "Aufgrund der bisherigen Anregungen hier weitere Informationen zum Problem '[PROBLEM_ERWEITERT]' und Ziel '[ZIEL_ERWEITERT]'. Erstelle einen in Ich-Form geschriebenen Bericht, der alle bisher vorliegenden Informationen zusammenfasst. Unterteile in Ist- und Soll-Situation und gehe auf Rahmenbedingungen, innere Prozesse, Verhalten und Konsequenzen ein." 
    },
    { 
        id: 3, 
        title: "Immersive Bildarbeit zur Zielklärung", 
        description: "Eine bildgestützte Methode zur Zielklärung. Der Klient wählt ein Bild, das intuitiv sein Ziel symbolisiert. Die KI analysiert die Beziehung zwischen der Bildbeschreibung und der Coaching-Zielsetzung.", 
        prompt: "Der Klient hat ein Bild gewählt, das wie folgt beschrieben wird: '[BILD_BESCHREIBUNG]'. Setze dies in Beziehung zum Coaching-Ziel '[ZIEL_KLARHEIT]' und analysiere die Parallelen und Metaphern. Verknüpfe die Bildsymbolik mit der Zielsetzung des Klienten." 
    },
    { 
        id: 4, 
        title: "Überprüfung auf fehlende Informationen (Ausbalancierungsproblem)", 
        description: "Es wird geprüft, ob wichtige Informationen fehlen oder Aspekte unklar geblieben sind. Die KI identifiziert ein zentrales Muster oder inneren Konflikt (Ausbalancierungsproblem) und schlägt weitere Fragen zur Präzisierung vor.", 
        prompt: "Analysiere alle bisherigen Informationen zur Coaching-Problematik '[GESAMT_PROBLEMATIK]' und identifiziere das wahrscheinlichste Ausbalancierungsproblem (z.B. Selbstinszenierung vs. Zurückhaltung). Welche Fragen müsste ich stellen, um diese Annahme zu klären?" 
    },
    { 
        id: 5, 
        title: "Schlüsselsituation & Schlüsselaffekt identifizieren", 
        description: "Es wird die typische Situation bestimmt, in der das Problem des Klienten am stärksten zutage tritt, und der spontane innere Gefühlszustand (Schlüsselaffekt), der das problematische Verhalten auslöst. Diese bilden die Grundlage für die tiefergehende Analyse.", 
        prompt: "Bitte analysiere die Schlüsselsituation '[SCHLÜSSELSITUATION]' und den Schlüsselaffekt '[SCHLÜSSELAFFEKT]' des Klienten. Erkläre, wie diese beiden miteinander in Verbindung stehen und das Problem verstärken. Welches Verhaltensmuster entsteht daraus?"
    },
    { 
        id: 6, 
        title: "Tiefenpsychologisches Interview mit Avataren (Inneres Team)", 
        description: "Mithilfe einer virtuellen Aufstellung von Avataren (Innere Bremse, Unterstützer, Teamchefin) wird die unbewusste Dynamik sichtbar gemacht. Konflikte im Inneren werden externalisiert und durch Interviews verstanden.", 
        prompt: "Basierend auf den Rollen der inneren Anteile (Teamchefin, Unterstützerin, Bremse) und ihren Aussagen '[AVATAR_AUSSAGEN]', analysiere die Dynamik des inneren Teams. Was sind die Hauptbedenken der 'Bremse' und wie unterstützen die anderen Anteile das Ziel?"
    },
    { 
        id: 7, 
        title: "KI-Analyse der Persönlichkeitsanteile & Ursachen", 
        description: "Die Informationen aus dem Avatar-Interview werden systematisch von der KI ausgewertet, um die tieferen Ursachen der Problematik herauszuarbeiten. Die KI agiert als 'innere Bremse', identifiziert relevante Persönlichkeitsdimensionen und entwirft ein Ursachenmodell.", 
        prompt: "Analysiere das Transkript des Avatar-Interviews '[INTERVIEW_TRANSKRIPT]' und alle vorliegenden Informationen. 1) Agiere als 'Bremse' und nenne weitere Gegenargumente gegen das Coaching-Ziel. 2) Identifiziere die relevantesten inneren Konfliktdimensionen ('Ausbalancierungsprobleme') und erstelle ein Ranking. 3) Erkläre, wie diese Haupt-Ursachen ursächlich zusammenhängen und ein Modell der Problematik bilden."
    },
    { 
        id: 8, 
        title: "Übergeordnetes Lern- & Entwicklungsziel formulieren", 
        description: "Das 'Thema hinter dem Thema' wird angegangen. Ein übergeordnetes Lern- oder Entwicklungsziel wird definiert, das die tieferliegenden Ursachen adressiert und eine nachhaltige Veränderung in der Haltung oder Fähigkeit des Klienten beschreibt. Die KI hilft bei der Formulierung.", 
        prompt: "Formuliere auf Basis der bisherigen Erkenntnisse (Problem '[PROBLEM_ZUSAMMENFASSUNG]', Ursachen '[URSACHEN_MODELL]') ein übergeordnetes Lern- und Entwicklungsziel für den Klienten. Es soll positiv, motivierend und auf eine nachhaltige Veränderung der Haltung oder Fähigkeit ausgerichtet sein."
    },
    { 
        id: 9, 
        title: "Antizipieren von Umsetzungswiderständen (innere Widerstände aufstellen)", 
        description: "Vorausschauend werden innere Widerstände identifiziert, die die Umsetzung der neuen Lösungsstrategie hindern könnten. Diese potenziellen Blockaden werden mit Avataren aufgestellt und durch Interviews beleuchtet.", 
        prompt: "Identifiziere basierend auf dem Lernziel '[LERNZIEL]' und den bekannten Ursachen '[URSACHEN_MODELL]' potenzielle innere Widerstände (alte Gewohnheiten, negative Affekte). Stelle diese als Avatare auf und formuliere ihre möglichen 'Aussagen' oder Bedenken gegen die Veränderung. Gib diesen Widerständen eine Stimme."
    },
    { 
        id: 10, 
        title: "KI-Analyse der Umsetzungswiderstände", 
        description: "Das Gespräch mit den inneren Widerstandsanteilen wird von der KI analysiert, um die zugrunde liegenden Glaubenssätze und Regeln dieser Anteile offenzulegen. Es werden die impliziten Annahmen rekonstruiert, die hinter den Äußerungen der 'Bremse'-Anteile stecken.", 
        prompt: "Analysiere die Aussagen der Widerstandsanteile '[WIDERSTANDS_AUSSAGEN]' aus dem Interview. Rekonstruiere daraus die zugrundeliegenden Regeln, Glaubenssätze oder inneren Prinzipien, nach denen diese Anteile die Realität wahrnehmen und handeln. Was sind ihre Kernüberzeugungen?"
    },
    { 
        id: 11, 
        title: "Erfolgsimagination entwickeln (neues Erleben des Erfolgs)", 
        description: "Eine lebhafte mentale Vorwegnahme des zukünftigen Erfolgs wird erstellt. Der Klient stellt sich vor, wie er die gewünschten Veränderungen umgesetzt hat und in der ehemals problematischen Situation erfolgreich handelt. Die KI schreibt eine detaillierte, persönliche Erfolgsgeschichte in Ich-Perspektive.", 
        prompt: "Erstelle in Ich-Form eine persönliche Erlebniserzählung als Erfolgsimagination. Beginne mit meiner unveränderten Schlüsselsituation, stelle dann dar, wie ich – nachdem ich mich positiv verändert habe – diese Situation ganz anders erlebe und meistere. Beziehe dich dabei auf die komplementären Eigenschaften meiner bisherigen Probleme (z.B. ‚Selbstwert statt Minderwertigkeit‘) und auf die Bildmetapher meines Ziels '[GEWÄHLTES_BILD_BESCHREIBUNG]'. Mach die zwei Erlebnisbeschreibungen deutlich unterschiedlich: erst die alte Reaktion, dann die neue. Formuliere alles sehr anschaulich, als würde es in einem Film geschehen, mit allen Sinnen."
    },
    { 
        id: 12, 
        title: "Umsetzungsunterstützung (Transfer in den Alltag)", 
        description: "Die gewonnenen Erkenntnisse und die Erfolgsimagination werden in die Realität übertragen. Die KI liefert kreative Vorschläge für einen konkreten Projektplan und Methoden zur Motivation und Aufrechterhaltung im Alltag.", 
        prompt: "Erstelle einen Projektplan mit praktischen Maßnahmen, damit ich mein übergeordnetes Entwicklungsziel '[LERNZIEL]' erreiche und die Erfolgsimagination '[ERFOLGSIMAGINATION_TEXT]' Realität wird. Schlage konkrete Aktivitäten, Gewohnheiten und Meilensteine vor, um den Transfer in den Alltag sicherzustellen." 
    }
];

const clientResponses = {
    sarah: {
        1: "Ja, das ist genau mein Problem. Ich bin unsicher, ob ich den Wechsel in den nachhaltigen Sektor wagen soll. Die Sicherheit ist wichtig, aber ich fühle mich nicht mehr erfüllt.",
        2: "Aktuell bin ich Marketing-Managerin in einem großen Konzern. Das Gehalt ist gut, aber ich arbeite für Produkte, hinter denen ich nicht stehe.",
        3: "Mein Traum wäre es, für ein Unternehmen zu arbeiten, das wirklich etwas Positives bewegt. Vielleicht im Bereich erneuerbare Energien oder nachhaltige Mobilität.",
        4: "Meine größte Angst ist der Gehaltseinbruch. Und ich kenne mich in der nachhaltigen Branche noch nicht so gut aus.",
        5: "Ich habe ein gutes Netzwerk, bin kreativ und kann komplexe Themen gut kommunizieren. Das sollte übertragbar sein."
    },
    marcus: {
        1: "Ich fühle mich seit Monaten unzufrieden und gefangen. 20 Jahre in derselben Firma - das war mal mein Traumjob, aber jetzt langweile ich mich.",
        2: "Meine Aufgaben sind Routine geworden. Ich mache sie mit links, aber dabei fühle ich mich leer.",
        3: "Ich würde gerne wieder Herausforderungen haben, vielleicht sogar ein eigenes Team leiten oder in einem innovativeren Umfeld arbeiten.",
        4: "Das Alter ist ein Problem. Mit 48 stellt einen nicht jeder ein. Und ich habe Angst vor dem Unbekannten.",
        5: "Ich habe sehr viel Erfahrung, bin zuverlässig und kenne die Branche in- und auswendig."
    },
    lisa: {
        1: "Die Balance wird immer schwieriger. Ich liebe meinen Beruf als Chirurgin, aber die Familie leidet und ich merke, wie erschöpft ich werde.",
        2: "60-70 Stunden Wochen sind normal. Meine Kinder sehe ich oft nur abends kurz.",
        3: "Ich möchte weiterhin Chirurgin sein, aber mehr Zeit für meine Familie haben. Vielleicht weniger Notdienste oder eine andere Spezialisierung.",
        4: "Der Druck im Krankenhaus ist enorm. Und als Mutter hat man oft ein schlechtes Gewissen, wenn man nicht da ist.",
        5: "Ich bin sehr kompetent in meinem Fach, organisiert und kann unter Druck arbeiten. Meine Familie unterstützt mich."
    },
    werner: {
        1: "Der Ruhestand kommt näher und ich weiß nicht, ob ich mich freuen oder fürchten soll. 40 Jahre war meine Arbeit meine Identität.",
        2: "Als Abteilungsleiter war ich immer derjenige, der Entscheidungen getroffen hat. Wer bin ich ohne meinen Job?",
        3: "Ich würde gerne aktiv bleiben, vielleicht ehrenamtlich arbeiten oder jüngere Kollegen mentoren.",
        4: "Ich habe Angst vor der Langeweile und davor, nicht mehr gebraucht zu werden.",
        5: "Ich habe jahrzehntelange Führungserfahrung, ein großes Netzwerk und könnte mein Wissen gerne weitergeben."
    }
};

const coachingTechniques = {
    'Nachfrage': 'Das ist wichtig. Können Sie das genauer erklären?',
    'Spiegelung': 'Was ich höre ist, dass Sie sich in einem Konflikt befinden zwischen...',
    'Ressourcen': 'Was hat Ihnen in ähnlichen Situationen geholfen?',
    'Skalierung': 'Auf einer Skala von 1-10, wo stehen Sie heute bei diesem Thema?',
    'Wunderfrage': 'Stellen Sie sich vor, über Nacht geschieht ein Wunder...',
    'Reframing': 'Lassen Sie uns das mal aus einem anderen Blickwinkel betrachten...',
    'Ausnahmen': 'Wann war es schon mal anders? Was war in diesen Momenten anders?',
    'Teile': 'Ein Teil von Ihnen möchte... ein anderer Teil...',
    'Zielfokus': 'Was wäre das erste Zeichen dafür, dass Sie auf dem richtigen Weg sind?',
    'Metapher': 'Wenn Ihre Situation ein Wetter wäre, welches wäre das?'
};

const kiResponseTemplates = {
    // Diese Templates werden jetzt spezifischer in generateSmartResponse genutzt und sollten idealerweise
    // durch echte KI-Antworten ersetzt werden.
    1: {
        title: "🎯 KI-Coaching-Analyse für {CLIENT}",
        content: `<strong>Zentrale Herausforderung:</strong> {PROBLEM}<br><br>
        <strong>Empfohlene Coaching-Fragen:</strong><br>
        • "Was würde sich für Sie wie ein Erfolg anfühlen?"<br>
        • "Welche Rolle spielt Sicherheit vs. Sinnhaftigkeit?"<br>
        • "In 5 Jahren - worauf möchten Sie zurückblicken?"<br><br>
        <strong>Coach-Strategie:</strong> Schaffen Sie Vertrauen und normalisieren Sie die Ambivalenz. Diese Unsicherheit ist völlig natürlich bei wichtigen Lebensentscheidungen.`
    },
    2: {
        title: "🔍 IST-Zustand Analyse für {CLIENT}",
        content: `<strong>Aktuelle Situation:</strong> Klassisches Übergangsdilemma zwischen bewährtem Pfad und neuen Möglichkeiten.<br><br>
        <strong>Zentrale Spannungsfelder:</strong><br>
        • Finanzielle Sicherheit ↔ Persönliche Werte<br>
        • Bewährtes ↔ Unbekanntes<br>
        • Externe Erwartungen ↔ Innere Stimme<br><br>
        <strong>Coach-Hinweis:</strong> Würdigen Sie die Komplexität dieser Entscheidung. Vermeiden Sie vorschnelle Lösungsvorschläge.`
    },
    3: {
        title: "🌟 SOLL-Zustand Vision für {CLIENT}",
        content: `<strong>Idealszenario:</strong><br>
        • Berufliche Tätigkeit in Übereinstimmung mit Werten<br>
        • Ausreichende finanzielle Sicherheit<br>
        • Tägliches Gefühl von Sinnhaftigkeit<br>
        • Langfristige Erfüllung und Wachstum<br><br>
        <strong>Coach-Tipp:</strong> Lassen Sie konkrete, sinnliche Bilder entstehen. "Beschreiben Sie einen typischen Arbeitstag in Ihrer Idealzukunft."`
    },
    4: {
        title: "🚧 Hindernisanalyse für {CLIENT}",
        content: `<strong>Identifizierte Barrieren:</strong><br>
        • Innere Blockaden: Ängste, Selbstzweifel, Komfortzone<br>
        • Externe Faktoren: Marktbedingungen, Alter, Qualifikationen<br>
        • Systemische Hürden: Familienerwartungen, finanzielle Verpflichtungen<br><br>
        <strong>Coach-Strategie:</strong> Trennen Sie beeinflussbare von nicht-beeinflussbaren Faktoren. Entwickeln Sie Strategien für überwindbare Hindernisse.`
    },
    5: {
        title: "💪 Ressourcen-Inventur für {CLIENT}",
        content: `<strong>Verfügbare Stärken:</strong><br>
        • Fachkompetenz und Erfahrung<br>
        • Persönliche Eigenschaften und Soft Skills<br>
        • Soziales Netzwerk und Unterstützung<br>
        • Materielle und finanzielle Ressourcen<br><br>
        <strong>Coach-Hinweis:</strong> Helfen Sie dabei, "unsichtbare" Ressourcen sichtbar zu machen. Viele Stärken werden als selbstverständlich betrachtet.`
    }
};

const exportConfig = {
    formats: {
        markdown: {
            extension: '.md',
            mimeType: 'text/markdown'
        },
        json: {
            extension: '.json',
            mimeType: 'application/json'
        },
        pdf: {
            extension: '.pdf',
            mimeType: 'application/pdf'
        }
    },
    templates: {
        sessionReport: {
            title: 'Coach Mission Control - Session Report',
            sections: ['meta', 'notes', 'steps', 'collaboration']
        },
        managementReport: {
            title: 'Coach Mission Control - Management Summary',
            sections: ['executive', 'features', 'roi', 'recommendation']
        }
    }
};

const appConfig = {
    version: '3.0',
    name: 'Coach Mission Control',
    description: 'Triadisches KI-Coaching System',
    collaboration: {
        urlParam: 'session',
        autoSaveInterval: 10000, // 10 seconds
        syncInterval: 1000 // 1 second
    },
    ui: {
        maxNotesDisplay: 5,
        chatMessagesHeight: 350,
        autoScrollDelay: 1000
    },
    sales: {
        earlyBirdPrice: 197,
        regularPrice: 497,
        currency: '€',
        contactEmail: 'info@coachmissioncontrol.com'
    }
};

// Bilder für Schritt 3: Immersive Bildarbeit
const imagesForStep3 = [
    { id: 'img1', url: 'https://placehold.co/400x250/C1E7E7/1A1A1A?text=Berggipfel', description: 'Eine Person steht auf einem Berggipfel und blickt in die Weite. Sonne strahlt.' },
    { id: 'img2', url: 'https://placehold.co/400x250/D2B4DE/1A1A1A?text=Weg+im+Wald', description: 'Ein verschlungener Weg führt durch einen dichten, mystischen Wald.' },
    { id: 'img3', url: 'https://placehold.co/400x250/C8E6C9/1A1A1A?text=Offenes+Meer', description: 'Ein weites, offenes Meer mit einem Leuchtturm am Horizont, Symbol für Freiheit.' },
    { id: 'img4', url: 'https://placehold.co/400x250/FFE0B2/1A1A1A?text=Brücke', description: 'Eine moderne Brücke verbindet zwei Ufer, symbolisiert Übergang und Verbindung.' }
];

// Definition der Avatar-Rollen für Schritt 6 & 9
const avatarRoles = {
    step6: [
        { id: 'teamchefin', name: 'Teamchefin', description: 'Der rationale, zielorientierte Teil.' },
        { id: 'unterstuetzerin', name: 'Unterstützerin', description: 'Der innere Verbündete, der Mut macht.' },
        { id: 'bremse', name: 'Bremse', description: 'Der Anteil, der das Vorankommen hemmt, oft aus Angst.' }
    ],
    step9: [
        { id: 'perfektionismus', name: 'Perfektionismus/Hohe Ansprüche', description: 'Der Teil, der nach makellosen Ergebnissen strebt.' },
        { id: 'anerkennungsbeduerfnis', name: 'Anerkennungsbedürfnis', description: 'Der Teil, der Bestätigung und Lob von aussen sucht.' },
        { id: 'zurueckhaltung', name: 'Schüchterne Zurückhaltung', description: 'Der Teil, der Sicherheit im Hintergrund sucht und Sichtbarkeit meidet.' }
    ]
};

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
        loadTemplates(); // Lädt die Templates ins Repository
        generateSessionId();
        initializeAutoSave();
        loadAutoSavedSession(); // Versucht, eine gespeicherte Session zu laden
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
        // Fallback for older browsers (though navigator.clipboard is widely supported now)
        console.warn('Clipboard write failed. Manual copy required:', linkElement.textContent);
        // Optionally, show a custom modal informing the user to manually copy
    });
}

function openCollaborationWindow() {
    const collaborationUrl = document.getElementById('collaborationLink').textContent;
    const newWindow = window.open(collaborationUrl, 'CoachingCollaboration', 'width=900,height=700,scrollbars=yes,resizable=yes');
    
    // Store reference for communication
    window.collaborationWindow = newWindow;
    
    // Setup message listener for cross-window communication
    window.addEventListener('message', function(event) {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'collaborationUpdate') {
            // Update our local data
            collaborationData = event.data.data;
        }
    });
}

// Collaboration Mode Functions
function initCollaborationMode() {
    const sessionParam = urlParams.get('session') || (window.location.pathname.includes('/session/') ? window.location.pathname.split('/session/')[1] : 'DEMO');
    const sessionIdElement = document.getElementById('collaborationSessionId');
    if (sessionIdElement) {
        sessionIdElement.textContent = sessionParam;
    }
    
    // Start listening for messages from parent window
    window.addEventListener('message', function(event) {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'collaborationData') {
            updateCollaborationDisplay(event.data.data);
        }
    });
    
    // For demo purposes: simulate some initial data after 2 seconds
    // Only show initial prompt if no data is received from parent yet
    setTimeout(() => {
        if (!collaborationData.prompt) {
            updateCollaborationDisplay({
                prompt: 'Demo: Warten auf ersten Prompt vom Coach...',
                response: '',
                loading: false
            });
        }
    }, 2000);
}

function updateCollaborationDisplay(data) {
    const promptElement = document.getElementById('collaborationPromptText');
    const responseElement = document.getElementById('collaborationResponseText');
    
    if (data.prompt && promptElement) {
        promptElement.innerHTML = `
            <div style="background: #f8faff; padding: 15px; border-radius: 8px; border: 1px solid #667eea;">
                ${data.prompt.replace(/\n/g, '<br>')}
            </div>
        `;
    }
    
    if (data.loading && responseElement) {
        responseElement.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>KI analysiert den Prompt...</p>
            </div>
        `;
    } else if (data.response && responseElement) {
        responseElement.innerHTML = `
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border: 1px solid #10b981;">
                ${data.response}
            </div>
        `;
    }
    // Update local collaboration data
    collaborationData = { ...collaborationData, ...data };
}

// Broadcast data to collaboration window
function broadcastToCollaboration(data) {
    collaborationData = { ...collaborationData, ...data, timestamp: new Date() };
    
    // Send to collaboration window if open
    if (window.collaborationWindow && !window.collaborationWindow.closed) {
        window.collaborationWindow.postMessage({
            type: 'collaborationData',
            data: collaborationData
        }, window.location.origin);
    }
    
    // Also store in localStorage as fallback
    try {
        localStorage.setItem('collaborationData', JSON.stringify(collaborationData));
    } catch (e) {
        console.warn('Could not save collaboration data:', e);
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
    if (!selectedClient) {
        // Optional: Zeige eine Meldung, dass ein Klient ausgewählt werden muss.
        // alert('Bitte wählen Sie zuerst einen Klienten aus, um die Demo zu starten.');
        return; 
    }

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
    
    // Simulate client response after a short delay
    setTimeout(() => {
        addChatMessage('client', getClientResponse(1));
    }, 2000);

    // Set current step and add welcome note
    setCurrentStep(1);
    addSystemNote('Demo-Session gestartet mit ' + clients[selectedClient].name, 'custom');
    
    // Broadcast session start to collaboration window
    broadcastToCollaboration({
        prompt: `Demo-Session gestartet mit ${clients[selectedClient].name}\n\nErster Schritt: ${coachingSteps[0].title}\n\nWarten auf Coach-Prompt...`,
        response: '',
        loading: false
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

    // Update current step info and render step-specific content
    const step = coachingSteps.find(s => s.id === stepId);
    if (step) {
        renderCurrentStepContent(step);
        updateCoachTools(step);
    }
}

/**
 * Rendert den spezifischen Inhalt für den aktuellen Coaching-Schritt.
 * @param {object} step - Das aktuelle Schritt-Objekt aus coachingSteps.
 */
function renderCurrentStepContent(step) {
    const stepContentDiv = document.getElementById('stepContent');
    if (!stepContentDiv) return;

    let contentHTML = `
        <div class="current-step-info" id="currentStepInfo">
            <div class="step-title">Schritt ${step.id}: ${step.title}</div>
            <div class="step-description">${step.description}</div>
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="editPrompt(${step.id})">✏️ KI-Prompt mit Coachee bearbeiten</button>
                ${step.id < 12 ? `<button class="btn btn-secondary" onclick="nextStep()">⏭️ Nächster Schritt</button>` : ''}
            </div>
        </div>
    `;

    // Schritt-spezifische Eingabefelder und UI-Elemente
    switch (step.id) {
        case 1: // Einleitung und erste Problem-/Zielbeschreibung
            contentHTML += `
                <div class="tool-section">
                    <h4>Problem- & Zielbeschreibung des Klienten</h4>
                    <label for="clientProblem1" style="font-size:0.9em; display:block; margin-bottom:5px;">Problem (kurz):</label>
                    <textarea id="clientProblem1" class="full-width-textarea" rows="2" placeholder="Ich habe folgendes Problem..." oninput="updateCollaborationPrompt()"></textarea>
                    <label for="clientGoal1" style="font-size:0.9em; display:block; margin-top:10px; margin-bottom:5px;">Ziel (kurz):</label>
                    <textarea id="clientGoal1" class="full-width-textarea" rows="2" placeholder="Mein Ziel ist es..." oninput="updateCollaborationPrompt()"></textarea>
                </div>
            `;
            break;
        case 2: // Erweiterte Problem- und Zielbeschreibung
            contentHTML += `
                <div class="tool-section">
                    <h4>Erweiterte Details (Ist- vs. Soll-Zustand)</h4>
                    <label for="istZustand" style="font-size:0.9em; display:block; margin-bottom:5px;">IST-Zustand (aktuell):</label>
                    <textarea id="istZustand" class="full-width-textarea" rows="3" placeholder="Aktuelle Situation, Rahmenbedingungen, innere Prozesse, Verhalten, Konsequenzen..." oninput="updateCollaborationPrompt()"></textarea>
                    <label for="sollZustand" style="font-size:0.9em; display:block; margin-top:10px; margin-bottom:5px;">SOLL-Zustand (gewünscht):</label>
                    <textarea id="sollZustand" class="full-width-textarea" rows="3" placeholder="Gewünschte Situation, Rahmenbedingungen, innere Prozesse, Verhalten, Konsequenzen..." oninput="updateCollaborationPrompt()"></textarea>
                </div>
            `;
            break;
        case 3: // Immersive Bildarbeit zur Zielklärung
            contentHTML += `
                <div class="tool-section">
                    <h4>🎨 Bildauswahl zur Zielklärung</h4>
                    <p style="font-size:0.9em; color:#666; margin-bottom:15px;">Bitte wählen Sie mit dem Klienten ein Bild, das sein Zielgefühl am besten repräsentiert:</p>
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:10px; margin-bottom:15px;">
                        ${imagesForStep3.map(img => `
                            <button class="btn-image-select ${selectedImageForStep3 === img.id ? 'selected-image' : ''}" 
                                    onclick="selectImageForStep3('${img.id}')"
                                    style="border: 2px solid #ddd; border-radius:10px; overflow:hidden; padding:0; cursor:pointer;">
                                <img src="${img.url}" alt="${img.description}" style="width:100%; height:100px; object-fit:cover; border-radius:8px 8px 0 0;">
                                <span style="display:block; font-size:0.75em; padding:8px; text-align:center; color:#333;">${img.description.split(' ')[0]}...</span>
                            </button>
                        `).join('')}
                    </div>
                    ${selectedImageForStep3 ? `
                        <div style="margin-top:15px; padding:10px; background:#e8f2ff; border-radius:8px; border:1px solid #667eea;">
                            <p style="font-size:0.9em; font-weight:600; color:#667eea;">Ausgewähltes Bild:</p>
                            <p style="font-size:0.85em;">${imagesForStep3.find(img => img.id === selectedImageForStep3)?.description}</p>
                            <label for="imageDescriptionInput" style="font-size:0.9em; display:block; margin-top:10px; margin-bottom:5px;">Klienten-Beschreibung des Bildes:</label>
                            <textarea id="imageDescriptionInput" class="full-width-textarea" rows="3" placeholder="Was ist auf dem Bild zu sehen? Welche Stimmung/Botschaft verkörpert es für den Klienten?" oninput="updateCollaborationPrompt()"></textarea>
                        </div>
                    ` : '<p style="font-size:0.85em; color:#999; text-align:center;">Bitte ein Bild auswählen.</p>'}
                </div>
            `;
            break;
        case 4: // Überprüfung auf fehlende Informationen (Ausbalancierungsproblem)
            contentHTML += `
                <div class="tool-section">
                    <h4>🔍 Analyse des Ausbalancierungsproblems</h4>
                    <p style="font-size:0.9em; color:#666; margin-bottom:15px;">Die KI wird basierend auf allen bisherigen Informationen das wahrscheinlichste Ausbalancierungsproblem identifizieren. Hier können Sie die gesammelten Informationen nochmals überprüfen oder ergänzen.</p>
                    <label for="totalProblemDescription" style="font-size:0.9em; display:block; margin-bottom:5px;">Gesamte Problem-/Zielbeschreibung für KI-Analyse:</label>
                    <textarea id="totalProblemDescription" class="full-width-textarea" rows="5" placeholder="Fassen Sie hier alle relevanten Informationen zusammen, die die KI für die Analyse benötigt..." oninput="updateCollaborationPrompt()"></textarea>
                    <p style="font-size:0.8em; color:#999; margin-top:10px;">Diese Zusammenfassung wird an die KI für die Analyse gesendet.</p>
                </div>
            `;
            break;
        case 5: // Schlüsselsituation und Schlüsselaffekt identifizieren
            contentHTML += `
                <div class="tool-section">
                    <h4>📍 Schlüsselsituation & 💔 Schlüsselaffekt</h4>
                    <p style="font-size:0.9em; color:#666; margin-bottom:15px;">Identifizieren Sie die Situation, in der das Problem am stärksten auftritt, und das damit verbundene innere Gefühl.</p>
                    <label for="schluesselsituation" style="font-size:0.9em; display:block; margin-bottom:5px;">Schlüsselsituation:</label>
                    <textarea id="schluesselsituation" class="full-width-textarea" rows="3" placeholder="In welcher konkreten Situation tritt das Problem besonders stark auf? (z.B. 'Wenn ich mein LinkedIn-Profil aktualisieren will')" oninput="updateCollaborationPrompt()"></textarea>
                    
                    <label for="schluesselaffekt" style="font-size:0.9em; display:block; margin-top:10px; margin-bottom:5px;">Schlüsselaffekt:</label>
                    <textarea id="schluesselaffekt" class="full-width-textarea" rows="3" placeholder="Was passiert genau innerlich in Ihnen in diesem Moment? (z.B. 'Ich fühle mich wie gelähmt')" oninput="updateCollaborationPrompt()"></textarea>

                    <p style="font-size:0.8em; color:#999; margin-top:10px;">Beispiel-Affekte: gelähmt, blockiert, überfordert, enttäuscht, 