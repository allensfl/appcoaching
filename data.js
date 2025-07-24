// ERWEITERTE Template Repository mit Geißler-Methodik
const templateRepository = [
    // Phase 1: Problem- und Zielbeschreibung
    {
        title: "🎯 Schritt 1: Problem- und Zielbeschreibung",
        keywords: ["problem", "ziel", "einleitung", "erstgespräch"],
        preview: "Ich habe folgendes Problem...",
        prompt: "Analysiere das Problem '[PROBLEM]' und gib ressourcenorientiertes, positives Feedback. Identifiziere aus den Aussagen erste Fähigkeiten und Stärken, die für die Problemlösung genutzt werden können. Dies fördert den Beziehungsaufbau und gibt dem Klienten Hoffnung.",
        phase: 1,
        step: 1
    },
    {
        title: "📋 Schritt 2: Erweiterte Problem- und Zielanalyse",
        keywords: ["erweitert", "analyse", "ist", "soll", "struktur"],
        preview: "Erstelle einen in Ich-Form geschriebenen Bericht...",
        prompt: "Erstelle einen in Ich-Form geschriebenen Bericht für '[PROBLEM]', in dem alle vorliegenden Informationen zusammengefasst sind. Gliedere in zwei Teile: 1) IST-Situation, 2) SOLL-Situation. Berücksichtige: äußere Rahmenbedingungen, psychische Prozesse (Gefühle, Motivation, Gedanken), beobachtbare Verhaltensweisen und deren Folgen bei Mitmenschen und sich selbst.",
        phase: 1,
        step: 2
    },
    {
        title: "🖼️ Schritt 3: Immersive Bildarbeit zur Zielvisualisierung",
        keywords: ["bild", "visualisierung", "metapher", "symbol"],
        preview: "Ich habe folgendes Bild gewählt...",
        prompt: "Analysiere das gewählte Bild/die Metapher für '[PROBLEM]'. Was sagt dieses Bild über das Coaching-Ziel aus? In welcher Beziehung stehen Bild und Zielbeschreibung zueinander? Welche Bedeutung hat das gewählte Bild für die Coachingproblematik? Nutze die Symbolik zur Interpretation tieferer emotionaler Aspekte.",
        phase: 1,
        step: 3
    },
    {
        title: "⚖️ Schritt 4: Ausbalancierungsproblem-Identifikation",
        keywords: ["ausbalancierung", "polarität", "konflikt", "spannung"],
        preview: "Identifiziere das Ausbalancierungsproblem...",
        prompt: "Identifiziere mit Hilfe typischer Ausbalancierungsprobleme (z.B. Sicherheit vs. Risikobereitschaft, Anpassung vs. Authentizität, Selbstinszenierung vs. Zurückhaltung) dasjenige Problem bei '[PROBLEM]', das am klarsten erkennbar ist. Welche diagnostischen Fragen würden helfen, dieses Ausbalancierungsproblem sicherer zu klären?",
        phase: 1,
        step: 4
    },

    // Phase 2: Problemanalyse  
    {
        title: "🎭 Schritt 7: Auswertung - Die innere Bremse",
        keywords: ["bremse", "widerstand", "hindernis", "blockade"],
        preview: "Versetze dich in die Bremse...",
        prompt: "Versetze dich in die 'Bremse' - den hemmenden Persönlichkeitsanteil bei '[PROBLEM]'. Trage weitere Argumente vor, die DAGEGEN sprechen, das Coaching-Ziel zu verfolgen. Nutze typische Ausbalancierungsprobleme wie Angst vor Überforderung, Perfektionismus, soziale Anpassung. Beleuchte die Problematik aus der Perspektive der inneren Widerstände.",
        phase: 2,
        step: 7
    },
    {
        title: "📊 Schritt 7b: Ranking der Ausbalancierungsdimensionen", 
        keywords: ["ranking", "dimensionen", "priorität", "gewichtung"],
        preview: "Analysiere und erstelle ein Ranking...",
        prompt: "Analysiere '[PROBLEM]' mit Hilfe der 18 Ausbalancierungsdimensionen (Minderwertigkeit vs. Großartigkeit, Anerkennungsstreben vs. Egozentrik, Selbstinszenierung vs. Zurückhaltung, etc.). Erstelle ein Ranking: Setze die wichtigste Ausbalancierungsdimension auf Rangplatz 1 und die unwichtigste auf Rang 18. Begründe die Priorisierung.",
        phase: 2,
        step: 7
    },
    {
        title: "🔗 Schritt 7c: Kausalzusammenhang der Ursachen",
        keywords: ["kausal", "ursachen", "zusammenhang", "dynamik"],
        preview: "Kläre wie die Probleme ursächlich zusammenhängen...",
        prompt: "Basierend auf der Rangpositionierung von '[PROBLEM]': Erkläre, wie die Probleme der wichtigsten Ausbalancierungsdimensionen ursächlich zusammenhängen. Verdeutliche das gesamte Kausalgefüge zwischen den drei wichtigsten Dimensionen. Beispiel: Geringer Selbstwert → hoher Anerkennungsbedarf → Perfektionismus → Aufschiebeverhalten.",
        phase: 2,
        step: 7
    },

    // Phase 3: Lösungsstrategie
    {
        title: "🎯 Schritt 8: Übergeordnetes Lern- und Entwicklungsziel",
        keywords: ["lernziel", "entwicklung", "wachstum", "transformation"],
        preview: "Formuliere ein übergeordnetes Lern- und Entwicklungsziel...",
        prompt: "Formuliere auf Basis der bisherigen Erkenntnisse zu '[PROBLEM]' ein übergeordnetes Lern- und Entwicklungsziel. Dies soll das 'Ziel hinter dem Ziel' definieren, das auf nachhaltige Persönlichkeitsentwicklung abzielt. Transformiere die diagnostischen Erkenntnisse in ein positives, zukunftsgerichtetes Lernziel.",
        phase: 3,
        step: 8
    },
    {
        title: "🛡️ Schritt 10: Analyse der Umsetzungswiderstände",
        keywords: ["widerstände", "blockaden", "glaubenssätze", "innere regeln"],
        preview: "Analysiere die realitätsprägenden Überzeugungen...",
        prompt: "Analysiere bei '[PROBLEM]': Welche realitätsprägenden Überzeugungen und inneren Regeln stecken hinter den Umsetzungswiderständen? Was hemmt die Umsetzung des Entwicklungsziels? Rekonstruiere die tieferliegenden Glaubenssätze und unbewussten Regeln (z.B. 'Nur Perfektion schützt vor Blamage', 'Sichtbarkeit ist gefährlich').",
        phase: 3,
        step: 10
    },
    {
        title: "✨ Schritt 11: Entwicklung einer Erfolgsimagination",
        keywords: ["erfolgsimagination", "vision", "zukunft", "komplementärkräfte"],
        preview: "Beschreibe die positiven Veränderungen...",
        prompt: "Entwickle für '[PROBLEM]' eine detaillierte Erfolgsimagination in Ich-Form. Nutze die Komplementärkräfte der identifizierten Ausbalancierungsprobleme und das Ideal einer optimalen Balance. Beschreibe sehr differenziert, lebensnah und persönlich - wie in einem Film - sowohl äußerlich beobachtbare als auch innerpsychische Veränderungen. Starte mit der unveränderten Schlüsselsituation und beschreibe dann den deutlich veränderten Schlüsselaffekt.",
        phase: 3,
        step: 11
    },

    // Klassische Coaching-Techniken
    {
        title: "🌐 Systemische Zirkuläre Frage",
        keywords: ["systemisch", "zirkulär", "umfeld", "beziehung"],
        preview: "Wer in Ihrem Umfeld würde sagen...",
        prompt: "Entwickle 3-5 systemische zirkuläre Fragen für '[PROBLEM]'. Format: 'Wer würde...' oder 'Was würde [Person] sagen...' Beziehe verschiedene relevante Personen aus dem Umfeld ein."
    },
    {
        title: "💪 Ressourcen-Aktivierung", 
        keywords: ["ressourcen", "stärken", "erfolg", "potentiale"],
        preview: "Erzählen Sie von einem Erfolg...",
        prompt: "Analysiere Stärken und Ressourcen in '[SITUATION]'. Erfrage Erfolgsgeschichten, Bewältigungsstrategien und soziale Unterstützung. Mache vorhandene Ressourcen sichtbar und nutzbar."
    },
    {
        title: "⚖️ Skalierungsfrage",
        keywords: ["skalierung", "skala", "grad", "bewertung"], 
        preview: "Auf einer Skala von 1-10...",
        prompt: "Entwickle Skalierungsfragen für '[THEMA]'. Dimensionen: Klarheit, Motivation, Selbstvertrauen. Nutze auch Subskalierungen und Veränderungsfragen."
    },
    {
        title: "🎨 Metaphern-Arbeit",
        keywords: ["metapher", "bild", "symbol", "landschaft"],
        preview: "Wenn Ihre Situation ein Bild wäre...", 
        prompt: "Entwickle Metaphern-Fragen für '[SITUATION]'. Bereiche: Landschaft, Wetter, Reise, Gebäude, Tiere. Lade zur bildhaften Beschreibung ein."
    },
    {
        title: "✨ Wunderfrage",
        keywords: ["wunder", "zukunft", "veränderung", "lösung"],
        preview: "Über Nacht geschieht ein Wunder...",
        prompt: "Formuliere detaillierte Wunderfrage für '[PROBLEM]'. Was wäre anders? Wer würde es merken? Wie würde der Tag ablaufen?"
    },
    {
        title: "👥 Teile-Arbeit",
        keywords: ["teile", "anteile", "ambivalenz", "konflikt"],
        preview: "Ein Teil von Ihnen möchte...",
        prompt: "Analysiere innere Anteile bei '[KONFLIKT]'. Welche Stimmen? Welche Bedürfnisse? Lade zur Dialogführung zwischen den Anteilen ein."
    },
    {
        title: "🔍 Ausnahmen erforschen",
        keywords: ["ausnahme", "unterschied", "besser", "anders"],
        preview: "Wann war es schon mal anders?",
        prompt: "Erfrage Ausnahmen vom Problem bei '[SITUATION]'. Wann war es besser? Was war dann anders? Wie kam es dazu?"
    },
    {
        title: "🎯 Zielfokussierung",
        keywords: ["ziel", "fokus", "richtung", "zeichen"],
        preview: "Was wäre das erste Zeichen...",
        prompt: "Entwickle zielgerichtete Fragen für '[ZIEL]'. Konkrete Schritte, messbare Ergebnisse, erste Anzeichen für Fortschritt."
    },
    {
        title: "🔄 Reframing-Techniken",
        keywords: ["reframing", "perspektive", "umdeutung", "sichtweise"],
        preview: "Betrachten wir das aus einem anderen Blickwinkel...",
        prompt: "Entwickle Reframing-Optionen für '[PROBLEM]'. Alternative Sichtweisen, positive Umdeutungen, neue Bewertungen."
    },
    {
        title: "🌱 Entwicklungsschritte",
        keywords: ["entwicklung", "wachstum", "schritte", "prozess"],
        preview: "Welcher kleine Schritt könnte der erste sein?",
        prompt: "Definiere konkrete Entwicklungsschritte für '[ZIEL]'. Kleine, erreichbare Meilensteine in logischer Reihenfolge."
    }
];

