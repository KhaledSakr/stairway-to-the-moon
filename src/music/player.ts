
export class MusicPlayer {
  audio: HTMLAudioElement
  durationMs
  constructor (src: string, durationMs: number) {
    this.audio = new Audio(src)
    this.durationMs = durationMs
  }
  fadeIn (): void {
    this.audio.volume = 0
    const interval = setInterval(() => {
      this.audio.volume = Math.min(0.5, this.audio.volume + 0.025)
    }, 200)
    // HTML5 Audio loop property is shit. There's almost a full second of gap if I use it.
    const repeat = () => {
      this.audio.currentTime = 0
      this.audio.play()
      setTimeout(repeat, this.durationMs)
    }
    repeat()
    setTimeout(() => {
      clearInterval(interval)
    }, 2000)
  }
  fadeOut (): void {
    const interval = setInterval(() => {
      this.audio.volume = Math.max(0, this.audio.volume - 0.025)
    }, 200)
    setTimeout(() => {
      clearInterval(interval)
      this.audio.pause()
    }, 2000)
  }
}
