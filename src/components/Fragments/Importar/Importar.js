import React, {useState, useEffect, useContext} from 'react'
import './Importar.css'
import axios from 'axios'
import { AuthContext } from '../../../contexts/auth'

const Importar = ({id}) => {
    const { usuario } = useContext(AuthContext)
    const [setores, setSetores] = useState([])
    const [classe, setClasse] = useState('')
    const [setor, setSetor] = useState('')
    const [info, setInfo] = useState([])
    const [usuarioFull, setUsuarioFull] = useState([])
    const [setorFull, setSetorFull] = useState([])
    const [fileChange, setFileChange] = useState([])

    const submitForm = () => {
        var date = new Date()
        let formatter = Intl.DateTimeFormat('pt-BR',{
            timeZone: 'America/Sao_Paulo',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        })
        let formatado = formatter.format(date);
        var formData = new FormData()
        formData.append('remetente', usuarioFull.nome)
        formData.append('cpf', usuario.cpf)
        formData.append('filialRemetente', info.filial)
        formData.append('setorRemetente', info._id)
        formData.append('destinatario', setorFull.filial)
        formData.append('setorDestinatario', setorFull._id)
        formData.append('assunto', "Arquivo importado")
        formData.append('conteudo', "Arquivo importado, clique para ver.")
        formData.append('data', formatado)
        formData.append('classe', classe)
        for(let i = 0; i < fileChange.length; i++){
            formData.append('pdfCollection', fileChange[i])
        }
        axios.post('http://localhost:8080/api/v1/documentos/upload', formData)
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/setor/query')
        .then(res => {
            for(let i = 0; i < res.data.results.length; i++){
                axios.post('http://localhost:8080/api/v1/filiais/my', {_id: res.data.results[i].filial})
                .then(response => {
                    res.data.results[i].filial = response.data.titulo;
                    setSetores([...res.data.results])
                })
            }
            
        })
        axios.post('http://localhost:8080/api/v1/funcionarios/memo/cpf', {cpf: usuario.cpf})
        .then(res => {
            setUsuarioFull(res.data.results)
        })
    }, [])

    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/setor/id', {_id: setor})
        .then(res => {
            setSetorFull(res.data)
        })

        axios.post('http://localhost:8080/api/v1/setor/id', {_id: id})
        .then(response => {
            setInfo(response.data)
        })
    },[setor])
    return (
        <section className='over'>
        <form id='import-form' onSubmit={() => {submitForm()}}>
            <label>Selecione o tipo de documento que esta importando</label>
            <select onChange={(e) => {setClasse(e.target.value)}}>
                <option value=''>Escolha um tipo de documento</option>
                <option value='documento'>Documento</option>
                <option value='planilha'>Planilha</option>
                <option value='memorando'>Memorando</option>
                <option value='oficio'>Oficio</option>
            </select>
            <label>Destinatario</label>
            <p>Caso seja um documento sem destinatario, selecione o seu proprio setor</p>
            <select onChange={(e) => {setSetor(e.target.value)}}>
                {setores.map((value, index) => {
                    return (
                        <option key={index} value={value._id}>{value.titulo} - {value.filial}</option>
                    )
                })}
                
            </select>
            <label>Selecione um documento do tipo PDF</label>
            <input multiple type='file' onChange={(e) => {setFileChange(e.target.files)}}
                />
            <input type='submit' value='Enviar'/>
        </form>
        </section>
    )
}

export default Importar