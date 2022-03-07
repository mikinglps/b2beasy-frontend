import React, { useState, useEffect } from 'react'
import './Filial.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Filial = () => {

    const modify = <FontAwesomeIcon icon={faPenToSquare} style={{fontSize: '18px', cursor: 'pointer'}} />
    const deleteFilial = <FontAwesomeIcon icon={faDeleteLeft} style={{color: '#bd3c33', fontSize: '18px', cursor: 'pointer'}}/>
    const [ titulo, setTitulo ] = useState('')
    const [ cnpj, setCnpj ] = useState('')
    const [result, setResult] = useState([])

    const sendForm = () => {
        axios.post('http://localhost:8080/api/v1/filiais', {titulo, cnpj})
        .then(res=>{
            setResult([...res.data])
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:8080/api/v1/filiais')
        .then(res=>{
            setResult([...res.data])
        })
    },[])

    return(
        <>
        <section className='addFilial'>
            <h2> Adicionar Filiais </h2>
            <form>
            <label>Titulo da Filial</label>
            <input type='text' value={titulo} onChange={(e) => setTitulo(e.target.value)} required/>
            <label>CNPJ</label>
            <input type='number' value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder='Apenas numeros' required/>
            <button onClick={sendForm} className='btn-primary'>Cadastrar</button>
            </form>
        </section>
        <hr/>
        <section className='manageFiliais'>
            <h2>Gerenciar Filiais</h2>
        <table>
            <thead>
            <tr className='first-tr'>
                <td>Titulo</td>
                <td>CNPJ</td>
                <td>Modificar</td>
                <td>Excluir</td>
            </tr>
            </thead>
            <tbody>
            {result.map((value, idx) => {
                return(
            <tr key={idx}>
                <td>{value.titulo}</td>
                <td>{value.cnpj}</td>
                <td>{modify}</td>
                <td>{deleteFilial}</td>
            </tr>
            )
            })}
            </tbody>
        </table>
        </section>
        </>
    )
}

export default Filial