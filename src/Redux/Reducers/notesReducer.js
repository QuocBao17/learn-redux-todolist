import * as types from './../Contrants/actionConstrants';
var data =JSON.parse(localStorage.getItem('notes'));
const initialState=data?data:[];
var id='';
var cloneTask={};
var s4=()=>{
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
}
var guid=()=>{
    return s4()+s4()+'-'+s4()+s4()+'-'+s4()+s4()+'-'+s4()+s4();
}
const findIndex=(id,arr)=>{
    var result='-1'
    arr.forEach((item,index)=>{
        if(item.id===id){
            result=index;
        }
    })
    return result;
}
const notesReducer=(state=initialState,{type,payload})=>{
    switch(type){
        case types.ADD_NOTES:
            var data={
                id:guid(),
                notes:payload,
                status:false
            }
            const newArr=[...state];
            newArr.push(data)
            localStorage.setItem("notes",JSON.stringify(newArr));
            return newArr;
        default:
            return state;
    }
}
export default notesReducer;