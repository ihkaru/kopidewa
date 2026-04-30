<!-- AppFooter.vue -->
<template>
  <div
    ref="footerRef"
    class="footer-wrapper"
    :class="{ 'footer-visible': isVisible }"
  >
    <div class="footer-content bg-grey-2 q-pa-md">
      <!-- Contact Section -->
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <div class="text-h6 text-dark">Kontak</div>
          <div class="q-mt-sm">
            <div class="text-body2">
              <q-icon name="phone" size="xs" class="q-mr-sm" />
              Telp: {{ Config.institution.phone }}
            </div>
            <div class="text-body2 q-mt-xs">
              <q-icon name="mail" size="xs" class="q-mr-sm" />
              E-Mail: {{ Config.institution.email }}
            </div>
          </div>
        </div>

        <!-- Address Section -->
        <div class="col-12 col-md-8">
          <div class="text-h6 text-dark">Alamat</div>
          <div class="text-body2 q-mt-sm">
            {{ Config.institution.name }}
            <br />
            {{ Config.institution.address }}
            <br />
            {{ Config.institution.cityStateZip }}
          </div>
        </div>
      </div>

      <!-- Partner Logos -->
      <div
        class="justify-center q-gutter-xs"
        style="margin-top: 50px; display: flex"
      >
        <!-- Main Logo -->
        <q-img
          :src="`assets/${Config.assets.logoMain}`"
          spinner-color="primary"
          style="height: 8vh; max-width: 200px"
          fit="contain"
        />
        <!-- Partner Logo -->
        <q-img
          :src="`assets/${Config.assets.logoPartner}`"
          spinner-color="primary"
          style="height: 8vh; max-width: 200px"
          fit="contain"
        />
      </div>

      <!-- Collaboration Text -->
      <div class="row justify-center q-mt-md">
        <div class="text-center text-body2 text-grey-8">Didukung oleh:</div>
      </div>
      <div class="row justify-center q-mt-sm">
        <div class="text-center text-body2 text-grey-8">
          {{ Config.appSubtitle }}
        </div>
      </div>

      <!-- Copyright -->
      <div class="row justify-center q-mt-lg">
        <div class="text-caption text-grey-7">
          © {{ currentYear }} {{ Config.region.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import Config from "src/config";

// Refs
const footerRef = ref(null);
const isVisible = ref(false);
let observer = null;

// Computed
const currentYear = computed(() => new Date().getFullYear());

// Methods
const setupIntersectionObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      isVisible.value = entries[0].isIntersecting;
    },
    {
      threshold: 0.1, // Footer akan mulai terlihat saat 10% terlihat
    }
  );

  if (footerRef.value) {
    observer.observe(footerRef.value);
  }
};

// Lifecycle hooks
onMounted(() => {
  setupIntersectionObserver();
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.footer-wrapper {
  position: relative;
  width: 100%;
  opacity: 0;
  transform: translateY(10%);
  transition: all 0.5s ease;
}

.footer-visible {
  opacity: 1;
  transform: translateY(0);
}

.footer-content {
  border-top: 1px solid #e0e0e0;
}
</style>
