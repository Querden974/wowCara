import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Card from "./components/card"
import SearchChar from "./components/searchChar"
import './index.css'
import SelectMenu from "./components/selectMenu"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SelectMenu/>

      <Card CSS='w-5 flex justify-center items-center' />
    </>
  )
}

export default App
