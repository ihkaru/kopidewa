# 🦅 Kopidewa (Kolaborasi Pengendalian Inflasi Daerah)

[![Laravel](https://img.shields.io/badge/Backend-Laravel_11-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![Vue.js](https://img.shields.io/badge/Frontend-Vue.js_3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Quasar](https://img.shields.io/badge/UI_Framework-Quasar_2-1976D2?style=for-the-badge&logo=quasar&logoColor=white)](https://quasar.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

**Kopidewa** adalah ekosistem digital terpadu yang dirancang khusus untuk **Tim Pengendali Inflasi Daerah (TPID)**. Sistem ini menggabungkan *Intelligence Core* (Backend) yang kuat dengan *Interactive Dashboard* (Frontend) modern untuk memantau, menganalisis, dan melaporkan stabilitas harga pangan secara *real-time*.

> 🚀 **Filosofi ATM (Amati, Tiru, Modifikasi)**: Proyek ini dibangun sebagai platform *open-source* yang memungkinkan setiap Kabupaten/Kota di Indonesia untuk menduplikasi dan mengadaptasi sistem pengendalian inflasi ini dalam waktu singkat.

---

## 🏗️ Struktur Monorepo

Sistem ini dikelola dalam satu repositori (*monorepo*) untuk mempermudah sinkronisasi antara logika bisnis dan tampilan pengguna:

- **[`/apps/backend`](./apps/backend)**: **Intelligence Core**. Dibangun dengan Laravel 11. Menangani *data ingestion* (SP2KP & Google Sheets), analisis statistik volatilitas, integrasi data cuaca, dan generasi laporan berbasis AI.
- **[`/apps/frontend`](./apps/frontend)**: **Interactive Dashboard**. Dibangun dengan Vue 3 & Quasar. Memberikan visualisasi data yang responsif, grafik tren interaktif, dan dukungan PWA (*Progressive Web App*).

---

## ✨ Fitur Utama

### 🧠 Intelligence Core (Backend)
- **Multi-Source Ingestion**: Tarik data otomatis dari **SP2KP Kemendag** dan **Google Sheets**.
- **Context-Aware AI**: Analisis volatilitas menggunakan *Coefficient of Variation* (CV) dan korelasi data cuaca historis.
- **HET Monitoring**: Peringatan otomatis jika harga melampaui Harga Eceran Tertinggi.
- **Naratif AI**: Menghasilkan draf laporan strategis siap pakai untuk rapat pimpinan daerah.

### 📈 Interactive Dashboard (Frontend)
- **Real-time Visualization**: Tren harga komoditas dalam grafik yang interaktif dan mudah dipahami.
- **White-Label Ready**: Konfigurasi identitas instansi, logo, dan wilayah hanya melalui file `.env`.
- **Responsive & PWA**: Akses lancar dari Desktop, Tablet, hingga Smartphone.

---

## 🚀 Memulai (Quick Start)

### 1. Persiapan Awal
Pastikan Anda memiliki PHP 8.2+, Node.js 18+, dan Composer terinstal.

### 2. Backend Setup
```bash
cd apps/backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### 3. Frontend Setup
```bash
cd apps/frontend
npm install
cp .env.example .env
npm run dev
```

---

## 🛠️ Stack Teknologi & Integrasi API

| Komponen / API | Teknologi / Layanan |
| :--- | :--- |
| **Backend Framework** | Laravel 11.x (PHP 8.2) |
| **Frontend Framework** | Vue.js 3 (Composition API) |
| **UI Kit** | Quasar Framework (Material Design) |
| **Database** | MySQL / PostgreSQL |
| **Data Ingestion API** | SP2KP Kementerian Perdagangan (Interoperabilitas Data) |
| **AI Analyst API** | Gemini-3-Flash (via OpenAI-compatible Custom Endpoint) 👉 [Lihat Dokumentasi AI](./docs/gemini.md) |
| **Analysis / Stats** | Coefficient of Variation, Visual Crossing Weather API |

---

## 🤝 Kontribusi & Kolaborasi

Kami sangat mengundang kolaborasi dari seluruh pengembang dan Pemerintah Daerah di Indonesia. Jika Anda memiliki ide fitur baru, perbaikan bug, atau ingin menambahkan adaptor data sumber baru, silakan ajukan *Pull Request*.

## 📄 Lisensi

Ekosistem Kopidewa bersifat *Open Source* di bawah lisensi **[MIT License](https://opensource.org/licenses/MIT)**. Bebas digunakan dan dimodifikasi untuk kepentingan publik dan kemajuan ekonomi daerah.

---

<p align="center">
  <b>Dikembangkan untuk Stabilitas Ekonomi Daerah</b><br>
  <i>Amati • Tiru • Modifikasi</i>
</p>
