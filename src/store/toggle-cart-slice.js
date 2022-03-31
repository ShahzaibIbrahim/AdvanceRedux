import { createSlice } from "@reduxjs/toolkit";

const initialState = { showCart: false, notification: null };

const toggleCartSlice = createSlice({
  name: "toggleCart",
  initialState: initialState,
  reducers: {
    showhideCart(state) {
      state.showCart = !state.showCart;
    },
    setNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});


export default toggleCartSlice;
