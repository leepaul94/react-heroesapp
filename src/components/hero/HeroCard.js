import React from 'react';
import { Link } from 'react-router-dom';
import { heroImages } from '../../helpers/heroImages'; // lo mismo al comment de abajo solo que ahora lo estoy importando de helpers/heroImages

// const heroImages = require.context('../../assets/heroes', true ); // es del webpack con esto puedo extraer las imagenes poniendo el directorio y que se fije en los subdirectorios

export const HeroCard = ({ 
    id,
    superhero, 
    alter_ego,
    first_appearance,
    characters
}) => {
    return (
        <div className="card ms-3" style={ { maxWidth: 540 } }> {/* Con style le doy estilo como css y adentro le pongo lo que quiero hacer sin los - como en css */}
            <div className="row no gutters">
                <div className="col-md-4">
                    <img src={ heroImages(`./${ id }.jpg`).default } className="card-img" alt={ superhero } /> {/* el source es estatico no es un api, solo cambia el id y le concateno .jpg*/}
                </div>
                <div className="col-md-8">

                    <div className="card-body">
                        <h5 className="card-title"> { superhero }</h5>
                        <p className="card-text"> { alter_ego } </p>
                        {
                            (alter_ego !== characters)
                                && <p className="card-text"> { characters } </p>
                        }

                        <p className="card-text">
                            <small className="text-muted"> { first_appearance } </small>
                        </p>

                        <Link to={ `./hero/${ id }` }>
                            More...
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
