# Skill: Yeni HTML Sayfası Oluşturma

> Bu skill, CalmKernel web sitesine yeni bir HTML sayfası eklerken izlenmesi gereken
> adımları ve kontrol listesini içerir.

---

## Ön Koşullar

- `AGENTS.md` dosyasını oku (dokunulmaz dosyalar, override stratejisi).
- Mevcut bir sayfayı referans olarak aç (örn. `tools.html` veya `premium.html`).

---

## Adımlar

### 1. Dosyayı Oluştur

1. TR versiyonunu root dizinde oluştur: `/yeni-sayfa.html`
2. EN versiyonunu `/en/yeni-sayfa.html` olarak oluştur.
3. Dosya adı küçük harf, tire ile ayrılmış olmalı (kebab-case).

### 2. Head Bölümü (Zorunlu Meta Etiketler)

Aşağıdaki tüm etiketler **her sayfada zorunludur**:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[SAYFA BAŞLIĞI] - CalmKernel</title>
    <meta name="description" content="[SAYFA AÇIKLAMASI — max 160 karakter]">
    <link rel="canonical" href="https://calmkernel.tr/[yeni-sayfa.html]">

    <!-- Hreflang — üç satır zorunlu -->
    <link rel="alternate" hreflang="tr" href="https://calmkernel.tr/[yeni-sayfa.html]">
    <link rel="alternate" hreflang="en" href="https://calmkernel.tr/en/[yeni-sayfa.html]">
    <link rel="alternate" hreflang="x-default" href="https://calmkernel.tr/[yeni-sayfa.html]">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://calmkernel.tr/[yeni-sayfa.html]">
    <meta property="og:title" content="[SAYFA BAŞLIĞI] - CalmKernel">
    <meta property="og:description" content="[AÇIKLAMA]">
    <meta property="og:image" content="https://calmkernel.tr/assets/images/og-preview.png">
    <meta property="og:locale" content="tr_TR">
    <meta property="og:site_name" content="CalmKernel">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="[SAYFA BAŞLIĞI] - CalmKernel">
    <meta name="twitter:description" content="[AÇIKLAMA]">
    <meta name="twitter:image" content="https://calmkernel.tr/assets/images/og-preview.png">

    <!-- JSON-LD -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "[SAYFA BAŞLIĞI]",
        "description": "[AÇIKLAMA]",
        "url": "https://calmkernel.tr/[yeni-sayfa.html]",
        "inLanguage": "tr",
        "publisher": {
            "@type": "Organization",
            "name": "CalmKernel",
            "url": "https://calmkernel.tr",
            "logo": {
                "@type": "ImageObject",
                "url": "https://calmkernel.tr/assets/images/calmkernel-icon.svg"
            }
        }
    }
    </script>

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/assets/images/calmkernel-icon.svg">

    <!-- CSS (sıralama önemli, değiştirme!) -->
    <link rel="stylesheet" href="/assets/css/fonts.css">
    <link rel="stylesheet" href="/assets/css/font-awesome.min.css" media="print" onload="this.media='all'">
    <link rel="stylesheet" href="/assets/css/plugins/fontello-enqueue.css" media="print" onload="this.media='all'">
    <link rel="stylesheet" href="/assets/css/plugins/fontello-icons.css" media="print" onload="this.media='all'">
    <link rel="stylesheet" href="/assets/css/plugins/bootstrap.min.css">
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="/assets/css/calmkernel-dark-fix.css">
    <link rel="stylesheet" href="/assets/css/cookie-consent.css">
    <link rel="stylesheet" href="/assets/css/calmkernel-custom.css">
    <link rel="stylesheet" href="/assets/css/plugins/swiper-bundle.min.css" media="print" onload="this.media='all'">
    <noscript>
        <link rel="stylesheet" href="/assets/css/plugins/swiper-bundle.min.css">
    </noscript>
