export default {
  // App Identifiers
  appName: process.env.VITE_APP_NAME || "KOPI DEWA",
  appSubtitle: process.env.VITE_APP_SUBTITLE || "Kolaborasi Pengendalian Inflasi Daerah Kabupaten Mempawah",
  
  // Region Details
  region: {
    id: process.env.VITE_REGION_ID || "mempawah",
    name: process.env.VITE_REGION_NAME || "Kabupaten Mempawah",
    district: process.env.VITE_REGION_DISTRICT || "Mempawah Hilir",
    coordinates: {
      lat: process.env.VITE_REGION_LAT || 0.36,
      lng: process.env.VITE_REGION_LNG || 108.96,
    }
  },

  // Institution Details
  institution: {
    name: process.env.VITE_INSTITUTION_NAME || "Dinas Perdagangan, Perindustrian dan Tenaga Kerja Kabupaten Mempawah",
    address: process.env.VITE_INSTITUTION_ADDRESS || "Jalan Raden Kusno, Kelurahan Tengah, Kecamatan Mempawah Hilir",
    cityStateZip: process.env.VITE_INSTITUTION_CITY_ZIP || "Kabupaten Mempawah, Kalimantan Barat 78912",
    phone: process.env.VITE_INSTITUTION_PHONE || "(0561) 691037",
    email: process.env.VITE_INSTITUTION_EMAIL || "perindagnakerdinas@gmail.com",
    copyrightYear: process.env.VITE_COPYRIGHT_YEAR || new Date().getFullYear(),
  },

  // Asset Paths (Relative to public/assets or served via URL)
  assets: {
    logoMain: process.env.VITE_LOGO_MAIN || "MPW.png",
    logoPartner: process.env.VITE_LOGO_PARTNER || "BPS.png",
  }
};
