import React, { createContext, useState } from 'react';

export const AppStateContext = createContext();

const AppStateContextProvider = props => {
    const [ status, setStatus ] = useState('initiating');
    const [ isMenuOpen, setMenuOpen ] = useState(false);
    
    return (
        <AppStateContext.Provider value={{
            status,
            setStatus,
            isMenuOpen,
            setMenuOpen,
        }}
        >
            { props.children }
        </AppStateContext.Provider>
    )
};

export default AppStateContextProvider;