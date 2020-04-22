export default class IntersectData {
  doesIntersect: boolean;
  distance: number;

  constructor(doesIntersect: boolean, distance: number) {
    this.doesIntersect = doesIntersect;
    this.distance = distance;
  }
}
