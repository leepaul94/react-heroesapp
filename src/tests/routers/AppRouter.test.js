import React from 'react';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <AppRouter />', () => {
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('debe de mostrar login si no esta autenticado', () => {
        
        const wrapper = mount(
            <AuthContext.provider value={ contextValue }>
                <AppRouter />
            </AuthContext.provider>

        );

        console.log(wrapper.html());
        expect( wrapper ).toMatchSnapshot();
    })
    
    test('debe de mostrar el componente marvel si esta autenticado', () => {
        
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Juan'
            }
        }

        const wrapper = mount(
            <AuthContext.provider value={ contextValue }>
                <AppRouter />
            </AuthContext.provider>

        );

        expect( wrapper.find('.navbar').exists() ).toBe(true);

    })
    
})
