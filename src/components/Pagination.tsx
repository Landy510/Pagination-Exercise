import { useEffect, useState } from "react";

interface PageProps {
    pages: number;
    handleShowWhichPage: (index: number) => void;
}

export function Pagination(prop: PageProps) {
    const { pages, handleShowWhichPage } = prop;
    const [pagesArray, setPagesArray] = useState<Array<{ id: number }>>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    function handleClick(val: number) {
        setCurrentIndex(val);
    }

    function handleChangeIndex(range: number) {
        if(range > 0) {
            if(currentIndex + range < pagesArray.length) {
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

    useEffect(() => {
        setPagesArray(Array.from({ length: pages }, (_, i) => ({ id: i })));
    }, [pages])

    useEffect(() => {
        handleShowWhichPage(currentIndex);
    }, [currentIndex, handleShowWhichPage])

    return (
        <ol className='pagination'>
            <li onClick={() => setCurrentIndex(0)}>&lt;&lt;</li>
            <li onClick={() => handleChangeIndex(-1)}>&lt;</li>
            {
            pagesArray.map(val => {
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
            <li onClick={() => setCurrentIndex(pagesArray.length - 1)}>&gt;&gt;</li>
        </ol>
    )
}