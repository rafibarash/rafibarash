import Collider from './Collider';
import { Vector } from '../math';

export default class NoCollider extends Collider {
  protected pos: Vector;

  constructor(pos: Vector) {
    super(Collider.Type.NONE);
    this.pos = pos;
  }

  transform(translation: Vector): void {
    this.pos.add(translation);
  }

  getCenter(): Vector {
    return this.pos;
  }
}
