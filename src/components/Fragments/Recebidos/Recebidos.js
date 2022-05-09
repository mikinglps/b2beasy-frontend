import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../../contexts/auth';
import Pagination from '../GerenciarUsuarios/Pagination';
import './Recebidos.css'

const Recebidos = () => {
    const { usuario } = useContext(AuthContext)
    const [maxPage, setMaxPage] = useState(1)
    const [ currentPage, setCurrentPage] = useState(1)
    const [result, setResult] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/funcionarios/memo/cpf', {cpf: usuario.cpf})
        .then(res => {
            let newArr = []
            axios.post(`http://localhost:8080/api/v1/encaminhamentos/find?page=${currentPage}`, {usuario: res.data.results._id})
            .then(response => {
                console.log(response);
                for(let i = 0; i < response.data.listaEnc.length; i++){
                    let flag = false;
                    axios.post('http://localhost:8080/api/v1/documentos/id', {_id: response.data.listaEnc[i].documento})
                    .then(resultado => {
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
                                <td>{value.numero ? value.numero : null} {value.assunto}</td>
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
        </section>
    )
}

export default Recebidos;