### Modül 2: Loot & Ödül Hesaplayıcıları

Bu modül, oyun öncesi loot planlaması ve oyun sonu ödül dağıtımı için iki ayrı hesaplama aracını içerir.

**Arayüz Yapısı:**
Bu modül karmaşık olduğu için sayfa içinde iki sekmeli (Tab) bir yapı kullanılmalıdır:
1.  **Oyun Sonu Hesaplayıcı** (Varsayılan Açık Sekme)
2.  **Loot Planlayıcı** (İkinci Sekme)

---

#### Bölüm A: Oyun Sonu Hesaplayıcı (Ödül Dağıtımı & DM Kazancı)

Bu araç, oyun bittiğinde oyuncuların ve DM'in ne kadar kazandığını hesaplar.

**1. Girdi Alanları:**
* **Oyun Süresi:**
    * Saat (Number Input)
    * Dakika (Number Input)
* **Bulunan Toplam Loot (GP):** Number Input. (Oyun sırasında bulunan tüm eşyaların ve altınların toplam değeri).
* **Oyuncular (Dinamik Liste):**
    * "Oyuncu Ekle" butonu ile yeni satır eklenebilmelidir.
    * Her satırda şu iki bilgi girilmelidir:
        1.  **Oyuncu Seviyesi:** (Number Input, 1-20 arası).
        2.  **DM Puanı:** (Number Input, 1-5 arası).
    * Sayfa açıldığında varsayılan olarak 1 adet boş oyuncu satırı gelmelidir.

**2. Hesaplama Mantığı (Arka Plan):**
"Hesapla" butonuna basıldığında şu adımlar izlenmelidir:

1.  **Süre Yuvarlama:**
    * Dakika >= 30 ise: `Hesaplanan_Saat = Girilen_Saat + 1`
    * Dakika < 30 ise: `Hesaplanan_Saat = Girilen_Saat`
    * *Not:* Bu `Hesaplanan_Saat` değeri formüllerde `Y` olarak anılacaktır.

2.  **DM Puan Ortalaması Hesabı:**
    * Listedeki tüm oyuncuların girdiği "DM Puanı" değerlerini toplayın.
    * Toplamı oyuncu sayısına bölün.
    * Sonucu **Standart Yuvarlama** kuralına göre yuvarlayın (Örn: 3.4 -> 3, 3.5 -> 4).
    * Bu değer `DM_Puan_Ortalaması` olarak kullanılacaktır.

3.  **Max Milestone (MS) Hesabı:**
    * `Max_MS` = `Y / 3` (Tam sayıya yuvarla / floor).
    * *Örnek:* 14 saat -> 4 MS.

4.  **Baz Altın Tablosu:**
    Her oyuncunun seviyesine göre "Baz Altın" değeri şu tablodan çekilir:
    * Lvl 1-2: 150
    * Lvl 3: 200
    * Lvl 4-5: 250
    * Lvl 6: 300
    * Lvl 7: 350
    * Lvl 8: 400
    * Lvl 9-13: 450
    * Lvl 14-15: 500
    * Lvl 16: 600
    * Lvl 17: 700
    * Lvl 18: 3500
    * Lvl 19+: 4000

5.  **Oyuncu Ödülleri Dağıtımı (Performans Oranı Yöntemi):**
    * **Adım A:** Her oyuncu için `Kişisel_Tavan` hesapla: `Baz_Altın * Max_MS`.
    * **Adım B:** `Grup_Toplam_Tavanı` hesapla: Tüm oyuncuların `Kişisel_Tavan` değerlerinin toplamı.
    * **Adım C:** `Performans_Oranı` hesapla: `Bulunan_Toplam_Loot / Grup_Toplam_Tavanı` (Virgülden sonra 4 hane hassasiyet).
    * **Adım D:** Her oyuncu için sonuçları hesapla:
        * `Kazanılan_Altın`: `Kişisel_Tavan * Performans_Oranı` (Tam sayıya yuvarla).
        * `Kazanılan_Milestone`: `Max_MS`.
        * `Kazanılan_Genesis`: `Max_MS / 2`.

    > **Örnek Hesaplama (Oyuncu Dağıtımı):**
    > * **Senaryo:** Lvl 3, Lvl 4, Lvl 4, Lvl 5 oyuncular. Max Milestone: 6. Bulunan Loot: 5634 GP.
    > * **Kişisel Tavanlar:**
    >     * Lvl 3: 200 * 6 = 1200
    >     * Lvl 4: 250 * 6 = 1500
    >     * Lvl 5: 250 * 6 = 1500
    > * **Grup Tavanı:** 1200 + 1500 + 1500 + 1500 = 5700.
    > * **Performans Oranı:** 5634 / 5700 = **0.9884**
    > * **Sonuçlar:**
    >     * Lvl 3 Oyuncu: 1200 * 0.9884 = **1186 GP**
    >     * Lvl 4/5 Oyuncular: 1500 * 0.9884 = **1483 GP**

