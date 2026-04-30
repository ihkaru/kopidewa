# Panduan Instalasi & Pengaturan Harga (Aplikasi Analisis TPID)

Panduan ini menjelaskan cara menginstal dan mengatur aplikasi ini di komputer lokal Anda. Aplikasi ini dirancang dengan konsep **ATM (Amati, Tiru, Modifikasi)**, sehingga mudah disesuaikan untuk wilayah TPID (Tim Pengendali Inflasi Daerah) mana pun.

## Prasyarat (Apa yang Harus Disiapkan)

Sebelum memulai, pastikan komputer Anda sudah terinstall:

-   **PHP 8.2** atau lebih baru.
-   **Composer** (Manajer paket untuk PHP).
-   **MySQL** (Database).
-   **Node.js & npm** (Opsional, hanya jika Anda ingin mengubah tampilan/frontend).

## Cara Instalasi

Ikuti langkah-langkah berikut secara berurutan:

1.  **Clone Repository**
    Unduh kode sumber (source code) ke komputer Anda.

2.  **Install Library Pendukung**
    Buka terminal/command prompt di folder project, lalu jalankan:
    ```bash
    composer install
    ```

3.  **Pengaturan Environment (Kunci Utama)**
    Aplikasi membutuhkan file pengaturan bernama `.env`. Kita akan membuatnya dari contoh yang sudah ada.
    -   Salin file `.env.example` dan ubah namanya menjadi `.env`.
        ```bash
        cp .env.example .env
        ```
        *(Atau jika di Windows Explorer, copy paste file `.env.example` lalu rename hasil copy-nya menjadi `.env`)*

4.  **Konfigurasi ATM (PENTING)**
    Buka file `.env` yang baru saja Anda buat dengan text editor (seperti Notepad, VS Code). Cari bagian **ATM Configuration**. Di sinilah Anda menyesuaikan aplikasi untuk wilayah Anda.

## Konfigurasi ATM (Amati, Tiru, Modifikasi)

Di bagian ini, Anda bisa mengubah target wilayah analisis sesuai kebutuhan Anda.

### 1. Identitas Wilayah
Ubah bagian ini sesuai nama daerah Anda.

```env
# ID Wilayah (gunakan huruf kecil, tanpa spasi)
TPID_REGION_ID=mempawah

# Nama Resmi Daerah (untuk tampilan di laporan)
TPID_REGION_NAME="Kabupaten Mempawah"

# Nama Kecamatan Utama (untuk filter data pasar)
TPID_DISTRICT="Mempawah Hilir"

# Koordinat (Lintang & Bujur)
# Bisa dicari di Google Maps (klik kanan di lokasi -> ada angka koordinat)
TPID_LATITUDE=0.36
TPID_LONGITUDE=108.96
```

