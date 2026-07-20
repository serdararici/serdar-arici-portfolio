[🇬🇧 English](./README.md) | 🇹🇷 Türkçe

# Serdar Arıcı — Portfolyo

Next.js (App Router), Supabase ve next-intl ile geliştirilmiş, iki dilli (TR/EN) kişisel geliştirici portfolyo sitesi. Projeleri, blog yazılarını, iş deneyimini, eğitim geçmişini, yetenekleri ve sertifikaları sergiler; Server Action ile çalışan bir iletişim formu içerir.

### Canlı Demo

🔗 [serdararici.com/tr](https://serdararici.com/tr)

## Ekran Görüntüleri

### Ana Sayfa
| Koyu Tema | Açık Tema |
|---|---|
| ![Ana Sayfa - Koyu](./public/screenshots/home-dark.png) | ![Ana Sayfa - Açık](./public/screenshots/home-light.png) |

### Hakkımda
![Hakkımda Sayfası](./public/screenshots/about-dark.png)

### Projeler
![Proje Listesi](./public/screenshots/projects-list-dark.png)

### Proje Detayı
![Proje Detayı](./public/screenshots/project-detail-dark.png)

### Bloglar
![Blog Listesi](./public/screenshots/blogs-list-dark.png)

### Blog Detayı
![Blog Detayı](./public/screenshots/blog-detail-dark.png)

### İletişim
![İletişim Sayfası](./public/screenshots/contact-dark.png)

## Özellikler

- **Çok dilli destek** (TR/EN), `next-intl` ile ve locale ön ekli yönlendirme (`/en`, `/tr`)
- **Koyu/Açık tema** geçişi, `next-themes` ile
- **Dinamik Proje ve Blog bölümleri**, Supabase'den beslenir; projeler için statik yedek veri de mevcut
- **Kategori filtreleme ve arama**, proje listesi sayfasında
- **Markdown render'ı**, blog içerikleri için `react-markdown` + `remark-gfm` ile
- **Lightbox'lı görsel galerisi** (klavye navigasyonu, focus trap, scroll kilidi), proje ve blog detay sayfalarında
- **Duyarlı (responsive) tasarım**, Tailwind CSS + DaisyUI ile
- **SEO metadata**, her sayfa için `generateMetadata` üzerinden (OpenGraph + Twitter kart desteği), ayrıca `sitemap.ts` ve `robots.ts`
- **Erişilebilirlik (a11y) gözetimi** — galeri lightbox'ında `aria-modal`, interaktif elemanlarda `focus-visible` durumları, anlamsal (semantic) markup

## Teknoloji Yığını

**Framework**
- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)

**Styling**
- [Tailwind CSS v4](https://tailwindcss.com/)
- [DaisyUI v5](https://daisyui.com/)
- [Framer Motion](https://www.framer.com/motion/) — animasyonlar
- [next-themes](https://github.com/pacocoursey/next-themes) — koyu/açık tema geçişi

**Backend / Veritabanı**
- [Supabase JS v2](https://supabase.com/) — anon key ile veri okuma
- [Resend](https://resend.com/) — iletişim formu e-posta gönderimi, Next.js Server Action üzerinden

**Diğer Kütüphaneler**
- [next-intl](https://next-intl.dev/) — i18n yönlendirme ve çeviriler
- [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) — blog markdown render'ı
- [lucide-react](https://lucide.dev/) / [react-icons](https://react-icons.github.io/react-icons/) — ikonlar
- [@vercel/analytics](https://vercel.com/docs/analytics) — kullanım analitiği

## Proje Yapısı

```
src/
  app/
    [locale]/          # Tüm sayfalar, locale segmenti içinde (URL'de her zaman mevcut)
      about/            # Hakkımda — deneyim, eğitim, yetenek ve sertifikaları paralel olarak çeker
      blogs/[slug]/      # Blog listesi ve blog detay sayfaları
      contact/           # İletişim formu (Client Component + sendEmail Server Action)
      projects/[slug]/   # Proje listesi ve proje detay sayfaları
      layout.tsx         # Çevirileri yükler, uygulamayı NextIntlClientProvider ile sarar
      page.tsx           # Ana sayfa
    actions/            # Server Action'lar (sendEmail.ts)
    robots.ts           # robots.txt üretimi
    sitemap.ts          # sitemap.xml üretimi
  components/           # Özelliğe göre gruplanmış UI bileşenleri (about, blogs, projects, contact, layout, ui)
  lib/                  # Supabase client, veri sorgu fonksiyonları, kategori haritaları, format yardımcıları
  data/                 # Statik yedek veri (Supabase erişilemezse kullanılır)
  types/                # Ortak TypeScript tipleri (Project, Blog, Experience, Education, ...)
  messages/              # next-intl çeviri dosyaları (en.json, tr.json)
  i18n/                  # next-intl yönlendirme ve request konfigürasyonu
```

## Başlarken

Depoyu klonlayın ve bağımlılıkları kurun:

```bash
git clone https://github.com/serdararici/serdar-arici-portfolio.git
cd serdar-arici-portfolio
npm install
```

Proje kök dizininde bir `.env.local` dosyası oluşturun ve şu değişkenleri ekleyin:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

Ardından geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Siteyi görmek için [http://localhost:3000](http://localhost:3000) adresini açın.

## Veritabanı

İçerik, Supabase Postgres veritabanından sunulur. Başlıca tablolar:

- **`projects`** — başlık, kategori, açıklama, teknoloji yığını, bağlantılar (GitHub/canlı/Kaggle), galeri ve satır bazlı Türkçe çeviriler (`*_tr` alanları)
- **`blogs`** — başlık, özet, markdown içerik, kapak görseli, galeri, ilgili bağlantılar (Medium/GitHub/YouTube) ve satır bazlı Türkçe çeviriler

Diğer tablolar (`experiences`, `education`, `skills`, `certifications`) Hakkımda sayfasını besler.

## Lisans

MIT Lisansı.

## İletişim

- GitHub: [@serdararici](https://github.com/serdararici)
- LinkedIn: [linkedin.com/in/serdararici](https://linkedin.com/in/serdararici)
