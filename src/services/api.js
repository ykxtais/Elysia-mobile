import axios from "axios";

export const api = axios.create({
  baseURL: "https://app-elysia-s4.azurewebsites.net/api/v1",
  timeout: 15000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("API ERROR:", err?.response?.status, err?.response?.data);
    throw err;
  }
);
