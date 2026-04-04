# Skill: Dark Mode CSS Yazma Standartları

> Bu skill, CalmKernel web sitesinde dark mode CSS kuralları yazarken
> uyulması gereken standartları ve en iyi pratikleri içerir.

---

## Dark Mode Mekanizması

### Nasıl Çalışır?

1. Site varsayılan olarak `<body class="dark">` ile açılır.
2. `ThemeToggle` modülü (`main.js:1689-1756`) dark/light geçişini yönetir.
3. Dark mode aktifken body'ye **`active-body`** ve **`dark-mode`** class'ları eklenir.
4. Kullanıcı tercihi `localStorage` üzerinden saklanır:
   - `themeMode`: `"active"` (dark) veya `"inactive"` (light)
   - `darkMode`: `"enabled"` veya `"disabled"`
5. İlk yüklemede sistem teması (`prefers-color-scheme`) kontrol edilir.

### Class Durumları

| Durum | Body Class'ları |
|-------|----------------|
| Light mode | `dark` (yalnızca başlangıç class'ı) |
| Dark mode | `dark active-body dark-mode` |

---

## CSS Yazma Kuralları

### Temel Kural: `.active-body` Prefix Kullan

Dark mode stillerini **her zaman** `.active-body` prefix'i ile yaz:

```css
/* DOĞRU — Light mode varsayılan, dark mode override */
.element {
    color: #333;
    background: #fff;
}
.active-body .element {
    color: #e6edf3;
    background: #1f1f1f;
}
```

```css
/* YANLIŞ — .active-body prefix'i olmadan dark mode yazma */
.dark .element { ... }        /* YANLIŞ: .dark class'ı her zaman body'de */
body.dark-mode .element { ... } /* YANLIŞ: tutarsız kullanım */
[data-theme="dark"] .element { ... } /* YANLIŞ: data attribute yok */
```

### Nereye Yazmalı?

| Dosya | Ne Zaman Kullan |
|-------|----------------|
| `calmkernel-custom.css` | Yeni bileşenler için light + dark mode stilleri |
| `calmkernel-dark-fix.css` | Temanın dark mode'da eksik bıraktığı düzeltmeler |
| Inline `<style>` (blog) | Blog yazılarına özel dark mode override'ları |

> **Kural:** `assets/css/style.css` dosyasına **kesinlikle dokunma** (39K+ satır tema CSS'i).

---

## Renk Paleti

### Dark Mode Renkleri

| Kullanım | Renk Kodu | Örnek |
|----------|-----------|-------|
| **Arka plan — Ana** | `#0d1117` | Body background |
| **Arka plan — Kart/kutu** | `#1a1a1a`, `#1f1f1f` | Card, box, highlight |
| **Arka plan — Aktif/hover** | `#2d2d2d` | Kod blokları, hover state |
| **Metin — Birincil** | `#e6edf3` | Ana metin, başlıklar |
| **Metin — İkincil** | `#ccc`, `#adb5bd` | Açıklama metinleri |
| **Metin — Soluk** | `#8b949e` | Meta bilgiler, placeholder |
| **Kenarlık** | `#30363d`, `#333` | Border, divider |
| **Vurgu — Primary** | `#45d0bd` | CTA butonları, linkler |
| **Vurgu — Link** | `#58a6ff` | Hover link rengi |
| **Uyarı — Hata** | `#ef6464` | Error state |

### Light Mode Renkleri

| Kullanım | Renk Kodu |
|----------|-----------|
| **Arka plan** | `#fff`, `#f5f5f5` |
| **Metin — Birincil** | `#111`, `#333` |
| **Metin — İkincil** | `#444`, `#666` |
| **Kenarlık** | `#e2e2e2` |
| **Vurgu — Primary** | `#45d0bd` |

---

## Yaygın Kalıplar

### 1. Basit Element Override

```css
/* Light mode (varsayılan) */
.card-title {
    color: #333;
}

/* Dark mode */
.active-body .card-title {
    color: #e6edf3;
}
```

### 2. Arka Plan + Metin + Kenarlık

```css
.info-box {
    background: #f5f5f5;
    border: 1px solid #e2e2e2;
    color: #444;
}

.active-body .info-box {
    background: #1f1f1f;
    border-color: #333;
    color: #ccc;
}
```

### 3. Badge ve Etiketler (Yarı Saydam Arka Plan)

```css
.badge-custom {
    background: rgba(69, 208, 189, 0.1);
    color: #45d0bd;
}

.active-body .badge-custom {
    background: rgba(69, 208, 189, 0.2);
    /* Renk aynı kalabilir veya opaklık artırılabilir */
}
```

### 4. Tablo

```css
.table th {
    background: #f5f5f5;
    color: #666;
}
.table td {
    color: #111;
    border-bottom: 1px solid #e2e2e2;
}

.active-body .table th {
    background: #1f1f1f;
    color: #8b949e;
}
.active-body .table td {
    color: #e6edf3;
    border-color: #333;
}
```

### 5. Kod Blokları

```css
code {
    background: #f0f0f0;
    color: #e65100;
}

.active-body code {
    background: #2d2d2d;
    /* color aynı kalabilir */
}

pre {
    background: #1e1e2e;
    border: 1px solid #313244;
    color: #cdd6f4;
}
/* pre zaten dark — genellikle override gerekmez */
```

### 6. Logo ve Görseller (Filter Kullan)

```css
/* Dark mode'da logonun beyaz görünmesi için */
.active-body img[src*="calmkernel-logo"] {
    filter: brightness(0) invert(1) brightness(1.1);
}

/* Sticky header logosu */
.active-body .sticky-active .header-logo a img {
    filter: brightness(9);
}
```

---

## CSS Variable Kullanımı

Tema bazı CSS variable'ları tanımlar. Dark mode override'larında bunları kullanabilirsin:

```css
/* Tema tarafından tanımlanan variable'lar */
.active-body .sticky-active .menu-style1 > ul > li > a {
    color: var(--color-content-white);
}

.active-body .sticky-active .menu-style1 > ul > li > a:hover {
    background-color: var(--color-surface-dark-2);
}
```

> **Not:** Tüm CSS variable'ları `style.css` tema dosyasında tanımlanır.
> Kullanmadan önce DevTools ile mevcut variable'ları kontrol et.

---

## `!important` Kullanımı

### Ne Zaman Kullan?

- Tema CSS'inin specificity'si çok yüksekse ve override edilemiyorsa.
- Blog yazılarının inline `<style>` bloklarında (düşük specificity).

### Ne Zaman Kullanma?

- Yeni bileşenler yazarken — kendi specificity'ini doğru ayarla.
- `calmkernel-custom.css`'de mümkün olduğunca kaçın.

### Doğru Kullanım Örneği

```css
/* Blog inline style — düşük specificity, !important gerekebilir */
.active-body article p {
    color: #ccc !important;
}
```

---

## Test Kontrol Listesi

CSS değişikliklerinden sonra:

- [ ] Light mode'da doğru görünüyor mu?
- [ ] Dark mode'da doğru görünüyor mu?
- [ ] Dark → Light geçişte animasyon düzgün mü? (0.3s transition mevcut)
- [ ] Mobile'da dark mode doğru çalışıyor mu?
- [ ] Sticky header dark mode'da okunabilir mi?
- [ ] Badge/etiketler dark mode'da yeterli kontrast sağlıyor mu?
- [ ] Görseller dark mode'da uyumlu mu?
- [ ] `html5validator` geçiyor mu?

---

## Sık Yapılan Hatalar

| Hata | Sonuç | Çözüm |
|------|-------|-------|
| `.dark` prefix kullanmak | Her zaman aktif (body'de `dark` class'ı sabit) | `.active-body` kullan |
| `style.css` düzenlemek | Tema güncellenmesinde kaybolur | Override dosyalarına yaz |
| `!important` aşırı kullanım | Bakım zorlaşır | Specificity'yi doğru ayarla |
| Transition eklememek | Ani renk değişimi | Body'deki genel transition yeterli |
| Sabit renk kodları yerine variable | Tutarsız renkler | Renk paletine uy |
| `filter` kullanmamak | Dark mode'da logo/ikon görünmez | `brightness` + `invert` kullan |
| RGBA opaklık düşük | Dark mode'da badge okunmaz | Dark mode'da opaklığı artır |
