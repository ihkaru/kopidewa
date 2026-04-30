<template>
  <!-- Enhanced visual styling while maintaining exact structure -->
  <div class="q-pa-none full-width full-height">
    <q-card class="my-card shadow-0 q-pa-none full-height column">
      <q-card-section class="q-pa-none col">
        <!-- Enhanced refresh button with subtle shadow and hover effect -->
        <div class="q-pb-md text-right">
          <q-btn @click="handleSync" :loading="loadingUpdate" round color="secondary" icon="refresh"
            class="text-right refresh-btn" size="md">
            <template v-slot:loading>
              <q-spinner-grid color="white" />
            </template>
          </q-btn>
        </div>

        <!-- Enhanced header section with better spacing -->
        <div class="header-section">
          <q-avatar class="commodity-avatar">
            <q-img :src="'https://harga-api.dvlp.asia/komoditas/' + selectedCommodity + '.webp'"
              class="commodity-image" />
          </q-avatar>
          <div class="commodity-info">
            <div class="location-text">Pasar {{ selectedPasar }}, {{ selectedKecamatanLabel }}</div>
            <div class="commodity-name">{{ selectedCommodity }}</div>
          </div>
        </div>

        <!-- Enhanced price display with better typography -->
        <div class="price-display">
          Rp
          <NumberFlow :value="displayPrice" :locales="'id-ID'" />
        </div>

        <!-- Enhanced price change indicator with icons -->
        <div :class="[priceChangeClass, 'price-change-container']">
          <span class="price-change-icon">
            {{ displayPrice >= displayInitialPrice ? '↗' : '↘' }}
          </span>
          {{ priceChangePrefix }}Rp
          <NumberFlow :value="displayPriceChange" :locales="'id-ID'" />
          (
          <NumberFlow :value="displayPriceChangePercentage" :locales="'id-ID'" />%)
        </div>

        <!-- Enhanced info section with better visual hierarchy -->
        <div class="price-info-section">
          <div class="info-row">
            <span class="info-label">Harga Hari Ini:</span>
            <span class="info-value">Rp {{ currentPrice?.toLocaleString() ?? "" }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">
              Harga {{ Utils.Constants.CHART_PERIODS_LABEL[selectedPeriod] }}
              ({{ displayInitialPriceDate ?? "" }}):
            </span>
            <span class="info-value">Rp {{ displayInitialPrice.toLocaleString() }}</span>
          </div>
        </div>
      </q-card-section>

      <!-- Enhanced chart container with subtle border -->
      <q-card-section class="chart-container enhanced-chart">
        <div v-show="showTooltip" class="date-tooltip enhanced-tooltip" :style="{ left: tooltipPosition + 'px' }">
          {{ displayDate }}
        </div>

        <div v-show="showTooltip" class="vertical-line enhanced-line" :style="{ left: tooltipPosition - 16 + 'px' }">
        </div>

        <Line :ref="chartRef" :data="chartData" :options="chartOptions" @mouseout="handleChartLeave"
          @touchend="handleChartLeave" />
      </q-card-section>

      <!-- Enhanced period selector with modern button styling -->
      <q-card-section class="q-pa-none full-width column justify-between col">
        <div></div>
        <div class="period-selector">
          <q-btn v-for="period in Utils.Constants.CHART_PERIODS" :key="period.value" :label="period.label"
            :class="['period-btn', selectedPeriod === period.value ? 'period-btn-active' : 'period-btn-inactive']"
            @click="selectPeriod(period.value)" flat round size="sm" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
defineOptions({
  name: "MainChart",
});
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
import { easingEffects } from "chart.js/helpers";
import { ref, computed, onMounted, onBeforeMount, watch } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useUtils } from "src/utils/utils";
import { useSelectionStore } from "src/stores/selectionStore";
import { useSyncService } from "src/services/SyncKomoditas";
import NumberFlow from "@number-flow/vue";
const animated = ref(true);
const showCaret = ref(true);

const SyncSerice = useSyncService();
const Utils = useUtils();
const loadingUpdate = ref(false);
const dataUpdate = ref({});
const lastUpdate = ref(Utils.getCurrentDateTime());
const selectionStore = useSelectionStore();
const Constants = Utils.Constants;

const handleSync = async () => {
  loadingUpdate.value = true;
  await SyncSerice.updateBackend();
  dataUpdate.value = SyncSerice.dataUpdate.value;
  loadingUpdate.value = SyncSerice.loadingUpdate.value;
};
// Plugin yang dimodifikasi untuk menangani label di ujung grafik

