import {
  Box3,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  RepeatWrapping,
  TextureLoader,
  Vector3,
} from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import gsap from "gsap";
import GUI from "lil-gui";
import { ThreeBGSet } from "./set";
import { ThreeBG } from ".";

const fontParameters = {
  size: 0.1,
  height: 0.05,
  curveSegments: 12,
  bevelEnabled: true,
  bevelThickness: 0.0001,
  bevelSize: 0.01,
  bevelOffset: 0.001,
  bevelSegments: 4,
};

export class HowdySet extends ThreeBGSet {
  howdy: Group;
  person: Group;
  letters: Mesh<TextGeometry>[];

  constructor(threebg: ThreeBG) {
    super(threebg);
    this.howdy = new Group();
    this.howdy.scale.set(4, 4, 4);
    this.howdy.rotation.y = -Math.PI * 0.1;
    this.howdy.rotation.x = Math.PI * 0.03;
    this.person = new Group();
    this.letters = [];
  }

  async loadAssets() {
    // Load fonts & textures
    const fontLoader = new FontLoader();
    const textureLoader = new TextureLoader();
    const gltfLoader = new GLTFLoader();

    const [
      font,
      pattern1,
      pattern2,
      pattern3,
      pattern4,
      pattern5,
      pattern6,
      abel,
    ] = await Promise.all([
      fontLoader.loadAsync("/threejs/fonts/Tondu-Howdy.json"),
      textureLoader.loadAsync("/threejs/textures/pattern1.jpg"),
      textureLoader.loadAsync("/threejs/textures/pattern2.jpg"),
      textureLoader.loadAsync("/threejs/textures/pattern3.jpg"),
      textureLoader.loadAsync("/threejs/textures/pattern4.jpg"),
      textureLoader.loadAsync("/threejs/textures/pattern5.png"),
      textureLoader.loadAsync("/threejs/textures/pattern6.png"),
      gltfLoader.loadAsync("/threejs/models/abel.gltf"),
    ]);
    [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6].forEach(
      (pattern) => {
        pattern.wrapS = RepeatWrapping;
        pattern.wrapT = RepeatWrapping;
      }
    );
    pattern1.repeat.set(6, 6);
    pattern2.repeat.set(10, 10);
    pattern3.repeat.set(4, 4);
    pattern4.repeat.set(8, 8);
    pattern5.repeat.set(6, 6);
    pattern6.repeat.set(8, 8);

    const text = "HOWDY!";
    const spacing = [0, 0.11, 0.22, 0.36, 0.45, 0.57];
    const textures = [
      pattern1,
      pattern4,
      pattern3,
      pattern5,
      pattern2,
      pattern6,
    ];

    // Letters
    const letters = Array.from(text);
    const fontParams = { font, ...fontParameters };
    letters.forEach((letter, i) => {
      const textGeo = new TextGeometry(letter, fontParams);
      const textMat = [
        new MeshBasicMaterial({ map: textures[i] }),
        new MeshPhongMaterial({ color: 0xffffff }),
      ];
      const textMesh = new Mesh(textGeo, textMat);
      textMesh.castShadow = true;
      textMesh.receiveShadow = true;
      textMesh.position.x = spacing[i];
      textMesh.position.y = 0;
      textMesh.position.z = 0;
      this.letters.push(textMesh);
    });
    this.howdy.add(...this.letters);
    new Box3()
      .setFromObject(this.howdy)
      .getCenter(this.howdy.position)
      .multiplyScalar(-1);
    this.howdy.position.x = this.howdy.position.x * 1.18;
    this.scene.add(this.howdy);

    // Person
    this.person = abel.scene;
    this.person.position.set(0, 0.6, 0);
    this.person.scale.set(0.03, 0.03, 0.03);
    this.scene.add(this.person);
    const box = new Box3();
    box.setFromObject(this.person);
    console.log(this.person);
    console.log(this.person.position);
    console.log(box.getSize(new Vector3()));
  }

  configureGUI(gui: GUI) {
    const folder = gui.addFolder("Howdy");
    const onChangeFontParam = (event: any) => {
      this.letters.forEach((letter) => {
        (letter.geometry.parameters as any)[event.property] = event.value;
        letter.updateMatrix();
      });
    };
    folder.add(fontParameters, "size", 0, 1).onChange(onChangeFontParam);
    folder.add(fontParameters, "height", 0, 1).onChange(onChangeFontParam);
    folder.add(fontParameters, "bevelEnabled").onChange(onChangeFontParam);
    folder
      .add(fontParameters, "bevelThickness", 0, 0.1)
      .onChange(onChangeFontParam);
    folder.add(fontParameters, "bevelSize", 0, 0.1).onChange(onChangeFontParam);
    folder
      .add(fontParameters, "bevelOffset", 0, 0.1)
      .onChange(onChangeFontParam);
  }

  async show() {
    await super.show();
    gsap.to(this.howdy.position, { delay: 0.3, y: -0.15 });
  }

  hide() {
    super.hide();
    gsap.to(this.howdy.position, { y: -2 });
  }

  tick(time: number) {
    if (!this.active) return;
    this.letters.forEach((letter, i) => {
      letter.position.y = Math.cos(time + i * 0.9) * 0.01;
    });
  }
}
