import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeProductStore } from "./lib/productStore.ts"; // <-- LINHA ADICIONADA

initializeProductStore(); // <-- LINHA ADICIONADA

createRoot(document.getElementById("root")!).render(<App />);
