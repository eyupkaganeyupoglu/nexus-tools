### Modül 10: Crafting (Üretim) Simülatörü

Bu modül, oyuncuların sağlanan kurallar ve tablolar ışığında eşya üretim sürecini adım adım simüle etmelerini sağlar.

**Veri Kaynağı:**
Modül 6'da tanımlanan `marketData` (Array of Objects) kullanılacaktır.

---

#### Adım 0: Karakter Seviyesi ve Prof Bonus
Sayfa ilk açıldığında veya en üstte sabit bir bar olarak:
* **Karakter Seviyesi:** (Select Input, 1-20).
* **Proficiency Bonus (Otomatik):** Seviye seçildiğinde aşağıdaki mantığa göre hesaplanıp ekranda gösterilmelidir (Salt okunur).
    * Lvl 1-4: **+2**
    * Lvl 5-8: **+3**
    * Lvl 9-12: **+4**
    * Lvl 13-16: **+5**
    * Lvl 17-20: **+6**
    * *Değişken:* `User_PB`

---

#### Adım 1: Proje Tanımlama (Eşya Seçimi ve Otomatik Hedefleme)
* **Eşya Arama:** (Modül 6'daki Autocomplete yapısı).
* **Otomatik Hesaplama Mantığı:**
    Eşya seçildiğinde sistem ismini ve fiyatını (`Item_Price`) kontrol etmelidir.

    **DURUM A: Eşya "Spell Scroll" İse (Örn: "Spell Scroll (Level 3)")**
    * Standart interpolasyon mantığını **YOK SAY**. Aşağıdaki tabloyu kullan:
    * **Spell Scroll Tablosu:**
        | Spell Level | Cost (GP) | Work Units | Masterwork DC |
        |:---:|:---:|:---:|:---:|
        | Cantrip | 15 | 1 | 9 |
        | 1st | 25 | 1 | 10 |
        | 2nd | 50 | 3 | 30 |
        | 3rd | 75 | 4 | 42 |
        | 4th | 350 | 7 | 77 |
        | 5th | 500 | 9 | 105 |
        | 6th | 1000 | 15 | 180 |
        | 7th | 1750 | 25 | 315 |
        | 8th | 2500 | 40 | 520 |
    * **İşlem:** Eşya isminden level'ı algıla ve tablodaki değerleri inputlara **kilitle (read-only)**.

    **DURUM B: Standart Eşya İse (Lineer İnterpolasyon)**
    * `Item_Price` değerine göre aşağıdaki **Complexity Table** aralıklarını kullan:
        | Value (GP) | Work Units (Min-Max) | Masterwork DC (Min-Max) |
        |:---:|:---:|:---:|
        | 0.01 - 50 | 1 - 2 | 8 - 16 |
        | 51 - 200 | 3 - 4 | 27 - 36 |
        | 201 - 1000 | 5 - 9 | 50 - 90 |
        | 1001 - 4000 | 10 - 29 | 110 - 320 |
        | 4001 - 5000 | 30 - 60 | 360 - 720 |

    * **Hesaplama Algoritması (JavaScript):**
        1.  Eşya fiyatının hangi GP aralığına (`MinGP` - `MaxGP`) düştüğünü bul.
        2.  Fiyatın bu aralıktaki yüzdesini (`ratio`) bul:
            `ratio = (Item_Price - MinGP) / (MaxGP - MinGP)`
            *(Eğer MinGP == MaxGP ise ratio = 0)*
        3.  Hedef değerleri orantıla ve yuvarla:
            `Calculated_WU = Math.round(MinWU + (ratio * (MaxWU - MinWU)))`
            `Calculated_DC = Math.round(MinDC + (ratio * (MaxDC - MinDC)))`
        4.  Bu değerleri inputlara otomatik doldur.

    * **Girdiler:**
        * "Hedef Work Unit Sayısı" (`Target_WU`): Otomatik dolar ve kullanıcı tarafından değiştirilemez.
        * "Hedef Masterwork DC" (`Target_DC`): Otomatik dolar ve kullanıcı tarafından değiştirilemez.

---

#### Adım 2: Materyal Toplama (Hazırlık)
Bu adım simülasyonun temelini oluşturur ve **simülasyon başladığında (Current_WU > 0) değiştirilemez.**

* **Materyal Kalitesi:** (Radio Button).
    * **Poor Materials:** (Maliyet: `Item_Price / 4`. Limit: Eşya <= 1000 GP ise. Etki: **-3 CM**).
    * **Common Materials:** (Maliyet: `Item_Price / 2`. Limit: Eşya <= 4000 GP ise. Etki: **-2 CM**).
    * **Quality Materials:** (Maliyet: `Item_Price * 0.75`. Limit: Eşya <= 5000 GP ise. Etki: **-1 CM**).
* **Validasyon:** `Item_Price` seçilen kalitenin limitinden yüksekse seçim engellenir ve uyarı verilir.
* *Değişken:* `Material_CM`.

---

#### Adım 3: Tool ve Skill Check Hazırlığı
Bu adımda kullanıcının "Skill Check Bonusu" hesaplanacaktır.

**1. Tool Seçimi:**
* Eşya "Spell Scroll" ise sadece **Calligrapher’s Supplies (Dexterity)** seçilebilir.
* Değilse: Smith’s Tools (STR), Woodcarver’s Tools (DEX), Alchemist’s Supplies (INT), Jeweler’s Tools (INT), Weaver’s Tools (DEX), Leatherworker’s Tools (DEX) listelenir.

**2. Hesaplama:**
* Kullanıcı Tool seçer, "Proficiency Var mı?" kutusunu işaretler ve Ability Mod'unu girer.
* "Bonus Hesapla" butonu ile: `Skill_Check_Bonus` = `En Yüksek (Ability Mod + (Varsa User_PB))`.

---

#### Adım 4: Başlatma ve Onay (Locking Mechanism)
Burada kritik bir **"Kurulumu Onayla ve Başla"** butonu olmalıdır.

* **Buton Mantığı:**
    * Tıklandığında Adım 1, 2 ve 3'teki tüm inputlar **kilitlenir**.
    * Buton metni **"Kurulumu Düzenle (Sıfırla)"** olur.
    * **Kural:** Eğer simülasyon başladıysa (yani `Current_WU > 0` ise), "Düzenle" butonuna basıldığında *"Simülasyon devam ediyor, düzenleme yaparsanız ilerlemeniz sıfırlanır. Emin misiniz?"* onayı istenir.
    * Onay verildiğinde aşağıda **"Adım 5: Simülasyon Paneli"** görünür hale gelir.

---

#### Adım 5: Simülasyon Paneli (Work Unit Döngüsü)

**Durum Göstergeleri:**
* **Sayaç:** "Work Unit: [Current_WU] / [Target_WU]"
* **Toplam Puan:** "Mevcut Crafting Modifier (CM) Toplamı: [Grand_Total]" (Başlangıç 0).

**Tur Başına Karar Alanı (Her Tur Değiştirilebilir):**
* **Crafting Yaklaşımı (Approach):** (Select Box).
    | Approach | Check DC | Effect (Success / Failure) |
    |:---|:---:|---:|
    | **Safe & Steady** | DC 10 | **+1 CM** / **-2 CM** |
    | **Ambitious** | DC 15 | **+2 CM** / **-4 CM** |
    | **Masterwork** | DC 20 | **+3 CM** / **-6 CM** |

**Aksiyon:**
* **"Craft! (Zar At)"** Butonu.

**Butona Basıldığında Çalışacak Mantık:**
1.  **Sayaç Artır:** `Current_WU` + 1.
2.  **Approach Check:**
    * `Roll_1` = `d20` + `Skill_Check_Bonus`.
    * Eğer `Roll_1` >= `Approach_DC` ise `Approach_Result` = Success Effect, değilse Failure Effect.
3.  **Event Check (d10):**
    * `Roll_Event` = `d10`.
    * **Tablo:**
        * **1 (Disaster):** -4 CM
        * **2-4 (Setback):** -2 CM
        * **5-8 (Stable):** 0 (No change)
        * **9 (Minor Breakthrough):** +1 CM
        * **10 (Sudden Inspiration):** +2 CM
    * *Değişken:* `Event_CM`.
4.  **Tur Sonucu:**
    * `Unit_Total_CM` = `Material_CM` + `Approach_Result` + `Event_CM`.
5.  **Progress Roll (Ana İlerleme):**
    * `Progress_Roll` = `d20` + `Unit_Total_CM`.
    * `Grand_Total` += `Progress_Roll`.
6.  **Tabloya Yaz:** (Her satırda o turun detaylarını göster).

---

#### Adım 6: Final Sonuç

Eğer `Current_WU` == `Target_WU` olduğunda:
* Simülasyon durur.
* **Final Karşılaştırma:**

    **DURUM A: BAŞARILI**
    * Eğer `Grand_Total` >= `Target_DC`:
        * **Mesaj:** (Yeşil) "Tebrikler! **[Eşya İsmi]** başarıyla üretildi. Toplam Puan: [Grand_Total] (DC: [Target_DC])"

    **DURUM B: BAŞARISIZ**
    * Eğer `Grand_Total` < `Target_DC`:
        * **Mesaj:** (Kırmızı) "Üretim başarısız oldu. Toplam Puan: [Grand_Total] (Gereken: [Target_DC])."
        * **Materyal Geri Dönüşümü (Recycling) Mantığı:**
            Simülasyon başında seçilen `Material_Quality` değerine göre geri kazanılan hammaddeyi hesapla:
            * Eğer **Quality Materials** kullanıldıysa:
                * Çıktı: `[[Eşya İsmi]][Common Materials] Hammaddesi`
            * Eğer **Common Materials** kullanıldıysa:
                * Çıktı: `[[Eşya İsmi]][Poor Materials] Hammaddesi`
            * Eğer **Poor Materials** kullanıldıysa:
                * Çıktı: `"Materyaller tamamen yok oldu."`

* "Simülasyonu Sıfırla" butonu belirir.