// Client Data (ERWEITERT)
const clients = {
    sarah: {
        name: "Sarah Weber",
        age: "35 Jahre, Marketing-Managerin", 
        problem: "Karrierewechsel-Entscheidung zwischen Sicherheit und Nachhaltigkeit",
        background: "10 Jahre Marketing-Erfahrung, träumt von nachhaltiger Arbeit",
        ausbalancierungsproblem: "Sicherheit vs. Risikobereitschaft",
        zielBild: "Ein Baum, der trotz Sturm flexibel bleibt aber tiefe Wurzeln hat"
    },
    marcus: {
        name: "Marcus Schmidt",
        age: "48 Jahre, Ingenieur",
        problem: "Midlife-Krise und Wunsch nach beruflicher Neuorientierung", 
        background: "20 Jahre in derselben Firma, fühlt sich unterfordert",
        ausbalancierungsproblem: "Routine vs. Herausforderung",
        zielBild: "Ein Fluss, der neue Wege findet, wenn alte Pfade blockiert sind"
    },
    lisa: {
        name: "Dr. Lisa Müller",
        age: "42 Jahre, Ärztin",
        problem: "Work-Life-Balance als Chirurgin mit Familie",
        background: "Burnout-Symptome, liebt ihren Beruf aber Familie leidet",
        ausbalancierungsproblem: "Berufung vs. Familie",
        zielBild: "Eine Waage, die nicht starr ist, sondern dynamisch ausbalanciert"
    },
    werner: {
        name: "Werner Hoffmann", 
        age: "62 Jahre, Abteilungsleiter",
        problem: "Übergang in den Ruhestand und neue Lebenssinn-Findung",
        background: "Jahrzehntelange Führungsrolle, Angst vor Identitätsverlust",
        ausbalancierungsproblem: "Kontrolle vs. Loslassen",
        zielBild: "Ein erfahrener Leuchtturm, der anderen den Weg weist"
    }
};

