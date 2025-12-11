### Modül 6: Pazar İlan Şablonu

Bu modül, kullanıcıların `marketData` listesinden seçim yaparak standart bir satış ilanı oluşturmasını sağlar.

**1. Veri Kaynağı (Hardcoded Data):**
`data.js` dosyasında `marketData` adında sabit bir liste (Array of Objects) tanımlanmalıdır.

* **Veri Yapısı:**
    ```javascript
    const marketData = [
        { name: "Adamantine Armor", link: "[https://www.dndbeyond.com/search?q=Adamantine%20Armor](https://www.dndbeyond.com/search?q=Adamantine%20Armor)", price: 500.0 }, // Fiyatlar örnek
        { name: "Alchemy Jug", link: "[https://www.dndbeyond.com/search?q=Alchemy%20Jug](https://www.dndbeyond.com/search?q=Alchemy%20Jug)", price: 500.0 },
        // ... (Geliştirici buraya 5-10 örnek veri eklemeli) ...
    ];
    ```

API'lerle falan uğraşmamak için `data.js` dosyasını sanki bir dataset'miş gibi kullanacağız.

**2. Arayüz ve Girdi Alanları:**

* **Eşya Arama (Autocomplete):**
    * Debounce (500ms) süreli arama inputu.
    * **Seçim İşlemi:** Kullanıcı listeden bir eşya seçtiğinde:
        1.  **Item Input:** Eşyanın `name` değeri yazılmalı.
        2.  **Fiyat Input:** Eşyanın `price` (Orijinal Fiyat) değeri otomatik doldurulmalı (Kullanıcı isterse bunu değiştirebilir, burası satış fiyatıdır).
        3.  **Gizli Veriler:** Arka planda, çıktı oluştururken kullanılmak üzere eşyanın `link` ve `price` (Orijinal Fiyat) verileri saklanmalıdır.

* **Satıcı:** (Text Input).
* **Fiyat (Satış Fiyatı):** (Number Input). Kullanıcının belirlediği satış fiyatıdır.
* **Ek Bilgiler:** (Textarea).

**3. Çıktı Formatı (Özel Link Formatı):**
"Şablonu Oluştur" butonuna basıldığında oluşturulacak metinde `Link:` satırı özel bir formata sahip olmalıdır:

* **Link Satırı Formatı:** `[Item Adı](Item Linki), {Orijinal Fiyat} GP`
    * *Örnek:* `[Adamantine Armor](https://...Armor), 500 GP`

* **Nihai Çıktı:**
```markdown
**Eşya:** [SEÇİLEN_ITEM_İSMİ]
**Satıcı:** [GİRİLEN_SATICI_İSMİ]
**Ek Bilgiler:** [GİRİLEN_EK_BİLGİLER]
**Fiyat:** [GİRİLEN_SATIŞ_FİYATI] GP
**Link:** [[SEÇİLEN_ITEM_İSMİ]]([SAKLANAN_LINK]), [SAKLANAN_ORİJİNAL_FİYAT] GP
```