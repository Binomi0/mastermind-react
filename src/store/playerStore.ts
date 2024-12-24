import { create } from "zustand";

interface PlayerStore {
  playerName: string;
  filled: boolean;
  level: number;
  setLevel: (level: number) => void;
  setName: (name: string) => void;
}

const usePlayerStore = create<PlayerStore>((set) => ({
  playerName: "",
  filled: false,
  level: 0,
  setLevel: (l: number) => set((state) => ({ ...state, level: l })),
  setName: (name: string) =>
    set((state) => ({ ...state, playerName: name, filled: true })),
}));

export default usePlayerStore;
