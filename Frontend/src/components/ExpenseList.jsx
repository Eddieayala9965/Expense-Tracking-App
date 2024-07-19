import { useEffect, useState } from "react";
import { getExpenses } from "../services/api";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses();
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          {expense.description}: ${expense.amount} on{" "}
          {new Date(expense.date).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
