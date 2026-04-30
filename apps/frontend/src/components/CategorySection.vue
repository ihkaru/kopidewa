<template>
  <div class="q-pa-md">
    <!-- Summary Section -->
    <div class="section-header q-mb-md">
      <h5 class="section-title">Ringkasan Kategori</h5>
      <p class="section-subtitle text-grey-6">Gambaran umum perubahan harga per kategori komoditas</p>
    </div>

    <div class="row q-col-gutter-md q-mb-xl">
      <div v-for="(category, categoryName) in categorizedCommodities" :key="`summary-${categoryName}`"
        class="col-12 col-sm-6 col-md-4">
        <q-card class="summary-card clickable" flat bordered @click="scrollToCategory(categoryName)">
          <q-card-section class="q-pb-sm">
            <div class="row items-center no-wrap">
              <q-avatar size="40px" :color="getCategoryColor(categoryName)" text-color="white">
                <q-icon :name="getCategoryIcon(categoryName)" size="1.2em" />
              </q-avatar>
              <div class="q-ml-md">
                <div class="text-subtitle1 text-weight-medium">{{ categoryName }}</div>
                <div class="text-caption text-grey-6">{{ category.length }} komoditas</div>
              </div>
              <q-space />
              <div class="text-right">
                <div class="text-h6" :class="getCategoryPriceChangeEnhanced(category).colorClass">
                  {{ getCategoryPriceChangeEnhanced(category).displayChange }}
                </div>
                <div class="text-caption text-grey-6">Rata-rata</div>
              </div>
            </div>
          </q-card-section>

          <!-- Click indicator -->
          <div class="click-indicator">
            <q-icon name="keyboard_arrow_down" size="1.2em" class="text-grey-5" />
          </div>
        </q-card>
      </div>
    </div>

    <!-- Detail Section -->
    <div class="section-header q-mb-md">
      <h5 class="section-title">Detail Komoditas</h5>
      <p class="section-subtitle text-grey-6">Informasi lengkap perubahan harga setiap komoditas</p>
    </div>

    <!-- Masonry Layout for Detailed Cards -->
    <masonry-wall :items="categoryItems" :ssr-columns="1" :column-width="350" :gap="20" class="masonry-container">
      <template #default="{ item }">
        <q-card :id="`category-${item.name.replace(/\s+/g, '-').toLowerCase()}`" class="detail-card"
          :class="{ 'highlighted': highlightedCategory === item.name }">
          <q-card-section class="category-header">
            <div class="row items-center no-wrap">
              <q-avatar size="32px" :color="getCategoryColor(item.name)" text-color="white">
                <q-icon :name="getCategoryIcon(item.name)" />
              </q-avatar>
              <div class="q-ml-sm text-h6 text-weight-medium">{{ item.name }}</div>
              <q-space />
              <q-chip :color="item.priceChange.chipColor" text-color="white" dense :icon="item.priceChange.icon">
                {{ item.priceChange.displayChange }}
                <q-tooltip>Perubahan harga rata-rata 1 minggu</q-tooltip>
              </q-chip>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-none">
            <div class="commodity-list">
              <div v-for="(commodity, index) in item.commodities" :key="commodity.id" class="commodity-item">
                <div class="commodity-content">
                  <div class="commodity-name">{{ commodity.nama }}</div>
                  <div class="commodity-price">
                    <span :class="commodity.priceChange.colorClass">
                      {{ commodity.priceChange.displayChange }}
                    </span>
                    <q-icon :name="commodity.priceChange.icon" size="0.8em" :class="commodity.priceChange.colorClass" />
                  </div>
                </div>
                <q-separator v-if="index < item.commodities.length - 1" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </template>
    </masonry-wall>
  </div>
</template>

<script setup>
import { computed, ref, nextTick } from 'vue';
import { useKomoditasStore } from 'src/stores/komoditasStore';
import { useSelectionStore } from 'src/stores/selectionStore';
import { getCategory, getCategoryIcon } from 'src/utils/categoryUtils';
import { useUtils } from 'src/utils/utils';
import MasonryWall from '@yeger/vue-masonry-wall';

const komoditasStore = useKomoditasStore();
const selectionStore = useSelectionStore();
const Utils = useUtils();
const Constants = Utils.Constants;

// Refs for highlighting
const highlightedCategory = ref('');

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
      categories[category] = [];
    }
    categories[category].push(commodity);
  }
  return categories;
});

// Enhanced data structure for masonry wall
const categoryItems = computed(() => {
  return Object.entries(categorizedCommodities.value).map(([categoryName, commodities]) => {
    // Process commodities with enhanced price change data
    const processedCommodities = commodities.map(commodity => ({
      ...commodity,
      priceChange: getCommodityPriceChangeEnhanced(commodity)
    }));

    return {
      name: categoryName,
      commodities: processedCommodities,
      priceChange: getCategoryPriceChangeEnhanced(commodities)
    };
  });
});

// Function to scroll to category and highlight
const scrollToCategory = async (categoryName) => {
  // Highlight the category
  highlightedCategory.value = categoryName;

  // Wait for next tick to ensure DOM is updated
  await nextTick();

  // Find the category element by ID
  const categoryId = `category-${categoryName.replace(/\s+/g, '-').toLowerCase()}`;
  const targetElement = document.getElementById(categoryId);

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    // Remove highlight after animation
    setTimeout(() => {
      highlightedCategory.value = '';
    }, 2000);
  } else {
    console.warn(`Category element not found: ${categoryId}`);
  }
};

