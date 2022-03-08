import React, { useState, useContext, useEffect } from 'react'
import Calendar from 'react-calendar'
import { Link } from 'react-router-dom'
import { PainelContext } from '../../../contexts/PainelContext'
import { AuthContext } from '../../../contexts/auth'
import './Profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFolder, faUpload, faBell, faListCheck, faUser } from '@fortawesome/free-solid-svg-icons'


const Profile = () => {
    const { usuario } = useContext(AuthContext)
    const { resultProfile, showProfile } = useContext(PainelContext)
    const result = resultProfile();
    const [ date, setDate ] = useState(new Date())
    const add = <FontAwesomeIcon icon={faPlus} style={{color: '#8391a2', fontSize: '16px'}}/>
    const archives = <FontAwesomeIcon icon={faFolder} style={{color: '#8391a2', fontSize: '16px'}}/>
    const upload = <FontAwesomeIcon icon={faUpload} style={{color: '#8391a2', fontSize: '16px'}}/>
    const reminder = <FontAwesomeIcon icon={faBell} style={{color: '#8391a2', fontSize: '16px'}}/>
    const task = <FontAwesomeIcon icon={faListCheck} style={{color: '#8391a2', fontSize: '16px'}}/>
    const user = <FontAwesomeIcon icon={faUser} style={{color: '#8391a2', fontSize: '60px'}}/>


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
            <h2 className='logo'>B2Beasy</h2>
            <div id='fade' className='fade'>
            <div className='icon'>
                {user}
                <h1>{usuario.nome}</h1>
                <h2>Cargo</h2>
            </div>
            <div className='options'>
                <h2>Navegação</h2>
                <ul>
                    <Link to='/criar' style={{textDecoration: 'none' }}>
                    <li>{add} Criar</li>
                    </Link>
                    <Link to='/meusarquivos' style={{textDecoration: 'none'}}>
                    <li>{archives} Meus Arquivos</li>
                    </Link>
                    <Link to='/lembretes' style={{textDecoration: 'none'}}>
                    <li>{reminder} Lembretes</li>
                    </Link>
                    <Link to='/importar' style={{textDecoration: 'none'}}>
                    <li>{upload} Importar</li>
                    </Link>
                    <Link to='/importar' style={{textDecoration: 'none'}}>
                    <li>{task} Tarefas</li>
                    </Link>
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