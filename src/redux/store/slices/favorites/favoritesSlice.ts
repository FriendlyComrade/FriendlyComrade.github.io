import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"


type FavoritesEntities = {
    movie: number,
    id: number
}

const favoritesAdapter = createEntityAdapter<FavoritesEntities>()

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: favoritesAdapter.getInitialState(),
    reducers: {
        addFav: favoritesAdapter.addOne,
        removeFav: favoritesAdapter.removeOne,
        loadFavs: favoritesAdapter.setAll,
        removeAllFavs: favoritesAdapter.removeAll
    }
})

export const {addFav, removeFav, loadFavs, removeAllFavs} = favoritesSlice.actions