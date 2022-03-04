import React, { useEffect, useState, useRef } from 'react'
import './Pagination.css'

const Pagination = ({page, pages, changePage, changeUser, setores}) => {
    let middlePagination;
    const [ loading, setLoading ] = useState(false)
    const reff = useRef()
    let ref
    // const handler = changeUser(setores[reff.current.parentNode.parentNode.getAttribute('dataid')]._id, page)
    useEffect((e)=>{
            const abort = new AbortController()
            if(loading){
                ref = reff.current.parentNode.parentNode
                let dataid = ref.getAttribute('dataid')
                changeUser(setores[dataid]._id, page, { signal: abort.signal })
                setLoading(false)
            }
            return () => {
                abort.abort()
            }
    },[page])

    if (pages <= 5){
        middlePagination = [...Array(pages)].map((_,idx) => (
            <button
            ref={reff}
            key={idx + 1}
            onClick={(e) => {changePage(idx + 1)
                setLoading(true)
            }}
            disabled={page === idx + 1}>
               {idx + 1} 
            </button>
            )
        )
    }else{
        const startValue = Math.floor((page - 1) / 5) * 5
        middlePagination = (
            <>
            {[...Array(5)].map((_,idx) => (
                <button
                ref={reff}
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                onClick={() => {
                changePage(startValue + idx + 1)
                setLoading(true)
                // let dataid = e.currentTarget.parentNode.parentNode.getAttribute('dataid')
                // changeUser(setores[dataid]._id, page)
                }}                                                                            >                                    
                {startValue + idx + 1}
                </button>
                )
            )}

            <button>...</button>
            <button ref={reff} onClick={(e) => {
                changePage(pages)
                setLoading(true)
                }}>{pages}</button>
            
            </>
        )
        if(page > 5){
            if(pages - page >= 5){
                middlePagination = (
                    <>
                    <button ref={reff} onClick={(e) => {changePage(1); setLoading(true)
                    }}>1</button>
                    <button>...</button>
                    <button ref={reff} onClick={(e)=>{changePage(startValue); setLoading(true)
                    }}>{startValue}</button>
                {[...Array(5)].map((_,idx) => {
                    return (
                    <button ref={reff}
                    key={startValue + idx + 1}
                    disabled={page === startValue + idx + 1}
                    onClick={(e) => {
                        changePage(startValue + idx + 1)
                        setLoading(true)
                        }}>
                    {startValue + idx + 1}
                    </button>
                    )
                })}
    
                <button>...</button>
                <button ref={reff} onClick={(e) => {changePage(pages); setLoading(true)
               }}>{pages}</button>
                </>
                )
            }else{
                let amountLeft = pages - page + 5
                middlePagination = (
                    <>
                    <button ref={reff} onClick={(e) => {changePage(1); setLoading(true)
                    }}>1</button>
                    <button>...</button>
                    <button ref={reff} 
                    onClick={(e) => {changePage(startValue)
                         setLoading(true)
                    }}>{startValue}</button>
                    
                {[...Array(amountLeft)].map((_,idx) => (
                    
                    <button
                    ref={reff}
                    key={startValue + idx + 1}
                    style={pages < startValue + idx + 1 ? {display: 'none'} : null}
                    disabled={page === startValue + idx + 1}
                    onClick={(e) => {changePage(startValue + idx + 1); setLoading(true)
                        }}>
                    {startValue + idx + 1}
                    </button>
                    
                
                ))}
                </>
                )
    
            }
    }

    
    }

    return(
        pages > 1 && (
            <>
            <button className='pagination__prev'
            ref={reff}
            onClick={(e) => {changePage(page => page - 1); setLoading(true)
                }}
                disabled={page === 1}>
                &#171;
            </button>
            {middlePagination}
            <button className='pagination__next'
            ref={reff}
            onClick={(e)=> {changePage(page => page + 1); 
                setLoading(true)
                }}
            disabled={page === pages}>
                &#187;
            </button>
            </>
        )

        
        
    )
}

export default Pagination