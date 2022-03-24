import React, { createContext, useState } from 'react'

export const PainelContext = createContext();

export const PainelProvider = ({children}) => {

    const [ showProfile, setShowProfile ] = useState(true)
    const [ clickPopUp, setClickPopUp ] = useState(false)

    const resultProfile = () => {
        return showProfile;
    }

    const showPopUp = () => {
        return setClickPopUp(!clickPopUp)
    }

    const resultPopUp = () => {
        return clickPopUp;
    }

    const showingProfile = () => {
        return setShowProfile(!showProfile)
    }

    return(
        <PainelContext.Provider value={{ data: showProfile, showingProfile, resultProfile, showPopUp, resultPopUp }}>
            {children}
        </PainelContext.Provider>
    )
}