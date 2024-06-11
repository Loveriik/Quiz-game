import classes from "./Results.module.css";

import ResultTameplate from "../components/ResultTameplate";

import { GameContext } from "../store/gameContext";
import { useContext } from "react";

interface Answer {
  result: {
    question: string;
    result: boolean;
    myAnswer: string;
    correctAnswer: string;
  }[];
}

const Results: React.FC<Answer> = ({ result }) => {
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

      <button className={classes.button} onClick={clearGameHandler}>
        Go back to the menu
      </button>

      <ul className={classes.list}>
        {result.map((item, index) => {
          return <ResultTameplate item={item} key={index} />;
        })}
      </ul>
    </div>
  );
};

export default Results;
