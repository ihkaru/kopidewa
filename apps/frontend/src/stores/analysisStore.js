import { defineStore } from 'pinia';
import axios from 'axios';

export const useAnalysisStore = defineStore('analysis', {
  state: () => ({
    analyses: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAnalyses() {
      this.loading = true;
      this.error = null;
      try {
        const today = new Date().toISOString().slice(0, 10);
        let response = await axios.get('https://harga-api.dvlp.asia/api/analisis-harga', {
          params: {
            limit: 5,
            start_date: today,
            end_date: today,
          },
        });

        if (response.data.length === 0) {
          response = await axios.get('https://harga-api.dvlp.asia/api/analisis-harga', {
            params: {
              limit: 5,
            },
          });
        }

        this.analyses = response.data;
      } catch (error) {
        this.error = 'Failed to fetch analyses.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
