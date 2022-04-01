import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Log.css'
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import PdfGen from './PdfGen'
import Pagination from '../GerenciarUsuarios/Pagination'
const Log = () => {
    const pdfstyle = <FontAwesomeIcon icon={faFilePdf} style={{color: 'white', fontSize: '18px', cursor: 'pointer'}}/>
    const eye = <FontAwesomeIcon icon={faEye} style={{color: 'green', fontSize: '18px', cursor: 'pointer'}}/>
    const [maxPage, setMaxPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [ currentPage, setCurrentPage] = useState(1)
    const [result, setResult] = useState([])
    const [click, setClick] = useState(false)
    const [acao, setAcao] = useState('')

    useEffect(()=>{
        const findLogs = async () => {
            await axios.get(`http://localhost:8080/api/v1/logs?page=${currentPage}`).
            then(res=>{
                console.log(res)
                setResult([...res.data.results.listaLog])
                setMaxPage(res.data.results.totalPaginas)
                
            })
            }

        findLogs()
        
    },[currentPage])

    return(
        <>
        <section className='actionLogs'>
        <div className='pdf-holder'>
        <button className='pdf-button' onClick={() => {PdfGen(result)}}>{pdfstyle} Gerar PDF</button>
        </div>
        <table>
            <thead>
            <tr className='first-tr'>
                <td>Usuario</td>
                <td>CPF</td>
                <td>Horário</td>
                <td>Ação</td>
                <td>Ver Mais</td>
            </tr>
            </thead>
            <tbody>
                {result.map((value, index) => {
                return( 
                <tr>
                    <td>{value.nome}</td>
                    <td>{value.cpf}</td>
                    <td>{value.data}</td>
                    <td>{value.acao.substring(0,100)}</td>
                    <td onClick={() => {setClick(true); setAcao(value.acao)}}>{eye}</td>
                </tr>
                )}
                )}
            </tbody>
        </table>
        <div className='pagination-log'>
        <Pagination page={currentPage} pages={maxPage} changePage={setCurrentPage} />
        </div>
        </section>
        {click ? <Modal acao={acao} clicked={click} newClick={setClick} /> : null}
        </>
    )
}

export default Log