import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';
import { useDispatch } from 'react-redux';
import {toggleCartActions} from '../../store/index';

const MainHeader = (props) => {
  const dispatch = useDispatch();

  const cartButtonClickHandler = () => {
    dispatch(toggleCartActions.showhideCart());
  }

  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton onClick={cartButtonClickHandler}/>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
