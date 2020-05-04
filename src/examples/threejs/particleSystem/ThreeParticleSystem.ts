import { ParticleSystemProps } from './../../../particleSystem/types';
import * as THREE from 'three';
import ParticleSystem from '../../../particleSystem/ParticleSystem';
import Particle from '../../../particleSystem/Particle';

/////////////
// SHADERS //
/////////////

// attribute: data that may be different for each particle (such as size and color);
//      can only be used in vertex shader
// varying: used to communicate data from vertex shader to fragment shader
// uniform: data that is the same for each particle (such as texture)

const particleVertexShader = [
  'attribute vec3  customColor;',
  'attribute float customOpacity;',
  'attribute float customSize;',
  'attribute float customAngle;',
  'attribute float customVisible;', // float used as boolean (0 = false, 1 = true)
  'varying vec4  vColor;',
  'varying float vAngle;',
  'void main()',
  '{',
  'if ( customVisible > 0.5 )', // true
  'vColor = vec4( customColor, customOpacity );', //     set color associated to vertex; use later in fragment shader.
  'else', // false
  'vColor = vec4(0.0, 0.0, 0.0, 0.0);', //     make particle invisible.

  'vAngle = customAngle;',

  'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
  'gl_PointSize = customSize * ( 300.0 / length( mvPosition.xyz ) );', // scale particles as objects in 3D space
  'gl_Position = projectionMatrix * mvPosition;',
  '}',
].join('\n');

const particleFragmentShader = [
  'uniform sampler2D texture;',
  'varying vec4 vColor;',
  'varying float vAngle;',
  'void main()',
  '{',
  'gl_FragColor = vColor;',

  'float c = cos(vAngle);',
  'float s = sin(vAngle);',
  'vec2 rotatedUV = vec2(c * (gl_PointCoord.x - 0.5) + s * (gl_PointCoord.y - 0.5) + 0.5,',
  'c * (gl_PointCoord.y - 0.5) - s * (gl_PointCoord.x - 0.5) + 0.5);', // rotate UV coordinates to rotate texture
  'vec4 rotatedTexture = texture2D( texture,  rotatedUV );',
  'gl_FragColor = gl_FragColor * rotatedTexture;', // sets an otherwise white particle texture to desired color
  '}',
].join('\n');

export default class ThreeParticleSystem extends ParticleSystem {
  scene: THREE.Scene;
  particleGeometry: THREE.Geometry;
  particleTexture: any;
  particleMaterial: THREE.PointsMaterial;
  particleMesh: THREE.Points;

  constructor(props: ParticleSystemProps, scene: THREE.Scene) {
    super(props);

    this.scene = scene;

    this.initThree();
  }

  update(dt: number) {
    // if (this.isDead() && this.particles.length === 0) return;
    // const liveParticles: Array<Particle> = [];
    // // update particle data
    // for (let i = 0; i < this.particles.length; i++) {
    //   let p = this.particles[i];
    //   if (!p.isDead()) {
    //     // particle still alive
    //     p.update(dt);
    //     liveParticles.push(p);
    //   } else {
    //     // kill particle
    //   }
    // }
    // this.particles = liveParticles;
    // if (!this.isDead()) {
    //   this.genParticles(dt);
    //   this.lifespan -= dt;
    // }
    // console.log('updating...');
    // this.particleMesh.geometry.vertices.forEach((particle) => {
    //   particle.z += 0.3;
    //   if (particle.z > 40) {
    //     particle.z = -10;
    //   }
    // });
    // this.particleMesh.geometry.verticesNeedUpdate = true;
  }

  kill() {
    this.scene.remove(this.particleMesh);
    console.log('removing particle mesh from scene');
  }

  private initThree() {
    this.particleGeometry = new THREE.Geometry();
    this.particleTexture = null;
    this.particleMaterial = new THREE.PointsMaterial({
      color: 'rgb(255, 255, 255)',
      size: 0.3,
      map: new THREE.TextureLoader().load('../images/star.png'),
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    let particleCount = 5800;
    let particleDistance = 53;
    for (var i = 0; i < particleCount; i++) {
      let posX = (Math.random() - 0.5) * particleDistance;
      let posY = (Math.random() - 0.5) * particleDistance;
      let posZ = (Math.random() - 0.5) * particleDistance;
      let particle = new THREE.Vector3(posX, posY, posZ);
      this.particleGeometry.vertices.push(particle);
    }

    this.particleMesh = new THREE.Points(
      this.particleGeometry,
      this.particleMaterial
    );
    // this.particleMesh.dynamic = true;
    // this.particleMesh.sortParticles = true;
    this.scene.add(this.particleMesh);
  }
}
