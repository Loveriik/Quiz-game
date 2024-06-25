import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GameProvider from "./store/gameContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GameProvider>
    <App />
  </GameProvider>
);
