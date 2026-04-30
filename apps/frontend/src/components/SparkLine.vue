<template>
  <div class="sparkline-wrapper">
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" class="sparkline-svg">
      <!-- Gradient definitions for more professional look -->
      <defs>
        <linearGradient :id="`gradient-${gradientId}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" :stop-color="color" :stop-opacity="0.3" />
          <stop offset="100%" :stop-color="color" :stop-opacity="0.05" />
        </linearGradient>

        <!-- Drop shadow filter -->
        <filter :id="`shadow-${gradientId}`" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" :flood-color="color" flood-opacity="0.2" />
        </filter>
      </defs>

      <!-- Background grid (subtle) -->
      <g class="grid-lines" opacity="0.05">
        <line v-for="i in 2" :key="`h-${i}`" x1="0" :y1="(height / 3) * i" :x2="width" :y2="(height / 3) * i"
          stroke="#999" stroke-width="0.5" />
      </g>

      <!-- Flat line indicator -->
      <g v-if="isFlat && normalizedData.length > 1" class="flat-indicator" opacity="0.3">
        <line :x1="padding" :y1="height / 2" :x2="width - padding" :y2="height / 2" stroke="#ddd"
          :stroke-width="strokeWidth" stroke-dasharray="2,2" />
      </g>

      <!-- Area fill under the line -->
      <path v-if="data.length > 1 && showArea" :d="generateAreaPath" :fill="`url(#gradient-${gradientId})`"
        opacity="0.6" />

      <!-- Main sparkline path -->
      <path :d="generatePath" :stroke="color" :stroke-width="strokeWidth" fill="none" stroke-linecap="round"
        stroke-linejoin="round" :filter="`url(#shadow-${gradientId})`" class="sparkline-path" />

      <!-- Data points (dots) - only show on hover or when specified -->
      <g v-if="showDots" class="data-points">
        <circle v-for="(point, index) in dataPoints" :key="`dot-${index}`" :cx="point.x" :cy="point.y" :r="dotRadius"
          :fill="color" :stroke="backgroundColor" :stroke-width="1" class="data-point" />
      </g>

      <!-- Highlight first and last points -->
      <g v-if="highlightEndpoints && dataPoints.length > 1" class="endpoint-highlights">
        <circle :cx="dataPoints[0].x" :cy="dataPoints[0].y" :r="dotRadius + 1" :fill="backgroundColor" :stroke="color"
          :stroke-width="2" class="start-point" />
        <circle :cx="dataPoints[dataPoints.length - 1].x" :cy="dataPoints[dataPoints.length - 1].y" :r="dotRadius + 1"
          :fill="color" class="end-point" />
      </g>
    </svg>

    <!-- Trend indicator -->
    <div v-if="showTrendIndicator" class="trend-indicator" :class="trendDirection">
      <q-icon
        :name="trendDirection === 'up' ? 'trending_up' : trendDirection === 'down' ? 'trending_down' : 'trending_flat'"
        size="12px" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineComponent } from "vue";

defineOptions({
  name: "SparkLine",
});

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 30,
  },
  color: {
    type: String,
    default: "#333",
  },
  backgroundColor: {
    type: String,
    default: "#ffffff",
  },
  strokeWidth: {
    type: Number,
    default: 2,
  },
  showArea: {
    type: Boolean,
    default: true,
  },
  showDots: {
    type: Boolean,
    default: false,
  },
  showTrendIndicator: {
    type: Boolean,
    default: false,
  },
  highlightEndpoints: {
    type: Boolean,
    default: false,
  },
  dotRadius: {
    type: Number,
    default: 2,
  },
  padding: {
    type: Number,
    default: 2,
  },
});

// Generate unique ID for gradients to avoid conflicts
const gradientId = computed(() => {
  return Math.random().toString(36).substr(2, 9);
});

const normalizedData = computed(() => {
  if (!props.data.length) return [];

  // Filter out any invalid values
  const validData = props.data.filter(val => val !== null && val !== undefined && !isNaN(val));
  if (validData.length === 0) return [];

  return validData;
});

const dataPoints = computed(() => {
  const data = normalizedData.value;
  if (!data.length) return [];

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const xStep = (props.width - props.padding * 2) / Math.max(data.length - 1, 1);

  return data.map((value, index) => {
    const x = props.padding + index * xStep;
    let y;

    if (range === 0) {
      // All values are the same - draw line in the middle
      y = props.height / 2;
    } else {
      const yScale = (props.height - props.padding * 2) / range;
      y = props.padding + (props.height - props.padding * 2) - (value - min) * yScale;
    }

    return { x, y, value };
  });
});

