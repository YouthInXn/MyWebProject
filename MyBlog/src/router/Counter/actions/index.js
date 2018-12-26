
/**
 * constants
 * */
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const RESET = 'RESET'

/**
 * actions
 * */

export function increment() {
  debugger
  return {
    type:INCREMENT
  }
}
export function decrement() {
  return {
    type:DECREMENT
  }
}
export function reset() {
  return {
    type:RESET
  }
}
