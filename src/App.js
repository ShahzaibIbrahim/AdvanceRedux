import { useEffect, Fragment } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData, fetchCartData } from "./store/cart-items-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.toggleCart.showCart);
  const notification = useSelector((state) => state.toggleCart.notification);
  const cart = useSelector((state) => state.cartItem.cartItems);
  const totalQuantity = useSelector((state) => state.cartItem.totalQuantity);
  const changed = useSelector((state) => state.cartItem.changed);

  useEffect(() => {
      if(isInitial) {
        isInitial = false;
        return;
      }
      
      if(changed) {
        dispatch(sendCartData({ cartItems: cart, totalQuantity }));
      }
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
