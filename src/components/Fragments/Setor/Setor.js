import React, { useState, useEffect, useContext } from 'react'
import './Setor.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {AuthContext} from '../../../contexts/auth'
import { faPenToSquare, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Modify from './Modify'
import Pagination from '../GerenciarUsuarios/Pagination'
import { setUncaughtExceptionCaptureCallback } from 'process'

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
    const [toggle, setToggle] = useState(null)
    const [click, setClick] = useState(false)
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
    const delSetor = (id) => {
        let resposta = prompt("Voce deseja deletar esse setor? Responda com sim ou nao").toLowerCase()
        if(resposta == 'sim'){
            axios.post('http://localhost:8080/api/v1/setor/delete', {_id: id})
            .then(res => {
                window.location.reload()
            })
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
            for(let i = 0; i < res.data.results.listaSetor.length; i++){
                axios.post('http://localhost:8080/api/v1/filiais/my', {_id: res.data.results.listaSetor[i].filial})
                .then(response => {
                    res.data.results.listaSetor[i].filial = response.data.titulo
                    if(i + 1 == res.data.results.listaSetor.length){
                        setResult([...res.data.results.listaSetor])
                        setMaxPage(res.data.results.totalPaginas)
                    }
                })
            }
            
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
                <option key={index} value={value._id}>{value.titulo}</option>
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
                <td onClick={() => {setClick(true); setToggle(value._id)}}>{modify}</td>
                <td onClick={() => {delSetor(value._id)}}>{deleteFilial}</td>
            </tr>
            )
            })}
            </tbody>
        </table>
        <div className='pagination-setor'>
            <Pagination page={currentPage} pages={maxPage} changePage={setCurrentPage} />
        </div>
        {
            click ? <Modify id={toggle} click={click} changeClick={setClick}/> : null
        }
        </section>
        </>
    )
}

export default Setor