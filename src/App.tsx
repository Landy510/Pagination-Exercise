import { useState, useEffect } from 'react';
import { Pagination } from './components/Pagination';
import retrieverUrl from "./assets/labrador Retriever.jpg";
import './App.css'

const data = Array.from({ length: 10 }, (_, i) => ({ id: i , imageUrl: retrieverUrl}));

function App() {
  const [content, setContent] = useState<Array<Array<typeof data[0]>>>([]);
  const [contentIndex, setContentIndex] = useState(0);

  useEffect(() => {
    const clonedData = [...data];
    const newData = [];
    do {
      const temp = clonedData.splice(0, 3);
      newData.push(temp);
    } while(clonedData.length > 0);
    setContent(newData);
  }, [])

  return (
    <>
      <div>
        {
          content.map((val, index) => {
            return (
              <div 
                key={index}
                style={{
                  display: `${index === contentIndex ? 'flex' : 'none'}`,
                  columnGap: '10px', 
                }}
              >
                <p>{index}</p>
                {val.map(item => (
                  <img 
                    key={item.id} 
                    src={item.imageUrl} 
                    alt={`Image ${item.id}`} 
                  />
                ))}
              </div>
            )
          })
        } 
      </div>
      <Pagination 
        pages={content.length} 
        handleShowWhichPage={val => setContentIndex(val)}
      />
    </>
  )
}

export default App
