### Modül 5: Avatar Paylaşım Şablonu

Bu modül, oyuncuların yeni oluşturdukları karakterleri forumda paylaşmaları için gereken standart şablonu oluşturur.

**1. Arayüz ve Girdi Alanları:**
Form 3 ana bölüme ayrılmalıdır:

**Bölüm A: Başlık Bilgileri (Sınıf ve Irk Yapılandırması)**

* **Multiclass (Çoklu Sınıf) Durumu:** (Toggle Switch veya Checkbox).
    * Etiket: "Multiclass var mı?"
    * Varsayılan: Kapalı (Hayır).

* **Sınıf Sayısı:** (Number Input).
    * *Görünürlük:* Sadece "Multiclass" açıkken görünür.
    * Değer Aralığı: Min 2, Max 5. Default 2

* **Sınıf Giriş Alanları (Dinamik):**
    * Eğer Multiclass **KAPALI** ise: Sadece 1 adet sınıf giriş grubu göster.
    * Eğer Multiclass **AÇIK** ise: "Sınıf Sayısı" kadar alt alta sınıf giriş grubu oluştur.
    * **Her Grup İçeriği:**
        1.  **Level:** (Number Input).
        2.  **Subclass (Varsa):** (Text Input - Opsiyonel).
        3.  **Class İsmi:** (Text Input).

* **Species (Irk):** (Text Input). *Bu alan sınıf sayısından bağımsız olarak en altta tek bir tane olmalıdır.*

**Bölüm B: Mesaj İçeriği**
* **Avatarın İsmi:** (Text Input).
* **Avatar Hikayesi (Backstory):** (Textarea).
* **Oyuncu Hakkında:** (Textarea).

**Bölüm C: Etiketler (Class Selection)**
* **Sınıflar:** (Checkbox Grubu veya Multi-Select).
* Seçenekler:
    * Barbarian, Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard, Artificer.

**2. UX ve Onay Mekanizması:**
* Bölüm A, Bölüm B ve Bölüm C bölümlerinin her birinin altında ayrı ayrı bir **"Onaylıyorum"** butonu olmalıdır.
* Kullanıcı verileri girdikten sonra bu butona basmak zorundadır.
* Butona basıldığında inputlar kilitlenmeli (disabled) ve buton **"Geri Al / Düzenle"** şekline dönüşmelidir.
* Onay verilmeden çıktı üretilmemelidir.

**3. Çıktı Formatı (Template Logic):**
"Şablonu Oluştur" butonuna basıldığında aşağıdaki mantığa göre başlık oluşturulmalıdır:

* **Başlık Oluşturma Mantığı:**
    1.  Her sınıf grubu için kendi string'ini oluştur:
        * Eğer Subclass doluysa: `[Level] [Subclass] [Class]`
        * Eğer Subclass boşsa: `[Level] [Class]`
    2.  Tüm sınıf stringlerini aralarına ` , ` (boşluk, virgül, boşluk) koyarak birleştir.
    3.  En sona ` , [Species]` ekle.

    > **Örnek (Tek Sınıf):** `3 Battle Master Fighter , Human`
    > **Örnek (Multiclass):** `3 Battle Master Fighter , 3 Diviner Wizard , Human`

**4. Çıktı Metni:**
Aşağıdaki Markdown formatında kopyalanabilir bir sonuç ver:

```markdown
**BAŞLIK:** [OLUŞTURULAN_BAŞLIK_FORMATI]
**MESAJ:**
- **[AVATAR_İSMİ]**
- [AVATAR_HİKAYESİ]
- [OYUNCU_HAKKINDA]
```
Bunu markdown çıktısından hemen sonra belirt: "**ETİKETLER:** [SEÇİLEN_SINIFLAR_YAN_YANA]"