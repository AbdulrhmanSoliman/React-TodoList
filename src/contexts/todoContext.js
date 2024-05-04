import { createContext, useReducer, useContext } from "react";
import reduce from "../reducers/todoReducer";

const TodoContext = createContext([]);
const DispatchContext = createContext(null);
const TodoProvider = ({ children }) => {
  let [allTodos, dispatch] = useReducer(reduce, []);
  return (
    <TodoContext.Provider value={allTodos}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodoContext.Provider>
  );
};
export const useTodo = () => {
  return useContext(TodoContext);
};
export const useTodosDispatch = () => {
  return useContext(DispatchContext);
};
export default TodoProvider;
