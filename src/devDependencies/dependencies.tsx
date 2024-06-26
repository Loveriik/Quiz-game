import { Actions } from "../utility/utility";

export interface Quiz {
  correct_answer: string;
  options: string[];
  question: string;
}

export interface Answer {
  question: string;
  result: boolean;
  myAnswer: string;
  correctAnswer: string;
}

export type ChosenAnswer = {
  answer?: string;
  isCorrect?: boolean;
};

export type FetchError = {
  message: string;
};

export interface QuizAnswer {
  result: {
    question: string;
    result: boolean;
    myAnswer: string;
    correctAnswer: string;
  }[];
}

export interface CategoryProps {
  item: {
    name: string;
    src: string;
    alt: string;
  };
}

export interface Props {
  item: {
    question: string;
    result: boolean;
    myAnswer: string;
    correctAnswer: string;
  };

  ind: number;
}

export interface MyContextType {
  isGameChosen: boolean;
  isDifficultyChosen: boolean;
  chosenGame?: string;
  chosenDifficulty?: string;
  changeGameType: (arg: string) => void;
  changeDifficulty: (arg: string) => void;
  resetGame: () => void;
}

export interface MyStateType {
  isGameChosen: boolean;
  isDifficultyChosen: boolean;
  chosenGame?: string;
  chosenDifficulty?: string;
}

export type Action =
  | { type: Actions.GameType; payload: string }
  | { type: Actions.GameDifficulty; payload: string }
  | { type: Actions.Reset };

export interface MyComponentProps {
  children?: React.ReactNode;
}
