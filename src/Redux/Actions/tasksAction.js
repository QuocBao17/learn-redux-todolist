import * as types from './../Contrants/actionConstrants';
export const saveTask=(data)=>{
    return {
        type:types.ADD_TASK,
        payload:data
    }
}
export const doneTask=(id)=>{
    return{
        type: types.DONE_TASK,
        payload:id
    }
}

export const deleteTask=(id)=>{
    return{
        type: types.DELETE_TASK,
        payload:id
    }
}
export const editTask=(data)=>{
    return{
        type:types.EDIT_TASK,
        payload:data
    }
}