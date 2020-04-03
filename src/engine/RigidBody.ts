import CollisionObject from "./CollisionObject";
import { Vector } from "../math";

export default abstract class RigidBody extends CollisionObject {
  protected vel: Vector;
  protected acc: Vector;
  protected targetSpeed: number;
  protected maxForce: number;

  constructor(
    pos: Vector,
    {
      initVel = new Vector(),
      isCircularObject = true,
      radius = 0,
      extent = new Vector(),
      targetSpeed = 0,
      maxForce = 0,
    }
  ) {
    super(pos, { isCircularObject, radius, extent });
    this.vel = initVel;
    this.acc = new Vector();
    this.targetSpeed = targetSpeed;
    this.maxForce = maxForce;
  }

  /***********************************************
   * Main Methods
   **********************************************/

  applyForce(force: Vector): void {
    if (this.maxForce > 0) {
      force.limit(this.maxForce);
    }
    this.acc.add(force);
  }

  /***********************************************
   * Getters and Setters
   **********************************************/

  getVel(): Vector {
    return this.vel;
  }

  setTargetSpeed(targetSpeed: number): void {
    this.targetSpeed = targetSpeed;
  }

  setMaxForce(maxForce: number): void {
    this.maxForce = maxForce;
  }
}
