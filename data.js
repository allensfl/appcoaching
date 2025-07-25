// KOMPLETTE COACHING PROMPT-BIBLIOTHEK
// Flavien's Solution Finder System + OpenAI Playground Assistenten-Prompts
// Über 80 professionelle Coaching-Prompts

// ===== GEISSLER TRIADISCH (GT1-GT12) =====
const geisslerPrompts = {
    GT1: {
        text: "Ich habe folgendes Anliegen: [PROBLEMBESCHREIBUNG]. Kannst du mir helfen, das strukturiert zu durchdenken?",
        category: "GT",
        phase: 1,
        description: "ERSTANLIEGEN - Offene Eingangsfrage zur Problemdefinition",
        methodeninfo: "Schritt 1: Erste Problemdefinition und Strukturierung des Anliegens"
    },
    GT2: {
        text: "Hier noch zusätzliche Informationen zu meinem Anliegen: [ERGÄNZUNGEN]. Bitte fasse meine Situation strukturiert zusammen und gliedere in: - Ist-Situation (was ist jetzt) - Soll-Situation (was soll werden) - Erste Hypothesen zu möglichen Ursachen",
        category: "GT",
        phase: 1,
        description: "ZUSATZINFORMATIONEN - Strukturierte Situationsanalyse",
        methodeninfo: "Schritt 2: Ist-Soll-Analyse mit ersten Ursachenhypothesen"
    },
    GT3: {
        text: "Ich habe folgendes Bild gewählt: [BILDBESCHREIBUNG]. Was sagt dieses Bild über mein Coaching-Ziel aus? Welche unbewussten Aspekte meines Anliegens könnte es widerspiegeln?",
        category: "GT",
        phase: 1,
        description: "SYMBOLBILD-ANALYSE - Unbewusste Aspekte durch Metaphern",
        methodeninfo: "Schritt 3: Symbolische Zielfindung durch Bildanalyse"
    },
    GT4: {
        text: "Bitte analysiere mein Anliegen und identifiziere mit Hilfe des Textbausteins 'ausbalancierungsprobleme' das Ausbalancierungsproblem, das am besten zu meiner Situation passt. Erkläre, warum diese Spannungspole für mich relevant sind.",
        category: "GT",
        phase: 1,
        description: "AUSBALANCIERUNGSPROBLEME - Spannungsfeld-Identifikation",
        methodeninfo: "Schritt 4: Analyse von Spannungsfeldern und Balanceproblemen"
    },
    GT5: {
        text: "Hier ist meine Schlüsselsituation: [DETAILLIERTE BESCHREIBUNG]. In diesem Moment fühlte ich: [AFFEKT/EMOTION]. Bitte analysiere diese Situation und hilf mir zu verstehen, was da passiert ist.",
        category: "GT",
        phase: 2,
        description: "SCHLÜSSELSITUATION - Tiefenanalyse kritischer Momente",
        methodeninfo: "Schritt 5: Analyse der emotionalen Schlüsselsituation"
    },
    GT6: {
        text: "Versetze dich bitte in die Perspektive der 'Bremse/des Widerstands', die in meinem obigen Transkript erwähnt wird. Welche weiteren Argumente könnte diese innere Stimme vorbringen? Was könnte ihre positive Absicht sein?",
        category: "GT",
        phase: 2,
        description: "AVATAR-PERSPEKTIVE - Widerstandsanalyse durch Rollenwechsel",
        methodeninfo: "Schritt 6: Verstehen der inneren Widerstände durch Avatar-Arbeit"
    },
    GT7: {
        text: "Analysiere das obige Transkript sowie alle momentan vorliegenden Informationen zu meiner Coaching-Problematik mit Hilfe der Kategorien von Ausbalancierungsproblemen. Welche Muster erkennst du? Welche Spannungsfelder sind zentral?",
        category: "GT",
        phase: 2,
        description: "KATEGORIEN-ANALYSE - Mustererkennung in Spannungsfeldern",
        methodeninfo: "Schritt 7: Systematische Analyse der Ausbalancierungsprobleme"
    },
    GT8: {
        text: "Formuliere auf Basis der bisherigen Erkenntnisse ein übergeordnetes Lern- und Entwicklungsziel für mich. Mache es inspirierend und motivierend, aber auch konkret umsetzbar.",
        category: "GT",
        phase: 3,
        description: "LERNZIEL FORMULIEREN - Motivierende Zielentwicklung",
        methodeninfo: "Schritt 8: Entwicklung eines inspirierenden, konkreten Lernziels"
    },
    GT9: {
        text: "Gehe bitte von dieser Rangpositionierung meiner inneren Anteile aus und kläre, wie die verschiedenen Probleme und Widerstände, die auftauchen könnten, zu bewältigen wären. Welche Strategien helfen bei der Umsetzung?",
        category: "GT",
        phase: 3,
        description: "WIDERSTAND-ANALYSE - Strategien zur Überwindung von Hindernissen",
        methodeninfo: "Schritt 9: Entwicklung von Umsetzungsstrategien gegen Widerstände"
    },
    GT10: {
        text: "Analysiere dieses Transkript: Welche realitätsprägenden Überzeugungen und inneren Regeln erkennst du, die meine Umsetzung hemmen könnten? Welche alternativen, stärkenden Glaubenssätze wären hilfreich?",
        category: "GT",
        phase: 3,
        description: "GLAUBENSSÄTZE IDENTIFIZIEREN - Transformation limitierender Überzeugungen",
        methodeninfo: "Schritt 10: Identifikation und Transformation von Glaubenssätzen"
    },
    GT11: {
        text: "Bitte entwickle eine Erfolgsimagination in Ich-Form für mein Ziel: [ZIEL]. Nutze emotionale, sinnliche Sprache und male mir aus, wie es sich anfühlt, wenn ich mein Ziel erreicht habe. Mache es so konkret und motivierend wie möglich.",
        category: "GT",
        phase: 3,
        description: "ERFOLGSIMAGINATION - Motivierende Zielvision entwickeln",
        methodeninfo: "Schritt 11: Entwicklung einer sinnlich-emotionalen Erfolgsvision"
    },
    GT12: {
        text: "Erstelle einen konkreten Projektplan mit spezifischen Aktivitäten für die nächsten 4-6 Wochen. Berücksichtige meine verfügbare Zeit: [ZEITANGABE] und meine Ressourcen: [RESSOURCEN]. Teile die Schritte in machbare Wochenziele auf.",
        category: "GT",
        phase: 4,
        description: "PROJEKTPLANUNG - Konkrete Umsetzungsschritte entwickeln",
        methodeninfo: "Schritt 12: Detaillierte Projektplanung mit Zeitplan und Meilensteinen"
    }
};

