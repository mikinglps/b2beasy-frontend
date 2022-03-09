import React, { useState } from 'react'
import './Config.css'

const Config = () => {
    const [ expireTime, setExpireTime ] = useState(null)
    const [memoInit, setMemoInit] = useState(null)
    const [ofInit, setOfInit] = useState(null)
    return(
        <section class='configContainer'>
        <h2>Configurações</h2>
        <form className='configform'>
            <label>Defina em quanto tempo seus logs devem expirar</label>
            <input type='text' value={expireTime} onChange={(e) => {setExpireTime(e.target.value)}} placeholder='Defina para 0 caso deseje que os logs nunca sejam apagados'/>
            <label>Defina o número inicial do memorando</label>
            <input type='number' value={memoInit} onChange={(e) => {setMemoInit(e.target.value)}} placeholder='Caso deixe em branco inicializa com Mes+Ano+0001 '/>
            <label>Defina o número inicial do oficio</label>
            <input type='number' value={ofInit} onChange={(e)=> {setOfInit(e.target.value)}} placeholder='Caso deixe em branco inicializa com Mes+Ano+0001 '/>
            <button className='saveConfig'>Salvar</button>
        </form>
        </section>
    )
}

export default Config