### Modül 8: Mezar Taşı Oluşturucu

Bu modül, ölen karakterler (veya emekliye ayrılanlar) için "Mezarlık" kanalında paylaşılacak standart mesaj şablonunu oluşturur.

**1. Arayüz ve Girdi Alanları:**

* **Avatarın Adı:** (Text Input).
* **Ölüm Sebebi:** (Text Input veya Textarea).
    * *Placeholder / İpucu:* "Ölüm sebebini yazın. Eğer karakteri sadece bırakıyorsanız 'Bırakıyorum.' yazmanız yeterlidir."
* **Ölüm Tarihi:** (Date Input).
    * *Biçim:* Kullanıcı tarih seçtiğinde çıktı "Gün.Ay.Yıl" (DD.MM.YYYY) formatında olmalıdır.

**2. UX ve Onay Mekanizması:**
* Formun altında **"Onaylıyorum"** butonu olmalıdır.
* Butona basıldığında inputlar kilitlenmeli (disabled) ve buton **"Geri Al / Düzenle"** şekline dönüşmelidir.
* Tüm alanlar doldurulmadan onay verilememelidir.

**3. Çıktı Formatı:**
"Şablonu Oluştur" butonuna basıldığında aşağıdaki Markdown formatında (Blockquote içinde) metin üretilmelidir:

```markdown
**Avatarın Adı:** [GİRİLEN_İSİM]
**Ölüm Sebebi:** [GİRİLEN_SEBEP]
**Ölüm Tarihi:** [GİRİLEN_TARİH_DD.MM.YYYY]
```