// ===== SOLUTION FINDER STANDARD (SF) =====
const solutionFinderPrompts = {
    SF1: {
        text: "Du bist mein Coaching Solution Finder. Spiegle mir mein Anliegen wider und hilf mir, es klarer zu verstehen. Was hörst du zwischen den Zeilen?",
        category: "SF",
        phase: 1,
        description: "COACHING SOLUTION FINDER - Klarheit durch Spiegelung",
        methodeninfo: "Kernprozess: Verstehen und Strukturieren des Anliegens"
    },
    ZIEL: {
        text: "Hilf mir, mein Anliegen als konkretes, positives Ziel zu formulieren. Was genau möchte ich erreichen? Wie werde ich merken, dass ich es geschafft habe?",
        category: "SF",
        phase: 1,
        description: "ZIELFORMULIERUNG - Konkrete positive Zielentwicklung",
        methodeninfo: "Kernprozess: Vom Problem zum messbaren Ziel"
    },
    SKALA: {
        text: "Auf einer Skala von 1-10: Wie wichtig ist mir dieses Ziel? Wie schwierig erscheint mir die Umsetzung? Was macht den Unterschied zwischen den Zahlen aus?",
        category: "SF",
        phase: 1,
        description: "SKALENARBEIT - Motivation und Schwierigkeit bewerten",
        methodeninfo: "Kernprozess: Quantifizierung von Motivation und Hindernissen"
    },
    TEAM: {
        text: "Welche inneren Anteile sind bei diesem Thema aktiv? Stelle dein inneres Team zu diesem Anliegen auf. Wer ist dafür, wer dagegen, wer neutral?",
        category: "SF",
        phase: 2,
        description: "INNERES TEAM - Aufstellung der inneren Stimmen",
        methodeninfo: "Kernprozess: Identifikation und Mapping innerer Anteile"
    },
    DIALOG: {
        text: "Führe ein Interview mit deinen inneren Anteilen. Was sagt der Befürworter? Was die Bremse? Was der Kritiker? Lass sie ausführlich zu Wort kommen.",
        category: "SF",
        phase: 2,
        description: "DIALOGISCHE EXPLORATION - Innere Stimmen anhören",
        methodeninfo: "Kernprozess: Vertiefung der inneren Teile-Arbeit"
    },
    NAMEN: {
        text: "Wie würdest du die beiden Pole deines Spannungsfelds benennen? Was steht auf der einen, was auf der anderen Seite? Finde treffende Namen.",
        category: "SF",
        phase: 2,
        description: "ANTIPODEN BENENNEN - Spannungspole definieren",
        methodeninfo: "Kernprozess: Präzise Benennung der Polaritäten"
    },
    VAL: {
        text: "Habe ich dich richtig verstanden? Fasse zusammen, was du als dein Kernthema erkennst. Korrigiere mich, wenn etwas nicht stimmt.",
        category: "SF",
        phase: 2,
        description: "VALIDIERUNG - Verständnis überprüfen",
        methodeninfo: "Integration: Sicherstellung der gemeinsamen Basis"
    },
    TRANSFORM: {
        text: "Wie könnte eine gute Balance zwischen deinen Polen aussehen? Was wäre der Idealzustand? Wie würde sich das anfühlen?",
        category: "SF",
        phase: 3,
        description: "TRANSFORMATION - Balance zwischen Polen finden",
        methodeninfo: "Integration: Entwicklung harmonischer Lösungen"
    },
    STÄRKEN: {
        text: "Wer soll die Führung in deinem inneren Team übernehmen? Wie kann dieser Anteil gestärkt werden? Welche Unterstützung braucht er?",
        category: "SF",
        phase: 3,
        description: "TEAMCHEF STÄRKEN - Führungsanteil aktivieren",
        methodeninfo: "Integration: Stärkung des leitenden inneren Anteils"
    },
    INTEGRATION: {
        text: "Schreibe deine wichtigsten Erkenntnisse auf. Was nimmst du aus diesem Gespräch mit? Welche neuen Perspektiven hast du gewonnen?",
        category: "SF",
        phase: 3,
        description: "INTEGRATION - Erkenntnisse sichern",
        methodeninfo: "Integration: Verfestigung der Lernerfahrungen"
    },
    PLAN: {
        text: "Welche konkreten Schritte gehst du in den nächsten Tagen? Was ist der kleinste mögliche erste Schritt? Wann genau wirst du ihn machen?",
        category: "SF",
        phase: 4,
        description: "HANDLUNGSPLANUNG - Konkrete nächste Schritte",
        methodeninfo: "Handlung: Übergang vom Verstehen zum Handeln"
    },
    VISION: {
        text: "Male dir aus, wie es sich anfühlt, wenn du dein Ziel erreicht hast. Was siehst, hörst, fühlst du dann? Lass diese Vision lebendig werden.",
        category: "SF",
        phase: 4,
        description: "ERFOLGSVISION - Motivierende Zukunftsvorstellung",
        methodeninfo: "Handlung: Emotionale Verankerung des Ziels"
    }
};

