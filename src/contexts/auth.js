import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const [ usuario, setUsuario ] = useState(null)
    const [loading, setLoading] = useState(true)

    
    const logar = async (cpf, senha) => {
    await axios.post('http://localhost:8080/api/v1/funcionarios', {cpf, senha})
      .then(res  => {
        if(typeof(res.data) !== 'object'){
            return <div className='erro'><p>{res.data}</p></div>
        }else{
            setUsuario({ cpf: res.data.achaFuncionario.cpf, token: res.data.token })
            navigate('/')
        }
        })
      }

      useEffect(() => {
        const recoverUser = localStorage.getItem('b2beasy-user')
        if(recoverUser){
            setUsuario('b2beasy-user', JSON.parse(recoverUser))
        }
        setLoading(false)
    }, [])
    
    return (
    <AuthContext.Provider value={{ autenticado: !!usuario, usuario, loading, logar }}>
        {children}
    </AuthContext.Provider>
    )
}