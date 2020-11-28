import { Point } from '../types'
import { Actor } from './abstract'
import { config } from '../config'

export type AsteroidMotion = 'down-right'

export class Asteroid implements Actor {
  name = 'Asteroid'
  char = 'a'
  color = 'antiquewhite'
  motion
  position: Point
  initialPosition: Readonly<Point>
  onCollision: Actor['onCollision'] = 'lose'
  constructor(initialPosition: Point, motion?: AsteroidMotion) {
    this.initialPosition = initialPosition
    this.position = { x: initialPosition.x, y: initialPosition.y }
    this.motion = motion
  }
  onReset () {
    this.position = { x: this.initialPosition.x, y: this.initialPosition.y }
  }
  onUpdate () {
    switch (this.motion) {
      case 'down-right':
        if (this.position.y - 1 < 0 || this.position.x + 1 === config.bounds.width) {
          const distanceToLeft = this.position.x - 1
          const distanceToTop = config.bounds.height - this.position.y -1
          const matrixSize = Math.min(distanceToLeft, distanceToTop)
          this.position.y += matrixSize
          this.position.x -= matrixSize
        } else {
          this.position.x++
          this.position.y--
        }
        break
    }
  }
}