### 2. Sumber Data SP2KP (Kemendag)
Aplikasi ini mengambil data harga dari SP2KP Kemendag. Anda butuh **ID Pasar** daerah Anda.
-   Buka [SP2KP](https://sp2kp.kemendag.go.id/).
-   Cari pasar di wilayah Anda.
-   Anda mungkin perlu sedikit "mengintip" URL atau menggunakan *Inspect Element* untuk menemukan ID Pasar (biasanya berupa angka, misal `517`).

```env
SP2KP_PASAR_ID=517
```

### 3. Integrasi Google Sheets
Jika Anda memiliki data harga sendiri di Google Sheets, masukkan ID-nya di sini. ID adalah kode acak panjang di URL Spreadsheet Anda (antara `/d/` dan `/edit`).

```env
GOOGLE_SHEET_ID_HARGA=id_sheet_anda_disini
GOOGLE_SHEET_ID_GABUNGAN=id_sheet_gabungan_disini
```

### 4. Data Cuaca (Visual Crossing)
Agar AI bisa menganalisis dampak cuaca, Anda butuh API Key dari Visual Crossing.
-   Daftar akun gratis di [Visual Crossing](https://www.visualcrossing.com/).
-   Salin API Key Anda ke sini:

```env
WEATHER_API_KEY=kunci_api_anda_disini
```


### 5. Logika Sumber Data (Data Source Logic)
Aplikasi ini mendukung dua metode pengambilan data harga (bisa diatur di `.env`).

**Skenario A: Gunakan SP2KP Saja (Direkomendasikan)**
Jika pasar Anda sudah terdata di SP2KP Kemendag.
-   Set `PULL_FROM_SP2KP=true`
-   Set `SP2KP_PASAR_ID` sesuai ID Pasar Anda.
-   Aplikasi akan otomatis menarik data harian dari API SP2KP.

**Skenario B: Gunakan Google Sheets (Manual/Custom)**
Jika Anda ingin input data manual atau punya data historis sendiri.
-   Set `PULL_FROM_GSHEET=true`
-   Isi `GOOGLE_SHEET_ID_HARGA` dan `GOOGLE_SHEET_ID_GABUNGAN`.
-   Pastikan struktur kolom sheet Anda sesuai dengan template di bawah ini.

### 6. Template Google Sheets

Jika Anda memilih **Skenario B**, Anda **HARUS** mengikuti struktur ini agar aplikasi tidak error.
Silakan akses template (View Only) berikut, lalu pilih menu **File > Make a Copy** untuk menyalin ke Google Drive Anda.

**Template 1: Data Utama (Komoditas & Harga Harian)**
> **[🔗 KLIK DISINI - TEMPLATE HARGA & KOMODITAS](https://docs.google.com/spreadsheets/d/19T2PxHgnWvwLmVa-xfnQ9mlV0Qp0NtpAw57VMvKkvCk/edit?usp=sharing)**
*Gunakan ID Sheet ini untuk `GOOGLE_SHEET_ID_HARGA`*

**Template 2: Data Gabungan (Opsional)**
> **[🔗 KLIK DISINI - TEMPLATE DATA GABUNGAN](https://docs.google.com/spreadsheets/d/1h_q8lzW-pVjTIVnEAtMnC3Wn-cMKRuktR42HgTBmpHM/edit?usp=sharing)**
*Gunakan ID Sheet ini untuk `GOOGLE_SHEET_ID_GABUNGAN`*

**Detail Struktur Kolom (Template 1):**

**Sheet 1: `Analysis_Komoditas`**
Digunakan untuk mendaftarkan barang apa saja yang ingin dipantau.
- **Kolom A**: `id_komoditas` (Angka unik, misal: 1, 2, 3)
- **Kolom B**: `nama` (Nama Barang, misal: Beras Premium)

**Sheet 2: `Analysis_Basis Data Long`**
Digunakan untuk input harga harian (jika manual).
- **Kolom A-L**: Sesuai urutan berikut: `id_komoditas_harian`, `id_komoditas_pekanan`, `id_komoditas_bulanan`, `id_pekan`, `tanggal` (dd/mm/yyyy), `id_komoditas`, `tahun`, `bulan`, `tanggal_angka`, `harga`, `responden`, `kecamatan`.

**Sheet 3: `Analysis_Basis Data Long Rekap`** (Metadata)
Kunci penting untuk memberi tahu aplikasi berapa banyak baris data yang harus dibaca.
- **Sel B2**: Masukkan rumus `=COUNTA('Analysis_Basis Data Long'!A:A)` agar aplikasi tahu jumlah baris data secara otomatis.

## Menjalankan Aplikasi

Setelah konfigurasi selesai, jalankan perintah berikut di terminal:

1. **Generate Kunci Aplikasi**:
   ```bash
   php artisan key:generate
   ```
2. **Siapkan Database**:
   Pastikan Anda sudah membuat database kosong (misal namanya `harga`) di MySQL, lalu sesuaikan koneksi database di file `.env` (bagian `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`). Lalu jalankan:
   ```bash
   php artisan migrate
   ```
3. **Isi Data Awal (Seeding)**:
   Sangat penting! Langkah ini akan mengambil data komoditas dan harga awal dari sumber yang sudah Anda konfigurasi.
   ```bash
   php artisan db:seed
   ```
4. **Jalankan Server**:
   ```bash
   php artisan serve
   ```
   Aplikasi sekarang bisa diakses di: `http://localhost:8000`.

## Cara Menggunakan (Developer)

Aplikasi ini berbasis API (Backend Only). Anda bisa mengaksesnya lewat Browser atau Postman:

- **Cek Harga**: `GET http://localhost:8000/api/harga`
- **Buat Analisis TPID**: `GET http://localhost:8000/api/tpid/report/generate?id_komoditas=10`
   *(Ganti `id_komoditas` dengan ID komoditas yang ingin dianalisis)*

## Butuh Bantuan?
Fokus utama adalah di file `App\Services\TpidReportService.php`. Di sana logika "otak" analisis berada. Jangan ragu untuk memodifikasi *prompt* di sana agar sesuai dengan gaya bahasa daerah Anda.
