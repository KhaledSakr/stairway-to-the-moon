import { createContext } from 'react'

export interface GameContextType {
  onWin: () => void,
}

export const GameContext = createContext<GameContextType>({
  onWin: () => undefined,
})
