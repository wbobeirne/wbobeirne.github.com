import { Mesh, MeshNormalMaterial, PointLight, TorusKnotGeometry } from "three";
import gsap from "gsap";
import { ThreeBGSet } from "./set";
import { ThreeBG } from ".";

export class WorkSet extends ThreeBGSet {
  knot: Mesh;
  light: PointLight;

  constructor(threebg: ThreeBG) {
    super(threebg);
    this.knot = new Mesh(new TorusKnotGeometry(0.3, 0.05, undefined, 20, 20));
    this.knot.position.y = -2;
    this.light = new PointLight(0xffffff, 0.8, 8, 2);
    this.scene.add(this.knot, this.light);
  }

  async loadAssets() {
    const material = new MeshNormalMaterial();
    this.knot.material = material;
  }

  async show() {
    await super.show();
    gsap.to(this.knot.position, { delay: 0.3, y: 0 });
  }

  hide() {
    super.hide();
    gsap.to(this.knot.position, { y: -2 });
  }

  tick(time: number) {
    this.knot.rotation.x = time * 0.5;
    this.knot.rotation.y = time * 0.5;
  }
}
