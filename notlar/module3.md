### Modül 3: Avatar Başlangıç Bütçesi Hesaplayıcı

Bu modül, yeni oluşturulan yüksek seviyeli karakterlerin başlangıçta ne kadar altına (GP) sahip olması gerektiğini hesaplar. Oyuncuların en çok karıştırdığı "Kümülatif Toplama" (Önceki seviyelerin ödüllerini de alma) işlemini otomatik yapar.

**1. Arayüz ve Girdi Alanı:**
Basit ve odaklanmış bir kart tasarımı kullanılmalıdır.

* **Hedef Seviye:** (Select/Dropdown Menü).
    * Seçenekler: "Level 1"den "Level 20"ye kadar.
    * Varsayılan: Level 1.

**2. Hesaplama Mantığı (Kümülatif Toplam):**
Kullanıcı bir seviye seçtiğinde, **Level 2'den başlayarak** seçilen seviyeye kadar olan tüm ödüller toplanmalıdır.

* **Ödül Tablosu (Referans):**
    * Level 1: 0
    * Level 2: 100
    * Level 3: 200
    * Level 4: 300
    * Level 5: 400
    * Level 6: 500
    * Level 7: 600
    * Level 8: 700
    * Level 9: 800
    * Level 10: 900
    * Level 11: 1000
    * Level 12: 1150
    * Level 13: 1250
    * Level 14: 1350
    * Level 15: 1500
    * Level 16: 1600
    * Level 17: 1800
    * Level 18: 2000
    * Level 19: 2200
    * Level 20: 2400

* **Algoritma:**
    * `Toplam_Bütçe = 0`
    * Döngü: `i = 2` den `Seçilen_Seviye` ye kadar:
        * `Toplam_Bütçe += Ödül_Tablosu[i]`

    > **Örnek Hesaplama:**
    > * Kullanıcı **Level 3** seçerse:
    > * Level 2 (100) + Level 3 (200) = **300 GP**.
    > * Kullanıcı **Level 1** seçerse: **0 GP**.

**3. Çıktı ve Uyarılar:**
Sonuç, anlık olarak (butona basmaya gerek kalmadan, seçim değişince) güncellenmelidir.

* **Sonuç Gösterimi:**
    * Büyük puntolarla: "Başlangıç Bütçeniz: **[Toplam_Bütçe] GP**"
    * Altına açıklayıcı küçük metin: *"Bu miktar, önceki seviyelerin hak edişlerinin toplanmasıyla elde edilmiştir."*

* **Onay Uyarısı (Koşullu):**
    * Eğer seçilen seviye **6 veya daha yüksekse (>= 6)**, sonucun hemen altında dikkat çekici bir uyarı kutusu (Warning Alert) çıkmalıdır:
    * *"Dikkat: Level 6 ve üzeri başlangıçlar için ADMİN'den özel onay almalısınız."*