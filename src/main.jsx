import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    <Toaster 
    position="top-right"
      theme="dark"
      toastOptions={{
      duration: 3000
    }}
    />
  </BrowserRouter>
);
