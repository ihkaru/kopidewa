
export const termDefinitions = {
  analysis_confidence: {
    title: "Tingkat Keyakinan Analisis",
    definition: "Tingkat keyakinan analisis berdasarkan kelengkapan dan kejelasan data. HIGH: Data lengkap, pola jelas. MEDIUM: Data cukup, pola terlihat. LOW: Data terbatas, pola tidak jelas."
  },
  deviation_from_average: {
    title: "Deviasi Harga dari Rata-rata",
    definition: "Mengukur seberapa jauh harga saat ini menyimpang dari harga rata-ratanya dalam periode tertentu (misal, 90 hari). Nilai negatif berarti harga saat ini di bawah rata-rata, sedangkan nilai positif berarti di atas rata-rata."
  },
  condition_level: {
    title: "Level Kondisi Harga",
    definition: "Klasifikasi kondisi harga berdasarkan intensitas pergerakannya. STABIL: Pergerakan normal. FLUKTUATIF: Perlu pemantauan. BERGEJOLAK: Perlu analisis mendalam. EKSTREM: Pergerakan sangat tidak normal, memerlukan analisis kritis."
  },
  volatility_index: {
    title: "Indeks Volatilitas",
    definition: "Ukuran statistik yang menunjukkan tingkat fluktuasi atau ketidakstabilan harga suatu komoditas. Nilai yang lebih tinggi menandakan risiko dan ketidakpastian yang lebih besar."
  },
  trend_direction: {
    title: "Arah Tren",
    definition: "Menunjukkan arah umum pergerakan harga dalam periode waktu tertentu, apakah itu NAIK, TURUN, atau SIDEWAYS (datar)."
  },
  statistical_significance: {
    title: "Signifikansi Statistik",
    definition: "Menilai apakah pergerakan harga yang teramati adalah sebuah anomali yang nyata secara statistik, atau kemungkinan besar hanya merupakan fluktuasi acak yang normal."
  },
  key_observation: {
    title: "Observasi Kunci",
    definition: "Ringkasan atau temuan paling penting dari analisis data harga, yang seringkali mengaitkan harga saat ini dengan konteks kebijakan seperti Harga Acuan Penjualan (HAP) atau faktor eksternal yang signifikan."
  },
  current_position: {
    title: "Posisi Harga Saat Ini",
    definition: "Membandingkan harga saat ini dengan rata-rata historisnya (misalnya, rata-rata 90 hari) untuk memberikan perspektif jangka panjang dan mengidentifikasi deviasi dari norma."
  },
  price_pattern: {
    title: "Pola Harga",
    definition: "Mengidentifikasi pola spesifik dari data historis harga, seperti 'level shift' (pergeseran tiba-tiba ke level harga baru) atau 'gradual increase' (kenaikan bertahap)."
  },
  volatility_analysis: {
    title: "Analisis Volatilitas",
    definition: "Analisis mendalam tentang tingkat volatilitas menggunakan indikator statistik seperti Coefficient of Variation (CV) untuk mengukur dispersi atau sebaran harga dari nilai rata-ratanya."
  },
  trend_analysis: {
    title: "Analisis Tren",
    definition: "Menganalisis arah dan kekuatan tren harga dalam berbagai jangka waktu (misalnya, mingguan dan bulanan) untuk memahami momentum dan arah pasar."
  },
  causal_hypothesis: {
    title: "Hipotesis Kausal",
    definition: "Sebuah dugaan terdidik mengenai kemungkinan penyebab utama di balik pergerakan harga, yang didasarkan pada korelasi antara data harga dengan faktor eksternal seperti cuaca, musim, atau kebijakan."
  },
  potential_impact_framing: {
    title: "Kerangka Dampak Potensial",
    definition: "Sebuah kerangka untuk memahami bagaimana pergerakan harga suatu komoditas dapat berpotensi mempengaruhi berbagai aspek ekonomi dan sosial masyarakat, seperti daya beli konsumen atau biaya produksi usaha kecil."
  },
  stakeholder_specific_considerations: {
    title: "Pertimbangan Spesifik Stakeholder",
    definition: "Pertanyaan kunci atau poin monitor yang dirancang khusus untuk setiap pemangku kepentingan (stakeholder) TPID, seperti Dinas Perdagangan atau Dinas Pertanian, untuk memicu verifikasi dan tindakan yang relevan."
  },
  data_based_alerts: {
    title: "Peringatan Berbasis Data",
    definition: "Peringatan otomatis yang dipicu oleh data ketika pergerakan harga melampaui ambang batas yang telah ditentukan, menandakan perlunya perhatian khusus."
  },
  monitoring_suggestions: {
    title: "Saran Monitoring",
    definition: "Saran konkret tentang variabel atau indikator apa yang harus dipantau secara ketat oleh tim TPID untuk mengantisipasi pergerakan harga selanjutnya."
  },
  pattern_implications: {
    title: "Implikasi Pola",
    definition: "Menjelaskan kemungkinan konsekuensi atau arti dari pola harga yang teridentifikasi. Misalnya, pola lonjakan cepat bisa berimplikasi pada terbentuknya level harga keseimbangan baru."
  },
  key_metrics_to_watch: {
    title: "Metrik Kunci untuk Dipantau",
    definition: "Data atau metrik spesifik (misal: volume pasokan, harga di tingkat petani) yang harus dipantau secara ketat karena memiliki pengaruh besar terhadap pergerakan harga."
  },
  data_quality_notes: {
    title: "Catatan Kualitas Data",
    definition: "Catatan transparansi mengenai keterbatasan atau fitur spesifik dari data yang digunakan dalam analisis, yang dapat mempengaruhi tingkat keyakinan pada hasil."
  },
  additional_data_suggestions: {
    title: "Saran Data Tambahan",
    definition: "Rekomendasi untuk mengumpulkan data tambahan yang dapat memperkaya, memvalidasi, atau memperdalam analisis di masa depan."
  },
  short_term_outlook: {
    title: "Prospek Jangka Pendek",
    definition: "Perkiraan atau indikasi pergerakan harga dalam jangka pendek (biasanya 1-7 hari ke depan) berdasarkan data dan pola terkini."
  },
  pattern_sustainability: {
    title: "Keberlanjutan Pola",
    definition: "Sebuah penilaian apakah pola harga yang sedang berlangsung saat ini kemungkinan besar akan berlanjut atau akan segera berubah, berdasarkan analisis faktor-faktor pendukungnya."
  },
  statistical_warnings: {
    title: "Peringatan Statistik",
    definition: "Peringatan yang didasarkan pada anomali statistik dalam data, seperti pergerakan harga yang sangat jarang terjadi (misal: di luar 2 standar deviasi)."
  },
  data_constraints: {
    title: "Keterbatasan Data",
    definition: "Menjelaskan batasan-batasan spesifik dalam data yang digunakan (misal: hanya dari satu pasar) yang dapat mempengaruhi keakuratan atau generalisasi dari hasil analisis."
  },
  assumptions_made: {
    title: "Asumsi yang Digunakan",
    definition: "Secara transparan menyatakan asumsi-asumsi yang dibuat selama proses analisis yang mendasari kesimpulan (misal: mengasumsikan data pasar A representatif)."
  },
  external_factors_note: {
    title: "Catatan Faktor Eksternal",
    definition: "Sebuah pengingat bahwa ada faktor-faktor eksternal lain (misal: kebijakan nasional, biaya logistik) yang tidak dimasukkan dalam model analisis ini dan dapat mempengaruhi harga."
  }
};
