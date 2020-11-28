
export class MusicPlayer {
  audio
  constructor (src: string) {
    this.audio = new Audio(src) 
    this.audio.loop = true
  }
  fadeIn (): void {
    this.audio.volume = 0
    this.audio.play()
    const interval = setInterval(() => {
      this.audio.volume = Math.min(0.5, this.audio.volume + 0.025)
    }, 200)
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
