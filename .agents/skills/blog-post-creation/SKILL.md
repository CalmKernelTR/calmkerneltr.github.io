# Skill: Blog Yazısı Ekleme

> Bu skill, CalmKernel web sitesine yeni bir blog yazısı eklerken izlenmesi gereken
> adımları içerir. Blog yazıları hem TR hem EN olarak oluşturulmalıdır.

---

## Ön Koşullar

- Mevcut bir blog yazısını referans al: `blog/bigfive-v6.1.0.html`
- `AGENTS.md` dosyasını oku (dokunulmaz dosyalar, SEO gereksinimleri).

---

## Adımlar

### 1. Dosya Oluştur

1. TR: `blog/[yazı-adi].html`
2. EN: `en/blog/[yazı-adi].html`
3. Dosya adı kebab-case, yalnızca ASCII karakterler, Türkçe karakter kullanma.

### 2. Head Bölümü — Blog Yazısı İçin

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[YAZI BAŞLIĞI] - CalmKernel</title>
    <meta name="description" content="[YAZI AÇIKLAMASI — max 160 karakter]">
    <meta name="author" content="Ahmet TANRIKULU">
    <link rel="canonical" href="https://calmkernel.tr/blog/[yazı-adi].html">
    <link rel="alternate" hreflang="tr" href="https://calmkernel.tr/blog/[yazı-adi].html">
    <link rel="alternate" hreflang="en" href="https://calmkernel.tr/en/blog/[yazı-adi].html">
    <link rel="alternate" hreflang="x-default" href="https://calmkernel.tr/blog/[yazı-adi].html">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/assets/images/calmkernel-icon.svg">

    <!-- Open Graph — blog için og:type="article" -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://calmkernel.tr/blog/[yazı-adi].html">
    <meta property="og:title" content="[YAZI BAŞLIĞI] - CalmKernel">
    <meta property="og:description" content="[AÇIKLAMA]">
    <meta property="og:image" content="https://calmkernel.tr/assets/images/og-preview.png">
    <meta property="og:locale" content="tr_TR">
    <meta property="og:site_name" content="CalmKernel">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="[YAZI BAŞLIĞI] - CalmKernel">
    <meta name="twitter:description" content="[AÇIKLAMA]">
    <meta name="twitter:image" content="https://calmkernel.tr/assets/images/og-preview.png">

    <!-- JSON-LD BlogPosting -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "[YAZI BAŞLIĞI]",
        "description": "[AÇIKLAMA]",
        "datePublished": "[YYYY-MM-DD]",
        "dateModified": "[YYYY-MM-DD]",
        "author": {
            "@type": "Person",
            "name": "Ahmet TANRIKULU",
            "url": "https://github.com/ahm3t0t"
        },
        "publisher": {
            "@type": "Organization",
            "name": "CalmKernel",
            "url": "https://calmkernel.tr",
            "logo": {
                "@type": "ImageObject",
                "url": "https://calmkernel.tr/assets/images/calmkernel-icon.svg"
            }
        },
        "mainEntityOfPage": "https://calmkernel.tr/blog/[yazı-adi].html",
        "inLanguage": "tr"
    }
    </script>

    <!-- CSS — blog sayfaları mutlak yol kullanır -->
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

### 3. Blog İçerik Yapısı

```html
<main id="main-content">
    <article>
        <!-- Breadcrumb -->
        <div class="breadcrumb">
            <a href="/">Ana Sayfa</a> &gt; <a href="/#blog">Blog</a> &gt; [Yazı Başlığı]
        </div>

        <!-- Başlık -->
        <h1>[YAZI BAŞLIĞI]</h1>

        <!-- Meta bilgileri -->
        <div class="blog-meta">
            <span>Yazar: Ahmet TANRIKULU</span>
            <span>Tarih: [GG Ay YYYY]</span>
        </div>

        <!-- İçerik bölümleri -->
        <h2>[Alt Başlık]</h2>
        <p>[Paragraf]</p>

        <!-- Kod blokları (gerekiyorsa) -->
        <pre><code>[KOD]</code></pre>

        <!-- Bilgi kutusu -->
        <div class="info-box">
            <h3>[Bilgi Başlığı]</h3>
            <p>[Bilgi içeriği]</p>
        </div>

        <!-- Linkler kutusu (isteğe bağlı) -->
        <div class="links-box">
            <h3>Bağlantılar</h3>
            <a href="[URL]" target="_blank" rel="noopener">[Link metni]</a>
        </div>

        <!-- Ana sayfaya dönüş -->
        <a href="/" class="back-link">Ana Sayfaya Dön</a>
    </article>
</main>
```

