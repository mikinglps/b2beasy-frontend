import React, {useContext, useEffect, useRef, useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import './Modal.css'
import { AuthContext } from '../../../contexts/auth'

const Modal = ({id, clicked, setClicked}) => {
    const check = <FontAwesomeIcon icon={faCheck} style={{color: 'green', fontSize: '16px', cursor: 'pointer'}}/>
    const {usuario} = useContext(AuthContext)
    const [nome, setNome] = useState('')
    const [pesquisaNome, setPesquisaNome] = useState([])
    const [sender, setSender] = useState([])
    const [idPessoa, setIdPessoa] = useState('')

    const encaminhar = () => {
        axios.post('http://localhost:8080/api/v1/encaminhamentos/novo', {documento: id, destinatario: idPessoa, remetente: sender._id })
        .then(res => {
            setClicked(!clicked)
        })
    }

    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/funcionarios/memo/cpf', {cpf: usuario.cpf})
        .then(res => {
            setSender(res.data.results)
        })
    }, [])


    useEffect(() => {
        const fetchData = async (params) => {
            await axios.post('http://localhost:8080/api/v1/funcionarios/setor/geral', {'nome': params})
            .then(res => {
                for(let i = 0; i < res.data.results.achaFuncionario.length; i++){
                    axios.post('http://localhost:8080/api/v1/setor/id', {_id: res.data.results.achaFuncionario[i].setor})
                    .then(response => {
                        res.data.results.achaFuncionario[i].setor = response.data.titulo;
                        setPesquisaNome([...res.data.results.achaFuncionario])
                    })
                }
            })
        } 
        fetchData(nome)
    }, [nome])

    return (
        <div className='modal-share'>
            <form>
                <label>Pesquise pelo nome!</label>
                <input type='text' value={nome} onChange={(e) => setNome(e.target.value)}/> 
                <table>
                    <thead>
                        <tr>
                            <td>Nome</td>
                            <td>Setor</td>
                            <td>Selecionar</td>
                        </tr>
                    </thead>
                    <tbody>
                        {pesquisaNome.map((value, index) => {
                            return(
                            <tr key={index}>
                                <td>{value.nome}</td>
                                <td>{value.setor}</td>
                                <td onClick={() => {setIdPessoa(value._id)}}>{check}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button type='button' onClick={() => {encaminhar()}}>Encaminhar</button>
            </form>
        </div>
    )
}

export default Modal