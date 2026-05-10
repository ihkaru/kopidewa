# Gemini AI Integration (Kopidewa TPID Intelligence Core)

Sistem Kopidewa menggunakan model bahasa besar (LLM) **Gemini-3-Flash** (Google) untuk melakukan pemrosesan analisis data tingkat lanjut secara otomatis. Integrasi ini bertindak sebagai **"Senior Statistical Analyst"** buatan yang berjalan di balik layar tanpa intervensi manusia.

## 1. Peran dan Fungsi AI dalam Sistem
AI di dalam Kopidewa berfungsi untuk:
*   **Contextual Understanding:** Tidak sekadar melihat angka harga hari ini, melainkan mempertimbangkan tren masa lalu (retrospective memory).
*   **Volatility Detection:** Menentukan apakah lonjakan/penurunan harga (CV/Coefficient of Variation) masuk akal atau merupakan anomali.
*   **Policy Brief Generation:** Mengubah deretan angka teknis menjadi kalimat laporan/wawasan (insight) yang mudah dipahami oleh pengambil kebijakan (Bupati/Ketua TPID).

## 2. Arsitektur Integrasi
Integrasi AI pada Kopidewa difasilitasi oleh **n8n (Workflow Automation)** menggunakan node *AI Agent*.

### Endpoint Configuration
Sistem menggunakan *OpenAI-compatible endpoint* untuk berinteraksi dengan model Gemini:
*   **Base URL:** `https://ai.dvlpid.my.id/v1` (Custom proxy endpoint).
*   **Model:** `gemini-3-flash`
*   **Temperature:** `0.2` (Rendah, agar output yang dihasilkan stabil, analitis, dan tidak berhalusinasi).

### Memory System
Sistem menggunakan **Window Buffer Memory** di n8n dengan `sessionId: "kopidewa-daily-analysis"`.
*   **Tujuan:** Mengizinkan AI untuk "mengingat" hingga 5 interaksi (analisis) terakhir. Ini sangat penting agar AI mengetahui jika suatu komoditas telah mengalami kenaikan berturut-turut dalam beberapa hari terakhir.

## 3. Skema Data (Input & Output)
AI menerima *prompt* berisi data harga mentah dan diinstruksikan untuk selalu mengembalikan data dalam format **JSON** baku.

### Struktur Prompt Utama
Sistem menginstruksikan AI dengan peran spesifik:
> *"You are a Senior TPID (Regional Inflation Control Team) Analyst for Kabupaten Mempawah. Your task is to provide strategic, data-driven analysis based on price movements. Always output in valid JSON as per the requested schema."*

### Contoh Output JSON dari AI
```json
{
    "metadata": {
        "commodity_name": "Ketimun Sedang, 1 kg",
        "analysis_date": "2026-05-10",
        "analysis_confidence": "MEDIUM"
    },
    "price_condition_assessment": {
        "condition_level": "EKSTREM",
        "trend_direction": "NAIK",
        "key_observation": "Terjadi lonjakan tajam sebesar 80% dalam satu hari."
    },
    "data_insights": {
        "current_position": "Harga tertinggi dalam 90 hari terakhir."
    }
}
```

## 4. Keamanan dan Validasi (Sanitasi)
Output dari AI terkadang menyertakan *Markdown code block* (contoh: ` ```json `).
Sistem Kopidewa memiliki mekanisme sanitasi di *backend* (maupun di node n8n) yang secara otomatis membuang tag markdown tersebut dan melakukan `JSON.parse()` dengan aman (aman dari injeksi dan error format).
