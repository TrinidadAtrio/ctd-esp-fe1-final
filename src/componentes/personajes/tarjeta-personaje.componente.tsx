import { FunctionComponent } from 'react';
import { CHARACTER_ACTIONS, Character, dispatchCharacter } from '../../store';
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { useNavigate } from "react-router-dom";

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * 
 * @returns un JSX element 
 */

interface TarjetaPersonajeProps extends Character {}

const TarjetaPersonaje: FunctionComponent<TarjetaPersonajeProps> = (props) => {
  const dispatch = dispatchCharacter();
  const navigate = useNavigate();
  const handleOnClickCharacter = () => {
    dispatch(CHARACTER_ACTIONS.viewCharacter(props));

    navigate('detalle')
  };

    return (
      <button onClick={handleOnClickCharacter}>
        <div className="tarjeta-personaje">
          <img src={props.image} alt={props.name} />
          <div className="tarjeta-personaje-body">
              <span>{props.name}</span>
              <BotonFavorito characterId={props.id} />
          </div>
        </div>
      </button>
    )
}

export default TarjetaPersonaje;