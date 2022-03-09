import { Link } from 'react-router-dom'
import React from 'react'
import './PopUpCreate.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFileSignature, faFileExcel, faFileLines } from '@fortawesome/free-solid-svg-icons'

const PopUpCreate = ({coordinates, hover, setHover}) => {
    const addMemo = <FontAwesomeIcon icon={faFile} style={{color: '#8391a2', fontSize: '16px'}}/>
    const addOficio = <FontAwesomeIcon icon={faFileSignature} style={{color: '#8391a2', fontSize: '16px'}}/>
    const addSpreadsheet = <FontAwesomeIcon icon={faFileExcel} style={{color: '#8391a2', fontSize: '16px'}}/>
    const addText = <FontAwesomeIcon icon={faFileLines} style={{color: '#8391a2', fontSize: '16px'}}/>
    const style = {
        position: 'absolute',
        bottom: coordinates.bottom,
        top: coordinates.top + 10,
        left: '8%',
    }
    return(
        <div className='dropdown' style={style} onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
            
            <ul>
                <Link to='/criar/memorando' style={{textDecoration: 'none'}}><li>{addMemo} Memorando</li></Link>
                <li>{addOficio} Oficio</li>
                <li>{addText} Documento de Texto</li>
                <li>{addSpreadsheet} Planilha</li>
            </ul>
        </div>
    )
}

export default PopUpCreate