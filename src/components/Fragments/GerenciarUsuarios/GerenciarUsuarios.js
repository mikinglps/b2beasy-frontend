import './GerenciarUsuarios.css'
import React, {useEffect, useState, useRef, useContext} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenToSquare, faDeleteLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import Pagination from './Pagination'
import Modal from './Modal'
import { AuthContext } from '../../../contexts/auth'

const GerenciarUsuarios = () => {
    const eye = <FontAwesomeIcon icon={faEye} style={{color: 'green', fontSize: '18px', cursor: 'pointer'}}/>
    const edit = <FontAwesomeIcon icon={faPenToSquare} style={{color: 'black', fontSize: '18px', cursor: 'pointer'}}/>
    const deleteUser = <FontAwesomeIcon icon={faDeleteLeft} style={{color: '#bd3c33', fontSize: '18px', cursor: 'pointer'}}/>
    const add = <FontAwesomeIcon icon={faPlus} style={{color: 'white', fontSize: '30px', cursor: 'pointer'}}/>
    const [ loading, setLoading ] = useState(false)
    const [ setores, setSetores ] = useState([])
    const { usuario } = useContext(AuthContext)
    const [permissao, setPermissao] = useState('')
    const [ usuarios, setUsuarios ] = useState([])
    const [ currentPage, setCurrentPage] = useState(1)
    const [ pages, setPages ] = useState(1)
    const [ maxPageNumber, setMaxPageNumber ] = useState(1)
    const [ newClick, setNewClick ] = useState(false)
    const [ params, setParams ] = useState("")
    const [ result, setResult ] = useState([])


    const handleClick = (e) => {
        
        let whichSector = e.currentTarget.parentNode.getAttribute('data-id')
        let search = document.getElementsByClassName('setorfind')
        let whichTable = e.currentTarget.parentNode.children[1];
        let click = search[whichSector].attributes[0].value
        if(click == whichSector){
                if(whichTable.style.display == 'none'){
                    for(var i = 0; i < search.length; i++){
                        if(i == click){
                            search[i].style.display = 'block'
                        }else{
                            search[i].style.display = 'none'
                        }
                    }
                    whichTable.style.display = 'block'
                    findUsers(setores[whichSector]._id, pages)
                }else{
                    whichTable.style.display = 'none'
                }
        }
        
    
        
    }

    

    const findUsers = async (setor, pages) => {
        await axios.post(`http://localhost:8080/api/v1/funcionarios/setor?page=${pages}`, {setor})
        .then(res => {
            setUsuarios([...res.data.results.listaFuncionarios])
            setMaxPageNumber(res.data.results.totalPaginas)
        })
        
    }

    const delUser = (id) => {
        let resposta = prompt("Voce deseja deletar esse usuario? Responda com sim ou nao").toLowerCase()
        if(resposta == 'sim'){
            axios.post('http://localhost:8080/api/v1/funcionarios/delete', {_id: id})
            .then(res => {
                window.location.reload()
            })
        }
    }


    useEffect(()=>{
        axios.get('http://localhost:8080/api/v1/setor/query')
        .then(res => {
        setSetores([...res.data.results])
        setLoading(false)
        })
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

    useEffect(() => {
        const fetchData = async (params) => {
            await axios.post('http://localhost:8080/api/v1/funcionarios/setor/geral', {'nome': params})
            .then((res)=>{
                setResult([...res.data.results.achaFuncionario])
                
            })
        } 
        fetchData(params)
    },[params])

    if(loading){
        return <div className='loading'>Loading</div>
    }
    
    return(
        <>
        {permissao != 'user' ? <section className='createUser'>
        <button className='registerUser' onClick={() => {setNewClick(true)}}>{add}</button>
        </section> : null}
        <div className='searchbar'>
        <label>Encontrar um funcionário</label>
        <input type='text' value={params} onChange={(e) => setParams(e.target.value)} placeholder='Faça sua pesquisa'/>
        <div className='resultsSearchbar' style={params ? {display: 'flex'} : {display: 'none' }}>
        <table>
            <thead>
            <tr className='first-tr'>
                <td>Nome</td>
                <td>Visualizar</td>
                {permissao != 'user' ? <td>Modificar</td> : null}
                {permissao == 'admin' ? <td>Demitir</td> : null}
            </tr>
            </thead>
            <tbody>
                {result.map((data, key) => {
                    if(data.nome != null){
                return(
                <tr key={key}>
                    <td>{data.nome}</td>
                    <td>{eye}</td>
                    {permissao != 'user' ? <td>{edit}</td> : null}
                    {permissao == 'admin' ? <td>{deleteUser}</td> : null}
                </tr>
                    
                )}})}
            </tbody>
        </table>
        </div>
        </div>
        <section className='manageUsers'>
        {setores.map((data, key) => {
            return(   
            <section className='user--single' data-id={key} key={key}>
            <section className='users--sector' onClick={(e) => handleClick(e)}>
            <h2 className='title--sector'>{data.titulo}</h2>
            </section>
                <table style={{display: 'none'}} dataid={key} className='setorfind'>
                    <thead>
                        <tr className='first-tr'>
                            <td>Nome</td>
                            <td>Visualizar</td>
                            {permissao != 'user' ? <td>Editar</td> : null}
                            {permissao == 'admin' ? <td>Demitir</td> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((value, key) => {
                            return(
                        <tr className='tr-properties' key={key}>
                            <td>{value.nome}</td>
                            <td>{eye}</td>
                            {permissao != 'user' ? <td>{edit}</td> : null}
                            {permissao == 'admin' ? <td onClick={() => {delUser(value._id)}}>{deleteUser}</td> : null}
                        </tr>
                        )
                        })}
                    </tbody>
                    <div className='pagination'>
                    <Pagination page={currentPage} pages={maxPageNumber} changePage={setCurrentPage} changeUser={findUsers} setores={setores}/>
                    </div>
                </table>
                
            </section>
            )
            })
         
        }
        </section>
        {newClick ? <Modal click={ newClick } setClick={setNewClick} /> : null}
        </>
    )
}


export default GerenciarUsuarios