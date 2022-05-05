import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import {AuthContext} from '../../../contexts/auth'
import './Estoque.css'
import Pagination from "../GerenciarUsuarios/Pagination";

const Estoque = () => {
    const { usuario } = useContext(AuthContext)
    const [image, setImage] = useState('')
    const [cod, setCod] = useState('')
    const [titulo, setTitulo] = useState('')
    const [quantidade, setQuantidade] = useState(0)
    const [result, setResult] = useState([])
    const [maxPage, setMaxPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [ currentPage, setCurrentPage] = useState(1)
    const [missing, setMissing] = useState(false)
    const [changed, setChanged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mostrar, setMostrar] = useState(false)
    const [permissao, setPermissao] = useState('')
    const date = new Date()

    const submitForm = async (e) => {
        let fd = new FormData()
        let save = date.getTime()+date.getSeconds()+date.getMilliseconds()+'_'+image.name
        fd.append('cod', cod)
        fd.append('titulo', titulo)
        fd.append('quantidade', quantidade)
        fd.append('imagem', image)
        fd.append('nomeImg', save)
        await axios.post("http://localhost:8080/api/v1/estoque/add", fd, {headers: {"Content-Type": "multipart/form-data" }})
    }

    const handleMissing = () => {
        axios.get('http://localhost:8080/api/v1/estoque/missing')
        .then(res => {
            setResult([...res.data])
        })
        setMissing(true)
    }

    

    const mudarValor = (operacao, index) => {
        if(operacao == '+'){
            let resultado = Number(result[index].quantidade)
            let newArr = [...result]
            let retorno = resultado+=1
            newArr[index].quantidade = retorno
            setResult(newArr)
            setChanged(true)
        }else{
            let resultado = Number(result[index].quantidade)
            let newArr = [...result]
            let retorno = resultado-=1
            newArr[index].quantidade = retorno
            setResult(newArr)
            setChanged(true)
        }
    }

    const confirmChanges = async () => {
        result.map((value, index) => {
            axios.post('http://localhost:8080/api/v1/estoque/quantidade', {_id: value._id, novaQuantidade: value.quantidade})
            .then(res => {
                setLoading(true)
                setChanged(false)
                
            })
        })
        let newArr = [...result]
        setResult(newArr)
        setLoading(false)
    }

    const deletarItem = async (index) => {
        let msg = 'Voce esta prestes a deletar o item '+result[index].titulo+' deseja continuar? Responda com sim ou nao'
        let resposta = prompt(msg).toLowerCase()
        if(resposta == 'sim'){
            axios.post('http://localhost:8080/api/v1/estoque/delete', {_id: result[index]._id}).then(res => {
                result.splice(index, 1)
                let newArr = [...result]
                setResult(newArr);
            })
        }
        
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/estoque?page=${currentPage}`)
        .then(res => {
            console.log(res)
            setResult([...res.data.listaEstoque])
            setMaxPage(res.data.totalPaginas)
        })

        
    },[currentPage])

    useEffect(() => {
        result.find((resultado) => {
            if (resultado.quantidade == 0){
                setMostrar(true)
            }
        })
    },[result])

    useEffect(() => {
        if(loading){
            setLoading(false)
        }
    }, [loading])

    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/funcionarios/memo/cpf', {cpf: usuario.cpf})
        .then(res => {
            axios.post('http://localhost:8080/api/v1/permissoes/cargo', {cargo: res.data.results.cargo})
            .then(response => {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].setor == null){
                        if(response.data[i].permissao == 1){
                            setPermissao('user')
                        }else if(response.data[i].permissao == 2){
                            setPermissao('mod')
                        }else if(response.data[i].permissao == 3){
                            setPermissao('admin')
                        }
                    }
                }
            })
        })
    },[])

    

    return(
        <section className='estoque-management'>
            { permissao != 'user' ? <form onSubmit={submitForm} encType='multipart/formdata' id='inventory'>
                <label>Codigo do Produto</label>
                <input type='text' value={cod} onChange={e => setCod(e.target.value)} required/>
                <label>Titulo</label>
                <input type='text' value={titulo} onChange={e => setTitulo(e.target.value)} required/>
                <label>Quantidade</label>
                <input type='number' value={quantidade} onChange={e => setQuantidade(Number(e.target.value))} required/>
                <label>Selecione uma imagem do produto (somente PNG, JPG e JPEG)</label>
                <input type='file' name='image' onChange={e => setImage(e.target.files[0])} />
                <button type='submit'>Adicionar Produto</button>
            </form> : null}
        
        <hr/>
            {missing ? <div className='retornar'><a href='http://localhost:3000/gerenciar/estoque'>Retornar para o estoque</a></div> : null}
                 
            
            {mostrar ? <div className='missing'>
                            <p>Voce tem itens que acabaram no estoque, <span onClick={() => {handleMissing()}}>clique aqui</span> para ve-los</p>
                        </div> : null}
            <div className='list-estoque'>
                {result.map((value, index) => {
                    return(
                <div className='estoque-single' key={index}>
                    <img src={'http://localhost:8080/'+value.imagem} alt="Foto nao pode ser"/>
                    <p>Codigo: {value.cod}</p>
                    <p>Titulo: {value.titulo}</p>
                    <div className='button-holder-estoque'>
                    {permissao != 'user' ? <button className='altQuant' onClick={() => {mudarValor('+', index);}}>+</button> : null}
                    <span className='quant'>{Number(value.quantidade)}</span>
                    {permissao != 'user' ? <button className='altQuant' onClick={() => {mudarValor('-', index)}}>-</button> : null}
                    {permissao != 'user' ? <button className='secondButton'>Editar</button> : null}
                    {permissao == 'admin' ? <button className='secondButton' onClick={() => {deletarItem(index)}}>Excluir</button> : null}
                    </div>
                </div>
                )
                })}
                
            </div>
            {missing ? null : <div className='pagination-estoque'>
            <Pagination page={currentPage} pages={maxPage} changePage={setCurrentPage}/>
            </div>}
            
            <div className='confirm'>
            {loading ? <div id='loading' className='loading'>Loading...</div> : null}
            {changed ? <button id='changes' onClick={() => {confirmChanges()}}>Confirmar Mudanças</button> : null}
            </div>
        </section>
        
    )
}

export default Estoque