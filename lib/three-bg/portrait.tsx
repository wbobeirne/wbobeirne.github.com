import {
  BoxGeometry,
  Mesh,
  MeshNormalMaterial,
  PointLight,
  Vector3,
} from "three";
import gsap from "gsap";
import { ThreeBGSet } from "./set";
import { ThreeBG } from ".";

export class PortraitSet extends ThreeBGSet {
  cube: Mesh;
  light: PointLight;

  constructor(threebg: ThreeBG) {
    super(threebg);
    this.cube = new Mesh(new BoxGeometry(0.7, 0.7, 0.7));
    this.cube.position.y = -2;
    this.light = new PointLight(0xffffff, 0.8, 8, 2);
    this.scene.add(this.cube, this.light);
  }

  async loadAssets() {
    const material = new MeshNormalMaterial();
    this.cube.material = material;
  }

  async show() {
    await super.show();
    gsap.to(this.cube.position, {
      delay: 0.3,
      y: 0,
    });
  }

  hide() {
    super.hide();
    gsap.to(this.cube.position, { y: -2 });
  }

  tick(time: number) {
    this.cube.rotation.x = time * 0.5;
    this.cube.rotation.y = time * 0.5;
  }
}
