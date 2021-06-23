import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';


describe('Pruebas en <HeroScreen />', () => {
    
    const history = {
        lenght: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }

    test('debe de mostrar el componente redirect si no hay argumentos en el URL ', () => {
        
        const wrapper = mount( // por el useparams uso memoryrouter
            <MemoryRouter initialEntries={['/hero']}> 
                <HeroScreen history={ history }/>
            </MemoryRouter>
        );

        expect(wrapper.find('Redirect').exists()).toBe(true);

    })
    
    test('debe de mostrar un hero si el parametro existe y se encuentra', () => {
        
        const wrapper = mount( // por el useparams uso memoryrouter
            <MemoryRouter initialEntries={['/hero/marvel-spider']}> 
                <Route path="/hero/:heroeId" component={ HeroScreen }/>
            </MemoryRouter> 
        );

        expect(wrapper.find('.row').exists()).toBe(true);

    })

    test('debe de regresar a la pantalla anterior con PUSH', () => {
        
        const history = {
            lenght: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount( // por el useparams uso memoryrouter
            <MemoryRouter initialEntries={['/hero/marvel-spider']}> 
                <Route 
                    path="/hero/:heroeId" 
                    component={ (props) => <HeroScreen history={ history } />}
                />
            </MemoryRouter> 
        );

        wrapper.find('button').prop('onClick')();

        expect( history.push ).toHaveBeenCalledWith('/');
        expect( history.goBack ).not.toHaveBeenCalled();

    });

    test('debe de regresar a la pantalla anterior GOBACK', () => {
        
        const wrapper = mount( // por el useparams uso memoryrouter
            <MemoryRouter initialEntries={['/hero/marvel-spider']}> 
                <Route 
                    path="/hero/:heroeId" 
                    component={ (props) => <HeroScreen history={ history } />}
                />
            </MemoryRouter> 
        );

        wrapper.find('button').prop('onClick')();

        expect( history.goBack ).toHaveBeenCalledTimes(0);
        expect( history.push ).not.toHaveBeenCalled();

    })
    
    test('debe de llamar el redirect si el hero no existe', () => {
        
        const wrapper = mount( // por el useparams uso memoryrouter
            <MemoryRouter initialEntries={['/hero/marvel-spider3241234123']}> 
                <Route 
                    path="/hero/:heroeId" 
                    component={ (props) => <HeroScreen history={ history } />}
                />
            </MemoryRouter> 
        );

        expect( wrapper.text() ).toBe('');

    })
    
})