// ERWEITERTE 12 Coaching Steps mit Geißler-Methodik
const coachingSteps = [
    { 
        id: 1, 
        title: "Problem- & Zielbeschreibung", 
        description: "Erste Problem-/Zielbeschreibung mit ressourcenorientiertem Feedback", 
        prompt: "Analysiere das Problem '[PROBLEM]' und gib ressourcenorientiertes, positives Feedback. Identifiziere erste Fähigkeiten und Stärken für die Problemlösung.",
        phase: "Problem- und Zielbeschreibung"
    },
    { 
        id: 2, 
        title: "Erweiterte Problemanalyse", 
        description: "Strukturierte IST-SOLL-Analyse in Ich-Form", 
        prompt: "Erstelle einen in Ich-Form geschriebenen Bericht für '[PROBLEM]' mit IST- und SOLL-Situation. Berücksichtige äußere Rahmenbedingungen, psychische Prozesse und Verhaltensweisen.",
        phase: "Problem- und Zielbeschreibung"
    },
    { 
        id: 3, 
        title: "Immersive Bildarbeit", 
        description: "Zielvisualisierung durch Bildanalyse", 
        prompt: "Analysiere die Symbolik des gewählten Bildes für '[PROBLEM]'. Was sagt es über das Coaching-Ziel aus? Welche tieferen emotionalen Aspekte werden sichtbar?",
        phase: "Problem- und Zielbeschreibung"
    },
    { 
        id: 4, 
        title: "Ausbalancierungsproblem", 
        description: "Identifikation zentraler Polaritätskonflikte", 
        prompt: "Identifiziere das zentrale Ausbalancierungsproblem bei '[PROBLEM]'. Welche diagnostischen Fragen helfen bei der Klärung?",
        phase: "Problem- und Zielbeschreibung"
    },
    { 
        id: 5, 
        title: "Ressourcenanalyse", 
        description: "Systematische Erfassung vorhandener Stärken", 
        prompt: "Analysiere alle verfügbaren Ressourcen für '[PROBLEM]': persönliche Stärken, soziales Netzwerk, materielle Ressourcen, Erfahrungen.",
        phase: "Problemanalyse"
    },
    { 
        id: 6, 
        title: "Systemische Einbettung", 
        description: "Umfeld- und Beziehungsanalyse", 
        prompt: "Erfasse das systemische Umfeld bei '[PROBLEM]'. Wer ist betroffen? Welche Rollen und Erwartungen bestehen? Systemische Hypothesen.",
        phase: "Problemanalyse"
    },
    { 
        id: 7, 
        title: "Teile-Arbeit & Ranking", 
        description: "Innere Anteile und Ausbalancierungsdimensionen", 
        prompt: "Analysiere innere Anteile und erstelle Ranking der Ausbalancierungsdimensionen bei '[PROBLEM]'. Welche Widerstände und Antreiber?",
        phase: "Problemanalyse"
    },
    { 
        id: 8, 
        title: "Lern- & Entwicklungsziel", 
        description: "Übergeordnetes Entwicklungsziel definieren", 
        prompt: "Formuliere das übergeordnete Lern- und Entwicklungsziel für '[PROBLEM]' - das 'Ziel hinter dem Ziel' für nachhaltige Entwicklung.",
        phase: "Lösungsstrategie"
    },
    { 
        id: 9, 
        title: "Lösungsoptionen", 
        description: "Konkrete Handlungsalternativen entwickeln", 
        prompt: "Entwickle 4-5 konkrete Lösungsoptionen für '[PROBLEM]'. Von konservativ bis mutig, mit Bewertung der Umsetzbarkeit.",
        phase: "Lösungsstrategie"
    },
    { 
        id: 10, 
        title: "Umsetzungswiderstände", 
        description: "Analyse hinderlicher Glaubenssätze und Regeln", 
        prompt: "Analysiere realitätsprägende Überzeugungen und innere Regeln, die die Umsetzung bei '[PROBLEM]' behindern. Welche Glaubenssätze wirken limitierend?",
        phase: "Lösungsstrategie"
    },
    { 
        id: 11, 
        title: "Erfolgsimagination", 
        description: "Detaillierte Vision der positiven Veränderung", 
        prompt: "Entwickle eine lebendige Erfolgsimagination für '[PROBLEM]' in Ich-Form. Nutze Komplementärkräfte und beschreibe die Transformation sehr konkret und sinnlich.",
        phase: "Lösungsstrategie"
    },
    { 
        id: 12, 
        title: "Commitment & Integration", 
        description: "Verbindlichkeit schaffen und nächste Schritte", 
        prompt: "Stärke das Commitment für '[PROBLEM]'. Konkrete nächste Schritte, Accountability-Strukturen, Integration in den Alltag.",
        phase: "Lösungsstrategie"
    }
];

