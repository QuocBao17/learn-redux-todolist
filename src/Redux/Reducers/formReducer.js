import * as types from './../Contrants/actionConstrants';

const initialState={
    'id':'',
    'status':false
};
const formReducer=(state=initialState, {type, payload})=>{
    switch(type){
        case types.OPEN_FORM:
            var data={
                'id':payload,
                'status':true
            }
            return data;
        case types.CLOSE_FORM:
            var data={
                'id':'',
                'status':false
            }
            return data;
        default:
            return state;
    }
}
export default formReducer;