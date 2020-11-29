import { FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import * as ROT from 'rot-js'
import { GameContext } from './game_context'
import { Point } from './types'
import { config } from './config'
import { Actor } from './actors/abstract'
import { MusicPlayer } from './music/player'
import winSound from './music/sfx/win.mp3'
import loseSound from './music/sfx/lose.mp3'
import wrongSound from './music/sfx/wrong.mp3'
import moveSound from './music/sfx/move.mp3'

const transformCoords = ({ x, y }: Point): Point => {
  return {
    x: x,
    y: config.bounds.height - y - 1, // Invert height
  }
}

const playSound = (src: string, volume = 0.5): void => {
  const sound = new Audio(src)
  sound.volume = volume
  sound.play()
}

export interface GameProps {
  title: string,
  description: string,
  limit?: number,
  actors?: Actor[],
  soundtrack: {
    soundFile: string,
    soundDuration: number,
    attribution: ReactNode,
  },
}

const stairs = {
  h: '—',
  v: '|',
}

let didPlayerInteractWithDOM = false

export const Game: FC<GameProps> = ({
  limit,
  actors = [],
  title,
  description,
  soundtrack,
}) => {
  const { onWin } = useContext(GameContext)
  const [remainingStairs, setRemainingStairs] = useState(limit)
  const [rightAvailable, setRightAvailable] = useState(true)
  const [upAvailable, setUpAvailable] = useState(false)
  const [downAvailable, setDownAvailable] = useState(false)
  const [interacted, setInteracted] = useState(didPlayerInteractWithDOM)

  useEffect(() => {
    const display = new ROT.Display({
      width: config.bounds.width,
      height: config.bounds.height,
      fontFamily: 'Source Code Pro',
      fontSize: 24,
    })
    const cursor = { x: 0, y: 0 }
    let possibleDirections: string[] = []
    let registry: string[] = []
    let remainingCount = limit
    let goingUp = true
    let locked = false

    document.getElementById('game-container').appendChild(display.getContainer())

    const collided = (point: Point) => {
      return registry.includes(`${point.x},${point.y}`)
    }

    const test = (point: Point) => {
      if (point.x >= config.bounds.width || point.x < 0 || point.y < 0) {
        reset()
        return false
      }
      return !collided(point) && point.y < config.bounds.height
    }

    const drawActor = (point: Point, char: string, color = '#dadada', bgColor = '') => {
      const transformedPoint = transformCoords(point)
      display.draw(transformedPoint.x, transformedPoint.y, char, color, bgColor)
    }

    const draw = (point: Point, char: string) => {
      registry.push(`${point.x},${point.y}`)
      const transformedPoint = transformCoords(point)
      display.draw(transformedPoint.x, transformedPoint.y, char, 'white', '')
    }

    const update = () => {
      playSound(moveSound)

      if (limit) {
        remainingCount--
        if (remainingCount === 0) {
          reset()
          return
        } else {
          setRemainingStairs(remainingCount)
        }
      }

      setRightAvailable(possibleDirections.includes('ArrowRight'))
      setUpAvailable(possibleDirections.includes('ArrowUp'))
      setDownAvailable(possibleDirections.includes('ArrowDown'))

      for (const actor of actors) {
        if (actor.used) {
          continue
        }
        const previousPosition = { x: actor.position.x, y: actor.position.y }
        if (!actor.used || !actor.noRedrawOnceUsed) {
          actor.onUpdate()
        }
        let didCollide = false
        if (collided(actor.position)) {
          let skip = false
          if (actor.usableOnce) {
            actor.used = true
          }
          if (actor.collisionSound) {
            playSound(actor.collisionSound, 1)
          }
          didCollide = true
          switch (actor.onCollision) {
            case 'win':
              skip = true
              locked = true
              playSound(winSound, 0.3)
              setTimeout(onWin, 2000)
              break
            case 'lose':
              skip = true
              reset()
              break
            case 'resources':
              remainingCount += 10
              setRemainingStairs(remainingCount)
              break
            case 'teleport':
              if (!actor.teleportTo) {
                throw new Error('Missing teleportTo for teleport type actor.')
              }
              cursor.x = actor.teleportTo.x + 1
              cursor.y = actor.teleportTo.y
              if (possibleDirections.includes('ArrowRight')) {
                draw(cursor, stairs.v)
              } else {
                draw(cursor, stairs.h)
              }
              break
          }
          if (skip) {
            break
          }
        }
        // Remove from the old position only if there are currently no stairs on it
        if (!collided(previousPosition)) {
          drawActor(previousPosition, '.', '#191919')
        }
        if (didCollide && actor.isBackground) {
          // Don't overwrite stairs with background characters
          continue
        }
        if (!actor.used || !actor.noRedrawOnceUsed) {
          drawActor(actor.position, actor.char, actor.color, actor.bgColor)
        }
      }
    }

    const drawRight = () => {
      const newPosition = { x: cursor.x + 1, y: cursor.y + (goingUp ? 1 : -1) }
      if (test(newPosition)) {
        cursor.x = newPosition.x
        cursor.y = newPosition.y
        draw(cursor, stairs.h)
        possibleDirections = ['ArrowUp', 'ArrowDown']
        update()
      }
    }

    const drawUp = () => {
      const newPosition = { x: cursor.x + 1, y: cursor.y + 1 }
      if (test(newPosition)) {
        goingUp = true
        cursor.x = newPosition.x
        cursor.y = newPosition.y
        draw(cursor, stairs.v)
        possibleDirections = ['ArrowRight']
        update()
      }
    }

    const drawDown = () => {
      const newPosition = { x: cursor.x + 1, y: cursor.y - 1 }
      if (test(newPosition)) {
        goingUp = false
        cursor.x = newPosition.x
        cursor.y = newPosition.y
        draw(cursor, stairs.v)
        possibleDirections = ['ArrowRight']
        update()
      }
    }

    const fillBg = () => {
      for (let i = 0; i < config.bounds.width; i++) {
        for (let j = 0; j < config.bounds.height; j++) {
          display.draw(i, j, '.', '#191919', '')
        }
      }
    }

    const initialize = () => {
      cursor.x = 1
      cursor.y = 1
      possibleDirections = ['ArrowRight']
      registry = []
      goingUp = true
      fillBg()
      draw({ x: 0, y: 0 }, stairs.h)
      draw({ x: 1, y: 1 }, stairs.v)
      remainingCount = limit
      setRemainingStairs(remainingCount)
      actors.forEach(actor => {
        actor.onReset()
        drawActor(actor.position, actor.char, actor.color, actor.bgColor)
      })
    }

    const reset = () => {
      display.clear()
      playSound(loseSound, 0.3)
      initialize()
    }

    initialize()

    global.game = {
      reset,
      initialize,
      drawRight,
      drawUp,
      drawDown,
      collided,
      actors,
      registry,
      possibleDirections,
    }

    const eventListener = (e: KeyboardEvent): void => {
      if (locked) {
        return
      }
      didPlayerInteractWithDOM = true
      setInteracted(true)
      if (e.key?.toLowerCase() === 'r') {
        // Forgot your caps on? I got you
        reset()
        return
      }
      if (possibleDirections.includes(e.key)) {
        if (e.key === 'ArrowRight') {
          drawRight()
        } else if (e.key === 'ArrowUp') {
          drawUp()
        } else if (e.key === 'ArrowDown') {
          drawDown()
        }
      } else if (e.key.includes('Arrow')) {
        playSound(wrongSound, 0.1)
      }
    }
    document.addEventListener('keydown', eventListener)
    return () => {
      document.removeEventListener('keydown', eventListener)
      document.body.removeChild(display.getContainer())
    }
  }, [])

  useEffect(() => {
    if (interacted) {
      const music = new MusicPlayer(soundtrack.soundFile, soundtrack.soundDuration)
      music.fadeIn()
      return () => {
        music.fadeOut()
      }
    }
  }, [soundtrack, interacted])

  const legend: Record<string, string> = useMemo(() => {
    const l: Record<string, string> = {}
    actors.forEach(actor => {
      if (!actor.excludeFromLegend) {
        l[actor.char] = actor.name
      }
    })
    return l
  }, [actors])

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <div id='game-container' style={{ border: '1px solid grey' }} />
        <div style={{ color: 'darkgrey', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          {<div>Possible directions:
            <span style={{ color: rightAvailable ? 'white' : 'grey' }}>►</span>
            <span style={{ color: upAvailable ? 'white' : 'grey' }}>▲</span>
            <span style={{ color: downAvailable ? 'white' : 'grey' }}>▼</span>
          </div>}
          {limit ? <div>Remaining stairs: {remainingStairs.toString()}</div> : <br />}
        </div>
      </div>
      <div
        style={{
          marginLeft: '8px',
          border: '1px solid grey',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '8px',
          width: '200px',
        }}
      >
        <div>
          <h3 style={{ padding: '0px', margin: '0px', color: 'darkgrey' }}>{title}</h3>
          <p style={{ color: 'darkgrey' }}>{description}</p>
        </div>
        <div style={{ fontSize: '12px', color: 'grey' }}>
          {Object.keys(legend).map(key => <div key={key}>{key} {legend[key]}</div>)}
          <hr />
          <div>
          (R) Reset level<br />
          (►, ▲, ▼) Arrows to move
          </div>
        </div>
        <div style={{ position: 'fixed', bottom: '4px', left: '4px', color: 'grey' }}>{soundtrack.attribution}</div>
      </div>
    </div>
  )
}
