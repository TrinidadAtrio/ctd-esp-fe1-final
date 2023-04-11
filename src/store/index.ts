import { configureStore, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export interface Character {
  id: string,
  image: string,
  name: string,
  origin: {
    name: string,
  },
  gender: string,
  episode: string[]
}

interface ReducerState {
  favourites: string[],
  characters: Character[],
  pagination: {
    total: number,
    current: number,
  },
  search: string
  selectedCharacter?: Character,

}

interface CharacterResponse {
  info: {
    pages: number,
  },
  results: Character[],
}

const initialState = {
  favourites: [],
  characters: [],
  pagination: {
    total: 1,
    current: 1,
  },
  search: '',
} as ReducerState;

export const getCharacters = createAsyncThunk('character/getByPage', async (page: number) => {
  const data = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`, {
    method: 'GET',
  }).then((response) => response.json()) as CharacterResponse;

  return {...data, page};
});

export const getCharactersFavourites = createAsyncThunk('character/getFavourites', async (characterIds: string[]) => {
  if (!characterIds.length) {
    return []
  }

  const data = await fetch(`https://rickandmortyapi.com/api/character/${characterIds.join(',')}`, {
    method: 'GET',
  })
  .then((response) => response.json())
  .then((response) => Array.isArray(response) ? response : [response]) as CharacterResponse;

  return data;
});

export const filterCharacter = createAsyncThunk(
  'character/filter',
  async (args: {name: string, page: number}) => {
    let initialValue = {
      results: [],
      info: { pages: 1 },
      search: args.name
    };

    if (!args.name) {
      return initialValue
    }

    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${args.page}&name=${args.name}`, {
      method: 'GET',
    })
    .then((response) => response.json())

    if (!response.error) {
      return { ...initialValue, ...response };
    }

    return initialValue;
  })


const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
      changePage: (state, action) => {
        console.log({action});
        if (action.payload === 'BACK' && state.pagination.current > 1) {
          state.pagination.current = state.pagination.current - 1;
        }

        if (action.payload === 'NEXT' && state.pagination.current < state.pagination.total) {
          state.pagination.current = state.pagination.current + 1;
        }
      },
      searchCharacter: (state, action) => {
        state.search = action.payload
      },
      viewCharacter: (state, action) => {
        state.selectedCharacter = action.payload;
      },
      saveFavourite: (state, action) => {
        state.favourites.push(action.payload);
      },
      deleteFavourite: (state, action) => {
        state.favourites = state.favourites.filter(fav => fav !== action.payload);
      },
  },
  extraReducers: {
    [getCharacters.fulfilled.type]: (state, action) => {
      // state.pagination.current = action.payload.page
      state.pagination.total = action.payload.info.pages;
      state.characters = action.payload.results;
    },
    [filterCharacter.fulfilled.type]: (state, action) => {
      state.pagination.total = action.payload.info.pages;
      state.characters = action.payload.results;
    },
    [getCharactersFavourites.fulfilled.type]: (state, action) => {
      state.characters = action.payload;
    }
  }
});



const store = configureStore({
   reducer: {
    character: characterSlice.reducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const CHARACTER_ACTIONS = characterSlice.actions;
export const dispatchCharacter = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;
