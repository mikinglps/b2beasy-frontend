import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Log.css'
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import PdfGen from './PdfGen'
const Log = () => {
    const pdfstyle = <FontAwesomeIcon icon={faFilePdf} style={{color: 'white', fontSize: '18px', cursor: 'pointer'}}/>
    const eye = <FontAwesomeIcon icon={faEye} style={{color: 'green', fontSize: '18px', cursor: 'pointer'}}/>
    const [result, setResult] = useState([])
    const [click, setClick] = useState(false)
    const [acao, setAcao] = useState('')

    useEffect(()=>{
        const findLogs = async () => {
            await axios.get('http://localhost:8080/api/v1/logs').
            then(res=>{
                setResult([...res.data.results.findlogs])
                
            })
            }

        findLogs()
        
    },[])

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
        </section>
        {click ? <Modal acao={acao} clicked={click} newClick={setClick} /> : null}
        </>
    )
}

export default Log