import { Vector } from "../math";
import Spatial from "./Spatial";

export default abstract class CollisionObject extends Spatial {
  protected isCircularObject: boolean; // Used to check if circular or box object
  protected radius: number; // used to support circular objects
  protected extent: Vector; // used to support box objects

  constructor(
    pos: Vector,
    { isCircularObject = true, radius = 0, extent = new Vector() }
  ) {
    super(pos);
    this.isCircularObject = isCircularObject;
    this.radius = radius;
    this.extent = extent;
  }

  /***********************************************
   * Abstract Methods
   **********************************************/

  // Abstract method for is collision with an object
  abstract isCollision(obj: CollisionObject): boolean;

  // Abstract method for is collision with a point
  abstract isCollision(point: Vector): boolean;

  // Abstract method for updating the state of this object
  abstract update(dt: number): void;

  // Abstract method for rendering this object
  abstract render(): void;

  /***********************************************
   * Helper Methods
   **********************************************/

  // Helper function for determining if line created by two points intersects with circular collision object
  // Stephen Guy is the mastermind behind this function
  protected isCircularCollisionWithLine(p1: Vector, p2: Vector): boolean {
    // Make sure we are a circular object
    if (!this.isCircularObject) {
      throw new Error(
        "You are checking for a circular collision with a non-circular object."
      );
    }
    // Step 1: Compute V - a normalized vector pointing from the start of the linesegment to the end of the line segment
    const uv = Vector.sub(p2, p1); // line direction vector
    const v = Vector.normalize(uv); // normalized line direction vector

    // Step 2: Compute W - a displacement vector pointing from the start of the line segment to the center of this circle
    const w = Vector.sub(this.pos, p1);

    // Step 3: Solve quadratic equation for intersection point (in terms of V and W)
    const a = 1; // Length of V (we normalized it)
    const b = -2 * Vector.dot(v, w); // -2 * dot(V,W)
    const c = w.mag2() - Math.pow(this.radius / 2, 2); // difference of squared distances

    const d = b * b - 4 * a * c; // discriminant

    let colliding = false;

    if (d >= 0) {
      // If d is positive we know the line is colliding, but we need to check if the collision line within the line segment
      //  ... this means t will be between 0 and the lenth of the line segment
      const t = (-b - Math.sqrt(d)) / (2 * a); // Optimization: we only need the first collision
      if (t > 0 && t < uv.mag()) {
        colliding = true;
      }
    }

    return colliding;
  }

  /***********************************************
   * Getters and Setters
   **********************************************/

  isCircular(): boolean {
    return this.isCircularObject;
  }

  setIsCircular(isCircularObject: boolean) {
    this.isCircularObject = isCircularObject;
  }

  getRadius(): number {
    return this.radius;
  }

  setRadius(radius: number): void {
    this.radius = radius;
  }

  getExtent(): Vector {
    return this.extent;
  }

  setExtent(extent: Vector): void {
    this.extent = extent;
  }
}
