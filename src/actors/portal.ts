import { Point } from '../types'
import { Actor } from './abstract'
import sound from '../music/sfx/portal.mp3'

export class Portal implements Actor {
  name = 'Portal'
  char = 'O'
  position: Point
  onCollision: Actor['onCollision'] = 'teleport'
  teleportTo
  used = false
  usableOnce = true
  color = 'violet'
  collisionSound = sound
  constructor(initialPosition: Point, teleportTo: Point) {
    this.position = { x: initialPosition.x, y: initialPosition.y }
    this.teleportTo = teleportTo
  }
  onReset (): void {
    this.used = false
  }
  onUpdate (): void {
    /* noop */
  }
}
