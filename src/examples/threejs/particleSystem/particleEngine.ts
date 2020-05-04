// Heavily based off existing Particle Engine
// https://github.com/stemkoski/stemkoski.github.com/blob/f5c7120af8488d04255b3e4492f4fb214d80b6ff/Three.js/js/ParticleEngineExamples.js

import '../index.css';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import AbstractApp from '../AbstractApp';
import Examples from './particleEngineExamples';
import ThreeParticleSystem from './ThreeParticleSystem';

class App extends AbstractApp {
  particleSystem: ThreeParticleSystem;

  init() {
    this.defaultInit();
    this.createParticleSystem();
  }

  update(dt: number) {
    this.particleSystem.update(dt * 0.001);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  private createParticleSystem() {
    this.particleSystem = new ThreeParticleSystem(
      Examples.starfield,
      this.scene
    );
  }
}

if (WEBGL.isWebGLAvailable()) {
  // Initiate app here
  const app = new App();
  app.run();
} else {
  const warning = WEBGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);
}
