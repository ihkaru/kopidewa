<!-- StockChart.vue -->
<template>
  <div class="row q-col-gutter-md">
    <!-- Chart Section - Left Side -->
    <div class="col-9">
      <q-card>
        <q-card-section>
          <div class="text-h6">Grafik Saham {{ selectedStock }}</div>
          <canvas ref="chartCanvas"></canvas>
        </q-card-section>
      </q-card>
    </div>

    <!-- Stock List Section - Right Side -->
    <div class="col-3">
      <q-card>
        <q-card-section>
          <div class="text-h6">Daftar Saham</div>
          <q-list padding>
            <q-item
              v-for="stock in Object.keys(stockData)"
              :key="stock"
              clickable
              v-ripple
              :active="selectedStock === stock"
              active-class="bg-primary text-white"
              @click="selectStock(stock)"
            >
              <q-item-section>
                {{ stock }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";
import MainChart from "./MainChart.vue";

export default {
  name: "StockChart",
  setup() {
    const selectedStock = ref("TLKM");
    const chartCanvas = ref(null);
    let chart = null;

    const stockData = {
      TLKM: [
        { date: "2024-01", value: 4200 },
        { date: "2024-02", value: 4300 },
        { date: "2024-03", value: 4150 },
        { date: "2024-04", value: 4400 },
      ],
      BBCA: [
        { date: "2024-01", value: 9200 },
        { date: "2024-02", value: 9400 },
        { date: "2024-03", value: 9300 },
        { date: "2024-04", value: 9600 },
      ],
      ASII: [
        { date: "2024-01", value: 6100 },
        { date: "2024-02", value: 6300 },
        { date: "2024-03", value: 6200 },
        { date: "2024-04", value: 6400 },
      ],
    };

    const createChart = () => {
      const ctx = chartCanvas.value.getContext("2d");

      // Destroy existing chart if it exists
      if (chart) {
        chart.destroy();
      }

      const currentData = stockData[selectedStock.value];

      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: currentData.map((item) => item.date),
          datasets: [
            {
              label: selectedStock.value,
              data: currentData.map((item) => item.value),
              borderColor: "#1976D2",
              backgroundColor: "rgba(25, 118, 210, 0.1)",
              tension: 0.1,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  label += new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(context.parsed.y);
                  return label;
                },
              },
            },
          },
          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  return new Intl.NumberFormat("id-ID").format(value);
                },
              },
            },
          },
        },
      });
    };

    const selectStock = (stock) => {
      selectedStock.value = stock;
    };

    // Watch for changes in selected stock
    watch(selectedStock, () => {
      createChart();
    });

    onMounted(() => {
      createChart();
    });

    return {
      selectedStock,
      stockData,
      chartCanvas,
      selectStock,
    };
  },
};
</script>

<style>
canvas {
  width: 100% !important;
  height: 350px !important;
}
</style>
