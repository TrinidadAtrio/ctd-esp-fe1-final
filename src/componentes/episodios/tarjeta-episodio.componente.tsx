import { FunctionComponent, useEffect, useState } from 'react';
import './tarjeta-episodio.css';

/**
 * Tarjeta para cada episodio dentro de la vista de personaje.
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los episodios
 * 
 * 
 * @returns un JSX element 
 */
interface TarjetaEpisodioProps {
  url: string
}

interface EpisodeData {
  name: string,
  air_date:string,
  episode:string
}

const TarjetaEpisodio: FunctionComponent<TarjetaEpisodioProps> = ({url}) => {
  const [episode, setEpisode] = useState<EpisodeData>();

  const getEpisode = async (url: string) => {
    const data = await fetch(url).then(response => response.json()) as EpisodeData
    setEpisode(data);
  }
  useEffect(() => {
    getEpisode(url);
  }, [url])

    return episode ? (
      <div className="tarjeta-episodio">
            <h4>{episode.name}</h4>
            <div>
                <span>{episode.episode}</span>
                <span>{episode.air_date}</span>
            </div>
      </div>
    ) : null;
}

export default TarjetaEpisodio;