import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodos,
  getTodosSuccess,
  getTodosFailure,
  deleteTodo,
} from "../state/todoSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getPosts = async () => {
      dispatch(getTodos());
      try {
        const res = await axios.get("https://dummyjson.com/todos");
        dispatch(getTodosSuccess(res.data.todos));
      } catch (error) {
        dispatch(getTodosFailure(error));
      }
    };
    getPosts();
  }, [dispatch]);

  const deleteTodoData = (todo) => {
    dispatch(deleteTodo(todo));
  };

  const todos = useSelector((state) => state.todo.todos);

  return (
    <div>
      <ul>
        {todos.map((x) => (
          <li key={x.id}>
            {x.todo} <button onClick={() => deleteTodoData(x)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
