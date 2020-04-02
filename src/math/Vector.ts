export default class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /***********************************************
   * Basic Arithmetic
   **********************************************/

  add(vec: Vector): void {
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;
  }

  static add(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  sub(vec: Vector): void {
    this.x -= vec.x;
    this.y -= vec.y;
    this.z -= vec.z;
  }

  static sub(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  }

  mul(s: number): void {
    this.x *= s;
    this.y *= s;
    this.z *= s;
  }

  static mul(vec: Vector, s: number): Vector {
    return new Vector(vec.x * s, vec.y * s, vec.z * s);
  }

  div(s: number): void {
    this.x /= s;
    this.y /= s;
    this.z /= s;
  }

  static div(vec: Vector, s: number): Vector {
    return new Vector(vec.x / s, vec.y / s, vec.z / s);
  }

  /***********************************************
   * More Complex Math
   **********************************************/

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  mag2(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  normalize(): void {
    const mag = this.mag();
    this.div(mag);
  }

  limit(max: number): void {
    const mag = this.mag();
    if (mag > max) {
      this.mul(max / mag);
    }
  }

  dot(vec: Vector): number {
    return this.x * vec.x + this.y * vec.y + this.z * vec.z;
  }

  static dot(v1: Vector, v2: Vector): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  distance(vec: Vector): number {
    return Math.sqrt(
      Math.pow(this.x - vec.x, 2) +
        Math.pow(this.y - vec.y, 2) +
        Math.pow(this.z - vec.z, 2)
    );
  }

  static distance(v1: Vector, v2: Vector): number {
    return Math.sqrt(
      Math.pow(v1.x - v2.x, 2) +
        Math.pow(v1.y - v2.y, 2) +
        Math.pow(v1.z - v2.z, 2)
    );
  }

  projectToLine(directional: Vector): Vector {
    let tmp = this.dot(directional);
    tmp /= directional.mag2();
    return new Vector(
      directional.x * tmp,
      directional.y * tmp,
      directional.z * tmp
    );
  }

  projectToPlane(normal: Vector): Vector {
    const tmp = this.projectToLine(normal);
    return new Vector(this.x - tmp.x, this.y - tmp.y, this.z - tmp.z);
  }

  angle(vec: Vector): number {
    return Math.acos(this.dot(vec) / (this.mag() * vec.mag()));
  }

  reflect(vec: Vector): void {
    const normal = vec.copy();
    const nl = this.dot(normal) * 2;
    normal.mul(nl);
    this.sub(normal);
  }

  /***********************************************
   * Misc Functionality
   **********************************************/

  copy(): Vector {
    return new Vector(this.x, this.y, this.z);
  }

  equals(vec: Vector): boolean {
    return this.x === vec.x && this.y === vec.y && this.z === vec.z;
  }

  toString(): string {
    return `<${this.x}, ${this.y}, ${this.z}>`;
  }
}
