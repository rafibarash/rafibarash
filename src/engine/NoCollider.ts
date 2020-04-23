import Collider from "./Collider";
import { Vector } from "../math";

export default class NoCollider extends Collider {
  constructor() {
    super(Collider.Type.NONE);
  }

  transform(translation: Vector): void {}

  getCenter(): Vector {
    return new Vector();
  }
}