// ===== DIAGNOSTISCHE PROMPTS (DIAG1-15) =====
const diagnosticPrompts = {
    DIAG1: {
        text: "Analysiere mein Anliegen: Welches der 19 Grundspannungsfelder passt am besten? Erkläre, warum diese Polarität für mich relevant ist und wie sie sich zeigt.",
        category: "DIAG",
        phase: 1,
        description: "SPANNUNGSFELD-IDENTIFIKATION - Grundpolaritäten erkennen",
        methodeninfo: "Verstehen: Strukturelle Analyse der Spannungsfelder"
    },
    DIAG2: {
        text: "Welcher Schlüsselaffekt dominiert in meiner Situation? [Lähmung/Blockade/Überforderung/Resignation/Wut/Angst/etc.] Wie zeigt sich dieser Affekt konkret bei mir?",
        category: "DIAG",
        phase: 1,
        description: "SCHLÜSSELAFFEKT ERKENNEN - Emotionale Hauptdynamik",
        methodeninfo: "Verstehen: Identifikation dominanter Gefühlsmuster"
    },
    DIAG3: {
        text: "Welche inneren Anteile erkennst du in meiner Beschreibung? Unterscheide zwischen: Teamchef, Unterstützer, Bremse, Kritiker, Beschützer, Träumer. Wer ist gerade besonders aktiv?",
        category: "DIAG",
        phase: 1,
        description: "INNERE ANTEILE DIFFERENZIEREN - Persönlichkeitsstruktur",
        methodeninfo: "Verstehen: Mapping der inneren Stimmen"
    },
    DIAG4: {
        text: "Welche limitierenden Glaubenssätze höre ich zwischen den Zeilen? Kategorien: Perfektion, Anerkennung, Kontrolle, Sicherheit, Leistung. Wie beeinflussen diese Überzeugungen mein Verhalten?",
        category: "DIAG",
        phase: 1,
        description: "GLAUBENSSÄTZE AUFDECKEN - Limitierende Überzeugungen",
        methodeninfo: "Verstehen: Analyse der mentalen Programmierung"
    },
    DIAG5: {
        text: "Welche Stärken und Ressourcen erkennst du in meiner Geschichte? Was habe ich bereits erfolgreich gemeistert? Welche Fähigkeiten kann ich für mein aktuelles Ziel nutzen?",
        category: "DIAG",
        phase: 1,
        description: "RESSOURCEN-INVENTAR - Stärken systematisch erfassen",
        methodeninfo: "Verstehen: Ressourcenorientierte Bestandsaufnahme"
    },
    DIAG6: {
        text: "Welche wiederkehrenden Muster erkennst du in meinem Verhalten? Wo zeigen sich ähnliche Herausforderungen in anderen Lebensbereichen? Was ist mein typischer Umgang mit solchen Situationen?",
        category: "DIAG",
        phase: 2,
        description: "MUSTER-ERKENNUNG - Verhaltensregelmäßigkeiten",
        methodeninfo: "Verstehen: Analyse wiederkehrender Dynamiken"
    },
    DIAG7: {
        text: "Erstelle eine emotionale Landkarte meiner Situation. Welche Gefühle sind wo verortet? Was löst welche Emotionen aus? Wo sind die emotionalen Hotspots?",
        category: "DIAG",
        phase: 2,
        description: "EMOTIONALE LANDKARTE - Gefühlsgeografie verstehen",
        methodeninfo: "Verstehen: Mapping emotionaler Trigger und Zonen"
    },
    DIAG8: {
        text: "Welche Personen, Rollen oder Systeme beeinflussen mein Thema? Wer oder was hält das Problem möglicherweise aufrecht? Welche systemischen Zusammenhänge erkennst du?",
        category: "DIAG",
        phase: 2,
        description: "SYSTEMISCHE EINFLÜSSE - Umfeld und Beziehungen",
        methodeninfo: "Verstehen: Analyse der systemischen Faktoren"
    },
    DIAG9: {
        text: "Wie hat sich mein Thema entwickelt? Wann trat es erstmals auf? Welche Wendepunkte gab es? Was hat sich über die Zeit verändert oder verstärkt?",
        category: "DIAG",
        phase: 2,
        description: "ENTWICKLUNGSGESCHICHTE - Zeitliche Verlaufsmuster",
        methodeninfo: "Verstehen: Historische Entwicklung des Themas"
    },
    DIAG10: {
        text: "Welche Werte stehen in meiner Situation möglicherweise in Konflikt? Was ist mir wichtig, was kommt zu kurz? Wie kann ich verschiedene Werte besser in Einklang bringen?",
        category: "DIAG",
        phase: 2,
        description: "WERTE-KONFLIKT - Wertepriorisierung und -harmonie",
        methodeninfo: "Verstehen: Analyse konkurrierender Wertesysteme"
    },
    DIAG11: {
        text: "Wie zeigt sich mein Thema körperlich? Welche körperlichen Reaktionen, Spannungen oder Symptome erkennst du? Was sagt mein Körper zu dieser Situation?",
        category: "DIAG",
        phase: 2,
        description: "KÖRPERLICHE SIGNALE - Embodiment des Themas",
        methodeninfo: "Verstehen: Somatische Aspekte des Problems"
    },
    DIAG12: {
        text: "Wofür verwende ich meine Energie? Was raubt mir Kraft, was gibt mir Energie? Wo versickert meine Kraft unproduktiv? Wie könnte eine bessere Energieverteilung aussehen?",
        category: "DIAG",
        phase: 2,
        description: "ENERGIEVERTEILUNG - Kraftquellen und -senken",
        methodeninfo: "Verstehen: Energiemanagement-Analyse"
    },
    DIAG13: {
        text: "Wie kommuniziere ich in dieser Situation? Welche Kommunikationsmuster zeigen sich? Was sage ich, was verschweige ich? Wie könnte ich klarer kommunizieren?",
        category: "DIAG",
        phase: 2,
        description: "KOMMUNIKATIONSMUSTER - Sprachverhalten analysieren",
        methodeninfo: "Verstehen: Analyse der Kommunikationsgewohnheiten"
    },
    DIAG14: {
        text: "Wie beeinflusst meine Zeitperspektive das Problem? Hänge ich in der Vergangenheit fest? Sorge ich mich zu sehr um die Zukunft? Wie kann ich mehr im Hier und Jetzt ankommen?",
        category: "DIAG",
        phase: 2,
        description: "ZEITPERSPEKTIVE - Temporale Orientierung",
        methodeninfo: "Verstehen: Zeitliche Fokussierung und Präsenz"
    },
    DIAG15: {
        text: "In welchen Kontexten tritt mein Problem auf, in welchen nicht? Was sind die begünstigenden oder hemmenden Umstände? Welche Umgebungsfaktoren spielen eine Rolle?",
        category: "DIAG",
        phase: 2,
        description: "KONTEXT-ANALYSE - Situative Einflussfaktoren",
        methodeninfo: "Verstehen: Umgebungsbedingte Problemdynamiken"
    }
};

