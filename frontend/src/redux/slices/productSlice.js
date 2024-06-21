import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name : 'product',
    initialState: {
        data : null,
        isModalShown: false,
        loading: false,
        error: null,
    },
    reducers: {
        setProduct: (state, action) => {
            state.data = action.payload;
        },
        setIsModalShown: (state, action) => {
            state.isModalShown = action.payload
        }
    }
})

export const {setProduct, setIsModalShown} = productSlice.actions;
export default productSlice.reducer;