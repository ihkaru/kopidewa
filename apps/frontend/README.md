# Dashboard Pengendalian Inflasi & Harga Komoditas

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Vue.js](https://img.shields.io/badge/vue.js-3.x-green.svg) ![Quasar](https://img.shields.io/badge/quasar-2.x-blue.svg)

> **Solusi digital untuk Tim Pengendali Inflasi Daerah (TPID) dalam memantau stabilitas harga pangan secara real-time.**

Aplikasi ini adalah frontend modern yang dirancang untuk memvisualisasikan data harga komoditas pasar secara interaktif. Dibangun dengan filosofi **ATM (Amati, Tiru, Modifikasi)**, proyek ini terstruktur agar mudah direplikasi dan dikustomisasi oleh Pemerintah Daerah (Pemda) manapun di Indonesia tanpa perlu menulis ulang kode dari nol.

---

## 🌟 Fitur Utama

- **📈 Visualisasi Harga Real-time**: Grafik interaktif untuk memantau tren kenaikan/penurunan harga pangan.
- **🤖 AI-Powered Analysis**: Integrasi dengan analisis cerdas untuk mendeteksi anomali harga dan memberikan rekomendasi kebijakan (via Backend).
- **🌍 Multi-Region Ready**: Konfigurasi wilayah yang terpusat memungkinkan adaptasi cepat untuk Kabupaten/Kota lain hanya dengan mengubah `.env`.
- **📱 Responsive Design**: Tampilan optimal di Desktop, Tablet, dan Mobile (PWA Ready).
- **🏛️ White-Label Friendly**: Mudah mengganti Logo, Nama Instansi, dan Kontak Daerah.

## 🚀 Mulai Cepat (Quick Start)

Kami telah menyusun panduan komprehensif agar Anda bisa menjalankan aplikasi ini dalam hitungan menit.

### 1. Instalasi & Replikasi

Untuk panduan langkah-demi-langkah mengatur identitas daerah Anda:

👉 **[BACA PANDUAN REPLIKASI (SETUP_GUIDE.md)](./SETUP_GUIDE.md)** 👈

### 2. Jalankan Development

Jika konfigurasi di atas sudah selesai:

```bash
# Install dependencies
npm install

# Jalankan server
npm run dev
```

Akses dashboard di: `http://localhost:9100`

### 3. Build Production

```bash
npm run build
```

File siap deploy akan tersedia di folder `dist/spa`.

## 🛠️ Teknologi

Dibuat dengan stack teknologi modern untuk performa tinggi dan kemudahan pengembangan:

- **Core**: [Vue.js 3](https://vuejs.org/) (Composition API)
- **Framework**: [Quasar Framework](https://quasar.dev/) (Material Design 2)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Charting**: [Chart.js](https://www.chartjs.org/)
- **Animation**: [Anime.js](https://animejs.com/)

## 🤝 Kontribusi & Kolaborasi

Proyek ini dibangun dengan semangat kolaborasi antar daerah. Jika Anda memiliki ide perbaikan atau fitur baru, silakan ajukan _Pull Request_ atau buat _Issue_.

---

<p align="center">
  <b>Dikembangkan untuk Stabilitas Ekonomi Daerah</b><br>
  <i>Amati • Tiru • Modifikasi</i>
</p>
