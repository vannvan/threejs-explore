import * as React from 'react'
import { useLoaderData } from 'react-router-dom'

// export async function loader() {
//   await new Promise((r) => setTimeout(r, 500))
//   return 'I came from the About.tsx loader function!'
// }

// export function Component() {
//   // let data = useLoaderData() as string

//   return (
//     <div>
//       <h2>About</h2>
//       <p>啊哈哈哈</p>
//     </div>
//   )
// }

const Demo = () => {
  return (
    <div>
      <h2>About</h2>
      <p>啊哈哈sss哈</p>
    </div>
  )
}

export default Demo

// Component.displayName = 'AboutPage'
