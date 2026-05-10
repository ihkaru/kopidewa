# SOP (Standar Operasional Prosedur) Otomasi Pengumpulan Data SP2KP
**Pemerintah Kabupaten Mempawah - Platform Kopidewa**

## 1. Tujuan
SOP ini bertujuan untuk memberikan panduan standar dalam pelaksanaan pengumpulan data harga komoditas (ingestion) secara otomatis dari SP2KP Kementerian Perdagangan dan proses analisis menggunakan Kecerdasan Buatan (AI) pada platform Kopidewa.

## 2. Ruang Lingkup
Prosedur ini mencakup proses otomatis penarikan data harian, sanitasi data, analisis volatilitas oleh AI Agent, hingga penyimpanan data ke dalam *database* Pemerintah Kabupaten Mempawah.

## 3. Pihak Terlibat
1. **Sistem n8n (Automated Engine):** Eksekutor penarikan dan pemrosesan data.
2. **AI Agent (Gemini-3-Flash):** Pemroses narasi analisis data harga.
3. **Admin TPID / Pengelola Data:** Pengawas sistem dan validator hasil akhir (jika diperlukan).

## 4. Definisi API dan Layanan Terintegrasi
Proses ini melibatkan beberapa antarmuka pemrograman aplikasi (API) berikut:
1. **Endpoint SP2KP Kemendag:** Endpoint sumber data harga komoditas.
2. **API AI Agent (https://ai.dvlpid.my.id/v1):** Layanan pemrosesan bahasa alami (LLM) untuk mendeteksi anomali dan membuat laporan naratif. Menggunakan standar koneksi OpenAI-compatible.
3. **API Kopidewa Backend (/api/analisis-harga):** Endpoint internal untuk menerima dan menyimpan hasil pemrosesan ke dalam basis data daerah.

## 5. Prosedur Otomasi (Alur Kerja)
### 5.1. Penjadwalan (Scheduling)
1. Sistem n8n dipicu secara otomatis (*cron-trigger*) 4 kali sehari (pukul 07:00, 09:00, 12:00, dan 17:00 WIB).
2. Trigger ini memulai alur kerja (*workflow*) tanpa intervensi manual.

### 5.2. Ekstraksi Data (Data Ingestion)
1. Engine mengirimkan *HTTP Request* ke portal SP2KP untuk mengambil data harga komoditas pangan pokok dan penting di Kabupaten Mempawah.
2. Data mentah (JSON/HTML) diuraikan (*parsing*) ke dalam struktur data yang dapat diproses.

### 5.3. Pemrosesan Analisis oleh AI Agent
1. Data harga yang telah terstruktur dikirim ke **AI Agent**.
2. AI Agent menggunakan instruksi sistem (System Prompt) untuk mengevaluasi volatilitas, membandingkan tren 5 hari terakhir (menggunakan *Window Buffer Memory*), dan menentukan tingkat kondisi (AMAN/WASPADA/EKSTREM).
3. AI menghasilkan output berupa *policy brief* / narasi statistik dalam format JSON.

### 5.4. Sanitasi dan Penyimpanan (Data Storage)
1. Output dari AI dibersihkan dari karakter yang tidak perlu (seperti tag *Markdown*).
2. Data digabungkan (*batching*) menjadi satu *array* berukuran besar.
3. Data dikirimkan secara massal (Batch POST) ke API Kopidewa Backend.
4. Backend menyimpan *snapshot* data ke dalam tabel `analisis_harga` dan `analisis_data_based_alerts` tanpa menyebabkan *deadlock* basis data.

## 6. Pemantauan dan Mitigasi Kesalahan
1. **Monitoring:** Admin TPID dapat memantau *log* eksekusi n8n untuk memastikan tidak ada *node* yang gagal.
2. **Error Handling:** Jika API SP2KP atau API AI mengalami gangguan (*timeout/500 Error*), sistem akan mencatat *error* di panel n8n dan proses akan diulang secara manual atau pada siklus hari berikutnya.

---
**Disahkan Oleh:** Ketua Tim Teknis TPID Kabupaten Mempawah
**Tanggal Revisi:** 10 Mei 2026
