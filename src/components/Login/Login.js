import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
    const {autenticado, logar, usuario} = useContext(AuthContext);
    const [cpf, setCpf] = useState("")
    const [senha, setSenha] = useState("")
    const [dados, setDados] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        logar(cpf, senha)
        console.log(usuario)
        
    }

    useEffect(()=>{
        localStorage.setItem('b2beasy-user', JSON.stringify(usuario))
    },[usuario])
    

    return(
        <div className='center'>
            <form className='login--form'>
                <input type='text' value={cpf} placeholder='CPF' onChange={(e) => { setCpf(e.target.value)}}/>
                <input type='password' placeholder='Senha' onChange={(e) => { setSenha(e.target.value) }}/>
                <button className='btn--primary' onClick={handleSubmit}>Logar</button>
            </form>
        </div>
    )
}

export default Login;