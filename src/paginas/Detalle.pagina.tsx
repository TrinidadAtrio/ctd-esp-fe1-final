import "./Detalle.css";
import BotonFavorito from "../componentes/botones/boton-favorito.componente";
import TarjetaEpisodio from "../componentes/episodios/tarjeta-episodio.componente";
import { useAppSelector } from "../store";
import { useEffect } from "react";

/**
 * Esta es la pagina de detalle. Aqui se puede mostrar la vista sobre el personaje seleccionado junto con la lista de episodios en los que aparece
 * 
 * EL TRABAJO SOBRE ESTE ARCHIVO ES OPCIONAL Y NO ES REQUISITO DE APROBACION
 * 
 * 
 * 
 * Uso: 
 * ``` <PaginaDetalle /> ```
 * 
 * @returns la pagina de detalle
 */
const PaginaDetalle = () => {
  const character = useAppSelector(state => state.character.selectedCharacter);

    return (character && (
      <div className="container">
        <h3>{character.name}</h3>
        <div className={"detalle"}>
            <div className={"detalle-header"}>
                <img src={character.image} alt="Rick Sanchez"/>
                <div className={"detalle-header-texto"}>

                    <p>{character.name}</p>
                    <p>Planeta: {character.origin.name}</p>
                    <p>Genero: {character.gender}</p>
                </div>
                <BotonFavorito characterId={character.id} />
            </div>
        </div>
        <h4>Lista de episodios donde apareció el personaje</h4>
        <div className={"episodios-grilla"}>
          {character.episode.map((url) => <TarjetaEpisodio url={url}/>)}
        </div>
      </div>
    )) || null
}

export default PaginaDetalle