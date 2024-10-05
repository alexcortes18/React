import { createSlice } from '@reduxks/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: { cartIsVisible: false },
    reducers: {
        toggle(state){
            state.cartIsVisible = !state.cartIsVisible;
        }
    }
});

export default uiSlice;
export const uiActions = uiSlice.actions;
