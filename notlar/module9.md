### Modül 9: Kural Öneri Formu

Bu modül, DM'lerin sunucu kuralları üzerinde değişiklik, silme veya ekleme önerisi yaparken kullanacakları standart şablonları oluşturur.

**1. Arayüz ve Dinamik Yapı:**

Sayfanın başında kullanıcının ne yapmak istediğini soran bir seçim aracı (Radio Button veya Toggle) olmalıdır:
* **Seçenek A:** Yeni Kural Ekle
* **Seçenek B:** Mevcut Kuralı Sil / Değiştir

**Durum A: "Yeni Kural Ekle" Seçiliyse Gösterilecek Alanlar:**
* **Kural İsmi:** (Text Input).
* **Eklenecek Kuralın İçeriği (Ekle):** (Textarea).
* **Sebep:** (Textarea).

**Durum B: "Mevcut Kuralı Sil / Değiştir" Seçiliyse Gösterilecek Alanlar:**
* **Kural ID'si:** (Text Input). *Placeholder: P-X*
* **İşlem Türü (Sorun):** (Radio Button veya Select).
    * Seçenekler: "Sil", "Değiştir".
* **Sebep:** (Textarea).
* **Değişiklik (Yeni Hal):** (Textarea).
    * *Görünürlük Mantığı:* Bu alan sadece İşlem Türü **"Değiştir"** seçildiğinde görünür veya aktif olur. **"Sil"** seçildiğinde gizlenmeli veya devre dışı bırakılmalıdır.

**2. UX ve Onay Mekanizması:**
* Seçilen forma ait alanların altında **"Onaylıyorum"** butonu olmalıdır.
* Butona basıldığında inputlar kilitlenmeli ve buton **"Geri Al / Düzenle"** şekline dönüşmelidir.
* Gerekli alanlar doldurulmadan onay verilememelidir.

**3. Çıktı Formatı:**
"Şablonu Oluştur" butonuna basıldığında, aktif olan moda göre aşağıdaki uygun formatı üret:

**Eğer Mod "Yeni Kural Ekle" ise:**
```markdown
**Kural İsmi:** [GİRİLEN_KURAL_İSMİ]
**Sorun:** Ekle
**Ekle:** [GİRİLEN_KURAL_İÇERİĞİ]
**Sebep:** [GİRİLEN_SEBEP]
```