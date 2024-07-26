import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getExpenses = () => api.get("/get_expenses/");

export const createExpense = (expense) =>
  api.post("/create_expenses/", expense);

export const deleteExpense = (expenseId) => {
  return api.delete(`/delete_expenses/${expenseId}`);
};

export const updateExpense = (expenseId, updatedExpense) => {
  return api.put(`/update_expenses/${expenseId}`, updatedExpense);
};

export default api;
