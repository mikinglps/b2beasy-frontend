import axios from 'axios'
import React, { useContext, useEffect, useState, useRef, useCallback } from 'react'
import './Documentos.css'
import { AuthContext } from '../../../contexts/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faCopy} from '@fortawesome/free-solid-svg-icons'
import PdfGen from '../Criar/PdfGen'
import { useParams, Link } from 'react-router-dom'
// import { useReactToPrint } from 'react-to-print'

const Documentos = () => {
    const params = useParams()
    const componentRef = useRef([])
    const { usuario } = useContext(AuthContext)
    const [toggleRef, setToggleRef] = useState('')
    const [ result, setResult ] = useState([])
    const [ click, setClick ] = useState(false)
    const [ abaStyle , setAbaStyle ] = useState('')
    const modify = <FontAwesomeIcon icon={faPenToSquare} style={{fontSize: '18px', cursor: 'pointer'}} />
    const copy = <FontAwesomeIcon icon={faCopy} style={{fontSize: '18px', cursor: 'pointer'}} />


    useEffect(() => {
           axios.post('http://localhost:8080/api/v1/documentos/my', {cpf: usuario.cpf})
            .then(res => {
                setResult([...res.data])
            })
            let element = document.getElementsByClassName('toggleBar')
            element[1].classList.remove('selected')
            element[0].classList.add('selected')
    }, [])

    useEffect(() => {
        let element = document.getElementsByClassName('toggleBar')
        if(params.arquivo == 'arquivo'){
            axios.post('http://localhost:8080/api/v1/documentos/my', {cpf: usuario.cpf})
            .then(res => {
                setResult([...res.data])
            })
            element[1].classList.remove('selected')
            element[0].classList.add('selected')
        }else if(params.arquivo == 'rascunho'){
            axios.post('http://localhost:8080/api/v1/rascunhos/find', {cpf: usuario.cpf})
            .then(res => {
                console.log(res)
                setResult([...res.data])
            })
            element[0].classList.remove('selected')
            element[1].classList.add('selected')
        }
    },[params])
    return(
        <section className='meusArquivos-cpf'>
            <div className='abas-holder'>
                <ul>
                    <Link to='/gerenciar/meusarquivos/arquivo'>
                    <li className='toggleBar' >Meus Arquivos</li>
                    </Link>
                    <Link to='/gerenciar/meusarquivos/rascunho'>
                    <li className='toggleBar'>Meus Rascunhos</li>
                    </Link>
                </ul>
            </div>
            <table>
                <thead>
                    <tr className='tr-head'>
                        <td>Numero / Titulo</td>
                        <td>Data</td>
                        <td>Para</td>
                        {params.arquivo == 'rascunho' ? <td>Editar</td> : null}
                        <td>Duplicar</td>
                    </tr>
                </thead>
                <tbody>
                {result.map((value, index) => {
                    return(
                    <tr key={index}>
                        <td className='td-hover' onClick={() => {setClick(!click); setToggleRef(index)}}>{value.numero} - {value.assunto.substr(0,50)}...</td>
                        <td>{value.data.bd}</td>
                        <td>{value.destinatario} - {value.setorDestinatario}</td>
                        {params.arquivo == 'rascunho' ? <td>{modify}</td> : null}
                        <td>{copy}</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
            <section className='popupMemo' style={click ? {display: 'flex'} : {display: 'none'}}>
                <h4>Deseja abrir o memorando?</h4>
                <div className='btn-popup__popupMemo'>
                <button onClick={() => {PdfGen(result[toggleRef]); setClick(!click)}}>Sim</button><button onClick={() => {setClick(!click)}}>Nao</button>
                </div>
            </section>
        </section>
    )

}

export default Documentos;