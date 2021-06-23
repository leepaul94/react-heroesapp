import React from 'react';
import { mount } from 'enzyme';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { AuthContext } from '../../auth/AuthContext';
import { MemoryRouter } from 'react-router-dom';


describe('Pruerbas en <DashboardRoutes />', () => {
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Juan'
        }
    }

    test('debe de mostrarse correctamente ', () => {
        
        const wrapper = mount(
            <AuthContext.provider value={ contextValue } >
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Juan');
    })
    

})
