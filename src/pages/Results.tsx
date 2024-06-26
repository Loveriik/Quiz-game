import classes from "./Results.module.css";

import ResultTameplate from "../components/ResultTameplate";

import { GameContext } from "../store/gameContext";
import { useContext } from "react";

import { QuizAnswer } from "../devDependencies/dependencies";

import { motion } from "framer-motion";

const Results: React.FC<QuizAnswer> = ({ result }) => {
  const ctx = useContext(GameContext);

  const clearGameHandler = () => {
    ctx.resetGame();
  };

  const finalScore = result.reduce(
    (acc, value) => (value.result === true ? acc + 1 : acc + 0),
    0
  );

  return (
    <div className={classes.container}>
      <h1 className={classes.header1}>
        Congrats! <br />
        You finished the quiz.
      </h1>
      <div className={classes["score-container"]}>
        <span>Final Score</span>
        <span>{finalScore}/10</span>
      </div>

      <motion.button
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.04 }}
        className={classes.button}
        onClick={clearGameHandler}
      >
        Go back to the menu
      </motion.button>

      <ul className={classes.list}>
        {result.map((item, index) => {
          return <ResultTameplate ind={index} item={item} key={index} />;
        })}
      </ul>
    </div>
  );
};

export default Results;
