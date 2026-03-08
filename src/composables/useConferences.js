import { ref } from "vue";
import axios from "axios";
import { fallbackConferences } from "@/data/appData";

const API_URL = "http://localhost:8001/conferences";

export const useConferences = () => {
  const conferences = ref([]);
  const loading = ref(false);
  const error = ref("");

  const loadConferences = async () => {
    loading.value = true;
    error.value = "";

    try {
      const response = await axios.get(API_URL);
      conferences.value = response.data;
    } catch (err) {
      conferences.value = fallbackConferences;
      error.value = "mock-сервер не запущен, показываю локальные данные";
    } finally {
      loading.value = false;
    }
  };

  return {
    conferences,
    loading,
    error,
    loadConferences
  };
};
