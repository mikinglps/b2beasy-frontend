import axios from 'axios'
import react, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/auth'
import Pagination from '../GerenciarUsuarios/Pagination'
import './Docrepart.css'

const Docrepart = () => {
    const params = useParams()
    const { usuario } = useContext(AuthContext)
    const [maxPage, setMaxPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [ currentPage, setCurrentPage] = useState(1)
    const [ result, setResult ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ setor, setSetor ] = useState([])
    const regex = /(<([^>]+)>)/ig;

    useEffect(() => {
        const findDocs = async () => {
           await axios.post('http://localhost:8080/api/v1/setor/id', {_id: params.setor})
            .then(res => {
            setSetor(res.data)
            setLoading(false)
        })
        }
        findDocs()
    }, [])

    useEffect(() => {
        const findDocRepart = async () => {
            await axios.post(`http://localhost:8080/api/v1/documentos/setor?page=${currentPage}`, {setor: setor.titulo, filial: setor.filial, classe: params.aba})
            .then(res => {
                setResult([...res.data.listaDoc])
                setMaxPage(res.data.totalPaginas)
        })
        }
        if(!loading){
        findDocRepart()
        }
    },[loading, currentPage])

    useEffect(() => {
        if(!loading){
        let element = document.getElementsByClassName('toggleBar')
        setCurrentPage(1)
        axios.post(`http://localhost:8080/api/v1/documentos/setor?page=${currentPage}`, {setor: setor.titulo, filial: setor.filial, classe: params.aba})
        .then(res => {
            setResult([...res.data.listaDoc])
            setMaxPage(res.data.totalPaginas)
        })
        if(params.aba == 'todos'){
            element[0].classList.add('selected')
            element[1].classList.remove('selected')
            element[2].classList.remove('selected')
            element[3].classList.remove('selected')
            element[4].classList.remove('selected')
        }else if(params.aba == 'memorando'){
            element[0].classList.remove('selected')
            element[1].classList.add('selected')
            element[2].classList.remove('selected')
            element[3].classList.remove('selected')
            element[4].classList.remove('selected')
        }else if(params.aba == 'oficio'){
            element[0].classList.remove('selected')
            element[1].classList.remove('selected')
            element[2].classList.add('selected')
            element[3].classList.remove('selected')
            element[4].classList.remove('selected')
        }else if(params.aba == 'documento'){
            element[0].classList.remove('selected')
            element[1].classList.remove('selected')
            element[2].classList.remove('selected')
            element[3].classList.add('selected')
            element[4].classList.remove('selected')
        }else if(params.aba == 'planilha'){
            element[0].classList.remove('selected')
            element[1].classList.remove('selected')
            element[2].classList.remove('selected')
            element[3].classList.remove('selected')
            element[4].classList.add('selected')
        }
    }
    },[params.aba])

    if(loading){
        return(
            <div className='loading'>Loading</div>
        )
    }

    return(
        <div className='setor-doc'>
            <div className='abas-holder'>
            <ul>
                    <Link to={'/gerenciar/documentos/'+params.setor+'/todos'}>
                    <li className='toggleBar selected'>Todos os documentos</li>
                    </Link>
                    <Link to={'/gerenciar/documentos/'+params.setor+'/memorando'}>
                    <li className='toggleBar'>Memorando</li>
                    </Link>
                    <Link to={'/gerenciar/documentos/'+params.setor+'/oficio'}>
                    <li className='toggleBar'>Oficios</li>
                    </Link>
                    <Link to={'/gerenciar/documentos/'+params.setor+'/documento'}>
                    <li className='toggleBar'>Documentos</li>
                    </Link>
                    <Link to={'/gerenciar/documentos/'+params.setor+'/planilha'}>
                    <li className='toggleBar'>Planilhas</li>
                    </Link>
                </ul>
            </div>
            <table>
                <thead>
                    <tr className='tr-head'>
                        {params.aba == 'todos' ? <td>Tipo</td> : null}
                        {params.aba != 'documento' ? <td>Numero/Assunto</td> : <td>Titulo</td>}
                        <td>Conteudo</td>
                        <td>Data</td>
                        {params.aba == 'documento' ? <td>Outorgado/Destinatario</td> : null}
                    </tr>
                </thead>
                <tbody>
                    {result.map((value, index) => {
                        return(
                            <tr key={index}>
                                {params.aba == 'todos' ? <td>{value.classe}</td> : null }
                                <td>{value.numero != null ? value.numero+' - ' : null}{value.assunto}</td>
                                <td>{value.conteudo.replace(regex, '').substr(0,50)+'...'}</td>
                                <td>{value.data.bd}</td>
                                {params.aba == 'documento' ? <td>{value.destinatario}</td> : null }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='pagination'>
            <Pagination page={currentPage} pages={maxPage} changePage={setCurrentPage}/>
            </div>
        </div>
    )
}

export default Docrepart