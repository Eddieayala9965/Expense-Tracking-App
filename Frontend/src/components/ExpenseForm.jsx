import axios from "axios";
import { useState } from "react";

const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = { amount, description, date };
    await axios.post("/expenses", newExpense);
    setAmount("");
    setDescription("");
    setDate("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") setAmount(value);
    if (name === "description") setDescription(value);
    if (name === "date") setDate(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          name="amount"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          name="description"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          name="date"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
