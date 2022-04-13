import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../contexts/auth'
import Pagination from '../GerenciarUsuarios/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import './Lembrete.css'

const Lembrete = () => {
    const deleteLembrete = <FontAwesomeIcon icon={faDeleteLeft} style={{color: '#bd3c33', fontSize: '18px', cursor: 'pointer'}}/>
    const { usuario } = useContext(AuthContext)
    const [ titulo, setTitulo ] = useState('')
    const [maxPage, setMaxPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [ currentPage, setCurrentPage] = useState(1)
    const [ descricao, setDescricao ] = useState('')
    const [ data, setData ] = useState('')
    const [ horario, setHorario ] = useState('')
    const [ result, setResult ] = useState([])
    let formatter = Intl.DateTimeFormat("pt-BR", {
        timeZone: 'America/Sao_Paulo',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    })
    const addLembrete = () => {
        const date = new Date(data.replace(/-/g, '\/'))
        const formatado = formatter.format(date)
        axios.post('http://localhost:8080/api/v1/lembretes/add', {titulo: titulo, descricao: descricao, data: formatado, horario: horario, cpf: usuario.cpf})
        setResult([...result])
    }

    const del = (id) => {
        axios.post('http://localhost:8080/api/v1/lembretes/delete', {_id: id})
        .then(res => {
            window.location.reload()
        })
    }

    useEffect( () => {
        axios.post(`http://localhost:8080/api/v1/lembretes/find?page=${currentPage}`, {cpf: usuario.cpf})
        .then(res => {
                setResult([...res.data.listaLembretes])
                setMaxPage(res.data.totalPaginas)
        })
    }, [currentPage])

    return(
        <section className='lembrete-holder'>
            <div className='add-lembrete'>
                <form>
                    <div className='label-holder'>
                    <label>Titulo do Lembrete</label>
                    <input type='text' value={titulo} onChange={e => setTitulo(e.target.value) }required/>
                    </div>
                    <div className='label-holder'>
                    <label>Descrição</label>
                    <textarea value={descricao} onChange={e => setDescricao(e.target.value)} required/>
                    </div>
                    <div className='label-holder'>
                    <label>Data e Hora</label>
                    <input required type='date' value={data} onChange={e => setData(e.target.value)}/> <input required type='time' value={horario} onChange={e => setHorario(e.target.value)}/>
                    </div>
                    <button type='submit' onClick={() => {addLembrete()}}>Adicionar Lembrete</button>
                </form>
            </div>

            <div className='lembrete-list'>
                <table>
                    <thead>
                        <tr className='tr-head'>
                            <td>Titulo</td>
                            <td>Descricao</td>
                            <td>Data/Hora</td>
                            <td>Excluir</td>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((value, index) => {
                            return(
                        <tr>
                            <td>{value.titulo}</td>
                            <td>{value.descricao.substr(0, 50)}</td>
                            <td>{value.data+' - '+value.horario}</td>
                            <td onClick={() => {del(value._id)}}>{deleteLembrete}</td>
                        </tr>
                        )
                        })}
                    </tbody>
                </table>
            </div>
                <div className='pagination'>
                <Pagination page={currentPage} pages={maxPage} changePage={setCurrentPage}/>
                </div>
        </section>
    )
}

export default Lembrete