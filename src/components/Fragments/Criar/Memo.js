import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
import './Memo.css'

const Memo = () => {
    const editor = useRef(null)
    const [ content, setContent ] = useState('Escreva sua mensagem')
    const [ assunto, setAssunto ] = useState('')
    const [ destinatario, setDestinatario ] = useState('')
    const config = {
        readonly: false,
        height: 400
    }

    const handleUpdate = (e) => {
        const editorContent = e.target.value
        setContent(editorContent)
    }

    return(
        <>
        <section className='memo-holder'>
            <h2>Crie seu memorando!</h2>
        <form className='memoform'>
            <label>Assunto: </label>
            <input type='text'/>
            <label>Destinatario</label>
            <select>
                <option>Filial 1</option>
                <option>Filial 2</option>
            </select>
            <label>Setor da Filial</label>
            <select>
                <option>Setor da Filial</option>
            </select>

            <label>Mensagem</label>
            <JoditEditor ref={editor} value={content}
            config={config}
            onBlur={handleUpdate}
            onChange={(newContent) => {  }}
            style={{width: '100%'}}
            />
            <div className='button-handler'>
            <button>Gerar Numero</button> <button>Enviar Memorando</button>
            </div>
        </form>
        </section>
        </>
    )
}

export default Memo