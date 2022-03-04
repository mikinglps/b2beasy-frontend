import React, { useContext, useEffect } from 'react'
import './Repartition.css'
import { Link } from 'react-router-dom'
import { PainelContext } from '../../../contexts/PainelContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFolder, faBriefcase, faLock, faBuilding, faUpload, faChartBar, faUsers } from '@fortawesome/free-solid-svg-icons'

const manage = <FontAwesomeIcon icon={faUsers} style={{color: 'black', fontSize: '22px'}}/>
const log = <FontAwesomeIcon icon={faChartBar} style={{color: 'black', fontSize: '22px'}}/>
const filiais = <FontAwesomeIcon icon={faBuilding} style={{color: 'black', fontSize: '22px'}}/>
const lock = <FontAwesomeIcon icon={faLock} style={{color: 'black', fontSize: '22px'}}/>
const office = <FontAwesomeIcon icon={faBriefcase} style={{color: 'black', fontSize: '22px'}}/>
const importar = <FontAwesomeIcon icon={faUpload} style={{color: 'black', fontSize: '22px'}}/>
const add = <FontAwesomeIcon icon={faPlus} style={{color: 'black', fontSize: '22px'}}/>
const folder = <FontAwesomeIcon icon={faFolder} style={{color: 'black', fontSize: '22px'}}/>


const Repartition = () => {
    const { resultProfile } = useContext(PainelContext)
    const result = resultProfile()

    useEffect(()=>{
      let element = document.getElementsByClassName('rounded')
      
      for(var i = 0, length = element.length; i < length; i++){
         if(result){
            element[i].style.width = '15%'
         }else{
            element[i].style.width = '13%'
         }
      }
      
    },[result])

    return(
        <div className='containerRepartition'>  
            <div className='single--rep--cnpj'>
            <p>Gerenciar</p>
            <div className='icons--rep--cnpj'>
               <div className='rounded--cnpj'>
                  {log}
               </div>
               <p>Log</p>
               <div className='rounded--cnpj'>
                  {folder}
               </div>
               <p>Meus Arquivos</p>
               <div className='rounded--cnpj'>
                  {office}
               </div>
               <p>Cargos</p>
               <div className='rounded--cnpj'>
                  {lock}
               </div>
               <p>Permissões</p>
               <div className='rounded--cnpj'>
                  {filiais}
               </div>
               <p>Filiais</p>
               <Link to='/gerenciar/usuarios' style={{textDecoration: 'none', textAlign: 'center'}}>
               <div className='rounded--cnpj'>
                  {manage}
               </div>
               <p>Gerenciar Usuarios</p>
               </Link>
               <Link to='/criar' style={{textDecoration: 'none', textAlign: 'center'}}>
               <div className='rounded--cnpj'>
                  {manage}
               </div>
               <p>Repartições</p>
               </Link>
               </div>
               </div>
               <div className='single--rep'>
            <p>Geral</p>
            <div className='icons--rep'>
               <div className='rounded'>
                  {add}
               </div>
               <p>Criar</p>
               <div className='rounded'>
                  {folder}
               </div>
               <p>Meus Arquivos</p>
               <div className='rounded'>
                  {importar}
               </div>
               <p>Importar</p>
            </div>
            </div>
            <div className='single--rep'>
            <p>Geral</p>
            <div className='icons--rep'>
               <div className='rounded'>
                  {add}
               </div>
               <p>Criar</p>
               <div className='rounded'>
                  {folder}
               </div>
               <p>Meus Arquivos</p>
               <div className='rounded'>
                  {importar}
               </div>
               <p>Importar</p>
            </div>
            </div>
        </div>
        )
}

export default Repartition