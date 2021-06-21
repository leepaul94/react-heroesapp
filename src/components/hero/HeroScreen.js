import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router'
import { heroImages } from '../../helpers/heroImages'; // estoy importando las imagenes de helpers 
import { getHeroesById } from '../../selectors/getHeroById';

// import batman from '../../assets/heroes/dc-batman.jpg'; // estatica
// const heroImages = require.context('../../assets/heroes', true ); // es del webpack con esto puedo extraer las imagenes poniendo el directorio y que se fije en los subdirectorios

export const HeroScreen = ({ history }) => {

    const { heroId } = useParams(); // extraigo del url el id del heroe ya que la ruta esta compuesta por el id al final del url
    
    const hero = useMemo(() => getHeroesById( heroId ), [heroId]); // obtengo el heroe que coincida con mi id que extraje del url

    if( !hero ) {
        return <Redirect to="/" />; // Me redirige a la pag principal si el url escrito no sea el correcto o no se encuentre.
    }

    const handleReturn = () => {

        if( history.length <= 2 ) { // si yo me dirigi directamente a un heroe sin hacer todo el trazado desde la pag principal,
            history.push('/'); // me dirige al tocar return a la pag principal
        } else {
            history.goBack(); // me dirige a la pag anterior si mi trazado hasta el hero es mayor a 2
        }
    };

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img
                    // src={ `../assets/heroes/${ heroId }.jpg` } // desde public/assets
                    // src={ batman } // import
                    src={ heroImages(`./${ heroId }.jpg`).default } // hay que agregar la prop default porque sino no sale
                    alt={ superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>

            <div className="col-8 animate__animated animate__fadeIn">
                <h3> { superhero } </h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b> Alter ego: </b> { alter_ego } </li>
                    <li className="list-group-item"> <b> Publisher: </b> { publisher } </li>
                    <li className="list-group-item"> <b> First appearance: </b> { first_appearance } </li>
                </ul>

                <h5> Characters </h5>
                <p> { characters } </p>
                <button
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >
                    Return
                </button>
            </div>
        </div>
    )
}
