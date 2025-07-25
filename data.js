// KI-Coaching App - Korrekte Daten mit echten Klienten
// Datum: 25. Juli 2025
// Fix: Vollständige Klienten-Array definiert

// KRITISCH: Client-Datenbank (muss als Array definiert sein!)
window.clients = [
    {
        id: 'sarah',
        name: 'Sarah Müller',
        role: 'Projektmanagerin',
        company: 'Tech Solutions GmbH',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
        expertise: ['Zeitmanagement', 'Teamführung', 'Projektorganisation'],
        goals: ['Work-Life-Balance verbessern', 'Delegation lernen', 'Stressreduktion'],
        background: 'Erfahrene Projektmanagerin mit 8 Jahren Berufserfahrung, kämpft mit der Balance zwischen beruflichen Anforderungen und persönlichem Leben.'
    },
    {
        id: 'marcus',
        name: 'Marcus Schmidt',
        role: 'Vertriebsleiter',
        company: 'Innovation Corp',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        expertise: ['Verkaufsstrategien', 'Kundenbeziehungen', 'Teamführung'],
        goals: ['Verkaufszahlen steigern', 'Team motivieren', 'Neue Märkte erschließen'],
        background: 'Dynamischer Vertriebsleiter mit 10 Jahren Erfahrung, sucht neue Wege zur Teamoptimierung und Marktexpansion.'
    },
    {
        id: 'lisa',
        name: 'Lisa Weber',
        role: 'Marketing-Direktorin',
        company: 'Creative Agency Plus',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        expertise: ['Digitales Marketing', 'Markenaufbau', 'Kreativstrategie'],
        goals: ['Digitale Transformation vorantreiben', 'Kreativteam entwickeln', 'ROI optimieren'],
        background: 'Innovative Marketing-Direktorin mit Fokus auf digitale Strategien, möchte ihr Team in der sich schnell wandelnden Digitalisierung führen.'
    },
    {
        id: 'werner',
        name: 'Werner Hoffmann',
        role: 'IT-Leiter',
        company: 'DataFlow Systems',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        expertise: ['Technische Führung', 'Systemarchitektur', 'Agile Methoden'],
        goals: ['Technische Excellence erreichen', 'Entwicklerteam fördern', 'Innovation vorantreiben'],
        background: 'Erfahrener IT-Leiter mit 12 Jahren Führungserfahrung, konzentriert sich auf technische Innovation und Teamentwicklung.'
    }
];

// Für Kompatibilität auch als const definieren
const clients = window.clients;

