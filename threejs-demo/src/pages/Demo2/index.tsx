import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { BoxGeometry, Camera, ColorRepresentation, Mesh, Scene, WebGLRenderer } from 'three'

let scene: Scene
let camera: Camera
let renderer: WebGLRenderer
let cubes: Mesh[]

const Demo2 = () => {
  // const [cubes, setCubes] = useState<any>()

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

    // 添加一个灯光
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4)
    scene.add(light)

    init()
  }, [])

  const init = () => {
    const boxWidth = 1
    const boxHeight = 1
    const boxDepth = 1
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)

    cubes = [
      makeInstance(geometry, 0x44aa88, 0),
      makeInstance(geometry, 0x8844aa, -2),
      makeInstance(geometry, 0xaa8844, 2),
    ]
    // 动画
    requestAnimationFrame(render)
  }
  const render = (time: number) => {
    time *= 0.001 // 将时间单位变为秒
    if (cubes) {
      cubes.forEach((cube: { rotation: { x: number; y: number } }, ndx: number) => {
        const speed = 1 + ndx * 0.1
        const rot = time * speed
        cube.rotation.x = rot
        cube.rotation.y = rot
      })
    }

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  const makeInstance = (geometry: BoxGeometry, color: ColorRepresentation, x: number) => {
    const material = new THREE.MeshPhongMaterial({ color })

    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    cube.position.x = x

    return cube
  }

  return (
    <div>
      <canvas id="c"></canvas>
    </div>
  )
}

export default Demo2
