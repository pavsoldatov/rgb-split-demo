import { Clock } from 'three'
import {
  renderer,
  camera,
  scene,
  controls,
  resizeHandler,
  fpsGraph,
} from './core'
import { sphereMaterial } from './core/meshes'

import './style.css'

window.addEventListener('resize', resizeHandler)

const clock = new Clock()

const loop = () => {
  const elapsedTime = clock.getElapsedTime()

  sphereMaterial.uniforms.uTime.value = elapsedTime

  fpsGraph.begin()

  controls.update()
  renderer.render(scene, camera)

  fpsGraph.end()

  requestAnimationFrame(loop)
}

loop()
