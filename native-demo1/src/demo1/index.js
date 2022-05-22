console.log('demo1')
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  10
)
camera.position.z = 1

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
const material = new THREE.MeshNormalMaterial()

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

renderer.setAnimationLoop(animation)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.minZoom = 100
controls.zoomSpeed = 0.2
controls.rotateSpeed = 0.5
controls.minZoom = 100
// https://threejs.org/docs/index.html#examples/zh/controls/OrbitControls

controls.minDistance = 0.5
controls.maxDistance = 2
// controls.autoRotate()

// animation

function animation(time) {
  // mesh.rotation.x = time / 2000
  // mesh.rotation.y = time / 1000
  controls.update()
  renderer.render(scene, camera)
}
