import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const middleware = [thunk]

const composeEnhancers = composeWithDevTools({})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

export default store;