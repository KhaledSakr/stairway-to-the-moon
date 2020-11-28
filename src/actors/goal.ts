import { Point } from '../types'
import { Actor } from './abstract'

export class Goal implements Actor {
  name = 'Goal'
  char = '░'
  position: Point
  onCollision: Actor['onCollision'] = 'win'
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
