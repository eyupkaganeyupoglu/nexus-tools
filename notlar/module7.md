### Modül 7: DM Puanlama Mesaj Şablonu

Bu modül, oyuncuların katıldıkları bir oyunun sonunda DM'i (Oyun Yöneticisini) puanlamaları için gereken standart mesaj şablonunu oluşturur.

**1. Arayüz ve Girdi Alanları:**

* **Campaign İsmi:** (Text Input).
    * *Placeholder:* "Örn: Haydutlardan Rehine Kurtarma"
* **Yorum:** (Textarea - Opsiyonel).
    * *Placeholder:* "Campaign ve DM ile ilgili görüşleriniz..."
* **Puan:** (Select veya Number Input).
    * Değer Aralığı: 1 - 5.
    * Varsayılan: Boş veya 5.

**2. UX ve Onay Mekanizması:**
* Formun altında **"Onaylıyorum"** butonu olmalıdır.
* Butona basıldığında inputlar kilitlenmeli (disabled) ve buton **"Geri Al / Düzenle"** şekline dönüşmelidir.
* "Campaign İsmi" ve "Puan" doldurulmadan onay verilememelidir.

**3. Çıktı Formatı:**
"Şablonu Oluştur" butonuna basıldığında aşağıdaki Markdown formatında metin üretilmelidir:

```markdown
**Campaign:** [GİRİLEN_CAMPAIGN_İSMİ]
**Yorum:** [GİRİLEN_YORUM]
**Puan:** [GİRİLEN_PUAN]
```