import { WebGLRenderer, PCFShadowMap, ACESFilmicToneMapping } from 'three'
import { sizes } from '../constants'

const canvas = document.querySelector('canvas.webgl') as HTMLElement

// Renderer
export const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
})

// More realistic shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFShadowMap
renderer.useLegacyLights = false
renderer.toneMapping = ACESFilmicToneMapping
renderer.toneMappingExposure = 1

export function updateRenderer() {
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // To avoid performance problems on devices with higher pixel ratio
}

updateRenderer()