import { Point } from '../types'
import { Actor } from './abstract'

export class PortalExit implements Actor {
  name = 'Portal Exit'
  char = '>'
  color = 'grey'
  position: Point
  constructor(initialPosition: Point) {
    this.position = { x: initialPosition.x, y: initialPosition.y }
  }
  onReset (): void {
    /* noop */
  }
  onUpdate (): void {
    /* noop */
  }
}