6.  **DM Ödülleri Hesabı:**
    * **Çarpan Faktörü:** `Faktör` = `Y / 3` (Yukarı yuvarla / ceiling).
    * **X Değeri (Kişi Başı Ortalama):**
        * `X_Altın` = `Bulunan_Toplam_Loot / Oyuncu_Sayısı`.
        * `X_Milestone` = `Max_MS` (Oyuncunun kazandığı milestone).
    * **DM Kazançları:**
        * `DM_Altın`: `X_Altın * Faktör` (Yukarı yuvarla).
        * `DM_Milestone`: `X_Milestone * Faktör`.
        * `DM_Genesis`: `DM_Puan_Ortalaması + Faktör` (Yukarı yuvarla).
    * **Kısıtlama:** Eğer `Y` (Yuvarlanmış Saat) < 3 ise, DM Genesis kazancı 0 olmalıdır.

    > **Örnek Hesaplama (DM Ödülleri):**
    > * **Senaryo:** Süre 15 Saat (Y=15). Toplam Loot: 5634. Oyuncu Sayısı: 4. DM Puanları: 4, 5, 3, 4.
    > * **Faktör:** 15 / 3 = **5**.
    > * **DM Puan Ortalaması:** (4+5+3+4)/4 = 4.
    > * **X Değerleri:**
    >     * X_Altın = 5634 / 4 = 1408.5
    >     * X_Milestone (Max MS) = 15 / 3 = 5.
    > * **Sonuçlar:**
    >     * **DM Altın:** 1408.5 * 5 = 7042.5 -> **7043 GP** (Yukarı Yuvarla).
    >     * **DM Milestone:** 5 (X_MS) * 5 (Faktör) = **25 MS**.
    >     * **DM Genesis:** 4 (Puan) + 5 (Faktör) = **9 GT**.

**3. Çıktı Alanı:**
Sonuçları temiz bir tablo veya kartlar halinde göster:

* **Genel Özet:**
    * Yuvarlanmış Süre: [Y] Saat
    * Max Milestone: [Max_MS]
    * DM Puan Ortalaması: [DM_Puan_Ortalaması]
    * Grup Performans Oranı: %[Performans_Oranı * 100]

* **Oyuncu Listesi Sonuçları:**
    * [Seviye]. Lvl Oyuncu (Puan: [Girilen_Puan]) -> **[Kazanılan_Altın] GP** | **[Kazanılan_Milestone] MS** | **[Kazanılan_Genesis] GP**

* **DM Ödülleri:**
    * Altın: **[DM_Altın] GP**
    * Milestone: **[DM_Milestone] MS**
    * Genesis Token: **[DM_Genesis] GT** *(Eğer süre yetersizse "0 (Min 3 Saat Gerekli)" yaz)*.

---

#### Bölüm B: Loot Planlayıcı (Oyun Öncesi)

Bu araç, DM'in oyun içine saklaması gereken ("Serpiştirilmesi Gereken") toplam hazine değerini hesaplar.

**1. Girdi Alanları:**
* **Planlanan Süre (Saat):** Number Input. Bu kısıma "Campaign'in sürmesini planladığınız maksimum süreyi (saat olarak) girin." böyle küçük bir bilgilendirme text'i ekle.
* **Oyuncular:**
    * Dinamik liste ("Oyuncu Ekle" butonu).
    * Her satırda: "Oyuncu Seviyesi" (Number Input).
    * *Not:* Bu bölümde DM Puanı girdisine gerek yoktur.

**2. Hesaplama Mantığı:**
1.  `Planlanan_MS` = `Planlanan_Süre / 3` (Tam sayıya yuvarla / floor).
2.  Her oyuncu için `Baz_Altın` değerini yukarıdaki tablodan (Bölüm A'daki tablo) çek.
3.  `Gereken_Toplam_Loot` = Tüm oyuncular için `(Baz_Altın * Planlanan_MS)` değerlerinin toplamı.

    > **Örnek Hesaplama:**
    > * **Senaryo:** Toplam 20 Saat (4 session x 5 saat). Oyuncular: Lvl 3, Lvl 4, Lvl 4, Lvl 5.
    > * **Planlanan MS:** 20 / 3 = **6 Milestone**.
    > * **Baz Altınlar:**
    >     * Lvl 3 -> 200 GP
    >     * Lvl 4 -> 250 GP
    >     * Lvl 5 -> 250 GP
    > * **Toplam Loot:** `(200*6) + (250*6) + (250*6) + (250*6)`
    > * **İşlem:** `1200 + 1500 + 1500 + 1500` = **5700 GP**.

**3. Çıktı Alanı:**
* Büyük puntolarla: "Bu oyuna serpiştirmeniz gereken toplam loot değeri: **[SONUÇ] GP**"
* Çıktı altına, kullanıcıyı uyarmak için şu iki uyarıyı ekle:
    * **NOT:** Campaign sonunda toplam altın ödülüne dahil edilmesini istediğiniz loot'ların yanına parantez içinde GP değerlerini yazmayı ("Diamonda (300 GP)" gibi) ihmal etmeyin.
    * **NOT:** Campaign'de elde edilebilecek bütün loot'ları toplam altın ödülüne dahil etmek zorunda değilsiniz. Örneğin, campaign'de kullanılması gereken bir magic item var ama campaign sonu toplam altın ödülüne dahil etmek istemiyorsunuz diyelim. Bu durumda, bu item'ı toplam altın ödülüne dahil etmeyin (evet bu kadar basit). Oyunculara bu item'ı verirken ismine GP değerini yazmayın ("Diamond" gibi). Bu sayede bu item'ın toplam altın ödülüne dahil olmadığını belirtmiş olursunuz.