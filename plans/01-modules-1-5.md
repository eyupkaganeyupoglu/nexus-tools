# Nexus Tools - Modules 1-5 Specifications

## Module 1: Campaign Announcement Generator
**Path:** `/modules/campaign-ilan/`
**Purpose:** Generate standardized campaign announcement messages.
**Key Features:**
- **Inputs:** Title, Location, Description, XP Level (0/5 to 5/5 checkboxes maps to Role IDs), Recommended Level Range (slider), Session Count Range, Duration Range, Avatar Count.
- **Logic:**
  - Min/Max logic for sliders (if equal, show single number).
  - Validation: "Approve" button for each section before final generation.
  - "Campaign Day" is optional; default to "Poll will be opened".

## Module 2: Loot & Reward Calculator
**Path:** `/modules/loot-hesaplayici/`
**Purpose:** Calculate end-game rewards (GP, Milestone, Genesis Token) for Players and DMs.
**Key Features:**
- **Tabs:** 1. End Game Calculator (Default), 2. Loot Planner.
- **End Game Logic:**
  - **Inputs:** Duration (Hours/Min), Total Loot Value, Players List (Level + DM Score).
  - **Rounding:** 30+ min counts as next hour.
  - **Formula:** Uses "Base Gold" table per level. Calculates "Performance Ratio" based on looted vs max possible loot.
  - **DM Rewards:** DM gets Gold/MS based on average player earnings * Factor (Time/3). DM Genesis Token depends on DM Score average.
- **Loot Planner Logic:**
  - Calculates how much loot the DM *should* distribute based on planned duration and party composition.

## Module 3: Avatar Starting Budget
**Path:** `/modules/avatar-butce/`
**Purpose:** Calculate starting gold for high-level characters (Cumulative).
**Key Features:**
- **Input:** Target Level (1-20).
- **Logic:** Sum of rewards from Level 2 up to Target Level using a fixed reward table.
- **Warning:** Alert user if Level >= 6 (Needs Admin Approval).

## Module 4: Level Up (Milestone) Calculator
**Path:** `/modules/level-atlama/`
**Purpose:** Calculate cost to move from Level A to Level B.
**Key Features:**
- **Inputs:** Current Level, Target Level.
- **Logic:**
  - Milestone costs vary by level (1-4 MS).
  - Levels 15-18 allow flexible (Hybrid) payment (MS or Epic MS).
  - Levels 18-20 require Epic MS.
- **Output:** Show total Standard MS and Epic MS required. Show "Hybrid" options as tips.

## Module 5: Avatar Sharing Template
**Path:** `/modules/avatar-paylasim/`
**Purpose:** Formatting character introduction posts.
**Key Features:**
- **Inputs:** Class configuration (supports Multiclass up to 5 classes), Species, Name, Backstory.
- **Logic:** Formats title as `[Lvl] [Subclass] [Class] , ... , [Species]`.
- **Output:** Markdown block with headers and bold text.
- **Tags:** Class selection checkboxes at the end.
