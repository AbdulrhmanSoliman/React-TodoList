import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastProvider } from "./contexts/ToastContext";
import TodoProvider from "./contexts/todoContext";

const theme = createTheme({
  typography: {
    fontFamily: ["Alex"],
  },
  palette: {
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#f44336",
    },
  },
});


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodoProvider>
        <ToastProvider>
          <div className="App">
              <TodoList />
          </div>
        </ToastProvider>
      </TodoProvider>
    </ThemeProvider>
  );
}
