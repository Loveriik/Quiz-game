import classes from "./ResultTameplate.module.css";

interface Props {
  item: {
    question: string;
    result: boolean;
    myAnswer: string;
    correctAnswer: string;
  };
}

const ResultTameplate: React.FC<Props> = ({ item }) => {
  return (
    <li
      className={`${classes.listItem} ${
        item.result ? classes.correct : classes.wrong
      }`}
    >
      <p className={classes.question}>{item.question}</p>
      <p className={classes["answer-container"]}>
        <span className={classes.category}>Your answer:</span>
        <p className={classes.answer}>{item.myAnswer}</p>
      </p>
      <p className={classes["answer-container"]}>
        <span className={classes.category}>Correct answer:</span>
        <p className={classes.answer}>{item.correctAnswer}</p>
      </p>
    </li>
  );
};

export default ResultTameplate;
