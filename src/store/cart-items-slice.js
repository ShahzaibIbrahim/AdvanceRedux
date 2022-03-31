import { createSlice } from "@reduxjs/toolkit";

import { toggleCartActions } from "./index";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
};

const cartItemSlice = createSlice({
  name: "cartItems",
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      // expect item object {id, title, amount, price, totalPrice}
      const item = action.payload;
      const existingItem = state.cartItems.find(i => i.id === item.id);
      if(!existingItem) {

        state.cartItems.push({
            title: item.title,
            id : item.id,
            amount : 1,
            price: item.price,
            totalPrice: item.price
        });
      } else {
        existingItem.amount++;
        existingItem.totalPrice = existingItem.totalPrice + item.price;

      }
      state.totalQuantity = state.totalQuantity + 1;
      console.log('Item Added:', item);
    },
    removeItem(state, action) {
      const itemId = action.payload;  
      const existingItem = state.cartItems.find((x) => x.id === itemId);

      if(existingItem.amount === 1) {
        state.cartItems  = state.cartItems.filter(item => item.id !==itemId);
      } else {
          existingItem.amount--;
          existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }

      state.totalQuantity = state.totalQuantity - 1;
    },
  },
});

export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(
        toggleCartActions.setNotification({
          status: "pending",
          title: "Sending Request",
          message: "Sending Request to Cart",
        })
      );

      const sendRequest = async () => {
        const response = await fetch(
          "https://react-learning-a77f0-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify(cart),
          }
        );
  
        if (!response.ok) {
          throw new Error("Sending Cart data failed");
        }
      }
      
      try {
        await sendRequest();
        dispatch(
          toggleCartActions.setNotification({
            status: "success",
            title: "Success!",
            message: "Cart Data Sent Successfully",
          })
        );
      } catch(error) {
        sendCartData().catch((error) => {
          dispatch(
            toggleCartActions.setNotification({
              status: "error",
              title: "Error!",
              message: "Cart Data Sending Failed",
            })
          );
        });
      }
      
  }
}

export default cartItemSlice;
