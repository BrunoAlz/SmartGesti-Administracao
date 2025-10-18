import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(<App />);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
      })
      .catch((error) => {
        console.log("❌ SW falhou:", error);
      });
  });
}
