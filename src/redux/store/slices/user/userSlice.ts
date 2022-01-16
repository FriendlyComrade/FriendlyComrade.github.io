import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id: 0,
    email: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser: (state) => {
            return {
                ...initialState
            }
        },
        setUser: (_state, action) => {
            return {
                ...action.payload
            }
        }
    }
})

export const {resetUser, setUser} = userSlice.actions
export default userSlice.reducer