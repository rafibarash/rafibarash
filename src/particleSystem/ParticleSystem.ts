// Very heavily influenced by an existing particle engine
// https://github.com/stemkoski/stemkoski.github.com/blob/f5c7120af8488d04255b3e4492f4fb214d80b6ff/Three.js/js/ParticleEngine.js

import Particle from './Particle';
import { ParticleProps, ParticleSystemProps, Type } from './types';
import { Vector, getRandomInt } from '../math';
import Tween from './Tween';

export default abstract class ParticleSystem {
  props: ParticleSystemProps; // Internal particle system properties
  particles: Array<Particle>;

  constructor(props: ParticleSystemProps) {
    this.props = props;
    this.particles = [];
  }

  /**
   * Update existing particles and generate new particles
   *
   * @param {number} dt
   * @memberof ParticleSystem
   */
  update(dt: number): void {
    const liveParticles = new Array<Particle>();
    for (let p of this.particles) {
      if (!p.isDead()) {
        // particle still alive
        p.update(dt);
        liveParticles.push(p);
      }
    }
    this.particles = liveParticles;
    this.genParticles(dt);
    this.props.lifespan -= dt;
  }

  /**
   * Generate new particles according to genRate and timestep
   *
   * @param {number} dt
   * @memberof ParticleSystem
   */
  genParticles(dt: number): void {
    const numParticles = Math.round(this.props.genRate * dt);
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
    const particle = new Particle();

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

      particleLifespan,
    } = this.props;

    let particleProps: ParticleProps; // Particle attributes We are setting

    if (posStyle === Type.CUBE) {
      particleProps.pos = this.randomVec(posBase, posSpread);
    } else if (posStyle === Type.SPHERE) {
      const z = 2 * Math.random() - 1;
      const t = 6.2832 * Math.random();
      const r = Math.sqrt(1 - z * z);
      const vec3 = new Vector(r * Math.cos(t), r * Math.sin(t), z);
      particleProps.pos = Vector.add(posBase, Vector.mul(vec3, posRadius));
    }

    if (velStyle === Type.CUBE) {
      particleProps.vel = this.randomVec(velBase, velSpread);
    } else if (velStyle === Type.SPHERE) {
      const direction = Vector.sub(particleProps.pos, posBase);
      const speed = this.randomNum(speedBase, speedSpread);
      particleProps.vel = Vector.mul(Vector.normalize(direction), speed);
    }

    particleProps.acc = this.randomVec(accBase, accSpread);

    particleProps.angle = this.randomNum(angleBase, angleSpread);
    particleProps.angleVel = this.randomNum(angleVelBase, angleVelSpread);
    particleProps.angleAcc = this.randomNum(angleAccBase, angleAccSpread);

    particleProps.radius = this.randomNum(radiusBase, radiusSpread);

    particleProps.color = this.randomVec(colorBase, colorSpread);
    particleProps.opacity = this.randomNum(opacityBase, opacitySpread);
    particleProps.lifespan = particleLifespan;

    particle.setProps(particleProps);

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
    this.props = props;

    // Initialize tweens
    this.props.radiusTween = props.radiusTween || new Tween();
    this.props.colorTween = props.colorTween || new Tween();
    this.props.opacityTween = props.opacityTween || new Tween();
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
    if (this.props.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
