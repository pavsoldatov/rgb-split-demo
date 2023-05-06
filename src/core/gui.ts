import { BladeApi, Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { BladeController, View } from '@tweakpane/core'
import { AxesHelper } from 'three'

import { directionalLight } from './lights/lights'

interface FPSGraph extends BladeApi<BladeController<View>> {
  begin(): void
  end(): void
}
// Debug
export const gui = new Pane()
gui.registerPlugin(EssentialsPlugin)

export const fpsGraph = gui.addBlade({
  view: 'fpsgraph',
  label: 'fpsgraph',
}) as FPSGraph


const DirectionalLightFolder = gui.addFolder({
  title: 'Directional Light',
})

Object.keys(directionalLight.position).forEach(key => {
  DirectionalLightFolder.addInput(
    directionalLight.position,
    key as keyof THREE.Vector3,
    {
      min: -100,
      max: 100,
      step: 1,
    },
  )
})

// Axes Helper
export const axesHelper = new AxesHelper()

gui.addInput(axesHelper, 'visible', {
  label: 'AxesHelper',
})