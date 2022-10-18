import { Center, useTexture } from "@react-three/drei";
import { useLoader, extend, Node } from "@react-three/fiber";
import React, { Suspense, useMemo } from "react";
import { RepeatWrapping } from "three";
import { FontLoader, TextGeometry } from "three-stdlib";
import { useTheme } from "../../contexts/theme";
import { hexInt } from "../../util/color";

import pattern1 from "../../public/threejs/textures/pattern1.jpg";
import pattern2 from "../../public/threejs/textures/pattern2.jpg";
import pattern3 from "../../public/threejs/textures/pattern3.jpg";
import pattern4 from "../../public/threejs/textures/pattern4.jpg";
import pattern5 from "../../public/threejs/textures/pattern5.jpg";
import pattern6 from "../../public/threejs/textures/pattern6.jpg";
import { optimizedTexturePath } from "../../util/image";

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
  { path: optimizedTexturePath(pattern1), size: 0.3, offset: 0 },
  { path: optimizedTexturePath(pattern2), size: 0.25, offset: 0 },
  { path: optimizedTexturePath(pattern3), size: 0.27, offset: 0 },
  { path: optimizedTexturePath(pattern4), size: 0.3, offset: 0.05 },
  { path: optimizedTexturePath(pattern5), size: 0.28, offset: 0 },
  { path: optimizedTexturePath(pattern6), size: 0.3, offset: 0 },
];

export const Howdy: React.FC = () => {
  useMemo(() => extend({ TextGeometry }), []);
  const font = useLoader(FontLoader, "/threejs/fonts/Tondu-Howdy.json");
  const textures = useTexture(patterns.map((p) => p.path));
  const theme = useTheme();

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
    if (!theme.palette) return null;
    const borderColorHex = hexInt(theme.palette.letterBorder);
    const backColorHex = hexInt(theme.palette.letterBack);
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
              <mesh position={[letter.x, 0, 0]} receiveShadow>
                <textGeometry args={[letter.char, config]} />
                <meshStandardMaterial attach="material-0" map={textures[i]} />
                <meshPhongMaterial attach="material-1" color={borderColorHex} />
              </mesh>
              <mesh position={[letter.x, 0, -0.02]}>
                <textGeometry
                  args={[
                    letter.char,
                    { ...config, bevelEnabled: false, height: 1 },
                  ]}
                />
                <meshToonMaterial
                  color={backColorHex}
                  polygonOffset
                  polygonOffsetFactor={-1}
                />
              </mesh>
            </React.Fragment>
          ))}
        </group>
      </Center>
    );
  }, [font, textures, theme.palette]);

  return <Suspense fallback={null}>{renderedLetters}</Suspense>;
};
