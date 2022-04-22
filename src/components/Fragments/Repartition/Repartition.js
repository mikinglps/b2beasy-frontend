import React, { useContext, useEffect, useState } from 'react'
import './Repartition.css'
import { Link } from 'react-router-dom'
import { PainelContext } from '../../../contexts/PainelContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Importar from '../Importar/Importar'
import { faListCheck, faFolder, faBriefcase, faLock, faBuilding, faUpload, faChartBar, faUsers, faChartPie, faGear, faFireFlameCurved, faBoxesStacked } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const manage = <FontAwesomeIcon icon={faUsers} style={{color: 'black', fontSize: '22px'}}/>
const log = <FontAwesomeIcon icon={faChartBar} style={{color: 'black', fontSize: '22px'}}/>
const filiais = <FontAwesomeIcon icon={faBuilding} style={{color: 'black', fontSize: '22px'}}/>
const lock = <FontAwesomeIcon icon={faLock} style={{color: 'black', fontSize: '22px'}}/>
const office = <FontAwesomeIcon icon={faBriefcase} style={{color: 'black', fontSize: '22px'}}/>
const importar = <FontAwesomeIcon icon={faUpload} style={{color: 'black', fontSize: '22px'}}/>
const task = <FontAwesomeIcon icon={faListCheck} style={{color: 'black', fontSize: '22px'}}/>
const folder = <FontAwesomeIcon icon={faFolder} style={{color: 'black', fontSize: '22px'}}/>
const sector = <FontAwesomeIcon icon={faChartPie} style={{color: 'black', fontSize: '22px'}}/>
const options = <FontAwesomeIcon icon={faGear} style={{color: 'black', fontSize: '22px'}}/>
const customer = <FontAwesomeIcon icon={faFireFlameCurved} style={{color: 'black', fontSize: '22px'}}/>
const inventory = <FontAwesomeIcon icon={faBoxesStacked} style={{color: 'black', fontSize: '22px'}}/>


const Repartition = () => {
    const [importer, setImportar] = useState(false)
    const [toggleImport, setToggleImport] = useState(null)
    const { resultProfile } = useContext(PainelContext)
    const result = resultProfile()
    const [setores, setSetores] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
      let element = document.getElementsByClassName('rounded')
      
      for(var i = 0, length = element.length; i < length; i++){
         if(result){
            element[i].style.width = '60px'
            element[i].style.height = '60px'
         }else{
            element[i].style.width = '60px'
            element[i].style.height = '60px'
         }
      }
      
    },[result])

    useEffect(() => {
      axios.get('http://localhost:8080/api/v1/setor/query')
      .then(res => {
         setSetores([...res.data.results])
      })
      setLoading(false)
    },[loading])

    if(loading){
       return(
          <div className='loading'>Loading...</div>
       )
    }

    return(
         <>
        <div className='containerRepartition'>  
            <div className='single--rep--cnpj'>
            <p>Gerenciar</p>
            <div className='icons--rep--cnpj'>
               <Link to='/gerenciar/log' style={{textDecoration: 'none', textAlign: 'center'}}>
               <div className='rounded--cnpj'>
                  {log}
               </div>
               <p>Log</p>
               </Link>
               <Link to='/gerenciar/tarefas' style={{textDecoration: 'none', textAlign: 'center'}}>
               <div className='rounded--cnpj'>
                  {task}
               </div>
               <p>Tarefas</p>
               </Link>
               <Link to='/gerenciar/cargos' style={{textDecoration: 'none', textAlign: 'center'}}>
               <div className='rounded--cnpj'>
                  {office}
               </div>
               <p>Cargos</p>
               </Link>
               <div className='rounded--cnpj'>
                  {lock}
               </div>
               <p>Permissões</p>
               <Link to='/gerenciar/cliente' style={{textDecoration: 'none', textAlign: 'center'}}>
               <div className='rounded--cnpj'>
                  {customer}
               </div>
               <p>Clientes</p>
               </Link>
               <Link to='/gerenciar/estoque' style={{textDecoration: 'none', textAlign: 'center'}}>
               <div className='rounded--cnpj'>
                  {inventory}
               </div>
               <p>Estoque</p>
               </Link>
               <Link to='/gerenciar/filial' style={{textDecoration: 'none', textAlign: 'center'}}>
               <div className='rounded--cnpj'>
                  {filiais}
               </div>
               <p>Filiais</p>
               </Link>
               <Link to='/gerenciar/setor' style={{textDecoration: 'none', textAlign: 'center'}}>
               <div className='rounded--cnpj'>
                  {sector}
               </div>
               <p>Setores</p>
               </Link>
               <Link to='/gerenciar/usuarios' style={{textDecoration: 'none', textAlign: 'center'}}>
               <div className='rounded--cnpj'>
                  {manage}
               </div>
               <p>Gerenciar Usuarios</p>
               </Link>
               <Link to='/config' style={{textDecoration: 'none', textAlign: 'center'}}>
               <div className='rounded--cnpj'>
                  {options}
               </div>
               <p>Opções</p>
               </Link>
               </div>
               </div>
            {setores.map((value, index) => {
               return(
               <div className='single--rep' key={index}>
            <p>{value.titulo+' - '+value.filial}</p>
            <div className='icons--rep'>
            <Link to={'/gerenciar/documentos/'+value._id+'/todos'} style={{textDecoration: 'none', textAlign: 'center'}}>
               <div className='rounded'>
                  {folder}
               </div>
               <p>Documentos</p>
               </Link>
            
               <div className='rounded' onClick={() => {setImportar(!importer); setToggleImport(value._id)}} style={{cursor: 'pointer'}}>
                  {importar}
               </div>
               
               <p>Importar</p>
               
            </div>
            </div>
            )
            })}
            
        </div>
        {importer ? <Importar id={toggleImport}/> : null}
        </>
        )
}

export default Repartition