// Coaching-Templates Bibliothek
window.coachingTemplates = [
    {
        id: 'goal-setting',
        title: 'SMART Ziele setzen',
        category: 'Zielsetzung',
        description: 'Hilft Klienten dabei, spezifische, messbare, erreichbare, relevante und zeitgebundene Ziele zu definieren.',
        prompt: `Lassen Sie uns gemeinsam ein SMART-Ziel für Sie entwickeln:

🎯 ZIEL-DEFINITION:
- Was möchten Sie genau erreichen?
- Warum ist dieses Ziel wichtig für Sie?

📊 MESSBARKEIT:
- Woran werden Sie erkennen, dass Sie das Ziel erreicht haben?
- Welche konkreten Indikatoren gibt es?

🚀 ERREICHBARKEIT:
- Welche Ressourcen und Fähigkeiten haben Sie bereits?
- Was benötigen Sie noch, um erfolgreich zu sein?

⭐ RELEVANZ:
- Wie passt dieses Ziel zu Ihren übergeordneten Werten und Visionen?
- Welchen Einfluss hat es auf andere Lebensbereiche?

⏰ ZEITRAHMEN:
- Bis wann möchten Sie das Ziel erreicht haben?
- Welche Zwischenschritte können Sie definieren?

Beginnen wir: Was ist Ihr wichtigstes Ziel für die nächsten 3 Monate?`
    },
    {
        id: 'obstacle-analysis',
        title: 'Hindernisse überwinden',
        category: 'Problemlösung',
        description: 'Systematische Analyse von Hindernissen und Entwicklung von Lösungsstrategien.',
        prompt: `Lassen Sie uns die Hindernisse auf Ihrem Weg analysieren und Lösungen entwickeln:

🚧 HINDERNIS-IDENTIFIKATION:
- Welches Hindernis beschäftigt Sie aktuell am meisten?
- Wie lange besteht dieses Problem bereits?

🔍 URSACHEN-ANALYSE:
- Was sind die Grundursachen dieses Hindernisses?
- Welche Faktoren liegen in Ihrem Einflussbereich?
- Was liegt außerhalb Ihrer Kontrolle?

💪 RESSOURCEN-MAPPING:
- Welche Stärken und Fähigkeiten können Sie nutzen?
- Wer könnte Sie dabei unterstützen?
- Welche Erfahrungen haben Sie bereits gemacht?

🛠️ LÖSUNGSSTRATEGIEN:
- Welche verschiedenen Ansätze könnten funktionieren?
- Was ist der kleinstmögliche erste Schritt?

📈 ERFOLGS-TRACKING:
- Woran werden Sie Fortschritt messen?
- Wie werden Sie sich motiviert halten?

Beschreiben Sie mir das Hindernis, das Sie aktuell am meisten belastet.`
    },
    {
        id: 'strength-discovery',
        title: 'Stärken entdecken',
        category: 'Selbstreflexion',
        description: 'Hilft dabei, verborgene Stärken zu identifizieren und zu nutzen.',
        prompt: `Entdecken wir gemeinsam Ihre einzigartigen Stärken:

⭐ ERFOLGS-REFLEXION:
- Denken Sie an einen Moment, in dem Sie besonders stolz auf sich waren
- Was haben Sie in dieser Situation gut gemacht?
- Welche Ihrer Eigenschaften haben zum Erfolg beigetragen?

🎯 FLOW-MOMENTE:
- Bei welchen Tätigkeiten vergessen Sie die Zeit?
- Was fällt Ihnen besonders leicht?
- Womit beschäftigen Sie sich gerne in Ihrer Freizeit?

🗣️ FEEDBACK-ANALYSE:
- Welches positive Feedback haben Sie kürzlich erhalten?
- Wofür werden Sie häufig um Rat gefragt?
- Was schätzen andere an Ihrer Arbeitsweise?

🚀 ENERGIE-QUELLEN:
- Welche Aufgaben geben Ihnen Energie?
- In welchen Situationen fühlen Sie sich am lebendigsten?

💡 STÄRKEN-ANWENDUNG:
- Wie könnten Sie diese Stärken noch besser nutzen?
- In welchen neuen Bereichen könnten sie hilfreich sein?

Erzählen Sie mir von einem Ihrer größten beruflichen Erfolge der letzten Zeit.`
    },
    {
        id: 'time-management',
        title: 'Zeitmanagement optimieren',
        category: 'Produktivität',
        description: 'Strategien für effektives Zeitmanagement und Prioritätensetzung.',
        prompt: `Optimieren wir Ihr Zeitmanagement systematisch:

⏰ IST-ANALYSE:
- Wie sieht ein typischer Arbeitstag bei Ihnen aus?
- Womit verbringen Sie die meiste Zeit?
- Was raubt Ihnen regelmäßig Zeit?

🎯 PRIORITÄTEN-MATRIX:
- Was sind Ihre wichtigsten Aufgaben diese Woche?
- Welche Tätigkeiten haben hohen Impact?
- Was könnte delegiert oder eliminiert werden?

🚫 ZEITFRESSER-IDENTIFIKATION:
- Welche Unterbrechungen stören Sie am häufigsten?
- Wo verlieren Sie sich in Details?
- Welche Meetings sind wenig produktiv?

🛠️ TOOL-OPTIMIERUNG:
- Welche Zeitmanagement-Methoden kennen Sie bereits?
- Was funktioniert gut, was weniger?
- Welche Tools nutzen Sie aktuell?

📊 ERFOLGS-MESSUNG:
- Woran messen Sie produktive Zeit?
- Wie könnten Sie Ihren Fortschritt verfolgen?

⚡ ENERGIE-MANAGEMENT:
- Wann sind Sie am produktivsten?
- Wie könnten Sie Ihre Energie besser einteilen?

Beschreiben Sie mir Ihre größte Zeitmanagement-Herausforderung.`
    },
    {
        id: 'leadership-development',
        title: 'Führungskompetenz entwickeln',
        category: 'Leadership',
        description: 'Entwicklung von Führungsqualitäten und Kommunikationsfähigkeiten.',
        prompt: `Entwickeln wir Ihre Führungskompetenzen gezielt weiter:

👥 FÜHRUNGSSTIL-REFLEXION:
- Wie würden Sie Ihren aktuellen Führungsstil beschreiben?
- In welchen Situationen führen Sie am besten?
- Was ist Ihre Führungsphilosophie?

🎯 TEAM-DYNAMIK:
- Wie motivieren Sie Ihr Team aktuell?
- Welche Herausforderungen gibt es im Team?
- Wie gehen Sie mit Konflikten um?

💬 KOMMUNIKATIONS-ANALYSE:
- Wie kommunizieren Sie wichtige Entscheidungen?
- Wie geben Sie Feedback?
- Wie führen Sie schwierige Gespräche?

🌱 ENTWICKLUNGS-FOKUS:
- Welche Führungsqualität möchten Sie stärken?
- Was bewundern Sie an anderen Führungskräften?
- Wo sehen Sie Ihr größtes Entwicklungspotential?

📈 IMPACT-MESSUNG:
- Woran erkennen Sie erfolgreiches Führen?
- Wie messen Sie die Zufriedenheit Ihres Teams?
- Welche Erfolge konnten Sie bereits erzielen?

🚀 VISIONS-ENTWICKLUNG:
- Welche Vision haben Sie für Ihr Team/Ihre Organisation?
- Wie kommunizieren Sie diese Vision?

Erzählen Sie mir von einer Führungssituation, die Sie besonders gefordert hat.`
    },
    {
        id: 'change-management',
        title: 'Veränderung meistern',
        category: 'Change',
        description: 'Strategien für den Umgang mit beruflichen und persönlichen Veränderungen.',
        prompt: `Meistern wir die anstehenden Veränderungen gemeinsam:

🔄 VERÄNDERUNGS-ANALYSE:
- Welche Veränderung steht bei Ihnen an?
- Was löst diese Veränderung in Ihnen aus?
- Was sind Ihre größten Bedenken?

🎯 CHANCEN-PERSPEKTIVE:
- Welche Möglichkeiten eröffnet diese Veränderung?
- Was könnte sich positiv entwickeln?
- Welche neuen Fähigkeiten könnten Sie entwickeln?

💪 RESSOURCEN-INVENTAR:
- Welche Veränderungen haben Sie bereits erfolgreich gemeistert?
- Was hat Ihnen dabei geholfen?
- Wer kann Sie in dieser Situation unterstützen?

📋 AKTIONS-PLANUNG:
- Welche konkreten Schritte können Sie heute unternehmen?
- Was liegt in Ihrem direkten Einflussbereich?
- Wie können Sie sich auf die Veränderung vorbereiten?

🧘 EMOTIONALE BEWÄLTIGUNG:
- Wie gehen Sie normalerweise mit Unsicherheit um?
- Was hilft Ihnen beim Stressabbau?
- Wie können Sie Ihre Resilienz stärken?

🔮 ZUKUNFTS-VISION:
- Wie sehen Sie sich nach erfolgreicher Bewältigung der Veränderung?
- Was wird dann anders/besser sein?

Erzählen Sie mir von der Veränderung, die aktuell vor Ihnen liegt.`
    },
    {
        id: 'work-life-balance',
        title: 'Work-Life-Balance finden',
        category: 'Balance',
        description: 'Strategien für eine gesunde Balance zwischen Beruf und Privatleben.',
        prompt: `Finden wir gemeinsam Ihre optimale Work-Life-Balance:

⚖️ BALANCE-CHECK:
- Wie zufrieden sind Sie aktuell mit Ihrer Work-Life-Balance (1-10)?
- Was läuft gut, was weniger?
- Wo spüren Sie das größte Ungleichgewicht?

🏠 LEBENSBEREICHE-ANALYSE:
- Wie viel Zeit investieren Sie in verschiedene Lebensbereiche?
- Familie, Karriere, Gesundheit, Hobbys, soziale Kontakte?
- Welcher Bereich kommt zu kurz?

🎯 WERTE-KLÄRUNG:
- Was ist Ihnen im Leben wirklich wichtig?
- Welche Werte möchten Sie stärker leben?
- Wo entstehen Konflikte zwischen verschiedenen Prioritäten?

🚧 GRENZ-MANAGEMENT:
- Wie trennen Sie Beruf und Privatleben?
- Welche Grenzen möchten Sie ziehen?
- Was fällt Ihnen beim "Abschalten" schwer?

⚡ ENERGIE-VERTEILUNG:
- Wofür verwenden Sie die meiste Energie?
- Was gibt Ihnen Energie, was raubt sie?
- Wie könnten Sie Ihre Energie besser einteilen?

🛠️ PRAKTISCHE STRATEGIEN:
- Welche konkreten Veränderungen wären hilfreich?
- Was ist der erste kleine Schritt?
- Wie können Sie neue Gewohnheiten etablieren?

Beschreiben Sie mir, wie ein perfekter Tag für Sie aussehen würde.`
    },
    {
        id: 'decision-making',
        title: 'Entscheidungen treffen',
        category: 'Entscheidungsfindung',
        description: 'Systematischer Ansatz für wichtige Entscheidungen.',
        prompt: `Treffen wir gemeinsam eine fundierte Entscheidung:

❓ ENTSCHEIDUNGS-KONTEXT:
- Vor welcher Entscheidung stehen Sie?
- Warum ist diese Entscheidung wichtig?
- Welcher Zeitdruck besteht?

⚖️ OPTIONEN-ANALYSE:
- Welche Möglichkeiten haben Sie?
- Was sind die Vor- und Nachteile jeder Option?
- Gibt es weitere Alternativen, die Sie noch nicht betrachtet haben?

🎯 KRITERIEN-DEFINITION:
- Was ist Ihnen bei dieser Entscheidung am wichtigsten?
- Welche Faktoren müssen unbedingt berücksichtigt werden?
- Wie gewichten Sie verschiedene Aspekte?

🔮 KONSEQUENZ-BETRACHTUNG:
- Was sind die möglichen Auswirkungen jeder Option?
- Wie könnten Sie sich in 1, 5, 10 Jahren fühlen?
- Was wäre das Worst-Case-Szenario?

💡 INTUITIONS-CHECK:
- Was sagt Ihr Bauchgefühl?
- Wovon träumen Sie heimlich?
- Was würden Sie entscheiden, wenn Sie keine Angst hätten?

🗣️ PERSPEKTIVEN-WECHSEL:
- Was würde eine Person, die Sie respektieren, raten?
- Welchen Rat würden Sie einem Freund in derselben Situation geben?

📋 ENTSCHEIDUNGS-PROZESS:
- Welche Informationen benötigen Sie noch?
- Mit wem sollten Sie sprechen?
- Wie werden Sie die Entscheidung umsetzen?

Erzählen Sie mir von der Entscheidung, die Sie gerade beschäftigt.`
    }
];