// ERWEITERTE Client Response Templates
const clientResponses = {
    sarah: {
        1: "Ja, das ist genau mein Problem. Ich bin unsicher, ob ich den Wechsel in den nachhaltigen Sektor wagen soll. Die Sicherheit ist wichtig, aber ich fühle mich nicht mehr erfüllt.",
        2: "Aktuell verdiene ich gut, aber arbeite für Produkte, hinter denen ich nicht stehe. Mein Soll-Zustand wäre: sinnvolle Arbeit mit ausreichend Sicherheit.",
        3: "Mein Zielbild ist ein Baum - stark verwurzelt, aber flexibel genug für Stürme. Das zeigt meine Sehnsucht nach Stabilität UND Wachstum.",
        4: "Das Ausbalancierungsproblem ist definitiv Sicherheit gegen Risikobereitschaft. Ich schwanke zwischen 'sicher ist sicher' und 'wer nicht wagt, der nicht gewinnt'.",
        7: "Meine innere Bremse sagt: 'Du hast doch einen sicheren Job! Was, wenn der neue nicht klappt? Du wirst dich ärgern!' Aber da ist auch eine Stimme, die sagt: 'Du verschwendest dein Leben!'",
        8: "Mein übergeordnetes Lernziel wäre: Vertrauen in meine Fähigkeit entwickeln, auch in Unsicherheit gute Entscheidungen zu treffen.",
        10: "Meine Glaubenssätze sind: 'Nur ein sicherer Job schützt vor Armut' und 'Traumjobs sind Luxus, den sich nur wenige leisten können'.",
        11: "In meiner Erfolgsimagination stehe ich morgens auf und freue mich auf die Arbeit. Ich arbeite für ein nachhaltiges Unternehmen, verdiene weniger, aber lebe bewusster und bin zufrieden."
    },
    marcus: {
        1: "Seit Monaten fühle ich mich gefangen. 20 Jahre derselbe Job - früher war das mein Traum, jetzt langweile ich mich zu Tode.",
        2: "IST: Routine-Aufgaben, die ich mit links mache, aber innerlich leer bin. SOLL: Neue Herausforderungen, vielleicht sogar Führungsverantwortung in einem innovativeren Umfeld.",
        3: "Mein Bild ist ein Fluss, der neue Wege sucht, wenn der alte Pfad blockiert ist. Das zeigt meinen Wunsch nach Bewegung und neuen Möglichkeiten.",
        4: "Mein Ausbalancierungsproblem: Routine versus Herausforderung. Ich bin zwischen 'bewährte Sicherheit' und 'Mut zum Neuen' gefangen.",
        7: "Die Bremse sagt: 'Mit 48 stellt dich keiner mehr ein! Du kennst doch nichts anderes! Bleib, wo du bist!' Aber der Antreiber schreit: 'Du vergeudest deine besten Jahre!'",
        8: "Mein Lernziel: Den Mut entwickeln, auch in der Lebensmitte noch große Veränderungen anzugehen - und dabei meine Erfahrung als Stärke zu sehen.",
        10: "Meine limitierenden Glaubenssätze: 'Nach 20 Jahren ist man festgelegt' und 'Veränderung ist nur was für Junge'.",
        11: "In meiner Vision leite ich ein innovatives Team, bringe meine Erfahrung ein, lerne aber auch täglich Neues. Das Alter ist Stärke, nicht Hindernis."
    },
    lisa: {
        1: "Die Balance wird immer schwieriger. Ich liebe meinen Beruf als Chirurgin, aber Familie und ich selbst leiden unter den 70-Stunden-Wochen.",
        2: "IST: Permanent im Krankenhaus, wenig Zeit für Familie, Erschöpfung. SOLL: Weiterhin exzellente Chirurgin, aber mehr Zeit für das, was auch wichtig ist.",
        3: "Meine Metapher ist eine Waage - aber nicht starr, sondern dynamisch ausbalanciert. Mal Familie, mal Beruf, aber insgesamt im Gleichgewicht.",
        4: "Mein Ausbalancierungsproblem: Berufung versus Familie. Beides ist mir wichtig, aber sie scheinen sich zu bekämpfen.",
        7: "Die Bremse: 'Als Chirurgin trägst du Verantwortung! Du kannst nicht einfach weniger arbeiten!' Der Antreiber: 'Deine Kinder brauchen dich auch!'",
        8: "Mein Lernziel: Eine neue Definition von Erfolg entwickeln, die sowohl berufliche Exzellenz als auch persönliches Wohlbefinden einschließt.",
        10: "Meine Glaubenssätze: 'Gute Ärzte opfern sich auf' und 'Wer Karriere macht, muss Abstriche machen'.",
        11: "Ich sehe mich als Chirurgin, die exzellent arbeitet UND Zeit für Familie hat. Weniger Stunden, aber fokussierter. Quality over Quantity."
    },
    werner: {
        1: "Der Ruhestand kommt näher und ich schwanke zwischen Vorfreude und Panik. 40 Jahre war mein Job meine Identität - wer bin ich ohne ihn?",
        2: "IST: Ich bin 'der Chef', alle fragen mich, ich entscheide. SOLL: Neue Rolle finden, weiterhin wertvoll sein, aber anders.",
        3: "Mein Bild ist ein erfahrener Leuchtturm, der jüngeren Schiffen den Weg weist. Nicht mehr der Kapitän, aber immer noch wichtig für die Navigation.",
        4: "Ausbalancierungsproblem: Kontrolle versus Loslassen. Schwer, nach Jahrzehnten der Führung die Zügel abzugeben.",
        7: "Die Bremse warnt: 'Ohne Job bist du nichts! Du wirst dich zu Tode langweilen!' Der andere Teil sagt: 'Endlich Zeit für dich und neue Abenteuer!'",
        8: "Mein Lernziel: Eine neue Identität entwickeln, die nicht nur auf beruflicher Rolle basiert, sondern auf meinen Werten und Erfahrungen.",
        10: "Meine Glaubenssätze: 'Wert bemisst sich an Produktivität' und 'Ruhestand bedeutet Bedeutungslosigkeit'.",
        11: "Ich sehe mich als Mentor für junge Führungskräfte, engagiert in sozialen Projekten, mit Zeit für Hobbys und Familie. Weiser Berater statt Befehlsgeber."
    }
};

