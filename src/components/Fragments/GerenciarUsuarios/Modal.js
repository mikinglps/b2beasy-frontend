import React, {useState, useEffect} from 'react'
import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Modal = ({ click, setClick }) => {
    const close = <FontAwesomeIcon icon={faCircleXmark} style={{color:'black',fontSize: '18px', cursor: 'pointer'}}/>
    const [filial, setFilial] = useState([])
    const [selectedFilial, setSelectedFilial] = useState(null)
    const [selectedSetor, setSelectedSetor] = useState(null)
    const [selectedCargo, setSelectedCargo] = useState(null)
    const [setor, setSetor] = useState([])
    const [cargo, setCargo] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/filiais/query')
        .then(res => {
            setFilial(res.data)
        })
    }, [])

    useEffect(() => {
        if(selectedFilial != null){
            axios.post('http://localhost:8080/api/v1/setor/filial', {_id: selectedFilial})
            .then(res => {
                setSetor(res.data.results)
            })
        }
    },[selectedFilial])

    useEffect(() => {
        if(selectedSetor != null){
            axios.post('http://localhost:8080/api/v1/cargos/setor', {_id: selectedSetor})
            .then(res => {
                setCargo(res.data)
            })
        }
    })

    return(
        <section id='overlay' className='overlay'>
        <section className='modal-add'>
            <div className='close-holder' onClick={()=>setClick(!click)}>
            {close} <span>Fechar</span>
            </div>
            <h2>Adicionar Novo Funcionario</h2>
            <div className='form-holder'>
            <form>
                <label>Nome</label>
                <input type='text'/>
                <label>CPF</label>
                <input type='text'/>
                <label>Email</label>
                <input type='email'/>
                <label>Telefone/Celular</label>
                <input type='number'/>
                <label>Filial / Matriz</label>
                <select onChange={(e) => {setSelectedFilial(e.target.value)}}>
                    <option value='' selected disabled>Selecione a filial</option>
                    {filial.map((value, index) => {
                        return(
                            <option key={index} value={value._id}>{value.titulo}</option>
                        )
                    })}
                    
                </select>
                <label style={selectedFilial ? {display: 'block'} : {display: 'none'}}>Setor</label>
                <select style={selectedFilial ? {display: 'block'} : {display: 'none'}} onChange={(e) => {setSelectedSetor(e.target.value)}}>
                    <option value='' selected disabled>Selecione o setor</option>
                    {setor.map((value, index) => {
                        return(
                        <option key={index} value={value._id}>{value.titulo}</option>
                        )
                    })}
                </select>
                <label style={selectedSetor ? {display: 'block'} : {display: 'none'}}>Cargo</label>
                <select style={selectedSetor ? {display: 'block'} : {display: 'none'}} onChange={(e) => {setSelectedCargo(e.target.value)}}>
                    <option value='' selected disabled>Selecione o cargo</option>
                    {cargo.map((value, index) => {
                        return(
                        <option key={index} value={value._id}>{value.titulo}</option>
                        )
                    })}
                </select>
                <label>Data de admissao</label>
                <input type='date'/>
                
                <label>Deseja adicionar algum arquivo?</label>
                <input type='file'/>
                <div className='btn-holder'>
                    <button>Gerar Senha</button><button disabled>Cadastrar</button>
                </div>
            </form>
            </div>
        </section>
        </section>
    )
}

export default Modal