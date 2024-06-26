import classes from "./ResultTameplate.module.css";

import { delay, motion } from "framer-motion";

import { Props } from "../devDependencies/dependencies";

const ResultTameplate: React.FC<Props> = ({ item, ind }) => {
  const listVariant = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
      },
    }),

    hidden: {
      y: -50,
      opacity: 0,
    },
  };

  return (
    <motion.li
      custom={ind}
      initial={"hidden"}
      animate={"visible"}
      variants={listVariant}
      className={`${classes.listItem} ${
        item.result ? classes.correct : classes.wrong
      }`}
    >
      <p className={classes.question}>{item.question}</p>
      <p className={classes["answer-container"]}>
        <span className={classes.category}>Your answer:</span>
        <span className={classes.answer}>{item.myAnswer}</span>
      </p>
      <p className={classes["answer-container"]}>
        <span className={classes.category}>Correct answer:</span>
        <span className={classes.answer}>{item.correctAnswer}</span>
      </p>
    </motion.li>
  );
};

export default ResultTameplate;
