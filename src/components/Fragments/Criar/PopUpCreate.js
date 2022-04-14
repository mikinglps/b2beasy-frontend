import { Link } from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import './PopUpCreate.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFileSignature, faFileExcel, faFileLines } from '@fortawesome/free-solid-svg-icons'
import PopUpSpreadsheet from './PopUpSpreadsheet'

const PopUpCreate = ({coordinates, hover, setHover}) => {
    const addMemo = <FontAwesomeIcon icon={faFile} style={{color: '#8391a2', fontSize: '16px'}}/>
    const addOficio = <FontAwesomeIcon icon={faFileSignature} style={{color: '#8391a2', fontSize: '16px'}}/>
    const addSpreadsheet = <FontAwesomeIcon icon={faFileExcel} style={{color: '#8391a2', fontSize: '16px'}}/>
    const addText = <FontAwesomeIcon icon={faFileLines} style={{color: '#8391a2', fontSize: '16px'}}/>
    const [click, setClick] = useState(false)
    const [coord, setCoord] = useState(null)
    const style = {
        position: 'fixed',
        bottom: coordinates.bottom,
        top: coordinates.top + 10,
        left: '8%',
    }

    useEffect(()=>{
        let element = document.getElementById('box2')
        setCoord(element.getBoundingClientRect())
    },[click])
    
    return(
        <div className='dropdown' id='box2' style={style} onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
            
            <ul>
                <Link to='/criar/memorando' style={{textDecoration: 'none'}}><li>{addMemo} Memorando</li></Link>
                <Link to='/criar/oficio' style={{textDecoration: 'none'}}><li>{addOficio} Oficio</li></Link>
                <Link to='/criar/documento' style={{textDecoration: 'none'}}><li>{addText} Documento de Texto</li></Link>
                <li id='spreadsheet' onMouseEnter={ () => {setClick(true)}} onMouseLeave={() => {setClick(false)}}>{addSpreadsheet} Planilha</li>
            </ul>
            {click ? <PopUpSpreadsheet coord={coord} click={click} setClick={setClick} /> : null}
        </div>
    )
}

export default PopUpCreate