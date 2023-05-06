import { api } from "../services/api-service";
import useAuth from "./useAuth-hook";

export default function useApiAuth() {
  const { token } = useAuth();

  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return api;
}
