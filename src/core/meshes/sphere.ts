import { Mesh, ShaderMaterial, SphereGeometry, Vector2 } from 'three'

import vertexShader from '/@/shaders/vertex.glsl'
import fragmentShader from '/@/shaders/fragment.glsl'

export const sphereMaterial = new ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uFrequency: { value: new Vector2(20, 15) },
  },
  vertexShader,
  fragmentShader,
})

export const sphere = new Mesh(new SphereGeometry(1, 32, 32), sphereMaterial)

sphere.position.set(0, 2, 0)
sphere.castShadow = true
