import { create } from "zustand";
import {
  easyGame,
  mediumGame,
  hardGame,
  extraHardGame,
  validation,
  itemColors,
} from "../utils/constants";
import { shuffle } from "../utils/helpers";
import { GameStore } from "./types";
import { getMatch, isRowFilled } from "../utils/validations";
import { enqueueSnackbar } from "notistack";

const MAX_COLUMNS = 11;

const useGameStore = create<GameStore>((set, get) => ({
  activeColumn: 1,
  availableColors: [],
  gameStarted: false,
  gameWin: false,
  gameLost: false,
  itemColors,
  movement: 1,
  result: [],
  selectedColor: "white",
  turnFilled: false,
  timeElapsed: 0,
  validation,
  score: 0,
  gameLevel: {
    id: 0,
    items: [],
    name: "",
    bonus: 0,
  },
  startGame: () =>
    set((state) => ({
      ...state,
      availableColors: [...get().gameLevel.items],
      result: shuffle([...get().gameLevel.items]).splice(0, 4),
      gameStarted: true,
    })),
  setTimeElapsed: (timeElapsed: number) => set({ timeElapsed }),
  setNewTurn: (newTurn: {
    selectedColor: string;
    itemColors: Record<number, Record<number, string>>;
    movement: number;
  }) => set(newTurn),
  setNewGameLevel: (newLevel: number) =>
    set(() => {
      switch (newLevel) {
        case 5:
          return {
            gameLevel: {
              id: 5,
              items: [...easyGame],
              name: "easyGame",
              bonus: 1000,
            },
          };
        case 6:
          return {
            gameLevel: {
              id: 6,
              items: [...mediumGame],
              name: "mediumGame",
              bonus: 3000,
            },
          };
        case 7:
          return {
            gameLevel: {
              id: 7,
              items: [...hardGame],
              name: "hardGame",
              bonus: 6000,
            },
          };
        case 8:
          return {
            gameLevel: {
              id: 8,
              items: [...extraHardGame],
              name: "extraHardGame",
              bonus: 10000,
            },
          };
        default:
          return {
            gameLevel: {
              id: 5,
              items: [...easyGame],
              name: "easyGame",
              bonus: 1000,
            },
          };
      }
    }),
  validateTurn: () => {
    const {
      result,
      activeColumn,
      itemColors,
      validation,
      timeElapsed,
      gameLevel,
    } = get();

    const turn = Object.values(itemColors[activeColumn]);
    const rowFilled = isRowFilled(turn);

    // Any of the items are not colured
    if (!rowFilled) {
      return;
    }

    const match = getMatch(turn, result);

    // Fills `gameFinish` list with matched results identified with number 2
    const gameFinish = match.filter((item: number) => item === 2);

    // 4 items are equal to 2 so player wins
    if (gameFinish.length === 4) {
      const finishColumn = MAX_COLUMNS - activeColumn;
      const timeBonus = 300 - timeElapsed;

      const score = timeBonus * finishColumn + gameLevel.bonus;

      return set({
        score,
        gameWin: true,
      });
    }

    // Last column was filled so game over
    if (activeColumn === 10) {
      return set({ gameLost: true });
    }

    set({
      validation: {
        ...validation,
        [activeColumn]: match,
      },
      activeColumn: activeColumn + 1,
      turnFilled: false,
    });

    const position = gameFinish.length;
    const colores = match.length;
    enqueueSnackbar(`Has acertado ${position} posición y ${colores} colores`);
  },
}));

export default useGameStore;
