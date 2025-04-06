import axios from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function axiosInstance<T = unknown>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return instance(config);
}
