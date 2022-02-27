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
        if(result){
            element.style.marginLeft = '18%'
        }else{
            element.style.marginLeft = '0'
        }
        console.log(result)
    },[result])

    return (
        <main id='main' className="container--painel">
            <Routes>
               <Route path='/' element={<Repartition/>}/>
               <Route path='/home' element={<Repartition/>}/>
            </Routes>
        </main>
    )
}

export default Main