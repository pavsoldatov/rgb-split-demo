import { sizes } from '../constants'
import { camera } from './camera'
import { updateRenderer } from './renderer'

export function resizeHandler() {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  updateRenderer()
}
