import { api } from "src/boot/axios";
import { useKomoditasStore } from "src/stores/komoditasStore";
import { useUtils } from "src/utils/utils";
import { ref } from "vue";

export function useSyncService() {
  const komoditas = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const Utils = useUtils();
  const lastUpdate = ref(null);
  const komoditasStore = useKomoditasStore();

  const loadingUpdate = ref(false);
  const errodUpdate = ref(null);
  const dataUpdate = ref({});
  const updateBackend = async () => {
    try {
      loadingUpdate.value = true;
      await api.get("/update_komoditas").then((res) => {
        dataUpdate.value = res.data;
      });
      await fetchKomoditas();
    } catch (error) {
      console.log("error updating", error.message);
    } finally {
      loadingUpdate.value = false;
    }
  };
  const fetchKomoditas = async () => {
    let apiUrl = "/komoditas";
    loading.value = true;
    error.value = null;
    try {
      console.log("fetching");
      await api.get(apiUrl).then((res) => {
        console.log("fetching success");
        console.log("Raw data from API:", res.data);
        const transformedData = Utils.transformDataArray(res.data);
        console.log("Transformed data:", transformedData);
        komoditasStore.set(transformedData);
        const lastUpdate = Utils.getCurrentDateTime();
        console.log("Setting last update:", lastUpdate);
        komoditasStore.setLastUpdate(lastUpdate);
      });
      // console.log("komo", komoditasStore.getLastUpdate);
    } catch (err) {
      error.value = err.message;
      console.log("err:", err.message);
    } finally {
      loading.value = false;
      console.log("loading", loading.value);
    }
  };
  return {
    fetchKomoditas,
    loading,
    error,
    updateBackend,
    errodUpdate,
    loadingUpdate,
    dataUpdate,
    lastUpdate,
  };
}
