import { ParticleProps } from './types';
import Tween from './Tween';
import { Vector } from '../math';
import { PhysicsObject } from '../physics';

export default class Particle extends PhysicsObject implements ParticleProps {
  pos: Vector;
  vel: Vector;
  acc: Vector;
  lifespan: number;
  angle: number;
  angleVel: number;
  angleAcc: number;
  radius: number;
  radiusTween: Tween;
  color: Vector;
  colorTween: Tween;
  opacity: number;
  opacityTween: Tween;
  texture: any;

  constructor(props: ParticleProps) {
    super(new Vector(), {});
    this.setProps(props);
  }

  update(dt: number) {
    if (this.isDead()) return;

    // 1st order Eulerian Integration
    this.vel.add(Vector.mul(this.acc, dt));
    this.pos.add(Vector.mul(this.vel, dt));

    // convert from degrees to radians: 0.01745329251 = Math.PI/180
    this.angle += this.angleVel * 0.01745329251 * dt;
    this.angleVel += this.angleAcc * 0.01745329251 * dt;

    this.lifespan -= dt;

    // if the tween for a given attribute is nonempty,
    //  then use it to update the attribute's value

    if (this.radiusTween.times.length > 0)
      this.radius = <number>this.radiusTween.lerp(this.lifespan);

    if (this.colorTween.times.length > 0) {
      this.color = <Vector>this.colorTween.lerp(this.lifespan);
      // this.props.color = new THREE.Color().setHSL(colorHSL.x, colorHSL.y, colorHSL.z);
    }

    if (this.opacityTween.times.length > 0)
      this.opacity = <number>this.opacityTween.lerp(this.lifespan);
  }

  setProps(props: ParticleProps) {
    const {
      pos,
      vel,
      acc,
      lifespan,
      angle,
      angleVel,
      angleAcc,
      radius,
      radiusTween,
      color,
      colorTween,
      opacity,
      opacityTween,
      texture,
    } = props;

    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
    this.lifespan = lifespan;
    this.angle = angle;
    this.angleVel = angleVel;
    this.angleAcc = angleAcc;
    this.radius = radius;
    this.radiusTween = radiusTween;
    this.color = color;
    this.colorTween = colorTween;
    this.opacity = opacity;
    this.opacityTween = opacityTween;
    this.texture = texture;
  }

  // Is the particle still useful?
  isDead(): boolean {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
