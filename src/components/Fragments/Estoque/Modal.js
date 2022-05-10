import axios from 'axios';
import React, {useState, useEffect} from 'react';
import './Modal.css'

const Modal = ({id, click, setClick}) => {
    const [cod, setCod] = useState('')
    const [titulo, setTitulo] = useState('')
    const [quantidade, setQuantidade] = useState(0)

    const save = () => {
        axios.post('http://localhost:8080/api/v1/estoque/edit/id', {_id: id, cod: cod, titulo: titulo, quantidade: quantidade})
        .then(res => {
            window.location.reload();
        })
    }

    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/estoque/id', {_id: id})
        .then(res => {
            setCod(res.data.cod)
            setTitulo(res.data.titulo)
            setQuantidade(res.data.quantidade)
        })
    },[])

    return(
        <section className='modal-estoque'>
            <form>
                <label>Codigo: </label>
                <input type='text' value={cod} onChange={(e) => {setCod(e.target.value)}} required/>
                <label>Titulo: </label>
                <input type='text' value={titulo} onChange={(e) => {setTitulo(e.target.value)}} required />
                <label>Quantidade: </label>
                <input type='number' value={quantidade} onChange={(e) => {setQuantidade(e.target.value)}}/>
                <div className='btn-holder'>
                <button type='button' onClick={() => {save()}}>Editar</button><button type='button' onClick={() => {setClick(false)}}>Fechar</button>
                </div>
            </form>
        </section>
    )
}

export default Modal;