import React from 'react'
import './CreateRepartition.css'

const CreateRepartition = () =>{

    return(
        <section className='create'>
            <div className='titulo'>
            <h1>Criando repartição</h1>
            <p>As repartições são as áreas nas quais seus funcionários trabalharão. Por exemplo: Contabilidade - Sua Empresa</p>
            </div>
            <form className='createRepartition'>
                <input type='text' placeholder='Digite o nome da repartição'/>
                <button className='btn--primary'>Criar</button>
            </form>
        </section>
    )

}

export default CreateRepartition;