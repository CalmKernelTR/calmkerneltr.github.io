# Skill: TR/EN Sayfa Eşitleme (i18n Sync)

> Bu skill, CalmKernel web sitesinde Türkçe ve İngilizce sayfaların
> senkronizasyonunu sağlamak için izlenmesi gereken kuralları içerir.

---

## Genel Kurallar

1. **Her TR sayfasının bir EN karşılığı olmalıdır** (ve tersi).
2. TR sayfaları root dizinde (`/`), EN sayfaları `/en/` altında bulunur.
3. Sayfa yapısı (HTML iskelet, section sırası, class isimleri) **birebir aynı** olmalıdır.
4. Yalnızca metin içerikleri ve dil-spesifik meta etiketler farklılaşır.

---

## Dosya Eşleme Tablosu

| TR Dosya | EN Dosya |
|----------|----------|
| `/index.html` | `/en/index.html` |
| `/tools.html` | `/en/tools.html` |
| `/premium.html` | `/en/premium.html` |
| `/privacy-policy.html` | `/en/privacy-policy.html` |
| `/404.html` | `/en/404.html` |
| `/blog/[dosya].html` | `/en/blog/[dosya].html` |

---

## Eşitleme Kontrol Listesi

Bir sayfada değişiklik yaptığında diğer dil versiyonunda da güncelle:

### 1. Meta Etiketler

| Etiket | TR | EN |
|--------|----|----|
| `<html lang="">` | `tr` | `en` |
| `<title>` | Türkçe başlık | İngilizce başlık |
| `<meta name="description">` | Türkçe açıklama | İngilizce açıklama |
| `<link rel="canonical">` | `https://calmkernel.tr/sayfa.html` | `https://calmkernel.tr/en/sayfa.html` |
| `og:url` | TR URL | EN URL |
| `og:title` | Türkçe | İngilizce |
| `og:description` | Türkçe | İngilizce |
| `og:locale` | `tr_TR` | `en_US` |
| `twitter:title` | Türkçe | İngilizce |
| `twitter:description` | Türkçe | İngilizce |
| JSON-LD `inLanguage` | `tr` | `en` |
| JSON-LD `headline/name` | Türkçe | İngilizce |

### 2. Hreflang (Her İki Sayfada da Aynı)

```html
<!-- TR sayfasında -->
<link rel="alternate" hreflang="tr" href="https://calmkernel.tr/sayfa.html">
<link rel="alternate" hreflang="en" href="https://calmkernel.tr/en/sayfa.html">
<link rel="alternate" hreflang="x-default" href="https://calmkernel.tr/sayfa.html">

<!-- EN sayfasında (aynı hreflang seti) -->
<link rel="alternate" hreflang="tr" href="https://calmkernel.tr/sayfa.html">
<link rel="alternate" hreflang="en" href="https://calmkernel.tr/en/sayfa.html">
<link rel="alternate" hreflang="x-default" href="https://calmkernel.tr/sayfa.html">
```

> **Dikkat:** `x-default` her zaman TR URL'sini gösterir (birincil dil).

### 3. Navigasyon

| Bileşen | TR Sayfası | EN Sayfası |
|---------|-----------|-----------|
| Menü metinleri | Türkçe (`Projeler`, `Araçlar`, `Blog`, `Hakkında`) | İngilizce (`Projects`, `Tools`, `Blog`, `About`) |
| Dil değiştirme linki | `<a href="/en/[sayfa]">EN</a>` | `<a href="/[sayfa]">TR</a>` |
| Logo linki | `/` | `/en/` |
| Side menu iletişim | `İletişim`, `Türkiye` | `Contact`, `Turkey` |
| Side menu kapatma | `kapat` | `close` |
| Mobile menu | Türkçe linkler | İngilizce linkler |

### 4. Skip Link

```html
<!-- TR -->
<a href="#main-content" class="skip-link" ...>İçeriğe atla</a>

<!-- EN -->
<a href="#main-content" class="skip-link" ...>Skip to content</a>
```

### 5. Preloader Alt Text

```html
<!-- TR -->
<img src="/assets/images/preloader-dark.png" alt="Yükleniyor...">

<!-- EN -->
<img src="/assets/images/preloader-dark.png" alt="Loading...">
```

### 6. Footer ve İletişim

- Footer metinleri dile göre çevrilmeli.
- E-posta adresleri, GitHub linkleri aynı kalır.
- `aria-label` değerleri dile göre çevrilmeli.

---

## İçerik Değişikliği Yapılınca

1. TR sayfasında bir bölüm eklenirse/silinirse → EN sayfasında da aynı yapısal değişiklik yapılmalı.
2. Yeni bir `<section>` eklendiyse → EN versiyonundaki metinler İngilizce olarak çevrilmeli.
3. CSS class'ları, id'ler ve HTML yapısı iki dilde **birebir aynı** olmalı.
4. Görsel (`<img>`) `alt` text'leri dile uygun olmalı.

---

## Sitemap Eşitleme

Her yeni sayfa için `sitemap.xml`'e **iki giriş** ekle (TR + EN), her ikisinde de karşılıklı `xhtml:link` olmalı:

```xml
<url>
    <loc>https://calmkernel.tr/sayfa.html</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="https://calmkernel.tr/sayfa.html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://calmkernel.tr/en/sayfa.html"/>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
</url>
<url>
    <loc>https://calmkernel.tr/en/sayfa.html</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="https://calmkernel.tr/sayfa.html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://calmkernel.tr/en/sayfa.html"/>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
</url>
```

---

## Sık Yapılan Hatalar

| Hata | Sonuç | Çözüm |
|------|-------|-------|
| Hreflang eksik | Google yanlış dil versiyonunu gösterir | Her sayfada 3 hreflang olmalı |
| `x-default` EN'yi gösteriyor | Yanlış varsayılan dil | `x-default` her zaman TR URL'sini göstermeli |
| Menüde dil linki yanlış | Kullanıcı yanlış sayfaya gider | TR→EN ve EN→TR linkleri kontrol et |
| `og:locale` yanlış | Sosyal medya paylaşımlarında yanlış dil | TR: `tr_TR`, EN: `en_US` |
| `<html lang="">` yanlış | SEO ve erişilebilirlik sorunu | TR: `tr`, EN: `en` |
| Yapısal farklılık | Tutarsız kullanıcı deneyimi | HTML yapısı birebir aynı olmalı |
| `canonical` yanlış | SEO duplicate content | Her sayfada kendi URL'sini göstermeli |
| JSON-LD `inLanguage` eksik | Schema.org hatası | TR: `"tr"`, EN: `"en"` |
