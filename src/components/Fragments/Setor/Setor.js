import React, { useState, useEffect, useContext } from 'react'
import './Setor.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {AuthContext} from '../../../contexts/auth'
import { faPenToSquare, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Pagination from '../GerenciarUsuarios/Pagination'

const Setor = () => {

    const modify = <FontAwesomeIcon icon={faPenToSquare} style={{fontSize: '18px', cursor: 'pointer'}} />
    const deleteFilial = <FontAwesomeIcon icon={faDeleteLeft} style={{color: '#bd3c33', fontSize: '18px', cursor: 'pointer'}}/>
    const { usuario } = useContext(AuthContext)
    const [ titulo, setTitulo ] = useState('')
    const [ filial, setFilial ] = useState('')
    const [maxPage, setMaxPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [ currentPage, setCurrentPage] = useState(1)
    const [resultFilial, setResultFilial] = useState([])
    const [ result, setResult ] = useState([])
    const [ error, setError ] = useState(null)

    const sendForm = async (e) => {
        if(filial == ''){
            e.preventDefault()
            setError(<div className='error'>Por favor, preeencha todos os campos!</div>)
        }else{
         await axios.post('http://localhost:8080/api/v1/setor', {titulo, filial})
         .then(res=>{
             setError(null)
             result.push(res.data.results)
         })
         let logs = {
            nome: usuario.nome,
            cpf: usuario.cpf,
            acao: 'O usuario '+usuario.nome+' com CPF '+usuario.cpf+' adicionou o setor '+titulo+' na filial '+filial,
        }
        axios.post('http://localhost:8080/api/v1/logs', {nome: logs.nome, cpf: logs.cpf, acao: logs.acao})
         
        }

        
     }

    useEffect(()=>{
        axios.get('http://localhost:8080/api/v1/filiais/query')
        .then(res=>{
            setResultFilial([...res.data])
        })
    },[])

    useEffect(()=>{
        axios.get('http://localhost:8080/api/v1/setor')
        .then(res=>{
            console.log(res)
            setResult([...res.data.results.listaSetor])
            setMaxPage(res.data.results.totalPaginas)
        })
    },[currentPage])

    return(
        <>
        <section className='addSetor'>
            {error ? error : null}
            <h2> Adicionar Setores </h2>
            <form>
            <label>Titulo do Setor</label>
            <input type='text' value={titulo} onChange={(e) => setTitulo(e.target.value)} required/>
            <label>Filial do Setor</label>
            <select onChange={(e) => setFilial(e.target.value)}>
                <option value="">Selecione uma filial</option>
                {resultFilial.map((value, index) => {
                    return(
                <option key={index} value={value.titulo}>{value.titulo}</option>
                )
                })}
            </select>
            <button type='submit' onClick={sendForm} className='btn-primary'>Cadastrar</button>
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
        <div className='pagination-setor'>
            <Pagination page={currentPage} pages={maxPage} changePage={setCurrentPage} />
        </div>
        </section>
        </>
    )
}

export default Setor