// Für Kompatibilität auch als const definieren
const coachingTemplates = window.coachingTemplates;

// Coaching-Kategorien für Filterung
window.coachingCategories = [
    'Zielsetzung',
    'Problemlösung',
    'Selbstreflexion',
    'Produktivität',
    'Leadership',
    'Change',
    'Balance',
    'Entscheidungsfindung',
    'Kommunikation',
    'Motivation'
];

const coachingCategories = window.coachingCategories;

// KI-Response-Templates für realistische Simulationen
window.aiResponseTemplates = [
    {
        context: 'goal-setting',
        responses: [
            'Für eine effektive Zielsetzung empfehle ich, zunächst Ihre langfristige Vision zu klären. Beginnen Sie mit der Frage: "Wo sehe ich mich in 3 Jahren?" und arbeiten Sie dann rückwärts zu konkreten Quartalszielen.',
            'SMART-Ziele sind ein ausgezeichneter Ansatz. Besonders wichtig ist die Messbarkeit - definieren Sie konkrete KPIs oder Meilensteine, die objektiv überprüfbar sind.',
            'Bei der Zielsetzung sollten Sie auch mögliche Hindernisse antizipieren. Entwickeln Sie für jedes Ziel einen Plan B und identifizieren Sie die Ressourcen, die Sie benötigen.'
        ]
    },
    {
        context: 'leadership',
        responses: [
            'Authentische Führung beginnt mit Selbstreflexion. Führen Sie regelmäßige Selbstbewertungen durch und holen Sie sich 360-Grad-Feedback von Ihrem Team.',
            'Effektive Kommunikation ist das Herzstück guter Führung. Praktizieren Sie aktives Zuhören und stellen Sie mehr Fragen, als Sie Antworten geben.',
            'Entwickeln Sie Ihre emotionale Intelligenz weiter. Führungskräfte, die ihre eigenen Emotionen und die ihres Teams verstehen, sind deutlich erfolgreicher.'
        ]
    },
    {
        context: 'time-management',
        responses: [
            'Die Pareto-Regel (80/20) ist ein mächtiges Tool für Zeitmanagement. Identifizieren Sie die 20% Ihrer Aktivitäten, die 80% der Ergebnisse erzeugen.',
            'Implementieren Sie Time-Blocking in Ihrem Kalender. Reservieren Sie feste Zeiten für wichtige Aufgaben und behandeln Sie diese wie unverschiebbare Termine.',
            'Beginnen Sie jeden Tag mit der wichtigsten Aufgabe (Eat the Frog). Das schafft Momentum und verhindert Prokrastination bei kritischen Projekten.'
        ]
    }
];

