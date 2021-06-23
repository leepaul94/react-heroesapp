import React from 'react';
import { mount } from 'enzyme';
import { PrivateRoute } from '../../routers/PrivateRoute'
import { MemoryRouter } from 'react-router-dom';


describe('Pruebas en <PrivateRoute />', () => {
    
    const props = { // afuera porque lo puedo llegar a usar, location porque me estoy generando un rest como en el codigo privateroute
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn();

    test('debe de mostrar el componente si esta autenticado y guardar localStorage', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated= { true } // aca se inventa y pongo true
                    component={ () => <span>Listo!</span> } // se inventa un componente, pero se espera una funcion tal como en privateroute
                    { ...props }
                />
            </MemoryRouter>
        )
        
        console.log(wrapper.html()); // me imprime el component de arriba
        expect( wrapper.find('span').exists() ).toBe(true);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
    })
    
    test('debe de bloquear el componente si no esta autenticado', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated= { false } // aca se inventa y pongo true
                    component={ () => <span>Listo!</span> } // se inventa un componente, pero se espera una funcion tal como en privateroute
                    { ...props }
                />
            </MemoryRouter>
        );
        expect( wrapper.find('span').exists() ).toBe(false);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
    })
    
})
