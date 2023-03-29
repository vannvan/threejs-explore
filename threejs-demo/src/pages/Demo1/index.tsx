import { useEffect } from 'react'
import * as THREE from 'three'

let scene: THREE.Scene
let camera: THREE.Camera
let cube: THREE.Mesh
let renderer: THREE.WebGLRenderer

const Demo1 = () => {
  useEffect(() => {
    const canvas = document.querySelector('#c') as HTMLElement
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas })

    // 初始化相机
    const fov = 75
    const aspect = 2 // 相机默认值
    const near = 0.1
    const far = 5
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 2

    // 初始化场景
    scene = new THREE.Scene()
    // 创建一个几何体
    const boxWidth = 1
    const boxHeight = 1
    const boxDepth = 1
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
    // 创建一个材质
    // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 }) // 绿蓝色

    // 创建一个网格对象，应应用上面的几何体和材质
    cube = new THREE.Mesh(geometry, material)

    // 将网格加入到场景中
    scene.add(cube)

    // 添加一个灯光
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4)
    scene.add(light)

    // 渲染
    // renderer.render(scene, camera)

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
    time *= 0.001 // 将时间单位变为秒
    cube.rotation.x = time
    cube.rotation.y = time
    const canvas = renderer.domElement
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  return (
    <div>
      <canvas id="c"></canvas>
    </div>
  )
}

export default Demo1