const generatePath = computed(() => {
  const points = dataPoints.value;
  if (!points.length) return "";

  if (points.length === 1) {
    // Single point - draw a small horizontal line
    const point = points[0];
    const lineLength = Math.min(props.width * 0.1, 6);
    return `M ${Math.max(point.x - lineLength / 2, 0)},${point.y} L ${Math.min(point.x + lineLength / 2, props.width)},${point.y}`;
  }

  let path = `M ${points[0].x},${points[0].y}`;

  if (points.length === 2) {
    path += ` L ${points[1].x},${points[1].y}`;
  } else {
    // Check if all points have the same Y value (flat line)
    const isFlat = points.every(point => Math.abs(point.y - points[0].y) < 0.1);

    if (isFlat) {
      // Draw straight line for flat data
      path += ` L ${points[points.length - 1].x},${points[points.length - 1].y}`;
    } else {
      // Create smooth curves using quadratic bezier curves for varying data
      for (let i = 1; i < points.length; i++) {
        const current = points[i];
        const previous = points[i - 1];

        if (i === 1) {
          // First curve
          const next = points[i + 1];
          const controlX = previous.x + (current.x - previous.x) * 0.5;
          const controlY = previous.y;
          path += ` Q ${controlX},${controlY} ${current.x},${current.y}`;
        } else if (i === points.length - 1) {
          // Last point
          path += ` L ${current.x},${current.y}`;
        } else {
          // Middle points - use smooth transitions
          path += ` L ${current.x},${current.y}`;
        }
      }
    }
  }

  return path;
});

const generateAreaPath = computed(() => {
  const points = dataPoints.value;
  if (points.length < 2) return "";

  const linePath = generatePath.value;
  if (!linePath) return "";

  // Close the area by connecting to the bottom
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];

  let path = linePath;
  path += ` L ${lastPoint.x},${props.height - props.padding}`;
  path += ` L ${firstPoint.x},${props.height - props.padding}`;
  path += ` Z`;

  return path;
});

const trendDirection = computed(() => {
  const data = normalizedData.value;
  if (data.length < 2) return 'flat';

  const firstValue = data[0];
  const lastValue = data[data.length - 1];
  const change = lastValue - firstValue;
  const threshold = Math.abs(firstValue) * 0.001; // Very small threshold for detecting flat

  if (Math.abs(change) <= threshold || firstValue === lastValue) return 'flat';
  return change > 0 ? 'up' : 'down';
});

const isFlat = computed(() => {
  const data = normalizedData.value;
  if (data.length < 2) return true;

  const firstValue = data[0];
  return data.every(value => Math.abs(value - firstValue) < 0.001);
});
</script>

<style scoped>
.sparkline-wrapper {
  position: relative;
  display: inline-block;
  background-color: #ffffff;
  border-radius: 6px;
  padding: 2px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.sparkline-svg {
  display: block;
  overflow: visible;
}

.sparkline-path {
  transition: stroke-width 0.2s ease, opacity 0.2s ease;
}

.sparkline-wrapper:hover .sparkline-path {
  stroke-width: 2.5;
}

.data-point {
  opacity: 0;
  transition: opacity 0.2s ease, r 0.2s ease;
}

.sparkline-wrapper:hover .data-point {
  opacity: 1;
}

.data-point:hover {
  r: 3;
}

.start-point {
  opacity: 0.7;
}

.end-point {
  opacity: 1;
}

.trend-indicator {
  position: absolute;
  top: 2px;
  right: 2px;
  opacity: 0;
  transition: opacity 0.2s ease;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 2px;
  padding: 1px;
}

.sparkline-wrapper:hover .trend-indicator {
  opacity: 1;
}

.trend-indicator.up {
  color: #21ba45;
}

.trend-indicator.down {
  color: #c10015;
}

.trend-indicator.flat {
  color: #767676;
}

.grid-lines {
  pointer-events: none;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .sparkline-wrapper {
    background-color: #2d2d2d;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  .trend-indicator {
    background-color: rgba(45, 45, 45, 0.9);
  }
}

/* Professional animation on load */
.sparkline-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 1s ease-out forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .sparkline-path {
    animation: none;
    stroke-dasharray: none;
    stroke-dashoffset: 0;
  }

  .data-point,
  .trend-indicator,
  .sparkline-path {
    transition: none;
  }
}
</style>
