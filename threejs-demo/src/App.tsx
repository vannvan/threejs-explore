import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  BrowserRouter as Router,
  Link,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import './App.css'
import Demo1 from './pages/Demo1'
import Demo2 from './pages/Demo2'
import Demo3 from './pages/Demo3'
import Demo4 from './pages/Demo4'
import Demo5 from './pages/Demo5'
import Demo6 from './pages/Demo6'
import Demo7 from './pages/Demo7'

// import routes from "./routes";

const routes = [
  {
    path: 'demo1',
    element: <Demo1 />,
  },
  {
    path: 'demo2',
    element: <Demo2 />,
  },
  {
    path: 'demo3',
    element: <Demo3 />,
  },
  {
    path: 'demo4',
    element: <Demo4 />,
  },
  {
    path: 'demo5',
    element: <Demo5 />,
  },
  {
    path: 'demo6',
    element: <Demo6 />,
  },
  {
    path: 'demo7',
    element: <Demo7 />,
  },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>Hello World</h1>
        {routes.map((route) => (
          <span style={{ marginRight: 12 }} key={route.path}>
            <Link to={route.path}>{route.path}</Link>
          </span>
        ))}
      </div>
    ),
  },
  ...routes,
])
function App() {
  return (
    <div className="App">
      <>
        <RouterProvider router={router} />
      </>
    </div>
  )
}

export default App
