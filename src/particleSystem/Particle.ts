import { ParticleProps } from "./types";
import { Vector } from "../math";
import { PhysicsObject } from "../physics";

export default class Particle extends PhysicsObject {
  props: ParticleProps;

  constructor() {
    super(new Vector(), {});
  }

  setProps(props: ParticleProps) {
    this.props = props;

    this.pos = props.pos;
    this.vel = props.vel;
    this.acc = props.acc;
  }

  // Is the particle still useful?
  isDead(): boolean {
    if (this.props.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
