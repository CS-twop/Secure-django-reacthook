import rootReducer from "../reducers";
import userReducer from "../reducers/userReducer"
import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk"

const loggerMiddleware = createLogger();

export function configureStore(preloadedState = {}) {

  const store = createStore(rootReducer,applyMiddleware(thunk));

  return store;
}

// export default store;