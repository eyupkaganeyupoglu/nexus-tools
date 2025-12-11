# Nexus Tools - Architecture & Design Guidelines

## 1. Overview
Nexus Tools is a client-side web application suite designed for the "Nexus" Discord server. It provides a set of utilities for D&D players and DMs to automate calculations and generate standardized messages.

## 2. Technology Stack
- **Hosting:** GitHub Pages (Static Hosting)
- **Core:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **CSS Framework:** Bootstrap 5 (via CDN)
- **Icons:** FontAwesome (via CDN)
- **Data Persistence:** `localStorage` for user preferences (optional), `data.js` for static datasets.
- **Routing:** File-system based routing (e.g., `/module-name/index.html`).

## 3. Directory Structure
```
/
├── index.html              # Landing Page
├── css/
│   └── style.css           # Global styles & Dark Mode overrides
├── js/
│   ├── main.js             # Shared utilities (copyToClipboard, formatting)
│   └── data.js             # Static data (Market items, etc.)
├── notlar/                 # Original requirements (Reference)
├── plans/                  # Derived technical plans (This folder)
└── modules/
    ├── campaign-ilan/      # Module 1
    ├── loot-hesaplayici/   # Module 2
    ├── avatar-butce/       # Module 3
    ├── level-atlama/       # Module 4
    ├── avatar-paylasim/    # Module 5
    ├── pazar-ilan/         # Module 6
    ├── dm-puanlama/        # Module 7
    ├── mezar-tasi/         # Module 8
    ├── kural-oneri/        # Module 9
    └── crafting/           # Module 10
```

## 4. UI/UX Design Guidelines

### Color Palette (Dark Mode Default)
The design must strictly follow the Discord dark theme aesthetic.
- **Background:** `#2f3136` or `#36393f`
- **Cards/Containers:** `#202225`
- **Text:** `#dcddde` (Off-white)
- **Accent:** `#5865f2` (Blurple) or Gold (D&D theme)
- **Input Fields:** Dark gray background with light text.

### Component Standards
- **Cards:** All tools should be centered within a clean "Card" container.
- **Navigation:** Every module must have a "Back to Home" link at the top.
- **Outputs:** Generated text should be in `<textarea>` or code blocks with a prominent "Copy" button.
- **Responsiveness:** Grid layout for the homepage (3-4 columns).

### Global Components
- **Alerts:** Bootstrap Alerts for success/warning/info.
- **Sliders:** Dual-handle sliders for ranges used in Campaign Module.
- **Autocomplete:** Custom debounce logic for item search.
