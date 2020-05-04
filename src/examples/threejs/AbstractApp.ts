import * as THREE from 'three';
import Camera from './Camera';

export default abstract class AbstractApp {
  scene: THREE.Scene;
  renderer;
  camera: Camera;

  // Initializes and runs the app
  run() {
    // Initialize app
    this.init();

    // Run game loop
    this.renderer.setAnimationLoop(this.animate);
  }

  animate = (dt: number) => {
    this.update(dt);
    this.render();
  };

  abstract init(): void;

  abstract update(dt: number): void;

  abstract render(): void;

  protected defaultInit() {
    this.createScene(); // must be first
    this.createRenderer();
    this.createCamera();
    this.createLights();
    this.createFloor();
    this.createCube();
    this.addEventListeners();
  }

  protected createScene() {
    this.scene = new THREE.Scene();
  }

  // Initialize renderer
  protected createRenderer = () => {
    const canvas: HTMLCanvasElement = document.querySelector('#container');
    this.renderer = new THREE.WebGLRenderer({ canvas });
  };

  // Initialize camera
  protected createCamera = () => {
    this.camera = new Camera();
    this.scene.add(this.camera);
    // this.camera.position.z = 5;
    this.camera.position.set(0, 200, 400);
    this.camera.lookAt(this.scene.position);
  };

  // Initalize lights
  protected createLights = () => {
    const light = new THREE.PointLight(0xffffff);
    light.position.set(0, 250, 0);
    this.scene.add(light);
  };

  // Create a floor
  protected createFloor() {
    const floorTexture = new THREE.TextureLoader().load(
      '../images/checkerboard.jpg'
    );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);
    const floorMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      map: floorTexture,
      side: THREE.DoubleSide,
    });
    const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -10.5;
    floor.rotation.x = Math.PI / 2;
    this.scene.add(floor);
  }

  protected createCube() {
    // Geometry
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // Material
    const material = new THREE.MeshBasicMaterial({
      color: 0x44aa88, // greenish blue
    });

    // Mesh
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  }

  // Add event listeners
  protected addEventListeners = () => {
    // Event listener for window resize
    window.addEventListener('resize', this.onWindowResize, false);
    this.onWindowResize();
  };

  // Helper function to align renderer and canvas size
  protected onWindowResize = () => {
    if (this.renderer && this.camera) {
      const canvas = this.renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      this.camera.setAspect(canvas.clientWidth / canvas.clientHeight);
      this.renderer.setSize(width, height, false);
    }
  };
}
