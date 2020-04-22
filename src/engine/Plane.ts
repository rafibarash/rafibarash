// Plane Collider
// https://www.youtube.com/watch?v=5BJs02PaSok&list=PLEETnX-uPtBXm1KEr_2zQ6K_0hoGH6JJ0&index=5

import { Vector } from "../math";
import IntersectData from "./IntersectData";
import BoundingSphere from "./BoundingSphere";

export default class Plane {
  private normal: Vector;
  private distance: number;

  constructor(normal: Vector, distance: number) {
    this.normal = normal;
    this.distance = distance;
  }

  normalized(): Plane {
    const mag = this.normal.mag();
    return new Plane(Vector.div(this.normal, mag), this.distance * mag);
  }

  intersectBoundingSphere(other: BoundingSphere): IntersectData {
    const distanceFromSphereCenter = Math.abs(
      this.normal.dot(other.getCenter()) - this.distance
    );
    const distanceFromSphere = distanceFromSphereCenter - other.getRadius();

    return new IntersectData(distanceFromSphere < 0, distanceFromSphere);
  }

  getNormal(): Vector {
    return this.normal;
  }

  getDistance(): number {
    return this.distance;
  }
}
