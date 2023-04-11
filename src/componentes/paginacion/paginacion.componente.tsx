import { useEffect } from 'react';
import { CHARACTER_ACTIONS, dispatchCharacter, useAppSelector } from '../../store';
import './paginacion.css';

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns un JSX element 
 */
const Paginacion = () => {
  const dispatch = dispatchCharacter();
  const pageData = useAppSelector(state => state.character.pagination)
  // const page = useAppSelector(state => state.character.pagination);

  const handleOnBack = () => {
    dispatch(CHARACTER_ACTIONS.changePage('BACK'))
  }

  const handleOnNext = () => {
    dispatch(CHARACTER_ACTIONS.changePage('NEXT'));
  }

  return <div className="paginacion">
      <button disabled={pageData.current === 1} className={"primary"} onClick={handleOnBack}>Anterior</button>
      <button disabled={pageData.current === pageData.total} className={"primary"} onClick={handleOnNext}>Siguiente</button>
  </div>
}

export default Paginacion;