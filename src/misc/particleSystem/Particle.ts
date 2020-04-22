// import Spatial from "../../engine/PhysicsObject";
// import { Vector, getRandomInt, eulerianIntegration } from "../../math";

// export default abstract class Particle extends Spatial {
//   vel: Vector;
//   acc: Vector;
//   mass: number;
//   radius: number;
//   lifespan: number;
//   // img: string;
//   // color: Vector;
//   isDead: boolean;
//   integrationMethod: (
//     pos: Vector,
//     vel: Vector,
//     acc: Vector,
//     dt: number
//   ) => void;

//   constructor(
//     pos: Vector,
//     {
//       vel = new Vector(getRandomInt(-1, 1), getRandomInt(-1, 1), 0),
//       acc = new Vector(),
//       mass = 1,
//       radius = 5,
//       lifespan = 255,
//       isDead = false,
//       integrationMethod = eulerianIntegration,
//     }
//   ) {
//     super(pos);
//     this.vel = vel;
//     this.acc = acc;
//     this.mass = mass;
//     this.radius = radius;
//     this.lifespan = lifespan;
//     this.isDead = isDead;
//     this.integrationMethod = integrationMethod;
//   }

//   /***********************************************
//    * Abstract Functions
//    **********************************************/

//   abstract render(): void;
// }
