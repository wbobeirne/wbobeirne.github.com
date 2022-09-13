import { ConeGeometry, Mesh, MeshNormalMaterial, PointLight } from "three";
import gsap from "gsap";
import { ThreeBGSet } from "./set";
import { ThreeBG } from ".";

export class BlogSet extends ThreeBGSet {
  cone: Mesh;
  light: PointLight;

  constructor(threebg: ThreeBG) {
    super(threebg);
    this.cone = new Mesh(new ConeGeometry(0.5, 0.5));
    this.cone.position.y = -2;
    this.light = new PointLight(0xffffff, 0.8, 8, 2);
    this.scene.add(this.cone, this.light);
  }

  async loadAssets() {
    const material = new MeshNormalMaterial();
    this.cone.material = material;
  }

  async show() {
    await super.show();
    gsap.to(this.cone.position, { delay: 0.3, y: 0 });
  }

  hide() {
    super.hide();
    gsap.to(this.cone.position, { y: -2 });
  }

  tick(time: number) {
    this.cone.rotation.x = time * 0.5;
    this.cone.rotation.y = time * 0.5;
  }
}
