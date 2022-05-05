import React, {useEffect, useState, useRef, useContext} from "react";
import { AuthContext } from "../../../contexts/auth";
import DocumentoPdf from "./DocumentoPdf";
import JoditEditor from "jodit-react";
import './Documento.css'
import axios from "axios";

const Documento = () => {
    const { usuario } = useContext(AuthContext)
    const [sender, setSender] = useState([])
    const [ setor, setSetor ] = useState('')
    const [ filial, setFilial ] = useState('')
    const [titulo, setTitulo] = useState('')
    const [endereco, setEndereco] = useState('')
    const [destinatario, setDestinatario] = useState('')
    const [ content, setContent ] = useState('Escreva seu documento!')
    const date = new Date()
    const editor = useRef(null)
    const formatterExtense = Intl.DateTimeFormat("pt-BR", {
        timeZone: 'America/Sao_Paulo',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    const extenseFormatted = formatterExtense.format(date)

    const config = {
        readonly: false,
        height: 800
    }

    const save = () => {
        let formatter = Intl.DateTimeFormat('pt-BR',{
            timeZone: 'America/Sao_Paulo',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        })
        let formatado = formatter.format(date);
        axios.post('http://localhost:8080/api/v1/rascunhos/add', {
            remetente: sender.nome,
            cpf: sender.cpf,
            assunto: titulo,
            conteudo: content,
            numero: null,
            classe: 'documento',
            destinatario: destinatario,
            setorDestinatario: destinatario,
            setorRemetente: setor,
            data: {
                bd: formatado,
                mostrado: extenseFormatted
            },
            filialRemetente: filial._id,
            enderecoRemetente: endereco
        })

        DocumentoPdf({
            conteudo: content,
            filialRemetente: filial.titulo,
            data: {
                bd: formatado,
                mostrado: extenseFormatted
            },
            enderecoRemetente: endereco
        })
    }

    const send = () => {
        let formatter = Intl.DateTimeFormat('pt-BR',{
            timeZone: 'America/Sao_Paulo',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        })
        let formatado = formatter.format(date);
        axios.post('http://localhost:8080/api/v1/documentos/', {
            remetente: sender.nome,
            cpf: sender.cpf,
            assunto: titulo,
            conteudo: content,
            numero: null,
            classe: 'documento',
            destinatario: destinatario,
            setorDestinatario: destinatario,
            setorRemetente: setor,
            data: {
                bd: formatado,
                mostrado: extenseFormatted
            },
            filialRemetente: filial._id,
            enderecoRemetente: endereco
        })

        DocumentoPdf({
            conteudo: content,
            filialRemetente: filial.titulo,
            data: {
                bd: formatado,
                mostrado: extenseFormatted
            },
            enderecoRemetente: endereco
        })

    }


    useEffect(() => {
        const findInfo = async () => {
        await axios.post('http://localhost:8080/api/v1/funcionarios/memo/cpf', {cpf: usuario.cpf})
        .then(res=>{
            setSender(res.data.results)
            axios.post('http://localhost:8080/api/v1/setor/id', {_id: sender.setor})
            .then(res => {
                setSetor(res.data._id)
            })
            axios.post('http://localhost:8080/api/v1/filiais/my', {_id: sender.filial})
            .then(res => {
                setFilial(res.data)
                setEndereco(res.data.endereco)
            })
        })
        }
        findInfo()
        
    },[content])

    return(
        <section className='documento-create-holder'>
            <form id='documento-create'>
                <label>Titulo</label>
                <input type='text' value={titulo} onChange={(e) => {setTitulo(e.target.value)}} required/>
                <label>Destinatario/Outorgado: </label>
                <p id='explanation'>Para enviar documentos para sua própria empresa, salve sem enviar, cheque seus arquivos e encaminhe por lá!</p>
                <input type='text' value={destinatario} onChange={(e) => {setDestinatario(e.target.value)}} required/>
                <JoditEditor ref={editor} value={content}
                    config={config}
                    onBlur={newContent => setContent(newContent)}
                    onChange={(newContent) => {  }}
                    style={{width: '100%'}}
                    />
            <div className='button-holder'>
                <button onClick={() => {save()}}>Salvar</button><button type='submit' onClick={() => {send()}}>Salvar e Enviar</button>
            </div>
            </form>
        </section>
    )
}

export default Documento