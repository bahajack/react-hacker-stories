import React, {useState, useEffect} from 'react';
import TodoList from './TodoList.js';
import AddTodoForm from './AddTodoForm.js';




function App() {


   const [todoList,setTodoList] = useState([]);
   const [isLoading, setIsLoading]=useState(true);
   useEffect(() => {
     new Promise((resolve, reject)=>{
       setTimeout(()=>{
         resolve({data:{
           todoList:JSON.parse(localStorage.getItem('savedTodoList')),
         }})
       }, 2000);
     })
      .then((result)=>{
        setTodoList(result.data.todoList);
        setIsLoading(false);
      })
   },[])

   useEffect(() => {
     if(!isLoading){
     localStorage.setItem('savedTodoList', JSON.stringify(todoList));}
   }, [todoList]);

   const addTodo = (newTodo) => {
   setTodoList([...todoList,newTodo]);
   }

const removeTodo = (id) => {
   const newTodo = todoList.filter((item) => {
     return item.id !== id;
   })
   setTodoList(newTodo);
};

  return (
    <>
      <h1>Todo List</h1>,

      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? <p>Loading...</p> :
      <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
      }
    </>



);
}
export default App;
