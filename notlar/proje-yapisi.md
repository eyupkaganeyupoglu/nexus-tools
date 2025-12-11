### Proje Genel Yapısı ve Tasarım Yönergesi

Bu proje, "Nexus" Discord sunucusu için geliştirilmiş, GitHub Pages üzerinde barındırılacak, istemci taraflı (client-side) çalışan bir web araçları setidir.

**1. Teknoloji Yığını (Stack):**
* **Hosting:** GitHub Pages (Statik Site).
* **Temel:** HTML5, CSS3, JavaScript (ES6+).
* **CSS Framework:** Bootstrap 5 (CDN üzerinden).
* **İkonlar:** FontAwesome (CDN üzerinden).
* **Veri Yönetimi:** `data.js` (Harici JSON benzeri veri dosyası) ve LocalStorage (opsiyonel, kullanıcı tercihlerini hatırlamak için).
* **Yönlendirme (Routing):** Basit, klasör tabanlı yapı (Her modül kendi `index.html` dosyasına sahip olacak).

**2. Sayfa Hiyerarşisi ve URL Yapısı:**
Her aracın doğrudan paylaşılabilir bir URL'si olması kritik önem taşır.

* **Ana Sayfa (Home):** `index.html` (Örn: `kullanici.github.io/nexus-tools/`)
* **Modül 1 (Campaign İlan):** `/campaign-ilan/index.html`
* **Modül 2 (Loot Hesaplayıcı):** `/loot-hesaplayici/index.html`
* **Modül 3 (Avatar Bütçe):** `/avatar-butce/index.html`
* **Modül 4 (Level Atlama):** `/level-atlama/index.html`
* **Modül 5 (Avatar Paylaşım):** `/avatar-paylasim/index.html`
* **Modül 6 (Pazar İlan):** `/pazar-ilan/index.html`
* **Modül 7 (DM Puanlama):** `/dm-puanlama/index.html`
* **Modül 8 (Mezar Taşı):** `/mezar-tasi/index.html`
* **Modül 9 (Kural Öneri):** `/kural-oneri/index.html`
* **Modül 10 (Crafting):** `/crafting/index.html`

**3. Görsel Tasarım Dili (UI/UX):**
* **Tema:** "Dark Mode" (Koyu Tema) varsayılan olmalıdır. Discord'un renk paletiyle uyumlu, göz yormayan koyu gri tonları kullanılmalıdır.
    * *Arka Plan:* `#2f3136` veya `#36393f`
    * *Kartlar/Kutular:* `#202225`
    * *Yazı Rengi:* `#dcddde` (Tam beyaz değil, kırık beyaz)
    * *Vurgu Rengi (Accent):* `#5865f2` (Discord Mavisi) veya yumuşak bir Altın Sarısı (D&D teması için).
* **Sadeli̇k:** Karmaşadan uzak, sadece işlevin ön planda olduğu "Kart" (Card) tabanlı tasarım. Her araç, ortalanmış şık bir kart içinde sunulmalı.
* **Tipografi:** Okunaklı, modern sans-serif fontlar (Örn: 'Roboto', 'Inter' veya 'Open Sans').

**4. Sayfa Düzeni (Layout):**

**A. Ana Sayfa (Home):**
* **Header:** "Nexus Araçları" logosu/yazısı ve belki küçük bir sunucu ikonu.
* **Hero Section:** "Hoş Geldiniz" mesajı ve sitenin amacını anlatan 1-2 cümle.
* **Araçlar Izgarası (Grid):** Tüm modüllerin listelendiği, 3 veya 4 kolonlu bir ızgara yapısı.
    * **Kart İçeriği:** İkon (FontAwesome), Modül İsmi, "Ne işe yarar?" (1 cümlelik kısa açıklama) ve "Git" butonu.

**B. Modül Sayfaları (Tool Pages):**
* **Navigasyon:** En üstte, her zaman "Ana Sayfaya Dön" linki veya ikonu bulunmalı.
* **Başlık ve Açıklama (Intro):**
    * Sayfanın başında, aracın ne işe yaradığını ve nasıl kullanılacağını anlatan **kısa, açıklayıcı bir metin** yer almalı.
    * *Örnek:* "Bu araç, oyun sonunda elde edilen ganimetleri ve DM ödüllerini hesaplamanıza yardımcı olur. Lütfen süreyi ve oyuncu bilgilerini girin."
* **Araç Kartı:** Açıklama metninin hemen altında, asıl form ve hesaplama araçlarının bulunduğu ana kapsayıcı (container).
* **Footer:** Telif hakkı veya yapımcı bilgisi (sade).

**5. Ortak Bileşenler (Components):**
* **Sonuç Kutuları:** Hesaplama sonuçları veya oluşturulan şablon metinleri, kullanıcının kolayca kopyalayabilmesi için yanında "Kopyala" butonu olan özel kutularda (textarea veya code block) gösterilmeli.
* **Alert/Uyarılar:** Hatalar (kırmızı) ve Bilgilendirmeler (mavi/sarı) Bootstrap Alert bileşenleri kullanılarak, göze çarpan ama rahatsız etmeyen şekilde sunulmalı.