import { Center, useTexture } from "@react-three/drei";
import { useLoader, extend, Node } from "@react-three/fiber";
import React, { Suspense, useMemo } from "react";
import { RepeatWrapping } from "three";
import { FontLoader, TextGeometry } from "three-stdlib";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: Node<any, any>;
    }
  }
}

const letters = [
  {
    char: "H",
    x: 0,
    shadows: false,
  },
  {
    char: "O",
    x: 3.2,
    shadows: false,
  },
  {
    char: "W",
    x: 6.5,
    shadows: true,
  },

  {
    char: "D",
    x: 10.7,
    shadows: false,
  },

  {
    char: "Y",
    x: 13.3,
    shadows: false,
  },

  {
    char: "!",
    x: 16.8,
    shadows: false,
  },
];

const patterns = [
  { path: "/threejs/textures/pattern1.jpg", size: 0.18, offset: 0 },
  { path: "/threejs/textures/pattern2.jpg", size: 0.1, offset: 0 },
  { path: "/threejs/textures/pattern3.jpg", size: 0.15, offset: 0 },
  { path: "/threejs/textures/pattern4.jpg", size: 0.15, offset: 0 },
  { path: "/threejs/textures/pattern5.png", size: 0.5, offset: 0 },
  { path: "/threejs/textures/pattern6.png", size: 1, offset: 0 },
];

export const Howdy: React.FC = () => {
  useMemo(() => extend({ TextGeometry }), []);
  const font = useLoader(FontLoader, "/threejs/fonts/Tondu-Howdy.json");
  const textures = useTexture(patterns.map((p) => p.path));

  useMemo(() => {
    textures.forEach((t, idx) => {
      const pattern = patterns[idx];
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(pattern.size, pattern.size);
      t.offset.set(pattern.offset, pattern.offset);
    });
  }, [textures]);

  const renderedLetters = useMemo(() => {
    const config = {
      font,
      size: 3,
      height: 1,
      curveSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.25,
      bevelOffset: 0,
      bevelSegments: 1,
    };
    return (
      <Center top>
        <group>
          {letters.map((letter, i) => (
            <React.Fragment key={letter.char}>
              <mesh position={[letter.x, 0, 0]} receiveShadow={letter.shadows}>
                <textGeometry args={[letter.char, config]} />
                <meshBasicMaterial attach="material-0" map={textures[i]} />
                <meshPhongMaterial
                  attach="material-1"
                  color={0xffffff}
                  flatShading={false}
                />
              </mesh>
              <mesh position={[letter.x, 0, -0.02]}>
                <textGeometry
                  args={[
                    letter.char,
                    { ...config, bevelEnabled: false, height: 1 },
                  ]}
                />
                <meshToonMaterial
                  color={0x777777}
                  polygonOffset
                  polygonOffsetFactor={-1}
                />
              </mesh>
            </React.Fragment>
          ))}
        </group>
      </Center>
    );
  }, [font, textures]);

  return <Suspense fallback={null}>{renderedLetters}</Suspense>;
};
