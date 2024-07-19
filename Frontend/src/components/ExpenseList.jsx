import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await axios.get("/expenses");
      if (response.data) {
        console.log("No data");
      }
      setExpenses(response.data);
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
