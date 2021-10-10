import axios from "axios";

const PATH = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

export function getDefinitionList() {
  return axios.get(`${PATH}/api/getAllDefinitions`);
}
export function treatList(treatList) {
  return axios.post(`${PATH}/api/treat`, { treatList });
}
export function resetDB() {
  return axios.post(`${PATH}/api/reset`);
}