// Coaching Techniques (ERWEITERT)
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
    'Metapher': 'Wenn Ihre Situation ein Wetter wäre, welches wäre das?',
    'Systemisch': 'Wer in Ihrem Umfeld würde über diese Situation was sagen?',
    'Ausbalancierung': 'Ich höre da eine Spannung zwischen... und... Ist das richtig?',
    'Komplementär': 'Was wäre das Gegenteil von diesem Problem - und was davon ist bereits da?',
    'Paradox': 'Vielleicht ist es noch nicht der richtige Zeitpunkt für diese Veränderung?'
};

// Ausbalancierungsprobleme nach Geißler
const ausbalancierungsProbleme = [
    { nr: 1, polaritaet: "Minderwertigkeit ↔ Großartigkeit", beschreibung: "Zwischen Selbstzweifeln und Größenfantasien" },
    { nr: 2, polaritaet: "Anerkennungsstreben ↔ Egozentrik", beschreibung: "Zwischen dem Wunsch nach Anerkennung und narzisstischer Selbstbezogenheit" },
    { nr: 3, polaritaet: "Selbstinszenierung ↔ Zurückhaltung", beschreibung: "Zwischen dem Drang sich zu zeigen und sozialer Hemmung" },
    { nr: 4, polaritaet: "Perfektionismus ↔ Ungenauigkeit", beschreibung: "Zwischen übertriebener Genauigkeit und Nachlässigkeit" },
    { nr: 5, polaritaet: "Leistungsstreben ↔ Bequemlichkeit", beschreibung: "Zwischen Hochleistung und Komfortzone" },
    { nr: 6, polaritaet: "Kontrolle ↔ Loslassen", beschreibung: "Zwischen Kontrollbedürfnis und Vertrauen" },
    { nr: 7, polaritaet: "Sicherheit ↔ Risikobereitschaft", beschreibung: "Zwischen Vorsicht und Mut zur Veränderung" },
    { nr: 8, polaritaet: "Anpassung ↔ Authentizität", beschreibung: "Zwischen sozialer Anpassung und authentischem Selbstausdruck" },
    { nr: 9, polaritaet: "Nähe ↔ Distanz", beschreibung: "Zwischen Bindungswunsch und Autonomiebedürfnis" },
    { nr: 10, polaritaet: "Geben ↔ Nehmen", beschreibung: "Zwischen selbstloser Hingabe und eigenen Bedürfnissen" },
    { nr: 11, polaritaet: "Aktivität ↔ Passivität", beschreibung: "Zwischen Handlungsdrang und Abwarten" },
    { nr: 12, polaritaet: "Struktur ↔ Flexibilität", beschreibung: "Zwischen Ordnung und Spontaneität" },
    { nr: 13, polaritaet: "Optimismus ↔ Pessimismus", beschreibung: "Zwischen positiver und negativer Weltsicht" },
    { nr: 14, polaritaet: "Individualität ↔ Zugehörigkeit", beschreibung: "Zwischen Einzigartigkeit und Gruppenzugehörigkeit" },
    { nr: 15, polaritaet: "Rationalität ↔ Emotionalität", beschreibung: "Zwischen Verstand und Gefühl" },
    { nr: 16, polaritaet: "Stabilität ↔ Veränderung", beschreibung: "Zwischen Bewahrung und Transformation" },
    { nr: 17, polaritaet: "Selbstfürsorge ↔ Selbstverleugnung", beschreibung: "Zwischen eigenen Bedürfnissen und Selbstaufopferung" },
    { nr: 18, polaritaet: "Konkurrenz ↔ Kooperation", beschreibung: "Zwischen Wettbewerb und Zusammenarbeit" }
];

