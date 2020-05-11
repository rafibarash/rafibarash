// Collider class that all colliders inherit from
// https://www.youtube.com/watch?v=vkuZPVSR4hI&list=PLEETnX-uPtBXm1KEr_2zQ6K_0hoGH6JJ0&index=9

import IntersectData from './IntersectData';
import BoundingSphere from './BoundingSphere';
import { Vector } from '../math';
import { CollidableType } from './types';
import AABB from './AABB';

export default abstract class Collider {
  static readonly Type = CollidableType;
  readonly Type = Collider.Type;

  type: CollidableType;

  constructor(type: CollidableType) {
    this.type = type;
  }

  abstract transform(translation: Vector): void;

  abstract getCenter(): Vector;

  intersect(other: Collider): IntersectData {
    if (this.isNoCollider() || other.isNoCollider()) {
      return new IntersectData(false, 0);
    }
    // Handle collisions
    if (this.isSphere()) {
      // This Collider is a Bounding Sphere
      const self = <BoundingSphere>(<unknown>this);
      if (other.isSphere()) {
        // Intersect with other Bounding Sphere
        return self.intersectBoundingSphere(<BoundingSphere>other);
      } else if (other.isAABB()) {
        // Intersect with other AABB
        return self.intersectAABB(<AABB>other);
      }
    } else if (this.isAABB()) {
      // This Collider is an AABB
      const self = <AABB>(<unknown>this);
      if (other.isAABB()) {
        // Intersect with other AABB
        return self.intersectAABB(<AABB>other);
      } else if (other.isSphere()) {
        // Intersect with other Bounding Sphere
        return self.intersectBoundingSphere(<BoundingSphere>other);
      }
    }

    throw new Error(
      `Trying to create an unsupported collision of type "${this.type}" and "${other.type}`
    );
  }

  getType(): CollidableType {
    return this.type;
  }

  isSphere(): boolean {
    return this.type === CollidableType.SPHERE;
  }

  isAABB(): boolean {
    return this.type === CollidableType.AABB;
  }

  isPlane(): boolean {
    return this.type === CollidableType.PLANE;
  }

  isNoCollider(): boolean {
    return this.type === CollidableType.NONE;
  }
}

// // Helper function for determining if line created by two points intersects with circular collision object
// // Stephen Guy is the mastermind behind this function
// protected isCircularCollisionWithLine(p1: Vector, p2: Vector): boolean {
//   // Make sure we are a circular object
//   if (!this.isCircularObject) {
//     throw new Error(
//       "You are checking for a circular collision with a non-circular object."
//     );
//   }
//   // Step 1: Compute V - a normalized vector pointing from the start of the linesegment to the end of the line segment
//   const uv = Vector.sub(p2, p1); // line direction vector
//   const v = Vector.normalize(uv); // normalized line direction vector

//   // Step 2: Compute W - a displacement vector pointing from the start of the line segment to the center of this circle
//   const w = Vector.sub(this.pos, p1);

//   // Step 3: Solve quadratic equation for intersection point (in terms of V and W)
//   const a = 1; // Length of V (we normalized it)
//   const b = -2 * Vector.dot(v, w); // -2 * dot(V,W)
//   const c = w.mag2() - Math.pow(this.radius / 2, 2); // difference of squared distances

//   const d = b * b - 4 * a * c; // discriminant

//   let colliding = false;

//   if (d >= 0) {
//     // If d is positive we know the line is colliding, but we need to check if the collision line within the line segment
//     //  ... this means t will be between 0 and the lenth of the line segment
//     const t = (-b - Math.sqrt(d)) / (2 * a); // Optimization: we only need the first collision
//     if (t > 0 && t < uv.mag()) {
//       colliding = true;
//     }
//   }

//   return colliding;
// }
