// Typescript implementation of this Tween class
// https://github.com/stemkoski/stemkoski.github.com/blob/f5c7120af8488d04255b3e4492f4fb214d80b6ff/Three.js/js/ParticleEngine.js

import { Vector } from '../math';

type numberOrVector = number | Vector;

export default class Tween {
  times: Array<number>;
  values: Array<numberOrVector>;

  constructor(times = [], values = []) {
    this.times = times;
    this.values = values;
  }

  lerp(t: number): numberOrVector {
    if (this.values.length === 0) {
      throw new Error('Trying to lerp a blank Tween class.');
    }

    let i = 0;
    let n = this.times.length;
    while (i < n && t > this.times[i]) i++;
    if (i === 0) return this.values[0];
    if (i === n) return this.values[n - 1];

    const p = (t - this.times[i - 1]) / (this.times[i] - this.times[i - 1]);

    if (this.values[0] instanceof Vector) {
      // Vector
      const prev = <Vector>this.values[i - 1];
      const cur = <Vector>this.values[i - 1];
      return prev.copy().lerp(cur, p);
    }

    // its a float
    else {
      const prev = <number>this.values[i - 1];
      const cur = <number>this.values[i - 1];
      return prev + p * (cur - prev);
    }
  }
}
