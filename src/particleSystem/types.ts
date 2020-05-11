import { Vector } from '../math';
import Tween from './Tween';

export interface ParticleSystemProps {
  lifespan: number;
  particleLifespan: number;
  genRate: number;
  isCollidable?: boolean;

  posStyle: ShapeType;
  posBase: Vector;
  posSpread?: Vector;
  posRadius?: number; // distance from base at which particles start

  velStyle: ShapeType;
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
}

export interface ParticleProps {
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
  texture?: any;
  isCollidable?: boolean;
}

export enum ShapeType {
  CUBE,
  SPHERE,
}
