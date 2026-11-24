import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { mulaiTema } from "./lib/tema.js";
import { kodeBahasa } from "./lib/i18n.js";
import "./index.css";

/* Menyamakan tema tersimpan dengan <html data-tema> (skrip di index.html sudah
 * memasangnya lebih awal supaya halaman tidak berkedip), dan menyamakan atribut
 * lang dengan bahasa yang benar-benar dipakai (index.html menulis "id"). */
mulaiTema();
document.documentElement.lang = kodeBahasa();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
