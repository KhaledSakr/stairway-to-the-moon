import { Point } from '../types'
import { Actor } from './abstract'
import { Util } from 'rot-js'
import { config } from '../config'

export type CloudMotion = 'left' | 'up' | 'right' | 'down'

export class Cloud implements Actor {
  name = 'Cloud'
  char = '@'
  motion
  color = 'grey'
  position: Point
  initialPosition: Readonly<Point>
  onCollision: Actor['onCollision'] = 'lose'
  constructor(initialPosition: Point, motion?: CloudMotion) {
    this.initialPosition = initialPosition
    this.position = { x: initialPosition.x, y: initialPosition.y }
    this.motion = motion
  }
  onReset () {
    this.position = { x: this.initialPosition.x, y: this.initialPosition.y }
  }
  onUpdate () {
    switch (this.motion) {
      case 'right':
        this.position.x = Util.mod(this.position.x + 1, config.bounds.width)
        break 
      case 'down':
        this.position.y = Util.mod(this.position.y - 1, config.bounds.height)
        break
      case 'left':
        this.position.x = Util.mod(this.position.x - 1, config.bounds.width)
        break
      case 'up':
        this.position.y = Util.mod(this.position.y + 1, config.bounds.height)
        break  
    }
  }
}
