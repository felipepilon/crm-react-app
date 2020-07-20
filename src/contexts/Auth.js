import React, { createContext, useState, useEffect, useContext } from 'react';
import { AppStateContext } from './AppState';
import { authUser } from '../services/Auth';

export const AuthContext = createContext();

const AuthContextProvider = props => {
    const { setStatus } = useContext(AppStateContext)

    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ user, setUser ] = useState({})
    
    const authenticate = (auth) => {
        setUser({ ...user, ...auth })
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
        console.log(user);
        
        authUser()
        .then(res => {
            console.log('autenticou!');
            console.log(res);
            authenticate(res);
            setStatus('loaded');
        })
        .catch(err => {
            if (!err || !err.status || err.status !== 401)
            {
                console.error('Unable to continue session');
                console.error(err);
            } else {
                console.log('Auth - useEffect - err => ', err)
            }
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