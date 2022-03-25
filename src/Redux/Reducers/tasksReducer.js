import * as types from './../Contrants/actionConstrants';
var data =JSON.parse(localStorage.getItem('tasks'));
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
const initialState=data?data:[];
const tasksReducer=(state=initialState,{type,payload})=>{
    switch(type){
        case types.ADD_TASK:
            var data={
                id:guid(),
                task:payload.task,
                time:payload.time,
                status:false
            }
            const newArr=[...state];
            newArr.push(data);
            localStorage.setItem("tasks",JSON.stringify(newArr));
            return newArr;
        case types.DONE_TASK:
            var index=findIndex(payload,state);
            cloneTask={...state[index]};
            cloneTask.status=true;
            state[index]=cloneTask;
            localStorage.setItem("tasks",JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            var index=findIndex(payload,state);
            state.splice(index,1);
            localStorage.setItem("tasks",JSON.stringify(state));
            return [...state];
        case types.EDIT_TASK:
            var index=findIndex(payload.id,state);
            cloneTask={...state[index]};
            cloneTask.task=payload.data;
            state[index]=cloneTask;
            localStorage.setItem("tasks",JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
}
export default tasksReducer;