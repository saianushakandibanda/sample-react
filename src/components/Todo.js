import { useQuery } from "@apollo/client";
import { GET_TODOS } from "../queries/queries";
import {useNavigate} from "react-router-dom";

const Todo = ()=>{
const navigateRoute = useNavigate();
const {loading,error,data} = useQuery(GET_TODOS)

if(loading) return <div>Loading...</div>
if(error) return <div>Error</div>
const redirect = (id) =>{
    navigateRoute(`/todos/${id}`)
}
return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {data.todos.map(todoData => (
          <li key={todoData.id}>
            {todoData.todo} 
            <button onClick={()=>redirect(todoData.id)}>Get Todo</button>
          </li>
         
        ))}
      </ul>
    </div>
)
}

export default Todo;