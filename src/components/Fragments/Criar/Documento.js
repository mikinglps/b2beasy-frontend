import React, {useEffect, useState, useRef, useContext} from "react";
import { AuthContext } from "../../../contexts/auth";
import JoditEditor from "jodit-react";
import './Documento.css'
import axios from "axios";

const Documento = () => {
    const { usuario } = useContext(AuthContext)
    const [sender, setSender] = useState([])
    const [ setor, setSetor ] = useState('')
    const [ filial, setFilial ] = useState('')
    const [titulo, setTitulo] = useState('')
    const [destinatario, setDestinatario] = useState('')
    const [ content, setContent ] = useState('Escreva seu documento!')
    const date = new Date()
    const editor = useRef(null)

    const config = {
        readonly: false,
        height: 800
    }


    useEffect(() => {
        const findInfo = async () => {
        await axios.post('http://localhost:8080/api/v1/funcionarios/memo/cpf', {cpf: usuario.cpf})
        .then(res=>{
            setSender(res.data.results)
            axios.post('http://localhost:8080/api/v1/setor/id', {_id: sender.setor})
            .then(res => {
                setSetor(res.data.titulo)
            })
            axios.post('http://localhost:8080/api/v1/filiais/my', {_id: sender.filial})
            .then(res => {
                setFilial(res.data.titulo)
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
                <label>Destinatario: </label>
                <p id='explanation'>Para enviar documentos para sua própria empresa, salve sem enviar, cheque seus arquivos e encaminhe por lá!</p>
                <input type='text' value={destinatario} onChange={(e) => {setDestinatario(e.target.value)}} required/>
                <JoditEditor ref={editor} value={content}
                    config={config}
                    onBlur={newContent => setContent(newContent)}
                    onChange={(newContent) => {  }}
                    style={{width: '100%'}}
                    />
            <div className='button-holder'>
                <button>Salvar Rascunho</button><button>Salvar</button>
            </div>
            </form>
        </section>
    )
}

export default Documento