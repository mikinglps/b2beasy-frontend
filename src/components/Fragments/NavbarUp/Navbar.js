import React from 'react'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return(
    <header>
        <div className='logo--painel'>
            <h2>B2Beasy</h2>
        </div>
        <nav className='nav--up'>
            <ul>
             <Link to='/home' style={{textDecoration: 'none'}}>
                <li>Home</li>
             </Link>
             <Link to='perfil' style={{textDecoration: 'none'}}>
                <li>Perfil</li>
             </Link>
             <Link to='/tarefas' style={{textDecoration: 'none'}}>
                <li>Minhas Tarefas</li>
             </Link>
             <Link to='/lembretes' style={{textDecoration: 'none'}}>
                <li>Lembretes</li>
             </Link>
             <Link to='/logout' style={{textDecoration: 'none'}}>
                <li>Sair</li>
             </Link>
             </ul>
        </nav>
    </header>
    )
}

export default Navbar;
