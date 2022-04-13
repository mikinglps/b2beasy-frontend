import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../../../contexts/auth'
import Pagination from '../GerenciarUsuarios/Pagination'
import './TarefasProprias.css'

const TarefasProprias = () => {
    const { usuario } = useContext(AuthContext)
    const [ currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [maxPage, setMaxPage] = useState(1)
    const [result, setResult] = useState([])

    useEffect(() => {
        const find = async () => {
        await axios.post(`http://localhost:8080/api/v1/tarefas/find?page=${currentPage}`, {cpf: usuario.cpf})
        .then(res => {
            for(let i = 0; i < res.data.listaTarefas.length; i++){
                axios.post('http://localhost:8080/api/v1/funcionarios/memo/cpf', {cpf: res.data.listaTarefas[i].responsavel})
                .then(response => {
                        res.data.listaTarefas[i].responsavel = response.data.results.nome
                        if(i + 1 == res.data.listaTarefas.length){
                            setResult(res.data.listaTarefas)
                            setMaxPage(res.data.totalPaginas)
                            setLoading(false)
                        }
                        
                    }
                )
            }
        })
        } 
        find()
    }, [currentPage])
    

    return (
        <section className='my-tasks'>
            <table>
                <thead>
                    <tr className='first-tr'>
                        <td>Responsavel</td>
                        <td>Titulo</td>
                        <td>Tarefa</td>
                        <td>Data</td>
                    </tr>
                </thead>
                <tbody>
                    {loading ? null : result.map((value, index) => {
                        return(
                        <tr key={index}>
                            <td>{value.responsavel}</td>
                            <td>{value.titulo}</td>
                            <td>{value.tarefa}</td>
                            <td>{value.quando}</td>
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
export default TarefasProprias;