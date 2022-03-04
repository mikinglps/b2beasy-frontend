import React from 'react'
import './Modal.css'

const Modal = ({ click, setClick }) => {

    return(
        <section id='overlay' className='overlay' onClick={() => setClick(!click)}>
        <section className='modal-add'>
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
                <label>Setor</label>
                <select>
                    <option>Teste</option>
                    <option>Teste 2</option>
                </select>
                <label>Cargo</label>
                <select>
                    <option>Teste 3</option>
                    <option>Teste 4</option>
                </select>
                <label>Filial / Matriz</label>
                <select>
                    <option>Filial 1</option>
                    <option>Filial 2</option>
                </select>
                <label>Dia de ingresso</label>
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