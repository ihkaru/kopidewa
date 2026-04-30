import RegionConfig from "src/config/region";

export function useConstants() {
  const Constants = {
    SELECTED_KOMODITAS: "SELECTED_KOMODITAS",
    SELECTED_PERIOD_CHART: "SELECTED_PERIOD_CHART",
    SELECTED_WILAYAH: "SELECTED_WILAYAH",
    WILAYAH_LABELS: RegionConfig.WILAYAH_LABELS,
    DEFAULT_SELECTED_WILAYAH: RegionConfig.DEFAULT_SELECTED_WILAYAH,
    DEFAULT_SELECTED_PERIOD: "1M",
    KECAMATAN_PASAR: RegionConfig.KECAMATAN_PASAR,
    CHART_PERIODS: [
      { label: "1W", value: "1W" },
      { label: "1M", value: "1M" },
      { label: "3M", value: "3M" },
      { label: "YTD", value: "YTD" },
      { label: "1Y", value: "1Y" },
      { label: "ALL", value: "ALL" },
    ],
    CHART_PERIODS_LABEL: {
      "1W": "1 pekan lalu",
      "1M": "1 bulan lalu",
      "3M": "3 bulan lalu",
      YTD: "Year to Date",
      "1Y": "1 tahun lalu",
      ALL: "Semua",
    },
  };
  return Constants;
}