// ===== LÖSUNGSORIENTIERTE PROMPTS (LÖS1-15) =====
const solutionPrompts = {
    LÖS1: {
        text: "Entwickle eine lebendige Erfolgsimagination für mein Ziel. Nutze alle Sinne: Was sehe, höre, fühle, rieche ich, wenn ich erfolgreich bin? Mache es so konkret und motivierend wie möglich.",
        category: "LÖS",
        phase: 3,
        description: "ERFOLGSIMAGINATION ENTWICKELN - Multisensorische Zielvision",
        methodeninfo: "Handeln: Emotionale Verankerung des Erfolgs"
    },
    LÖS2: {
        text: "Zerlege mein großes Ziel in winzig kleine, machbare Schritte. Was ist der allerkleinste Schritt, den ich heute machen könnte? Wie kann ich das Momentum aufbauen?",
        category: "LÖS",
        phase: 4,
        description: "KLEINE SCHRITTE PLANEN - Mikrofortschritte definieren",
        methodeninfo: "Handeln: Überwältigung durch Segmentierung vermeiden"
    },
    LÖS3: {
        text: "Welche meiner Stärken kann ich für dieses Ziel aktivieren? An welche erfolgreichen Situationen kann ich anknüpfen? Wie übertrage ich frühere Erfolgsstrategien auf die aktuelle Situation?",
        category: "LÖS",
        phase: 3,
        description: "RESSOURCEN AKTIVIEREN - Stärken mobilisieren",
        methodeninfo: "Handeln: Transfer bewährter Erfolgsmuster"
    },
    LÖS4: {
        text: "Welche alternativen Sichtweisen gibt es auf mein Problem? Wie könnte ich die Situation positiver oder konstruktiver betrachten? Welche Chancen verbergen sich in der Herausforderung?",
        category: "LÖS",
        phase: 3,
        description: "REFRAMING ANBIETEN - Perspektivenwechsel ermöglichen",
        methodeninfo: "Handeln: Konstruktive Neubewertung der Situation"
    },
    LÖS5: {
        text: "Angenommen, ein Wunder geschieht über Nacht und mein Problem ist gelöst: Wie würde ich das am nächsten Morgen merken? Was wäre anders in meinem Verhalten, meinen Gefühlen, meinem Alltag?",
        category: "LÖS",
        phase: 3,
        description: "ZUKUNFTSFRAGEN STELLEN - Wunderfrage-Technik",
        methodeninfo: "Handeln: Lösungsbilder durch Imagination entwickeln"
    },
    LÖS6: {
        text: "Auf einer Skala von 1-10, wo stehe ich heute bei meinem Ziel? Was würde mich einen Punkt weiterbringen? Was war anders, als ich schon mal bei einer höheren Zahl war?",
        category: "LÖS",
        phase: 3,
        description: "SKALIERUNG NUTZEN - Fortschritt quantifizieren",
        methodeninfo: "Handeln: Messbare Verbesserungsschritte definieren"
    },
    LÖS7: {
        text: "Gab es Zeiten, in denen das Problem weniger stark war oder gar nicht auftrat? Was war da anders? Wie habe ich das geschafft? Wie kann ich mehr von diesen Ausnahme-Situationen schaffen?",
        category: "LÖS",
        phase: 3,
        description: "AUSNAHMEN ERKUNDEN - Erfolgreiche Abweichungen analysieren",
        methodeninfo: "Handeln: Ausnahmemuster identifizieren und replizieren"
    },
    LÖS8: {
        text: "Lass uns eine mentale Probe machen: Wie gehst du konkret vor, wenn die Situation X eintritt? Was sagst du dir? Wie verhältst du dich? Was ist dein Plan B?",
        category: "LÖS",
        phase: 4,
        description: "MENTALE PROBE - Verhaltensrepetition im Geist",
        methodeninfo: "Handeln: Mentales Training für kritische Situationen"
    },
    LÖS9: {
        text: "Wer könnte mich bei meinem Ziel unterstützen? Welche Hilfe brauche ich konkret? Wie kann ich um Unterstützung bitten, ohne mich schwach zu fühlen?",
        category: "LÖS",
        phase: 4,
        description: "UNTERSTÜTZUNG MOBILISIEREN - Netzwerk aktivieren",
        methodeninfo: "Handeln: Soziale Ressourcen strategisch nutzen"
    },
    LÖS10: {
        text: "Welche Hindernisse könnten auftauchen? Wie bereite ich mich darauf vor? Was sind meine Strategien für schwierige Momente?",
        category: "LÖS",
        phase: 4,
        description: "HINDERNISSE ANTIZIPIEREN - Präventive Problemlösung",
        methodeninfo: "Handeln: Proaktive Bewältigung von Widerständen"
    },
    LÖS11: {
        text: "Wie kann ich meine Erfolge besser wahrnehmen und würdigen? Wie feiere ich kleine Fortschritte? Was hilft mir, dranzubleiben, auch wenn es mal schwierig wird?",
        category: "LÖS",
        phase: 4,
        description: "ERFOLG VERANKERN - Positive Verstärkung etablieren",
        methodeninfo: "Handeln: Nachhaltigkeit durch Erfolgswahrnehmung"
    },
    LÖS12: {
        text: "Wie kann ich eine gute Balance zwischen den verschiedenen Polen finden? Was wäre ein gesunder Mittelweg? Wie erkenne ich, wenn ich zu sehr in eine Richtung abdrifte?",
        category: "LÖS",
        phase: 3,
        description: "BALANCE FINDEN - Harmonische Integration der Pole",
        methodeninfo: "Handeln: Dynamisches Gleichgewicht entwickeln"
    },
    LÖS13: {
        text: "Welche neuen Gewohnheiten würden mich meinem Ziel näherbringen? Wie kann ich sie in meinen Alltag integrieren? Was hilft mir, sie beizubehalten?",
        category: "LÖS",
        phase: 4,
        description: "NEUE GEWOHNHEITEN - Verhaltensänderung systematisieren",
        methodeninfo: "Handeln: Nachhaltige Routinenentwicklung"
    },
    LÖS14: {
        text: "Wenn ein guter Freund das gleiche Problem hätte, was würde ich ihm raten? Wie würde mein zukünftiges, erfolgreiches Ich die Situation angehen? Was würde jemand, den ich bewundere, in meiner Lage tun?",
        category: "LÖS",
        phase: 3,
        description: "PERSPEKTIVENWECHSEL - Externe Beraterperspektive",
        methodeninfo: "Handeln: Selbstdistanzierung für Klarheit"
    },
    LÖS15: {
        text: "Wie integriere ich meine neuen Erkenntnisse in den Alltag? Was nehme ich konkret mit aus diesem Gespräch? Welche Erinnerungshilfen helfen mir, dabei zu bleiben?",
        category: "LÖS",
        phase: 4,
        description: "INTEGRATION PLANEN - Transfer in den Alltag",
        methodeninfo: "Handeln: Nachhaltige Implementierung der Erkenntnisse"
    }
};

