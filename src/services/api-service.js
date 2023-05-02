import axios from "axios";
import { tokenService } from "./token-service";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${tokenService.getToken()}`,
  },
});
