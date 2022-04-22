import axios from 'axios'
import React, {useState, useEffect} from 'react'
import './Modify.css'

const Modify = ({id, click, changeClick}) => {
    const [titulo, setTitulo] = useState('')
    const [filial, setFilial] = useState('')
    const [filiais, setFiliais] = useState([])
    const [loading, setLoading] = useState(true)

    const updateSetor = () => {
        axios.post('http://localhost:8080/api/v1/setor/edit', {_id: id, titulo: titulo, filial: filial})
        .then(res => {
            window.location.reload();
        })
    }


    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/setor/id', {_id: id})
        .then(res => {
            setTitulo(res.data.titulo)
            setFilial(res.data.filial)
        })
        axios.get('http://localhost:8080/api/v1/filiais/query')
        .then(res => {
            setFiliais([...res.data])
            setLoading(false)
        })
    },[])



    return (
        <section className='modal-update'>
            <form>
                <label>Titulo</label>
                <input type='text' value={titulo} onChange={(e) => {setTitulo(e.target.value)}} required/>
                <label>Filial</label>
                <select onChange={(e) => {setFilial(e.target.value)}}>
                    <option selected disabled value={filial}>{filial}</option>
                    {loading ? null : filiais.map((value, index) => {
                        return(
                        <option key={index} value={value.titulo}>{value.titulo}</option>
                        )
                    })}
                </select>
                <div className='btn-holder'>
                    <button onClick={() => {changeClick(false); updateSetor()}}>Salvar</button><button onClick={() => {changeClick(false)}}>Cancelar</button>
                </div>
            </form>
        </section>
    )
}
export default Modify