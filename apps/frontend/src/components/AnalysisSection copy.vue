<template>
  <div class="q-pa-md-md q-pa-xs-none">
    <div v-if="loading" class="row justify-center q-my-md">
      <q-spinner-cube color="primary" size="3em" />
    </div>
    <div v-else-if="error" class="text-negative text-center">
      <q-icon name="error" size="2em" />
      <p>{{ error }}</p>
    </div>

    <div v-else>
      <div class="ai-header text-center q-mb-xl q-pt-md">
        <q-icon name="auto_awesome" class="gemini-icon" size="3.5em" />
        <h4 class="text-h4 text-weight-bold q-mt-md q-mb-sm">
          Analisis Cerdas Berbasis AI
        </h4>
        <p class="text-subtitle1 text-grey-7" style="max-width: 600px; margin: 0 auto;">
          Didukung oleh model AI generatif untuk memberikan wawasan mendalam tentang data harga komoditas.
        </p>
      </div>

      <div class="row q-col-gutter-xl">
        <div v-for="analysis in analyses" :key="analysis.id" class="col-12">
          <q-card class="analysis-card">
            <!-- Card Header -->
            <q-card-section class="bg-grey-1">
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-h6 text-weight-bold">{{ analysis.komoditas.nama }}</div>
                  <div class="text-subtitle2 text-grey-8">
                    Analisis per: {{ new Date(analysis.analysis_date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long', year: 'numeric' }) }}
                  </div>
                </div>
                <div class="col-auto">
                  <q-chip :color="getConditionColor(analysis.condition_level)" text-color="white"
                    class="text-weight-bold" square>
                    <q-avatar :icon="getConditionIcon(analysis.condition_level)" color="white" text-color="primary" />
                    {{ analysis.condition_level }}
                  </q-chip>
                </div>
              </div>
            </q-card-section>

            <!-- Key Observation -->
            <q-card-section>
              <div class="text-subtitle1 text-weight-medium q-mb-sm">Observasi Kunci</div>
              <p class="text-body1">{{ analysis.key_observation }}</p>
            </q-card-section>

            <q-separator />

            <!-- Key Metrics -->
            <q-card-section>
              <div class="row q-col-gutter-md text-center">
                <div class="col-12 col-sm-4">
                  <q-card flat bordered class="metric-card">
                    <q-card-section>
                      <div class="text-overline">Volatilitas (90 Hari)</div>
                      <div class="text-h5 text-weight-bold text-deep-orange">{{ analysis.volatility_index.toFixed(2) }}%
                      </div>
                      <q-chip :color="getVolatilityColor(analysis.volatility_level)" text-color="white" size="sm">{{
                        analysis.volatility_level }}</q-chip>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-12 col-sm-4">
                  <q-card flat bordered class="metric-card">
                    <q-card-section>
                      <div class="text-overline">Tren Harga (Mingguan)</div>
                      <div class="text-h5 text-weight-bold"
                        :class="analysis.trend_direction === 'NAIK' ? 'text-negative' : 'text-positive'">
                        <q-icon :name="getTrendIcon(analysis.trend_direction)" /> {{ analysis.trend_direction }}
                      </div>
                      <q-chip :color="getTrendStrengthColor(analysis.trend_strength)" text-color="white" size="sm">{{
                        analysis.trend_strength }}</q-chip>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-12 col-sm-4">
                  <q-card flat bordered class="metric-card">
                    <q-card-section>
                      <div class="text-overline">Deviasi dari Rata-rata</div>
                      <div class="text-h5 text-weight-bold"
                        :class="analysis.deviation_percentage > 0 ? 'text-negative' : 'text-positive'">
                        {{ analysis.deviation_percentage.toFixed(2) }}%
                      </div>
                      <q-chip color="blue-grey" text-color="white" size="sm">dari rata-rata 90 hari</q-chip>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-card-section>

            <!-- Tabs for Detailed Info -->
            <q-tabs v-model="analysis.tab" dense class="text-grey-7" align="justify" indicator-color="primary"
              active-color="primary">
              <q-tab name="details" label="Analisis Rinci" />
              <q-tab name="outlook" label="Proyeksi & Implikasi" />
              <q-tab name="strategic" label="Analisis Strategis" />
              <q-tab name="recommendations" label="Rekomendasi" />
              <q-tab name="stakeholders" label="Untuk Stakeholder" />
              <q-tab name="methodology" label="Metodologi" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="analysis.tab" animated class="bg-grey-1">
              <q-tab-panel name="details">
                <q-list separator bordered class="rounded-borders bg-white">
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Posisi Harga Saat Ini</q-item-label>
                      <q-item-label caption>{{ analysis.current_position }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Pola Harga Teridentifikasi</q-item-label>
                      <q-item-label caption>{{ analysis.price_pattern }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Analisis Volatilitas</q-item-label>
                      <q-item-label caption>{{ analysis.volatility_cv_interpretation }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Analisis Tren</q-item-label>
                      <q-item-label caption>{{ analysis.trend_analysis }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="outlook">
                <q-list separator bordered class="rounded-borders bg-white">
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Proyeksi Jangka Pendek (1-7 Hari)</q-item-label>
                      <q-item-label caption>{{ analysis.short_term_outlook }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Keberlanjutan Pola</q-item-label>
                      <q-item-label caption>{{ analysis.pattern_sustainability }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Implikasi Pola</q-item-label>
                      <q-item-label v-for="item in analysis.pattern_implications" :key="item.id" caption
                        class="q-mb-sm">
                        <q-icon name="double_arrow" size="xs" color="primary" class="q-mr-sm" />{{ item.content }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="strategic">
                <q-list separator bordered class="rounded-borders bg-white">
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Hipotesis Penyebab</q-item-label>
                      <q-item-label caption>{{ analysis.strategic_analysis.causal_hypothesis }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Potensi Dampak</q-item-label>
                      <q-item-label caption>{{ analysis.strategic_analysis.potential_impact_framing }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="recommendations">
                <div class="text-subtitle1 text-weight-medium q-mb-sm">Peringatan Berbasis Data</div>
                <q-chip v-for="alert in analysis.data_based_alerts" :key="alert.id" icon="warning" color="negative"
                  text-color="white" class="q-ma-xs">
                  {{ alert.content }}
                </q-chip>
                <q-separator class="q-my-md" />
                <div class="text-subtitle1 text-weight-medium q-mb-sm">Saran Monitoring</div>
                <q-list bordered separator class="rounded-borders bg-white q-mb-md">
                  <q-item v-for="suggestion in analysis.monitoring_suggestions" :key="suggestion.id">
                    <q-item-section avatar top>
                      <q-icon name="monitor_heart" color="primary" />
                    </q-item-section>
                    <q-item-section>{{ suggestion.content }}</q-item-section>
                  </q-item>
                </q-list>
                <div class="text-subtitle1 text-weight-medium q-mb-sm">Metrik Kunci untuk Diperhatikan</div>
                <q-list bordered separator class="rounded-borders bg-white">
                  <q-item v-for="metric in analysis.key_metrics_to_watch" :key="metric.id">
                    <q-item-section avatar top>
                      <q-icon name="visibility" color="primary" />
                    </q-item-section>
                    <q-item-section>{{ metric.content }}</q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="stakeholders">
                <q-list separator bordered class="rounded-borders bg-white">
                  <q-expansion-item icon="groups" label="Untuk Dinas Perdagangan" header-class="text-weight-bold">
                    <q-card>
                      <q-card-section>{{ analysis.stakeholder_considerations.for_dinas_perdagangan }}</q-card-section>
                    </q-card>
                  </q-expansion-item>
                  <q-expansion-item icon="agriculture" label="Untuk Dinas Pertanian" header-class="text-weight-bold">
                    <q-card>
                      <q-card-section>{{ analysis.stakeholder_considerations.for_dinas_pertanian }}</q-card-section>
                    </q-card>
                  </q-expansion-item>
                  <q-expansion-item icon="policy" label="Untuk Koordinator TPID" header-class="text-weight-bold">
                    <q-card>
                      <q-card-section>{{ analysis.stakeholder_considerations.for_koordinator_tpid }}</q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="methodology">
                <q-list separator bordered class="rounded-borders bg-white">
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Catatan Kualitas Data</q-item-label>
                      <q-item-label v-for="item in analysis.data_quality_notes" :key="item.id" caption class="q-mb-sm">
                        <q-icon name="check_circle" size="xs" color="positive" class="q-mr-sm" />{{ item.content }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Batasan Data</q-item-label>
                      <q-item-label v-for="item in analysis.data_constraints" :key="item.id" caption class="q-mb-sm">
                        <q-icon name="warning" size="xs" color="warning" class="q-mr-sm" />{{ item.content }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Asumsi yang Digunakan</q-item-label>
                      <q-item-label v-for="item in analysis.assumptions_made" :key="item.id" caption class="q-mb-sm">
                        <q-icon name="help" size="xs" color="info" class="q-mr-sm" />{{ item.content }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Faktor Eksternal</q-item-label>
                      <q-item-label caption>{{ analysis.external_factors_note }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAnalysisStore } from 'src/stores/analysisStore';

const analysisStore = useAnalysisStore();
const { analyses, loading, error } = storeToRefs(analysisStore);

// --- Icon and Color Helper Functions ---

const getTrendIcon = (trend) => {
  if (trend === 'TURUN') return 'trending_down';
  if (trend === 'NAIK') return 'trending_up';
  return 'trending_flat';
};

const getTrendStrengthColor = (strength) => {
  if (strength === 'SANGAT_KUAT' || strength === 'KUAT') return 'negative';
  if (strength === 'SEDANG') return 'orange';
  return 'grey';
}

const getVolatilityColor = (volatility) => {
  if (volatility === 'EKSTREM' || volatility === 'SANGAT_TINGGI') return 'negative';
  if (volatility === 'TINGGI') return 'deep-orange';
  if (volatility === 'SEDANG') return 'orange';
  return 'green';
};

const getConditionIcon = (condition) => {
  if (condition === 'EKSTREM') return 'local_fire_department';
  if (condition === 'BERGEJOLAK') return 'flash_on';
  return 'shield';
};

const getConditionColor = (condition) => {
  if (condition === 'EKSTREM') return 'negative';
  if (condition === 'BERGEJOLAK') return 'purple';
  return 'blue-grey';
};

// --- Lifecycle Hooks ---

watch(analyses, (newAnalyses) => {
  if (newAnalyses) {
    newAnalyses.forEach(analysis => {
      if (!analysis.tab) {
        analysis.tab = 'details';
      }
    });
  }
}, { immediate: true, deep: true });

onMounted(() => {
  analysisStore.fetchAnalyses();
});
</script>

<style scoped>
.ai-header .gemini-icon {
  background: linear-gradient(45deg, #4285F4, #9B59B6, #CF6398, #F4B400);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.analysis-card {
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  border: 1px solid #E0E0E0;
}

.metric-card {
  border-radius: 12px;
  height: 100%;
}

.q-item__label--overline {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #1976D2;
  /* Primary color for titles */
}

.q-tab-panel {
  padding: 24px;
}

.q-expansion-item--expanded {
  background-color: #f8f9fa;
}
</style>
