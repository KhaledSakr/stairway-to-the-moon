
export const config = {
  bounds: {
    width: 31,
    height: 15,
  },
}

// width - height has to be zero or a positive even number
if ((config.bounds.width - config.bounds.height) < 0 || (config.bounds.width - config.bounds.height) % 2 !== 0) {
  throw new Error('Solution is not possible.')
}
