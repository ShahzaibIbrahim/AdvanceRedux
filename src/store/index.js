import { configureStore } from "@reduxjs/toolkit";
import toggleCartSlice from "./toggle-cart-slice";
import cartItemSlice from "./cart-items-slice";

const store = configureStore({
  reducer: { toggleCart: toggleCartSlice.reducer, cartItem: cartItemSlice.reducer },
});

export const toggleCartActions = toggleCartSlice.actions;
export const cartItemActions = cartItemSlice.actions;
export default store;
