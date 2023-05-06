import { PerspectiveCamera } from 'three'
import { sizes } from '../constants'

export const camera = new PerspectiveCamera(45, sizes.width / sizes.height)

camera.position.set(9, 4, 9)