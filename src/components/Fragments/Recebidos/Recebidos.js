import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../../contexts/auth';
import Pagination from '../GerenciarUsuarios/Pagination';
import PdfGen from '../Criar/PdfGen';
import DocumentoPdf from '../Criar/DocumentoPdf';
import './Recebidos.css'

const Recebidos = () => {
    const { usuario } = useContext(AuthContext)
    const [maxPage, setMaxPage] = useState(1)
    const [click, setClick] = useState(false);
    const [toggleRef, setToggleRef] = useState(null)
    const [ currentPage, setCurrentPage] = useState(1)
    const [result, setResult] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/funcionarios/memo/cpf', {cpf: usuario.cpf})
        .then(res => {
            let newArr = []
            axios.post(`http://localhost:8080/api/v1/encaminhamentos/find?page=${currentPage}`, {usuario: res.data.results._id})
            .then(response => {
                for(let i = 0; i < response.data.listaEnc.length; i++){
                    let flag = false;
                    axios.post('http://localhost:8080/api/v1/documentos/id', {_id: response.data.listaEnc[i].documento})
                    .then(resultado => {
                            if(resultado.data.conteudo == 'Arquivo importado, clique para ver.' || resultado.data.classe == 'memorando'){
                                axios.post('http://localhost:8080/api/v1/setor/id', {_id: resultado.data.setorDestinatario})
                                .then(ress => {
                                    resultado.data.setorDestinatario = ress.data.titulo
                                })
                                axios.post('http://localhost:8080/api/v1/setor/id', {_id: resultado.data.setorRemetente})
                                .then(ress => {
                                    resultado.data.setorRemetente = ress.data.titulo
                                })
                                axios.post('http://localhost:8080/api/v1/filiais/my', {_id: resultado.data.destinatario})
                                .then(ress => {
                                    resultado.data.destinatario = ress.data.titulo
                                })
                                axios.post('http://localhost:8080/api/v1/filiais/my', {_id: resultado.data.filialRemetente})
                                .then(ress => {
                                    resultado.data.filialRemetente = ress.data.titulo
                                    resultado.data.municipio = ress.data.municipio
                                    
                                })
                            }else{
                                axios.post('http://localhost:8080/api/v1/filiais/my', {_id: resultado.data.filialRemetente})
                                .then(ress => {
                                    resultado.data.filialRemetente = ress.data.titulo
                                    resultado.data.municipio = ress.data.municipio
                                })
                                axios.post('http://localhost:8080/api/v1/setor/id', {_id: resultado.data.setorRemetente})
                                .then(ress => {
                                    resultado.data.setorRemetente = ress.data.titulo
                                })
                            }
                            newArr.push(resultado.data);
                        })
                    axios.post('http://localhost:8080/api/v1/funcionarios/id', {_id: response.data.listaEnc[i].remetente})
                    .then(ress => {
                        if(newArr[i].de = ress.data.nome){
                            flag = true;
                        }
                        
                        if(flag){
                            setResult([...newArr]);
                        }
                        
                    })
                }
                setMaxPage(response.data.totalPaginas); 
            })
        }) 
    }, [currentPage])

    return(
        <section className='meusArquivos-cpf'>
            <table>
                <thead>
                    <tr className='tr-head'>
                        <td>Numero/Titulo</td>
                        <td>Data de Criacao</td>
                        <td>De</td>
                    </tr>
                </thead>
                <tbody>
                    {result.map((value, index) => {
                        return(
                            <tr key={index}>
                                <td className='td-hover' onClick={() => {setClick(true); setToggleRef(index)}}>{value.numero ? value.numero : null} {value.assunto}</td>
                                <td>{value.data.bd ? value.data.bd : value.data}</td>
                                <td>{value.de}</td>
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
                {result[toggleRef].url ? <a onClick={() => {setClick(false)}} className='buttonClickable' target='_blank' href={result[toggleRef].url}>Sim</a> : <button className='buttonClickable' onClick={() => {setClick(false); result[toggleRef].numero != null ? PdfGen(result[toggleRef]) : DocumentoPdf(result[toggleRef])}}>Sim</button>}
                <button className='buttonClickable' onClick={() => {setClick(!click)}}>Nao</button>
                </div>
            </section>
             : null
            }
        </section>
    )
}

export default Recebidos;