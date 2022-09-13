import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { GUI } from "lil-gui";
import { ThreeBGSet } from "./set";
import { HowdySet } from "./howdy";
import { PortraitSet } from "./portrait";
import { WorkSet } from "./work";
import { BlogSet } from "./blog";

export class ThreeBG {
  canvas: HTMLCanvasElement;
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  clock: Clock;
  gui: GUI;
  sets: ThreeBGSet[];

  width: number = 0;
  height: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new Scene();
    this.clock = new Clock();
    this.gui = new GUI();
    this.gui.hide();

    this.renderer = new WebGLRenderer({ canvas, alpha: true });
    this.renderer.setClearColor(0x000000, 0);

    this.camera = new PerspectiveCamera(45);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 2;
    this.scene.add(this.camera);

    this.sets = [
      new HowdySet(this),
      new PortraitSet(this),
      new WorkSet(this),
      new BlogSet(this),
    ];

    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    this.configureGUI();
    this.tick();
  }

  updatePathname(pathname: string) {
    let idx = 0;
    if (pathname.startsWith("/bio")) {
      idx = 1;
    } else if (pathname.startsWith("/work")) {
      idx = 2;
    } else if (pathname.startsWith("/blog")) {
      idx = 3;
    }
    this.sets.forEach((set, setIdx) => {
      if (setIdx === idx) {
        set.show();
      } else {
        set.hide();
      }
    });
  }

  tick = () => {
    const elapsedTime = this.clock.getElapsedTime();
    this.sets.forEach((set) => set.tick(elapsedTime));
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.tick);
  };

  handleResize = () => {
    // Update sizes
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Update camera
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Update sets
    this.sets.forEach((set) => set.resize(this.width, this.height));
  };

  configureGUI() {
    this.sets.forEach((set) => set.configureGUI(this.gui));
  }
}
