/**
 * This file contains useful math functions that are used throughout the project
 *
 */

import { Vector } from ".";

/**
 * Generates random int between min and max.
 * Copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}
