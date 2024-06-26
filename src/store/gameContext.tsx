import { createContext, useReducer } from "react";
import { Actions } from "../utility/utility";

import {
  MyContextType,
  MyStateType,
  Action,
  MyComponentProps,
} from "../devDependencies/dependencies";

export const GameContext = createContext<MyContextType>({
  isGameChosen: false,
  isDifficultyChosen: false,
  chosenGame: undefined,
  chosenDifficulty: undefined,
  changeGameType(arg: string) {},
  changeDifficulty(arg: string) {},
  resetGame() {},
});

const initialValue: MyStateType = {
  isGameChosen: false,
  isDifficultyChosen: false,
  chosenGame: undefined,
  chosenDifficulty: undefined,
};

const reducerFn = (state: MyStateType, action: Action): MyStateType => {
  if (action.type === Actions.GameType) {
    const newStatus = !state.isGameChosen;
    const gameName = action.payload;

    return {
      ...state,
      chosenGame: gameName,
      isGameChosen: newStatus,
    };
  }

  if (action.type === Actions.GameDifficulty) {
    const newDifficulty = !state.isDifficultyChosen;
    const difficulty = action.payload;

    return {
      ...state,
      chosenDifficulty: difficulty,
      isDifficultyChosen: newDifficulty,
    };
  }

  if (action.type === Actions.Reset) {
    return initialValue;
  }

  return state;
};

const GameProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [state, dispatchFn] = useReducer(reducerFn, initialValue);

  const gameTypeHandler = (categoryName: string) => {
    dispatchFn({
      type: Actions.GameType,
      payload: categoryName,
    });
  };

  const difficultyTypeHandler = (difficulty: string) => {
    dispatchFn({
      type: Actions.GameDifficulty,
      payload: difficulty,
    });
  };

  const resetGameHandler = () => {
    dispatchFn({
      type: Actions.Reset,
    });
  };

  const finalState = {
    isGameChosen: state.isGameChosen,
    isDifficultyChosen: state.isDifficultyChosen,
    chosenGame: state.chosenGame,
    chosenDifficulty: state.chosenDifficulty,
    changeGameType: gameTypeHandler,
    changeDifficulty: difficultyTypeHandler,
    resetGame: resetGameHandler,
  };

  return (
    <GameContext.Provider value={finalState}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
