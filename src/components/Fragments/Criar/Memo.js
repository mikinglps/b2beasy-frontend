import React, { useContext, useEffect, useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
import './Memo.css'
import axios from 'axios'
import { AuthContext } from '../../../contexts/auth'
import {useReactToPrint} from 'react-to-print';

const Memo = () => {
    const componentRef = useRef()
    const editor = useRef(null)
    const { usuario } = useContext(AuthContext)
    const [ content, setContent ] = useState('Escreva sua mensagem!')
    const [ subject, setSubject ] = useState('')
    const [ receiver, setReceiver ] = useState('')
    const [ branch, setBranch ] = useState([])
    const [ sector, setSector ] = useState([])
    const [ sectorReceiver, setBranchReceiver ] = useState('')
    const [ memo, setMemo ] = useState('')
    const [ sender, setSender ] = useState('')
    const [ mySector, setMySector ] = useState('')
    
    const config = {
        readonly: false,
        height: 400
    }

    let parse = new DOMParser();
    let doc = parse.parseFromString(content, 'text/html')


    const handlePdf = useReactToPrint({
        content: () => componentRef.current,
    }) //=> {
        // const fullInfo = [{
        //     assunto: subject ? subject : null,
        //     destinatario: receiver ? receiver : null,
        //     cargoDestinado: sectorReceiver ? sectorReceiver : null,
        //     de: mySector ? mySector : null,
        //     mensagem: content ? content : null
        // }]

    //}

    const handleChange = async (receiver) => {
        await axios.post('http://localhost:8080/api/v1/setor/filial/', {titulo: receiver})
        .then(res=>{
            setSector([...res.data.results])
        })
        axios.post('http://localhost:8080/api/v1/filiais/select', {titulo: receiver})
        .then(res=>{
            setMemo(res.data)
        })
        axios.post('http://localhost:8080/api/v1/funcionarios/memo/cpf', {cpf: usuario.cpf})
        .then(res=>{
            setSender(res.data.results)
        })
        
        
    }

    const send = (e) => {
        let memoNum = parseInt(memo.memo)
        let date = new Date()
        let formatter = Intl.DateTimeFormat("pt-BR", {
            timeZone: 'America/Sao_Paulo',
            month: 'numeric',
            year: 'numeric'
        })
        let formatado = formatter.format(date)
        formatado = formatado.replaceAll('/','')
        memoNum++
        if(memoNum < 10){
            memoNum = formatado+'000'+memoNum
        }else if(memoNum < 100 && memoNum >= 10){
            memoNum = formatado+'00'+memoNum
        }else if(memoNum < 1000 && memoNum >= 100){
            memoNum = formatado+'0'+memoNum
        }
        axios.put('http://localhost:8080/api/v1/filiais', {_id: memo._id, memo: memoNum} )
        
    }

    useEffect(()=>{
        axios.get('http://localhost:8080/api/v1/filiais')
        .then(res => {
            setBranch([...res.data])
    })
        
    },[])

    useEffect(() => {
            axios.post('http://localhost:8080/api/v1/setor/id', {_id: sender.setor})
                    .then(response=>{
                        setMySector(response.data)
                    })
    },[sender])

    return(
        <>
        <section className='memo-holder'>
            <h2>Criar Memorando!</h2>
        <form className='memoform'>
            <label>Assunto: </label>
            <input value={subject} onChange={(e) => {setSubject(e.target.value)}} type='text'/>
            <label>Destinatario</label>
            <select onChange={(e) => { setReceiver(e.target.value); handleChange(e.target.value);}}>
                    <option value=''>Selecione uma Filial</option>
                {branch.map((value, index) => {
                    return(
                    <option key={index} value={value.titulo}>{value.titulo} - {value.cnpj}</option>
                    )
                })}
                
            </select>
            <label style={receiver !== '' ? {display: 'block'} : {display: 'none'}}>Setor do Destinatario</label>
            <select style={receiver !== '' ? {display: 'block'} : {display: 'none'}} onChange={(e) => {setBranchReceiver(e.target.value)}} >
                <option value=''>Selecione setor destino</option>
                {sector.map((value, index) => {
                    return(
                    <option key={index} value={value.titulo}>{value.titulo}</option>
                    )
                    })}
            </select>

            <label>Mensagem</label>
            <JoditEditor ref={editor} value={content}
            config={config}
            onBlur={newContent => setContent(newContent)}
            onChange={(newContent) => {  }}
            style={{width: '100%'}}
            />
            <div className='button-handler'>
            <button type='button'>Salvar</button> <button onClick={(e)=>{send(e)}}>Enviar Memorando</button>
            <button type='button' onClick={handlePdf}>PDF</button>
            </div>
        </form>
        <div id='documento' ref={componentRef}>
            <h2>De: {mySector ? mySector.titulo : null}</h2>
            <h2>Para: {receiver} - {sectorReceiver}</h2>
            <h2>Assunto: {subject}</h2>
            <div className='conteudo' dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
        </section>
        </>
    )
}

export default Memo