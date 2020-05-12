import { Vector } from '../math';
import Collider from './Collider';
import NoCollider from './NoCollider';

export default abstract class PhysicsObject {
  protected pos: Vector;
  protected oldPos: Vector;
  protected vel: Vector;
  protected acc: Vector;
  protected mass: number;
  protected maxForce: number;
  protected collider: Collider;

  constructor(
    pos: Vector,
    {
      collider = new NoCollider(pos),
      vel = new Vector(),
      maxForce = Infinity,
      mass = 1,
    }
  ) {
    this.pos = collider.getCenter();
    this.oldPos = collider.getCenter();
    this.vel = vel;
    this.acc = new Vector();
    this.mass = mass;
    this.maxForce = maxForce;
    this.collider = collider;
  }

  // abstract render(): void;

  update(dt: number): void {
    this.numericalIntegration(dt);
  }

  applyForce(force: Vector): void {
    if (this.maxForce > 0) {
      force.limit(this.maxForce);
    }
    force.mul(1 / this.mass);
    this.acc.add(force);
  }

  protected numericalIntegration(dt: number): void {
    this.vel.add(Vector.mul(this.acc, dt));
    this.pos.add(Vector.mul(this.vel, dt));
  }

  setAccel(accel: Vector): void {
    this.acc = accel;
  }

  getAccel(): Vector {
    return this.acc;
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
    // Move collider by distance moved
    this.collider.transform(translation);
    // Update old position back to current position
    this.oldPos = this.pos.copy();

    return this.collider;
  }

  setCollider(c: Collider): void {
    this.collider = c;
  }
}