const getCommodityPriceChange = (commodity) => {
  return Utils.getPriceChange(commodity, selectedPeriod.value, selectionStore.getSelectionByKey(Constants.SELECTED_WILAYAH));
};

const getCommodityPriceChangeEnhanced = (commodity) => {
  const priceChange = getCommodityPriceChange(commodity);
  const change = parseFloat(priceChange.change) || 0;

  return {
    ...priceChange,
    displayChange: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
    colorClass: change > 0 ? 'text-red-6' : change < 0 ? 'text-green-6' : 'text-grey-6',
    icon: change > 0 ? 'trending_up' : change < 0 ? 'trending_down' : 'trending_flat'
  };
};

const getCategoryPriceChange = (category) => {
  let totalChange = 0;
  let count = 0;

  for (const commodity of category) {
    const priceChange = getCommodityPriceChange(commodity);
    const change = parseFloat(priceChange.change) || 0;
    if (change !== 0) {
      totalChange += change;
      count++;
    }
  }

  if (count === 0) {
    return { change: 0, trend: 'flat' };
  }

  const avgChange = totalChange / count;
  const trend = avgChange > 0 ? 'up' : avgChange < 0 ? 'down' : 'flat';

  return { change: avgChange.toFixed(2), trend };
};

const getCategoryPriceChangeEnhanced = (category) => {
  let totalChange = 0;
  let count = 0;

  for (const commodity of category) {
    const priceChange = getCommodityPriceChange(commodity);
    const change = parseFloat(priceChange.change) || 0;
    if (change !== 0) {
      totalChange += change;
      count++;
    }
  }

  if (count === 0) {
    return {
      change: 0,
      trend: 'flat',
      displayChange: '0.00%',
      colorClass: 'text-grey-6',
      chipColor: 'grey-5',
      icon: 'trending_flat'
    };
  }

  const avgChange = totalChange / count;
  const trend = avgChange > 0 ? 'up' : avgChange < 0 ? 'down' : 'flat';

  return {
    change: avgChange.toFixed(2),
    trend,
    displayChange: `${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}%`,
    colorClass: avgChange > 0 ? 'text-red-6' : 'text-green-6',
    chipColor: avgChange > 0 ? 'red-5' : 'green-5',
    icon: avgChange > 0 ? 'trending_up' : 'trending_down'
  };
};

const getCategoryColor = (categoryName) => {
  const colors = {
    'Beras': 'amber-6',
    'Lainnya': 'blue-6',
    'Bumbu': 'orange-6',
    'Gula': 'brown-4',
    'Minyak Goreng': 'yellow-7',
    'Tepung': 'grey-6'
  };
  return colors[categoryName] || 'primary';
};
</script>

<style scoped>
/* Section Headers */
.section-header {
  text-align: center;
  padding: 20px 0;
}

.section-title {
  margin: 0 0 8px 0;
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1.5rem;
}

.section-subtitle {
  margin: 0;
  font-size: 0.95rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Summary Cards */
.summary-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.summary-card.clickable {
  cursor: pointer;
}

.summary-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  border-color: rgba(0, 0, 0, 0.15);
}

.summary-card:active {
  transform: translateY(-2px);
}

/* Click indicator */
.click-indicator {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.summary-card:hover .click-indicator {
  opacity: 1;
}

/* Pulse animation for click feedback */
.summary-card:active .click-indicator {
  animation: pulse 0.3s ease-in-out;
}

@keyframes pulse {
  0% {
    transform: translateX(-50%) scale(1);
  }

  50% {
    transform: translateX(-50%) scale(1.2);
  }

  100% {
    transform: translateX(-50%) scale(1);
  }
}

/* Masonry Container */
.masonry-container {
  width: 100%;
}

/* Detail Cards */
.detail-card {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.detail-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: rgba(0, 0, 0, 0.1);
}

/* Highlighted state for detail cards */
.detail-card.highlighted {
  animation: highlight 2s ease-in-out;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.3), 0 8px 24px rgba(0, 0, 0, 0.12);
}

@keyframes highlight {
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.5), 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  50% {
    box-shadow: 0 0 0 8px rgba(25, 118, 210, 0.2), 0 12px 32px rgba(0, 0, 0, 0.15);
  }

  100% {
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.3), 0 8px 24px rgba(0, 0, 0, 0.12);
  }
}

.category-header {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 1) 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 16px;
}

/* Commodity List */
.commodity-list {
  overflow: hidden;
}

.commodity-item {
  padding: 14px 16px;
  transition: background-color 0.2s ease;
}

.commodity-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.commodity-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.commodity-name {
  font-weight: 500;
  flex: 1;
  min-width: 0;
  font-size: 0.9em;
  line-height: 1.4;
}

.commodity-price {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  font-size: 0.85em;
  white-space: nowrap;
}

/* Responsive Design */
@media (max-width: 599px) {
  .commodity-name {
    font-size: 0.85em;
  }

  .commodity-price {
    font-size: 0.8em;
  }

  .category-header {
    padding: 12px;
  }

  .commodity-item {
    padding: 12px 16px;
  }
}

@media (min-width: 600px) {
  .masonry-container {
    margin-top: 0;
  }
}

/* Better spacing for masonry items */
.masonry-container :deep(.masonry-column) {
  gap: 20px;
}

/* Ensure proper card sizing */
.detail-card {
  width: 100%;
  box-sizing: border-box;
}
</style>
