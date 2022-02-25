import './App.css';
import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { Login, Painel } from './components'
import { AuthProvider, AuthContext } from './contexts/auth'

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
          <Route path='/' element={<Private><Painel/></Private>}/>
        </Routes>
      </AuthProvider>
    </Router>
    </>
  )
}

export default App;