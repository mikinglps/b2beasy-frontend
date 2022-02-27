import React, { useState, useContext, useEffect } from 'react'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faComment, faBars } from '@fortawesome/free-solid-svg-icons'
import { PainelProvider, PainelContext } from '../../../contexts/PainelContext'
import './Navbar.css'


const profileButton = <FontAwesomeIcon icon={faBars} style={{color: 'white', fontSize: '20px'}}/>
const logoutIcon = <FontAwesomeIcon icon={faArrowRightFromBracket} style={{color: 'white', fontSize: '14px'}}/>
const chat = <FontAwesomeIcon icon={faComment} style={{color: 'white', fontSize: '14px'}}/>

const Navbar = () => {

   const { showingProfile, resultProfile } = useContext(PainelContext)
   const handleProfile = () => { showingProfile() }
   const result = resultProfile()

   useEffect(()=>{
      let element = document.getElementById('nav--up')
      if(result){
         element.style.width = '82%'
      }else{
         element.style.width = '100%'
      }
   },[result])

    return(
    <header>
        <nav id='nav--up' className='nav--up'>
           <div className='profileButton'>
              <button onClick={handleProfile}>{profileButton}</button>
           </div>
            <ul>
             <li>{chat}</li>
             <Link to='/logout' style={{textDecoration: 'none', width: '3%', marginRight: '2%'}}>
                <li>{logoutIcon}</li>
             </Link>
             </ul>
        </nav>
    </header>
    )
}

export default Navbar;
