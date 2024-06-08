import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const token = Cookies.get('token')
// const user_email = Cookies.get('user_email')
// export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
//     try {    
//         const res = await axios.get(`http://localhost:8080/admin/user`, {
//             headers: {
//                 'Authorization': `Bearer ${token}` // Include the token in the Authorization header
//             }
//         })
//         console.log(res.data)
//         console.log("fetch user successfully ")
//         return res.data
//     } catch (error) {
//         console.log(error)
//     }
// })

export const fetchUserCart = createAsyncThunk("fetchUserCart", async (email) => {
    try {
        const res = await axios.get(`http://localhost:8080/user/cart`, {
            params: { email: email }
        })
        return res.data;
    } catch (error) {
        console.error('Error showing user cart:', error);
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersList: [],
        isLoggedIn: false,
        loading: false,
        error: null,
        user_cart: null,
        selectedCartItems: []
    }, 
    reducers: {
        setLoggin: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        resetUserCart: (state) => {
            state.user_cart = null;
        },
        addSelectedCartItems: (state, action) => {
            state.selectedCartItems = action.payload;
        },
        increaseQuantity: (state, action) => {
            const index = action.payload;
            state.user_cart.cart_detail[index].quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const index = action.payload
            state.user_cart.cart_detail[index].quantity = Math.max(state.user_cart.cart_detail[index].quantity - 1, 1)
        }
    },
 
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchUsers.pending, (state) => {
    //             state.loading = true;
    //         })
    //         .addCase(fetchUsers.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.usersList = action.payload;
    //         })
    //         .addCase(fetchUsers.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.error.message;
    //         })            
    // }
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserCart.pending, (state) => {
                        state.loading = true;
                    })
                    .addCase(fetchUserCart.fulfilled, (state, action) => {
                        state.loading = false;
                        state.user_cart = action.payload;
                    })
                    .addCase(fetchUserCart.rejected, (state, action) => {
                        state.loading = false;
                        state.error = action.error.message;
                    })  
    }
})
export const {addSelectedCartItems,setLoggin, resetUserCart, increaseQuantity, decreaseQuantity} = usersSlice.actions
export default usersSlice.reducer;