const minMaxLabelsPlugin = {
  id: "minMaxLabels",
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const dataset = chart.data.datasets[0];
    const meta = chart.getDatasetMeta(0);

    if (!meta.data.length) return;

    const values = dataset.data;
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    const formatNumber = (num) => "Rp " + num.toLocaleString();

    const drawLabel = (value, point, isMax) => {
      ctx.save();
      ctx.fillStyle = dataset.borderColor;
      ctx.font = "12px Arial";

      const text = formatNumber(value);
      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;
      const textHeight = 16;
      const bgPadding = 4;

      // Mengecek posisi x untuk mencegah label terpotong di sisi kanan/kiri
      let xPos = point.x;
      const chartWidth = chart.width;
      const labelWidth = textWidth + bgPadding * 2;

      // Menyesuaikan posisi x jika label akan terpotong
      if (xPos - labelWidth / 2 < 0) {
        // Jika terlalu kiri
        xPos = labelWidth / 2 + bgPadding;
      } else if (xPos + labelWidth / 2 > chartWidth) {
        // Jika terlalu kanan
        xPos = chartWidth - labelWidth / 2 - bgPadding;
      }

      // Menyesuaikan posisi y dan menambah padding untuk mencegah terpotong
      const chartHeight = chart.height;
      let yPos;
      const labelTotalHeight = textHeight + bgPadding * 2;

      if (isMax) {
        // Untuk label maksimum
        yPos = point.y - 10;
        if (yPos - labelTotalHeight < 0) {
          // Jika akan terpotong di atas, pindah ke bawah titik
          yPos = point.y + labelTotalHeight;
        }
      } else {
        // Untuk label minimum
        yPos = point.y + 20;
        if (yPos + labelTotalHeight > chartHeight) {
          // Jika akan terpotong di bawah, pindah ke atas titik
          yPos = point.y - labelTotalHeight;
        }
      }

      // Menggambar background
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(
        xPos - textWidth / 2 - bgPadding,
        yPos - textHeight / 2,
        textWidth + bgPadding * 2,
        textHeight
      );

      // Menggambar text
      ctx.fillStyle = dataset.borderColor;
      ctx.textAlign = "center";
      ctx.fillText(text, xPos, yPos + textHeight / 4);
      ctx.restore();
    };

    // Mencari dan menggambar label untuk nilai max dan min
    var isMaxLabelDone = false;
    var isMinLabelDone = false;
    meta.data.forEach((point, index) => {
      if (values[index] === maxValue && !isMaxLabelDone) {
        isMaxLabelDone = true;
        drawLabel(maxValue, point, true);
      }
      if (values[index] === minValue && !isMinLabelDone) {
        isMinLabelDone = true;
        drawLabel(minValue, point, false);
      }
    });
  },
};

// Mendaftarkan plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  minMaxLabelsPlugin
);

Utils.generatePriceData("2024-01-01", "2024-11-04", 2);

const commodityData = ref([]);
// console.log(props.data);
// const commodityData = ref(Utils.priceData.value);

const chartRef = ref(null);
const selectedCommodity = ref("Beras");

const selectedPeriod = computed(() => {
  return (
    selectionStore.getSelectionByKey(Constants.SELECTED_PERIOD_CHART) ??
    Constants.DEFAULT_SELECTED_PERIOD
  );
});

const displayPrice = ref(0);
const displayInitialPrice = ref(0);
const displayInitialPriceDate = ref("");
const displayPriceChange = ref(0);
const displayPriceChangePercentage = ref(0);
const displayDate = ref("");
const lineColor = ref("#FF0000");
const showTooltip = ref(false);
const tooltipPosition = ref(0);

onMounted(async () => {
  commodityData.value = props.data?.data;
  selectedCommodity.value = props.data?.nama;
  loadingUpdate.value = SyncSerice.loadingUpdate.value;

  window.addEventListener('resize', () => {
    if (chartRef.value) {
      chartRef.value.chart.resize();
    }
  });
});
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const priceChangeClass = computed(() => {
  const change = displayPrice.value - displayInitialPrice.value;
  return change <= 0 ? "text-positive" : "text-negative";
});
const selectedPasar = computed(() => {
  return Constants.KECAMATAN_PASAR[
    selectionStore.getSelectionByKey(Constants.SELECTED_WILAYAH)
  ];
});
const selectedKecamatanLabel = computed(() => {
  return Constants.WILAYAH_LABELS[
    selectionStore.getSelectionByKey(Constants.SELECTED_WILAYAH)
  ];
});

const priceChangePrefix = computed(() => {
  const change = displayPrice.value - displayInitialPrice.value;
  return change >= 0 ? "+" : "-";
});

