import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// Reducer
import mealsReducer from './store/reducers/meals';

//Navigation
import MealsNavigator from './navigation/MealsNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}
