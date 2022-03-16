import axios from 'axios'
import React, { useContext, useEffect, useState, useRef, useCallback } from 'react'
import './Documentos.css'
import { AuthContext } from '../../../contexts/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faCopy} from '@fortawesome/free-solid-svg-icons'
import { useReactToPrint } from 'react-to-print'

const Documentos = () => {
    const componentRef = useRef([])
    const { usuario } = useContext(AuthContext)
    const [toggleRef, setToggleRef] = useState('')
    const [ result, setResult ] = useState([])
    const [ click, setClick ] = useState(false)
    const modify = <FontAwesomeIcon icon={faPenToSquare} style={{fontSize: '18px', cursor: 'pointer'}} />
    const copy = <FontAwesomeIcon icon={faCopy} style={{fontSize: '18px', cursor: 'pointer'}} />


    const handlePdf = useReactToPrint({
        content: () => {
        const components = componentRef.current[toggleRef].cloneNode(true);
        const PrintElem = document.createElement('table')
        const header = 
         `<thead class='logoMemo'>` +
         `<tr><td><img src="${click != '' ? result[toggleRef].imgRemetente : null}" alt='logo'/></td></tr>`+
         `<tr><td>${click != '' ? result[toggleRef].filialRemetente : null}</td></tr></thead>`
        PrintElem.innerHTML = header
        PrintElem.appendChild(components)
        return PrintElem;
         },
        documentTitle: 'Memorando',
    })

    useEffect(() => {
           axios.post('http://localhost:8080/api/v1/documentos/my', {cpf: usuario.cpf})
            .then(res => {
                setResult([...res.data])
            })

            
    }, [])
    useEffect(() => {
        console.log(toggleRef)
    },[click])
    return(
        <section>
            <table>
                <thead>
                    <tr className='tr-head'>
                        <td>Numero / Titulo</td>
                        <td>Data</td>
                        <td>Para</td>
                        <td>Editar</td>
                        <td>Duplicar</td>
                    </tr>
                </thead>
                <tbody>
                {result.map((value, index) => {
                    return(
                        <>
                    <tr key={index}>
                        <td onClick={() => {setClick(!click); setToggleRef(index)}}>{value.numero} - {value.assunto.substr(0,50)}...</td>
                        <td>{value.data}</td>
                        <td>{value.destinatario} - {value.setorDestinatario}</td>
                        <td>{modify}</td>
                        <td>{copy}</td>
                    </tr>
                    <div data={index} ref={el => componentRef.current[index] = el} className='holdingPrint'>
                    <tbody id='documento'>
                    
                        <tr className='flexMemo'>
                            <td>Numero: {value.numero}</td>
                            <td className='dataMemo'>{result.dataLong}</td>
                        </tr>
                        <tr className='default'>
                            <td>De: {value.setorRemetente+' - '+value.filialRemetente}</td>
                        </tr>
                        <tr className='default'>
                            <td>Para: {value.destinatario} - {value.setorDestinatario}</td>
                        </tr>
                        <tr className='default'>
                            <td>Assunto: {value.assunto}</td>
                        </tr>
                        <tr className='conteudo'>
                            <td dangerouslySetInnerHTML={{__html: value.conteudo}}></td>
                        </tr>
                        
                        </tbody>
                        <tfoot id='footerMemo' class='footerMemo'>
                        
                        <tr><td>{value.enderecoRemetente}</td></tr>
                        </tfoot>
                        </div>
                        </>
                    )
                })}
                </tbody>
            </table>
            <section className='popupMemo' style={click ? {display: 'flex'} : {display: 'none'}}>
                <h4>Deseja abrir o memorando?</h4>
                <div className='btn-popup__popupMemo'>
                <button onClick={() => {handlePdf(); setClick(!click)}}>Sim</button><button onClick={() => {setClick(!click)}}>Nao</button>
                </div>
            </section>
        </section>
    )

}

export default Documentos;