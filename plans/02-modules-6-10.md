# Nexus Tools - Modules 6-10 Specifications

## Module 6: Market Listing Template
**Path:** `/modules/pazar-ilan/`
**Purpose:** Generate sales post for the #market channel.
**Key Features:**
- **Data:** Uses `marketData` from `data.js` for autocomplete.
- **Inputs:** Item Name (Autocomplete searches Name, fills Price & Link), Seller Name, Sale Price, Extra Info.
- **Output:** Specific Markdown link format: `[Item Name](URL), {OriginalPrice} GP`.

## Module 7: DM Assessment Template
**Path:** `/modules/dm-puanlama/`
**Purpose:** Player feedback form for DMs.
**Key Features:**
- **Inputs:** Campaign Name, Comment (Optional), Score (1-5).
- **Validation:** Score and Name mandatory.
- **Output:** Simple key-value Markdown block.

## Module 8: Tombstone Generator
**Path:** `/modules/mezar-tasi/`
**Purpose:** Death announcement template.
**Key Features:**
- **Inputs:** Character Name, Cause of Death (or Retirement), Date.
- **Output:** Markdown blockquote format. Date formatted as DD.MM.YYYY.

## Module 9: Rule Suggestion Form
**Path:** `/modules/kural-oneri/`
**Purpose:** Suggest new rules or changes to existing ones.
**Key Features:**
- **Modes:** "Add New Rule" vs "Edit/Delete Rule".
- **Dynamic Inputs:** "Edit" mode shows "Old Rule ID" and "New Content".
- **Output:** Formatted block based on selected mode.

## Module 10: Crafting Simulator
**Path:** `/modules/crafting/`
**Purpose:** Simulation of the complex crafting downtime activity.
**Key Features:**
- **Phase 1: Setup:**
  - Select Character Level (Auto calculates Proficiency Bonus).
  - Select Item (Autocomplete).
  - **Logic:**
    - If "Spell Scroll": Use Fixed Table for Cost/WU/DC.
    - If Standard Item: Interpolate Cost to find WU and DC ranges, then calculate exact target based on price ratio.
  - **Materials:** Select Quality (Poor/Common/Quality) -> Affects initial modifier (CM).
  - **Tools:** Select Tool & Stat -> Calculates Skill Bonus.
  - **Lock:** "Start Simulation" locks all inputs.

- **Phase 2: Simulation Loop:**
  - **State:** Tracks `Current_WU`, `Total_Score` (Grand Total).
  - **Action:** Player chooses Approach (Safe/Ambitious/Masterwork) each turn.
  - **Rolls:**
    1. Skill Check (d20 + Bonus) vs Approach DC. (Success/Fail modifies CM).
    2. Event Check (d10) -> Random event modifies CM.
    3. Progress Roll (d20 + CM) -> Adds to Grand Total.
  - **End Condition:** When `Current_WU` reaches Target.

- **Phase 3: Result:**
  - Success if `Grand_Total` >= `Target_DC`.
  - Failure: Calculate recycled materials based on initial quality choice.
