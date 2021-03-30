import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../../reducers";

const middleware = [thunk];

// enhancers
const enhancers = [];

if (typeof window !== 'undefined' && process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

// store
const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, composedEnhancers);

  return store;
};

export default configureStore;
