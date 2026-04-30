# Panduan Replikasi & Instalasi Frontend (ATM)

Dokumen ini menjelaskan cara menduplikasi (replikasi) dan menjalankan frontend aplikasi ini untuk daerah Anda sendiri. Prinsip yang digunakan adalah **ATM (Amati, Tiru, Modifikasi)**.

## 📋 Prasyarat

Pastikan komputer Anda sudah terinstall:

- **Node.js** (Versi 18 atau 20 direkomendasikan)
- **NPM** (Biasanya sudah satu paket dengan Node.js)
- **Backend API** yang sudah berjalan (lihat panduan backend terpisah)

## 🚀 Langkah 1: Instalasi

1.  **Clone Repository** (atau download source code).
2.  Buka terminal di folder project ini.
3.  Install dependencies:
    ```bash
    npm install
    ```

## ⚙️ Langkah 2: Konfigurasi Identitas Daerah

Kami telah memusatkan semua konfigurasi di environment variable agar Anda tidak perlu mengedit kode program secara mendalam.

1.  **Buat File Environment**
    Salin file `.env.example` menjadi `.env`.

    ```bash
    cp .env.example .env
    # Atau di Windows: copy .env.example .env
    ```

2.  **Edit `.env`**
    Buka file `.env` dan sesuaikan nilainya:

    ```env
    # --- Identitas Aplikasi ---
    VITE_APP_NAME="SIMPANG"
    VITE_APP_SUBTITLE="Sistem Pemantauan Harga Kabupaten Kubu Raya"

    # --- Konfigurasi Wilayah ---
    VITE_REGION_ID="kuburaya"
    VITE_REGION_NAME="Kabupaten Kubu Raya"
    VITE_REGION_DISTRICT="Sungai Raya"
    # Koordinat Peta (Ambil dari Google Maps)
    VITE_REGION_LAT=-0.123
    VITE_REGION_LNG=109.123

    # --- Kontak Instansi ---
    VITE_INSTITUTION_NAME="Dinas Koperasi dan UKM Kubu Raya"
    VITE_INSTITUTION_ADDRESS="Jalan Arteri Supadio No. 1"
    VITE_INSTITUTION_PHONE="(0561) 123456"
    VITE_INSTITUTION_EMAIL="info@kuburaya.go.id"

    # --- Koneksi ke Backend ---
    # Ganti dengan URL backend lokal atau production Anda
    VITE_API_BASE_URL="http://127.0.0.1:8000/api"
    ```

## 🖼️ Langkah 3: Ganti Aset (Logo)

letakkan file logo anda di folder `public/assets/`.

1.  **Logo Utama**: Simpan logo instansi/aplikasi Anda (misal `logo-kuburaya.png`).
2.  **Logo Partner**: Simpan logo partner, misalnya BPS (misal `logo-bps.png`).
3.  Update di `.env`:
    ```env
    VITE_LOGO_MAIN="logo-kuburaya.png"
    VITE_LOGO_PARTNER="logo-bps.png"
    ```

## 🗺️ Langkah 4: Detail Wilayah (Kecamatan & Pasar)

Beberapa data terlalu kompleks untuk `.env`. Silakan edit file:
📂 `src/config/region.js`

Ganti daftar kecamatan dan pasar sesuai daerah Anda:

```javascript
export default {
  WILAYAH_LABELS: {
    "001": "Kecamatan Sungai Raya",
    "002": "Kecamatan Rasau Jaya",
    // ... id kecamatan lainnya
  },
  KECAMATAN_PASAR: {
    "001": "Pasar Melati",
    "002": "Pasar Rasau",
    // ... mapping kecamatan ke nama pasar utama
  },
  // ID Kecamatan default yang terpilih saat pertama buka
  DEFAULT_SELECTED_WILAYAH: "001",
};
```

## ▶️ Langkah 5: Jalankan Aplikasi

Jalankan server development:

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:9100` (atau port lain jika 9100 dipakai).

## 🔨 Build untuk Production

Jika sudah siap untuk di-deploy ke server hosting:

```bash
npm run build
```

Hasil build akan ada di folder `dist/spa`. Folder inilah yang di-upload ke hosting (cPanel, VPS, dll).

## ❓ FAQ

**Q: Grafik tidak muncul?**
A: Pastikan `VITE_API_BASE_URL` di `.env` sudah benar mengarah ke backend yang aktif.

**Q: Bagaimana cara ganti warna tema?**
A: Saat ini warna tema masih diatur di CSS global (`src/css/app.scss` atau `quasar.config.js`). Kami berencana memindahkannya ke config di versi berikutnya.
