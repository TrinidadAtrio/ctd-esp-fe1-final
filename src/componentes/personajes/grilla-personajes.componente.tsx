import { FunctionComponent, useEffect } from 'react';
import { dispatchCharacter, filterCharacter, getCharacters, getCharactersFavourites, useAppSelector } from '../../store';
import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';

/**
 * Grilla de personajes para la pagina de inicio
 * 
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 * 
 * 
 * @returns un JSX element 
 */
interface GrillaPersonajesProps {
  showOnlyFavs?: boolean;
}
const GrillaPersonajes: FunctionComponent<GrillaPersonajesProps> = ({ showOnlyFavs }) => {
    const dispatch = dispatchCharacter();
    const characters = useAppSelector(state => state.character.characters);
    const currentPage = useAppSelector(state => state.character.pagination.current);
    const currentSearch = useAppSelector(state => state.character.search);
    const favouriteCharacters = useAppSelector(state => state.character.favourites);

    useEffect(() => {
      if (showOnlyFavs) {
        dispatch(getCharactersFavourites(favouriteCharacters))
        return
      }

      if (!currentSearch) {
        dispatch(getCharacters(currentPage));
        return;
      }

      dispatch(filterCharacter({ name: currentSearch, page: currentPage}))
    }, [currentPage, currentSearch, favouriteCharacters]);

    return <div className="grilla-personajes">
      {characters.map(character => (
        <TarjetaPersonaje {...character} />
      ))}
    </div>
}
 
export default GrillaPersonajes;