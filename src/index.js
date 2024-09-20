import React from "react";
import { createRoot } from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header";

import Home from "./components/Home";
import Product from "./components/Product";
import Contact from "./components/Contact";
import About from "./components/About";
import Recipes from "./components/Recipes";
import Todo from "./components/Todo";
import appStore from "./state/appStoreConfig";
import DataGridTable from "./components/DataGrid";
import "./styles/main.css";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import TodoInfo from "./components/TodoInfo";
import CustomFilterTable from "./components/DataGridTable"
const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={appStore}>
          <Header />
          <div className="app-root">
            <Outlet />
          </div>
       
        </Provider>
      </ApolloProvider>
    </>
  );
};

export const appRoutes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product", element: <Product /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
      { path: "/recipes", element: <Recipes /> },
      { path: "/todos", element: <Todo /> },
      { path: "/todos/:id", element: <TodoInfo /> },
      {path: "/grid",element:<DataGridTable/>},
      {path: "/filter",element:<CustomFilterTable/>}
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes} />);

// src/features/todos/todoSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
//   const response = await fetch('https://dummyjson.com/todos');
//   const data = await response.json();
//   return data;
// });

// export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
//   const response = await fetch('https://dummyjson.com/todos', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newTodo),
//   });
//   const data = await response.json();
//   return data;
// });

// export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId) => {
//   await fetch(`https://dummyjson.com/todos/${todoId}`, {
//     method: 'DELETE',
//   });
//   return todoId;
// });

// export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
//   const response = await fetch(`https://dummyjson.com/todos/${updatedTodo.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updatedTodo),
//   });
//   const data = await response.json();
//   return data;
// });

// const todoSlice = createSlice({
//   name: 'todos',
//   initialState: {
//     list: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: {
//     [fetchTodos.pending]: (state) => {
//       state.status = 'loading';
//     },
//     [fetchTodos.fulfilled]: (state, action) => {
//       state.status = 'succeeded';
//       state.list = action.payload;
//     },
//     [fetchTodos.rejected]: (state, action) => {
//       state.status = 'failed';
//       state.error = action.error.message;
//     },
//     [addTodo.fulfilled]: (state, action) => {
//       state.list.push(action.payload);
//     },
//     [deleteTodo.fulfilled]: (state, action) => {
//       state.list = state.list.filter(todo => todo.id !== action.payload);
//     },
//     [updateTodo.fulfilled]: (state, action) => {
//       const updatedIndex = state.list.findIndex(todo => todo.id === action.payload.id);
//       if (updatedIndex !== -1) {
//         state.list[updatedIndex] = action.payload;
//       }
//     },
//   },
// });

// export default todoSlice.reducer;

// export const selectTodos = (state) => state.todos.list;

// export { fetchTodos, addTodo, deleteTodo, updateTodo };
