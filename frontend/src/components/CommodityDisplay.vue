<template>
  <div class="flex flex-center">
    <div ref="scrollWrapper" class="scroll-wrapper">
      <div ref="scrollContent" class="scroll-content">
        <!-- Loop pertama -->
        <CommodityCard
          v-for="commodity in commodities"
          :key="'first-' + commodity.symbol"
          :name="commodity.nama.trim()"
          :icon="commodity.icon"
          :price="commodity.currentPrice"
          :data="commodity.data"
          :location="'Pasar ' + selectedPasar"
          :src="
            'https://harga-api.dvlp.asia/komoditas/' + commodity.nama + '.webp'
          "
        />
        <!-- Loop kedua, menggandakan card untuk efek looping tanpa jeda -->
        <CommodityCard
          v-for="commodity in commodities"
          :key="'second-' + commodity.symbol"
          :name="commodity.nama"
          :icon="commodity.icon"
          :price="commodity.currentPrice"
          :data="commodity.data"
          :location="'Pasar ' + selectedPasar"
          :src="
            'https://harga-api.dvlp.asia/komoditas/' + commodity.nama + '.webp'
          "
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import CommodityCard from "components/CommodityCard.vue";
import { useSelectionStore } from "src/stores/selectionStore";
import { useConstants } from "src/utils/constants";
import { computed, defineProps, onBeforeUnmount, onMounted, ref } from "vue";
const Constants = useConstants();
const selectionStore = useSelectionStore();
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
const commodities = computed(() => {
  return props.data.filter((commodity) => commodity.currentPrice !== 0);
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
const scrollWrapper = ref(null);
const scrollContent = ref(null);
let animationFrame;

function startScrolling() {
  let scrollPosition = 0;

  function scroll() {
    scrollPosition -= 0.5; // Kecepatan scrolling bisa diatur dengan mengubah nilai ini
    if (scrollContent.value) {
      const scrollWidth = scrollContent.value.scrollWidth / 2;

      if (Math.abs(scrollPosition) >= scrollWidth) {
        scrollPosition = 0;
      }

      scrollContent.value.style.transform = `translateX(${scrollPosition}px)`;
    }

    animationFrame = requestAnimationFrame(scroll);
  }

  scroll();
}

onMounted(() => {
  startScrolling();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame);
});
</script>
<style scoped>
.scroll-wrapper {
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  display: flex;
  justify-content: center;
  scroll-behavior: smooth;
  transform: translateY(-4em);
  /* Menambahkan scroll snap agar terkunci pada setiap card */
  scroll-snap-type: x mandatory;
}

.scroll-content {
  display: flex;
  gap: 16px;
}

.commodity-card {
  min-width: 200px;
  width: 250px;
  max-width: 250px;
  margin-bottom: 10px;
  scroll-snap-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
