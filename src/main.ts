import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import './style.css'

let scrollable = document.querySelector('.scrollable') as HTMLElement

let current = 0
let target = 0
let ease = 0.075

// Linear interpolation for smooth scrolling and image offset uniform adjustment
function lerp(start: number, end: number, progress: number) {
  return start * (1 - progress) + end * progress
}

// triggered on page load to set the body height to enable scrolling and Demo initialized
function init() {
  document.body.style.height = `${scrollable?.getBoundingClientRect().height}px`
}

// translate the scrollable div using linear interpolation for the smooth scrolling effect.
function smoothScroll() {
  target = window.scrollY
  current = lerp(current, target, ease)
  scrollable.style.transform = `translate3d(0,${-current}px, 0)`
}

class Demo {
  mainElement: HTMLElement
  images: HTMLImageElement[]
  meshes: MeshItem[]
  scene!: THREE.Scene
  camera!: THREE.PerspectiveCamera
  renderer!: THREE.WebGLRenderer

  constructor() {
    this.mainElement = document.querySelector('main') as HTMLElement
    this.images = Array.from(document.querySelectorAll('img'))
    this.meshes = []

    window.addEventListener('load', () => {
      this.setupCamera()
      this.onWindowResize()
      this.createMeshes()
      this.render()
    })
  }

  // get screen dimensions used for the camera and meshes
  get viewport() {
    let width = window.innerWidth
    let height = window.innerHeight
    let aspectRatio = width / height
    return {
      width,
      height,
      aspectRatio,
    }
  }

  setupCamera() {
    window.addEventListener('resize', this.onWindowResize.bind(this), false)
    this.scene = new THREE.Scene()

    let perspective = 1000
    const fov =
      (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI
    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.viewport.aspectRatio,
      1,
      1000,
    )

    this.camera.position.set(0, 0, perspective) // set position on the z axis.

    // Renderer (WebGL1Renderer) fallback for older devices
    // this.renderer = new THREE.WebGL1Renderer({ antialias: true, alpha: true });

    // renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    // this.renderer.setSize(this.viewport.width, this.viewport.height);
    this.renderer.setPixelRatio(window.devicePixelRatio) // ensure image textures do not appear blurred.
    this.mainElement.appendChild(this.renderer.domElement)
  }

  onWindowResize() {
    init()
    this.camera.aspect = this.viewport.aspectRatio // readjust the aspect ratio.
    this.camera.updateProjectionMatrix() // resize to screen dimensions based on aspect.
    this.renderer.setSize(this.viewport.width, this.viewport.height)
  }

  createMeshes() {
    // Loop over images and create new MeshItem instances, push them to the array of Meshes.
    // this.images.forEach((image) => this.meshes.push(new MeshItem(image, this.scene)))
    this.images.forEach(image => {
      let meshItem = new MeshItem(image, this.scene)
      this.meshes.push(meshItem)
    })
  }

  // Animate smooth scroll and meshes.
  render() {
    smoothScroll()
    for (let i = 0; i < this.meshes.length; i++) {
      this.meshes[i].render()
    }
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }
}

class MeshItem {
  element: HTMLImageElement
  scene: THREE.Scene
  offset: THREE.Vector2
  sizes: THREE.Vector2
  geometry!: THREE.PlaneGeometry
  imageTexture!: THREE.Texture
  uniforms!: {
    uTexture: { value: THREE.Texture }
    uOffset: { value: THREE.Vector2 }
    uAlpha: { value: number }
  }
  material!: THREE.ShaderMaterial
  mesh!: THREE.Mesh

  // Pass in the scene as we will be adding meshes to this scene.
  constructor(element: HTMLImageElement, scene: THREE.Scene) {
    this.element = element
    this.scene = scene
    this.offset = new THREE.Vector2(0, 0) // Positions of mesh on screen. Will be updated below.
    this.sizes = new THREE.Vector2(0, 0) // Size of mesh on screen. Will be updated below.
    this.createMesh()
  }

  getDimensions() {
    const { width, height, top, left } = this.element.getBoundingClientRect()
    this.sizes.set(width, height)
    this.offset.set(
      left - window.innerWidth / 2 + width / 2,
      -top + window.innerHeight / 2 - height / 2,
    )
  }

  createMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 100, 100)
    this.imageTexture = new THREE.TextureLoader().load(this.element.src)

    this.uniforms = {
      uTexture: {
        //texture data
        value: this.imageTexture,
      },
      uOffset: {
        //distortion strength
        value: new THREE.Vector2(0.0, 0.0),
      },
      uAlpha: {
        //opacity
        value: 1,
      },
    }

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.getDimensions()

    // set offset and sizes for positioning on the scene
    this.mesh.position.set(this.offset.x, this.offset.y, 0)
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)

    this.scene.add(this.mesh)
  }

  render() {
    // repeatedly called for each instance of the above
    this.getDimensions()
    this.mesh.position.set(this.offset.x, this.offset.y, 0)
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)
    this.uniforms.uOffset.value.set(
      this.offset.x * 0.0,
      -(target - current) * 0.0003,
    )
  }
}

init()
new Demo()
