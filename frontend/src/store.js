
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware),
  )
  // compose(applyMiddleware(...middleware)),
  // compose(
  //   applyMiddleware(...middleware),
  //   window.__REDUX_DEVT00LS_EXTENSION__ && window.__REDUX_DEVT00LS_EXTENSION__()
  // )
);

export default store;
