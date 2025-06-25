import { useState } from 'react'
import './App.css'

const pages = [
  {id: 0},
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
]

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleClick(val: number) {
    setCurrentIndex(val);
  }

  function isShow(index: number, range: number = 1): boolean {
    if(currentIndex === 0) return index <= (currentIndex + range * 2);
    return index <= currentIndex + range && index >= currentIndex - range;
  }

  return (
    <>
      <ol className='pagination'>
        <li style={{
          display: `${currentIndex >= (0 + 2) ? "block" : "none"}`
        }}>...</li>
        {
          pages.map(val => {
            return (
              <li 
                key={val.id}
                style={{
                  display: `${isShow(val.id) ? "block" : "none"}`,
                  cursor: "pointer",
                  backgroundColor: `${currentIndex === val.id ? "deeppink" : "transparent"}`,
                  color: `${currentIndex === val.id ? "white" : "black"}`
                }}
                onClick={() => handleClick(val.id)}
              >{val.id}</li>
            )
          })
        }
        <li style={{
          display: `${currentIndex <= (pages.length - 3) ? "block" : "none"}`
        }}>...</li>
      </ol>
    </>
  )
}

export default App
