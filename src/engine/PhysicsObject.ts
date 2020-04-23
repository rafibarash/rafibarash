import { Vector } from "../math";
import BoundingSphere from "./BoundingSphere";
import Collider from "./Collider";

export default abstract class PhysicsObject {
  protected pos: Vector;
  protected oldPos: Vector;
  protected vel: Vector;
  protected acc: Vector;
  protected maxForce: number;
  protected collider: Collider;

  constructor(collider: Collider, { vel = new Vector(), maxForce = Infinity }) {
    this.pos = collider.getCenter();
    this.oldPos = collider.getCenter();
    this.vel = vel;
    this.acc = new Vector();
    this.maxForce = maxForce;
    this.collider = collider;
  }

  abstract render(): void;

  update(dt: number): void {
    this.numericalIntegration(dt);
  }

  applyForce(force: Vector): void {
    if (this.maxForce > 0) {
      force.limit(this.maxForce);
    }
    this.acc.add(force);
  }

  private numericalIntegration(dt: number): void {
    this.vel.add(Vector.mul(this.acc, dt));
    this.pos.add(Vector.mul(this.vel, dt));
    this.acc = new Vector();
  }

  setPos(pos: Vector): void {
    this.pos = pos;
  }

  getPos(): Vector {
    return this.pos;
  }

  setVel(vel: Vector): void {
    this.vel = vel;
  }

  getVel(): Vector {
    return this.vel;
  }

  /**
   * Returns a collider in the position of this object, updating the
   * collider's position if necessary.
   *
   * @returns {Collider}
   * @memberof PhysicsObject
   */
  getCollider(): Collider {
    // Find distance between current and old position
    const translation = Vector.sub(this.pos, this.oldPos);
    // Update old position back to current position
    this.oldPos = this.pos;
    // Move collider by distance moved
    this.collider.transform(translation);
    return this.collider;
  }
}