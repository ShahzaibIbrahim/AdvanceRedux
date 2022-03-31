import { createSlice } from "@reduxjs/toolkit";

import { toggleCartActions } from "./index";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  changed: false,
};

const cartItemSlice = createSlice({
  name: "cartItems",
  initialState: initialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.cartItems = action.payload.cartItems;
    },
    addItem(state, action) {
      // expect item object {id, title, amount, price, totalPrice}
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (!existingItem) {
        state.cartItems.push({
          title: item.title,
          id: item.id,
          amount: 1,
          price: item.price,
          totalPrice: item.price,
        });
      } else {
        existingItem.amount++;
        existingItem.totalPrice = existingItem.totalPrice + item.price;
      }
      state.totalQuantity = state.totalQuantity + 1;
      console.log("Item Added:", item);
      state.changed = true;
    },
    removeItem(state, action) {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((x) => x.id === itemId);

      if (existingItem.amount === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      } else {
        existingItem.amount--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }

      state.totalQuantity = state.totalQuantity - 1;
      state.changed = true;
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
          body: JSON.stringify({
            cartItems: cart.cartItems,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending Cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        toggleCartActions.setNotification({
          status: "success",
          title: "Success!",
          message: "Cart Data Sent Successfully",
        })
      );
    } catch (error) {
      sendRequest().catch((error) => {
        dispatch(
          toggleCartActions.setNotification({
            status: "error",
            title: "Error!",
            message: "Cart Data Sending Failed",
          })
        );
      });
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      toggleCartActions.setNotification({
        status: "pending",
        title: "Sending Request",
        message: "Sending Request to Fetch Cart",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-learning-a77f0-default-rtdb.firebaseio.com/cart.json",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Fetching Cart data failed");
      }

      const responseData = await response.json();

      return responseData;
    };

    try {
      const cartData = await sendRequest();

      dispatch(
        cartItemSlice.actions.replaceCart({
          cartItems: cartData.cartItems || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
      dispatch(
        toggleCartActions.setNotification({
          status: "success",
          title: "Success!",
          message: "Cart Data Fetched Successfully",
        })
      );
    } catch (error) {
      sendRequest().catch((error) => {
        dispatch(
          toggleCartActions.setNotification({
            status: "error",
            title: "Error!",
            message: "Cart Data Sending Failed",
          })
        );
      });
    }
  };
};

export default cartItemSlice;
