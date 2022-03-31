import './App.css';
import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { Login, Painel } from './components'
import { AuthProvider, AuthContext } from './contexts/auth'
import { CreateRepartition, Repartition, GerenciarUsuarios, Log, Filial, Setor, Memo, Config, Clientes, Documentos, Docrepart, Lembrete, Estoque } from './components/Fragments'

function App() {
  const Private = ({children}) => {
    const { autenticado, loading } = useContext(AuthContext)
    if(loading){
      return <div className='loading'>Loading...</div>
    }
    if(!autenticado){
      return <Navigate to='/login'/>
    }
    return children
   }


  return (
    <>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Private><Painel/></Private>}>
              <Route path='/gerenciar/' element={<Repartition/>}/>
              <Route path='/gerenciar/usuarios' element={<GerenciarUsuarios/>}/>
              <Route path='/gerenciar/log' element={<Log/>}/>
              <Route path='/gerenciar/filial' element={<Filial/>}/>
              <Route path='/gerenciar/setor' element={<Setor/>}/>
              <Route path='/gerenciar/reparticao' element={<CreateRepartition/>}/>
              <Route path='/gerenciar/lembretes' element={<Lembrete/>}/>
              <Route path='/gerenciar/cliente' element={<Clientes/>}/>
              <Route path='/gerenciar/documentos/:setor/:aba' element={<Docrepart/>}/>
              <Route path='/gerenciar/meusarquivos/:arquivo' element={<Documentos/>}/>
              <Route path='/gerenciar/estoque' element={<Estoque/>}/>
              <Route path='/criar/memorando' element={<Memo/>}/>
              <Route path='/config' element={<Config/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
    </>
  )
}

export default App;