import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "./rootReducer";

const composedEnhancer = composeWithDevTools()

export default createStore(rootReducer, composedEnhancer);
