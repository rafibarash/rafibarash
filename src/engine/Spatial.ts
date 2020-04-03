import { Vector } from "../math";

export default abstract class Spatial {
  protected pos = new Vector();

  constructor(pos: Vector) {
    this.pos = pos;
  }

  /***********************************************
   * Getters and Setters
   **********************************************/

  setPos(pos: Vector): void {
    this.pos = pos;
  }

  getPos(): Vector {
    return this.pos;
  }
}
