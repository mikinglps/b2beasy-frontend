import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import './Cargo.css';
import Pagination from '../GerenciarUsuarios/Pagination';
import { AuthContext } from '../../../contexts/auth';

const Cargo = () => {
    const modify = <FontAwesomeIcon icon={faPenToSquare} style={{fontSize: '18px', cursor: 'pointer'}} />
    const deleteCargo = <FontAwesomeIcon icon={faDeleteLeft} style={{color: '#bd3c33', fontSize: '18px', cursor: 'pointer'}}/>
    const [titulo, setTitulo] = useState('')
    const { usuario } = useContext(AuthContext) 
    const [filial, setFilial] = useState([])
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(true)
    const [maxPage, setMaxPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [ currentPage, setCurrentPage] = useState(1)
    const [filialAdd, setFilialAdd] = useState()
    const [setor, setSetor] = useState([])
    const [newResult, setNewResult] = useState([])
    const [setorAdd, setSetorAdd] = useState('')
    const [permissao, setPermissao] = useState('')

    useEffect(()=>{
        axios.get('http://localhost:8080/api/v1/filiais/query')
        .then(res => {
            setFilial([...res.data])
    })
    },[])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/cargos?page=${currentPage}`)
        .then(res => {
            for(let i = 0; i < res.data.listaCargo.length; i++ ){
                axios.post('http://localhost:8080/api/v1/setor/id', {_id: res.data.listaCargo[i].setor})
                .then(response => {
                    res.data.listaCargo[i].setor = response.data.titulo
                    if(i + 1 == res.data.listaCargo.length){
                        setResult(res.data.listaCargo);
                        setMaxPage(res.data.totalPaginas)
                        setLoading(false)
                    }
                })
            }
        })
    }, [currentPage])

    const handleChange = async (receiver) => {
        await axios.post('http://localhost:8080/api/v1/setor/filial/', {titulo: receiver})
        .then(res=>{
            setSetor([...res.data.results])
        })
    }

    const adicionaCargo = () => {
        axios.post('http://localhost:8080/api/v1/cargos/add', {titulo: titulo, setor: setorAdd, filial: filialAdd})
    }

    const findSetor = (setor, idx) => {
       axios.post('http://localhost:8080/api/v1/setor/id', {_id: setor})
        .then(res => {
            let newArr = [...result]
            if(res.data.titulo){
                return newArr[idx].setor = res.data.titulo
                
            }
        })
    }

    const delCargo = (id) => {
        let resposta = prompt("Voce deseja deletar esse cargo? Responda com sim ou nao").toLowerCase()
        if(resposta == 'sim'){
            axios.post('http://localhost:8080/api/v1/cargos/delete', {_id: id})
            .then(res => {
            window.location.reload()
            })
        }
        
    }

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
        <section className='cargos-holder'>
            {permissao != 'user' ? 
            <section className='add-cargo'>
                <form id='addCargo'>
                    <div>
                    <label>Cargo</label>
                    <input type='text' value={titulo} onChange={(e) => setTitulo(e.target.value)} required/>
                    </div>
                    <div>
                    <label>Filial</label>
                    <select onChange={(e) => {setFilialAdd(e.target.value); handleChange(e.target.value);}}>
                    <option value=''>Escolha uma filial</option>
                        {filial.map((value, index) => {
                            return(
                                <option key={index} value={value.titulo}>{value.titulo}</option>
                        )})}
                    </select>
                    </div>
                    <div>
                    <label style={filialAdd ? {display: 'block'} : {display: 'none'}}>Setor</label>
                    <select style={filialAdd ? {display: 'block'} : {display: 'none'}} onChange={(e) => setSetorAdd(e.target.value)}>
                        <option value=''>Escolha um setor</option>
                        {setor.map((value, index) => {
                        return(
                            <option key={index} value={value._id}>{value.titulo}</option>
                        )
                        })}
                    </select>
                    </div>
                    <div className='button-holder'>
                        <button type='submit' onClick={() => {adicionaCargo()}}>Adicionar</button>
                    </div>
                </form>
            </section> : null}
            <hr/>
            <section className='cargo-list'>
                <table>
                    <thead>
                        <tr className='first-tr'>
                            <td>Cargo</td>
                            <td>Setor</td>
                            <td>Filial</td>
                            {permissao != 'user' ? <td>Modificar</td> : null}
                            {permissao == 'admin' ? <td>Excluir</td> : null}
                        </tr>
                    </thead>
                    <tbody>
                    {loading ? null : result.map((value, idx) => {
                        return(
                        <tr key={idx}>
                            <td>{value.titulo}</td>
                            <td>{value.setor}</td>
                            <td>{value.filial}</td>
                            {permissao != 'user' ? <td>{modify}</td> : null}
                            {permissao == 'admin' ? <td onClick={() => {delCargo(value._id)}}>{deleteCargo}</td> : null}
                        </tr>
                    )
                    })}
                    </tbody>
                </table>
                <div className='pagination-cargo'>
                    <Pagination page={currentPage} pages={maxPage} changePage={setCurrentPage} />
                </div>
            </section>
        </section>
    )
}

export default Cargo;