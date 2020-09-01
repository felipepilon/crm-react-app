import React, { createContext, useState, useEffect, useContext } from 'react';
import { AppStateContext } from './AppState';
import { get_AuthUser } from '../services/Auth';
import { AbilityContext } from './Can';
import AbilityUpdater from '../ability/AbilityUpdater';


export const AuthContext = createContext();

const AuthContextProvider = props => {
    const { setStatus } = useContext(AppStateContext);

    const ability = useContext(AbilityContext);

    const [ user, setUser ] = useState({
        authenticated: false,
    })
    
    const authenticate = (userData) => {
        userData.authenticated = true;
        setUser({...user, ...userData});
    }

    const deauthenticate = () => {
        setUser({ 
            localeCode: user.localeCode,
            authenticated: false,
        });

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

    useEffect(() => {
        AbilityUpdater(ability, user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.role, user.authenticated])

    return (
        <AuthContext.Provider value={{
            user,
            authenticate,
            deauthenticate,
            setUser,
        }}
        >
            { props.children }
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;