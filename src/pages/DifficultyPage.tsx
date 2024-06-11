import classes from "./DifficultyPage.module.css";

import { GameContext } from "../store/gameContext";
import { useContext } from "react";

const DifficultyPage: React.FC = () => {
  const ctx = useContext(GameContext);

  return (
    <>
      <h1 className={classes.header1}>Choose difficulty level</h1>
      <ul className={classes.list}>
        <li onClick={ctx.changeDifficulty.bind(null, "easy")}>
          <p className={classes.title}>Easy</p>
          <p>( great for beginners )</p>
        </li>
        <li onClick={ctx.changeDifficulty.bind(null, "medium")}>
          <p className={classes.title}>Medium</p>
          <p>( you are quit experienced with quizes )</p>
        </li>
        <li onClick={ctx.changeDifficulty.bind(null, "hard")}>
          <p className={classes.title}>Hard</p>
          <p>( are you that confident? )</p>
        </li>
      </ul>
    </>
  );
};

export default DifficultyPage;
