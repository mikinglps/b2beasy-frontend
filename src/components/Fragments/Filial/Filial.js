import React, { useState, useEffect, useContext } from 'react'
import './Filial.css'
import { AuthContext } from '../../../contexts/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Filial = () => {

    const modify = <FontAwesomeIcon icon={faPenToSquare} style={{fontSize: '18px', cursor: 'pointer'}} />
    const deleteFilial = <FontAwesomeIcon icon={faDeleteLeft} style={{color: '#bd3c33', fontSize: '18px', cursor: 'pointer'}}/>
    const { usuario } = useContext(AuthContext)
    const [ titulo, setTitulo ] = useState('')
    const [ cnpj, setCnpj ] = useState('')
    const [result, setResult] = useState([])
    const [ memo, setMemo ] = useState('0000')

    const sendForm = async () => {
        await axios.post('http://localhost:8080/api/v1/filiais', {titulo, cnpj, memo})
        .then(res=>{
            result.push(res.data)
            
        })
        let logs = {
            nome: usuario.nome,
            cpf: usuario.cpf,
            acao: 'O usuario '+usuario.nome+' com CPF '+usuario.cpf+' adicionou a filial '+titulo
        }
        axios.post('http://localhost:8080/api/v1/logs', {nome: logs.nome, cpf: logs.cpf, acao: logs.acao})
         
        }
        

    useEffect(()=>{
        axios.get('http://localhost:8080/api/v1/filiais')
        .then(res=>{
            setResult([...res.data])
        })
    },[result])

    return(
        <>
        <section className='addFilial'>
            <h2> Adicionar Filiais </h2>
            <form>
            <label>Titulo da Filial</label>
            <input type='text' value={titulo} onChange={(e) => setTitulo(e.target.value)} required/>
            <label>CNPJ</label>
            <input type='number' value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder='Apenas numeros' required/>
            <label>Número inicial/atual do memorando</label>
            <p>Caso deixe em branco, sera inicializado com o valor de 0000</p>
            <input type='number' value={memo} onChange={(e) => {setMemo(e.target.value)}}/>
            <button type='button' onClick={sendForm} className='btn-primary'>Cadastrar</button>
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