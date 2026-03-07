import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredients';
import constructorReducer from '../slices/constructor';
import userReducer from '../slices/user';
import newOrderReducer from '../slices/newOrder';
import feedReducer from '../slices/feed';
import ordersListReducer from '../slices/ordersList';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  user: userReducer,
  newOrder: newOrderReducer,
  feed: feedReducer,
  ordersList: ordersListReducer
});
