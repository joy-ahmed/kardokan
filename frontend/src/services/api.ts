import axios from "axios";
import { ApiResponse } from "../types/ApiResponse";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const fetchData = async <T>(
  endpoint: string
): Promise<ApiResponse<T>> => {
  try {
    const response = await api.get(`/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
