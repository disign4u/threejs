import { useState } from 'react'
import {Target} from "./component/Target.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Target/>
    </>
  )
}

export default App
