/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/balloon.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Hot_Air_Balloon.geometry} material={materials['Material.001']} position={[0, 0.58, 0]} scale={[0.26, 0.2, 0.26]} />
    </group>
  )
}

useGLTF.preload('/balloon.glb')
