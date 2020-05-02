// Heavily influenced by a great Youtube series on building a Physics Engine
// https://www.youtube.com/watch?v=3Oay1YxkP5c

import { Vector } from '../math';
import PhysicsObject from './PhysicsObject';
import IntersectData from './IntersectData';

export default abstract class PhysicsEngine {
  protected objects: Array<PhysicsObject>;

  constructor() {
    this.objects = new Array<PhysicsObject>();
  }

  /**
   * Called right after instantiating Physics.
   *
   * This function contains logic necessary to setting up the Physics engine, such as adding PhysicsObjects for the engine to keep track of, adding global forces such as gravity, etc.
   *
   * @abstract
   * @memberof Physics
   */
  abstract init(): void;

  /**
   * Updates the state of the world by a timestep 'dt'.
   *
   * @param {number} dt
   * @memberof PhysicsEngine
   */
  update(dt: number): void {
    this.handleCollisions();

    for (let obj of this.objects) {
      obj.update(dt);
    }
  }

  /**
   * Adds a PhysicsObject to an internal list to keep track of it in the simulation.
   *
   * @param {PhysicsObject} obj
   * @memberof PhysicsEngine
   */
  addObject(obj: PhysicsObject): void {
    this.objects.push(obj);
  }

  /**
   * Apply force to all objects.
   *
   * Example use case: applying gravity force
   *
   * @param {Vector} force
   * @memberof PhysicsEngine
   */
  applyForce(force: Vector): void {
    for (let obj of this.objects) {
      obj.applyForce(force);
    }
  }

  getObject(idx: number): PhysicsObject {
    return this.objects[idx];
  }

  getNumObjects(): number {
    return this.objects.length;
  }

  handleCollisions(): void {
    for (let i = 0; i < this.getNumObjects(); i++) {
      for (let j = i + 1; j < this.getNumObjects(); j++) {
        // Get intersect data
        const collider1 = this.objects[i].getCollider();
        const collider2 = this.objects[j].getCollider();
        const intersectData = collider1.intersect(collider2);

        // If intersecting, do collision response
        // TODO: Actually handle correctly
        if (intersectData.doesIntersect) {
          this.objects[i].setVel(Vector.mul(this.objects[i].getVel(), -1));
          this.objects[j].setVel(Vector.mul(this.objects[j].getVel(), -1));
        }
      }
    }
  }
}
