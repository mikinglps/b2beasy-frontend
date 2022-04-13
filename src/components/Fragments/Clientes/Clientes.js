import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../contexts/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './Clientes.css'

const Clientes = () => {
    const [ error, setError ] = useState(null)
    const { usuario } = useContext(AuthContext)
    const [ result, setResult ] = useState([])
    const [ titulo, setTitulo ] = useState('')
    const [ credencial, setCredencial ] = useState('')
    const [ oficio, setOficio ] = useState('')
    const [ endereco, setEndereco ] = useState('')
    const [ fone, setFone ] = useState('')
    const modify = <FontAwesomeIcon icon={faPenToSquare} style={{fontSize: '18px', cursor: 'pointer'}} />
    const deleteFilial = <FontAwesomeIcon icon={faDeleteLeft} style={{color: '#bd3c33', fontSize: '18px', cursor: 'pointer'}}/>

    const sendForm = async (e) => {
        if(credencial == '' || endereco == '' || titulo == ''){
            e.preventDefault()
            setError(<div className='error'>Por favor, preeencha todos os campos!</div>)
        }else{
         await axios.post('http://localhost:8080/api/v1/clientes', {titulo, credencial, oficio, endereco, fone})
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

     useEffect(()=>{
        axios.get('http://localhost:8080/api/v1/clientes')
        .then(res=>{
            setResult([...res.data.results])
        })
    },[result])

    return(
        <>
        <section className='addCliente'>
            {error ? error : null}
            <h2> Adicionar Cliente </h2>
            <form>
            <label>Nome do Cliente</label>
            <input type='text' value={titulo} onChange={(e) => setTitulo(e.target.value)} required/>
            <label>CPF ou CNPJ</label>
            <input type='number' value={credencial} onChange={(e) => setCredencial(e.target.value)} placeholder='Apenas numeros' required/>
            <label>Se for CNPJ, defina o número inicial/atual de ofício</label>
            <input type='number' value={oficio} onChange={(e) => setOficio(e.target.value)} placeholder='Caso deixe em branco ou 0, será inicializado em 0000'/>
            <label>Endereço</label>
            <input type='text' value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
            <label>Telefone</label>
            <input type='number' value={fone} onChange={(e) => setFone(e.target.value)}/>
            <button type='button' onClick={sendForm} className='btn-primary'>Cadastrar</button>
            </form>
        </section>
        <hr/>
        <section className='manageCliente'>
            <h2>Gerenciar Clientes</h2>
        <table>
            <thead>
            <tr className='first-tr'>
                <td>Nome</td>
                <td>CPF/CNPJ</td>
                <td>Modificar</td>
                <td>Excluir</td>
            </tr>
            </thead>
            <tbody>
            {result.map((value, idx) => {
                return(
            <tr key={idx}>
                <td>{value.nome}</td>
                <td>{value.credencial}</td>
                <td>{modify}</td>
                <td onClick={() => {deleteCliente(value._id)}}>{deleteFilial}</td>
            </tr>
            )
            })}
            </tbody>
        </table>
        </section>
        </>
    )
}

export default Clientes