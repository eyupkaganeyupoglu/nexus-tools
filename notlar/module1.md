### Modül 1: Campaign İlan Şablonu Oluşturucu

Bu modül, kullanıcıların kampanya ilanlarını standartlaştırmasını sağlar.

**1. Arayüz ve Girdi Alanları:**
Sayfanın en üstünde, aşağıda belirtilen "Tecrübe Tanımları"nı içeren bir bilgilendirme kutusu (Info Alert) yer almalıdır. Altında ise şu form elemanları bulunmalıdır:

* **Campaign Başlığı:** Text Input.
* **Campaign Lokasyonu:** Text Input.
* **Campaign Açıklaması:** Textarea.
* **Oyuncu Tecrübesi:** Çoklu seçim (Checkbox veya Multi-select).
    * Seçenekler: 0/5, 1/5, 2/5, 3/5, 4/5, 5/5.
    * Çıktı Karşılıkları (ID'ler):
        * 0/5: `<@&1438075037566636123>`
        * 1/5: `<@&1438075175319896085>`
        * 2/5: `<@&1438075199793926144>`
        * 3/5: `<@&1438075216524742696>`
        * 4/5: `<@&1438075235416014848>`
        * 5/5: `<@&1438075253468299264>`
* **Tavsiye Edilen Seviye:** Yan yana iki slider (Min ve Max).
    * Mantık: Eğer Min = Max ise çıktı tek sayı (Örn: "3. Seviye"). Farklıysa aralık (Örn: "3-5. Seviye").
    * Anlık değer slider'ın yanında yazmalı.
* **Avatar Sayısı:** Number Input (Min: 1, Max: 10).
* **Campaign Uzunluğu (Session):** Yan yana iki slider (Min ve Max).
    * Mantık: Min = Max ise "Tek Session" veya "X Session", farklıysa "X-Y Session".
    * Anlık değer slider'ın yanında yazmalı.
* **Campaign Uzunluğu (Saat):** Yan yana iki slider (Min ve Max).
    * Mantık: Min = Max ise "X Saat", farklıysa "X-Y Saat".
    * Anlık değer slider'ın yanında yazmalı.
* **Campaign Günü:** Text Input. (Opsiyonel).
* **Diğer Bilgiler:** Textarea.

**2. UX ve Onay Mekanizması:**
* Her girdi grubunun (veya mantıksal bölümün) altında bir **"Onaylıyorum"** butonu olmalıdır.
* Kullanıcı veriyi girdikten sonra bu butona basmak zorundadır.
* Butona basıldığında ilgili inputlar "Disabled" (değiştirilemez) moda geçmeli ve butonun görünümü değişerek **"Geri Al / Düzenle"** fonksiyonuna dönüşmelidir.
* "Campaign Günü" hariç tüm alanlar zorunludur.
* Kullanıcı tüm zorunlu alanları "Onaylamadan", sonuç üretme butonu aktif olmamalıdır. Eğer onaylanmamış alan varken basarsa uyarı vermelidir.

**3. Çıktı Formatı:**
Tüm onaylar tamamlandığında "Şablonu Oluştur" butonu ile aşağıdaki formatta kopyalanabilir bir metin üretilmelidir:

```markdown
**Campaign Başlığı:** [GİRİLEN BAŞLIK]
**Campaign Lokasyonu:** [GİRİLEN LOKASYON]
**Campaign Açıklaması:** [GİRİLEN AÇIKLAMA]
**Oyuncu Tecrübesi:** [SEÇİLEN ROLLERİN ETİKETLERİ YAN YANA] etiketleri ile ifade edilen, campaign'in bu etikette belirtilen tecrübe seviyesi için uygunluğu bilgisi.
**Tavsiye Edilen Seviye ve Avatar Sayısı:** [SEVİYE ARALIĞI LOGIC ÇIKTISI] seviye, [AVATAR SAYISI] avatar.
**Campaign Uzunluğu:** [SESSION ARALIĞI LOGIC ÇIKTISI] session, [SAAT ARALIĞI LOGIC ÇIKTISI] saat.
**Campaign Günü:** [EĞER BOŞSA "Anket Açılacak" YAZACAK, DOLUYSA GİRİLEN DEĞER]
**Diğer Bilgiler:** [GİRİLEN DİĞER BİLGİLER]
```

**4. Bilgilendirme Metinleri (Info Section): En üstte yer alacak tanımlar:**
- @Tecrübe: 0/5 : Kelimenin tam anlamıyla D&D ile ilk kez tanışmış, daha önce oyun oynamamış/oynatmamış, kitapları okumamış kişilerdir. Kitapları okumaları tavsiye edilir.
- @Tecrübe: 1/5 : Daha önce oyun oynamamış/oynatmamış ama kitapları okumuş kişilerdir.
- @Tecrübe: 2/5 : Daha önce oyun oynamış ama oynatmamış ve kitapları okumuş kişilerdir.
- @Tecrübe: 3/5 : Daha önce oyun oynamış, oynatmış ve kitapları okumuş kişilerdir. Kelimenin tam anlamıyla ortalama D&D oyuncusunu temsil eder.
- @Tecrübe: 4/5 : Daha önce birçok kez oyun oynamış, oynatmış ve kitapları okumuş kişilerdir. DM olmak için uygun kişilerdir.
- @Tecrübe: 5/5 : D&D ile ilgili her şeyi yalayıp yutmuş kişilerdir. Gözün kapalı güvenebilirsin.