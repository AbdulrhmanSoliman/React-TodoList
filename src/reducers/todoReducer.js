// Other npm imports [uniqueid]
import { v4 as uuidv4 } from "uuid";

export default function reduce(currectTodos, action) {
  switch (action.type) {
    case "added": {
      let newTodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        description: "",
        isCompleted: false,
      };
      let updatedTodos = [...currectTodos, newTodo];
      window.localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "deleted": {
      const todoFilter = currectTodos.filter((t) => {
        return t.id !== action.payload;
      });
      window.localStorage.setItem("todos", JSON.stringify(todoFilter));
      return todoFilter;
    }
    case "edit": {
      console.log(action.payload);
      const todoEdit = currectTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            description: action.payload.description,
          };
        } else {
          return t;
        }
      });
      window.localStorage.setItem("todos", JSON.stringify(todoEdit));
      return todoEdit;
    }
    case "get":{
      const localTodos = JSON.parse(window.localStorage.getItem("todos")) ?? [];     
      return localTodos;
    }
    case "checked":{
      const todoMap = currectTodos.map((todo) => {
        if (todo.id === action.payload) {
          const updatedTodos = {
            ...todo, isCompleted : !todo.isCompleted
          }
          return updatedTodos;
        }
        return todo;
      });
      window.localStorage.setItem("todos", JSON.stringify(todoMap));
      return todoMap;
    }
    default: {
      throw Error("Unknown Action ", action.type);
    }
  }
}
