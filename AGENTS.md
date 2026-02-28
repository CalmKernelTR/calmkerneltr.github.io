# AGENTS.md — CalmKernel Statik Web Sitesi

> Bu dosya, AI asistanlarının (Devin, Claude Code vb.) bu repo üzerinde çalışırken
> uyması gereken kuralları ve mimari bilgileri içerir.

---

## 1. Proje Özeti

| Alan | Değer |
|------|-------|
| **Repo** | `CalmKernelTR/calmkerneltr.github.io` |
| **Domain** | `calmkernel.tr` |
| **Tür** | Statik web sitesi (GitHub Pages) |
| **Tema** | Aiero IT Services (index13) — Dark mode varsayılan |
| **Diller** | Türkçe (birincil, `/`), İngilizce (ikincil, `/en/`) |
| **Stack** | Bootstrap 5, GSAP + ScrollTrigger, Swiper, Lenis, vanilla JS |
| **Tipografi** | Sora + Manrope (self-hosted WOFF2, GDPR/KVKK uyumlu) |
| **Renkler** | Primary: `#45d0bd` (turkuaz), Secondary: `#ef6464` (kırmızı) |
| **CI** | html5validator + Lighthouse CI (`.github/workflows/ci.yml`) |

---

## 2. Dizin Yapısı

```
calmkerneltr.github.io/
├── index.html                  # Ana sayfa (TR)
├── tools.html                  # Araçlar sayfası (TR)
├── premium.html                # Premium hizmetler (TR)
├── privacy-policy.html         # KVKK/Gizlilik politikası (TR)
├── 404.html                    # Hata sayfası (TR)
├── blog/
│   ├── bigfive-v6.1.0.html     # Blog yazısı (TR)
│   └── edition-methodology.html
├── en/                         # İngilizce versiyonlar (aynı yapı)
│   ├── index.html
│   ├── tools.html
│   ├── premium.html
│   ├── privacy-policy.html
│   ├── 404.html
│   └── blog/
│       ├── bigfive-v6.1.0.html
│       └── edition-methodology.html
├── assets/
│   ├── css/
│   │   ├── style.css               # ❌ DOKUNMA — Aiero tema (39K+ satır)
│   │   ├── calmkernel-custom.css    # ✅ Custom override dosyası
│   │   ├── calmkernel-dark-fix.css  # ✅ Dark mode düzeltmeleri
│   │   ├── cookie-consent.css       # ✅ Cookie banner stilleri
│   │   ├── fonts.css                # ✅ Self-hosted font tanımları
│   │   ├── font-awesome.min.css     # ❌ DOKUNMA — vendor
│   │   └── plugins/                 # ❌ DOKUNMA — vendor (Bootstrap, Swiper, Fontello)
│   ├── js/
│   │   ├── main.js                  # ⚠️ Tema + custom JS (dikkatli düzenle)
│   │   ├── cookie-consent.js        # ✅ Cookie consent mekanizması
│   │   ├── bootstrap.min.js         # ❌ DOKUNMA — vendor
│   │   └── vendor/                  # ❌ DOKUNMA — vendor (GSAP, Lenis, Swiper)
│   ├── fonts/                       # Self-hosted WOFF2 fontlar
│   └── images/                      # Görseller, logolar, og:image
├── robots.txt                  # AI bot engelleme dahil
├── sitemap.xml                 # XML sitemap (hreflang destekli)
├── CNAME                       # Custom domain: calmkernel.tr
├── .nojekyll                   # Jekyll devre dışı
├── .github/
│   ├── workflows/ci.yml        # CI pipeline
│   └── CODEOWNERS              # @ahm3t0t
└── .REPOMAP.md                 # Repo haritası
```

---

## 3. DOKUNULMAZ Dosyalar (Kesinlikle Değiştirme)

Aşağıdaki dosyalar tema veya vendor kaynaklarıdır. **Hiçbir koşulda düzenlenmemelidir**:

| Dosya | Neden |
|-------|-------|
| `assets/css/style.css` | Aiero tema CSS'i (~39K satır). Güncelleme tema paketinden gelir. |
| `assets/css/font-awesome.min.css` | Font Awesome — CDN yerine lokal, minified. |
| `assets/css/plugins/*.css` | Bootstrap, Swiper, Fontello — vendor dosyaları. |
| `assets/js/bootstrap.min.js` | Bootstrap JS — vendor. |
| `assets/js/vendor/*.js` | GSAP, ScrollTrigger, Lenis, Swiper — vendor. |

