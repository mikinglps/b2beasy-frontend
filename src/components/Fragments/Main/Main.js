import React, { useContext, useEffect } from 'react'
import './Main.css'
import { Routes, Route, Outlet } from 'react-router-dom'
import { PainelContext } from '../../../contexts/PainelContext'
import { Repartition } from '../'
import useBreadcrumbs from 'use-react-router-breadcrumbs'


const Main = props => {
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

    const breadcrumbs = useBreadcrumbs()

    return (
        <>
        <div id='breadcrump' className='breadcrump'><h1>Inicio</h1></div>
        <main id='main' className="container--painel">
            
            <Outlet>
            <Repartition/>
            </Outlet>
        </main>
        </>
    )
}

export default Main;