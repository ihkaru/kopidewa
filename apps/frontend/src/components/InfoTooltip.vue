<template>
  <q-icon :name="icon" :color="color" :size="size" class="cursor-pointer q-ml-xs">
    <q-tooltip
      anchor="top middle"
      self="bottom middle"
      :offset="[10, 10]"
      class="info-tooltip bg-grey-9"
    >
      <div class="tooltip-title">{{ title }}</div>
      <div class="tooltip-content">{{ definition }}</div>
    </q-tooltip>
  </q-icon>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'help_outline',
  },
  color: {
    type: String,
    default: 'grey-6',
  },
  size: {
    type: String,
    default: 'xs',
  },
});
</script>

<style lang="scss" scoped>
.info-tooltip {
  border-radius: 8px;
  padding: 12px;
  max-width: 280px;
  font-size: 13px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tooltip-title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
  border-bottom: 1px solid #555;
  padding-bottom: 6px;
}

.tooltip-content {
  line-height: 1.5;
  white-space: normal;
}
</style>