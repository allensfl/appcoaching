# 🧠 AppCoaching - Triadischer KI-Coaching Prozess

## Überblick

AppCoaching ist eine innovative Web-Anwendung für strukturierte Coaching-Prozesse mit KI-Unterstützung. Basierend auf dem 12-Schritte Geißler-Modell bietet sie Coaches eine professionelle Plattform für triadisches Coaching (Coach ↔ Coachee ↔ KI-Assistent).

## 🚀 Features

### ✅ **Strukturierter 12-Schritte-Prozess**
- **4 Phasen**: Problem-/Zielbeschreibung → Problemanalyse → Lösungsstrategie → Umsetzung
- **Phasenbasierte Navigation** mit korrekter Schritt-Nummerierung
- **Visueller Fortschritt** und Prozessübersicht

### 🤝 **Kollaborative KI-Integration**
- **Separate Coach-KI** für methodische Unterstützung
- **Gemeinsame KI-Sitzungen** zwischen Coach und Coachee
- **Transparenter Prozess** - alle sehen den finalen Prompt
- **Live Prompt-Bearbeitung** während des Gesprächs

### 📚 **Erweiterte Prompt-Repository**
- **Geißler Triadische Prompts (GT1-GT12)** - wissenschaftlich fundiert
- **Solution Finder Standard** - bewährte Basis-Prompts
- **Diagnostische & Lösungsorientierte Prompts** - strukturierte Toolsets
- **Klick-to-Add Funktionalität** - Prompts direkt übernehmen oder anhängen

### 👥 **Avatar-System**
- **Tiefenpsychologische Interviews** mit inneren Anteilen
- **Virtual Reality Integration** für Avatar-Aufstellungen
- **Innere Team Analyse** (Unterstützer, Bremse, Weiser)

### 🎯 **Coaching-Tools**
- **Bildgalerie** für emotionale Zielvisualisierung
- **Coaching-Protokoll** mit Sprachaufnahme-Simulation
- **Session-Dokumentation** und Fortschrittstracking
- **Coach-Anweisungen** für jeden Schritt

## 🛠️ Installation & Setup

### Lokale Entwicklung
```bash
# Repository klonen
git clone https://github.com/yourusername/appcoaching.git
cd appcoaching

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

### Vercel Deployment
1. Repository zu GitHub pushen
2. Vercel Account mit GitHub verbinden
3. Neues Projekt erstellen: `appcoaching`
4. Automatisches Deployment aus `main` Branch

### GitHub Repository Setup
```bash
# Repository erstellen
git init
git add .
git commit -m "Initial commit: KI-Coaching App"
git branch -M main
git remote add origin https://github.com/yourusername/appcoaching.git
git push -u origin main
```

## 📁 Dateistruktur

```
appcoaching/
├── index.html          # HTML Entry Point
├── app.js             # React Application Logic
├── package.json       # NPM Configuration
├── README.md         # Diese Dokumentation
└── vercel.json       # Vercel Deployment Config (optional)
```

## 🎯 Zielgruppen

### **Professionelle Coaches**
- Strukturierte Prozessführung mit KI-Unterstützung
- Methodische Sicherheit durch 12-Schritte-System
- Transparente KI-Integration mit Coachee

### **Coaching-Ausbilder**
- Lehr-Tool für triadisches Coaching
- Demonstration moderner KI-Integration
- Standardisierte Prozess-Dokumentation

### **Unternehmen & HR**
- Skalierbare Coaching-Lösung
- Qualitätssicherung durch Struktur
- Digitale Transformation im Coaching

## 🔧 Technische Details

### **Frontend**
- **React 18** - Moderne UI-Komponenten
- **Tailwind CSS** - Responsive Design
- **Vanilla JavaScript** - Keine Build-Tools erforderlich

### **Architektur**
- **Static Site** - Einfaches Hosting
- **Client-Side Only** - Keine Backend-Dependencies
- **Mobile-Responsive** - Funktioniert auf allen Geräten

### **Browser-Kompatibilität**
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🚀 Roadmap

### **Version 1.1**
- [ ] Echte KI-API Integration (OpenAI, Claude, etc.)
- [ ] Benutzer-Authentifizierung und Session-Management  
- [ ] Export-Funktionen für Coaching-Protokolle (PDF, Word)
- [ ] Erweiterte Avatar-3D-Räume mit WebGL
- [ ] Multi-Language Support (EN, FR, IT)

### **Version 1.2**
- [ ] Coach-Dashboard mit Client-Übersicht
- [ ] Terminplanung und Kalender-Integration
- [ ] Fortgeschrittene Analytics und Reports
- [ ] Mobile App (React Native)
- [ ] Offline-Modus für instabile Verbindungen

### **Version 2.0**
- [ ] Team-Coaching Features für Gruppen
- [ ] KI-Trainer für Coach-Weiterbildung
- [ ] API für Drittanbieter-Integrationen
- [ ] White-Label Lösungen für Unternehmen
- [ ] Advanced AI mit firmenspezifischer Wissensbasis

## 🤝 Contributing

Beiträge sind willkommen! Bitte folgen Sie diesen Schritten:

1. **Fork** das Repository
2. **Feature Branch** erstellen (`git checkout -b feature/amazing-feature`)
3. **Änderungen committen** (`git commit -m 'Add amazing feature'`)
4. **Branch pushen** (`git push origin feature/amazing-feature`)
5. **Pull Request** erstellen

### **Development Guidelines**
- Verwenden Sie aussagekräftige Commit-Messages
- Testen Sie alle Features vor dem PR
- Dokumentieren Sie neue Features im README
- Halten Sie den Code sauber und kommentiert

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE) für Details.

## 🆘 Support & Kontakt

### **Bug Reports**
Bitte erstellen Sie ein [GitHub Issue](https://github.com/yourusername/appcoaching/issues) mit:
- Detaillierter Beschreibung des Problems
- Schritten zur Reproduktion
- Browser und Betriebssystem
- Screenshots wenn möglich

### **Feature Requests**
Neue Feature-Ideen können als [GitHub Issue](https://github.com/yourusername/appcoaching/issues) eingereicht werden mit dem Label `enhancement`.

### **Kontakt**
- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn Profile]
- **Website**: [Your Website]

## 🙏 Danksagungen

- **Prof. Flavien Geißler** - Für die wissenschaftliche Grundlage des triadischen Coaching-Modells
- **React Team** - Für das fantastische Frontend-Framework
- **Tailwind CSS** - Für das elegante Design-System
- **Coaching-Community** - Für wertvolles Feedback und Testing

## 📊 Statistiken

![GitHub Stars](https://img.shields.io/github/stars/yourusername/appcoaching?style=social)
![GitHub Forks](https://img.shields.io/github/forks/yourusername/appcoaching?style=social)
![GitHub Issues](https://img.shields.io/github/issues/yourusername/appcoaching)
![GitHub License](https://img.shields.io/github/license/yourusername/appcoaching)

---

**Made with ❤️ for the Coaching Community**

🚀 **Live Demo**: [appcoaching.vercel.app](https://appcoaching.vercel.app)