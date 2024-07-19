import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/add-expense"
        element={
          <Layout>
            <AddExpense />
          </Layout>
        }
      />
    </Routes>
  </Router>
);

export default App;
