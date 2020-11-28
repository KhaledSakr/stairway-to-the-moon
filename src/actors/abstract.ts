import { Point } from '../types'

export interface Actor {
  name: string
  char: string,
  color?: string,
  bgColor?: string
  position: Point,
  onUpdate: () => void,
  onReset: () => void,
  onCollision?: 'win' | 'lose' | 'resources' | 'teleport',
  usableOnce?: boolean,
  used?: boolean,
  noRedrawOnceUsed?: boolean,
  teleportTo?: Point,
  excludeFromLegend?: boolean,
  isBackground?: boolean,
}
