import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/add-expense" element={<AddExpense />} />
      </Routes>
    </Router>
  );
}

export default App;