// ===== META-PROMPTS FÜR COACHES (META1-10) =====
const metaPrompts = {
    META1: {
        text: "Analysiere den bisherigen Coaching-Verlauf: Wo stehen wir im Prozess? Was läuft gut? Welcher nächste Schritt wäre für den Coachee am hilfreichsten?",
        category: "META",
        phase: 0,
        description: "PROZESS-CHECK - Coaching-Verlauf evaluieren",
        methodeninfo: "Coach-Support: Prozesssteuerung und Orientierung"
    },
    META2: {
        text: "Der Coachee zeigt folgendes Verhalten: [BESCHREIBUNG]. Welche Coaching-Intervention wäre jetzt passend? Begründe deine Empfehlung mit dem Solution Finder Ansatz.",
        category: "META",
        phase: 0,
        description: "INTERVENTION WÄHLEN - Passende Technik identifizieren",
        methodeninfo: "Coach-Support: Methodische Entscheidungshilfe"
    },
    META3: {
        text: "Der Coachee zeigt Widerstand gegen: [THEMA/ÜBUNG]. Wie kann ich das würdigend ansprechen? Welche positive Absicht könnte dahinter stecken?",
        category: "META",
        phase: 0,
        description: "WIDERSTAND VERSTEHEN - Würdigende Widerstandsarbeit",
        methodeninfo: "Coach-Support: Professioneller Umgang mit Widerstand"
    },
    META4: {
        text: "Die Coaching-Session läuft seit [ZEIT], Energie-Level ist [STATUS]. Welche Intervention bringt neue Energie/Fokus? Was passt jetzt am besten: Vertiefung, Abschluss oder Richtungswechsel?",
        category: "META",
        phase: 0,
        description: "ENERGIE-MANAGEMENT - Session-Dynamik steuern",
        methodeninfo: "Coach-Support: Energiemanagement in der Session"
    },
    META5: {
        text: "Prüfe: Sind wir noch auf dem Weg zum ursprünglichen Coaching-Ziel? Falls nein: Wie navigiere ich zurück oder passe das Ziel an? Was braucht der Coachee jetzt am meisten?",
        category: "META",
        phase: 0,
        description: "ZIELERREICHUNG PRÜFEN - Zielfokus überprüfen",
        methodeninfo: "Coach-Support: Zielkonsistenz und Anpassung"
    },
    META6: {
        text: "Der Coachee zeigt starke Emotionen: [EMOTION]. Wie gehe ich damit professionell um? Welche Schritte helfen bei der Regulation und Integration?",
        category: "META",
        phase: 0,
        description: "EMOTIONEN HANDHABEN - Professioneller Umgang mit Affekten",
        methodeninfo: "Coach-Support: Emotionsregulation im Coaching"
    },
    META7: {
        text: "Das Thema ist sehr komplex geworden: [BESCHREIBUNG]. Wie kann ich es für den Coachee vereinfachen? Welcher eine Fokus würde jetzt am meisten helfen?",
        category: "META",
        phase: 0,
        description: "KOMPLEXITÄT REDUZIEREN - Fokussierung bei Überkomplexität",
        methodeninfo: "Coach-Support: Komplexitätsmanagement im Coaching"
    },
    META8: {
        text: "Wie kann ich sicherstellen, dass der Coachee die Erkenntnisse in den Alltag überträgt? Welche konkreten Maßnahmen unterstützen die Umsetzung?",
        category: "META",
        phase: 0,
        description: "TRANSFER SICHERN - Alltagsintegration gewährleisten",
        methodeninfo: "Coach-Support: Nachhaltigkeit des Coachings"
    },
    META9: {
        text: "Wie beende ich die Session stärkend und motivierend? Was soll der Coachee mitnehmen? Welche Hausaufgabe/Reflexion passt bis zum nächsten Termin?",
        category: "META",
        phase: 0,
        description: "SESSION BEENDEN - Stärkender Abschluss",
        methodeninfo: "Coach-Support: Effektive Session-Beendigung"
    },
    META10: {
        text: "Evaluiere diese Coaching-Session: Was war besonders wirksam? Wo gab es Verbesserungspotential? Welche Anpassungen empfiehlst du für zukünftige Sessions?",
        category: "META",
        phase: 0,
        description: "COACHING EVALUIEREN - Session-Reflexion und Lernen",
        methodeninfo: "Coach-Support: Kontinuierliche Verbesserung"
    }
};

// ===== NOTFALL & GRENZEN-PROMPTS (WARN1-3, QK1-3) =====
const emergencyPrompts = {
    WARN1: {
        text: "Ich erkenne bei meinem Coachee folgende Warnsignale: [SITUATION/VERHALTEN]. Die Person zeigt Anzeichen von: [Hoffnungslosigkeit/Antriebslosigkeit/Rückzug/etc.]. Wie gehe ich als Coach professionell vor? Welche Gesprächsführung ist angebracht? Wann sollte ich professionelle Hilfe empfehlen?",
        category: "WARN",
        phase: 0,
        description: "DEPRESSIVE ANZEICHEN - Professioneller Umgang mit Warnsignalen",
        methodeninfo: "Sicherheit: Erkennung und Handling kritischer Zustände"
    },
    WARN2: {
        text: "Mein Coachee hat unerwartet Trauma-bezogene Inhalte angesprochen: [BESCHREIBUNG]. Ich merke, dass das über normale Coaching-Grenzen hinausgeht. Wie stabilisiere ich die Situation? Wie leite ich professionell weiter? Welche Sofortmaßnahmen sind wichtig?",
        category: "WARN",
        phase: 0,
        description: "TRAUMA-MATERIAL - Grenzen erkennen und professionell weiterleiten",
        methodeninfo: "Sicherheit: Umgang mit traumatischen Inhalten"
    },
    WARN3: {
        text: "Mein Coachee hat Andeutungen gemacht, die mich beunruhigen: [ÄUSSERUNG]. Ich bin unsicher, wie ernst das zu nehmen ist. Wie spreche ich das direkt an? Welche Schritte sind sofort nötig? Wie sichere ich professionell ab?",
        category: "WARN",
        phase: 0,
        description: "SUIZIDALE ÄUSSERUNGEN - Krisenintervention im Coaching",
        methodeninfo: "Sicherheit: Umgang mit suizidalen Gedanken"
    },
    QK1: {
        text: "Die KI-Antwort war unpassend für meinen Coachee: [ANTWORT]. Das Problem ist: [zu therapeutisch/zu oberflächlich/zu direktiv/etc.]. Wie korrigiere ich das elegant? Wie formuliere ich es für den Coachee um? Wie verhindere ich solche Antworten zukünftig?",
        category: "QK",
        phase: 0,
        description: "UNPASSENDE KI-ANTWORT - Qualitätskontrolle der KI-Assistenz",
        methodeninfo: "Qualität: Korrektur und Verbesserung der KI-Unterstützung"
    },
    QK2: {
        text: "Die KI hat Coaching-Grenzen überschritten durch: [BESCHREIBUNG]. Mein Coachee reagiert: [verwirrt/irritiert/überfordert]. Wie fange ich das professionell auf? Wie erkläre ich die Korrektur? Wie justiere ich die KI-Prompts nach?",
        category: "QK",
        phase: 0,
        description: "KI ÜBERSCHREITET GRENZEN - Professionelle Grenzeinhaltung",
        methodeninfo: "Qualität: Einhaltung professioneller Standards"
    },
    QK3: {
        text: "Die KI-Antwort enthält ethisch problematische Aspekte: [BESCHREIBUNG]. Ich bin unsicher, wie ich das handhaben soll. Wie korrigiere ich verantwortungsvoll? Welche professionellen Standards muss ich beachten? Wie dokumentiere ich das?",
        category: "QK",
        phase: 0,
        description: "ETHISCHE BEDENKEN - Verantwortungsvoller Umgang mit KI",
        methodeninfo: "Qualität: Ethische Standards im KI-gestützten Coaching"
    }
};

