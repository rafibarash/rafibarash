import CollisionObject from "./CollisionObject";
import { Vector } from "../math";

// No real extended functionality from collision object, needed to seperate from RigidBody
export default abstract class StaticBody extends CollisionObject {
  constructor(pos: Vector, options) {
    super(pos, options);
  }
}
