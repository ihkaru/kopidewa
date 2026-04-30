import { ref } from "vue";
import { useHargaUtils } from "./hargaUtils";
import { useConstants } from "./constants";

export function useUtils() {
  const Harga = useHargaUtils();
  const Constants = useConstants();
  const priceData = ref([]);
  function generatePriceData(startDate, endDate, averageIncreasePercent) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    priceData.value = [];
    let currentPrice = 15000; // harga awal

    // Hitung total hari antara startDate dan endDate
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    for (let i = 0; i <= days; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);

      // Randomize percentage change around averageIncreasePercent
      const randomFactor = Math.random() * 0.2 - 0.115; // -10% to +10%
      const dailyIncrease = averageIncreasePercent / 100 + randomFactor;

      // Update price with daily increase
      currentPrice *= 1 + dailyIncrease;

      priceData.value.push({
        date: currentDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
        price: Math.round(currentPrice),
      });
    }
  }
  function isWithinDays(dateString, days) {
    const today = new Date();
    const date = new Date(dateString);
    // console.log(dateString, date);
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= days;
  }
  function getCurrentDateTime() {
    const now = new Date();

    // Mendapatkan tahun, bulan, dan hari
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const day = String(now.getDate()).padStart(2, "0");

    // Mendapatkan jam, menit, dan detik
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Menggabungkan semua dalam format yang diinginkan
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  function getFormattedDate(today = new Date()) {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dayName = days[today.getDay()];
    const date = today.getDate();
    const monthName = months[today.getMonth()];
    const year = today.getFullYear();

    return `${dayName}, ${date} ${monthName} ${year}`;
  }
  function transformDataArray(dataArray) {
    const today = new Date();

    // Buat kamus simbol dan ikon untuk setiap komoditas
    const komoditasInfo = {
      "Beras Cap Burung Hong (Medium)": {
        symbol: "BCHM",
        icon: "fas fa-seedling",
      },
      "Beras Cap Anggrek (Medium)": { symbol: "BCAM", icon: "fas fa-seedling" },
      "Beras Cap CK (Premium)": { symbol: "BCCK", icon: "fas fa-seedling" },
      "Beras Cap Madu Tupai (Premium)": {
        symbol: "BCMT",
        icon: "fas fa-seedling",
      },
      "Beras SPHP Bulog": { symbol: "BSB", icon: "fas fa-seedling" },
      "Kedelai Impor,1 kg": { symbol: "KDL", icon: "fas fa-seedling" },
      "Cabai Merah Keriting,1 kg": { symbol: "CMK", icon: "fas fa-pepper-hot" },
      "Cabai Merah Besar,1 kg": { symbol: "CMB", icon: "fas fa-pepper-hot" },
      "Cabai Rawit Merah,1 kg": { symbol: "CRM", icon: "fas fa-pepper-hot" },
      "Bawang Merah,1 kg": { symbol: "BM", icon: "fas fa-leaf" },
      "Gula Pasir Curah, 1kg": { symbol: "GPC", icon: "fas fa-cubes" },
      "Gula Pasir Kemasan, 1kg": { symbol: "GPK", icon: "fas fa-cubes" },
      "Minyak Goreng Curah,1 lt": { symbol: "MGC", icon: "fas fa-oil-can" },
      "Minyak Goreng Kemasan Premium,1 lt": {
        symbol: "MGK",
        icon: "fas fa-oil-can",
      },
      "Minyakita,1 lt": { symbol: "MINYAKITA", icon: "fas fa-oil-can" },
      "Tepung Terigu,1 kg": { symbol: "TT", icon: "fas fa-bread-slice" },
      "Daging Ayam Ras Karkas,1 kg": {
        symbol: "DARK",
        icon: "fas fa-drumstick-bite",
      },
      "Telur Ayam Ras,1 kg": { symbol: "TAR", icon: "fas fa-egg" },
      "Daging Sapi Paha Belakang,1 kg": {
        symbol: "DSPB",
        icon: "fas fa-drumstick-bite",
      },
      "Daging Sapi Paha Depan,1 kg": {
        symbol: "DSPD",
        icon: "fas fa-drumstick-bite",
      },
      "Daging Sapi Sandung Lamur,1 kg": {
        symbol: "DSSL",
        icon: "fas fa-drumstick-bite",
      },
      "Daging Sapi Tetelan,1 kg": {
        symbol: "DST",
        icon: "fas fa-drumstick-bite",
      },
      "Ikan Tongkol,1 kg": { symbol: "IT", icon: "fas fa-fish" },
      "Ikan Teri,1 kg": { symbol: "ITERI", icon: "fas fa-fish" },
      "Mie Instan, 1 bks": { symbol: "MI", icon: "fas fa-box" },
      "Bawang Putih Honan,1 kg": { symbol: "BPH", icon: "fas fa-leaf" },
      "Bawang Bombai,1 kg": { symbol: "BB", icon: "fas fa-leaf" },
      "Garam Halus,1 kg": { symbol: "GH", icon: "fas fa-cubes" },
      "Susu Kental Manis, 370 gr": { symbol: "SKM", icon: "fas fa-tint" },
      "Susu Bubuk (Setara Dancow),400 gr": {
        symbol: "SBD",
        icon: "fas fa-tint",
      },
      "Susu Bubuk Balita (Setara SGM),400 gr": {
        symbol: "SBB",
        icon: "fas fa-tint",
      },
      "Tempe Bungkus,1 kg": { symbol: "TB", icon: "fas fa-leaf" },
      "Tahu Putih,1 kg": { symbol: "TP", icon: "fas fa-leaf" },
      "Udang Basah,1 kg": { symbol: "UB", icon: "fas fa-fish" },
      "Pisang Lokal,1 kg": { symbol: "PL", icon: "fas fa-apple-alt" },
      "Jeruk Lokal,1 kg": { symbol: "JL", icon: "fas fa-lemon" },
      "Tomat,1 kg": { symbol: "TOMAT", icon: "fas fa-apple-alt" },
      "Kentang Sedang,1 kg": { symbol: "KS", icon: "fas fa-apple-alt" },
      "Sawi Hijau,1 kg": { symbol: "SH", icon: "fas fa-leaf" },
      "Kangkung,1 kg": { symbol: "KANGKUNG", icon: "fas fa-leaf" },
      "Ketimun Sedang,1 kg": { symbol: "KTS", icon: "fas fa-leaf" },
      "Kacang Panjang,1 kg": { symbol: "KP", icon: "fas fa-leaf" },
      "Ketela Pohon,1 kg": { symbol: "KTP", icon: "fas fa-leaf" },
      "Ayam Kampung Utuh,1 ekor": {
        symbol: "AKU",
        icon: "fas fa-drumstick-bite",
      },
      "Telur Ayam Kampung,1 kg": { symbol: "TAK", icon: "fas fa-egg" },
      "Kacang Hijau,1 kg": { symbol: "KH", icon: "fas fa-seedling" },
      "Kacang Tanah,1 kg": { symbol: "KT", icon: "fas fa-seedling" },
      "Daging Sapi Tetelan, 1 kg": {
        symbol: "DST",
        icon: "fas fa-drumstick-bite",
      },
      "Jagung Lokal Pipilan, 1 kg": {
        symbol: "JLP",
        icon: "fas fa-corn",
      },
      "Jagung Halus, 1 kg": {
        symbol: "JH",
        icon: "fas fa-corn",
      },
      "Tepung Terigu Eceran Protein Tinggi, 1 kg": {
        symbol: "TTP",
        icon: "fas fa-bread-slice",
      },
      "Tepung Terigu Eceran Protein Rendah, 1 kg": {
        symbol: "TTR",
        icon: "fas fa-bread-slice",
      },
      "Ikan Laut Kembung, 1 kg": {
        symbol: "ILK",
        icon: "fas fa-fish",
      },
    };

    return dataArray.map((data) => {
      const prices = data.hargas.map((item) => ({
        date: `${item.tahun}-${item.bulan.padStart(
          2,
          "0"
        )}-${item.tanggal_angka.padStart(2, "0")}`,
        price: parseFloat(item.harga),
      }));
      // console.log(prices);

      // Get the current price as the last price in the list
      const currentPrice = prices[prices.length - 1]?.price || 0;

      // Filter prices based on date ranges
      const sparklineData = {
        "1W": prices
          .filter((item) => isWithinDays(item.date, 7))
          .map((item) => item.price),
        "1M": prices
          .filter((item) => isWithinDays(item.date, 30))
          .map((item) => item.price),
        "3M": prices
          .filter((item) => isWithinDays(item.date, 90))
          .map((item) => item.price),
        YTD: prices
          .filter(
            (item) => new Date(item.date).getFullYear() === today.getFullYear()
          )
          .map((item) => item.price),
        "1Y": prices
          .filter((item) => isWithinDays(item.date, 365))
          .map((item) => item.price),
        ALL: prices.map((item) => item.price),
      };

      const { symbol, icon } = komoditasInfo[data.nama] || {
        symbol: "UNK",
        icon: "fas fa-box",
      };

      return {
        nama: data.nama,
        symbol: symbol,
        icon: icon,
        currentPrice: currentPrice,
        data: data.hargas.map((item) => ({
          date: `${item.tahun}-${item.bulan}-${item.tanggal_angka.padStart(
            2,
            "0"
          )}`,
          price: parseFloat(item.harga),
          kecamatan: item.kecamatan,
        })),
        sparklineData: sparklineData,
      };
    });
  }
  function formatCurrency(number) {
    if (!number) return "";
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  function getObjectById(array, id) {
    return array.find((item) => item.id === id);
  }
  function getObjectByCol(array, col, value) {
    return array.find((item) => item[col] === value);
  }

  function getSparklinePrices(data, period, kecamatan) {
    // Helper function to calculate date ranges

    // Filter data based on kecamatan
    const filteredByKecamatan = data.data.filter(
      (entry) => entry.kecamatan == Constants.WILAYAH_LABELS[kecamatan]
    );

    // Get the date range for the specified period
    const startDate = getDataRange(period);

    // Filter data based on the date range and extract prices
    const sparklinePrices = filteredByKecamatan
      .filter((entry) => new Date(entry.date) >= startDate)
      .map((entry) => entry.price);

    if (sparklinePrices.length < 1) {
      // console.log("Komoditas " + data.nama + " Tanpa sparkline", data, startDate);
    }
    return sparklinePrices;
  }

  function getPriceChange(commodity, period, kecamatan) {
    // Use the robust getLastPrice for the end price.
    const endPrice = Harga.getLastPrice(commodity, kecamatan);

    const sparklineData = getSparklinePrices(commodity, period, kecamatan);

    if (sparklineData.length === 0) {
      return { change: 0, startPrice: 0, endPrice: endPrice };
    }

    const startPrice = sparklineData[0];

    let change = 0;
    if (startPrice > 0) {
      change = (((endPrice - startPrice) / startPrice) * 100).toFixed(2);
    }

    return {
      change: isNaN(change) ? 0.0 : change,
      startPrice,
      endPrice,
    };
  }

  function getDataRange(period) {
    const now = new Date();
    let startDate;
    switch (period) {
      case "1W": // Last 7 days
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "1M": // Last 1 month
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        break;
      case "3M": // Last 3 months
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 3,
          now.getDate()
        );
        break;
      case "YTD": // Year-to-Date
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case "1Y": // Last 1 year
        startDate = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate()
        );
        break;
      default:
        return null;
      // throw new Error("Invalid period specified: " + period);
    }
    return startDate;
  }

  return {
    priceData,
    generatePriceData,
    transformDataArray,
    formatCurrency,
    Constants,
    getCurrentDateTime,
    getObjectById,
    getObjectByCol,
    getFormattedDate,
    Harga,
    getSparklinePrices,
    getPriceChange,
  };
}
