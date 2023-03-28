console.log('demo2')
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
camera.position.z = 1

const geometry1 = new THREE.BoxGeometry(0.2, 0.2, 0.2)

var material1 = new THREE.MeshNormalMaterial()
var mesh1 = new THREE.Mesh(geometry1, material1)
// cube1.position.set(10, 0, 0)
// mesh1.rotation.x = 1
// mesh1.rotation.y = 1
scene.add(mesh1)

// var geometry2 = new THREE.BoxGeometry(4, 4, 4)
// var material2 = new THREE.MeshNormalMaterial()
// var cube2 = new THREE.Mesh(geometry2, material2)
// scene.add(cube2)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

renderer.setAnimationLoop(animation)
document.body.appendChild(renderer.domElement)

// renderer.render(scene, camera)
// RenderPass这个通道会渲染场景，但不会将渲染结果输出到屏幕上
const renderScene = new RenderPass(scene, camera)
// THREE.OutlinePass(resolution, scene, camera, selectedObjects)
// resolution 分辨率
// scene 场景
// camera 相机
// selectedObjects 需要选中的物体对象, 传入需要边界线进行高亮处理的对象
const outlinePass = new OutlinePass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  scene,
  camera,
  [mesh1]
)
console.log(outlinePass)
// outlinePass.renderToScreen = true
outlinePass.edgeStrength = 3 //粗
outlinePass.edgeGlow = 4 //发光
outlinePass.edgeThickness = 2 //光晕粗
outlinePass.pulsePeriod = 2 //闪烁
outlinePass.usePatternTexture = false //是否使用贴图
outlinePass.visibleEdgeColor.set('yellow') // 设置显示的颜色
outlinePass.hiddenEdgeColor.set('white') // 设置隐藏的颜色

//创建效果组合器对象，可以在该对象上添加后期处理通道，通过配置该对象，使它可以渲染我们的场景，并应用额外的后期处理步骤，在render循环中，使用EffectComposer渲染场景、应用通道，并输出结果。
const bloomComposer = new EffectComposer(renderer)
// bloomComposer.setSize(1, 1)
bloomComposer.addPass(renderScene)
// 眩光通道bloomPass插入到composer
bloomComposer.addPass(outlinePass)

const controls = new OrbitControls(camera, renderer.domElement)

function animation(time) {
  // mesh1.rotation.x = time / 2000
  mesh1.rotation.y = time / 1000
  renderer.render(scene, camera)
  controls.update()
  // bloomComposer.render(scene, camera)
}

// renderer.render(scene, camera)
// controls.update()
// bloomComposer.render()