const filteredData = computed(() => {
  const now = new Date();
  const data = [
    ...Utils.Harga.filterByKecamatan(
      props.data,
      selectionStore.getSelectionByKey(Constants.SELECTED_WILAYAH)
    ).data,
  ];

  switch (selectedPeriod.value) {
    case "1D":
      return data.filter((item) => {
        const date = new Date(item.date);
        return date.getTime() >= now.getTime() - 86400000;
      });
    case "1W":
      return data.filter((item) => {
        const date = new Date(item.date);
        return date.getTime() >= now.getTime() - 7 * 86400000;
      });
    case "1M":
      return data.filter((item) => {
        const date = new Date(item.date);
        return date.getTime() >= now.getTime() - 30 * 86400000;
      });
    case "3M":
      return data.filter((item) => {
        const date = new Date(item.date);
        return date.getTime() >= now.getTime() - 90 * 86400000;
      });
    case "YTD":
      return data.filter((item) => {
        const date = new Date(item.date);
        return date.getFullYear() === now.getFullYear();
      });
    case "1Y":
      return data.filter((item) => {
        const date = new Date(item.date);
        return date.getTime() >= now.getTime() - 365 * 86400000;
      });
    case "ALL":
      return data;
    default:
      return data;
  }
});

const updateChartColor = (currentPrice, initialPrice) => {
  lineColor.value = currentPrice <= initialPrice ? "#22C55E" : "#EF4444";
};

const calculatePriceChange = (currentPrice, initialPrice) => {
  const priceChange = Math.abs(currentPrice - initialPrice);
  const priceChangePercentage = (
    ((currentPrice - initialPrice) / initialPrice) *
    100
  ).toFixed(2);
  return { priceChange, priceChangePercentage };
};

const updateDisplayValues = (currentPrice, initialPrice, date) => {
  displayPrice.value = currentPrice;
  displayInitialPrice.value = initialPrice;
  displayDate.value = formatDate(date);
  const { priceChange, priceChangePercentage } = calculatePriceChange(
    currentPrice,
    initialPrice
  );
  displayPriceChange.value = priceChange;
  displayPriceChangePercentage.value = priceChangePercentage;
  updateChartColor(currentPrice, initialPrice);
};

const handleChartLeave = () => {
  showTooltip.value = false;
  if (filteredData.value.length > 0) {
    const lastIndex = filteredData.value.length - 1;
    const currentData = filteredData.value[lastIndex];
    const initialData = filteredData.value[0];
    displayInitialPriceDate.value = initialData.date;
    updateDisplayValues(currentData.price, initialData.price, currentData.date);
  }
};
let easing = easingEffects.easeInCirc;
let restart = false;
const totalDuration = 300;
const duration = (ctx) =>
  (easing(ctx.index / filteredData.value.length) * totalDuration) /
  filteredData.value.length;
const delay = (ctx) =>
  easing(ctx.index / filteredData.value.length) * totalDuration;
const previousY = (ctx) =>
  ctx.index === 0
    ? ctx.chart.scales.y.getPixelForValue(100)
    : ctx.chart
      .getDatasetMeta(ctx.datasetIndex)
      .data[ctx.index - 1].getProps(["y"], true).y;
const animation = {
  x: {
    type: "number",
    easing: "linear",
    duration: duration,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== "data" || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return delay(ctx);
    },
  },
  y: {
    type: "number",
    easing: "linear",
    duration: duration,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== "data" || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return delay(ctx);
    },
  },
};
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: "index",
  },
  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      enabled: false,
    },
  },
  scales: {
    y: {
      display: true,
      // Menambahkan padding pada skala y untuk memberikan ruang bagi label
      beginAtZero: false,
      title: {
        display: true,
        text: "Harga",
      },
      grid: {
        display: false,
      },
      padding: {
        top: 20,
        bottom: 20,
      },
      ticks: {
        display: false,
      },
    },
    x: {
      display: false,
      // Menambahkan padding pada skala x untuk memberikan ruang bagi label
      padding: {
        left: 20,
        right: 20,
      },
    },
  },
  hover: {
    mode: "index",
    intersect: false,
  },
  onHover: (event, elements, chart) => {
    if (!event?.native) return;

    const chartPosition = chart.canvas.getBoundingClientRect();

    if (elements && elements.length) {
      showTooltip.value = true;
      const dataIndex = elements[0].index;
      const currentData = filteredData.value[dataIndex];
      const initialData = filteredData.value[0];
      displayInitialPriceDate.value = initialData.date;

      const xPosition = elements[0].element.x;
      tooltipPosition.value = xPosition + 15;

      updateDisplayValues(
        currentData.price,
        initialData.price,
        currentData.date
      );
    } else {
      showTooltip.value = false;
    }
  },
  events: ["mousemove", "mouseout", "touchstart", "touchmove", "touchend"],
};
const currentPrice = computed(() => {
  let currentData = {};
  if (filteredData.value && filteredData.value.length > 0) {
    // console.log("current price", filteredData.value.length);
    currentData = filteredData.value[filteredData.value.length - 1];
    // console.log("current price", currentData);
  }
  return currentData?.price ?? 0;
});
const chartData = computed(() => ({
  labels: filteredData.value.map((item) => item.date),
  datasets: [
    {
      label: selectedCommodity.value,
      borderColor: lineColor.value,
      data: filteredData.value.map((item) => item.price),
      tension: 0.1,
      borderWidth: 5,
      pointRadius: 0,
      pointHoverRadius: 4,
      pointHoverBackgroundColor: lineColor.value,
      pointHoverBorderColor: "#FFF",
      pointHoverBorderWidth: 2,
    },
  ],
}));

