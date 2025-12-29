const allItems = [
    {
        "name":  "[+1] All-Purpose Tool",
        "price":  625
    },
    {
        "name":  "[+1] Ammunition",
        "price":  10
    },
    {
        "name":  "[+1] Amulet of the Devout",
        "price":  625
    },
    {
        "name":  "[+1] Arcane Grimoire",
        "price":  625
    },
    {
        "name":  "[+1] Armor",
        "price":  1750
    },
    {
        "name":  "[+1] Bloodwell Vial",
        "price":  625
    },
    {
        "name":  "[+1] Moon Sickle",
        "price":  625
    },
    {
        "name":  "Repeating Shot",
        "price":  625
    },
    {
        "name":  "[+1] Rod of the Pact Keeper",
        "price":  625
    },
    {
        "name":  "[+1] Shield",
        "price":  750
    },
    {
        "name":  "[+1] Wand of the War Mage",
        "price":  500
    },
    {
        "name":  "[+1] Weapon",
        "price":  500
    },
    {
        "name":  "[+1] Wraps of Unarmed Power",
        "price":  500
    },
    {
        "name":  "[+2] All-Purpose Tool",
        "price":  1250
    },
    {
        "name":  "[+2] Ammunition",
        "price":  25
    },
    {
        "name":  "[+2] Amulet of the Devout",
        "price":  1250
    },
    {
        "name":  "[+2] Arcane Grimoire",
        "price":  1250
    },
    {
        "name":  "[+2] Armor",
        "price":  3500
    },
    {
        "name":  "[+2] Bloodwell Vial",
        "price":  1250
    },
    {
        "name":  "[+2] Moon Sickle",
        "price":  1250
    },
    {
        "name":  "[+2] Rhythm-Maker\u0027s Drum",
        "price":  1250
    },
    {
        "name":  "[+2] Rod of the Pact Keeper",
        "price":  1250
    },
    {
        "name":  "[+2] Shield",
        "price":  1500
    },
    {
        "name":  "[+2] Wand of the War Mage",
        "price":  1000
    },
    {
        "name":  "[+2] Weapon",
        "price":  1000
    },
    {
        "name":  "[+2] Wraps of Unarmed Power",
        "price":  1000
    },
    {
        "name":  "[+3] All-Purpose Tool",
        "price":  2500
    },
    {
        "name":  "[+3] Ammunition",
        "price":  50
    },
    {
        "name":  "[+3] Amulet of the Devout",
        "price":  2500
    },
    {
        "name":  "[+3] Arcane Grimoire",
        "price":  2500
    },
    {
        "name":  "[+3] Bloodwell Vial",
        "price":  2500
    },
    {
        "name":  "[+3] Moon Sickle",
        "price":  2500
    },
    {
        "name":  "[+3] Rhythm-Maker\u0027s Drum",
        "price":  2500
    },
    {
        "name":  "[+3] Rod of the Pact Keeper",
        "price":  2500
    },
    {
        "name":  "[+3] Shield",
        "price":  3000
    },
    {
        "name":  "[+3] Wand of the War Mage",
        "price":  2000
    },
    {
        "name":  "[+3] Weapon",
        "price":  2000
    },
    {
        "name":  "[+3] Wraps of Unarmed Power",
        "price":  2000
    },
    {
        "name":  "Adamantine Armor",
        "price":  325
    },
    {
        "name":  "Adamantine Weapon",
        "price":  200
    },
    {
        "name":  "Adventurer\u0027s Ring",
        "price":  10
    },
    {
        "name":  "Alchemy Jug",
        "price":  500
    },
    {
        "name":  "Ammunition of Slaying",
        "price":  250
    },
    {
        "name":  "Amulet of Proof against Detection and Location",
        "price":  750
    },
    {
        "name":  "Animated Shield",
        "price":  2500
    },
    {
        "name":  "Armor of Gleaming",
        "price":  25
    },
    {
        "name":  "Armor of Resistance",
        "price":  1000
    },
    {
        "name":  "Armor of Vulnerability",
        "price":  500
    },
    {
        "name":  "Arrow-Catching Shield",
        "price":  1000
    },
    {
        "name":  "Baba Yaga\u0027s Dancing Broom",
        "price":  200
    },
    {
        "name":  "Bag of Holding",
        "price":  500
    },
    {
        "name":  "Bag of Tricks",
        "price":  1500
    },
    {
        "name":  "Bead of Force",
        "price":  500
    },
    {
        "name":  "Bead of Nourishment",
        "price":  10
    },
    {
        "name":  "Bead of Refreshment",
        "price":  10
    },
    {
        "name":  "Belt of Dwarvenkind",
        "price":  1500
    },
    {
        "name":  "Berserker Axe",
        "price":  1000
    },
    {
        "name":  "Boots of Elvenkind",
        "price":  250
    },
    {
        "name":  "Boots of False Tracks",
        "price":  25
    },
    {
        "name":  "Boots of Levitation",
        "price":  1000
    },
    {
        "name":  "Boots of Speed",
        "price":  1000
    },
    {
        "name":  "Boots of Striding and Springing",
        "price":  200
    },
    {
        "name":  "Boots of the Winding Path",
        "price":  750
    },
    {
        "name":  "Boots of the Winterlands",
        "price":  500
    },
    {
        "name":  "Bowl of Commanding Water Elementals",
        "price":  1500
    },
    {
        "name":  "Bracers of Archery",
        "price":  500
    },
    {
        "name":  "Bracers of Defense",
        "price":  1000
    },
    {
        "name":  "Brazier of Commanding Fire Elementals",
        "price":  1500
    },
    {
        "name":  "Brooch of Shielding",
        "price":  500
    },
    {
        "name":  "Broom of Flying",
        "price":  750
    },
    {
        "name":  "Candle of Invocation",
        "price":  1000
    },
    {
        "name":  "Candle of the Deep",
        "price":  50
    },
    {
        "name":  "Cap of Water Breathing",
        "price":  250
    },
    {
        "name":  "Cape of the Mountebank",
        "price":  1000
    },
    {
        "name":  "Carpet of Flying",
        "price":  4000
    },
    {
        "name":  "Cast-Off Armor",
        "price":  50
    },
    {
        "name":  "Cauldron of Rebirth",
        "price":  5000
    },
    {
        "name":  "Censer of Controlling Air Elementals",
        "price":  1500
    },
    {
        "name":  "Charlatan\u0027s Die",
        "price":  50
    },
    {
        "name":  "Chime of Opening",
        "price":  2500
    },
    {
        "name":  "Circlet of Blasting",
        "price":  250
    },
    {
        "name":  "Cloak of Arachnida",
        "price":  3250
    },
    {
        "name":  "Cloak of Billowing",
        "price":  25
    },
    {
        "name":  "Cloak of Displacement",
        "price":  2500
    },
    {
        "name":  "Cloak of Elvenkind",
        "price":  250
    },
    {
        "name":  "Cloak of Many Fashions",
        "price":  25
    },
    {
        "name":  "Cloak of Protection",
        "price":  750
    },
    {
        "name":  "Cloak of the Bat",
        "price":  1000
    },
    {
        "name":  "Cloak of the Manta Ray",
        "price":  500
    },
    {
        "name":  "Clockwork Amulet (Max. 3)",
        "price":  50
    },
    {
        "name":  "Clothes of Mending",
        "price":  50
    },
    {
        "name":  "Crystal Ball",
        "price":  3250
    },
    {
        "name":  "Cube of Force",
        "price":  2000
    },
    {
        "name":  "Cube of Summoning",
        "price":  2000
    },
    {
        "name":  "Daern\u0027s Instant Fortress",
        "price":  2500
    },
    {
        "name":  "Dagger of Venom",
        "price":  1250
    },
    {
        "name":  "Dancing Sword",
        "price":  5000
    },
    {
        "name":  "Dark Shard Amulet",
        "price":  50
    },
    {
        "name":  "Dazzling Weapon",
        "price":  1500
    },
    {
        "name":  "Decanter of Endless Water",
        "price":  250
    },
    {
        "name":  "Deck of Illusions",
        "price":  300
    },
    {
        "name":  "Demon Armor",
        "price":  3500
    },
    {
        "name":  "Dimensional Shackles",
        "price":  1250
    },
    {
        "name":  "Dragon Scale Mail",
        "price":  4000
    },
    {
        "name":  "Dragon Slayer",
        "price":  1000
    },
    {
        "name":  "Dread Helm",
        "price":  25
    },
    {
        "name":  "Driftglobe",
        "price":  500
    },
    {
        "name":  "Dust of Disappearance",
        "price":  150
    },
    {
        "name":  "Dust of Dryness",
        "price":  100
    },
    {
        "name":  "Dust of Sneezing and Choking",
        "price":  200
    },
    {
        "name":  "Dwarven Plate",
        "price":  5000
    },
    {
        "name":  "Dwarven Thrower",
        "price":  4500
    },
    {
        "name":  "Ear Horn of Hearing",
        "price":  25
    },
    {
        "name":  "Elemental Gem",
        "price":  250
    },
    {
        "name":  "Elixir of Health",
        "price":  200
    },
    {
        "name":  "Elven Chain",
        "price":  2500
    },
    {
        "name":  "Enduring Spellbook",
        "price":  50
    },
    {
        "name":  "Energy Bow",
        "price":  3000
    },
    {
        "name":  "Enspelled Armor (Cantrip)",
        "price":  100
    },
    {
        "name":  "Enspelled Armor (Level 1)",
        "price":  250
    },
    {
        "name":  "Enspelled Staff (Cantrip)",
        "price":  50
    },
    {
        "name":  "Enspelled Staff (Level 1)",
        "price":  250
    },
    {
        "name":  "Enspelled Weapon (Cantrip)",
        "price":  75
    },
    {
        "name":  "Enspelled Weapon (Level 1)",
        "price":  250
    },
    {
        "name":  "Ersatz Eye",
        "price":  25
    },
    {
        "name":  "Eversmoking Bottle",
        "price":  250
    },
    {
        "name":  "Executioner’s Axe",
        "price":  2500
    },
    {
        "name":  "Eyes of Charming",
        "price":  250
    },
    {
        "name":  "Eyes of Minute Seeing",
        "price":  250
    },
    {
        "name":  "Eyes of the Eagle",
        "price":  250
    },
    {
        "name":  "Figurine of Wondrous Power, Bronze Griffon",
        "price":  1500
    },
    {
        "name":  "Figurine of Wondrous Power, Ebony Fly",
        "price":  1000
    },
    {
        "name":  "Figurine of Wondrous Power, Golden Lions",
        "price":  1000
    },
    {
        "name":  "Figurine of Wondrous Power, Ivory Goats",
        "price":  2500
    },
    {
        "name":  "Figurine of Wondrous Power, Marble Elephant",
        "price":  2000
    },
    {
        "name":  "Figurine of Wondrous Power, Obsidian Steed",
        "price":  3000
    },
    {
        "name":  "Figurine of Wondrous Power, Onyx Dog",
        "price":  1750
    },
    {
        "name":  "Figurine of Wondrous Power, Serpentine Owl",
        "price":  1000
    },
    {
        "name":  "Figurine of Wondrous Power, Silver Raven",
        "price":  200
    },
    {
        "name":  "Flame Tongue",
        "price":  1500
    },
    {
        "name":  "Folding Boat",
        "price":  500
    },
    {
        "name":  "Frost Brand",
        "price":  3500
    },
    {
        "name":  "Gem of Brightness",
        "price":  250
    },
    {
        "name":  "Gem of Seeing",
        "price":  1000
    },
    {
        "name":  "Giant Slayer",
        "price":  1000
    },
    {
        "name":  "Glamoured Studded Leather",
        "price":  1800
    },
    {
        "name":  "Gloves of Missile Snaring",
        "price":  250
    },
    {
        "name":  "Gloves of Swimming and Climbing",
        "price":  250
    },
    {
        "name":  "Gloves of Thievery",
        "price":  500
    },
    {
        "name":  "Goggles of Night",
        "price":  100
    },
    {
        "name":  "Hag Eye",
        "price":  500
    },
    {
        "name":  "Hat of Disguise",
        "price":  500
    },
    {
        "name":  "Hat of Vermin",
        "price":  25
    },
    {
        "name":  "Hat of Wizardry",
        "price":  50
    },
    {
        "name":  "Helm of Awareness",
        "price":  500
    },
    {
        "name":  "Helm of Comprehending Languages",
        "price":  500
    },
    {
        "name":  "Helm of Telepathy",
        "price":  500
    },
    {
        "name":  "Helm of Teleportation",
        "price":  2500
    },
    {
        "name":  "Heward\u0027s Handy Haversack",
        "price":  1250
    },
    {
        "name":  "Heward\u0027s Handy Spice Pouch",
        "price":  25
    },
    {
        "name":  "Horn of Blasting",
        "price":  1000
    },
    {
        "name":  "Horn of Silent Alarm",
        "price":  50
    },
    {
        "name":  "Horseshoes of a Zephyr",
        "price":  2000
    },
    {
        "name":  "Horseshoes of Speed",
        "price":  500
    },
    {
        "name":  "Immovable Rod",
        "price":  1000
    },
    {
        "name":  "Instrument of Illusions",
        "price":  25
    },
    {
        "name":  "Instrument of Scribing",
        "price":  25
    },
    {
        "name":  "Instrument of the Bards, Anstruth Harp",
        "price":  4000
    },
    {
        "name":  "Instrument of the Bards, Canaith Mandolin",
        "price":  1000
    },
    {
        "name":  "Instrument of the Bards, Cli Lyre",
        "price":  1000
    },
    {
        "name":  "Instrument of the Bards, Doss Lute",
        "price":  500
    },
    {
        "name":  "Instrument of the Bards, Fochlucan Bandore",
        "price":  500
    },
    {
        "name":  "Instrument of the Bards, Mac-Fuirmidh Cittern",
        "price":  500
    },
    {
        "name":  "Ioun Stone, Absorption",
        "price":  5000
    },
    {
        "name":  "Ioun Stone, Agility",
        "price":  5000
    },
    {
        "name":  "Ioun Stone, Awareness",
        "price":  1500
    },
    {
        "name":  "Ioun Stone, Fortitude",
        "price":  5000
    },
    {
        "name":  "Ioun Stone, Insight",
        "price":  5000
    },
    {
        "name":  "Ioun Stone, Intellect",
        "price":  5000
    },
    {
        "name":  "Ioun Stone, Leadership",
        "price":  5000
    },
    {
        "name":  "Ioun Stone, Protection",
        "price":  1500
    },
    {
        "name":  "Ioun Stone, Reserve",
        "price":  1500
    },
    {
        "name":  "Ioun Stone, Strength",
        "price":  5000
    },
    {
        "name":  "Ioun Stone, Sustenance",
        "price":  1500
    },
    {
        "name":  "Iron Bands of Bilarro",
        "price":  2500
    },
    {
        "name":  "Javelin of Lightning",
        "price":  200
    },
    {
        "name":  "Keoghtom\u0027s Ointment",
        "price":  100
    },
    {
        "name":  "Lantern of Revealing",
        "price":  100
    },
    {
        "name":  "Lock of Trickery",
        "price":  50
    },
    {
        "name":  "Lute of Thunderous Thumping",
        "price":  3000
    },
    {
        "name":  "Mace of Disruption",
        "price":  1250
    },
    {
        "name":  "Mace of Smiting",
        "price":  1250
    },
    {
        "name":  "Mace of Terror",
        "price":  1250
    },
    {
        "name":  "Manifold Tool",
        "price":  100
    },
    {
        "name":  "Mantle of Spell Resistance",
        "price":  2000
    },
    {
        "name":  "Mariner\u0027s Armor",
        "price":  250
    },
    {
        "name":  "Medallion of Thoughts",
        "price":  200
    },
    {
        "name":  "Mind Sharpener",
        "price":  250
    },
    {
        "name":  "Mithral Armor",
        "price":  200
    },
    {
        "name":  "Moon-Touched Sword",
        "price":  50
    },
    {
        "name":  "Mystery Key",
        "price":  20
    },
    {
        "name":  "Nature\u0027s Mantle",
        "price":  200
    },
    {
        "name":  "Necklace of Adaptation",
        "price":  200
    },
    {
        "name":  "Necklace of Fireballs (EA)",
        "price":  300
    },
    {
        "name":  "Necklace of Prayer Beads",
        "price":  2000
    },
    {
        "name":  "Nine Lives Stealer",
        "price":  5000
    },
    {
        "name":  "Nolzur’s Marvelous Pigments",
        "price":  2000
    },
    {
        "name":  "Oathbow",
        "price":  5000
    },
    {
        "name":  "Oil of Etherealness",
        "price":  500
    },
    {
        "name":  "Oil of Sharpness",
        "price":  500
    },
    {
        "name":  "Oil of Slipperiness",
        "price":  250
    },
    {
        "name":  "Orb of Direction",
        "price":  25
    },
    {
        "name":  "Orb of Time",
        "price":  25
    },
    {
        "name":  "Pearl of Power",
        "price":  750
    },
    {
        "name":  "Perfume of Bewitching",
        "price":  20
    },
    {
        "name":  "Periapt of Health",
        "price":  150
    },
    {
        "name":  "Periapt of Proof against Poison",
        "price":  1000
    },
    {
        "name":  "Periapt of Wound Closure",
        "price":  250
    },
    {
        "name":  "Philter of Love",
        "price":  500
    },
    {
        "name":  "Pipe of Smoke Monsters",
        "price":  25
    },
    {
        "name":  "Pipes of Haunting",
        "price":  250
    },
    {
        "name":  "Pipes of the Sewers",
        "price":  250
    },
    {
        "name":  "Pole of Angling",
        "price":  25
    },
    {
        "name":  "Pole of Collapsing",
        "price":  25
    },
    {
        "name":  "Portable Hole",
        "price":  2500
    },
    {
        "name":  "Pot of Awakening",
        "price":  25
    },
    {
        "name":  "Potion of Animal Friendship",
        "price":  100
    },
    {
        "name":  "Potion of Clairvoyance",
        "price":  250
    },
    {
        "name":  "Potion of Climbing",
        "price":  20
    },
    {
        "name":  "Potion of Cloud Giant Strength",
        "price":  550
    },
    {
        "name":  "Potion of Comprehension",
        "price":  20
    },
    {
        "name":  "Potion of Diminution",
        "price":  200
    },
    {
        "name":  "Potion of Fire Breath",
        "price":  200
    },
    {
        "name":  "Potion of Fire Giant Strength",
        "price":  450
    },
    {
        "name":  "Potion of Flying",
        "price":  500
    },
    {
        "name":  "Potion of Frost Giant Strength",
        "price":  350
    },
    {
        "name":  "Potion of Gaseous Form",
        "price":  300
    },
    {
        "name":  "Potion of Greater Healing",
        "price":  200
    },
    {
        "name":  "Potion of Greater Invisibility",
        "price":  650
    },
    {
        "name":  "Potion of Growth",
        "price":  150
    },
    {
        "name":  "Potion of Healing",
        "price":  50
    },
    {
        "name":  "Potion of Heroism",
        "price":  200
    },
    {
        "name":  "Potion of Hill Giant Strength",
        "price":  250
    },
    {
        "name":  "Potion of Invisibility",
        "price":  200
    },
    {
        "name":  "Potion of Invulnerability",
        "price":  1000
    },
    {
        "name":  "Potion of Mind Reading",
        "price":  500
    },
    {
        "name":  "Potion of Poison",
        "price":  50
    },
    {
        "name":  "Potion of Pugilism",
        "price":  150
    },
    {
        "name":  "Potion of Resistance",
        "price":  100
    },
    {
        "name":  "Potion of Speed",
        "price":  650
    },
    {
        "name":  "Potion of Stone Giant Strength",
        "price":  350
    },
    {
        "name":  "Potion of Superior Healing",
        "price":  500
    },
    {
        "name":  "Potion of Supreme Healing",
        "price":  650
    },
    {
        "name":  "Potion of Vitality",
        "price":  650
    },
    {
        "name":  "Potion of Water Breathing",
        "price":  50
    },
    {
        "name":  "Prosthetic Limb",
        "price":  25
    },
    {
        "name":  "Quaal\u0027s Feather Token, Anchor",
        "price":  50
    },
    {
        "name":  "Quaal\u0027s Feather Token, Bird",
        "price":  750
    },
    {
        "name":  "Quaal\u0027s Feather Token, Fan",
        "price":  100
    },
    {
        "name":  "Quaal\u0027s Feather Token, Swan Boat",
        "price":  500
    },
    {
        "name":  "Quaal\u0027s Feather Token, Tree",
        "price":  50
    },
    {
        "name":  "Quaal\u0027s Feather Token, Whip",
        "price":  500
    },
    {
        "name":  "Quarterstaff of the Acrobat",
        "price":  3000
    },
    {
        "name":  "Quiver of Ehlonna",
        "price":  250
    },
    {
        "name":  "Repeating Shot",
        "price":  625
    },
    {
        "name":  "Repulsion Shield",
        "price":  1000
    },
    {
        "name":  "Returning Weapon",
        "price":  625
    },
    {
        "name":  "Ring of Animal Influence",
        "price":  500
    },
    {
        "name":  "Ring of Evasion",
        "price":  500
    },
    {
        "name":  "Ring of Feather Falling",
        "price":  500
    },
    {
        "name":  "Ring of Free Action",
        "price":  1500
    },
    {
        "name":  "Ring of Jumping",
        "price":  100
    },
    {
        "name":  "Ring of Mind Shielding",
        "price":  100
    },
    {
        "name":  "Ring of Protection",
        "price":  750
    },
    {
        "name":  "Ring of Regeneration",
        "price":  2500
    },
    {
        "name":  "Ring of Resistance",
        "price":  1000
    },
    {
        "name":  "Ring of Shooting Stars",
        "price":  2500
    },
    {
        "name":  "Ring of Spell Storing",
        "price":  1250
    },
    {
        "name":  "Ring of Swimming",
        "price":  150
    },
    {
        "name":  "Ring of Telekinesis",
        "price":  5000
    },
    {
        "name":  "Ring of the Ram",
        "price":  1000
    },
    {
        "name":  "Ring of Warmth",
        "price":  250
    },
    {
        "name":  "Ring of Water Walking",
        "price":  150
    },
    {
        "name":  "Ring of X-ray Vision",
        "price":  500
    },
    {
        "name":  "Rival Coin",
        "price":  50
    },
    {
        "name":  "Robe of Eyes",
        "price":  1500
    },
    {
        "name":  "Robe of Scintillating Colors",
        "price":  3000
    },
    {
        "name":  "Rod of Absorption",
        "price":  5000
    },
    {
        "name":  "Rod of Alertness",
        "price":  4000
    },
    {
        "name":  "Rod of Rulership",
        "price":  1500
    },
    {
        "name":  "Rod of Security",
        "price":  2500
    },
    {
        "name":  "Rope of Climbing",
        "price":  250
    },
    {
        "name":  "Rope of Entanglement",
        "price":  750
    },
    {
        "name":  "Rope of Mending",
        "price":  50
    },
    {
        "name":  "Ruby of the War Mage",
        "price":  25
    },
    {
        "name":  "Saddle of the Cavalier",
        "price":  100
    },
    {
        "name":  "Scimitar of Speed",
        "price":  3000
    },
    {
        "name":  "Scroll of Protection",
        "price":  500
    },
    {
        "name":  "Sending Stones",
        "price":  100
    },
    {
        "name":  "Sentinel Shield",
        "price":  500
    },
    {
        "name":  "Shield of Expression",
        "price":  25
    },
    {
        "name":  "Shield of Missile Attraction",
        "price":  1500
    },
    {
        "name":  "Shield of the Cavalier",
        "price":  5000
    },
    {
        "name":  "Silvered Weapon",
        "price":  50
    },
    {
        "name":  "Slippers of Spider Climbing",
        "price":  250
    },
    {
        "name":  "Smoldering Armor",
        "price":  25
    },
    {
        "name":  "Spell Scroll (Cantrip)",
        "price":  30
    },
    {
        "name":  "Spell Scroll (Level 1)",
        "price":  50
    },
    {
        "name":  "Spell Scroll (Level 2)",
        "price":  100
    },
    {
        "name":  "Spell Scroll (Level 3)",
        "price":  150
    },
    {
        "name":  "Spell Scroll (Level 4)",
        "price":  700
    },
    {
        "name":  "Spell Scroll (Level 5)",
        "price":  1000
    },
    {
        "name":  "Spell Scroll (Level 6)",
        "price":  2000
    },
    {
        "name":  "Spell Scroll (Level 7)",
        "price":  3500
    },
    {
        "name":  "Spell Scroll (Level 8)",
        "price":  5000
    },
    {
        "name":  "Spell-Refueling Ring",
        "price":  750
    },
    {
        "name":  "Spellguard Shield",
        "price":  5000
    },
    {
        "name":  "Spirit Board",
        "price":  2500
    },
    {
        "name":  "Staff of Adornment",
        "price":  25
    },
    {
        "name":  "Staff of Birdcalls",
        "price":  25
    },
    {
        "name":  "Staff of Charming",
        "price":  1500
    },
    {
        "name":  "Staff of Fire",
        "price":  3000
    },
    {
        "name":  "Staff of Flowers",
        "price":  25
    },
    {
        "name":  "Staff of Frost",
        "price":  3000
    },
    {
        "name":  "Staff of Healing",
        "price":  1500
    },
    {
        "name":  "Staff of Power",
        "price":  5000
    },
    {
        "name":  "Staff of Striking",
        "price":  2500
    },
    {
        "name":  "Staff of Swarming Insects",
        "price":  2000
    },
    {
        "name":  "Staff of the Adder",
        "price":  500
    },
    {
        "name":  "Staff of the Python",
        "price":  500
    },
    {
        "name":  "Staff of the Woodlands",
        "price":  2500
    },
    {
        "name":  "Staff of Thunder and Lightning",
        "price":  3000
    },
    {
        "name":  "Staff of Withering",
        "price":  2000
    },
    {
        "name":  "Stone of Controlling Earth Elementals",
        "price":  1500
    },
    {
        "name":  "Stone of Good Luck",
        "price":  750
    },
    {
        "name":  "Sun Blade",
        "price":  1500
    },
    {
        "name":  "Sword of Life Stealing",
        "price":  1250
    },
    {
        "name":  "Sword of Sharpness",
        "price":  3000
    },
    {
        "name":  "Sword of Vengeance",
        "price":  500
    },
    {
        "name":  "Sword of Wounding",
        "price":  1500
    },
    {
        "name":  "Sylvan Talon",
        "price":  50
    },
    {
        "name":  "Talking Doll",
        "price":  25
    },
    {
        "name":  "Tankard of Sobriety",
        "price":  50
    },
    {
        "name":  "Tentacle Rod",
        "price":  1000
    },
    {
        "name":  "Thayan Spell Tattoo (Level 1)",
        "price":  200
    },
    {
        "name":  "Thunderous Greatclub",
        "price":  5000
    },
    {
        "name":  "Trident of Fish Command",
        "price":  500
    },
    {
        "name":  "Veteran\u0027s Cane",
        "price":  50
    },
    {
        "name":  "Vicious Weapon",
        "price":  1500
    },
    {
        "name":  "Walloping Ammunition",
        "price":  5
    },
    {
        "name":  "Wand of Binding",
        "price":  1000
    },
    {
        "name":  "Wand of Conducting",
        "price":  25
    },
    {
        "name":  "Wand of Enemy Detection",
        "price":  500
    },
    {
        "name":  "Wand of Fear",
        "price":  1000
    },
    {
        "name":  "Wand of Fireballs",
        "price":  1500
    },
    {
        "name":  "Wand of Lightning Bolts",
        "price":  1500
    },
    {
        "name":  "Wand of Magic Detection",
        "price":  250
    },
    {
        "name":  "Wand of Magic Missiles",
        "price":  750
    },
    {
        "name":  "Wand of Paralysis",
        "price":  2000
    },
    {
        "name":  "Wand of Polymorph",
        "price":  3500
    },
    {
        "name":  "Wand of Secrets",
        "price":  250
    },
    {
        "name":  "Wand of Web",
        "price":  250
    },
    {
        "name":  "Wand of Wonder",
        "price":  1500
    },
    {
        "name":  "Weapon of Warning",
        "price":  250
    },
    {
        "name":  "Wind Fan",
        "price":  100
    },
    {
        "name":  "Winged Boots",
        "price":  750
    },
    {
        "name":  "Wings of Flying",
        "price":  1500
    },
    {
        "name":  "Acid",
        "price":  25
    },
    {
        "name":  "Alchemist’s Fire",
        "price":  50
    },
    {
        "name":  "Arrows (20)",
        "price":  1
    },
    {
        "name":  "Bolts (20)",
        "price":  1
    },
    {
        "name":  "Bullets Firearm (10)",
        "price":  3
    },
    {
        "name":  "Bullets Sling (20)",
        "price":  0.04
    },
    {
        "name":  "Needles (50)",
        "price":  1
    },
    {
        "name":  "Antitoxin",
        "price":  50
    },
    {
        "name":  "Crystal",
        "price":  10
    },
    {
        "name":  "Orb",
        "price":  20
    },
    {
        "name":  "Rod",
        "price":  10
    },
    {
        "name":  "Staff (also a Quarterstaff)",
        "price":  5
    },
    {
        "name":  "Wand",
        "price":  10
    },
    {
        "name":  "Backpack",
        "price":  2
    },
    {
        "name":  "Ball Bearings",
        "price":  1
    },
    {
        "name":  "Barrel",
        "price":  2
    },
    {
        "name":  "Basket",
        "price":  0.4
    },
    {
        "name":  "Bedroll",
        "price":  1
    },
    {
        "name":  "Bell",
        "price":  1
    },
    {
        "name":  "Blanket",
        "price":  0.5
    },
    {
        "name":  "Block and Tackle",
        "price":  1
    },
    {
        "name":  "Book",
        "price":  25
    },
    {
        "name":  "Bottle Glass",
        "price":  2
    },
    {
        "name":  "Bucket",
        "price":  0.05
    },
    {
        "name":  "Burglar’s Pack",
        "price":  16
    },
    {
        "name":  "Caltrops",
        "price":  1
    },
    {
        "name":  "Candle",
        "price":  0.01
    },
    {
        "name":  "Case Crossbow Bolt",
        "price":  1
    },
    {
        "name":  "Case Map or Scroll",
        "price":  1
    },
    {
        "name":  "Chain",
        "price":  5
    },
    {
        "name":  "Chest",
        "price":  5
    },
    {
        "name":  "Climber’s Kit",
        "price":  25
    },
    {
        "name":  "Clothes Fine",
        "price":  15
    },
    {
        "name":  "Clothes Traveler’s",
        "price":  2
    },
    {
        "name":  "Component Pouch",
        "price":  25
    },
    {
        "name":  "Costume",
        "price":  5
    },
    {
        "name":  "Crowbar",
        "price":  2
    },
    {
        "name":  "Diplomat’s Pack",
        "price":  39
    },
    {
        "name":  "Sprig of mistletoe",
        "price":  1
    },
    {
        "name":  "Wooden staff (also a Quarterstaff)",
        "price":  5
    },
    {
        "name":  "Yew wand",
        "price":  10
    },
    {
        "name":  "Dungeoneer’s Pack",
        "price":  12
    },
    {
        "name":  "Entertainer’s Pack",
        "price":  40
    },
    {
        "name":  "Explorer’s Pack",
        "price":  10
    },
    {
        "name":  "Flask",
        "price":  0.02
    },
    {
        "name":  "Grappling Hook",
        "price":  2
    },
    {
        "name":  "Healer’s Kit",
        "price":  5
    },
    {
        "name":  "Amulet (worn or held)",
        "price":  5
    },
    {
        "name":  "Emblem (borne on fabric or a Shield)",
        "price":  5
    },
    {
        "name":  "Reliquary (held)",
        "price":  5
    },
    {
        "name":  "Holy Water",
        "price":  25
    },
    {
        "name":  "Hunting Trap",
        "price":  5
    },
    {
        "name":  "Ink",
        "price":  10
    },
    {
        "name":  "Ink Pen",
        "price":  0.02
    },
    {
        "name":  "Jug",
        "price":  0.02
    },
    {
        "name":  "Ladder",
        "price":  0.1
    },
    {
        "name":  "Lamp",
        "price":  0.5
    },
    {
        "name":  "Lantern Bullseye",
        "price":  10
    },
    {
        "name":  "Lantern Hooded",
        "price":  5
    },
    {
        "name":  "Lock",
        "price":  10
    },
    {
        "name":  "Magnifying Glass",
        "price":  100
    },
    {
        "name":  "Manacles",
        "price":  2
    },
    {
        "name":  "Map",
        "price":  1
    },
    {
        "name":  "Mirror",
        "price":  5
    },
    {
        "name":  "Net",
        "price":  1
    },
    {
        "name":  "Oil",
        "price":  0.1
    },
    {
        "name":  "Paper",
        "price":  0.2
    },
    {
        "name":  "Parchment",
        "price":  0.1
    },
    {
        "name":  "Perfume",
        "price":  5
    },
    {
        "name":  "Poison Basic",
        "price":  100
    },
    {
        "name":  "Pole",
        "price":  0.05
    },
    {
        "name":  "Pot Iron",
        "price":  2
    },
    {
        "name":  "Potion of Healing",
        "price":  50
    },
    {
        "name":  "Pouch",
        "price":  0.5
    },
    {
        "name":  "Priest’s Pack",
        "price":  33
    },
    {
        "name":  "Quiver",
        "price":  1
    },
    {
        "name":  "Ram Portable",
        "price":  4
    },
    {
        "name":  "Rations",
        "price":  0.5
    },
    {
        "name":  "Robe",
        "price":  1
    },
    {
        "name":  "Rope",
        "price":  1
    },
    {
        "name":  "Sack",
        "price":  0.01
    },
    {
        "name":  "Scholar’s Pack",
        "price":  40
    },
    {
        "name":  "Shovel",
        "price":  2
    },
    {
        "name":  "Signal Whistle",
        "price":  0.05
    },
    {
        "name":  "Spikes Iron",
        "price":  1
    },
    {
        "name":  "Spyglass",
        "price":  1000
    },
    {
        "name":  "String",
        "price":  0.1
    },
    {
        "name":  "Tent",
        "price":  2
    },
    {
        "name":  "Tinderbox",
        "price":  0.5
    },
    {
        "name":  "Torch",
        "price":  0.01
    },
    {
        "name":  "Vial",
        "price":  1
    },
    {
        "name":  "Waterskin",
        "price":  0.2
    },
    {
        "name":  "Padded Armor",
        "price":  5
    },
    {
        "name":  "Leather Armor",
        "price":  10
    },
    {
        "name":  "Studded Leather Armor",
        "price":  45
    },
    {
        "name":  "Hide Armor",
        "price":  10
    },
    {
        "name":  "Chain Shirt",
        "price":  50
    },
    {
        "name":  "Scale Mail",
        "price":  50
    },
    {
        "name":  "Breastplate",
        "price":  400
    },
    {
        "name":  "Half Plate Armor",
        "price":  750
    },
    {
        "name":  "Ring Mail",
        "price":  30
    },
    {
        "name":  "Chain Mail",
        "price":  75
    },
    {
        "name":  "Splint Armor",
        "price":  200
    },
    {
        "name":  "Plate Armor",
        "price":  1500
    },
    {
        "name":  "Shield",
        "price":  10
    },
    {
        "name":  "Alchemists Supplies",
        "price":  50
    },
    {
        "name":  "Brewers Supplies",
        "price":  20
    },
    {
        "name":  "Calligraphers Supplies",
        "price":  10
    },
    {
        "name":  "Carpenters Tools",
        "price":  8
    },
    {
        "name":  "Cartographers Tools",
        "price":  15
    },
    {
        "name":  "Cobblers Tools",
        "price":  5
    },
    {
        "name":  "Cooks Utensils",
        "price":  1
    },
    {
        "name":  "Glassblowers Tools",
        "price":  30
    },
    {
        "name":  "Jewelers Tools",
        "price":  25
    },
    {
        "name":  "Leatherworkers Tools",
        "price":  5
    },
    {
        "name":  "Masons Tools",
        "price":  10
    },
    {
        "name":  "Painters Supplies",
        "price":  10
    },
    {
        "name":  "Potters Tools",
        "price":  10
    },
    {
        "name":  "Smiths Tools",
        "price":  20
    },
    {
        "name":  "Tinkers Tools",
        "price":  50
    },
    {
        "name":  "Weavers Tools",
        "price":  1
    },
    {
        "name":  "Woodcarvers Tools",
        "price":  1
    },
    {
        "name":  "Disguise Kit",
        "price":  25
    },
    {
        "name":  "Forgery Kit",
        "price":  15
    },
    {
        "name":  "Dice",
        "price":  0.1
    },
    {
        "name":  "Dragonchess",
        "price":  1
    },
    {
        "name":  "Playing cards",
        "price":  0.5
    },
    {
        "name":  "Three-dragon ante",
        "price":  1
    },
    {
        "name":  "Herbalism Kit",
        "price":  5
    },
    {
        "name":  "Bagpipes",
        "price":  30
    },
    {
        "name":  "Drum",
        "price":  6
    },
    {
        "name":  "Dulcimer",
        "price":  25
    },
    {
        "name":  "Flute",
        "price":  2
    },
    {
        "name":  "Horn",
        "price":  3
    },
    {
        "name":  "Lute",
        "price":  35
    },
    {
        "name":  "Lyre",
        "price":  30
    },
    {
        "name":  "Pan flute",
        "price":  12
    },
    {
        "name":  "Shawm",
        "price":  2
    },
    {
        "name":  "Viol",
        "price":  30
    },
    {
        "name":  "Navigators Tools",
        "price":  25
    },
    {
        "name":  "Poisoners Kit",
        "price":  50
    },
    {
        "name":  "Thieves Tools",
        "price":  25
    },
    {
        "name":  "Club",
        "price":  0.1
    },
    {
        "name":  "Dagger",
        "price":  2
    },
    {
        "name":  "Greatclub",
        "price":  0.2
    },
    {
        "name":  "Handaxe",
        "price":  5
    },
    {
        "name":  "Javelin",
        "price":  0.5
    },
    {
        "name":  "Light Hammer",
        "price":  2
    },
    {
        "name":  "Mace",
        "price":  5
    },
    {
        "name":  "Quarterstaff",
        "price":  0.2
    },
    {
        "name":  "Sickle",
        "price":  1
    },
    {
        "name":  "Spear",
        "price":  1
    },
    {
        "name":  "Dart",
        "price":  0.05
    },
    {
        "name":  "Light Crossbow",
        "price":  25
    },
    {
        "name":  "Shortbow",
        "price":  25
    },
    {
        "name":  "Sling",
        "price":  0.1
    },
    {
        "name":  "Battleaxe",
        "price":  10
    },
    {
        "name":  "Flail",
        "price":  10
    },
    {
        "name":  "Glaive",
        "price":  20
    },
    {
        "name":  "Greataxe",
        "price":  30
    },
    {
        "name":  "Greatsword",
        "price":  50
    },
    {
        "name":  "Halberd",
        "price":  20
    },
    {
        "name":  "Lance",
        "price":  10
    },
    {
        "name":  "Longsword",
        "price":  15
    },
    {
        "name":  "Maul",
        "price":  10
    },
    {
        "name":  "Morningstar",
        "price":  15
    },
    {
        "name":  "Pike",
        "price":  5
    },
    {
        "name":  "Rapier",
        "price":  25
    },
    {
        "name":  "Scimitar",
        "price":  25
    },
    {
        "name":  "Shortsword",
        "price":  10
    },
    {
        "name":  "Trident",
        "price":  5
    },
    {
        "name":  "Warhammer",
        "price":  15
    },
    {
        "name":  "War Pick",
        "price":  5
    },
    {
        "name":  "Whip",
        "price":  2
    },
    {
        "name":  "Blowgun",
        "price":  10
    },
    {
        "name":  "Hand Crossbow",
        "price":  75
    },
    {
        "name":  "Heavy Crossbow",
        "price":  50
    },
    {
        "name":  "Longbow",
        "price":  50
    },
    {
        "name":  "Musket",
        "price":  500
    },
    {
        "name":  "Pistol",
        "price":  250
    }
];
