import { useState } from "react";
import { createExpense } from "../services/api";

const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = { amount: parseFloat(amount), description, date };
    try {
      await createExpense(newExpense);
      setAmount("");
      setDescription("");
      setDate("");
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
