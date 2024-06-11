import "./App.css";

import WelcomePage from "./pages/WelcomePage";
import DifficultyPage from "./pages/DifficultyPage";
import QuizPage from "./pages/QuizPage";

import { GameContext } from "./store/gameContext";
import { useContext } from "react";
import Wrapper from "./utility/Wrapper";

function App() {
  const ctx = useContext(GameContext);

  return (
    <Wrapper>
      {!ctx.isGameChosen && <WelcomePage />}
      {ctx.isGameChosen && !ctx.isDifficultyChosen && <DifficultyPage />}
      {ctx.isGameChosen && ctx.isDifficultyChosen && <QuizPage />}
    </Wrapper>
  );
}

export default App;
