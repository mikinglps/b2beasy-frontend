import React from 'react'
import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
const Modal = ({acao, clicked, newClick}) => {
    const close = <FontAwesomeIcon icon={faCircleXmark} style={{color:'black',fontSize: '30px', cursor: 'pointer'}}/>
    return(
        <section className='vejaMais'>
            <div className='close-handler' onClick={() => newClick(!clicked)}>
                {close}
            </div>
        <h2>
            Ação completa:
        </h2>
        <p>{acao}</p>
        </section>
    )
}

export default Modal