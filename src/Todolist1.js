import React, { useState }  from 'react';
import "./App";
import "./App.css";
import '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {format} from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';


const Todolist=()=>{
  const [todo, setTodo] = useState({desc: '', dateString:''});
  const [todos, setTodos] = useState([]);

  const addTodo= (event) => {
      event.preventDefault();
      setTodos([...todos, todo]);
    }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }
   
 const [selectedDate, setSelectedDate] = useState('');
 
  const handleDateChange = (selectedDate,date) => {   
    setSelectedDate(date);
    const currentDate = selectedDate || date; 
    const dString = format(currentDate, 'dd.MM.yyyy')
    setTodo({...todo, dateString:dString})
    
    console.log(dString);
  }

  const delRow = (index, e) => {
    setTodos(todos.filter((todo, i) => i !== index));
    console.log(todos);
  }
    
  return (
<div className="App">
    <div className="InputField">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker label="Select a date" selected={selectedDate} 
      onChange={date => handleDateChange(date)}
      format="dd.MM.yyyy"
      disablePast="true"
      >   
      </DatePicker>
    </MuiPickersUtilsProvider>{' '}
      <TextField label="Description" type="text" name="desc" 
      value={todo.desc} onChange={inputChanged}/>{' '}
      <Button variant="contained" color="primary" onClick={addTodo}>Add</Button>
      </div>
    <table>
    <tbody>
      {
      todos.map((todo, index) => 
        <tr key={index}>
          <td>{todo.dateString}</td>
          <td>{todo.desc}</td>
          <td><Button 
          variant="contained" 
          color="secondary" 
          startIcon={<DeleteIcon />} 
          size="small" 
          id={index} 
          onClick={(e) => delRow(index, e)}>
          </Button></td>
        </tr>)
      }
    </tbody>
    </table>
</div>
  );
    } 

    export default Todolist;