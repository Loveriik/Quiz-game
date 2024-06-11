import classes from "./QuizPage.module.css";

import Results from "./Results";

import { useEffect, useState, useContext } from "react";
import { GameContext } from "../store/gameContext";
import { GameCategory } from "../utility/utility";

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

const initialValue = [
  {
    correct_answer: "",
    options: ["", "", "", ""],
    question: "",
  },
];

const QuizPage: React.FC = () => {
  const ctx = useContext(GameContext);

  const [fetchedQuestions, setFetchedQuestions] =
    useState<Quiz[]>(initialValue);

  const [currIndex, setCurrIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [givingAnswers, setGivingAnswers] = useState<Answer[]>([]);
  const [gameIsFinished, setGameIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
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
      const data = await response.json();

      const quizArray = data.results.map((item: any) => {
        const optionsArray = [...item.incorrect_answers];
        optionsArray.push(item.correct_answer);
        optionsArray.sort(() => Math.random() - 0.5);

        let fixedQuestion = item.question.replaceAll("&quot;", '"');
        fixedQuestion = fixedQuestion.replaceAll("&eacute;", "é");

        return {
          correct_answer: item.correct_answer,
          options: optionsArray,
          question: fixedQuestion,
        };
      });

      setFetchedQuestions(quizArray);
      setIsLoading(false);
    };

    try {
      fetchData();
    } catch (e) {
      throw new Error("Something went wrong! Try again");
    }
  }, [ctx.chosenDifficulty, ctx.chosenGame]);

  const answerHandler = (answer: string, question: string) => {
    // setTimeout(() => {
    //   if (fetchedQuestions[currIndex].correct_answer === answer) {
    //     setGivingAnswers((prevState) => [
    //       ...prevState,
    //       {
    //         question,
    //         result: true,
    //         myAnswer: answer,
    //         correctAnswer: fetchedQuestions[currIndex].correct_answer,
    //       },
    //     ]);
    //   } else {
    //     setGivingAnswers((prevState) => [
    //       ...prevState,
    //       {
    //         question,
    //         result: false,
    //         myAnswer: answer,
    //         correctAnswer: fetchedQuestions[currIndex].correct_answer,
    //       },
    //     ]);
    //   }

    //   if (currIndex < fetchedQuestions.length - 1) {
    //     setCurrIndex((prev) => prev + 1);
    //   } else {
    //     setGameIsFinished(true);
    //   }
    // }, 2000);
    if (fetchedQuestions[currIndex].correct_answer === answer) {
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

    if (currIndex < fetchedQuestions.length - 1) {
      setCurrIndex((prev) => prev + 1);
    } else {
      setGameIsFinished(true);
    }
  };

  return (
    <>
      {gameIsFinished && <Results result={givingAnswers} />}

      {isLoading && <div className={classes.spinner}></div>}

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
            {fetchedQuestions[currIndex].options.map((item: any, index) => {
              return (
                <li
                  key={index}
                  onClick={answerHandler.bind(
                    null,
                    item,
                    fetchedQuestions[currIndex].question
                  )}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default QuizPage;
