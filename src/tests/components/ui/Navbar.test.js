import React from 'react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { MemoryRouter, Router } from 'react-router-dom';
import { types } from '../../../types/types';


describe('Pruebas en <Navbar />', () => {

    const historyMock = { // es algo que podemos mandar al router, entonces el componente va a tener que usar el history que tiene ese router, entonces se finje el router mas abajo
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHRef: jest.fn()
    }
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true, 
            name: 'Pepe'
        }
    }

    const wrapper = mount(
        <AuthContext.provider value={ contextValue }>
            <MemoryRouter>
                <Router history={ historyMock }>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.provider>
    );

    afterEach( () => {
        jest.clearAllMocks();
    })

    test('debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Pepe');
    })
    
    test('debe de llamar el logout y usar el history', () => {
        
        wrapper.find('button').prop('onClick')();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.logout
        });

        expect( historyMock.replace ).toHaveBeenCalledWith('/login');
    })
    
})
