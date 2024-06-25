import classes from "./DifficultyPage.module.css";

import { GameContext } from "../store/gameContext";
import { useContext } from "react";

import { Difficulty } from "../utility/utility";

const DifficultyPage: React.FC = () => {
  const ctx = useContext(GameContext);

  return (
    <>
      <h1 className={classes.header1}>Choose difficulty level</h1>
      <ul className={classes.list}>
        <li onClick={ctx.changeDifficulty.bind(null, Difficulty.Easy)}>
          <p className={classes.title}>Easy</p>
          <p>( great for beginners )</p>
        </li>
        <li onClick={ctx.changeDifficulty.bind(null, Difficulty.Medium)}>
          <p className={classes.title}>Medium</p>
          <p>( you are quit experienced with quizes )</p>
        </li>
        <li onClick={ctx.changeDifficulty.bind(null, Difficulty.Hard)}>
          <p className={classes.title}>Hard</p>
          <p>( are you that confident? )</p>
        </li>
      </ul>
    </>
  );
};

export default DifficultyPage;
