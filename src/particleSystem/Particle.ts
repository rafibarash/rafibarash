import { ParticleProps } from './types';
import { Vector } from '../math';
import { PhysicsObject } from '../physics';

export default class Particle extends PhysicsObject {
  props: ParticleProps;

  constructor() {
    super(new Vector(), {});
  }

  update(dt: number) {
    // 1st order Eulerian Integration
    this.props.vel.add(Vector.mul(this.props.acc, dt));
    this.props.pos.add(Vector.mul(this.props.vel, dt));

    // convert from degrees to radians: 0.01745329251 = Math.PI/180
    this.props.angle += this.props.angleVel * 0.01745329251 * dt;
    this.props.angleVel += this.props.angleAcc * 0.01745329251 * dt;

    this.props.lifespan -= dt;

    // if the tween for a given attribute is nonempty,
    //  then use it to update the attribute's value

    if (this.props.radiusTween.times.length > 0)
      this.props.radius = <number>(
        this.props.radiusTween.lerp(this.props.lifespan)
      );

    if (this.props.colorTween.times.length > 0) {
      this.props.color = <Vector>(
        this.props.colorTween.lerp(this.props.lifespan)
      );
      // this.props.color = new THREE.Color().setHSL(colorHSL.x, colorHSL.y, colorHSL.z);
    }

    if (this.props.opacityTween.times.length > 0)
      this.props.opacity = <number>(
        this.props.opacityTween.lerp(this.props.lifespan)
      );
  }

  setProps(props: ParticleProps) {
    this.props = props;
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
