// Very heavily influenced by an existing particle engine
// https://github.com/stemkoski/stemkoski.github.com/blob/f5c7120af8488d04255b3e4492f4fb214d80b6ff/Three.js/js/ParticleEngine.js

import Particle from './Particle';
import { ParticleProps, ParticleSystemProps, Type } from './types';
import { Vector, getRandomInt } from '../math';
import Tween from './Tween';

export default class ParticleSystem implements ParticleSystemProps {
  particles: Array<Particle>;
  static Type = Type;

  /****************************************************************
   * Particle System Properties
   ***************************************************************/
  lifespan: number;
  particleLifespan: number;
  genRate: number;

  /****************************************************************
   * Particle Properties
   ***************************************************************/

  posStyle: Type;
  posBase: Vector;
  posSpread?: Vector;
  posRadius?: number; // distance from base at which particles start

  velStyle: Type;
  velBase: Vector;
  velSpread?: Vector;
  speedBase?: number;
  speedSpread?: number;

  accBase?: Vector;
  accSpread?: Vector;

  particleTexture?: any;
  blendStyle?: any;

  // rotation of image used for particle
  angleBase?: number;
  angleSpread?: number;
  angleVelBase?: number;
  angleVelSpread?: number;
  angleAccBase?: number;
  angleAccSpread?: number;

  // size, color, opacity
  //   for static  values, use base/spread
  //   for dynamic values, use Tween
  //   (non-empty Tween takes precedence)
  radiusBase?: number;
  radiusSpread?: number;
  radiusTween?: Tween;

  colorBase?: Vector;
  colorSpread?: Vector;
  colorTween?: Tween;

  opacityBase?: number;
  opacitySpread?: number;
  opacityTween?: Tween;

  /****************************************************************
   * Beginning of Class Functions
   ***************************************************************/

  constructor(props: ParticleSystemProps) {
    this.particles = [];
    this.setProps(props);
  }

  /**
   * Update existing particles and generate new particles
   *
   * @param {number} dt
   * @memberof ParticleSystem
   */
  update(dt: number): void {
    if (this.isDead() && this.particles.length === 0) return;

    const liveParticles: Array<Particle> = [];
    console.log('dt: ', dt, 'particles: ', this.particles);
    for (let p of this.particles) {
      if (!p.isDead()) {
        // particle still alive
        p.update(dt);
        liveParticles.push(p);
      } else {
        // kill particle
      }
    }
    this.particles = liveParticles;

    if (!this.isDead()) {
      this.genParticles(dt);
      this.lifespan -= dt;
    }
  }

  /**
   * Generate new particles according to genRate and timestep
   *
   * @param {number} dt
   * @memberof ParticleSystem
   */
  genParticles(dt: number): void {
    const numParticles = Math.round(this.genRate * dt);
    for (let i = 0; i < numParticles; i++) {
      this.particles.push(this.genParticle());
    }
  }

  /**
   * Generate a particle according to particle system properties
   *
   * @returns {Particle}
   * @memberof ParticleSystem
   */
  genParticle(): Particle {
    const {
      posStyle,
      posBase,
      posSpread,
      posRadius,

      velStyle,
      velBase,
      velSpread,
      speedBase,
      speedSpread,

      accBase,
      accSpread,

      angleBase,
      angleSpread,
      angleVelBase,
      angleVelSpread,
      angleAccBase,
      angleAccSpread,

      radiusBase,
      radiusSpread,
      radiusTween,

      colorBase,
      colorSpread,
      colorTween,

      opacityBase,
      opacitySpread,
      opacityTween,

      particleTexture,

      particleLifespan,
    } = this;

    let pos: Vector,
      vel: Vector,
      acc: Vector,
      lifespan: number,
      angle: number,
      angleVel: number,
      angleAcc: number,
      radius: number,
      color: Vector,
      opacity: number,
      texture: any;

    if (posStyle === Type.CUBE) {
      pos = this.randomVec(posBase, posSpread);
    } else if (posStyle === Type.SPHERE) {
      const z = 2 * Math.random() - 1;
      const t = 6.2832 * Math.random();
      const r = Math.sqrt(1 - z * z);
      const vec3 = new Vector(r * Math.cos(t), r * Math.sin(t), z);
      pos = Vector.add(posBase, Vector.mul(vec3, posRadius));
    }

    if (velStyle === Type.CUBE) {
      vel = this.randomVec(velBase, velSpread);
    } else if (velStyle === Type.SPHERE) {
      const direction = Vector.sub(pos, posBase);
      const speed = this.randomNum(speedBase, speedSpread);
      vel = Vector.mul(Vector.normalize(direction), speed);
    }

    acc = this.randomVec(accBase, accSpread);

    angle = this.randomNum(angleBase, angleSpread);
    angleVel = this.randomNum(angleVelBase, angleVelSpread);
    angleAcc = this.randomNum(angleAccBase, angleAccSpread);

    radius = this.randomNum(radiusBase, radiusSpread);

    color = this.randomVec(colorBase, colorSpread);
    opacity = this.randomNum(opacityBase, opacitySpread);
    texture = particleTexture;
    lifespan = particleLifespan;

    const particleProps: ParticleProps = {
      pos,
      vel,
      acc,
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
      lifespan,
    };

    const particle = new Particle(particleProps);

    return particle;
  }

