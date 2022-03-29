
import { createSlice } from "@reduxjs/toolkit";

const initialState = {showCart : false};

const toggleCartSlice = createSlice({
    name: 'toggleCart',
    initialState: initialState,
    reducers : {
        showhideCart(state) {
            state.showCart = !state.showCart;
        }
    }
});

export default toggleCartSlice;