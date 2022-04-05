import axios from 'axios'
import React, { useState } from 'react'
import './Config.css'

const Config = () => {
    const [ expireTime, setExpireTime ] = useState(null)
    const date = new Date()
    const [ofInit, setOfInit] = useState(null)

    const saveConfig = () => {
        axios.post('http://localhost:8080/api/v1/options', {log: expireTime, oficio: ofInit})
    }
    return(
        <section class='configContainer'>
        <h2>Configurações</h2>
        <form className='configform'>
            <label>Defina em quanto tempo seus logs devem expirar</label>
            <input type='text' value={expireTime} onChange={(e) => {setExpireTime(e.target.value)}} placeholder='Defina para 0 caso deseje que os logs nunca sejam apagados'/>
            <label>Defina o número inicial do oficio</label>
            <input type='number' value={ofInit} onChange={(e)=> {setOfInit(e.target.value)}} placeholder='Caso defina 0, o primeiro oficio sairá com o número 1'/>
            <button type='submit' className='saveConfig' onClick={() => {saveConfig()}}>Salvar</button>
        </form>
        </section>
    )
}

export default Config