import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      todo
      completed
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      price
      description
    }
  }
`;

export const GET_TODO = gql`
  query GetTodo($id:Int!){
    todo(id:$id){
      id
      todo
      completed
    }
  }
`;