### 4. Blog Yazısına Özel CSS

Blog yazıları inline `<style>` kullanır (mevcut örneklere bak: `blog/bigfive-v6.1.0.html`).
Temel stiller:

- `article` → max-width: 800px, ortalanmış
- `.breadcrumb` → üst navigasyon
- `.blog-meta` → yazar ve tarih bilgisi
- `.highlight-box` → vurgulu bilgi kutusu
- `.info-box` → bilgi kutusu (turkuaz kenarlık)
- `.links-box` → bağlantılar kutusu
- `.back-link` → geri dönüş butonu

**Dark mode override'ları:**
```css
.active-body article p { color: #ccc !important; }
.active-body article h3 { color: #fff !important; }
.active-body article strong { color: #e6edf3 !important; }
.active-body .meta { color: #8b949e !important; border-color: #30363d !important; }
.active-body .highlight-box { background: #1f1f1f !important; border-color: #333 !important; }
```

### 5. Navigasyon Güncelleme

1. **Mobile menü:** Blog sayfasının dil bağlantısını EN/TR karşılığına yönlendir.
2. **Header menüsü:** Blog link'lerini `/#blog` veya `/en/#blog` olarak ayarla.

### 6. Sitemap Güncelleme

`sitemap.xml` dosyasına ekle (mevcut blog girişlerinin hemen altına):

```xml
<url>
    <loc>https://calmkernel.tr/blog/[yazı-adi].html</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="https://calmkernel.tr/blog/[yazı-adi].html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://calmkernel.tr/en/blog/[yazı-adi].html"/>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
</url>
<url>
    <loc>https://calmkernel.tr/en/blog/[yazı-adi].html</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="https://calmkernel.tr/blog/[yazı-adi].html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://calmkernel.tr/en/blog/[yazı-adi].html"/>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
</url>
```

### 7. Ana Sayfa Blog Bölümünü Güncelle

Blog yazısını ana sayfadaki blog bölümüne ekle:

1. `index.html` → `#blog` section'ına yeni blog kartı ekle.
2. `en/index.html` → aynı yapıda İngilizce versiyonu ekle.

---

## Kontrol Listesi

- [ ] TR dosyası `blog/[yazı-adi].html` oluşturuldu mu?
- [ ] EN dosyası `en/blog/[yazı-adi].html` oluşturuldu mu?
- [ ] `og:type` → `article` olarak ayarlandı mı?
- [ ] JSON-LD `@type` → `BlogPosting` mi?
- [ ] `datePublished` ve `dateModified` doğru mu?
- [ ] `author` bilgisi doğru mu?
- [ ] Hreflang etiketleri (tr, en, x-default) mevcut mu?
- [ ] Blog-spesifik inline CSS'de dark mode override'ları var mı?
- [ ] Breadcrumb navigasyonu doğru mu?
- [ ] Dil değiştirme linki (mobile menü + navigasyon) doğru mu?
- [ ] `sitemap.xml` güncellendi mi?
- [ ] Ana sayfa blog bölümüne kart eklendi mi?
- [ ] `html5validator` yerel olarak çalıştırıldı mı?

---

## Blog Yazısı Farklılıkları (Normal Sayfadan)

| Özellik | Normal Sayfa | Blog Yazısı |
|---------|-------------|------------|
| `og:type` | `website` | `article` |
| JSON-LD `@type` | `WebPage` | `BlogPosting` |
| JSON-LD ek alanlar | — | `datePublished`, `dateModified`, `author` |
| `meta name="author"` | — | Gerekli |
| İçerik yapısı | Section'lar | `<article>` etiketi |
| CSS | Global | Global + inline `<style>` |
| Breadcrumb | — | Gerekli |
