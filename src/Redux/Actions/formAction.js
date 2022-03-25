import * as types from './../Contrants/actionConstrants';
export const openForm=(id)=>{
    return{
        type:types.OPEN_FORM,
        payload:id
    }
}
export const closeForm=()=>{
    return{
        type:types.CLOSE_FORM
    }
}