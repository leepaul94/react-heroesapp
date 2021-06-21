import React, { useMemo } from 'react';
import queryString from 'query-string';
import { HeroCard } from '../hero/HeroCard';
import { useForm } from '../hooks/useForm';
import { useLocation } from 'react-router';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation(); // me devuelve un objeto en donde en la prop search aparece lo que guarda el history.push
    const { q = '' } = queryString.parse( location.search ); // obtengo la prop q del objeto convirtiendo el string del location.search en props y values y eso lo hace queryString que trabaja con los query
    // lo igualo a un string vacio para que no me de error por undefined

    
    const [ formValues, handleInputChange ] = useForm({
        searchText: q // lo que se busco, se lo pasa al useform como valor inicial. A su vez, si se hace refresh sigue estando porque lo esta leyendo del queryString
    });

    const { searchText } = formValues;
    
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q] ); // me realiza el filtro solo cuando cambia el q es decir el query. Si no cambia, se queda memorizada mis valores

    const handleSearch = ( e ) => {
        e.preventDefault();

        history.push(`?q=${ searchText }`); // es para que en la url me aparezca /search?q=batman

    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4> Results </h4>
                    <hr />

                    {
                        (q === '')
                            && 
                            <div className="alert alert-info">
                                Search a hero
                            </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0)
                            && 
                            <div className="alert alert-danger">
                                There is not a hero with the name { q }
                            </div>
                    }

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard 
                                key={ hero.id }
                                { ...hero }    
                            />
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
