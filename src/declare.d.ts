declare module '*.mp3' {
  const file: string
  export default file
}

declare namespace NodeJS {
  export interface Global {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    game: any,
  }
}
