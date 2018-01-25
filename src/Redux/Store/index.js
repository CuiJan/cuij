import {createStore} from "redux";
import {reducer,reducer2} from "../Reducer";
import {combineReducers} from "redux";

//合并所有的reducer 为一个大的reducer

const myreducer = combineReducers({
	changetitleReducer:reducer,
	changevalueReducer:reducer2
})
const store  = createStore(myreducer)

export default store;