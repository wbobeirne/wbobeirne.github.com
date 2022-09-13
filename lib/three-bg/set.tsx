import GUI from "lil-gui";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import type { ThreeBG } from ".";

export abstract class ThreeBGSet {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;

  active = false;
  loaded = false;

  constructor(threebg: ThreeBG) {
    this.scene = threebg.scene;
    this.renderer = threebg.renderer;
    this.camera = threebg.camera;
  }

  async load() {
    if (this.loaded) return;
    await this.loadAssets();
    this.loaded = true;
  }

  abstract loadAssets(): Promise<void>;

  configureGUI(gui: GUI) {}

  async show() {
    await this.load();
    this.active = true;
  }

  hide() {
    this.active = false;
  }

  tick(time: number) {}

  resize(width: number, height: number) {}
}
