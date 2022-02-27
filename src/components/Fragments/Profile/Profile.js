import React, { useState, useContext, useEffect } from 'react'
import Calendar from 'react-calendar'
import { Link } from 'react-router-dom'
import { PainelContext } from '../../../contexts/PainelContext'
import './Profile.css'



const Profile = () => {
    const { resultProfile, showProfile } = useContext(PainelContext)
    const result = resultProfile();
    const [ date, setDate ] = useState(new Date())


    const onChange = date => {
        setDate(date)
    }

    useEffect(() => {
        let element = document.getElementById('profile')
        let element2 = document.getElementById('fade')
        if(result){  
            element.style.width = '18%'
            element2.style.display = 'block'
        }else{
            element2.style.display = 'none'
            element.style.width = '0'
        }
    },[result])

    return(
        <section id='profile' className='profile'>
            <div id='fade' className='fade'>
            <div className='icon'>
                <div className='round-img'>

                </div>
                <h1>Nome da Pessoa</h1>
                <h2>Cargo</h2>
            </div>
            <div className='options'>
                <ul>
                    <Link to='/criar' style={{textDecoration: 'none'}}>
                    <li>Criar</li>
                    </Link>
                    <Link to='/meusarquivos' style={{textDecoration: 'none'}}>
                    <li>Meus Arquivos</li>
                    </Link>
                    <Link to='/importar' style={{textDecoration: 'none'}}>
                    <li>Importar</li>
                    </Link>
                    <li>Teste</li>
                </ul>
            </div>

            <div className='calendar'>
                    <Calendar onChange={onChange} value={date}/>
                </div>
                </div>
        </section>

    )
}

export default Profile