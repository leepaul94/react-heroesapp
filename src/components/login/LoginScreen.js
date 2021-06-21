import React, { useContext } from 'react';
import { AuthContext } from "../../auth/AuthContext";
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => { // history es un objeto dentro de las props que vienen por defecto por react router dom

    const { dispatch } = useContext(AuthContext); // uso el usecontext para usar el dispatch llamando al authcontext

    const handleLogin = () => {
        // history.push('/'); // me redirige a la ruta que tenga unicamente el '/' es decir a marvel

        const lastPath = localStorage.getItem('lastPath') || '/'; // obtengo mi ultimo logout antes de salirme de login, pero si es la primera vez, obtengo la ruta del dashboard.

        dispatch({ // envio a mi reducer mi action
            type: types.login,
            payload: {
                name: 'Paul'
            }
        });

        history.replace( lastPath ); // Con history.replace() lo que se hace es reemplazar en la history que no se visitó el Login sino que ahora directamente va al "/" si es la primera vez o al ultimo path.

    }
    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={ handleLogin }
            >
                Login
            </button>
        </div>
    )
}
