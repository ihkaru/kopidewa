import { useConstants } from "./constants";

export function useHargaUtils() {
  const Constants = useConstants();
  const filterByKecamatan = (commodity, kodeKecamatan) => {
    // Salin objek input untuk menjaga data asli tetap utuh
    const result = { ...commodity };
    // console.log("filterByKecamatan", commodity);

    // Filter data berdasarkan kecamatan yang sesuai
    result.data = commodity.data.filter(
      (entry) => entry.kecamatan === Constants.WILAYAH_LABELS[kodeKecamatan]
    );

    // Kembalikan hasil
    return result;
  };

  const getLastPrice = (commodity, kodeKecamatan) => {
    let data = commodity.data;
    // console.log("data comm", data);
    // Filter data berdasarkan kecamatan yang sesuai
    const filteredData = data.filter(
      (entry) => entry.kecamatan === Constants.WILAYAH_LABELS[kodeKecamatan]
    );

    // Pastikan ada data yang sesuai
    if (filteredData.length === 0) {
      return 0;
    }

    // Urutkan data berdasarkan tanggal (opsional jika data sudah terurut)
    filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Ambil harga dari data terbaru
    return filteredData[0].price * 1;
  };
  return { getLastPrice, filterByKecamatan };
}
