// import { Vector } from "../math";
// import RigidBody from "../engine/PhysicsObject";

// /**
//  * A RigidBody Agent that contains a goal and a path towards that goal
//  *
//  * @abstract
//  * @class Agent
//  * @extends {RigidBody}
//  */
// export default abstract class Agent extends RigidBody {
//   protected path: Array<Vector>;
//   protected goal: Vector;

//   constructor(
//     pos: Vector,
//     goal: Vector,
//     {
//       initVel = new Vector(),
//       isCircularObject = true,
//       radius = 0,
//       extent = new Vector(),
//       targetSpeed = 0,
//       maxForce = 0,
//     }
//   ) {
//     super(pos, {
//       initVel,
//       isCircularObject,
//       radius,
//       extent,
//       targetSpeed,
//       maxForce,
//     });
//     this.goal = goal;
//   }

//   /***********************************************
//    * Getters and Setters
//    **********************************************/

//   setPath(path: Array<Vector>): void {
//     this.path = path;
//   }

//   getPath(): Array<Vector> {
//     return this.path;
//   }

//   setGoal(goal: Vector): void {
//     this.goal = goal;
//   }

//   getGoal(): Vector {
//     return this.goal;
//   }
// }
