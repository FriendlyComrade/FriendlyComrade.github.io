import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface myState {
    page: number,
    films: object[]
}

const mainReducer = createSlice({
    name: "toolkit",
    initialState: {
        page: 1,
        films: [] 
    },
    reducers: {
        nextPage(state) {
            state.page = state.page + 1
        },
        moreFilms(state: myState, action: PayloadAction<object>) {
            state.films.push(action.payload)
        }
    }
})

export default mainReducer.reducer
export const {nextPage, moreFilms} = mainReducer.actions