// KI Response Templates (erweitert mit Geißler-Methodik)
const kiResponseTemplates = {
    1: {
        title: "🎯 Ressourcenorientierte Erstanalyse für {CLIENT}",
        content: `<strong>Zentrale Herausforderung:</strong> {PROBLEM}<br><br>
        <strong>Bereits erkennbare Stärken:</strong><br>
        • Reflexionsfähigkeit - Sie erkennen das Problem klar<br>
        • Veränderungsbereitschaft - Sie suchen aktiv nach Lösungen<br>
        • Mut - Sie sprechen schwierige Themen an<br><br>
        <strong>Empfohlene Coaching-Fragen:</strong><br>
        • "Was in dieser Situation zeigt Ihre Stärke?"<br>
        • "Welche Ressourcen haben Sie bereits genutzt?"<br>
        • "Was gibt Ihnen Hoffnung in diesem Prozess?"<br><br>
        <strong>Coach-Strategie:</strong> Schaffen Sie Vertrauen durch Ressourcen-Würdigung. Der Beziehungsaufbau steht im Vordergrund.`
    },
    
    2: {
        title: "📋 Strukturierte Problem-Ziel-Analyse für {CLIENT}",
        content: `<strong>IST-Situation (in Ich-Form):</strong><br>
        "Ich befinde mich in einer Situation, die durch {PROBLEM} geprägt ist. Äußerlich zeigt sich das durch... 
        Psychisch erlebe ich... Mein Verhalten führt dazu, dass... Die Folgen bei meinen Mitmenschen sind..."<br><br>
        <strong>SOLL-Situation (in Ich-Form):</strong><br>
        "Ich möchte erreichen, dass... Äußerlich würde sich das zeigen durch... 
        Psychisch würde ich erleben... Mein Verhalten wäre... Die Auswirkungen auf andere wären..."<br><br>
        <strong>Coach-Hinweis:</strong> Diese Struktur macht die Komplexität der Situation sichtbar und schafft Klarheit über gewünschte Veränderungen.`
    },
    
    3: {
        title: "🖼️ Bildarbeit und Zielvisualisierung für {CLIENT}",
        content: `<strong>Bildsymbolik-Analyse:</strong><br>
        Das gewählte Bild/Metapher zeigt folgende Aspekte Ihres Coaching-Ziels:<br>
        • <strong>Emotionale Ebene:</strong> Was das Bild in Ihnen auslöst<br>
        • <strong>Symbolische Bedeutung:</strong> Welche tieferen Wünsche erkennbar werden<br>
        • <strong>Entwicklungspotential:</strong> Wohin die Reise gehen könnte<br><br>
        <strong>Vertiefende Fragen:</strong><br>
        • "Welcher Aspekt des Bildes ist am wichtigsten für Sie?"<br>
        • "Was müsste sich ändern, damit das Bild noch stimmiger wird?"<br>
        • "Welche Geschichte erzählt Ihr Bild über Ihre Zukunft?"<br><br>
        <strong>Coach-Strategie:</strong> Bildarbeit erschließt unbewusste Zielaspekte und emotionale Motivationen.`
    },
    
    4: {
        title: "⚖️ Ausbalancierungsproblem-Diagnose für {CLIENT}",
        content: `<strong>Identifiziertes Hauptproblem:</strong> {AUSBALANCIERUNG}<br><br>
        <strong>Diagnostische Hypothese:</strong><br>
        Sie bewegen sich zwischen zwei Polen, die beide wichtige Bedürfnisse repräsentieren. 
        Keiner der Pole ist "falsch", aber die Balance fehlt.<br><br>
        <strong>Vertiefende Fragen zur Klärung:</strong><br>
        • "Wann ist welcher Pol stärker ausgeprägt?"<br>
        • "Was sind die positiven Aspekte beider Seiten?"<br>
        • "Wie würde eine optimale Balance aussehen?"<br>
        • "Welche Erfahrungen haben diese Polarität geprägt?"<br><br>
        <strong>Coach-Hinweis:</strong> Würdigen Sie beide Pole - das Problem liegt nicht in der Polarität, sondern in der fehlenden Integration.`
    },
    
    7: {
        title: "🎭 Innere Anteile und Ausbalancierungs-Ranking für {CLIENT}",
        content: `<strong>Die "Bremse" argumentiert:</strong><br>
        • "Was, wenn die Veränderung schiefgeht?"<br>
        • "Das Bekannte ist sicherer als das Unbekannte!"<br>
        • "Andere haben auch Erwartungen an mich!"<br>
        • "Besser vorsichtig sein als hinterher bereuen!"<br><br>
        <strong>Ausbalancierungsdimensionen-Ranking:</strong><br>
        1. {HAUPT_AUSBALANCIERUNG} (zentral für das Problem)<br>
        2. {ZWEITE_DIMENSION} (verstärkender Faktor)<br>
        3. {DRITTE_DIMENSION} (sekundärer Einfluss)<br><br>
        <strong>Kausaler Zusammenhang:</strong><br>
        Die Dimensionen verstärken sich gegenseitig: Problem 1 → führt zu Problem 2 → verstärkt Problem 3 → verstärkt Problem 1<br><br>
        <strong>Coach-Strategie:</strong> Beide Seiten der Ambivalenz würdigen und zur Integration führen.`
    },
    
    8: {
        title: "🎯 Übergeordnetes Entwicklungsziel für {CLIENT}",
        content: `<strong>Das Ziel hinter dem Ziel:</strong><br>
        Basierend auf der Diagnose lautet Ihr übergeordnetes Lern- und Entwicklungsziel:<br><br>
        <em>"Entwicklung einer reifen Entscheidungskompetenz, die sowohl {POLARITÄT_1} als auch {POLARITÄT_2} 
        integriert und zu ausgewogenen, authentischen Lebensentscheidungen führt."</em><br><br>
        <strong>Konkrete Lernziele:</strong><br>
        • Beide Pole der Hauptpolarität als wertvoll anerkennen<br>
        • Situationsangemessene Balance entwickeln<br>
        • Vertrauen in die eigene Integrationsfähigkeit stärken<br>
        • Langfristige Lebenszufriedenheit über kurzfristige Lösungen stellen<br><br>
        <strong>Coach-Hinweis:</strong> Dieses Ziel geht über die aktuelle Situation hinaus und fördert nachhaltige Persönlichkeitsentwicklung.`
    },
    
    10: {
        title: "🧠 Analyse der Umsetzungswiderstände für {CLIENT}",
        content: `<strong>Realitätsprägende Überzeugungen:</strong><br>
        Hinter Ihren Umsetzungshemmnissen stehen folgende tiefliegende Glaubenssätze:<br>
        • "{GLAUBENSSATZ_1}"<br>
        • "{GLAUBENSSATZ_2}"<br>
        • "{GLAUBENSSATZ_3}"<br><br>
        <strong>Innere Regeln der Handlungssteuerung:</strong><br>
        • <strong>Realitätswahrnehmung:</strong> "Die Welt ist..."<br>
        • <strong>Handlungsstrategie:</strong> "Ich muss..."<br>
        • <strong>Willensbildung:</strong> "Entscheidungen sind richtig, wenn..."<br><br>
        <strong>Transformationsansatz:</strong><br>
        Diese Regeln waren in der Vergangenheit sinnvoll, begrenzen aber heute Ihre Entwicklung. 
        Neue, erweiterte Regeln könnten lauten: "{NEUE_REGEL}"<br><br>
        <strong>Coach-Strategie:</strong> Sanfte Hinterfragung der limitierenden Überzeugungen ohne Bewertung.`
    },
    
    11: {
        title: "✨ Lebendige Erfolgsimagination für {CLIENT}",
        content: `<strong>Erfolgsimagination in Ich-Form:</strong><br><br>
        <em>"Ich befinde mich in derselben Schlüsselsituation wie früher, aber etwas Grundlegendes hat sich verändert. 
        Wo ich früher {ALTER_ZUSTAND} erlebt habe, spüre ich jetzt {NEUER_ZUSTAND}.<br><br>
        
        Äußerlich beobachtbar: Meine Körperhaltung ist aufrechter, meine Stimme klarer, meine Bewegungen entspannter. 
        Ich gehe die Situation {NEUE_HERANGEHENSWEISE} an.<br><br>
        
        Innerpsychisch: Ich fühle {NEUE_GEFÜHLE}, denke {NEUE_GEDANKEN} und bin motiviert durch {NEUE_MOTIVATION}. 
        Die innere Balance zwischen {POLARITÄT_1} und {POLARITÄT_2} ist erreicht.<br><br>
        
        Die Menschen um mich herum reagieren mit {REAKTIONEN_ANDERER}. Das zeigt mir, dass die Veränderung nicht nur innerlich, 
        sondern auch nach außen sichtbar geworden ist."</em><br><br>
        
        <strong>Coach-Hinweis:</strong> Diese Imagination nutzt die Komplementärkräfte der Ausbalancierungsprobleme 
        und zeigt konkret, wie die optimale Balance aussehen und sich anfühlen würde.`
    }
};

