<template>
  <div class="q-pa-md" style="height: 500px;">
    <Bubble :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useKomoditasStore } from 'src/stores/komoditasStore';
import { useSelectionStore } from 'src/stores/selectionStore';
import { getCategory, getCategoryIcon } from 'src/utils/categoryUtils';
import { useUtils } from 'src/utils/utils';
import { Bubble } from 'vue-chartjs';
import { Chart as ChartJS, Tooltip, Legend, PointElement, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Tooltip, Legend, PointElement, LinearScale, ChartDataLabels);

const komoditasStore = useKomoditasStore();
const selectionStore = useSelectionStore();
const Utils = useUtils();
const Constants = Utils.Constants;

const selectedPeriod = computed(() => {
  return (
    selectionStore.getSelectionByKey(Constants.SELECTED_PERIOD_CHART) ??
    Constants.DEFAULT_SELECTED_PERIOD
  );
});

const categorizedCommodities = computed(() => {
  const categories = {};
  for (const commodity of komoditasStore.get()) {
    const category = getCategory(commodity.nama);
    if (!categories[category]) {
      categories[category] = {
        commodities: [],
        icon: getCategoryIcon(category),
      };
    }
    categories[category].commodities.push(commodity);
  }
  return categories;
});

const getCommodityPriceChange = (commodity) => {
  return Utils.getPriceChange(commodity, selectedPeriod.value, selectionStore.getSelectionByKey(Constants.SELECTED_WILAYAH));
};

const getCategoryPriceChange = (category) => {
  let totalChange = 0;
  let count = 0;

  for (const commodity of category.commodities) {
    const priceChange = getCommodityPriceChange(commodity);
    if (priceChange.change !== 0) {
      totalChange += parseFloat(priceChange.change);
      count++;
    }
  }

  if (count === 0) {
    return { change: 0, trend: 'flat' };
  }

  const avgChange = (totalChange / count).toFixed(2);
  const trend = avgChange > 0 ? 'up' : avgChange < 0 ? 'down' : 'flat';

  return { change: avgChange, trend };
};

// Color mapping for different trends
const getTrendColor = (trend) => {
  switch (trend) {
    case 'up':
      return 'rgba(34, 197, 94, 0.7)'; // Green for positive
    case 'down':
      return 'rgba(239, 68, 68, 0.7)'; // Red for negative
    default:
      return 'rgba(107, 114, 128, 0.7)'; // Gray for flat/no change
  }
};

const chartData = computed(() => {
  const bubbleData = [];
  const categories = Object.keys(categorizedCommodities.value);

  // Calculate grid positions for better layout
  const gridSize = Math.ceil(Math.sqrt(categories.length));

  categories.forEach((categoryName, index) => {
    const category = categorizedCommodities.value[categoryName];
    const priceChange = getCategoryPriceChange(category);

    // Calculate grid position
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    // Convert to chart coordinates with some spacing
    const x = (col + 1) * (100 / (gridSize + 1));
    const y = (row + 1) * (100 / (gridSize + 1));

    // Bubble size based on number of commodities (with min/max limits)
    const bubbleSize = Math.min(Math.max(category.commodities.length * 3, 10), 50);

    bubbleData.push({
      x: x,
      y: y,
      r: bubbleSize,
      category: categoryName,
      priceChange: priceChange.change,
      trend: priceChange.trend,
      commodityCount: category.commodities.length
    });
  });

  return {
    datasets: [{
      label: 'Categories',
      data: bubbleData,
      backgroundColor: bubbleData.map(item => getTrendColor(item.trend)),
      borderColor: bubbleData.map(item => getTrendColor(item.trend).replace('0.7', '1')),
      borderWidth: 2,
    }]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        title: function (context) {
          return context[0].raw.category;
        },
        label: function (context) {
          const data = context.raw;
          return [
            `Price Change: ${data.priceChange}%`,
            `Commodities: ${data.commodityCount}`,
            `Trend: ${data.trend}`
          ];
        },
      },
    },
    datalabels: {
      display: true,
      color: 'white',
      font: {
        weight: 'bold',
        size: function (context) {
          // Adjust font size based on bubble size
          const bubbleSize = context.parsed.r;
          if (bubbleSize < 20) return 10;
          if (bubbleSize < 35) return 12;
          return 14;
        }
      },
      formatter: function (value, context) {
        return value.category;
      },
      textAlign: 'center',
      anchor: 'center',
      clamp: true,
      clip: true
    }
  },
  scales: {
    x: {
      display: false,
      min: 0,
      max: 100,
    },
    y: {
      display: false,
      min: 0,
      max: 100,
    },
  },
  elements: {
    point: {
      hoverRadius: function (context) {
        return context.parsed?.r ? context.parsed.r + 5 : 15;
      }
    }
  }
};
</script>
