import React from 'react'
import './Painel.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Main } from '../Fragments';

const Painel = () => {
    return (
        <>
            <Navbar/>
                <Routes>
                    <Route path='/' element={ <Main/> }/>
                    <Route path='/home' element={< Main />}/>
                </Routes>
        </>
    )
}

export default Painel;