// Export configuration (ERWEITERT)
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
            sections: ['meta', 'notes', 'steps', 'collaboration', 'coachKI']
        },
        managementReport: {
            title: 'Coach Mission Control - Management Summary',
            sections: ['executive', 'features', 'roi', 'recommendation', 'workflows']
        },
        geisslerReport: {
            title: 'Geißler-Coaching Protokoll',
            sections: ['problemanalyse', 'ausbalancierung', 'loesungsstrategie', 'erfolgsimagination']
        }
    }
};

// Application configuration (ERWEITERT)
const appConfig = {
    version: '3.1',
    name: 'Coach Mission Control',
    description: 'Triadisches KI-Coaching System mit Geißler-Methodik',
    collaboration: {
        urlParam: 'session',
        autoSaveInterval: 10000, // 10 seconds
        syncInterval: 1000, // 1 second
        approvalTimeout: 300000 // 5 minutes
    },
    ui: {
        maxNotesDisplay: 5,
        chatMessagesHeight: 350,
        autoScrollDelay: 1000,
        workflowSteps: 3
    },
    sales: {
        earlyBirdPrice: 197,
        regularPrice: 497,
        currency: '€',
        contactEmail: 'info@coachmissioncontrol.com'
    },
    geissler: {
        phases: [
            { id: 1, name: "Problem- und Zielbeschreibung", steps: [1, 2, 3, 4] },
            { id: 2, name: "Problemanalyse", steps: [5, 6, 7] },
            { id: 3, name: "Lösungsstrategie", steps: [8, 9, 10, 11, 12] }
        ],
        ausbalancierungsDimensionen: 18,
        maxSessionDuration: 120 // minutes
    }
};