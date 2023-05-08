import { useRef } from 'react'
import './App.css'

function App() {
  const inputRef = useRef<HTMLInputElement>(null)

  function focusOnInput() {
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <>
      <input type="text" name="texto" id="textInput" ref={inputRef}/>
      <button onClick={focusOnInput}>Focar no input</button>
    </>
  )
}

export default App
