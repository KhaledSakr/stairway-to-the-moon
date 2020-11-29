import { FC, useEffect, useState } from 'react'
import endingSoundtrack from './music/ending.mp3'

const moon = ".--------------.\r\n.---\'  o        .    `---.\r\n.-\'    .    O  .         .   `-.\r\n.-\'     @@@@@@       .             `-.\r\n.\'@@   @@@@@@@@@@@       @@@@@@@   .    `.\r\n.\'@@@  @@@@@@@@@@@@@@     @@@@@@@@@         `.\r\n\/@@@  o @@@@@@@@@@@@@@     @@@@@@@@@     O     \\\r\n\/        @@@@@@@@@@@@@@  @   @@@@@@@@@ @@     .  \\\r\n\/@  o      @@@@@@@@@@@   .  @@  @@@@@@@@@@@     @@ \\\r\n\/@@@      .   @@@@@@ o       @  @@@@@@@@@@@@@ o @@@@ \\\r\n\/@@@@@                  @ .      @@@@@@@@@@@@@@  @@@@@ \\\r\n|@@@@@    O    `.-.\/  .        .  @@@@@@@@@@@@@   @@@  |\r\n\/ @@@@@        --`-\'       o        @@@@@@@@@@@ @@@    . \\\r\n|@ @@@@ .  @  @    `    @            @@      . @@@@@@    |\r\n|   @@                         o    @@   .     @@@@@@    |\r\n|  .     @   @ @       o              @@   o   @@@@@@.   |\r\n\\     @    @       @       .-.       @@@@       @@@      \/\r\n|  @    @  @              `-\'     . @@@@     .    .    |\r\n\\ .  o       @  @@@@  .              @@  .           . \/\r\n\\      @@@    @@@@@@       .                   o     \/\r\n\\    @@@@@   @@\\@@    \/        O          .        \/\r\n\\ o  @@@       \\ \\  \/  __        .   .     .--.  \/\r\n\\      .     . \\.-.---                   `--\'  \/\r\n`.             `-\'      .                   .\'\r\n`.    o     \/ | `           O     .     .\'\r\n`-.      \/  |        o             .-\'\r\n`-.          .         .     .-\'\r\n`---.        .       .---\'\r\n`--------------\'"

const lines = [
  <br />,
  ...moon.split(/\r?\n/),
  <br />,
  'Congratulations, you climbed up to the moon. That was a lot of steps for one man.',
]

export const Credits: FC = () => {
  const [line, setLine] = useState(0)
  useEffect(() => {
    const audio = new Audio(endingSoundtrack)
    audio.play()
    return () => {
      audio.pause()
    }
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      setLine(l => {
        if (l === lines.length - 1) {
          clearInterval(interval)
        }
        return l + 1
      })
    }, 300)
    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <div style={{ color: 'darkgrey', textAlign: 'center', whiteSpace: 'pre', height: '640px' }}>
      {lines.slice(lines.length - line, lines.length).map(line => <div>{line}</div>)}
      <div
        style={{
          color: 'grey',
          fontSize: '12px',
          maxWidth: '500px',
          whiteSpace: 'normal',
          margin: 'auto',
          marginTop: '8px',
        }}
      >
        You can view the code for this game on <a href='https://github.com/KhaledSakr/stairway-to-the-moon'>GitHub</a>, feel free to fork it, add more levels, or improve the actors and visuals.
        <span style={{ position: 'fixed', bottom: '4px', left: '4px' }} >
          Music by <a href='https://freesound.org/people/sunfly/sounds/122633/'>sunfly.</a>
        </span>
      </div>
    </div>
  )
}