// ===== GRUPPEN & PAARE-PROMPTS (PAAR1-3, GRUPPE1-3) =====
const groupPrompts = {
    PAAR1: {
        text: "Führe dieses Paar durch den Solution Finder Prozess zu ihrem gemeinsamen Thema: [BESCHREIBUNG]. Partner A sagt: [PERSPEKTIVE A]. Partner B sagt: [PERSPEKTIVE B]. Welche gemeinsamen Spannungsfelder erkennst du? Wie moderiere ich die unterschiedlichen inneren Teams? Welche Fragen helfen beiden?",
        category: "PAAR",
        phase: 2,
        description: "SOLUTION FINDER FÜR PAARE - Partnerschaftscoaching",
        methodeninfo: "Erweiterung: Systemisches Coaching für Paare"
    },
    PAAR2: {
        text: "Das Paar hat einen Konflikt um: [THEMA]. Die Positionen sind verhärtet: [BESCHREIBUNG]. Wie nutze ich Solution Finder Techniken zur Deeskalation? Welche inneren Anteile sind aktiviert? Wie finde ich gemeinsame Ressourcen?",
        category: "PAAR",
        phase: 2,
        description: "KONFLIKT-MEDIATION - Paar-Konfliktlösung",
        methodeninfo: "Erweiterung: Mediation mit Solution Finder Methoden"
    },
    PAAR3: {
        text: "Das Paar möchte eine gemeinsame Vision entwickeln für: [BEREICH]. Beide haben unterschiedliche Vorstellungen: [UNTERSCHIEDE]. Wie entwickle ich eine Erfolgsimagination, die beide begeistert? Welche Brücken kann ich zwischen den Visionen bauen?",
        category: "PAAR",
        phase: 3,
        description: "GEMEINSAME VISION - Partnerschaftliche Zielentwicklung",
        methodeninfo: "Erweiterung: Gemeinsame Visionsentwicklung für Paare"
    },
    GRUPPE1: {
        text: "Moderiere eine Gruppen-Reflexion zum Thema: [THEMA] mit diesen 6 Teilnehmern: [KURZE BESCHREIBUNG DER PERSONEN]. Die Gruppendynamik zeigt: [BEOBACHTUNG]. Welche Solution Finder Techniken eignen sich? Wie aktiviere ich alle? Welche Reihenfolge der Beiträge ist sinnvoll?",
        category: "GRUPPE",
        phase: 2,
        description: "TEAM-REFLEXION - Gruppenmoderation mit Solution Finder",
        methodeninfo: "Erweiterung: Gruppenprozesse strukturiert moderieren"
    },
    GRUPPE2: {
        text: "Das Team hat einen Konflikt um: [BESCHREIBUNG]. Beteiligte Parteien: [ÜBERSICHT]. Wie strukturiere ich eine lösungsorientierte Diskussion? Welche inneren Anteile sind im Team aktiviert? Wie finde ich Win-Win-Lösungen?",
        category: "GRUPPE",
        phase: 2,
        description: "KONFLIKT IM TEAM - Teamkonflikt-Resolution",
        methodeninfo: "Erweiterung: Konfliktlösung in Gruppensettings"
    },
    GRUPPE3: {
        text: "Das Team soll gemeinsame Ziele entwickeln für: [PROJEKT/BEREICH]. Verschiedene Interessen: [AUFLISTUNG]. Wie nutze ich Skalenarbeit in der Gruppe? Wie entwickle ich eine inspirierende Gruppenvision? Welche Beteiligungsformate helfen?",
        category: "GRUPPE",
        phase: 3,
        description: "GEMEINSAME ZIELE - Team-Zielentwicklung",
        methodeninfo: "Erweiterung: Partizipative Zielentwicklung im Team"
    }
};

// ===== LIVE & DIGITAL PROMPTS (LIVE1-3, MOBIL1-3) =====
const digitalPrompts = {
    LIVE1: {
        text: "Live-Situation: Mein Coachee ist gerade: [emotional/blockiert/verwirrt]. Ich brauche sofort eine Intervention. Gib mir 3 konkrete Fragen/Techniken, die ich jetzt einsetzen kann. Maximum 30 Sekunden Vorbereitung. Fokus auf: [Stabilisierung/Klärung/Motivation].",
        category: "LIVE",
        phase: 0,
        description: "SCHNELLE INTERVENTION - Spontane Live-Unterstützung",
        methodeninfo: "Effizienz: Sofortige Coaching-Interventionen"
    },
    LIVE2: {
        text: "Das Gespräch hat eine unerwartete Wendung genommen: [BESCHREIBUNG]. Ich muss spontan den Fokus ändern auf: [NEUES THEMA]. Wie leite ich elegant über? Welcher Solution Finder Schritt passt jetzt? Schnelle Orientierung für die nächsten 5 Minuten.",
        category: "LIVE",
        phase: 0,
        description: "SPONTANE RICHTUNGSÄNDERUNG - Flexible Gesprächsführung",
        methodeninfo: "Effizienz: Agile Coaching-Navigation"
    },
    LIVE3: {
        text: "Die Coaching-Session läuft seit [ZEIT]. Energie-Level: [niedrig/hoch/unruhig]. Ich brauche eine Intervention für: [Aktivierung/Beruhigung/Fokussierung]. Welche 2-Minuten-Technik passt? Wie hole ich Coachee zurück ins Gespräch? Sofort umsetzbare Aktion gesucht.",
        category: "LIVE",
        phase: 0,
        description: "ENERGIE-MANAGEMENT - Spontane Energieregulation",
        methodeninfo: "Effizienz: Live-Energiemanagement in der Session"
    },
    MOBIL1: {
        text: "Mein Coachee hat mir diese Sprachnotiz geschickt: [TRANSKRIPT]. Das zeigt: [erste Einschätzung]. Welche Solution Finder Fragen passen als Audio-Antwort? Wie strukturiere ich eine 3-Minuten Sprachnachricht zurück?",
        category: "MOBIL",
        phase: 0,
        description: "SPRACHNOTIZ-ANALYSE - Mobile Audio-Kommunikation",
        methodeninfo: "Digital: Asynchrone Audio-Coaching-Unterstützung"
    },
    MOBIL2: {
        text: "Zwischen den Sessions fragt mein Coachee: [FRAGE/PROBLEM]. Kontext aus letzter Session: [KURZE ZUSAMMENFASSUNG]. Welche kurze, stärkende Antwort kann ich per App senden? Maximum 2-3 Sätze, die motivieren und bis zur nächsten Session tragen.",
        category: "MOBIL",
        phase: 0,
        description: "ZWISCHEN-SESSION SUPPORT - Mobile Zwischenunterstützung",
        methodeninfo: "Digital: Kontinuierliche Begleitung zwischen Sessions"
    },
    MOBIL3: {
        text: "Coachee berichtet über Hausaufgaben-Umsetzung: [BERICHT]. Erfolge: [LISTE]. Schwierigkeiten: [LISTE]. Wie würdige ich die Erfolge? Welche Mikro-Anpassungen schlage ich vor? Format: Kurze App-Nachricht mit Ermutigung und nächstem kleinen Schritt.",
        category: "MOBIL",
        phase: 0,
        description: "HAUSAUFGABEN-CHECK - Mobile Progress-Tracking",
        methodeninfo: "Digital: Mobile Fortschrittsverfolgung und Anpassung"
    }
};

