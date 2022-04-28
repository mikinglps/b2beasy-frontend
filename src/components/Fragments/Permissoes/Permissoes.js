import axios from "axios";
import React, {useState, useEffect, useRef} from "react";
import './Permissoes.css'

const Permissoes = () => {
    const radioRefRead = useRef()
    const radioRefModify = useRef()
    const radioRefDelete = useRef()
    const [aba, setAba] = useState('')
    const [filiais, setFiliais] = useState([])
    const [setores, setSetores] = useState([])
    const [cargos, setCargos] = useState([])
    const [allSetores, setAllSetores] = useState([])
    const [selectedCargo, setSelectedCargo] = useState('')
    const [click, setClick] = useState(false)
    const [clickCargo, setClickCargo] = useState(false)

    const handleClickFilial = (id) => {
        axios.post('http://localhost:8080/api/v1/setor/filial', {_id: id})
        .then(res => {
            setSetores([...res.data.results])
            setClick(true)
        })
    }

    const handleClickSetor = (id) => {
        axios.post('http://localhost:8080/api/v1/cargos/setor', {_id: id})
        .then(res => {
            setCargos([...res.data])
            setClickCargo(true)
        })
    }

    const save = () => {
        if(radioRefRead.current.checked){
            if(aba == 'Gerenciar'){
                axios.post('http://localhost:8080/api/v1/permissoes/find', {setor: null, cargo: selectedCargo, geral: true, needed: false})
                .then(res => {
                    if(res.data.found == false){
                        axios.post('http://localhost:8080/api/v1/permissoes', {setor: null, cargo: selectedCargo, permissao: 1, geral: true, needed: false})
                    }else{
                        axios.post('http://localhost:8080/api/v1/permissoes/edit', {setor: null, cargo: selectedCargo, permissao: 1, geral: true, needed: false})
                    }
                })
            }else{
                axios.post('http://localhost:8080/api/v1/permissoes/find', {setor: aba, cargo: selectedCargo, geral: false, needed: true})
                .then(res => {
                    if(res.data.found == false){
                        axios.post('http://localhost:8080/api/v1/permissoes', {setor: aba, cargo: selectedCargo, permissao: 1, geral: false, needed: true})
                    }else{
                        axios.post('http://localhost:8080/api/v1/permissoes/edit', {setor: aba, cargo: selectedCargo, permissao: 1, geral: false, needed: true})
                    }
                })
            }
        }else if(radioRefModify.current.checked){
            if(aba == 'Gerenciar'){
                axios.post('http://localhost:8080/api/v1/permissoes/find', {setor: null, cargo: selectedCargo, geral: true, needed: false})
                .then(res => {
                    if(res.data.found == false){
                        axios.post('http://localhost:8080/api/v1/permissoes', {setor: null, cargo: selectedCargo, permissao: 2, geral: true, needed: false})
                    }else{
                        axios.post('http://localhost:8080/api/v1/permissoes/edit', {setor: null, cargo: selectedCargo, permissao: 2, geral: true, needed: false})
                    }
                })
            }else{
                axios.post('http://localhost:8080/api/v1/permissoes/find', {setor: aba, cargo: selectedCargo, geral: false, needed: true})
                .then(res => {
                    if(res.data.found == false){
                        axios.post('http://localhost:8080/api/v1/permissoes', {setor: aba, cargo: selectedCargo, permissao: 2, geral: false, needed: true})
                    }else{
                        axios.post('http://localhost:8080/api/v1/permissoes/edit', {setor: aba, cargo: selectedCargo, permissao: 2, geral: false, needed: true})
                    }
                })
            }
        }else if(radioRefDelete.current.checked){
            if(aba == 'Gerenciar'){
                axios.post('http://localhost:8080/api/v1/permissoes/find', {setor: null, cargo: selectedCargo, geral: true, needed: false})
                .then(res => {
                    if(res.data.data == false){
                        axios.post('http://localhost:8080/api/v1/permissoes', {setor: null, cargo: selectedCargo, permissao: 3, geral: true, needed: false})
                    }else{
                        axios.post('http://localhost:8080/api/v1/permissoes/edit', {setor: null, cargo: selectedCargo, permissao: 3, geral: true, needed: false})
                    }
                })
            }else{
                axios.post('http://localhost:8080/api/v1/permissoes/find', {setor: aba, cargo: selectedCargo, geral: false, needed: true})
                .then(res => {
                    if(res.data.found == false){
                        axios.post('http://localhost:8080/api/v1/permissoes', {setor: aba, cargo: selectedCargo, permissao: 3, geral: false, needed: true})
                    }else{
                        axios.post('http://localhost:8080/api/v1/permissoes/edit', {setor: aba, cargo: selectedCargo, permissao: 3, geral: false, needed: true})
                    }
                })
            }
        }
    }

    useEffect(() => {
        radioRefDelete.current.checked = false
        radioRefRead.current.checked = false
        radioRefModify.current.checked = false
    }, [aba])



    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/filiais/query')
        .then(res => {
            setFiliais([...res.data])
        })

        axios.get('http://localhost:8080/api/v1/setor/query')
        .then(res => {
            setAllSetores([...res.data.results])
            
        })
    },[])

    return (
        <section className='permissions-holder'>
            <form>
            <div className='filiais'>
            <h2>Selecione uma filial</h2>
            {filiais.map((data, index) => {
                return(
                    <section className='holder-single' data-id={index} key={index}>
                    <div className='filial-holder__Permissions' onClick={() => {handleClickFilial(data._id)}}>
                        <p>{data.titulo}</p>
                    </div>
                    </section>
            )
            })}
            </div>
            <div className='setores'>
            {click ? <h2>Selecione um setor</h2> : null}
            {click ? setores.map((value, index) => {
                return(
                <div key={index} className='setor-holder__Permissions' onClick={() => {handleClickSetor(value._id)}}>
                <p>{value.titulo}</p>
                </div>
                )
            }) : null}
            </div>
            <div className='cargo'>
                {clickCargo ? <h2>Selecione um cargo</h2> : null}
                {clickCargo ? cargos.map((value, index) => {
                    return(
                        <div key={index} className='cargo-holder__Permissions' onClick={() => {setSelectedCargo(value._id)}}>
                            <p>{value.titulo}</p>
                        </div>
                    )
                }) : null}
            </div>
            </form>
            <div style={selectedCargo ? {display: 'flex'} : {display: 'none'}} className='permissions_selection'>
                <div className='sidebar__Permissions'>
                <ul>
                <li onClick={(e) => {setAba(e.target.innerHTML)}}>Gerenciar</li>
                {allSetores.map((value, index) => {
                    return(
                        
                            <li onClick={(e) => {setAba(value._id)}}>{value.titulo}</li>
                       
                    )
                })}
                </ul>
                </div>
                <div className='permissionsRmd__Permissions' style={aba ? {display: 'flex'} : {display: 'none'}}>
                    <form>
                    <h2>Selecione as Permissoes</h2>
                        <div className='alterPermissions__Permissions'>
                            <div className='labels'>
                            <h3>Tipos de permissao</h3>
                            <label>Apenas Leitura</label>
                            <label>Ler e Modificar</label>
                            <label>Pode deletar</label>
                            </div>
                            <div className='inputs'>
                            <h3>Marque a permissao</h3>
                            <input type='radio' name='ref' ref={radioRefRead}/>
                            <input type='radio' name='ref' ref={radioRefModify}/>
                            <input type='radio' name='ref' ref={radioRefDelete}/>
                            <button type='button' onClick={() => {save();}}>Save</button>
                            </div>    
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Permissoes