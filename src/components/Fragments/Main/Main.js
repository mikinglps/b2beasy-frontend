import React from 'react'
import './Main.css'
import Repartition from '../Repartition/Repartition'
import { Routes, Route } from 'react-router-dom'

const Main = () => {
    return (
        <main className="container--painel">
            <Routes>
               <Route path='/' element={<Repartition/>}/>
               <Route path='/home' element={<Repartition/>}/>
            </Routes>
        </main>
    )
}

export default Main