onMounted(() => {
  handleChartLeave();
});

watch(
  () => props.data,
  (newVal, oldVal) => {
    if (props.data?.length > 0) commodityData.value = props.data.data;
  }
);

const selectPeriod = (period) => {
  selectionStore.setSelection(Constants.SELECTED_PERIOD_CHART, period);
  handleChartLeave();
};
</script>

<style scoped>
/* Enhanced styling while maintaining exact structure */
.my-card {
  width: 100%;
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
  /* background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); */
  border-radius: 16px;
  overflow: hidden;
}

/* Enhanced refresh button */
.refresh-btn {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.refresh-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Enhanced header section */
.header-section {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

.commodity-avatar {
  margin-right: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.commodity-avatar:hover {
  transform: scale(1.05);
}

.commodity-image {
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;
  margin-bottom: 5px;
  object-fit: cover;
}

.commodity-info {
  flex: 1;
}

.location-text {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.commodity-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  word-wrap: normal;
  max-width: 80vw;
  line-height: 1.3;
}

/* Enhanced price display */
.price-display {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0.5rem 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  letter-spacing: -0.025em;
}

/* Enhanced price change with icons */
.price-change-container {
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
}

.price-change-icon {
  font-size: 1rem;
  opacity: 0.8;
}

/* Enhanced info section */
.price-info-section {
  background: rgba(248, 250, 252, 0.6);
  border-radius: 12px;
  padding: 12px;
  margin-top: 8px;
  border-left: 4px solid #e5e7eb;
}

.info-row {
  align-items: center;
  margin-bottom: 6px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-label {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
  flex: 1;
  margin-right: 8px;
}

.info-value {
  color: #374151;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: left;
}

/* Enhanced chart container */
.enhanced-chart {
  position: relative;
  padding: 16px 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  margin: 8px 0;
  border: 1px solid rgba(229, 231, 235, 0.3);
}

/* Enhanced tooltip */
.enhanced-tooltip {
  position: absolute;
  top: -8px;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  pointer-events: none;
  z-index: 2;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
}

.enhanced-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: #1f2937;
}

/* Enhanced vertical line */
.enhanced-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.2) 20%, rgba(0, 0, 0, 0.2) 80%, transparent 100%);
  pointer-events: none;
  z-index: 1;
  border-radius: 1px;
}

/* Enhanced period selector */
.period-selector {
  display: flex;
  justify-content: space-evenly;
  gap: 4px;
  padding: 12px 8px;
  background: rgba(248, 250, 252, 0.4);
  border-radius: 16px;
  margin: 8px;
}

.period-btn {
  transition: all 0.3s ease;
  border-radius: 12px !important;
  font-weight: 600;
  font-size: 0.75rem;
  min-width: 44px;
  height: 32px;
}

.period-btn-active {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
  color: white !important;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}

.period-btn-inactive {
  background: rgba(255, 255, 255, 0.8) !important;
  color: #6b7280 !important;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.period-btn-inactive:hover {
  background: rgba(255, 255, 255, 1) !important;
  color: #374151 !important;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Color enhancements for price changes */
.text-positive {
  color: #059669 !important;
  background: linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
  padding: 4px 8px;
  border-radius: 8px;
  border-left: 3px solid #059669;
}

.text-negative {
  color: #dc2626 !important;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%);
  padding: 4px 8px;
  border-radius: 8px;
  border-left: 3px solid #dc2626;
}

/* Subtle animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.my-card>* {
  animation: fadeIn 0.6s ease-out;
}

/* Responsive enhancements */
@media (max-width: 768px) {
  .price-display {
    font-size: 1.75rem;
  }

  .commodity-name {
    font-size: 1.125rem;
  }

  .period-selector {
    gap: 2px;
    padding: 8px 4px;
  }

  .period-btn {
    min-width: 36px;
    height: 28px;
    font-size: 0.7rem;
  }
}
</style>
