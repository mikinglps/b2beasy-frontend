import React, { createContext, useState, useEffect } from 'react'

export const PainelContext = createContext();

export const PainelProvider = ({children}) => {

    const [ showProfile, setShowProfile ] = useState(true)

    const resultProfile = () => {
        return showProfile;
    }

    const showingProfile = () => {
        return setShowProfile(!showProfile)
    }

    return(
        <PainelContext.Provider value={{ data: showProfile, showingProfile, resultProfile }}>
            {children}
        </PainelContext.Provider>
    )
}