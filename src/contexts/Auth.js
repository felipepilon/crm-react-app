import React, { createContext, useState, useEffect, useContext } from 'react';
import { AppStateContext } from './AppState';
import { get_AuthUser } from '../services/Auth';

export const AuthContext = createContext();

const AuthContextProvider = props => {
    const { setStatus } = useContext(AppStateContext)

    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ user, setUser ] = useState({})
    
    const authenticate = (userData) => {
        setUser({...user, ...userData})
        setIsAuthenticated(true);
    }

    const deauthenticate = () => {
        setUser({ 
            localeCode: user.localeCode,
        });
        setIsAuthenticated(false);

        setTimeout(() => {
            setStatus('loaded');
        }, 1000);
    };

    useEffect(() => {
        console.log('Auth - useEffect: initiating');
        
        get_AuthUser()
        .then((res) => {
            authenticate(res);
            setStatus('loaded');
        })
        .catch((err) => {
            console.error('Nao autenticou!')
            console.error(err);
            deauthenticate();
        });
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            setUser,
            authenticate,
            deauthenticate,
        }}
        >
            { props.children }
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;