import { combineReducers } from "redux";
import reducer from "./reducer";
import phoneReducer from "./phoneReducer";

export default combineReducers({
    top: reducer,
    phone: phoneReducer
}) 