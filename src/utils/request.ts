import axios from "axios";

const baseURL = ENABLE_MOCK
  ? "http://localhost:" + SERVER_PORT + "/mock"
  : API_GATEWAY_URL;

export const instance = axios.create({
  baseURL,
});
