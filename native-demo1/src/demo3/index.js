import * as THREE from 'three'

var scene = new THREE.Scene()
// 相机 正交相机（OrthographicCamera）、透视相机（PerspectiveCamera）、全景相机（CubeCamera）和3D相机（StereoCamera）。
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 600)

// 渲染器
var renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

function createPoints() {
  // 创建一个几何模型（Geometry）,并添加点
  let geometry = new THREE.BoxGeometry(10, 10, 10)

  // 点位置
  const p1 = new THREE.Vector3(0, 0, 0)
  const p2 = new THREE.Vector3(15, 15, 0)
  const p3 = new THREE.Vector3(-15, 2, 0)

  // vertices 表示顶点
  // geometry.vertices.push(p1, p2, p3)
  // 使用 PointsMaterial, 记得加上size属性，用来设置点的大小
  // https://threejs.org/docs/index.html#api/en/materials/PointsMaterial
  let material = new THREE.PointsMaterial({
    color: 0x00ff66,
    size: 4,
  })

  let points = new THREE.Points(geometry, material)
  return points
}

function createShapePoints() {
  //创建一个圆形的材质，记得一定要加上texture.needsUpdate = true;
  let canvas = document.createElement('canvas')
  canvas.width = 100
  canvas.height = 100

  let context = canvas.getContext('2d')
  context.fillStyle = '#ffff00'

  //canvas 创建圆
  // http://www.w3school.com.cn/tags/canvas_arc.asp
  context.arc(50, 50, 45, 0, 2 * Math.PI)
  context.fill()

  // 创建材质
  let texture = new THREE.Texture(canvas)
  texture.needsUpdate = true

  //创建点，是用PointsMaterial的map属性来设置材质
  let geometry = new THREE.BoxGeometry()
  // 点位置
  const p1 = new THREE.Vector3(0, 0, 0)
  const p2 = new THREE.Vector3(15, 15, 0)
  const p3 = new THREE.Vector3(-15, 2, 0)

  // vertices 表示顶点
  // geometry.applyMatrix4(p1, p2, p3)

  // 如果这边的颜色没有设置，那么就默认取canvas中的颜色
  let material = new THREE.PointsMaterial({
    color: 0xff0000,
    size: 4,
    map: texture,
  })

  let points = new THREE.Points(geometry, material)

  return points
}

// var points = createPoints();

var points = createShapePoints()

scene.add(points)
camera.position.z = 100

function render() {
  renderer.render(scene, camera)
}
render()
