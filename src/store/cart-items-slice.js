
import { createSlice } from "@reduxjs/toolkit";

const initialState = {cartItems : []};

const cartItemSlice = createSlice({
    name: 'cartItems',
    initialState: initialState,
    reducers : {
        addItem(state, action) { // expect item object {id, name, amount, price}
            state.cartItems = state.cartItems.concat(action.payload.item);
        },
        removeItems(state, action) {
            state.cartItems.findIndex((x) => x.id === action.payload.item.id);
        }
    }
});


export default cartItemSlice;