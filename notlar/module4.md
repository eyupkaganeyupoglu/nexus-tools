### Modül 4: Seviye Atlama (Milestone) Hesaplayıcı

Bu modül, oyuncuların karakterlerini mevcut seviyeden hedef seviyeye çıkarmak için kaç "Milestone" veya "Epic Milestone" toplamaları gerektiğini hesaplar.

**1. Arayüz ve Girdi Alanları:**
Yan yana veya alt alta 2 adet Slider (veya Range Input) kullanılmalıdır:
* **Mevcut Seviye (Başlangıç):** (Min: 1, Max: 19).
* **Hedef Seviye (Bitiş):** (Min: 2, Max: 20).
* *Kısıtlama:* Hedef Seviye, Mevcut Seviye'den her zaman büyük olmalıdır. Slider'lar birbirini itmeli veya kod otomatik düzeltmelidir.

**2. Veri Yapısı ve Kurallar:**
Hesaplama için aşağıdaki tabloyu referans al:

* **Standart Milestone Maliyetleri:**
    * 1->2: 1 MS
    * 2->3: 2 MS
    * 3->4: 2 MS
    * 4->5: 2 MS
    * 5->6: 3 MS
    * 6->7: 3 MS
    * 7->8: 3 MS
    * 8->9: 3 MS
    * 9->10: 3 MS
    * 10->11: 4 MS
    * 11->12: 4 MS
    * 12->13: 4 MS
    * 13->14: 4 MS
    * 14->15: 4 MS

* **Esnek (Hybrid) Geçişler (MS veya Epic MS):**
    * 15->16: 4 MS *veya* 1 Epic MS
    * 16->17: 4 MS *veya* 1 Epic MS
    * 17->18: 4 MS *veya* 1 Epic MS

* **Sadece Epic Milestone Gerektirenler:**
    * 18->19: 1 Epic MS
    * 19->20: 2 Epic MS

**3. Hesaplama Algoritması:**
Kullanıcı aralığı değiştirdiğinde (Örn: 14 -> 17) döngü şu şekilde çalışmalıdır:

1.  `Toplam_Standart_MS = 0`
2.  `Toplam_Zorunlu_Epic_MS = 0`
3.  `Esnek_Gecisler = []` (Liste)
4.  **Döngü:** `i` değeri `Mevcut_Seviye`den `Hedef_Seviye - 1`'e kadar:
    * Eğer geçiş **Standart** ise (1->15 arası): Maliyeti `Toplam_Standart_MS`'e ekle.
    * Eğer geçiş **Esnek** ise (15->16, 16->17, 17->18):
        * Varsayılan olarak maliyeti (4 MS) `Toplam_Standart_MS`'e ekle.
        * Bu geçişi `Esnek_Gecisler` listesine kaydet (Örn: "15->16").
    * Eğer geçiş **Sadece Epic** ise (18->20):
        * Maliyeti `Toplam_Zorunlu_Epic_MS`'e ekle.

**4. Çıktı ve Mesaj Gösterimi:**

Sonuç alanı iki parçadan oluşmalıdır:

* **Ana Sonuç (Büyük Punto):**
    * Eğer `Toplam_Zorunlu_Epic_MS` > 0 ise:
        `"Gereken: [Toplam_Standart_MS] Milestone + [Toplam_Zorunlu_Epic_MS] Epic Milestone"`
    * Eğer sadece standart varsa:
        `"Gereken: [Toplam_Standart_MS] Milestone"`

* **Alternatif Yol Bilgi Notu (Info Message):**
    * Eğer `Esnek_Gecisler` listesi boş değilse, ana sonucun altına şu formatta bir uyarı/bilgi kutusu çıkar:
    * *"İpucu: Bu aralıkta bulunan [Esnek_Gecisler Listesi] seviye geçişleri için toplam [Esnek_Gecis_Sayisi * 4] Milestone yerine [Esnek_Gecis_Sayisi] Epic Milestone kullanmayı tercih edebilirsiniz."*

    > **Örnek Senaryo 1 (12 -> 15):**
    > * Hesap: (12->13: 4) + (13->14: 4) + (14->15: 4) = 12 MS.
    > * Esnek Geçiş: Yok.
    > * **Çıktı:** "Gereken: 12 Milestone"

    > **Örnek Senaryo 2 (14 -> 17):**
    > * Hesap: (14->15: 4) + (15->16: 4 [Esnek]) + (16->17: 4 [Esnek]).
    > * Toplam Standart: 12 MS.
    > * Esnek Listesi: 15->16, 16->17.
    > * **Çıktı:** "Gereken: 12 Milestone"
    > * **İpucu:** *"İpucu: 15->16 ve 16->17 geçişleri için toplam 8 Milestone yerine 2 Epic Milestone kullanabilirsiniz."*

    > **Örnek Senaryo 3 (17 -> 20):**
    > * Hesap: (17->18: 4 [Esnek]) + (18->19: 1 Epic [Zorunlu]) + (19->20: 2 Epic [Zorunlu]).
    > * **Çıktı:** "Gereken: 4 Milestone + 3 Epic Milestone"
    > * **İpucu:** *"İpucu: 17->18 geçişi için 4 Milestone yerine 1 Epic Milestone kullanabilirsiniz."*