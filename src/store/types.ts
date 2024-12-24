export interface GameStore {
  activeColumn: number;
  availableColors: string[];
  gameStarted: boolean;
  gameWin: boolean;
  gameLost: boolean;
  gameLevel: {
    id: number;
    items: string[];
    name: string;
    bonus: number;
  };
  itemColors: Record<number, Record<number, string>>;
  movement: number;
  result: any;
  selectedColor: string;
  turnFilled: boolean;
  timeElapsed: number;
  validation: Record<number, number[]>;
  score: number;
  startGame: () => void;
  setTimeElapsed: (timeElapsed: number) => void;
  setNewTurn: (newTurn: {
    selectedColor: string;
    itemColors: Record<number, Record<number, string>>;
    movement: number;
  }) => void;
  setNewGameLevel: (newLevel: number) => void;
  validateTurn: () => void;
}