</head>
```

### 3. Body Yapısı

```html
<body class="dark">
    <!-- 1. Skip link (erişilebilirlik) -->
    <a href="#main-content" class="skip-link"
       style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:9999;padding:8px;background:#45d0bd;color:#fff;text-decoration:none;font-weight:bold;">
        İçeriğe atla
    </a>

    <!-- 2. Preloader -->
    <div id="preloader">
        <div class="loader">
            <img src="/assets/images/preloader-dark.png" alt="Yükleniyor...">
        </div>
    </div>

    <!-- 3. Theme Toggle -->
    <button id="themeBtn"><i class="far fa-moon"></i></button>

    <!-- 4. Video Modal (boş iframe) -->
    <div class="video-modal">
        <div class="video-modal-content">
            <span class="close-btn">&times;</span>
            <iframe allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
    </div>

    <!-- 5. Side Menu — mevcut sayfadan kopyala -->
    <!-- 6. Mobile Menu — mevcut sayfadan kopyala -->
    <!-- 7. Sticky Header — mevcut sayfadan kopyala -->
    <!-- 8. Normal Header — mevcut sayfadan kopyala -->

    <!-- 9. Ana içerik -->
    <main id="main-content">
        <!-- Sayfa içeriği buraya -->
    </main>

    <!-- 10. Footer — mevcut sayfadan kopyala -->

    <!-- 11. JS (sıralama önemli) -->
    <script src="/assets/js/vendor/gsap.min.js" defer></script>
    <script src="/assets/js/vendor/ScrollTrigger.min.js" defer></script>
    <script src="/assets/js/vendor/lenis.min.js" defer></script>
    <script src="/assets/js/vendor/swiper-bundle.min.js" defer></script>
    <script src="/assets/js/bootstrap.min.js" defer></script>
    <script src="/assets/js/main.js" defer></script>
    <script src="/assets/js/cookie-consent.js" defer></script>
</body>
```

### 4. Navigasyon Güncelleme

1. **Header menüsü:** Yeni sayfayı hem sticky hem normal header'a ekle.
2. **Mobile menü:** `side-menu2` içindeki `<ul>`'ye ekle.
3. **Dil bağlantısı:** TR sayfasında EN'ye, EN sayfasında TR'ye link ver.

### 5. Sitemap Güncelleme

`sitemap.xml` dosyasına her iki dil için giriş ekle:

```xml
<url>
    <loc>https://calmkernel.tr/yeni-sayfa.html</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="https://calmkernel.tr/yeni-sayfa.html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://calmkernel.tr/en/yeni-sayfa.html"/>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
</url>
<url>
    <loc>https://calmkernel.tr/en/yeni-sayfa.html</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="https://calmkernel.tr/yeni-sayfa.html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://calmkernel.tr/en/yeni-sayfa.html"/>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
</url>
```

---

## Kontrol Listesi

Sayfayı commit etmeden önce kontrol et:

- [ ] `<html lang="tr">` (veya `"en"`) doğru mu?
- [ ] `<title>` ve `<meta name="description">` dolu mu?
- [ ] `<link rel="canonical">` doğru URL'yi gösteriyor mu?
- [ ] 3 hreflang etiketi (tr, en, x-default) mevcut mu?
- [ ] Open Graph etiketleri (og:type, og:url, og:title, og:description, og:image, og:locale, og:site_name) tam mı?
- [ ] Twitter Card etiketleri tam mı?
- [ ] JSON-LD script bloğu var mı?
- [ ] Favicon `<link>` etiketi var mı?
- [ ] CSS dosyaları doğru sırada yükleniyor mu?
- [ ] `<body class="dark">` mevcut mu?
- [ ] Skip link (erişilebilirlik) var mı?
- [ ] Preloader, ThemeBtn, Video Modal mevcut mu?
- [ ] Header ve footer mevcut sayfalarla tutarlı mı?
- [ ] JS dosyaları doğru sırada, `defer` ile yükleniyor mu?
- [ ] Cookie consent JS son sırada mı?
- [ ] EN versiyonu da oluşturuldu mu?
- [ ] `sitemap.xml` güncellendi mi?
- [ ] `html5validator` yerel olarak çalıştırıldı mı?

---

## Notlar

- CSS dosyası sırası kritiktir: `style.css` > `calmkernel-dark-fix.css` > `cookie-consent.css` > `calmkernel-custom.css`
- Blog dışı sayfalar için `assets/css/` yollarını root'tan veya `/en/` altındaki dosyadan göreceli ya da mutlak yol ile kullan.
- Blog sayfaları `/assets/` mutlak yol kullanır (alt dizinde oldukları için).
- `og:locale` değeri TR için `tr_TR`, EN için `en_US` olmalı.