// ===== AVATAR-AUFSTELLUNGEN (ERGÄNZUNG) =====
const avatarPrompts = {
    AVA1: {
        text: "Stelle dir vor, alle beteiligten Personen oder inneren Anteile deines Problems stehen im Raum. Beschreibe ihre Positionen zueinander: Wer steht wo? Wer schaut wen an? Welche Atmosphäre herrscht?",
        category: "AVA",
        phase: 2,
        description: "AVATAR-AUFSTELLUNG - Systemische Positionierung",
        methodeninfo: "Avatar-Aufstellung: Räumliche Darstellung der Problemdynamik"
    },
    AVA2: {
        text: "Gehe zur Position des stärksten Widerstands in deiner Aufstellung. Was siehst du von dort aus? Welche Botschaft hat dieser Anteil für dich? Was ist seine positive Absicht?",
        category: "AVA",
        phase: 2,
        description: "WIDERSTAND-AVATAR - Perspektivwechsel zum Hindernis",
        methodeninfo: "Avatar-Arbeit: Verstehen der Widerstandsdynamik durch Rollenwechsel"
    },
    AVA3: {
        text: "Arrangiere die Aufstellung neu: Wie müssten die Positionen verändert werden, damit sich eine Lösung zeigt? Bewege die Personen/Anteile so, dass ein stimmiges, kraftvolles Bild entsteht.",
        category: "AVA",
        phase: 3,
        description: "LÖSUNGS-AUFSTELLUNG - Neupositionierung für Lösung",
        methodeninfo: "Avatar-Lösung: Systemische Neuordnung zur Problemlösung"
    }
};

// ===== ALLE PROMPTS ZUSAMMENFÜHREN =====
const prompts = {
    ...geisslerPrompts,
    ...solutionFinderPrompts,
    ...diagnosticPrompts,
    ...solutionPrompts,
    ...metaPrompts,
    ...emergencyPrompts,
    ...groupPrompts,
    ...digitalPrompts,
    ...avatarPrompts
};

// ===== KLIENTEN-DATEN (unverändert) =====
const clients = [
    {
        id: 1,
        name: "Sarah Müller",
        age: 42,
        profession: "Projektmanagerin",
        topics: ["Work-Life-Balance", "Führung", "Stressmanagement"],
        description: "Erfahrene Projektmanagerin in einem Tech-Unternehmen. Sucht Balance zwischen beruflichem Erfolg und persönlichem Wohlbefinden.",
        challenges: ["Perfektionismus", "Delegationsschwierigkeiten", "Burnout-Prävention"],
        goals: ["Gelassenere Führung", "Effizienzsteigerung", "Mehr Freizeit"]
    },
    {
        id: 2,
        name: "Michael Chen",
        age: 35,
        profession: "Startup-Gründer",
        topics: ["Entrepreneurship", "Risikomanagement", "Vision"],
        description: "Tech-Entrepreneur mit innovativen Ideen. Kämpft mit Unsicherheit und strategischen Entscheidungen.",
        challenges: ["Entscheidungsangst", "Investoren-Kommunikation", "Team-Building"],
        goals: ["Klarere Vision", "Selbstvertrauen", "Strategische Planung"]
    },
    {
        id: 3,
        name: "Dr. Anna Richter",
        age: 51,
        profession: "Ärztin/Klinikdirektorin",
        topics: ["Leadership", "Change Management", "Work-Life-Balance"],
        description: "Erfahrene Ärztin und neue Klinikdirektorin. Meistert Übergang von Fachexpertin zur Führungskraft.",
        challenges: ["Rollenwechsel", "Personalführung", "Systemdruck"],
        goals: ["Authentische Führung", "Team-Entwicklung", "Innovations-Management"]
    },
    {
        id: 4,
        name: "Thomas Weber",
        age: 58,
        profession: "Senior Manager",
        topics: ["Ruhestand", "Sinnfindung", "Neuorientierung"],
        description: "Langjähriger Manager vor dem Ruhestand. Sucht neuen Lebenssinn und befürchtet soziale Isolation.",
        challenges: ["Identitätswandel", "Soziale Kontakte", "Neue Ziele"],
        goals: ["Sinnvolle Projekte", "Aktiv bleiben", "Beziehungen pflegen"]
    }
];

