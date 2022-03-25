import { combineReducers } from "redux";
import notesReducer from "./notesReducer";
import tasksReducer from "./tasksReducer";
import formReducer from "./formReducer";
const rootReducer=combineReducers({
    notesReducer:notesReducer,
    tasksReducer:tasksReducer,
    formReducer:formReducer
})
export default rootReducer;