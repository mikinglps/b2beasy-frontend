import React, { useState, useEffect, useContext } from 'react'
import './Filial.css'
import { AuthContext } from '../../../contexts/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import Modify from './Modify'
import axios from 'axios'
import Pagination from '../GerenciarUsuarios/Pagination'

const Filial = () => {

    const modify = <FontAwesomeIcon icon={faPenToSquare} style={{fontSize: '18px', cursor: 'pointer'}} />
    const deleteFilial = <FontAwesomeIcon icon={faDeleteLeft} style={{color: '#bd3c33', fontSize: '18px', cursor: 'pointer'}}/>
    const { usuario } = useContext(AuthContext)
    const [maxPage, setMaxPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [click, setClick] = useState(false)
    const [toggle, setToggle] = useState(null)
    const [ currentPage, setCurrentPage] = useState(1)
    const [permissao, setPermissao] = useState('')
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
    const delFilial = (id) => {
        let resposta = prompt("Voce deseja deletar essa filial? Responda com sim ou nao").toLowerCase()
        if(resposta == 'sim'){
            axios.post('http://localhost:8080/api/v1/filiais/delete', {_id: id})
            .then(res => {
            window.location.reload()
            })
        }
        
    }
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/filiais?page=${currentPage}`)
        .then(res => {
            setResult([...res.data.listaFilial])
            setMaxPage(res.data.totalPaginas)
        })
    },[currentPage])

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
        {permissao != 'user' ? <section className='addFilial'>
            <h2> Adicionar Filiais </h2>
            <form>
            <label>Titulo da Filial</label>
            <input type='text' value={titulo} onChange={(e) => setTitulo(e.target.value)} required/>
            <label>CNPJ</label>
            <input type='number' value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder='Apenas numeros' required/>
            <label>Número inicial/atual do memorando</label>
            <p>Caso deixe em branco, sera inicializado com o valor de 0000</p>
            <input type='number' value={memo} onChange={(e) => {setMemo(e.target.value)}}/>
            <button type='submit' onClick={sendForm} className='btn-primary'>Cadastrar</button>
            </form>
        </section> : null}
        <hr/>
        <section className='manageFiliais'>
            <h2>Gerenciar Filiais</h2>
        <table>
            <thead>
            <tr className='first-tr'>
                <td>Titulo</td>
                <td>CNPJ</td>
                {permissao != 'user' ? <td>Modificar</td> : null}
                {permissao == 'admin' ? <td>Excluir</td> : null}
            </tr>
            </thead>
            <tbody>
            {result.map((value, idx) => {
                return(
            <tr key={idx}>
                <td>{value.titulo}</td>
                <td>{value.cnpj}</td>
                {permissao != 'user' ? <td onClick={() => {setClick(true); setToggle(value._id)}}>{modify}</td> : null}
                {permissao == 'admin' ? <td onClick={() => {delFilial(value._id)}}>{deleteFilial}</td> : null}
            </tr>
            )
            })}
            </tbody>
        </table>
        <div className='pagination-filial'>
            <Pagination page={currentPage} pages={maxPage} changePage={setCurrentPage} />
        </div>
        {click ? <Modify id={toggle} click={click} changeClick={setClick} /> : null}
        </section>
        </>
    )
}

export default Filial