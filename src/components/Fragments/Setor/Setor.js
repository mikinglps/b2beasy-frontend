import React, { useState, useEffect } from 'react'
import './Setor.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Setor = () => {

    const modify = <FontAwesomeIcon icon={faPenToSquare} style={{fontSize: '18px', cursor: 'pointer'}} />
    const deleteFilial = <FontAwesomeIcon icon={faDeleteLeft} style={{color: '#bd3c33', fontSize: '18px', cursor: 'pointer'}}/>
    const [ titulo, setTitulo ] = useState('')
    const [ filial, setFilial ] = useState('')
    const [resultFilial, setResultFilial] = useState([])
    const [ result, setResult ] = useState([])

    const sendForm = () => {
         axios.post('http://localhost:8080/api/v1/setor', {titulo, filial})
         .then(res=>{
             setResult([...res.data.results])
         })
     }

    useEffect(()=>{
        axios.get('http://localhost:8080/api/v1/filiais')
        .then(res=>{
            setResultFilial([...res.data])
        })

        axios.get('http://localhost:8080/api/v1/setor')
        .then(res=>{
            setResult([...res.data.results])
        })

        console.log(resultFilial)
    },[])


    return(
        <>
        <section className='addSetor'>
            <h2> Adicionar Setores </h2>
            <form>
            <label>Titulo do Setor</label>
            <input type='text' value={titulo} onChange={(e) => setTitulo(e.target.value)} required/>
            <label>Filial do Setor</label>
            <select onChange={(e) => setFilial(e.target.value)}>
                {resultFilial.map((value, index) => {
                    return(
                <option key={index} value={value.titulo}>{value.titulo}</option>
                )
                })}
            </select>
            <button onClick={sendForm} className='btn-primary'>Cadastrar</button>
            </form>
        </section>
        <hr/>
        <section className='manageSetor'>
            <h2>Gerenciar Setores</h2>
        <table>
            <thead>
            <tr className='first-tr'>
                <td>Titulo</td>
                <td>Filial</td>
                <td>Modificar</td>
                <td>Excluir</td>
            </tr>
            </thead>
            <tbody>
            {result.map((value, idx) => {
                return(
            <tr key={idx}>
                <td>{value.titulo}</td>
                <td>{value.filial}</td>
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

export default Setor