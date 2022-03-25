import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNotes } from '../Redux/Actions/notesAction';
import { deleteTask, doneTask, editTask, saveTask } from '../Redux/Actions/tasksAction';
import { openForm, closeForm } from '../Redux/Actions/formAction';
import notesReducer from '../Redux/Reducers/notesReducer';
import './main.scss';
const Main =()=>{
    const formStatus=useSelector(state=>state.formReducer);
    const listNotes=useSelector(state=>state.notesReducer);
    console.log(listNotes);
    const date=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const COLORS=['#72779B','#B67257','#A29E53','#4F846D','#8F568B','#6D779E',"#AE745A"]
    const dispatch=useDispatch();
    const [input, setInput]=useState({});
    const [notes, setNotes]=useState();
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setInput(
            {
                ...input,
                [name]:value
            }
        )
    }
    const handleChangeNotes=(e)=>{
        const value=e.target.value;
        setNotes(value)
    }
    const onSaveNotes=(e)=>{
        e.preventDefault();
        dispatch(saveNotes(notes))
        setNotes('');
    }
    const onSaveTask=(e)=>{
        e.preventDefault();
        dispatch(saveTask(input))
        setInput('')
    }
    const onClose=()=>{
        dispatch(closeForm());
    }
    const onSaveEdit=(e)=>{
        e.preventDefault();
        dispatch(editTask(
            {
                id:formStatus.id,
                data:input['taskEdit']
            }
        ))
        setInput({
            'taskEdit':''
        })
        dispatch(closeForm());
    }
    return(
        <div className='main'>
            <div className='main__container'>
                <div className="main__container__top">
                    <div className='main__container__top--name'>
                        <h1>WEEKLY TO DO LIST</h1>
                    </div>
                    <div className="main__container__top--date">
                        <p>MARCH, 2021</p>
                    </div>
                </div>
                <div className="main__container__content">
                    <div className="main__container__content__form">
                        <div className="form--task">
                            <form action="">
                                <p>Tasks</p>
                                <textarea name="task" id="" cols="30" rows="5" placeholder='What sould we do ?' onChange={handleChange} value={input['task']||''}>

                                </textarea>
                                <select name="time" onChange={handleChange}>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                                <button type='submit' onClick={onSaveTask}>Save</button>
                            </form>
                        </div>
                        <div className="form--notes">
                            <form action="">
                                <p>Notes</p>
                                <textarea cols="30" rows="5" placeholder='Save notes'  onChange={handleChangeNotes} value={notes||''}></textarea>
                                <button type='submit' onClick={onSaveNotes}>Save notes</button>
                            </form>
                        </div>
                    </div>
                    <div className="main__container__content__list">
                        {
                            formStatus.status?<div className="popup">
                            <div className='popup__top'>
                                <p>Edit Task</p>
                                <i class="fa-solid fa-xmark" onClick={onClose}></i>
                            </div>
                            <form action="">
                                <textarea id="" cols="70" rows="10" placeholder='What should we do?' onChange={handleChange} name='taskEdit' value={''||input["taskEdit"]}></textarea>
                                <button onClick={onSaveEdit}>Save</button>
                            </form>
                        </div>:null
                        }
                        {
                            date.map((item,index)=>(
                                <Item date={item} data={input['taskEdit']} color={COLORS[index]} key={index}></Item>
                            ))
                        }
                        <div className="notes">
                            <div className="notes__container">
                                <div className="notes__container__top">
                                    <p style={{backgroundColor:'#72779B'}}>Notes</p>
                                </div>
                                <div className="notes__container__content" style={{border: `1px dashed #72779B `}}>
                                    {
                                        listNotes.map((item,index)=>(
                                            <div className="task">
                                                <div className="task__container">
                                                    <p>{item.notes} <span className={`${item.status?'done':'no-done'}`}><i className="fa-solid fa-check"></i></span></p>
                                                    
                                                    <div className="task__container--action">
                                                        <i className="fa-solid fa-check "  ></i>
                                                        <i className="fa-solid fa-trash"  ></i>
                                                        <i className="fa-solid fa-pen" ></i>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const Item=(props)=>{
    const listTask=useSelector(state=>state.tasksReducer)
    return(
        <div className="item">
            <div className="item__container">
                <div className="item__container__top">
                    <p style={{backgroundColor:props.color}}>{props.date}</p>
                </div>
                <div className="item__container__content" style={{border: `1px dashed ${props.color}`}}>
                    {
                        listTask.map((item,index)=>{
                            if(item.time===props.date){
                                return <Task item={item} date={props.date} data={props.data} key={index}></Task>
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}
const Task=(props)=>{
    const dispatch=useDispatch();
    const onDone=(e,id)=>{
        e.preventDefault();
        dispatch(doneTask(id))
    }
    const onDelete=(e,id)=>{
        e.preventDefault();
        dispatch(deleteTask(id))
    }
    const onEdit=(e,id)=>{
        e.preventDefault();
        dispatch(openForm(id));
       
    }
    const {item,data}=props
    return(
    <div className="task">
        <div className="task__container">
            <p>{item.task} <span className={`${item.status?'done':'no-done'}`}><i className="fa-solid fa-check"></i></span></p>
            
            <div className="task__container--action">
                <i className="fa-solid fa-check "  ></i>
                <i className="fa-solid fa-trash" onClick={(e)=>onDelete(e,item.id)} ></i>
                <i className="fa-solid fa-pen" onClick={(e)=>onEdit(e,item.id)}></i>
            </div>
        </div>
    </div>
   )
}
export default Main;