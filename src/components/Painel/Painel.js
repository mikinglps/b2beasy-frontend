import React, { useContext } from 'react'
import './Painel.css';
import { Routes, Route } from 'react-router-dom'
import { Navbar, Main, Sidebar, Profile } from '../Fragments';
import { PainelContext, PainelProvider } from '../../contexts/PainelContext';

const Painel = () => {

    return (
        <PainelProvider>
        <div className='all'>
            <Navbar/>
            
            <div className='flex--painel'>
            <Sidebar/>
            <Profile/>
                <Routes>
                    <Route path='/' element={ <Main/> }/>
                    <Route path='/home' element={<Main/>}/>
                </Routes>
            </div>
        </div>
        </PainelProvider>
    )
}

export default Painel;