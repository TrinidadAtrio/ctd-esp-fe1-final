import {FunctionComponent, MouseEventHandler, useState} from 'react';
import './boton-favorito.css';
import { CHARACTER_ACTIONS, dispatchCharacter, useAppSelector } from '../../store';
/**
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 * 
 * Deberás tipar las propiedades si usas este componente
 * 
 * 
 * @returns un JSX element 
 */

interface BotonFavoritoProps {
  // esFavorito: boolean,
  // onClick: MouseEventHandler,
  characterId: string,
};

const BotonFavorito: FunctionComponent<BotonFavoritoProps> = ({ characterId }) => {
  // const [isFavourite, setIsFavourite] = useState(false);
  const favouriteCharacters = useAppSelector(state => state.character.favourites);

  const dispatch = dispatchCharacter();

  const handleOnClick: MouseEventHandler = (event) => {
    event.stopPropagation();
    if (favouriteCharacters.includes(characterId)) {
      return dispatch(CHARACTER_ACTIONS.deleteFavourite(characterId));
    }
    dispatch(CHARACTER_ACTIONS.saveFavourite(characterId));
  };
  const src = favouriteCharacters.includes(characterId) ? "/imagenes/star-filled.png" : "/imagenes/star.png"

    return (
      <button onClick={handleOnClick}>
        <div className="boton-favorito">
            <img src={src} alt={"favorito"} />
        </div>

      </button>

    )
}

export default BotonFavorito;