> **Kural:** Tema stillerini değiştirmek istiyorsan `calmkernel-custom.css` veya
> `calmkernel-dark-fix.css` dosyasına override yaz.

---

## 4. Override Stratejisi

Tema dosyalarına dokunmadan özelleştirme yapmak için:

### CSS Override Dosyaları

| Dosya | Amaç |
|-------|------|
| `calmkernel-custom.css` | Genel özelleştirmeler: badge stilleri, proje kartları, tema butonu |
| `calmkernel-dark-fix.css` | Dark mode'da temanın eksik bıraktığı düzeltmeler (sticky header vb.) |
| `cookie-consent.css` | Cookie consent banner stilleri |

### Override Kuralları

1. **Yeni CSS kuralı eklerken** `calmkernel-custom.css` kullan.
2. **Dark mode düzeltmesi** için `calmkernel-dark-fix.css` kullan.
3. Selector specificity yeterli değilse `!important` kullanabilirsin ama minimize et.
4. Yeni bir CSS dosyası oluşturmak yerine mevcut override dosyalarına ekle.
5. Her override'ın üstüne yorum satırı ile neyi düzelttiğini yaz.

### JS Kuralları

- `main.js` hem tema hem custom kodu içerir. Düzenleme yaparken mevcut modül yapısına uy.
- Yeni JS eklerken `main.js` içindeki `DOMContentLoaded` bloğuna veya ayrı bir modül olarak ekle.
- Vendor JS dosyalarına (`vendor/` altı) kesinlikle dokunma.

---

## 5. Dark Mode Kuralları

Site varsayılan olarak dark modda açılır (`<body class="dark">`).

### Mekanizma

1. `ThemeToggle` modülü (`main.js:1689-1756`) dark mode'u yönetir.
2. Dark mode aktifken body'ye `active-body` ve `dark-mode` class'ları eklenir.
3. Kullanıcı tercihi `localStorage` üzerinden `themeMode` ve `darkMode` key'leri ile saklanır.
4. Sistem teması (`prefers-color-scheme`) otomatik algılanır.

### CSS'de Dark Mode Yazarken

```css
/* Dark mode'da bir elementi hedeflemek için: */
.active-body .hedef-element {
    color: #e6edf3;
    background: #1f1f1f;
}

/* Light mode varsayılan, dark mode override: */
.hedef-element {
    color: #333;           /* light mode */
}
.active-body .hedef-element {
    color: #e6edf3;        /* dark mode */
}
```

### Renk Paleti (Dark Mode)

| Kullanım | Renk |
|----------|------|
| Arka plan (koyu) | `#0d1117`, `#1a1a1a`, `#1f1f1f` |
| Metin (açık) | `#e6edf3`, `#ccc`, `#adb5bd` |
| İkincil metin | `#8b949e` |
| Kenarlık | `#30363d`, `#333` |
| Vurgu (primary) | `#45d0bd` |
| Bağlantı | `#58a6ff` |
| Kod arka planı | `#2d2d2d` |

---

## 6. SEO Gereksinimleri

Her HTML sayfasında aşağıdakiler **zorunludur**:

