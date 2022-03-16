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
    const [ myEmpresa, setMyEmpresa ] = useState([])
    const [ memoClick, setMemoClick ] = useState(false)
    const dataExtense = new Date()
    const formatterExtense = Intl.DateTimeFormat("pt-BR", {
        timeZone: 'America/Sao_Paulo',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    const extenseFormatted = formatterExtense.format(dataExtense)
    
    const config = {
        readonly: false,
        height: 400
    }




    const handlePdf = useReactToPrint({
        content: () => {
        const components = componentRef.current.cloneNode(true);
        const PrintElem = document.createElement('table')
        const header = 
         `<thead class='logoMemo'>` +
         `<tr><td><img src="${myEmpresa.img}" alt='logo'/></td></tr>`+
         `<tr><td>${myEmpresa.titulo}</td></tr></thead>` //+
        // `<tfoot id='footerMemo' class='footerMemo'>
        //   <tr><td><p>${myEmpresa.endereco}</p></td></tr>
        //   </tfoot>`;
        PrintElem.innerHTML = header
        PrintElem.appendChild(components)
        console.log(PrintElem)
        return PrintElem;
         },
        documentTitle: memo ? memo.memo+' - '+subject : 'Documento',

    })

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
        let formatter = Intl.DateTimeFormat('pt-BR',{
            timeZone: 'America/Sao_Paulo',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        })

        let formatado = formatter.format(date)
        memoNum++
        let sending = memoNum+'/'+date.getFullYear()
        axios.put('http://localhost:8080/api/v1/filiais', {_id: memo._id, memo: sending} )
        axios.post('http://localhost:8080/api/v1/documentos', {
            remetente: usuario.nome,
            cpf: usuario.cpf,
            filialRemetente: myEmpresa.titulo,
            setorRemetente: mySector.titulo,
            destinatario: receiver,
            setorDestinatario: sectorReceiver,
            memoNum: sending,
            assunto: subject,
            conteudo: content,
            data: formatado
        })
        
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
            axios.post('http://localhost:8080/api/v1/filiais/my', {_id: sender.empresa})
            .then(response => {
                setMyEmpresa(response.data)
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
            <button type='button' onClick={() => {handlePdf();}}>PDF</button>
            </div>
        </form>
        </section>
        <div className='holderH2' style={myEmpresa ? {display: 'block'} : {display: 'none'}}>
        <h2>Visualizando</h2>
        </div>
        <div ref={componentRef} className='holdingPrint'>
        <tbody id='documento'  style={myEmpresa ? {display: 'flex'} : {display: 'none'}}>
        
            <tr className='flexMemo'>
                <td>Numero: {memo.memo}</td>
                <td className='dataMemo'>{extenseFormatted}</td>
            </tr>
            <tr className='default'>
                <td>De: {mySector && myEmpresa ? mySector.titulo+' - '+myEmpresa.titulo : null}</td>
            </tr>
            <tr className='default'>
                <td>Para: {receiver} - {sectorReceiver}</td>
            </tr>
            <tr className='default'>
                <td>Assunto: {subject}</td>
            </tr>
            <tr className='conteudo'>
                <td dangerouslySetInnerHTML={{__html: content}}></td>
            </tr>
            
            </tbody>
            <tfoot id='footerMemo' class='footerMemo'>
            
            <tr><td>{ myEmpresa ? myEmpresa.endereco : null}</td></tr>
            </tfoot>
            </div>
        </>
    )
}

export default Memo