import { Color, Scene } from 'three'
import { ambientLight, directionalLight } from './lights/lights'
import { sphere, plane } from './meshes'
import { camera } from './camera'
import { axesHelper } from './gui'

export const scene = new Scene()

scene.background = new Color('#333')

scene.add(ambientLight, directionalLight)
scene.add(sphere)
scene.add(plane)
scene.add(camera)
scene.add(axesHelper)
