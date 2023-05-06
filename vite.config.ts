import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import { resolve } from 'pathe'

export default defineConfig({
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
      three: resolve(__dirname, './node_modules/three')
    },
  },
  plugins: [glsl()],
})
