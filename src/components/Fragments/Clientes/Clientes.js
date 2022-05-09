import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../contexts/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './Clientes.css'
import Modal from './Modal'
import Pagination from '../GerenciarUsuarios/Pagination'

const Clientes = () => {
    const [ error, setError ] = useState(null)
    const { usuario } = useContext(AuthContext)
    const [permissao, setPermissao] = useState('')
    const [ result, setResult ] = useState([])
    const [click, setClick] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [toggle, setToggle] = useState(null)
    const [ titulo, setTitulo ] = useState('')
    const [ credencial, setCredencial ] = useState('')
    const [ endereco, setEndereco ] = useState('')
    const [ fone, setFone ] = useState('')
    const modify = <FontAwesomeIcon icon={faPenToSquare} style={{fontSize: '18px', cursor: 'pointer'}} />
    const deleteFilial = <FontAwesomeIcon icon={faDeleteLeft} style={{color: '#bd3c33', fontSize: '18px', cursor: 'pointer'}}/>

    const sendForm = async (e) => {
        if(credencial == '' || endereco == '' || titulo == ''){
            e.preventDefault()
            setError(<div className='error'>Por favor, preeencha todos os campos!</div>)
        }else{
         await axios.post('http://localhost:8080/api/v1/clientes', {titulo, credencial, endereco, fone})
         .then(res=>{
             setError(null)
             result.push(res.data.results)
         })
         let logs = {
            nome: usuario.nome,
            cpf: usuario.cpf,
            acao: 'O usuario '+usuario.nome+' com CPF '+usuario.cpf+' adicionou o cliente '+titulo,
        }
        axios.post('http://localhost:8080/api/v1/logs', {nome: logs.nome, cpf: logs.cpf, acao: logs.acao})
         
        }

        
     }

     const deleteCliente = (id) => {
         axios.post('http://localhost:8080/api/v1/clientes/delete', {_id: id})
         .then(res => {
             window.location.reload()
         })
     }

    useEffect(() => {
        axios.post(`http://localhost:8080/api/v1/clientes/find?page=${currentPage}`)
        .then(res => {
            setResult(res.data.results.listaCliente)
            setMaxPage(res.data.results.totalPaginas)
        })
    }, [currentPage])

    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/funcionarios/memo/cpf', {cpf: usuario.cpf})
        .then(res => {
            axios.post('http://localhost:8080/api/v1/permissoes/cargo', {cargo: res.data.results.cargo})
            .then(response => {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].setor == null){
                        if(response.data[i].permissao == 1){
                            setPermissao('user')
                        }else if(response.data[i].permissao == 2){
                            setPermissao('mod')
                        }else if(response.data[i].permissao == 3){
                            setPermissao('admin')
                        }
                    }
                }
            })
        })
    },[])

    return(
        <>
        {permissao != 'user' ? <section className='addCliente'>
            {error ? error : null}
            <h2> Adicionar Cliente </h2>
            <form>
            <label>Nome do Cliente</label>
            <input type='text' value={titulo} onChange={(e) => setTitulo(e.target.value)} required/>
            <label>CPF ou CNPJ</label>
            <input type='number' value={credencial} onChange={(e) => setCredencial(e.target.value)} placeholder='Apenas numeros' required/>
            <label>Endereço</label>
            <input type='text' value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
            <label>Telefone</label>
            <input type='number' value={fone} onChange={(e) => setFone(e.target.value)}/>
            <button type='button' onClick={sendForm} className='btn-primary'>Cadastrar</button>
            </form>
        </section> : null}
        <hr/>
        <section className='manageCliente'>
            <h2>Gerenciar Clientes</h2>
        <table>
            <thead>
            <tr className='first-tr'>
                <td>Nome</td>
                <td>CPF/CNPJ</td>
                <td>Endereco</td>
                <td>Telefone</td>
                {permissao != 'user' ? <td>Modificar</td> : null}
                {permissao == 'admin' ? <td>Excluir</td> : null}
            </tr>
            </thead>
            <tbody>
            {result.map((value, idx) => {
                return(
            <tr key={idx}>
                <td>{value.nome}</td>
                <td>{value.credencial}</td>
                <td>{value.endereco}</td>
                <td>{value.fone}</td>
                {permissao != 'user' ? <td onClick={() => {setClick(true); setToggle(value._id)}}>{modify}</td> : null}
                {permissao == 'admin' ? <td onClick={() => {deleteCliente(value._id)}}>{deleteFilial}</td> : null}
            </tr>
            )
            })}
            </tbody>
        </table>
        <div className='pagination'>
            <Pagination page={currentPage} pages={maxPage} changePage={setCurrentPage} />
        </div>
        {click ? <Modal id={toggle} click={click} setClick={setClick}/> : null}
        </section>
        </>
    )
}

export default Clientes