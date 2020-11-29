import { FC, useMemo, useState } from 'react'
import { Asteroid } from './actors/asteroid'
import { Cloud } from './actors/cloud'
import { Goal } from './actors/goal'
import { config } from './config'
import { Game } from './game'
import { GameContext } from './game_context'
import { load } from 'webfontloader'
import { SpaceStation } from './actors/space_station'
import { Portal } from './actors/portal'
import { PortalExit } from './actors/portal_exit'
import { Rain } from './actors/rain'
import { Credits } from './credits'
import soundFileOne from './music/1.mp3'
import soundFileTwo from './music/2.mp3'
import soundFileThree from './music/3.mp3'
import soundFileFour from './music/4.mp3'
import soundFileFive from './music/5.mp3'

const title =
`
      :::::::: ::::::::::: :::     ::::::::::: :::::::::  :::       :::     :::   :::   :::      ::::::::::: ::::::::      ::::::::::: :::    ::: ::::::::::            :::   :::    ::::::::   ::::::::  ::::    ::: 
    :+:    :+:    :+:   :+: :+:       :+:     :+:    :+: :+:       :+:   :+: :+: :+:   :+:          :+:    :+:    :+:         :+:     :+:    :+: :+:                  :+:+: :+:+:  :+:    :+: :+:    :+: :+:+:   :+:  
   +:+           +:+  +:+   +:+      +:+     +:+    +:+ +:+       +:+  +:+   +:+ +:+ +:+           +:+    +:+    +:+         +:+     +:+    +:+ +:+                 +:+ +:+:+ +:+ +:+    +:+ +:+    +:+ :+:+:+  +:+   
  +#++:++#++    +#+ +#++:++#++:     +#+     +#++:++#:  +#+  +:+  +#+ +#++:++#++: +#++:            +#+    +#+    +:+         +#+     +#++:++#++ +#++:++#            +#+  +:+  +#+ +#+    +:+ +#+    +:+ +#+ +:+ +#+    
        +#+    +#+ +#+     +#+     +#+     +#+    +#+ +#+ +#+#+ +#+ +#+     +#+  +#+             +#+    +#+    +#+         +#+     +#+    +#+ +#+                 +#+       +#+ +#+    +#+ +#+    +#+ +#+  +#+#+#     
#+#    #+#    #+# #+#     #+#     #+#     #+#    #+#  #+#+# #+#+#  #+#     #+#  #+#             #+#    #+#    #+#         #+#     #+#    #+# #+#                 #+#       #+# #+#    #+# #+#    #+# #+#   #+#+#      
########     ### ###     ### ########### ###    ###   ###   ###   ###     ###  ###             ###     ########          ###     ###    ### ##########          ###       ###  ########   ########  ###    ####       
`

const soundtracks = [
  { soundFile: soundFileOne, soundDuration: 22269, attribution: <span>Music by <a href='https://freesound.org/people/Hoerspielwerkstatt_HEF/sounds/472529/'>Hoerspielwerkstatt</a>.</span> },
  { soundFile: soundFileTwo, soundDuration: 25526, attribution: <span>Music by <a href='https://freesound.org/people/Hoerspielwerkstatt_HEF/sounds/270915/'>Hoerspielwerkstatt</a>.</span> },
  { soundFile: soundFileThree, soundDuration: 10264, attribution: <span>Music by <a href='https://freesound.org/people/Hoerspielwerkstatt_HEF/sounds/270910/'>Hoerspielwerkstatt</a>.</span> },
  { soundFile: soundFileFour, soundDuration: 10031, attribution: <span>Music by <a href='https://freesound.org/people/Hoerspielwerkstatt_HEF/sounds/270917/'>Hoerspielwerkstatt</a>.</span> },
  { soundFile: soundFileFive, soundDuration: 13718, attribution: <span>Music by <a href='https://freesound.org/people/Hoerspielwerkstatt_HEF/sounds/270916/'>Hoerspielwerkstatt</a>.</span> },
]

