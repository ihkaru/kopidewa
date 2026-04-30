<template>
  <div class="q-pa-md-md q-pa-xs-none">
    <div v-if="loading" class="row justify-center q-my-md">
      <q-spinner-cube color="primary" size="3em" />
    </div>
    <div v-else-if="error" class="text-negative">
      {{ error }}
    </div>

    <div v-else>
      <!-- AI Generated Report Header -->
      <div class="ai-header text-center q-mb-xl q-pt-md">
        <q-icon name="auto_awesome" class="gemini-icon" size="3.5em" />
        <h4 class="text-h4 text-weight-bold q-mt-md q-mb-sm">
          Analisis Cerdas Berbasis AI
        </h4>
        <p class="text-subtitle1" :class="dark ? 'text-grey-5' : 'text-grey-7'"
          style="max-width: 600px; margin: 0 auto;">
          Didukung oleh model AI generatif untuk memberikan wawasan mendalam tentang data harga komoditas.
        </p>
      </div>

      <!-- Analysis Cards -->
      <div class="row q-col-gutter-md">
        <div v-for="analysis in analyses" :key="analysis.id" class="col-xs-12 col-md-6">
          <q-card :class="['ai-card', { 'dark': dark, 'light': !dark }]">
            <!-- Header Section -->
            <q-card-section class="analysis-header">
              <q-item>
                <q-item-section avatar>
                  <q-avatar size="60px">
                    <q-img :src="'https://harga-api.dvlp.asia/komoditas/' +
                      analysis.komoditas.nama +
                      '.webp'
                      " style="
                        max-width: 45px;
                        max-height: 45px;
                        border-radius: 50%;
                      " />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h5 text-weight-bold">{{
                    analysis.komoditas.nama }}</q-item-label>
                  <q-item-label caption :class="dark ? 'text-grey-5' : 'text-grey-7'">
                    Analisis per: <br>{{ formatDate(analysis.analysis_date) }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side class="text-right">
                  <q-chip color="white" dense class="price-change text-h6 text-weight-bold"
                    :class="getWeekPriceChange(analysis.komoditas.nama).change > 0 ? 'text-red' : 'text-green'">
                    {{ getWeekPriceChange(analysis.komoditas.nama).change > 0 ? '+' +
                      getWeekPriceChange(analysis.komoditas.nama).change :
                      getWeekPriceChange(analysis.komoditas.nama).change }}%
                    <q-tooltip>{{ getWeekPriceChange(analysis.komoditas.nama).tooltip }}</q-tooltip>
                  </q-chip>
                </q-item-section>
              </q-item>

              <!-- Status Indicators -->

              <!-- Status Indicators -->
              <div class="row items-center q-gutter-sm q-mt-md">
                <q-chip :color="getConfidenceColor(analysis.analysis_confidence)" text-color="white" size="sm"
                  icon="trending_up">
                  {{ analysis.analysis_confidence }} CONFIDENCE
                  <info-tooltip :title="termDefinitions.analysis_confidence.title"
                    :definition="termDefinitions.analysis_confidence.definition" icon-color="white"
                    class="tooltip-white-icon" />
                </q-chip>
                <q-chip :icon="getTrendIcon(analysis.trend_direction)" :color="getTrendColor(analysis.trend_direction)"
                  text-color="white" size="sm">
                  {{ analysis.trend_direction }} ({{ analysis.trend_strength }})
                  <info-tooltip :title="termDefinitions.trend_direction.title"
                    :definition="termDefinitions.trend_direction.definition" icon-color="white" />
                </q-chip>
                <q-chip :icon="getConditionIcon(analysis.condition_level)"
                  :color="getConditionColor(analysis.condition_level)" text-color="white" size="sm">
                  {{ analysis.condition_level }}
                  <info-tooltip :title="termDefinitions.condition_level.title"
                    :definition="termDefinitions.condition_level.definition" icon-color="white" />
                </q-chip>
                <q-chip :icon="getVolatilityIcon(analysis.volatility_level)"
                  :color="getVolatilityColor(analysis.volatility_level)" text-color="white" size="sm">
                  Volatilitas {{ analysis.volatility_level }}
                  <info-tooltip :title="termDefinitions.volatility_analysis.title"
                    :definition="termDefinitions.volatility_analysis.definition" icon-color="white" />
                </q-chip>
              </div>

              <!-- Key Metrics Bar -->
              <div class="metrics-bar q-mt-md q-pa-md" :class="dark ? 'bg-grey-9' : 'bg-grey-2'">
                <div class="row q-gutter-md">
                  <div class="col">
                    <div class="text-caption" :class="dark ? 'text-grey-4' : 'text-grey-7'">Volatility Index
                      <info-tooltip :title="termDefinitions.volatility_index.title"
                        :definition="termDefinitions.volatility_index.definition" />
                    </div>
                    <div class="text-h6 text-weight-bold">{{ analysis.volatility_index.toFixed(2) }}%</div>
                  </div>
                  <div class="col">
                    <div class="text-caption" :class="dark ? 'text-grey-4' : 'text-grey-7'">Price Deviation
                      <info-tooltip :title="termDefinitions.deviation_from_average.title"
                        :definition="termDefinitions.deviation_from_average.definition" />
                    </div>
                    <div class="text-h6 text-weight-bold"
                      :class="analysis.deviation_percentage > 0 ? 'text-red' : 'text-green'">
                      {{ analysis.deviation_percentage.toFixed(2) }}%
                    </div>
                  </div>
                  <div class="col">
                    <div class="text-caption" :class="dark ? 'text-grey-4' : 'text-grey-7'">Category</div>
                    <div class="text-h6 text-weight-bold text-purple">{{ analysis.commodity_category }}</div>
                  </div>
                </div>
              </div>
            </q-card-section>

            <!-- Enhanced Tabs -->
            <q-tabs v-model="analysis.tab" dense :class="dark ? 'text-grey-4 bg-grey-8' : 'text-grey-7 bg-grey-1'"
              align="justify" indicator-color="primary">
              <q-tab label="Ringkasan" name="summary" icon="summarize" />
              <q-tab label="Analisis Teknis" name="technical" icon="analytics" />
              <q-tab label="Analisis Strategis" name="strategic" icon="psychology" />
              <q-tab label="Stakeholder" name="stakeholder" icon="groups" />
              <q-tab label="Monitoring" name="monitoring" icon="monitor_heart" />
              <q-tab label="Peringatan" name="warnings" icon="warning" />
              <q-tab label="Data & Asumsi" name="data" icon="dataset" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="analysis.tab" animated>
              <!-- Summary Panel -->
              <q-tab-panel name="summary">
                <q-scroll-area style="height: 400px;">
                  <div class="analysis-content">
                    <div class="insight-card q-mb-md">
                      <div class="insight-header">
                        <q-icon name="visibility" class="text-primary" size="sm" />
                        <span class="text-subtitle1 text-weight-medium q-ml-sm">Observasi Kunci</span>
                        <info-tooltip :title="termDefinitions.key_observation.title"
                          :definition="termDefinitions.key_observation.definition" />
                      </div>
                      <p class="text-body2 q-mt-sm">{{ analysis.key_observation }}</p>
                    </div>

                    <div class="insight-card q-mb-md">
                      <div class="insight-header">
                        <q-icon name="place" class="text-primary" size="sm" />
                        <span class="text-subtitle1 text-weight-medium q-ml-sm">Posisi Harga</span>
                        <info-tooltip :title="termDefinitions.current_position.title"
                          :definition="termDefinitions.current_position.definition" />
                      </div>
                      <p class="text-body2 q-mt-sm">{{ analysis.current_position }}</p>
                      <div class="q-mt-sm">
                        <q-linear-progress :value="Math.abs(analysis.deviation_percentage) / 50"
                          :color="analysis.deviation_percentage > 0 ? 'red' : 'green'" size="8px" rounded />
                        <div class="text-caption q-mt-xs" :class="dark ? 'text-grey-4' : 'text-grey-7'">
                          {{ analysis.deviation_interpretation }}
                        </div>
                      </div>
                    </div>

                    <div class="insight-card">
                      <div class="insight-header">
                        <q-icon name="trending_up" class="text-primary" size="sm" />
                        <span class="text-subtitle1 text-weight-medium q-ml-sm">Prospek Jangka Pendek</span>
                        <info-tooltip :title="termDefinitions.short_term_outlook.title"
                          :definition="termDefinitions.short_term_outlook.definition" />
                      </div>
                      <p class="text-body2 q-mt-sm">{{ analysis.short_term_outlook }}</p>
                      <div class="q-mt-sm">
                        <q-chip dense
                          :color="analysis.pattern_sustainability.includes('berkelanjutan') ? 'positive' : 'warning'"
                          text-color="white">
                          Sustainability: {{ analysis.pattern_sustainability ? 'Evaluasi Tersedia' : 'Perlu Evaluasi' }}
                          <info-tooltip :title="termDefinitions.pattern_sustainability.title"
                            :definition="termDefinitions.pattern_sustainability.definition" />
                        </q-chip>
                      </div>
                    </div>
                  </div>
                </q-scroll-area>
              </q-tab-panel>

              <!-- Technical Analysis Panel -->
              <q-tab-panel name="technical">
                <q-scroll-area style="height: 400px;">
                  <div class="analysis-content">
                    <q-list separator>
                      <q-item>
                        <q-item-section avatar>
                          <q-icon name="show_chart" color="primary" size="md" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label class="text-weight-medium">Pola Harga
                            <info-tooltip :title="termDefinitions.price_pattern.title"
                              :definition="termDefinitions.price_pattern.definition" />
                          </q-item-label>
                          <q-item-label caption>{{ analysis.price_pattern }}</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item>
                        <q-item-section avatar>
                          <q-icon name="equalizer" color="orange" size="md" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label class="text-weight-medium">Analisis Volatilitas
                            <info-tooltip :title="termDefinitions.volatility_analysis.title"
                              :definition="termDefinitions.volatility_analysis.definition" />
                          </q-item-label>
                          <q-item-label caption>{{ analysis.volatility_analysis }}</q-item-label>
                          <q-item-label caption class="q-mt-xs">
                            <strong>Interpretasi CV:</strong> {{ analysis.volatility_cv_interpretation }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item>
                        <q-item-section avatar>
                          <q-icon name="timeline" color="blue" size="md" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label class="text-weight-medium">Analisis Tren
                            <info-tooltip :title="termDefinitions.trend_analysis.title"
                              :definition="termDefinitions.trend_analysis.definition" />
                          </q-item-label>
                          <q-item-label caption>{{ analysis.trend_analysis }}</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item v-if="analysis.pattern_implications && analysis.pattern_implications.length">
                        <q-item-section avatar>
                          <q-icon name="psychology" color="purple" size="md" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label class="text-weight-medium">Implikasi Pola
                            <info-tooltip :title="termDefinitions.pattern_implications.title"
                              :definition="termDefinitions.pattern_implications.definition" />
                          </q-item-label>
                          <q-list dense class="q-mt-sm">
                            <q-item v-for="implication in analysis.pattern_implications" :key="implication.id" dense>
                              <q-item-section avatar style="width: 20px; margin: 0; padding: 0;">
                                <q-icon name="arrow_right" size="xs" />
                              </q-item-section>
                              <q-item-section>
                                <q-item-label caption>{{ implication.content }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </q-scroll-area>
              </q-tab-panel>

              <!-- Strategic Analysis Panel -->
              <q-tab-panel name="strategic" v-if="analysis.strategic_analysis">
                <q-scroll-area style="height: 400px;">
                  <div class="analysis-content">
                    <div class="insight-card q-mb-md">
                      <div class="insight-header">
                        <q-icon name="psychology" class="text-purple" size="sm" />
                        <span class="text-subtitle1 text-weight-medium q-ml-sm">Hipotesis Kausal</span>
                        <info-tooltip :title="termDefinitions.causal_hypothesis.title"
                          :definition="termDefinitions.causal_hypothesis.definition" />
                      </div>
                      <p class="text-body2 q-mt-sm">{{ analysis.strategic_analysis.causal_hypothesis }}</p>
                    </div>

                    <div class="insight-card">
                      <div class="insight-header">
                        <q-icon name="impact" class="text-red" size="sm" />
                        <span class="text-subtitle1 text-weight-medium q-ml-sm">Framing Dampak Potensial</span>
                        <info-tooltip :title="termDefinitions.potential_impact_framing.title"
                          :definition="termDefinitions.potential_impact_framing.definition" />
                      </div>
                      <p class="text-body2 q-mt-sm">{{ analysis.strategic_analysis.potential_impact_framing }}</p>
                    </div>

                    <div class="insight-card q-mt-md" v-if="analysis.pattern_sustainability">
                      <div class="insight-header">
                        <q-icon name="schedule" class="text-blue" size="sm" />
                        <span class="text-subtitle1 text-weight-medium q-ml-sm">Keberlanjutan Pola</span>
                        <info-tooltip :title="termDefinitions.pattern_sustainability.title"
                          :definition="termDefinitions.pattern_sustainability.definition" />
                      </div>
                      <p class="text-body2 q-mt-sm">{{ analysis.pattern_sustainability }}</p>
                    </div>

                    <div class="q-mt-md" v-if="analysis.external_factors_note">
                      <q-banner inline-actions class="text-white bg-blue-grey-8">
                        <template v-slot:avatar>
                          <q-icon name="info" />
                        </template>
                        {{ analysis.external_factors_note }}
                        <info-tooltip :title="termDefinitions.external_factors_note.title"
                          :definition="termDefinitions.external_factors_note.definition" />
                      </q-banner>
                    </div>
                  </div>
                </q-scroll-area>
              </q-tab-panel>

              <!-- Stakeholder Panel -->
              <q-tab-panel name="stakeholder" v-if="analysis.stakeholder_considerations">
                <q-scroll-area style="height: 400px;">
                  <div class="analysis-content">
                    <q-list separator>
                      <q-item>
                        <q-item-section avatar>
                          <q-icon name="storefront" color="green" size="md" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label class="text-weight-medium">Dinas Perdagangan
                            <info-tooltip :title="termDefinitions.stakeholder_specific_considerations.title"
                              :definition="termDefinitions.stakeholder_specific_considerations.definition" />
                          </q-item-label>
                          <q-item-label caption>{{ analysis.stakeholder_considerations.for_dinas_perdagangan
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item>
                        <q-item-section avatar>
                          <q-icon name="agriculture" color="light-green" size="md" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label class="text-weight-medium">Dinas Pertanian</q-item-label>
                          <q-item-label caption>{{ analysis.stakeholder_considerations.for_dinas_pertanian
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item>
                        <q-item-section avatar>
                          <q-icon name="hub" color="blue" size="md" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label class="text-weight-medium">Koordinator TPID</q-item-label>
                          <q-item-label caption>{{ analysis.stakeholder_considerations.for_koordinator_tpid
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </q-scroll-area>
              </q-tab-panel>

              <!-- Monitoring Panel -->
              <q-tab-panel name="monitoring">
                <q-scroll-area style="height: 400px;">
                  <div class="analysis-content">
                    <div class="insight-card q-mb-md">
                      <div class="insight-header">
                        <q-icon name="monitor_heart" class="text-primary" size="sm" />
                        <span class="text-subtitle1 text-weight-medium q-ml-sm">Saran Monitoring</span>
                        <info-tooltip :title="termDefinitions.monitoring_suggestions.title"
                          :definition="termDefinitions.monitoring_suggestions.definition" />
                      </div>
                      <q-list dense class="q-mt-sm">
                        <q-item v-for="suggestion in analysis.monitoring_suggestions" :key="suggestion.id" dense>
                          <q-item-section avatar>
                            <q-icon color="primary" name="monitor_heart" size="sm" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label caption>{{ suggestion.content }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>

                    <div class="insight-card">
                      <div class="insight-header">
                        <q-icon name="visibility" class="text-blue" size="sm" />
                        <span class="text-subtitle1 text-weight-medium q-ml-sm">Metrik Kunci untuk Diperhatikan</span>
                        <info-tooltip :title="termDefinitions.key_metrics_to_watch.title"
                          :definition="termDefinitions.key_metrics_to_watch.definition" />
                      </div>
                      <q-list dense class="q-mt-sm">
                        <q-item v-for="metric in analysis.key_metrics_to_watch" :key="metric.id" dense>
                          <q-item-section avatar>
                            <q-icon color="blue" name="visibility" size="sm" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label caption>{{ metric.content }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </div>
                </q-scroll-area>
              </q-tab-panel>

              <!-- Warnings Panel -->
              <q-tab-panel name="warnings">
                <q-scroll-area style="height: 400px;">
                  <div class="analysis-content">
                    <div class="insight-card q-mb-md">
                      <div class="insight-header">
                        <q-icon name="warning" class="text-negative" size="sm" />
                        <span class="text-subtitle1 text-weight-medium q-ml-sm">Peringatan Berbasis Data</span>
                        <info-tooltip :title="termDefinitions.data_based_alerts.title"
                          :definition="termDefinitions.data_based_alerts.definition" />
                      </div>
                      <q-list dense class="q-mt-sm">
                        <q-item v-for="alert in analysis.data_based_alerts" :key="alert.id" dense>
                          <q-item-section avatar>
                            <q-icon color="negative" name="warning" size="sm" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label caption>{{ alert.content }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>

                    <div class="insight-card">
                      <div class="insight-header">
                        <q-icon name="science" class="text-orange" size="sm" />
                        <span class="text-subtitle1 text-weight-medium q-ml-sm">Peringatan Statistik</span>
                        <info-tooltip :title="termDefinitions.statistical_warnings.title"
                          :definition="termDefinitions.statistical_warnings.definition" />
                      </div>
                      <q-list dense class="q-mt-sm">
                        <q-item v-for="warning in analysis.statistical_warnings" :key="warning.id" dense>
                          <q-item-section avatar>
                            <q-icon color="orange" name="science" size="sm" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label caption>{{ warning.content }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </div>
                </q-scroll-area>
              </q-tab-panel>

              <!-- Data & Assumptions Panel -->
              <q-tab-panel name="data">
                <q-scroll-area style="height: 400px;">
                  <div class="analysis-content">
                    <!-- Data Quality -->
                    <div class="insight-card q-mb-md"
                      v-if="analysis.data_quality_notes && analysis.data_quality_notes.length">
                      <div class="insight-header">
                        <q-icon name="data_usage" class="text-blue" size="sm" />
                        <span class="text-subtitle1 text-weight-medium q-ml-sm">Catatan Kualitas Data</span>
                        <info-tooltip :title="termDefinitions.data_quality_notes.title"
                          :definition="termDefinitions.data_quality_notes.definition" />
                      </div>
                      <q-list dense class="q-mt-sm">
                        <q-item v-for="note in analysis.data_quality_notes" :key="note.id" dense>
                          <q-item-section avatar>
                            <q-icon color="blue" name="info" size="sm" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label caption>{{ note.content }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>

                    <!-- Data Constraints -->
                    <div class="insight-card q-mb-md"
                      v-if="analysis.data_constraints && analysis.data_constraints.length">
                      <div class="insight-header">
                        <q-icon name="block" class="text-orange" size="sm" />
                        <span class="text-subtitle1 text-weight-medium q-ml-sm">Keterbatasan Data</span>
                        <info-tooltip :title="termDefinitions.data_constraints.title"
                          :definition="termDefinitions.data_constraints.definition" />
                      </div>
                      <q-list dense class="q-mt-sm">
                        <q-item v-for="constraint in analysis.data_constraints" :key="constraint.id" dense>
                          <q-item-section avatar>
                            <q-icon color="orange" name="block" size="sm" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label caption>{{ constraint.content }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>

                    <!-- Assumptions -->
                    <div class="insight-card q-mb-md"
                      v-if="analysis.assumptions_made && analysis.assumptions_made.length">
                      <div class="insight-header">
                        <q-icon name="lightbulb" class="text-yellow" size="sm" />
                        <span class="text-subtitle1 text-weight-medium q-ml-sm">Asumsi yang Digunakan</span>
                        <info-tooltip :title="termDefinitions.assumptions_made.title"
                          :definition="termDefinitions.assumptions_made.definition" />
                      </div>
                      <q-list dense class="q-mt-sm">
                        <q-item v-for="assumption in analysis.assumptions_made" :key="assumption.id" dense>
                          <q-item-section avatar>
                            <q-icon color="yellow" name="lightbulb" size="sm" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label caption>{{ assumption.content }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>

                    <!-- Additional Data Suggestions -->
                    <div class="insight-card"
                      v-if="analysis.additional_data_suggestions && analysis.additional_data_suggestions.length">
                      <div class="insight-header">
                        <q-icon name="add_chart" class="text-green" size="sm" />
                        <span class="text-subtitle1 text-weight-medium q-ml-sm">Saran Data Tambahan</span>
                        <info-tooltip :title="termDefinitions.additional_data_suggestions.title"
                          :definition="termDefinitions.additional_data_suggestions.definition" />
                      </div>
                      <q-list dense class="q-mt-sm">
                        <q-item v-for="suggestion in analysis.additional_data_suggestions" :key="suggestion.id" dense>
                          <q-item-section avatar>
                            <q-icon color="green" name="add_chart" size="sm" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label caption>{{ suggestion.content }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </div>
                </q-scroll-area>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import { useAnalysisStore } from 'src/stores/analysisStore';
import { useKomoditasStore } from 'src/stores/komoditasStore';
import InfoTooltip from './InfoTooltip.vue';
import { termDefinitions } from 'src/utils/termDefinitions.js';

const props = defineProps({
  dark: {
    type: Boolean,
    default: true,
  },
});

const analysisStore = useAnalysisStore();
const { analyses, loading, error } = storeToRefs(analysisStore);
const komoditasStore = useKomoditasStore();

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getWeekPriceChange(komoditasNama) {
  const commodity = komoditasStore.get().find(c => c.nama === komoditasNama);
  if (!commodity || !commodity.data || commodity.data.length < 2) {
    return {
      change: 0,
      trend: 'flat',
      tooltip: 'Data tidak cukup untuk menghitung perubahan harga 1 minggu.'
    };
  }

  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const recentPrices = commodity.data.filter(d => new Date(d.date) >= sevenDaysAgo && new Date(d.date) <= today);

  if (recentPrices.length < 2) {
    return {
      change: 0,
      trend: 'flat',
      tooltip: 'Tidak ada data harga dalam 7 hari terakhir.'
    };
  }

  const latestPrice = recentPrices[recentPrices.length - 1].price;
  const oldestPrice = recentPrices[0].price;

  const change = (((latestPrice - oldestPrice) / oldestPrice) * 100).toFixed(2);
  const trend = change > 0 ? 'up' : 'down';

  return {
    change,
    trend,
    tooltip: `Perubahan harga 1 minggu: ${change}%`
  };
}

// Enhanced helper functions
const getConfidenceColor = (confidence) => {
  switch (confidence) {
    case 'HIGH': return 'green';
    case 'MEDIUM': return 'orange';
    case 'LOW': return 'red';
    default: return 'grey';
  }
};

const getTrendIcon = (trend) => {
  if (trend === 'TURUN') return 'trending_down';
  if (trend === 'NAIK') return 'trending_up';
  return 'trending_flat';
};

const getTrendColor = (trend) => {
  if (trend === 'TURUN') return 'positive';
  if (trend === 'NAIK') return 'negative';
  return 'grey';
};

const getVolatilityIcon = (volatility) => {
  if (volatility === 'TINGGI' || volatility === 'SANGAT_TINGGI') return 'error_outline';
  if (volatility === 'SEDANG') return 'warning_amber';
  return 'check_circle_outline';
};

const getVolatilityColor = (volatility) => {
  if (volatility === 'SANGAT_TINGGI') return 'negative';
  if (volatility === 'TINGGI') return 'deep-orange';
  if (volatility === 'SEDANG') return 'orange';
  return 'green';
};

const getConditionIcon = (condition) => {
  switch (condition) {
    case 'EKSTREM': return 'dangerous';
    case 'BERGEJOLAK': return 'flash_on';
    default: return 'shield';
  }
};

const getConditionColor = (condition) => {
  switch (condition) {
    case 'EKSTREM': return 'red';
    case 'BERGEJOLAK': return 'purple';
    default: return 'blue-grey';
  }
};

const getStatisticalIcon = (significance) => {
  return significance === 'SIGNIFIKAN' ? 'verified' : 'help';
};

const getStatisticalColor = (significance) => {
  return significance === 'SIGNIFIKAN' ? 'green' : 'grey';
};

onMounted(() => {
  analysisStore.fetchAnalyses();
});

</script>

<style lang="scss" scoped>
.gemini-icon {
  background: -webkit-linear-gradient(45deg, #4285F4, #9b72cb, #d96570, #f2a600);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ai-card {
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
  overflow: hidden;

  &.dark {
    background-color: #1e1e1e;
    border: 1px solid #333;
  }

  &.light {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
}

.analysis-header {
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
}

.metrics-bar {
  border-radius: 8px;
}

.analysis-content {
  padding: 8px;
}

.insight-card {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid;
  transition: background-color 0.3s;

  .dark & {
    border-color: #333;
    background-color: rgba(255, 255, 255, 0.05);
  }

  .light & {
    border-color: #eee;
    background-color: #f9f9f9;
  }
}

.insight-header {
  display: flex;
  align-items: center;
}

.q-tab-panel {
  padding: 8px;
}

.q-list--separator>.q-item-type+.q-item-type {
  border-top: 1px solid rgba(128, 128, 128, 0.2);
}

/* Responsive Typography */
.ai-header .text-h4 {
  font-size: clamp(1.75rem, 5vw, 2.125rem);
  line-height: clamp(2rem, 6vw, 2.5rem);
}

.ai-header .text-subtitle1 {
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  line-height: clamp(1.3rem, 3.5vw, 1.5rem);
}

.analysis-header .text-h5 {
  font-size: clamp(0.8rem, 1.5vw, 1.1rem);
}

.analysis-header .q-item__label--caption {
  font-size: clamp(0.75rem, 2vw, 0.875rem);
}

.q-chip {
  font-size: clamp(0.7rem, 2vw, 0.85rem);
  padding: clamp(4px, 1vw, 6px) clamp(8px, 1.5vw, 10px);
  height: auto;
}

.metrics-bar .text-h6 {
  font-size: clamp(1rem, 3vw, 1.25rem);
}

.metrics-bar .text-caption {
  font-size: clamp(0.7rem, 2vw, 0.75rem);
}

.insight-header .text-subtitle1 {
  font-size: clamp(1rem, 2.8vw, 1.1rem);
}

.analysis-content p.text-body2 {
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  line-height: clamp(1.3rem, 3.5vw, 1.5rem);
}

.q-tab__label {
  font-size: clamp(0.75rem, 2vw, 0.875rem);
}

/* Specific adjustments for smaller chips */
.row .q-chip {
  padding: clamp(3px, 0.8vw, 5px) clamp(6px, 1.2vw, 8px);
}

.price-change {
  font-weight: clamp(1rem, 2vw, 2.25rem);
  font-size: 13px;
  padding: 2px 6px;
  min-width: 45px;
  text-align: center;
}

.tooltip-white-icon :deep(.q-icon) {
  color: white !important;
}
</style>
