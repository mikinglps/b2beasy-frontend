import axios from 'axios'
import React, { useContext, useEffect, useState, useRef, useCallback } from 'react'
import './Documentos.css'
import { AuthContext } from '../../../contexts/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faCopy} from '@fortawesome/free-solid-svg-icons'
import PdfGen from '../Criar/PdfGen'
import { useParams, Link } from 'react-router-dom'
import Pagination from '../GerenciarUsuarios/Pagination'
import DocumentoPdf from '../Criar/DocumentoPdf'

const Documentos = () => {
    const params = useParams()
    const componentRef = useRef([])
    const { usuario } = useContext(AuthContext)
    const [maxPage, setMaxPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [ currentPage, setCurrentPage] = useState(1)
    const [toggleRef, setToggleRef] = useState('')
    const [ result, setResult ] = useState([])
    const [ click, setClick ] = useState(false)
    const [ abaStyle , setAbaStyle ] = useState('')
    const modify = <FontAwesomeIcon icon={faPenToSquare} style={{fontSize: '18px', cursor: 'pointer'}} />
    const copy = <FontAwesomeIcon icon={faCopy} style={{fontSize: '18px', cursor: 'pointer'}} />


    useEffect(() => {
            setCurrentPage(1)
            const findDocs = async () => {
                await axios.post(`http://localhost:8080/api/v1/${params.arquivo}/find?page=${currentPage}`, {cpf: usuario.cpf})
            .then(res => {
                console.log(res)
                setResult([...res.data.listaDoc])
                setMaxPage(res.data.totalPaginas)
            })
            }

            findDocs()
            let element = document.getElementsByClassName('toggleBar')
            
            if(params.arquivo == 'documentos'){
                element[1].classList.remove('selected')
                element[0].classList.add('selected')
            }else if(params.arquivo == 'rascunhos'){
                element[0].classList.remove('selected')
                element[1].classList.add('selected')
            }
    }, [params])

    useEffect(() => {
        axios.post(`http://localhost:8080/api/v1/${params.arquivo}/find?page=${currentPage}`, {cpf: usuario.cpf})
            .then(res => {
                setResult([...res.data.listaDoc])
                setMaxPage(res.data.totalPaginas)
            })
    },[currentPage])

    return(
        <section className='meusArquivos-cpf'>
            <div className='abas-holder'>
                <ul>
                    <Link to='/gerenciar/meusarquivos/documentos'>
                    <li className='toggleBar' >Meus Arquivos</li>
                    </Link>
                    <Link to='/gerenciar/meusarquivos/rascunhos'>
                    <li className='toggleBar'>Meus Rascunhos</li>
                    </Link>
                </ul>
            </div>
            <table>
                <thead>
                    <tr className='tr-head'>
                        {params.arquivo == 'rascunhos' ? <td>Titulo</td> : <td>Numero / Titulo</td>}
                        <td>Data</td>
                        <td>Para</td>
                        {params.arquivo == 'rascunhos' ? <td>Editar</td> : null}
                        <td>Duplicar</td>
                    </tr>
                </thead>
                <tbody>
                {result.map((value, index) => {
                    return(
                    <tr key={index}>
                        <td className='td-hover' onClick={() => {setClick(!click); setToggleRef(index)}}>{params.arquivo != 'rascunhos' ? value.numero != null ? value.numero+' - ' : null : null}{value.assunto.substr(0,30)}{value.assunto.length > 30 ? '...' : null}</td>
                        <td>{value.data.bd}</td>
                        <td>{value.destinatario.substr(0,30)}{value.destinatario.length > 30 ? '...' : null} - {value.setorDestinatario.substr(0,10)}{value.setorDestinatario.length > 10 ? '...' : null}</td>
                        {params.arquivo == 'rascunhos' ? <td>{modify}</td> : null}
                        <td>{copy}</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
            <div className='pagination'>
            <Pagination page={currentPage} pages={maxPage} changePage={setCurrentPage}/>
            </div>
            <section className='popupMemo' style={click ? {display: 'flex'} : {display: 'none'}}>
                <h4>Deseja abrir o documento?</h4>
                <div className='btn-popup__popupMemo'>
                <button onClick={() => {result[toggleRef].classe != 'documento' ? PdfGen(result[toggleRef]) : DocumentoPdf(result[toggleRef]); setClick(!click)}}>Sim</button><button onClick={() => {setClick(!click)}}>Nao</button>
                </div>
            </section>
        </section>
    )

}

export default Documentos;