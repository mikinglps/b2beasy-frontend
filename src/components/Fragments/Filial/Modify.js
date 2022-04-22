import axios from 'axios'
import React, {useState, useEffect} from 'react'
import './Modify.css'

const Modify = ({id, click, changeClick}) => {
    const [titulo, setTitulo] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [num, setNum] = useState('')
    const [endereco, setEndereco] = useState('')
    const [municipio, setMunicipio] = useState('') 
    const [loading, setLoading] = useState(true)

    const updateFilial = () => {
        let memoNum = parseInt(num)
        let date = new Date()
        let sending = memoNum+'/'+date.getFullYear()
        axios.post('http://localhost:8080/api/v1/filiais/edit', {_id: id, titulo: titulo, cnpj: cnpj, num: sending, endereco: endereco, municipio: municipio})
        .then(res => {
            window.location.reload();
        })
    }


    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/filiais/my', {_id: id})
        .then(res => {
            setTitulo(res.data.titulo)
            setCnpj(res.data.cnpj)
            setNum(res.data.memo)
            setEndereco(res.data.endereco)
            setMunicipio(res.data.municipio)
        })
    },[])



    return (
        <section className='modal-update-filial'>
            <form>
                <label>Titulo</label>
                <input type='text' value={titulo} onChange={(e) => {setTitulo(e.target.value)}} required/>
                <label>CNPJ</label>
                <input type='number' value={cnpj} onChange={(e) => {setCnpj(e.target.value)}} required/>
                <label>Numero do memorando atual</label>
                <p>Preencha apenas com o numero, nao coloque o ano</p>
                <input type='text' value={num} onChange={(e) => {setNum(e.target.value)}} required/>
                <label>Endereco</label>
                <input type='text' value={endereco} onChange={(e) => {setEndereco(e.target.value)}} required />
                <label>Municipio</label>
                <input type='text' value={municipio} onChange={(e) => {setMunicipio(e.target.value)}} required />
                <div className='btn-holder'>
                    <button onClick={() => {changeClick(false); updateFilial()}}>Salvar</button><button onClick={() => {changeClick(false)}}>Cancelar</button>
                </div>
            </form>
        </section>
    )
}
export default Modify