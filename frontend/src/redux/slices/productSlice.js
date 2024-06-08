import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name : 'product',
    initialState: {
        data : null,
        loading: false,
        error: null,
    },
    reducers: {
        setProduct: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const {setProduct} = productSlice.actions;
export default productSlice.reducer;