const levels = [
  <Game
    key={0}
    title={`Let's get Buildin'`}
    actors={[new Goal({ x: config.bounds.width - 1, y: config.bounds.height - 1 })]}
    description={`NASA finally approved your plans to build a staircase to the moon. You're now in charge of the project. The only way to go is up, and to the right, make humanity proud.`}
    soundtrack={soundtracks[0]}
  />,
  <Game
    key={1}
    title='Cloudy with a chance of stairs'
    description={`The clouds are generally harmless, but the staironauts can't operate inside them, try to avoid them at any cost.`}
    actors={[
      new Goal({ x: config.bounds.width - 1, y: config.bounds.height - 1 }),
      new Cloud({ x: 10, y: 9 }),
      new Cloud({ x: 11, y: 9 }),
      new Cloud({ x: 12, y: 9 }),
      new Cloud({ x: 13, y: 10 }),
      new Cloud({ x: 9, y: 10 }),
      new Cloud({ x: 10, y: 10 }),
      new Cloud({ x: 11, y: 10 }),
      new Cloud({ x: 12, y: 10 }),
      new Cloud({ x: 10, y: 11 }),
      new Cloud({ x: 11, y: 11 }),
      new Cloud({ x: 12, y: 11 }),
    ]}
    soundtrack={soundtracks[1]}
  />,
  <Game
    key={2}
    title='Is it gonna rain?'
    description={`The higher we go, the stronger the wind. This cloud is coming at us with high speed.`}
    actors={[
      new Goal({ x: config.bounds.width - 1, y: config.bounds.height - 1 }),
      new Cloud({ x: 20, y: 9 }, 'left'),
      new Cloud({ x: 21, y: 9 }, 'left'),
      new Cloud({ x: 22, y: 9 }, 'left'),
      new Cloud({ x: 19, y: 10 }, 'left'),
      new Cloud({ x: 20, y: 10 }, 'left'),
      new Cloud({ x: 21, y: 10 }, 'left'),
      new Cloud({ x: 22, y: 10 }, 'left'),
      new Cloud({ x: 23, y: 10 }, 'left'),
      new Cloud({ x: 20, y: 11 }, 'left'),
      new Cloud({ x: 21, y: 11 }, 'left'),
      new Cloud({ x: 22, y: 11 }, 'left'),
    ]}
    soundtrack={soundtracks[1]}
  />,
  <Game
    key={3}
    title='It did'
    description={`Better get out of here fast before the stairs get slippery.`}
    actors={[
      new Goal({ x: config.bounds.width - 1, y: config.bounds.height - 1 }),
      new Cloud({ x: 20, y: 9 }, 'left'),
      new Cloud({ x: 21, y: 9 }, 'left'),
      new Cloud({ x: 22, y: 9 }, 'left'),
      new Cloud({ x: 19, y: 10 }, 'left'),
      new Cloud({ x: 20, y: 10 }, 'left'),
      new Cloud({ x: 21, y: 10 }, 'left'),
      new Cloud({ x: 22, y: 10 }, 'left'),
      new Cloud({ x: 23, y: 10 }, 'left'),
      new Cloud({ x: 20, y: 11 }, 'left'),
      new Cloud({ x: 21, y: 11 }, 'left'),
      new Cloud({ x: 22, y: 11 }, 'left'),
      new Rain({ x: 20, y: 8 }, 'left'),
      new Rain({ x: 21, y: 8 }, 'left'),
      new Rain({ x: 22, y: 8 }, 'left'),
      new Cloud({ x: 10, y: 4 }, 'right'),
      new Cloud({ x: 9, y: 4 }, 'right'),
      new Cloud({ x: 8, y: 4 }, 'right'),
      new Cloud({ x: 11, y: 5 }, 'right'),
      new Cloud({ x: 10, y: 5 }, 'right'),
      new Cloud({ x: 9, y: 5 }, 'right'),
      new Cloud({ x: 8, y: 5 }, 'right'),
      new Cloud({ x: 7, y: 5 }, 'right'),
      new Cloud({ x: 10, y: 6 }, 'right'),
      new Cloud({ x: 9, y: 6 }, 'right'),
      new Cloud({ x: 8, y: 6 }, 'right'),
      new Rain({ x: 10, y: 3 }, 'right'),
      new Rain({ x: 9, y: 3 }, 'right'),
      new Rain({ x: 8, y: 3 }, 'right'),
    ]}
    soundtrack={soundtracks[1]}
  />,
  <Game
    key={4}
    title='Hope it misses the earth'
    description={`Asteroids. Careful not to hit them.`}
    actors={[
      new Goal({ x: config.bounds.width - 1, y: config.bounds.height - 1 }),
      new Asteroid({ x: 19, y: 11 }, 'down-right'),
      new Asteroid({ x: 17, y: 6 }, 'down-right'),
    ]}
    soundtrack={soundtracks[1]}
  />,
  <Game
    key={5}
    title='Who left those here?'
    description={`Look, a space station in geosynchronous orbit. We can probably salvage some resources from it.`}
    limit={20}
    actors={[
      new Goal({ x: config.bounds.width - 1, y: config.bounds.height - 1 }),
      new SpaceStation({ x: 10, y: 6 }),
      new SpaceStation({ x: 19, y: 3 }),
    ]}
    soundtrack={soundtracks[2]}
  />,
  <Game
    key={6}
    limit={10}
    title='Slow down a little'
    description={`These stations can't leave their orbit, but we can't reach the moon without the resources on them. What are we going to do? `}
    actors={[
      new Goal({ x: config.bounds.width - 1, y: config.bounds.height - 1 }),
      new SpaceStation({ x: 8, y: 2 }, 'up-left', 2),
      new SpaceStation({ x: 11, y: 9 }, 'up-left', 2),
      new SpaceStation({ x: 26, y: 8 }),
    ]}
    soundtrack={soundtracks[2]}
  />,
  <Game
    key={7}
    limit={10}
    title='Where do they come from?'
    description={`I wonder who built all of these space stations. Are the Chinese at it again?`}
    actors={[
      new Goal({ x: config.bounds.width - 1, y: config.bounds.height - 1 }),
      new SpaceStation({ x: 9, y: 5 }, 'up-left', 2),
      new SpaceStation({ x: 13, y: 7 }, 'up-left', 2),
      new SpaceStation({ x: 17, y: 1 }, 'up-left'),
    ]}
    soundtrack={soundtracks[2]}
  />,
  <Game
    key={8}
    title='Nice looking portal'
    description={`This portal has appeared out of nowhere. I'm curious to know where it leads. Let's try it out, for research reasons.`}
    limit={15}
    actors={[
      new Goal({ x: config.bounds.width - 1, y: config.bounds.height - 1 }),
      new Portal({ x: 8, y: 8 }, { x: 25, y: 10 }),
      new PortalExit({ x: 25, y: 10 }),
    ]}
    soundtrack={soundtracks[3]}
  />,
  <Game
    key={9}
    limit={15}
    title='That looks like a mess'
    description={`The moon is just around the corner, but we don't have enough stairs to reach it. Maybe we can use this portal hell to our advantage.`}
    actors={[
      new Goal({ x: config.bounds.width - 1, y: config.bounds.height - 1 }),

      new Portal({ x: 9, y: 5 }, { x: 10, y: 9 }),
      new PortalExit({ x: 10, y: 9 }),

      new Portal({ x: 7, y: 7 }, { x: 14, y: 11 }),
      new PortalExit({ x: 14, y: 11 }),

      new Portal({ x: 13, y: 1 }, { x: 15, y: 7 }),
      new PortalExit({ x: 15, y: 7 }),

      new Portal({ x: 13, y: 5 }, { x: 25, y: 3 }),
      new PortalExit({ x: 25, y: 3 }),

      new Portal({ x: 19, y: 13 }, { x: 27, y: 12 }),
      new PortalExit({ x: 27, y: 12 }),

      new Portal({ x: 29, y: 6 }, { x: 3, y: 10 }),
      new PortalExit({ x: 3, y: 10 }),

      new SpaceStation({ x: 27, y: 4 }),
    ]}
    soundtrack={soundtracks[4]}
  />,
]

export const Controller: FC = () => {
  const [level, setLevel] = useState(0)
  const [fontLoaded, setFontLoaded] = useState(false)
  const value = useMemo(() => ({
    onWin: () => setLevel(level => level + 1),
  }), [])
  load({
    google: {
      families: ['Source Code Pro'],
    },
    active: () => setFontLoaded(true),
  })
  return (
    <GameContext.Provider value={value}>
      <div style={{ color: 'white', whiteSpace: 'pre-wrap', fontSize: '5px', textAlign: 'center', marginBottom: '16px' }}>{title}</div>
      {fontLoaded && levels[level]}
      {level === levels.length && <Credits />}
      {window.location.search.includes('debug') && <div style={{ position: 'fixed', bottom: '1px' }}>
        {levels.map((_, index) => (
          <button type='button' onClick={() => setLevel(index)}>Level {index + 1}</button>
        ))}
      </div>}
    </GameContext.Provider>
  )
}
