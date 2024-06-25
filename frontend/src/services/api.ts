// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await api.get<T>(`/${endpoint}`);
  return response.data;
};

export default api;
