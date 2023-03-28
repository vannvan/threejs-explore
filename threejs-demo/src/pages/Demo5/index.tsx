import { useEffect } from 'react'
import * as THREE from 'three'
import './index.css'

let scene: THREE.Scene
let camera: THREE.Camera
let cube: THREE.Mesh
let renderer: THREE.WebGLRenderer
let objects: (
  | THREE.Object3D<THREE.Event>
  | THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhongMaterial>
)[] = []

const Demo = () => {
  useEffect(() => {
    const canvas = document.querySelector('#c') as HTMLElement
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas })

    // 初始化相机
    const fov = 40
    const aspect = 2 // the canvas default
    const near = 0.1
    const far = 1000
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 50, 0)
    camera.up.set(0, 0, 1)
    camera.lookAt(0, 0, 0)

    scene = new THREE.Scene()

    {
      const color = 0xffffff
      const intensity = 3
      const light = new THREE.PointLight(color, intensity)
      scene.add(light)
    }

    const radius = 1
    const widthSegments = 6
    const heightSegments = 6
    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)

    // 太阳和地球的容器
    const solarSystem = new THREE.Object3D()
    scene.add(solarSystem)
    objects.push(solarSystem)

    // 地球的容器
    const earthOrbit = new THREE.Object3D()
    earthOrbit.position.x = 10
    solarSystem.add(earthOrbit)
    objects.push(earthOrbit)

    // 月亮
    const moonOrbit = new THREE.Object3D()
    moonOrbit.position.x = 2
    earthOrbit.add(moonOrbit)

    // 太阳
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 })
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
    sunMesh.scale.set(5, 5, 5)
    solarSystem.add(sunMesh)
    objects.push(sunMesh)

    // 地球
    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 })
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial)
    // earthMesh.position.x = 10
    // solarSystem.add(earthMesh)
    earthOrbit.add(earthMesh)
    objects.push(earthMesh)

    // 把月亮加到地球容器里面
    const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 })
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial)
    moonMesh.scale.set(0.5, 0.5, 0.5)
    moonOrbit.add(moonMesh)
    objects.push(moonMesh)

    // 添加辅助线
    objects.forEach((node) => {
      const axes = new THREE.AxesHelper()
      axes.material.depthTest = false
      axes.renderOrder = 1
      node.add(axes)
    })

    // 动画
    requestAnimationFrame(render)
  })

  function resizeRendererToDisplaySize(renderer: THREE.Renderer) {
    const canvas = renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = (canvas.clientWidth * pixelRatio) | 0
    const height = (canvas.clientHeight * pixelRatio) | 0
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  const render = (time: number) => {
    time *= 0.001
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    objects.forEach((obj) => {
      obj.rotation.y = time
    })

    // 渲染
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <canvas id="c" style={{ width: '100vw', height: '100vh' }}></canvas>
    </div>
  )
}

export default Demo
