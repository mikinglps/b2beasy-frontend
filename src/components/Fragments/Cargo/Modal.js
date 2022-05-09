import axios from 'axios';
import React, {useState, useEffect} from 'react';
import './Modal.css'

const Modal = ({id, click, setClick}) => {
    const [setorId, setSetorId] = useState('');
    const [setor, setSetor] = useState('')
    const [filialId, setFilialId] = useState('');
    const [filial, setFilial] = useState('')
    const [titulo, setTitulo] = useState('');
    const [update, setUpdate] = useState(false);
    const [listaFilial, setListaFilial] = useState([]);
    const [listaSetor, setListaSetor] = useState([]);

    const save = () => {
        axios.post('http://localhost:8080/api/v1/cargos/edit', {_id: id, filial: filialId, setor: setorId, titulo: titulo})
        .then(res => {
            setClick(false);
            window.location.reload();
        })
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/filiais/query')
        .then(response => {
            setListaFilial(response.data)
        })
    }, [])

    useEffect(() => {
        if(update)
        axios.post('http://localhost:8080/api/v1/setor/filial/', {_id: filialId})
        .then(response => {
            setListaSetor(response.data.results)
        })
    }, [filialId])

    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/cargos/id', {_id: id})
        .then(res => {
            setSetorId(res.data.setor)
            setFilialId(res.data.filial)
            setTitulo(res.data.titulo)
            setUpdate(true)
            axios.post('http://localhost:8080/api/v1/filiais/my', {_id: res.data.filial})
            .then(response => {
                setFilial(response.data.titulo);
            })
            axios.post('http://localhost:8080/api/v1/setor/id', {_id: res.data.setor})
            .then(response => {
                setSetor(response.data.titulo)
            })
            axios.post('http://localhost:8080/api/v1/setor/filial/', {_id: res.data.filial})
            .then(response => {
                setListaSetor(response.data.results);
            })
        })
    },[id])

    return(
        <section className='modal-cargo'>
            <form>
                <label>Cargo: </label>
                <input type='text' value={titulo} onChange={(e) => {setTitulo(e.target.value)}} required/>
                <label>Filial: </label>
                <select defaultValue={filialId} onChange={(e) => {setFilialId(e.target.value)}}>
                    <option value={filialId} disabled>{filial}</option>
                    {listaFilial.map((value, index) => {
                        return(
                            <option key={index} value={value._id}>{value.titulo}</option>
                        )
                    })}
                </select>
                <label>Setor: </label>
                <select defaultValue={setorId} onChange={(e) => {setSetorId(e.target.value)}}>
                    <option value={setorId} disabled>{setor}</option>
                    {listaSetor.map((value, index) => {
                        return(
                            <option key={index} value={value._id}>{value.titulo}</option>
                        )
                    })}
                </select>
                <div className='btn-holder'>
                <button type='button' onClick={() => {save()}}>Editar</button><button type='button' onClick={() => {setClick(false)}}>Fechar</button>
                </div>
            </form>
        </section>
    )    
}

export default Modal;