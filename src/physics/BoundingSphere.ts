// Used to calculate sphere collisions
// https://www.youtube.com/watch?v=eFxcAI85xeg&list=PLEETnX-uPtBXm1KEr_2zQ6K_0hoGH6JJ0&index=3

import IntersectData from './IntersectData';
import Collider from './Collider';
import AABB from './AABB';
import { Vector } from '../math';

export default class BoundingSphere extends Collider {
  private center: Vector;
  private radius: number;

  constructor(center: Vector, radius: number) {
    super(Collider.Type.SPHERE);
    this.center = center;
    this.radius = radius;
  }

  transform(translation: Vector): void {
    this.center.add(translation);
  }

  intersectBoundingSphere(other: BoundingSphere): IntersectData {
    const radiusDistance = this.radius + other.getRadius();
    const centerDistance = Vector.distance(this.center, other.getCenter());
    const distance = centerDistance - radiusDistance;
    return new IntersectData(distance < 0, distance);
  }

  intersectAABB(other: AABB): IntersectData {
    // get box closest point to sphere center by clamping
    const minVec = Vector.min(this.getCenter(), other.getMaxExtents());
    const maxVec = Vector.max(other.getMinExtents(), minVec);

    // this is the same as isPointInsideSphere
    const distance = Vector.distance(maxVec, this.getCenter());

    return new IntersectData(distance < this.getRadius(), distance);
  }

  getCenter(): Vector {
    return this.center;
  }

  getRadius(): number {
    return this.radius;
  }
}
