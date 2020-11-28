import { Util } from 'rot-js'
import { config } from '../config'
import { Point } from '../types'
import { Actor } from './abstract'
import { CloudMotion } from './cloud'

export class Rain implements Actor {
  name = 'Rain'
  char = '/'
  color = '#2d2d2d'
  position: Point
  initialPosition: Readonly<Point>
  excludeFromLegend = true
  motion
  isBackground = true
  constructor(initialPosition: Point, motion?: CloudMotion) {
    this.initialPosition = initialPosition
    this.position = { x: initialPosition.x, y: initialPosition.y }
    this.motion = motion
  }
  onReset (): void {
    this.position = { x: this.initialPosition.x, y: this.initialPosition.y }
  }
  onUpdate (): void {
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
