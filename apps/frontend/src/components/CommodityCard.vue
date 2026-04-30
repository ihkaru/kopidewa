<template>
  <q-card class="commodity-card q-pa-md">
    <q-card-section>
      <div class="text-center">
        <!-- <q-icon :name="icon" class="q-mb-sm" color="primary" size="xl" /> -->
        <q-img
          :src="src"
          style="
            max-width: 100px;
            max-height: 100px;
            border-radius: 50%;
            margin-bottom: 5px;
          "
        />
        <div class="text-subtitle1 text-primary">{{ name }}</div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-center text-h5">Rp {{ price.toLocaleString() }}</div>
      <div class="text-center text-caption">Harga Saat Ini</div>
    </q-card-section>
    <q-card-section v-if="priceDifference !== null">
      <div
        class="text-center text-subtitle1"
        :style="{ color: priceDifference > 0 ? 'red' : 'green' }"
      >
        {{ priceDifference > 0 ? "+" : ""
        }}{{ formatCurrency(priceDifference) }} ({{
          priceChangePercentage > 0 ? "+" : ""
        }}{{ priceChangePercentage }}%)
      </div>
    </q-card-section>
    <q-card-section class="text-center">
      <div class="text-center">{{ location ?? "" }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from "vue";

// import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
}

const priceDifference = computed(() => {
  if (!Array.isArray(props.data)) return null;
  if (props.data?.length < 2) return null;
  const latestPrice = props.data[props.data.length - 1].price;
  const previousPrice = props.data[props.data.length - 2].price;
  return latestPrice - previousPrice;
});

const priceChangePercentage = computed(() => {
  if (!Array.isArray(props.data)) return null;

  if (props.data.length < 2) return null;
  const previousPrice = props.data[props.data.length - 2].price;
  return previousPrice === 0
    ? 0
    : ((priceDifference.value / previousPrice) * 100).toFixed(2);
});
</script>

<style scoped>
.commodity-card {
  min-width: 200px;
  max-width: 250px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
