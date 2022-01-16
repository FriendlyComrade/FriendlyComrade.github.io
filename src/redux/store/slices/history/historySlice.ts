import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

type HistoryEntities = {
    id: string;
    query: string;
}

const historyAdapter = createEntityAdapter<HistoryEntities>()

export const historySlice = createSlice({
    name: "history",
    initialState: historyAdapter.getInitialState(),
    reducers: {
        addNewHistory: historyAdapter.addOne,
        loadHistory: historyAdapter.setAll,
        removeAllHistory: historyAdapter.removeAll
    }
})

export const {addNewHistory, loadHistory, removeAllHistory} = historySlice.actions