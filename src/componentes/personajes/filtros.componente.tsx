import { ChangeEvent, useEffect, useState } from 'react';
import './filtros.css';
import { CHARACTER_ACTIONS, dispatchCharacter } from '../../store';

const Filtros = () => {
    const [inputValue, setInputValue] = useState('')
    const dispatch = dispatchCharacter();
    const handleOnSubmit = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    }
    
    const handleOnClear = () => {
      setInputValue('');
    }
    useEffect(() => {
      dispatch(CHARACTER_ACTIONS.searchCharacter(inputValue));
    }, [inputValue])

    return <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
        <input type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" name="nombre" onChange={handleOnSubmit} value={inputValue}/>
        <button onClick={handleOnClear}>Limpiar busqueda</button>
    </div>
}

export default Filtros;