  /**
   * Apply force to all particles.
   *
   * @param {Vector} force
   * @memberof ParticleSystem
   */
  applyForce(force: Vector): void {
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  /**
   * Set particle system properties
   *
   * @param {ParticleSystemProps} props
   * @memberof ParticleSystem
   */
  setProps(props: ParticleSystemProps) {
    /// Set values ///
    this.lifespan = props.lifespan;
    this.particleLifespan = props.particleLifespan;
    this.genRate = props.genRate;

    this.posStyle = props.posStyle;
    this.posBase = props.posBase;
    this.posSpread = props.posSpread || new Vector();
    this.posRadius = props.posRadius || 10;

    this.velStyle = props.velStyle;
    this.velBase = props.velBase;
    this.velSpread = props.velSpread || new Vector();
    this.speedBase = props.speedBase || 20;
    this.speedSpread = props.speedSpread || 10;

    this.accBase = props.accBase || new Vector();
    this.accSpread = props.accSpread || new Vector();

    // this.props.particleTexture =
    //   props.particleTexture || THREE.ImageUtils.loadTexture('images/star.png');
    // this.props.blendStyle = props.blendStyle || THREE.NormalBlending
    this.particleTexture = props.particleTexture;
    this.blendStyle = props.blendStyle;

    this.angleBase = props.angleBase || 0;
    this.angleSpread = props.angleSpread || 0;
    this.angleVelBase = props.angleVelBase || 0;
    this.angleVelSpread = props.angleVelSpread || 0;
    this.angleAccBase = props.angleAccBase || 0;
    this.angleAccSpread = props.angleAccSpread || 0;

    this.radiusBase = props.radiusBase || 20;
    this.radiusSpread = props.radiusSpread || 5;
    this.radiusTween = props.radiusTween || new Tween([0, 1], [1, 20]);

    // by default colors in HSL
    this.colorBase = props.colorBase || new Vector(0.0, 1.0, 0.5);
    this.colorSpread = props.colorSpread || new Vector();
    this.colorTween =
      props.colorTween ||
      new Tween([0.5, 2], [new Vector(0, 1, 0.5), new Vector(1, 1, 0.5)]);

    this.opacityBase = props.opacityBase || 1;
    this.opacitySpread = props.opacitySpread || 0;
    this.opacityTween = props.opacityTween || new Tween([2, 3], [1, 0]);
  }

  /**
   * Generate a random number between a base and spread number
   *
   * @param {number} base
   * @param {number} spread
   * @returns {number}
   * @memberof ParticleSystem
   */
  randomNum(base: number, spread: number): number {
    return base + spread * (Math.random() - 0.5);
  }

  /**
   * Generate a random vector between a base and spread vector
   *
   * @param {Vector} base
   * @param {Vector} spread
   * @returns {Vector}
   * @memberof ParticleSystem
   */
  randomVec(base: Vector, spread: Vector): Vector {
    const rand3 = new Vector(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    );
    return Vector.add(base, Vector.mulVecs(spread, rand3));
  }

  /**
   * Is the particle system still alive?
   *
   * @returns {boolean}
   * @memberof ParticleSystem
   */
  isDead(): boolean {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
