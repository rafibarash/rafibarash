import { Vector } from '../math';
import Tween from './Tween';

export interface ParticleSystemProps {
  origin: Vector;
  lifespan: number;
  genRate: number;

  posStyle: Type;
  posBase: Vector;
  posSpread: Vector;
  posRadius: number; // distance from base at which particles start

  velStyle: Type;
  velBase: Vector;
  velSpread: Vector;
  speedBase: number;
  speedSpread: number;

  accBase: Vector;
  accSpread: Vector;

  angleBase: number;
  angleSpread: number;
  angleVelBase: number;
  angleVelSpread: number;
  angleAccBase: number;
  angleAccSpread: number;

  radiusBase: number;
  radiusSpread: number;
  radiusTween: Tween;

  // store colors in HSL format in a THREE.Vector3 object
  // http://en.wikipedia.org/wiki/HSL_and_HSV
  // JK lets store colors in RGB
  colorBase: Vector;
  colorSpread: Vector;
  colorTween: Tween;

  opacityBase: number;
  opacitySpread: number;
  opacityTween: Tween;

  particleLifespan: number;

  // blendStyle: THREE.NormalBlending;
}

export interface ParticleProps {
  pos: Vector;
  vel: Vector;
  acc: Vector;
  angle: number;
  angleVel: number;
  angleAcc: number;
  radius: number;
  color: Vector;
  opacity: number;
  lifespan: number;
}

export enum Type {
  CUBE,
  SPHERE,
}
