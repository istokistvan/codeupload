import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: '',
    code: '',
    purchase_time: ''
}

export const entrySlice = createSlice({
    name: 'entry',
    initialState,
    reducers: {
        registration: (state, action) => {
            state.email = action.payload.email
            state.code = action.payload.code
            state.purchase_time = action.payload.purchase_time
            localStorage.setItem('user', JSON.stringify(state))
        },
        reset: (state) => {
            state.email = ''
            state.code = ''
            state.purchase_time = ''
            localStorage.removeItem('user')
        }
    }
})

export const {registration, reset} = entrySlice.actions

export const selectData = (state) => state

export default entrySlice.reducer