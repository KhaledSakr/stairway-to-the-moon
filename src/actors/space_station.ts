import { config } from '../config'
import { Point } from '../types'
import { Actor } from './abstract'
import sound from '../music/sfx/spacestation.mp3'

export type SpaceStationMotion = 'up-left'

export class SpaceStation implements Actor {
  name = 'Space Station'
  char = '#'
  position: Point
  initialPosition: Point
  onCollision: Actor['onCollision'] = 'resources'
  usableOnce = true
  used = false
  noRedrawOnceUsed = true
  motion?: SpaceStationMotion
  everyNthRound
  round = 0
  color = 'cadetblue'
  collisionSound = sound
  constructor(initialPosition: Point, motion?: SpaceStationMotion, everyNthRound = 1) {
    this.initialPosition = { x: initialPosition.x, y: initialPosition.y }
    this.position = { x: initialPosition.x, y: initialPosition.y }
    this.motion = motion
    this.everyNthRound = everyNthRound
  }
  onReset (): void {
    this.used = false
    this.position = { x: this.initialPosition.x, y: this.initialPosition.y }
  }
  onUpdate (): void {
    switch (this.motion) {
      case 'up-left':
        if ((this.round % this.everyNthRound) === 0) {
          if (this.position.y + 1 === config.bounds.height || this.position.x - 1 < 0) {
            const distanceToRight = config.bounds.width - this.position.x - 1
            const distanceToBottom = this.position.y
            const matrixSize = Math.min(distanceToBottom, distanceToRight)
            this.position.x += matrixSize
            this.position.y -= matrixSize
          } else {
            this.position.x--
            this.position.y++
          }
        }
        this.round++
        break
    }
  }
}
