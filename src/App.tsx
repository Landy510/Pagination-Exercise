import { useState } from 'react'
import './App.css'

const pages = Array.from({ length: 10 }, (_, i) => ({ id: i }));

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleClick(val: number) {
    setCurrentIndex(val);
  }

  function handleChangeIndex(range: number) {
    if(range > 0) {
      if(currentIndex + range < pages.length) {
        setCurrentIndex(currentIndex + range);
      }
    }
    else {
      if(currentIndex + range >= 0) {
        setCurrentIndex(currentIndex + range);
      }
    }
  }

  function isShow(index: number, range: number = 1): boolean {
    if(currentIndex === 0) return index <= (currentIndex + range * 2);
    return index <= currentIndex + range && index >= currentIndex - range;
  }

  return (
    <>
      <ol className='pagination'>
        <li onClick={() => setCurrentIndex(0)}>&lt;&lt;</li>
        <li onClick={() => handleChangeIndex(-1)}>&lt;</li>
        {
          pages.map(val => {
            return (
              <li 
                className='index'
                key={val.id}
                style={{
                  display: `${isShow(val.id) ? "block" : "none"}`,
                  backgroundColor: `${currentIndex === val.id ? "deeppink" : "transparent"}`,
                  color: `${currentIndex === val.id ? "white" : "black"}`
                }}
                onClick={() => handleClick(val.id)}
              >{val.id}</li>
            )
          })
        }
        <li onClick={() => handleChangeIndex(1)}>&gt;</li>
        <li onClick={() => setCurrentIndex(pages.length - 1)}>&gt;&gt;</li>
      </ol>
    </>
  )
}

export default App
