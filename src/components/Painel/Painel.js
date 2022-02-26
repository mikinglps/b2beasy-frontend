import React from 'react'
import './Painel.css';
import { Routes, Route } from 'react-router-dom'
import { Navbar, Main, Sidebar } from '../Fragments';

const Painel = () => {
    return (
        <>
            <Navbar/>
            
            <div className='flex--painel'>
            <Sidebar/>
                <Routes>
                    <Route path='/' element={ <Main/> }/>
                    <Route path='/home' element={<Main/>}/>
                </Routes>
            </div>
        </>
    )
}

export default Painel;