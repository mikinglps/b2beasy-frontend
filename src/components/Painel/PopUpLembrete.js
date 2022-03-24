import React, { useContext } from 'react'
import { PainelContext } from '../../contexts/PainelContext'
import './PopUpLembrete.css'
import { useNavigate } from 'react-router-dom'


const PopUpLembrete = ({id}) => {
    let navigate = useNavigate()
    const handleStorage = () => {
        sessionStorage.setItem(id, true)
    }
    return(
        <div className='popUpLembrete'>
            <p>Voce tem algo agendado para daqui 10 minutos!</p>
            <button onClick={() => {handleStorage(); navigate('/gerenciar/lembretes')}}>Clique aqui para ver!</button>
        </div>
    )
}

export default PopUpLembrete