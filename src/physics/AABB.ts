// Axis Aligned Bounding Boxes
// https://www.youtube.com/watch?v=Iu6nAXFm2Wo&list=PLEETnX-uPtBXm1KEr_2zQ6K_0hoGH6JJ0&index=4

import { Vector } from '../math';
import IntersectData from './IntersectData';
import BoundingSphere from './BoundingSphere';
import Collider from './Collider';

export default class AABB extends Collider {
  private minExtents: Vector;
  private maxExtents: Vector;

  constructor(minExtents: Vector, maxExtents: Vector) {
    super(Collider.Type.AABB);
    this.minExtents = minExtents;
    this.maxExtents = maxExtents;
  }

  transform(transformation: Vector): void {
    this.minExtents.add(transformation);
    this.maxExtents.add(transformation);
  }

  getCenter(): Vector {
    const center = Vector.add(this.minExtents, this.maxExtents);
    center.div(2);
    return center;
  }

  intersectAABB(other: AABB): IntersectData {
    const distances1 = Vector.sub(other.getMinExtents(), this.maxExtents);
    const distances2 = Vector.sub(this.minExtents, other.getMaxExtents());
    const distances = Vector.max(distances1, distances2);
    const maxDistance = distances.max();
    return new IntersectData(maxDistance < 0, maxDistance);
  }

  intersectBoundingSphere(other: BoundingSphere): IntersectData {
    // get box closest point to sphere center by clamping
    const minVec = Vector.min(other.getCenter(), this.maxExtents);
    const maxVec = Vector.max(this.minExtents, minVec);

    // this is the same as isPointInsideSphere
    const distance = Vector.distance(maxVec, other.getCenter());

    return new IntersectData(distance < other.getRadius(), distance);
  }

  getMinExtents(): Vector {
    return this.minExtents;
  }

  getMaxExtents(): Vector {
    return this.maxExtents;
  }
}
