import React from 'react'
import './Repartition.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Repartition = () => {
    return(
        <>  
            <div className='single--rep'>
            <p>Geral</p>
            <div className='icons--rep'>
               <div className='rounded'>
                  <faPlus style={{fontSize: '20px', color: 'black'}}/> 
               </div>
            </div>
            </div>
            <div className='single--rep'>
            <p>Nome da Reparticao</p>
            <div className='icons--rep'>
            Teste
            </div>
            </div>
            <div className='single--rep'>
            <p>Nome da Reparticao</p>
            <div className='icons--rep'>
            Teste
            </div>
            </div>
            <div className='single--rep'>
            <p>Nome da Reparticao</p>
            <div className='icons--rep'>
            Teste
            </div>
            </div>
            <div className='single--rep'>
            <p>Nome da Reparticao</p>
            <div className='icons--rep'>
            Teste
            </div>
            </div>
        </>
        )
}

export default Repartition