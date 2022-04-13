import React, { useContext, useEffect, useState } from 'react'
import './Painel.css';
import { useNavigate } from 'react-router-dom'
import { Navbar, Main, Sidebar, Profile } from '../Fragments';
import { PainelProvider, PainelContext } from '../../contexts/PainelContext';
import { AuthContext } from '../../contexts/auth';
import PopUpLembrete from './PopUpLembrete'
import axios from 'axios';

const Painel = () => {
    const { usuario } = useContext(AuthContext)
    const [ lembretes, setLembretes ] = useState([])
    const [tasks, setTasks] = useState([])
    const [clickPopUp, setClickPopUp] = useState(false)
    const [ found, setFound ] = useState(false)
    const [ lembreteShow, setLembreteShow ] = useState('')

    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/lembretes/find/sidebar', {cpf: usuario.cpf})
        .then(res => {
            setLembretes(res.data)
        })

        axios.post('http://localhost:8080/api/v1/tarefas/find/sidebar', {cpf: usuario.cpf})
        .then(res => {
            setTasks(res.data)
        })
    }, [])

    useEffect(() => {
        setInterval(() => {
            let date = new Date()
            let diff = 10;
            let formatter = Intl.DateTimeFormat('pt-BR',{
                timeZone: 'America/Sao_Paulo',
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            })

            let formatterHour = Intl.DateTimeFormat("pt-BR", {
            hour: 'numeric',
            minute: 'numeric'
            })
            let horaFormatada = formatterHour.format(date)
            let dataFormatada = formatter.format(date)

            for(let i = 0; i < lembretes.length; i++){
            if(lembretes[i].data == dataFormatada && Number(lembretes[i].horario.replace(':','')) + diff >= Number(horaFormatada.replace(':','')) && sessionStorage.getItem(lembretes[i]._id) == false || sessionStorage.getItem(lembretes[i]._id) == undefined){
                setLembreteShow(lembretes[i]._id)
                sessionStorage.setItem(lembretes[i]._id, false)
            }
        }
        
        }, 10000)
    })
    

    return (
        <PainelProvider>
        <div className='all'>
            <Navbar/>
            
            <div className='flex--painel'>
            <Sidebar lembretes={lembretes} tasks={tasks}/>
            <Profile/>
            <Main/>
            {lembreteShow != '' ? <PopUpLembrete id={lembreteShow}/> : null}
            </div>
        </div>
        </PainelProvider>
    )
}

export default Painel;