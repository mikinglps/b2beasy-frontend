import React from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Sidebar = ({lembretes}) => {
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
                    <Link to='/lembretes/' style={{textDecoration: 'none'}}><li key={index}>{value.titulo}</li></Link>
                    )
                    })}
                </ul>
                <div className='button-holder'>
                <button>Ver Mais</button>
                </div>
            </aside>
            <aside className='tarefas'>
                <h4>{task} Tarefas</h4>
                <ul>
                    <Link to='/tarefas/:id' style={{textDecoration: 'none'}}><li>Fazer outra coisa</li></Link>
                </ul>
                <div className='button-holder'>
                <button>Ver Mais</button>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar