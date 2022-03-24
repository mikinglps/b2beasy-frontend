import axios from 'axios'
import react, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/auth'
import './Docrepart.css'

const Docrepart = () => {
    const params = useParams()
    const { usuario } = useContext(AuthContext)
    const [ result, setResult ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ setor, setSetor ] = useState([])
    const regex = /(<([^>]+)>)/ig;

    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/setor/id', {_id: params.setor})
        .then(res => {
            setSetor(res.data)
            setLoading(false)
        })
        
    }, [])

    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/documentos/setor', {setor: setor.titulo, filial: setor.filial})
        .then(res => {
            setResult([...res.data])
        })
    },[loading])

    if(loading){
        return(
            <div className='loading'>Loading</div>
        )
    }

    return(
        <div className='setor-doc'>
            <table>
                <thead>
                    <tr className='tr-head'>
                        <td>Tipo</td>
                        <td>Assunto</td>
                        <td>Conteudo</td>
                        <td>Data</td>
                    </tr>
                </thead>
                <tbody>
                    {result.map((value, index) => {
                        return(
                            <tr key={index}>
                                <td>{value.classe}</td>
                                <td>{value.assunto}</td>
                                <td>{value.conteudo.replace(regex, '').substr(0,50)+'...'}</td>
                                <td>{value.data.bd}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Docrepart