### Head Meta Etiketleri

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[Sayfa Başlığı] - CalmKernel</title>
<meta name="description" content="[Açıklama]">
<link rel="canonical" href="https://calmkernel.tr/[sayfa-yolu]">
```

### Hreflang (Dil Bağlantıları)

```html
<link rel="alternate" hreflang="tr" href="https://calmkernel.tr/[sayfa-yolu]">
<link rel="alternate" hreflang="en" href="https://calmkernel.tr/en/[sayfa-yolu]">
<link rel="alternate" hreflang="x-default" href="https://calmkernel.tr/[sayfa-yolu]">
```

### Open Graph

```html
<meta property="og:type" content="website"> <!-- veya "article" blog için -->
<meta property="og:url" content="https://calmkernel.tr/[sayfa-yolu]">
<meta property="og:title" content="[Başlık]">
<meta property="og:description" content="[Açıklama]">
<meta property="og:image" content="https://calmkernel.tr/assets/images/og-preview.png">
<meta property="og:locale" content="tr_TR"> <!-- veya en_US -->
<meta property="og:site_name" content="CalmKernel">
```

### Twitter Card

```html
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="[Başlık]">
<meta name="twitter:description" content="[Açıklama]">
<meta name="twitter:image" content="https://calmkernel.tr/assets/images/og-preview.png">
```

### JSON-LD (Yapılandırılmış Veri)

- Ana sayfalar: `@type: "Organization"`
- Blog yazıları: `@type: "BlogPosting"` (datePublished, dateModified, author zorunlu)
- Tüm sayfalarda `publisher` bilgisi olmalı.

---

## 7. KVKK / Gizlilik Uyumluluğu

### Cookie Consent

- `cookie-consent.js` + `cookie-consent.css` ile yönetilir.
- Yalnızca teknik çerezler (Cloudflare) kullanılır — analiz/izleme çerezi **YOK**.
- Banner, `localStorage` key `ck_cookie_consent` ile kontrol edilir.
- Dil otomatik algılanır (`document.documentElement.lang`).

### Self-Hosted Fontlar

- Google Fonts **kullanılmaz** — GDPR/KVKK uyumluluğu için.
- Fontlar `assets/fonts/` altında WOFF2 formatında.
- `fonts.css` dosyasında `@font-face` tanımları.

### AI Bot Engelleme

`robots.txt` dosyasında aşağıdaki botlar engellenir:
- GPTBot, ChatGPT-User, Google-Extended, CCBot, anthropic-ai, Claude-Web

### Harici Kaynak Kullanmama Politikası

- CDN'den CSS/JS yükleme — tüm kaynaklar lokal.
- Harici font servisleri kullanma.
- Üçüncü parti analiz/izleme script'i ekleme.

---

## 8. i18n (Çoklu Dil) Kuralları

### Yapı

- Türkçe sayfalar: `/` (root)
- İngilizce sayfalar: `/en/`
- Her TR sayfasının bir EN karşılığı olmalı (ve tersi).

### Yeni Sayfa Eklerken

1. TR versiyonunu root'ta oluştur.
2. EN versiyonunu `/en/` altında oluştur.
3. Her iki sayfaya da karşılıklı `hreflang` etiketleri ekle.
4. `sitemap.xml`'e her iki URL'yi de `xhtml:link` ile ekle.
5. Navigasyon menülerinde dil değiştirme bağlantısını güncelle.

### Dil Değiştirme Bağlantıları

- TR sayfalarında: `<a href="/en/[sayfa]">EN</a>`
- EN sayfalarında: `<a href="/[sayfa]">TR</a>`
- Blog sayfalarında: `<a href="/en/blog/[dosya]">EN</a>` / `<a href="/blog/[dosya]">TR</a>`

---

## 9. CI Pipeline

### html5validator

```bash
html5validator --root . --ignore-re 'background-clip'
```

- Tüm HTML dosyalarını doğrular.
- `background-clip` uyarısı göz ardı edilir (tema CSS'i ile ilgili).

### Lighthouse CI

```bash
lhci autorun \
  --collect.staticDistDir=. \
  --collect.url=http://localhost/index.html \
  --collect.url=http://localhost/tools.html \
  --collect.url=http://localhost/premium.html \
  --collect.url=http://localhost/en/index.html \
  --collect.url=http://localhost/en/tools.html \
  --collect.url=http://localhost/en/premium.html \
  --assert.assertions.categories:accessibility=warn \
  --assert.assertions.categories:best-practices=warn \
  --assert.assertions.categories:seo=warn