const aiResponseTemplates = window.aiResponseTemplates;

// Utility-Funktionen für Datenverarbeitung
window.dataUtils = {
    // Client-Funktionen
    getClientById: (clientId) => {
        return clients.find(client => client.id === clientId);
    },
    
    getAllClients: () => {
        return [...clients];
    },
    
    // Template-Funktionen
    getTemplateById: (templateId) => {
        return coachingTemplates.find(template => template.id === templateId);
    },
    
    getTemplatesByCategory: (category) => {
        return coachingTemplates.filter(template => template.category === category);
    },
    
    searchTemplates: (searchTerm) => {
        const term = searchTerm.toLowerCase();
        return coachingTemplates.filter(template => 
            template.title.toLowerCase().includes(term) ||
            template.description.toLowerCase().includes(term) ||
            template.category.toLowerCase().includes(term)
        );
    },
    
    // AI-Response-Funktionen
    getRandomAIResponse: (context = 'general') => {
        const contextResponses = aiResponseTemplates.find(t => t.context === context);
        if (contextResponses) {
            const responses = contextResponses.responses;
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Fallback für allgemeine Antworten
        const generalResponses = [
            'Das ist ein sehr guter Ansatz. Lassen Sie uns das weiter vertiefen und konkrete Schritte entwickeln.',
            'Ihre Reflexion zeigt bereits viel Selbstbewusstsein. Welche Erkenntnisse sind für Sie besonders relevant?',
            'Diese Herausforderung bietet auch Chancen für Wachstum. Was könnten die positiven Aspekte sein?',
            'Basierend auf Ihrer Beschreibung empfehle ich einen systematischen Ansatz. Beginnen wir mit dem ersten Schritt.',
            'Ihre Ziele sind ambitioniert und realistisch zugleich. Welche Ressourcen stehen Ihnen bereits zur Verfügung?'
        ];
        
        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
};

const dataUtils = window.dataUtils;

// Validierung und Debug-Output
console.log('✅ Data.js geladen - Clients:', clients.length, 'Templates:', coachingTemplates.length);
console.log('📋 Verfügbare Klienten:', clients.map(c => c.name));
console.log('🔧 DataUtils verfügbar:', typeof dataUtils);

// Sofortige Verfügbarkeit sicherstellen
if (typeof window !== 'undefined') {
    window.appData = {
        clients,
        coachingTemplates,
        coachingCategories,
        aiResponseTemplates,
        dataUtils
    };
}