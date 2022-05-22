console.log('demo2')
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  10
)
camera.position.z = 1

var geometry1 = new THREE.BoxGeometry(4, 4, 4)
var material1 = new THREE.MeshBasicMaterial({})
var cube1 = new THREE.Mesh(geometry1, material1)
cube1.position.set(10, 0, 0)
scene.add(cube1)

var geometry2 = new THREE.BoxGeometry(4, 4, 4)
var material2 = new THREE.MeshBasicMaterial({})
var cube2 = new THREE.Mesh(geometry2, material2)
scene.add(cube2)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

// renderer.setAnimationLoop(animation)
document.body.appendChild(renderer.domElement)

// renderer.render(scene, camera)