// ===== ERWEITERTE TEMPLATE-BIBLIOTHEK =====
const templates = [
    {
        id: "vollstaendig-gt",
        title: "Vollständiges Geißler Triadisches Coaching",
        category: "geissler",
        duration: "90-120 Min",
        prompts: ["GT1", "GT2", "GT3", "GT4", "GT5", "GT6", "GT7", "GT8", "GT9", "GT10", "GT11", "GT12"],
        description: "Komplette 12-Schritte-Methode nach Harald Geißler. Strukturierte Bearbeitung von der Problemdefinition bis zur Umsetzungsplanung.",
        methodology: "Wissenschaftlich fundiertes triadisches Coaching mit systemischer Avatar-Arbeit"
    },
    {
        id: "solution-finder-standard",
        title: "Solution Finder Standard-Prozess",
        category: "solution-finder",
        duration: "60-90 Min",
        prompts: ["SF1", "ZIEL", "SKALA", "TEAM", "DIALOG", "NAMEN", "VAL", "TRANSFORM", "STÄRKEN", "INTEGRATION", "PLAN", "VISION"],
        description: "Bewährter Solution Finder Basisprozess nach Flavien's Methodik. Von der Problemspiegelung zur konkreten Handlungsplanung.",
        methodology: "Ressourcenorientiertes Coaching mit innerem Team und Spannungsfeld-Arbeit"
    },
    {
        id: "diagnostik-intensiv",
        title: "Intensive Diagnostik & Analyse",
        category: "diagnostik",
        duration: "75-90 Min",
        prompts: ["DIAG1", "DIAG2", "DIAG3", "DIAG4", "DIAG5", "DIAG6", "DIAG7", "DIAG8", "DIAG9", "DIAG10"],
        description: "Umfassende Problemanalyse mit allen diagnostischen Dimensionen. Für komplexe Situationen und tiefere Verstehensarbeit.",
        methodology: "Multidimensionale Diagnostik ohne Pathologisierung"
    },
    {
        id: "loesungsfokus-power",
        title: "Lösungsfokus Power-Session",
        category: "loesung",
        duration: "45-75 Min",
        prompts: ["LÖS1", "LÖS2", "LÖS3", "LÖS4", "LÖS5", "LÖS6", "LÖS7", "LÖS8", "LÖS9", "LÖS10", "LÖS11", "LÖS12", "LÖS13", "LÖS14", "LÖS15"],
        description: "Kraftvolle lösungsorientierte Session. Fokus auf Ressourcenaktivierung, Erfolgsimagination und konkreten Handlungsschritten.",
        methodology: "Lösungsfokussierte Kurzzeitintervention mit hoher Handlungsorientierung"
    },
    {
        id: "paar-coaching",
        title: "Paar-Coaching mit Solution Finder",
        category: "paare",
        duration: "90-120 Min",
        prompts: ["PAAR1", "PAAR2", "PAAR3", "SF1", "TEAM", "DIALOG", "TRANSFORM", "VISION"],
        description: "Spezielles Coaching-Format für Paare. Gemeinsame Spannungsfelder bearbeiten und neue Perspektiven entwickeln.",
        methodology: "Systemisches Paar-Coaching mit Solution Finder Techniken"
    },
    {
        id: "team-coaching",
        title: "Team-Coaching & Gruppenmoderation",
        category: "teams",
        duration: "120-180 Min",
        prompts: ["GRUPPE1", "GRUPPE2", "GRUPPE3", "TEAM", "DIALOG", "VISION", "PLAN"],
        description: "Professionelle Gruppenmoderation für Teams. Konflikte lösen, gemeinsame Visionen entwickeln, Teamdynamik stärken.",
        methodology: "Gruppendynamisches Coaching mit strukturierten Beteiligungsformaten"
    },
    {
        id: "live-coaching-support",
        title: "Live-Coaching Unterstützung",
        category: "live",
        duration: "Variable",
        prompts: ["LIVE1", "LIVE2", "LIVE3", "META1", "META2", "META3", "META4", "META5", "META6"],
        description: "Spontane Unterstützung für Live-Coaching-Situationen. Schnelle Interventionen und Prozesssteuerung.",
        methodology: "Agile Coaching-Interventionen für Live-Sessions"
    },
    {
        id: "mobile-digital-coaching",
        title: "Mobile & Digitale Integration",
        category: "digital",
        duration: "Asynchron",
        prompts: ["MOBIL1", "MOBIL2", "MOBIL3", "META8", "LÖS13", "LÖS15"],
        description: "Digitale Coaching-Unterstützung zwischen Sessions. Mobile Apps, Sprachnachrichten und kontinuierliche Begleitung.",
        methodology: "Digitale Coaching-Extension für nachhaltige Begleitung"
    },
    {
        id: "notfall-krisenintervention",
        title: "Notfall & Krisenintervention",
        category: "sicherheit",
        duration: "Variable",
        prompts: ["WARN1", "WARN2", "WARN3", "QK1", "QK2", "QK3"],
        description: "Professioneller Umgang mit kritischen Situationen. Warnsignale erkennen, Grenzen wahren, sicher weiterleiten.",
        methodology: "Krisenintervention und professionelle Grenzenwahrung"
    },
    {
        id: "avatar-aufstellungsarbeit",
        title: "Avatar-Aufstellungen & Systemarbeit",
        category: "systemisch",
        duration: "60-90 Min",
        prompts: ["AVA1", "AVA2", "AVA3", "GT6", "TEAM", "DIALOG", "TRANSFORM"],
        description: "Systemische Aufstellungsarbeit mit Avataren. Innere und äußere Systeme verstehen und neu positionieren.",
        methodology: "Systemische Aufstellungsarbeit in digitaler Form"
    }
];

// ===== GLOBALE ZUWEISUNG =====
window.prompts = prompts;
window.clients = clients;
window.templates = templates;

// ===== PROMPT-STATISTIKEN =====
const promptStats = {
    total: Object.keys(prompts).length,
    categories: {
        GT: Object.keys(prompts).filter(k => prompts[k].category === "GT").length,
        SF: Object.keys(prompts).filter(k => prompts[k].category === "SF").length,
        DIAG: Object.keys(prompts).filter(k => prompts[k].category === "DIAG").length,
        LÖS: Object.keys(prompts).filter(k => prompts[k].category === "LÖS").length,
        META: Object.keys(prompts).filter(k => prompts[k].category === "META").length,
        WARN: Object.keys(prompts).filter(k => prompts[k].category === "WARN").length,
        QK: Object.keys(prompts).filter(k => prompts[k].category === "QK").length,
        PAAR: Object.keys(prompts).filter(k => prompts[k].category === "PAAR").length,
        GRUPPE: Object.keys(prompts).filter(k => prompts[k].category === "GRUPPE").length,
        LIVE: Object.keys(prompts).filter(k => prompts[k].category === "LIVE").length,
        MOBIL: Object.keys(prompts).filter(k => prompts[k].category === "MOBIL").length,
        AVA: Object.keys(prompts).filter(k => prompts[k].category === "AVA").length
    }
};

// ===== DEBUG-AUSGABEN =====
console.log('🎯 KOMPLETTE COACHING PROMPT-BIBLIOTHEK GELADEN!');
console.log('📊 Statistiken:');
console.log(`   Gesamt: ${promptStats.total} Prompts`);
console.log('   Kategorien:');
Object.entries(promptStats.categories).forEach(([cat, count]) => {
    if (count > 0) console.log(`   - ${cat}: ${count} Prompts`);
});
console.log('✅ Klienten:', clients.length, 'verfügbar');
console.log('✅ Templates:', templates.length, 'verfügbar');
console.log('🚀 Ready für professionelles Coaching!');

// Event für app.js
window.dispatchEvent(new CustomEvent('dataLoaded', {
    detail: { prompts, clients, templates, promptStats }
}));