import React, { useEffect, useReducer } from 'react';
import { AppRouter } from './routers/AppRouter';
import { AuthContext } from './auth/AuthContext';
import { authReducer } from './auth/authReducer';

const init = () => { // para leer el localStorage
    return JSON.parse(localStorage.getItem('user')) || { logged: false }; // Lo que retorna es si  tenemos dicho obj en el LocalStorage con getItem('user'). Como es un obj le hago el parse con JSON.parse para volverlo un string. Si no existe retorno un obj con el logged: false.
}

export const HeroesApp = () => {

    const [user, dispatch] = useReducer(authReducer, {}, init) // init ayuda a computar todo ese estado inicial para que funcione mas rapido el componente y esa funcion no se ejecute todo el tiempo cuando haya algun cambio en el componente.
    // El init se dispara y lo que retorne va a ser el inicialState

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, dispatch }}>
            <AppRouter />
        </AuthContext.Provider>
    )
}
