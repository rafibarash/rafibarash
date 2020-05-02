// Axis Aligned Bounding Boxes
// https://www.youtube.com/watch?v=Iu6nAXFm2Wo&list=PLEETnX-uPtBXm1KEr_2zQ6K_0hoGH6JJ0&index=4

import { Vector } from '../math';
import IntersectData from './IntersectData';
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
    // TODO: how to do this?
    return this.minExtents;
  }

  intersectAABB(other: AABB): IntersectData {
    const distances1 = Vector.sub(other.getMinExtents(), this.maxExtents);
    const distances2 = Vector.sub(this.minExtents, other.getMaxExtents());
    const distances = Vector.max(distances1, distances2);
    const maxDistance = distances.max();
    return new IntersectData(maxDistance < 0, maxDistance);
  }

  getMinExtents(): Vector {
    return this.minExtents;
  }

  getMaxExtents(): Vector {
    return this.maxExtents;
  }
}
