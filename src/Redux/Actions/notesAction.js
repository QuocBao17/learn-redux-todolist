import * as types from './../Contrants/actionConstrants';

export const saveNotes=(notes)=>{
    return{
        type:types.ADD_NOTES,
        payload:notes
    }
}