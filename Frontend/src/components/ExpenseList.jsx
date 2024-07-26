import { useEffect, useState } from "react";
import { getExpenses, updateExpense, deleteExpense } from "../services/api";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState({
    id: "",
    amount: "",
    description: "",
    date: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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

  const handleClickOpen = (expense) => {
    setCurrentExpense(expense);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentExpense({
      id: "",
      amount: "",
      description: "",
      date: "",
    });
  };

  const handleChange = (e) => {
    setCurrentExpense({ ...currentExpense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateExpense(currentExpense.id, currentExpense);
      setExpenses(
        expenses.map((expense) =>
          expense.id === currentExpense.id ? response.data : expense
        )
      );
      setSnackbarMessage("Expense updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleClose();
    } catch (error) {
      console.error("Error updating expense:", error);
      setSnackbarMessage("Error updating expense.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      setExpenses(expenses.filter((expense) => expense.id !== expenseId));
      setSnackbarMessage("Expense deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting expense:", error);
      setSnackbarMessage("Error deleting expense.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container sx={{ marginTop: 7 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Expenses
      </Typography>
      {expenses.length === 0 ? (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" component="p">
            No Expenses Available, Create Expense
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/create_expense"
          >
            Create Expense
          </Button>
        </Box>
      ) : (
        <List>
          {expenses.map((expense) => (
            <ListItem key={expense.id} divider>
              <ListItemText
                primary={expense.description}
                secondary={`$${expense.amount} on ${new Date(
                  expense.date
                ).toLocaleDateString()}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleClickOpen(expense)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(expense.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Expense</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              value={currentExpense.description}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="amount"
              name="amount"
              label="Amount"
              type="number"
              fullWidth
              value={currentExpense.amount}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="date"
              name="date"
              label="Date"
              type="date"
              fullWidth
              value={currentExpense.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ExpenseList;