```

- Accessibility, Best Practices, SEO kategorileri `warn` seviyesinde.
- Raporlar artifact olarak 14 gün saklanır.

### Yerel Test

```bash
# Statik sunucu ile önizleme
python -m http.server 8000
# veya
npx serve .
```

---

## 10. HTML Sayfa Şablonu

Yeni bir sayfa oluştururken bu yapıyı kullan:

```html
<!DOCTYPE html>
<html lang="tr"> <!-- veya "en" -->

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[BAŞLIK] - CalmKernel</title>
    <meta name="description" content="[AÇIKLAMA]">
    <link rel="canonical" href="https://calmkernel.tr/[YOL]">
    <link rel="alternate" hreflang="tr" href="https://calmkernel.tr/[TR-YOL]">
    <link rel="alternate" hreflang="en" href="https://calmkernel.tr/en/[EN-YOL]">
    <link rel="alternate" hreflang="x-default" href="https://calmkernel.tr/[TR-YOL]">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://calmkernel.tr/[YOL]">
    <meta property="og:title" content="[BAŞLIK]">
    <meta property="og:description" content="[AÇIKLAMA]">
    <meta property="og:image" content="https://calmkernel.tr/assets/images/og-preview.png">
    <meta property="og:locale" content="tr_TR"> <!-- veya en_US -->
    <meta property="og:site_name" content="CalmKernel">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="[BAŞLIK]">
    <meta name="twitter:description" content="[AÇIKLAMA]">
    <meta name="twitter:image" content="https://calmkernel.tr/assets/images/og-preview.png">

    <!-- JSON-LD -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "[BAŞLIK]",
        "url": "https://calmkernel.tr/[YOL]",
        "publisher": {
            "@type": "Organization",
            "name": "CalmKernel",
            "url": "https://calmkernel.tr"
        }
    }
    </script>

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/assets/images/calmkernel-icon.svg">

    <!-- CSS (sıralama önemli) -->
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

<body class="dark">
    <!-- Skip link (erişilebilirlik) -->
    <a href="#main-content" class="skip-link" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:9999;padding:8px;background:#45d0bd;color:#fff;text-decoration:none;font-weight:bold;">
        İçeriğe atla  <!-- veya "Skip to content" EN için -->
    </a>

    <!-- Preloader -->
    <div id="preloader">
        <div class="loader">
            <img src="/assets/images/preloader-dark.png" alt="Yükleniyor...">
        </div>
    </div>

    <!-- Theme Toggle Button -->
    <button id="themeBtn"><i class="far fa-moon"></i></button>

    <!-- [HEADER — mevcut sayfalardan kopyala] -->
    <!-- [SAYFA İÇERİĞİ] -->
    <!-- [FOOTER — mevcut sayfalardan kopyala] -->

    <!-- JS (sıralama önemli) -->
    <script src="/assets/js/vendor/gsap.min.js" defer></script>
    <script src="/assets/js/vendor/ScrollTrigger.min.js" defer></script>
    <script src="/assets/js/vendor/lenis.min.js" defer></script>
    <script src="/assets/js/vendor/swiper-bundle.min.js" defer></script>
    <script src="/assets/js/bootstrap.min.js" defer></script>
    <script src="/assets/js/main.js" defer></script>
    <script src="/assets/js/cookie-consent.js" defer></script>
</body>

</html>
```

---

## 11. Commit Kuralları

- Conventional Commits kullan: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- Commit mesajları İngilizce veya Türkçe olabilir.
- `main` branch'e doğrudan push yapma — PR aç.
- PR'lar CI'dan geçmeli (html5validator + Lighthouse).

---

## 12. Sık Yapılan Hatalar

| Hata | Çözüm |
|------|-------|
| `style.css` düzenleme | `calmkernel-custom.css` kullan |
| Vendor JS düzenleme | Yapma. Custom kodu `main.js`'e ekle |
| Hreflang eksik | Her sayfada TR + EN + x-default olmalı |
| OG image eksik | `og-preview.png` kullan |
| CDN bağlantısı ekleme | Lokal dosya kullan, CDN yasak |
| Google Fonts import | `fonts.css` ile self-hosted kullan |
| Dark mode prefix unutma | `.active-body` prefix'i zorunlu |
| sitemap.xml güncellememek | Her yeni sayfa sitemap'e eklenmeli |

---

## 13. Skill Dosyaları

Detaylı görev rehberleri `.agents/skills/` altında:

| Skill | Dosya | Açıklama |
|-------|-------|----------|
| HTML Sayfa Oluşturma | `.agents/skills/html-page-creation/SKILL.md` | Yeni sayfa ekleme adımları |
| i18n Eşitleme | `.agents/skills/i18n-sync/SKILL.md` | TR/EN sayfa eşitleme kuralları |
| Blog Yazısı Ekleme | `.agents/skills/blog-post-creation/SKILL.md` | Blog yazısı oluşturma rehberi |
| Dark Mode CSS | `.agents/skills/dark-mode-css/SKILL.md` | Dark mode CSS yazma standartları |
