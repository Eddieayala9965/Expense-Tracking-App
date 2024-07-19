import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getExpenses = () => api.get("/expenses/");
export const createExpense = (expense) => api.post("/expenses/", expense);

export default api;
