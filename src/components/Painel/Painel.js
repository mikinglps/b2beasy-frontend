import React, { useContext, useEffect } from 'react'
import './Painel.css';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom'
import { Navbar, Main, Sidebar, Profile, CreateRepartition } from '../Fragments';
import { PainelContext, PainelProvider } from '../../contexts/PainelContext';

const Painel = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        navigate('/gerenciar')
    },[])


    return (
        <PainelProvider>
        <div className='all'>
            <Navbar/>
            
            <div className='flex--painel'>
            <Sidebar/>
            <Profile/>
            <Main/>
            </div>
        </div>
        </PainelProvider>
    )
}

export default Painel;