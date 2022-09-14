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
  },
  {
    char: "O",
    x: 3.2,
  },
  {
    char: "W",
    x: 6.5,
  },

  {
    char: "D",
    x: 10.7,
  },

  {
    char: "Y",
    x: 13.3,
  },

  {
    char: "!",
    x: 16.8,
  },
];

export const Howdy: React.FC = () => {
  useMemo(() => extend({ TextGeometry }), []);
  const font = useLoader(FontLoader, "/threejs/fonts/Tondu-Howdy.json");
  const patterns = useTexture([
    "/threejs/textures/pattern1.jpg",
    "/threejs/textures/pattern2.jpg",
    "/threejs/textures/pattern3.jpg",
    "/threejs/textures/pattern4.jpg",
    "/threejs/textures/pattern5.png",
    "/threejs/textures/pattern6.png",
  ]);

  useMemo(() => {
    patterns.forEach((pattern) => {
      pattern.wrapS = RepeatWrapping;
      pattern.wrapT = RepeatWrapping;
      pattern.repeat.set(0.1, 0.1);
    });
  }, [patterns]);

  const renderedLetters = useMemo(() => {
    const config = {
      font,
      size: 3,
      height: 1,
      curveSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.25,
      bevelOffset: 0,
      bevelSegments: 4,
    };
    return (
      <Center top>
        <group>
          {letters.map((letter, i) => (
            <mesh key={letter.char} position={[letter.x, 0, 0]}>
              <textGeometry args={[letter.char, config]} />
              <meshBasicMaterial attach="material-0" map={patterns[i]} />
              <meshPhongMaterial attach="material-1" color={0xffffff} />
            </mesh>
          ))}
        </group>
      </Center>
    );
  }, [font, patterns]);

  return <Suspense fallback={null}>{renderedLetters}</Suspense>;
};
