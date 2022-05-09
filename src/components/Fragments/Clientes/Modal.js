import axios from 'axios';
import React, {useState, useEffect} from 'react';
import './Modal.css'

const Modal = ({id, click, setClick}) => {
    const [nome, setNome] = useState('')
    const [credencial, setCredencial] = useState('')
    const [endereco, setEndereco] = useState('')
    const [fone, setFone] = useState('')

    const save = () => {
        axios.post('http://localhost:8080/api/v1/clientes/edit', {_id: id, nome: nome, credencial: credencial, endereco: endereco, telefone: fone})
        .then(res => {
            setClick(false)
            window.location.reload()
        })
    }

    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/clientes/id', {_id: id})
        .then(response => {
            setNome(response.data.nome)
            setCredencial(response.data.credencial)
            setEndereco(response.data.endereco)
            setFone(response.data.fone)
        })
    }, [])

    return(
        <section className='modal-clientes'>
            <form>
                <label>Cargo: </label>
                <input type='text' value={nome} onChange={(e) => {setNome(e.target.value)}} required/>
                <label>CPF ou CNPJ</label>
                <input type='text' value={credencial} onChange={(e) => {setCredencial(e.target.value)}} required/>
                <label>Endereco</label>
                <input type='text' value={endereco} onChange={(e) => {setEndereco(e.target.value)}} required/>
                <label>Telefone</label>
                <input type='text' value={fone} onChange={(e) => {setFone(e.target.value)}} required />
                <div className='btn-holder'>
                <button type='button' onClick={() => {save()}}>Editar</button><button type='button' onClick={() => {setClick(false)}}>Fechar</button>
                </div>
            </form>
        </section>
    )
}

export default Modal;