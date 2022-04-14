import React, {useEffect, useState} from "react";
import './PopUpSpreadsheet.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel, faFileCsv } from '@fortawesome/free-solid-svg-icons'

const PopUpSpreadsheet = ({coord, click, setClick}) => {
    const exceelIcon = <FontAwesomeIcon icon={faFileExcel} style={{color: '#8391a2', fontSize: '16px'}} />
    const docsIcon = <FontAwesomeIcon icon={faFileCsv} style={{color: '#8391a2', fontSize: '16px'}} />
    const style = {
        position: 'fixed',
        left: '8%',
        width: '11%'
    }
    return(
        <div className='dropdown-spreadsheet' style={style} onMouseEnter={() => {setClick(true)}} onMouseLeave={() => {setClick(false)}}>
            <ul>
                <a target='_blank' href="https://docs.google.com/spreadsheets/?usp=sheets_alc&authuser=0" style={{textDecoration: 'none'}}><li>{docsIcon} Google Planilhas</li></a>
                <a target='_blank' href="https://office.live.com/start/excel.aspx?omkt=pt-BR" style={{textDecoration: 'none'}}><li>{exceelIcon} Exceel</li></a>
            </ul>
        </div>
    )
}
export default PopUpSpreadsheet