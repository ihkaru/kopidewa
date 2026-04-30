import { defineStore } from "pinia";

export const useKomoditasStore = defineStore("komoditas", {
  state: () => ({
    komoditas: [],
    lastUpdate: null,
  }),
  getters: {
    get: (state) => () =>
      state.komoditas ?? [
        {
          nama: "-",
          symbol: "-",
          icon: "-",
          currentPrice: 0,
          data: [
            {
              date: "2024-10-01",
              price: 17000,
            },
          ],
          sparklineData: {
            "1W": [17000],
            "1M": [17000],
            "3M": [17000],
            YTD: [17000],
            "1Y": [17000],
            ALL: [17000],
          },
        },
      ],
    getLastUpdate: (state) => () => state.lastUpdate,
  },
  actions: {
    set(komoditas) {
      this.komoditas = komoditas;
      console.log("Komoditas updated:", this.komoditas);
    },
    setLastUpdate(lastUpdate) {
      this.lastUpdate = lastUpdate;
    },
  },
});
