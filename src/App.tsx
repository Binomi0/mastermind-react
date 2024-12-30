import { SnackbarProvider } from "notistack";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <SnackbarProvider />
      <Dashboard />
    </div>
  );
}

export default App;
