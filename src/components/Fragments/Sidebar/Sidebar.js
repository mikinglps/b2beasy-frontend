import React from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Sidebar = ({lembretes, tasks}) => {
    const reminder = <FontAwesomeIcon icon={faBell} style={{color: 'white', fontSize: '16px'}}/>
    const task = <FontAwesomeIcon icon={faListCheck} style={{color: 'white', fontSize: '16px'}}/>
    return(
        <div className='right--boxes'>
            &nbsp;
            <aside className='lembrete'>
                <h4>{reminder} Lembretes</h4>
                <ul>
                    {lembretes.map((value, index) => {
                        return(
                    <Link key={index} to='gerenciar/lembretes/' style={{textDecoration: 'none'}}><li key={index}>{value.titulo}</li></Link>
                    )
                    })}
                </ul>
            </aside>
            <aside className='tarefas'>
                <h4>{task} Tarefas</h4>
                <ul>
                    {tasks.map((value, index) => {
                        return(
                    <Link key={index} to='gerenciar/minhastarefas' style={{textDecoration: 'none'}}><li >{value.titulo}</li></Link>
                    )
                    })}
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar