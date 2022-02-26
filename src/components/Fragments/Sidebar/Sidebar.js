import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return(
        <div className='right--boxes'>
            &nbsp;
            <aside className='lembrete'>
                <h4>Lembretes</h4>
                <ul>
                    <Link to='/lembretes/:id'><li>Fazer tal coisa</li></Link>
                </ul>
            </aside>
            <aside className='tarefas'>
                <h4>Tarefas</h4>
                <ul>
                    <Link to='/tarefas/:id'><li>Fazer outra coisa</li></Link>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar