import React, { useContext, useEffect } from 'react'
import './Main.css'
import Repartition from '../Repartition/Repartition'
import { Routes, Route } from 'react-router-dom'
import { PainelContext } from '../../../contexts/PainelContext'


const Main = () => {

    const { resultProfile } = useContext(PainelContext)
    const result = resultProfile()

    useEffect(()=>{
        let element = document.getElementById('main')
        let element2 = document.getElementById('breadcrump')
        if(result){
            element.style.marginLeft = '18%'
            element2.style.marginLeft = '19%'
        }else{
            element.style.marginLeft = '0'
            element2.style.marginLeft = '1%'
        }
        console.log(result)
    },[result])

    return (
        <>
        <div id='breadcrump' className='breadcrump'><h1>Inicio/</h1></div>
        <main id='main' className="container--painel">
            
            <Routes>
               <Route path='/' element={<Repartition/>}/>
               <Route path='/home' element={<Repartition/>}/>
            </Routes>
        </main>
        </>
    )
}

export default Main