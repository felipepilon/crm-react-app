import React, { createContext, useState } from 'react';

export const AppStateContext = createContext();

const AppStateContextProvider = props => {
    const [ status, setStatus ] = useState('initiating');
    const [ isMenuOpen, setMenuOpen ] = useState(false);
    const [ sucessSnack, setSucessSnack ] = useState('');

    return (
        <AppStateContext.Provider value={{
            status,
            setStatus,
            isMenuOpen,
            setMenuOpen,
            sucessSnack,
            setSucessSnack,
        }}
        >
            { props.children }
        </AppStateContext.Provider>
    )
};

export default AppStateContextProvider;