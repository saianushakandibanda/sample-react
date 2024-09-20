import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    getTodos: (state) => {
      state.status = "loading";
    },
    getTodosSuccess: (state, action) => {
      state.status = "success";
      state.todos = action.payload;
    },
    getTodosFailure: (state, action) => {
      state.status = "failure";
        state.error = action.payload;
        state.todos = []
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((x) => x.id !== action.payload.id);
    },
  },
});

export const {
  addTodo,
  getTodos,
  getTodosSuccess,
  getTodosFailure,
  deleteTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
