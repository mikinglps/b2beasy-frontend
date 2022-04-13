import React, {useState, useEffect, useContext} from "react";
import './Tarefas.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { AuthContext } from "../../../contexts/auth";

const Tarefas = () => {
    const check = <FontAwesomeIcon icon={faCheck} style={{color: 'green', fontSize: '16px', cursor: 'pointer'}}/>
    const { usuario } = useContext(AuthContext)
    const [funcionario, setFuncionario] = useState('')
    const [titulo, setTitulo] = useState('')
    const [tarefa, setTarefa] = useState('')
    const [data, setData] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [todos, setTodos] = useState([])
    const [dataCorreta, setDataCorreta] = useState(null)
    const [designada, setDesignada] = useState(null)


    const addTask = () => {
        axios.post('http://localhost:8080/api/v1/funcionarios/memo/cpf', {cpf: usuario.cpf})
        .then(res => {
                    axios.post('http://localhost:8080/api/v1/tarefas/add', {responsavel: usuario.cpf, usuario: designada, titulo: titulo, tarefa: tarefa, quando: dataCorreta})
                    .then(response => {
                        if(response.data.success){
                            setMensagem('Tarefa adicionada com sucesso!')
                            setTitulo('')
                            setTarefa('')
                            setFuncionario('')
                            setDesignada(null)
                        }
                
            })
        })
        
    }


    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/funcionarios/setor/geral', {nome: funcionario})
        .then(res => {
            for(let i = 0; i < res.data.results.achaFuncionario.length; i++){
                axios.post('http://localhost:8080/api/v1/setor/id', {_id: res.data.results.achaFuncionario[i].setor})
                .then(response => {
                    res.data.results.achaFuncionario[i].setor = response.data.titulo
                    res.data.results.achaFuncionario[i].filial = response.data.filial
                    setTodos(res.data.results.achaFuncionario)
                })
            }
        })
    }, [funcionario])

    useEffect(() => {
        if(data != ''){
        let date = new Date(data.replace(/-/g, '\/'))
                let formatter = Intl.DateTimeFormat('pt-BR',{
                    timeZone: 'America/Sao_Paulo',
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric'
                })
        
                setDataCorreta(formatter.format(date))
            }
    }, [data])

    

    return(
        <section className='tarefas-manager'>
            <h2>Designe uma tarefa</h2>
            {mensagem ? <div className='sucesso'>{mensagem}</div> : null}
            <form id='task-add'>
                <div className='separate'>
                <label>Nome do Funcionario</label>
                <input type='text' value={funcionario} onChange={(e) => {setFuncionario(e.target.value)}} required/>
                <div className='list-users' style={funcionario ? {display: 'block'} : {display: 'none'}}>
                    <table>
                        <thead>
                            <tr className='first-tr'>
                                <td>Nome</td>
                                <td>CPF</td>
                                <td>Setor</td>
                                <td>Filial</td>
                                <td>Selecionar</td>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((value, index) => {
                                return(
                            <tr key={index}>
                                <td>{value.nome}</td>
                                <td>{value.cpf}</td>
                                <td>{value.setor}</td>
                                <td>{value.filial}</td>
                                <td onClick={() => {setDesignada(value.cpf); setFuncionario(value.nome)}}>{check}</td>
                            </tr>
                            )
                            })}
                        </tbody>
                    </table>
                </div>
                </div>
                <div className='separate'>
                <label>Titulo da Tarefa</label>
                <input type='text' value={titulo} onChange={(e) => {setTitulo(e.target.value)}} required/>
                </div>
                <div className='separate'>
                <label>Quando:</label>
                <input type='date' value={data} onChange={(e) => {setData(e.target.value)}} required/>
                </div>
                <div className='separate'>
                <label>Tarefa</label>
                <textarea value={tarefa} onChange={(e) => {setTarefa(e.target.value)}}></textarea>
                </div>
                
                
                <button type='button' onClick={() => {addTask()}}>Adicionar Tarefa</button>
            </form>
        </section>
    )
}

export default Tarefas;