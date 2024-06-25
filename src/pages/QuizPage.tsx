import classes from "./QuizPage.module.css";

import Results from "./Results";

import { useEffect, useState, useContext } from "react";
import { GameContext } from "../store/gameContext";
import { GameCategory } from "../utility/utility";
import { motion } from "framer-motion";

interface Quiz {
  correct_answer: string;
  options: string[];
  question: string;
}

interface Answer {
  question: string;
  result: boolean;
  myAnswer: string;
  correctAnswer: string;
}

type ChosenAnswer = {
  answer?: string;
  isCorrect?: boolean;
};

type FetchError = {
  message: string;
};

const initialValue = [
  {
    correct_answer: "",
    options: ["", "", "", ""],
    question: "",
  },
];

const QuizPage: React.FC = () => {
  const ctx = useContext(GameContext);

  const he = require("he");

  const [fetchedQuestions, setFetchedQuestions] =
    useState<Quiz[]>(initialValue);

  const [currIndex, setCurrIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [givingAnswers, setGivingAnswers] = useState<Answer[]>([]);
  const [gameIsFinished, setGameIsFinished] = useState<boolean>(false);
  const [error, setError] = useState<FetchError | null>(null);

  const [chosenAnswer, setChosenAnswer] = useState<ChosenAnswer>({
    answer: undefined,
    isCorrect: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        let code;
        const chosenCategory = ctx.chosenGame?.toLowerCase();
        switch (chosenCategory) {
          case GameCategory.History:
            code = 23;
            break;
          case GameCategory.VideoGames:
            code = 15;
            break;
          case GameCategory.Music:
            code = 12;
            break;
          case GameCategory.Movies:
            code = 11;
            break;
          case GameCategory.Art:
            code = 25;
            break;
          case GameCategory.Celebrities:
            code = 26;
            break;
        }

        const gameDifficulty = ctx.chosenDifficulty;

        const query = `https://opentdb.com/api.php?amount=10&category=${code}&difficulty=${gameDifficulty}&type=multiple`;

        const response = await fetch(query);

        if (!response.ok) {
          throw new Error(
            "Network response was not ok " +
              response.status +
              ". Please, reload the page."
          );
        }

        const data = await response.json();

        const quizArray = data.results.map((item: any) => {
          const optionsArray = item.incorrect_answers.map((item: any) => {
            return he.decode(item);
          });
          optionsArray.push(item.correct_answer);
          optionsArray.sort(() => Math.random() - 0.5);

          let fixedQuestion = he.decode(item.question);

          return {
            correct_answer: item.correct_answer,
            options: optionsArray,
            question: fixedQuestion,
          };
        });

        setFetchedQuestions(quizArray);
        setIsLoading(false);
      } catch (error) {
        setError({
          message: (error as Error).message,
        });
      }
    };

    fetchData();
  }, [ctx.chosenDifficulty, ctx.chosenGame, he]);

  const answerHandler = (answer: string, question: string) => {
    setChosenAnswer((prev) => {
      return {
        ...prev,
        answer,
      };
    });

    const correct = fetchedQuestions[currIndex].correct_answer === answer;

    setChosenAnswer((prev) => {
      return {
        ...prev,
        isCorrect: correct,
      };
    });

    if (correct) {
      setGivingAnswers((prevState) => [
        ...prevState,
        {
          question,
          result: true,
          myAnswer: answer,
          correctAnswer: fetchedQuestions[currIndex].correct_answer,
        },
      ]);
    } else {
      setGivingAnswers((prevState) => [
        ...prevState,
        {
          question,
          result: false,
          myAnswer: answer,
          correctAnswer: fetchedQuestions[currIndex].correct_answer,
        },
      ]);
    }

    setTimeout(() => {
      setChosenAnswer(() => {
        return {
          answer: undefined,
          isCorrect: undefined,
        };
      });

      if (currIndex < fetchedQuestions.length - 1) {
        setCurrIndex((prev) => prev + 1);
      } else {
        setGameIsFinished(true);
      }
    }, 1000);
  };

  const listVariants = {
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
      },
    }),

    hidden: {
      opacity: 0,
      x: 60,
    },
  };

  return (
    <>
      {gameIsFinished && <Results result={givingAnswers} />}

      {isLoading && !error && <div className={classes.spinner}></div>}

      {error && <div className={classes.error}>{error.message}</div>}

      {!gameIsFinished && !isLoading && (
        <div>
          <button onClick={ctx.resetGame} className={classes.button}>
            X
          </button>

          <div className={classes["question-container2"]}>
            <h1 className={classes.header1}>
              {fetchedQuestions[currIndex].question}
            </h1>
          </div>

          <div className={classes["question-container"]}>
            <span>{currIndex + 1}/10</span>
            <progress value={currIndex + 1} max="10" id="time"></progress>
          </div>

          <ul className={classes.list}>
            {fetchedQuestions[currIndex].options.map(
              (answer: string, index) => {
                return (
                  <motion.li
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    whileHover={{ scale: 1.04 }}
                    style={{
                      pointerEvents:
                        chosenAnswer.answer !== undefined ? "none" : "auto",
                    }}
                    className={`${
                      chosenAnswer.answer === answer && classes.chosen
                    } ${
                      chosenAnswer.answer === answer
                        ? chosenAnswer.isCorrect
                          ? classes.correct
                          : classes.incorrect
                        : null
                    }`}
                    key={answer}
                    onClick={answerHandler.bind(
                      null,
                      answer,
                      fetchedQuestions[currIndex].question
                    )}
                  >
                    {answer}
                  </motion.li>
                );
              }
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default QuizPage;
