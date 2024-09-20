import { useParams } from "react-router-dom";
import { GET_TODO } from "../queries/queries";
import { useQuery } from "@apollo/client";
const TodoInfo = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_TODO, {
    variables: { id: Number(id) },
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!!</div>;

  return( <>
  <div>{data.todo.id}</div>
  <div>{data.todo.todo}</div>
  <div>{data.todo.completed}</div>
  </>);
};

export default TodoInfo;
