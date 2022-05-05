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
    const { usuario } = useContext(AuthContext)
    const [maxPage, setMaxPage] = useState(1)
    const [ currentPage, setCurrentPage] = useState(1)
    const [toggleRef, setToggleRef] = useState('')
    const [ result, setResult ] = useState([])
    const [ click, setClick ] = useState(false)
    const modify = <FontAwesomeIcon icon={faPenToSquare} style={{fontSize: '18px', cursor: 'pointer'}} />
    const copy = <FontAwesomeIcon icon={faCopy} style={{fontSize: '18px', cursor: 'pointer'}} />


    useEffect(() => {
            setCurrentPage(1)
            const findDocs = async () => {
                let newArr = []
                await axios.post(`http://localhost:8080/api/v1/${params.arquivo}/find?page=${currentPage}`, {cpf: usuario.cpf})
                .then(res => {
                for(let i = 0; i < res.data.listaDoc.length; i++){
                    if(res.data.listaDoc[i].conteudo == 'Arquivo importado, clique para ver.' || res.data.listaDoc[i].classe == 'memorando'){
                        axios.post('http://localhost:8080/api/v1/setor/id', {_id: res.data.listaDoc[i].setorDestinatario})
                        .then(response => {
                            res.data.listaDoc[i].setorDestinatario = response.data.titulo
                            
                        })
                        axios.post('http://localhost:8080/api/v1/filiais/my', {_id: res.data.listaDoc[i].destinatario})
                            .then(resposta => {
                                res.data.listaDoc[i].destinatario = resposta.data.titulo
                            })
                        axios.post('http://localhost:8080/api/v1/filiais/my', {_id: res.data.listaDoc[i].filialRemetente})
                        .then(result => {
                            res.data.listaDoc[i].filialRemetente = result.data.titulo
                            res.data.listaDoc[i].municipio = result.data.municipio
                        })
                        axios.post('http://localhost:8080/api/v1/setor/id', {_id: res.data.listaDoc[i].setorRemetente})
                        .then(resultado => {
                            res.data.listaDoc[i].setorRemetente = resultado.data.titulo
                        })
                            newArr.push(res.data.listaDoc[i]);
                    }else if(res.data.listaDoc[i].classe == 'oficio' && res.data.listaDoc[i].conteudo != 'Arquivo importado, clique para ver.'){
                        axios.post('http://localhost:8080/api/v1/filiais/my', {_id: res.data.listaDoc[i].filialRemetente})
                        .then(result => {
                            res.data.listaDoc[i].filialRemetente = result.data.titulo
                            res.data.listaDoc[i].municipio = result.data.municipio
                        })
                        axios.post('http://localhost:8080/api/v1/setor/id', {_id: res.data.listaDoc[i].setorRemetente})
                        .then(resultado => {
                            res.data.listaDoc[i].setorRemetente = resultado.data.titulo
                        })
                        newArr.push(res.data.listaDoc[i])

                    }else if(res.data.listaDoc[i].classe == 'documento'){
                        axios.post('http://localhost:8080/api/v1/filiais/my', {_id: res.data.listaDoc[i].filialRemetente})
                        .then(result => {
                            res.data.listaDoc[i].filialRemetente = result.data.titulo
                            res.data.listaDoc[i].municipio = result.data.municipio
                        })
                        axios.post('http://localhost:8080/api/v1/setor/id', {_id: res.data.listaDoc[i].setorRemetente})
                        .then(resultado => {
                            res.data.listaDoc[i].setorRemetente = resultado.data.titulo
                        })
                        newArr.push(res.data.listaDoc[i])
                    }
                    
                }
                    setResult(newArr);
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
            setResult([...result])
    }, [params])

    useEffect(() => {
        axios.post(`http://localhost:8080/api/v1/${params.arquivo}/find?page=${currentPage}`, {cpf: usuario.cpf})
            .then(res => {
                let newArr = []
                for(let i = 0; i < res.data.listaDoc.length; i++){
                    if(res.data.listaDoc[i].conteudo == 'Arquivo importado, clique para ver.' || res.data.listaDoc[i].classe == 'memorando'){
                        axios.post('http://localhost:8080/api/v1/setor/id', {_id: res.data.listaDoc[i].setorDestinatario})
                        .then(response => {
                            res.data.listaDoc[i].setorDestinatario = response.data.titulo
                            
                        })
                        axios.post('http://localhost:8080/api/v1/filiais/my', {_id: res.data.listaDoc[i].destinatario})
                            .then(resposta => {
                                res.data.listaDoc[i].destinatario = resposta.data.titulo
                            })
                        axios.post('http://localhost:8080/api/v1/filiais/my', {_id: res.data.listaDoc[i].filialRemetente})
                        .then(result => {
                            res.data.listaDoc[i].filialRemetente = result.data.titulo
                            res.data.listaDoc[i].municipio = result.data.municipio
                        })
                        axios.post('http://localhost:8080/api/v1/setor/id', {_id: res.data.listaDoc[i].setorRemetente})
                        .then(resultado => {
                            res.data.listaDoc[i].setorRemetente = resultado.data.titulo
                        })
                            newArr.push(res.data.listaDoc[i]);
                    }else if(res.data.listaDoc[i].classe == 'oficio' && res.data.listaDoc[i].conteudo != 'Arquivo importado, clique para ver.'){
                        axios.post('http://localhost:8080/api/v1/filiais/my', {_id: res.data.listaDoc[i].filialRemetente})
                        .then(result => {
                            res.data.listaDoc[i].filialRemetente = result.data.titulo
                            res.data.listaDoc[i].municipio = result.data.municipio
                        })
                        axios.post('http://localhost:8080/api/v1/setor/id', {_id: res.data.listaDoc[i].setorRemetente})
                        .then(resultado => {
                            res.data.listaDoc[i].setorRemetente = resultado.data.titulo
                        })
                        newArr.push(res.data.listaDoc[i])

                    }else if(res.data.listaDoc[i].classe == 'documento'){
                        axios.post('http://localhost:8080/api/v1/filiais/my', {_id: res.data.listaDoc[i].filialRemetente})
                        .then(result => {
                            res.data.listaDoc[i].filialRemetente = result.data.titulo
                            res.data.listaDoc[i].municipio = result.data.municipio
                        })
                        axios.post('http://localhost:8080/api/v1/setor/id', {_id: res.data.listaDoc[i].setorRemetente})
                        .then(resultado => {
                            res.data.listaDoc[i].setorRemetente = resultado.data.titulo
                        })
                        newArr.push(res.data.listaDoc[i])

                    }
                }
                    setResult(newArr)
                    setMaxPage(res.data.totalPaginas);
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
                        <td>{value.data.bd ? value.data.bd : value.data}</td>
                        <td>{value.destinatario} - {value.setorDestinatario}</td>
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
            { click ?
            <section className='popupMemo' style={click ? {display: 'flex'} : {display: 'none'}}>
                <h4>Deseja abrir o documento?</h4>
                <div className='btn-popup__popupMemo'>
                {result[toggleRef].url ? <a onClick={() => {setClick(!click)}} className='buttonClickable' target='_blank' href={result[toggleRef].url}>Sim</a> : <button className='buttonClickable' onClick={() => {setClick(!click); result[toggleRef].numero != null ? PdfGen(result[toggleRef]) : DocumentoPdf(result[toggleRef])}}>Sim</button>}
                <button className='buttonClickable' onClick={() => {setClick(!click)}}>Nao</button>
                </div>
            </section>
             : null
            }
        </section>
    )

}

export default Documentos;