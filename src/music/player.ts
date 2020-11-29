
const volume = 0.1
const volumeSteps = 10
const fadeDuration = 2000

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
      this.audio.volume = Math.min(volume, this.audio.volume + (volume / volumeSteps))
    }, fadeDuration / volumeSteps)
    // HTML5 Audio loop property is shit. There's almost a full second of gap if I use it.
    const repeat = () => {
      this.audio.currentTime = 0
      this.audio.play()
      setTimeout(repeat, this.durationMs)
    }
    repeat()
    setTimeout(() => {
      clearInterval(interval)
    }, fadeDuration)
  }
  fadeOut (): void {
    const interval = setInterval(() => {
      this.audio.volume = Math.max(0, this.audio.volume - (volume / 10))
    }, fadeDuration / volumeSteps)
    setTimeout(() => {
      clearInterval(interval)
      this.audio.pause()
    }, fadeDuration)
  }
}
