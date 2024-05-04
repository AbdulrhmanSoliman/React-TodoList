import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from "react";
import { checkContext } from "../contexts/checkContext";


export default function CheckTodo() {
  const {handleCheck, todo} = useContext(checkContext)
  return (
    <IconButton
    onClick={()=>handleCheck(todo.id)}
      className="iconBtn"
      style={{
        transition: "0.1s",
        color: todo.isCompleted ? "white" : "#ff2121",
        background: todo.isCompleted ? "#8bc34a" : "white",
        border: "3px solid",
        borderColor: todo.isCompleted ? "#8bc34a" : "#ff2121"
      }}
    >
      {todo.isCompleted ? <CheckIcon/> : <CloseIcon/>}
    </IconButton>
  )
}
