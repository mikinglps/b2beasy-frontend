import React, {useState, useEffect} from 'react'
import './Importar.css'
import axios from 'axios'

const Importar = ({teste, id}) => {
    const [setores, setSetores] = useState([])
    const [fileChange, setFileChange] = useState([])

    const submitForm = () => {
        var formData = new FormData()
        for(let i = 0; i < fileChange.length; i++){
            formData.append('pdfCollection', fileChange[i])
        }
        axios.post('http://localhost:8080/api/v1/documentos/upload', formData)
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/setor/query')
        .then(res => {
            setSetores([...res.data.results])
            console.log(setores)
        })
    }, [])
    useEffect(() => {
        console.log(fileChange)
    },[fileChange])
    return (
        <section className='over'>
        <form id='import-form' onSubmit={() => {submitForm()}}>
            <label>Selecione o tipo de documento que esta importando</label>
            <select>
                <option value='documento'>Documento</option>
                <option value='planilha'>Planilha</option>
                <option value='memorando'>Memorando</option>
                <option value='oficio'>Oficio</option>
            </select>
            <label>Destinatario</label>
            <p>Caso seja um documento sem destinatario, selecione o seu proprio setor</p>
            <select>
                {setores.map((value, index) => {
                    return (
                        <option value={value._id}>{value.titulo} - {value.filial}</option>
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