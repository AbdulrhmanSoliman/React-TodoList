// MUI imports
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// Components imports
import Todo from "./Todo";
// Hooks imports
import { useState, useEffect, useMemo } from "react";
import { useTodo, useTodosDispatch } from "../contexts/todoContext";
import { checkContext } from "../contexts/checkContext";
import { useToast } from "../contexts/ToastContext";
export default function TodoList() {
  // STATES
  let [title, setTitle] = useState("");
  let [allTodosType, setAllTodosType] = useState("all");
  let { showSnack } = useToast();
  const [confirmAction, setConfirmAction] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const allTodos = useTodo();
  const dispatch = useTodosDispatch();

  // EVENT HANDLERS
  function handleCheck(todoId) {
    dispatch({type: "checked", payload: todoId})
    showSnack("تم التعديل بنجاح");
  }
  const completed = useMemo(() => {
    return allTodos.filter((todo) => {
      console.log("testing call");
      return todo.isCompleted;
    });
  }, [allTodos]);

  const notCompleted = useMemo(
    () => allTodos.filter((todo) => !todo.isCompleted),
    [allTodos]
  );

  let todosRender;
  if (allTodosType === "completed") {
    todosRender = completed;
  } else if (allTodosType === "notCompleted") {
    todosRender = notCompleted;
  } else {
    todosRender = allTodos;
  }

  function deleteAlert(todoId) {
    setOpenDelete(true);
    setConfirmAction(todoId);
  }

  function EditAlert(todo) {
    setOpenEdit(true);
    setConfirmAction(todo);
  }

  const todoJSX = todosRender.map((todo) => (
    <checkContext.Provider key={todo.id} value={{ handleCheck, todo }}>
      <Todo
        deleteProp={() => deleteAlert(todo.id)}
        EditProp={() => EditAlert(todo)}
      />
    </checkContext.Provider>
  ));

  function handleDelete() {
    dispatch({ type: "deleted", payload: confirmAction });
    setOpenDelete(false);
    showSnack("تم حذف المهمة بنجاح");
  }

  function handleEdit() {
    dispatch({ type: "edit", payload: confirmAction });
    setOpenEdit(false);
    showSnack("تم التعديل بنجاح");
  }

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  function handleAddClick() {
    dispatch({
      type: "added",
      payload: {
        newTitle: title,
      },
    });
    setTitle("");
    showSnack("تم اضافة المهمة بنجاح");
  }

  useEffect(() => {
    dispatch({ type: "get" });
  }, [dispatch]);

  function changeTodoType(type) {
    setAllTodosType(type);
  }
  // ==|| EVENT HANDLERS ||==
  return (
    <>
      {/* ==== Delete Dialog ==== */}
      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد من حذف هذه المهمة ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لن تتمكن من استرجاع المهمة اذا حذفت
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>الغاء</Button>
          <Button onClick={handleDelete} autoFocus>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== Delete Dialog ==== */}
      {/* ==== Edit Dialog ==== */}
      <Dialog
        open={openEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"تعديل مهمة "}</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) =>
              setConfirmAction({ ...confirmAction, title: e.target.value })
            }
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="عنوان المهمة"
            type="text"
            fullWidth
            variant="outlined"
            value={confirmAction.title}
          />
          <TextField
            onChange={(e) =>
              setConfirmAction({
                ...confirmAction,
                description: e.target.value,
              })
            }
            autoFocus
            margin="dense"
            id="dsec"
            name="dsec"
            label="وصف المهمة"
            type="text"
            fullWidth
            variant="outlined"
            value={confirmAction.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>الغاء</Button>
          <Button onClick={handleEdit} autoFocus>
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== Edit Dialog ==== */}
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h3" color="#0c0c0c">
              مهامي
            </Typography>
            <Divider style={{ marginBlock: "20px" }} />

            {/* ==== Start ToggleButton ==== */}
            <ToggleButtonGroup
              color="primary"
              style={{ direction: "ltr" }}
              value={allTodosType}
              exclusive
              // onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton
                value="notCompleted"
                onClick={(e) => changeTodoType(e.target.value)}
              >
                غير المنجز
              </ToggleButton>
              <ToggleButton
                value="completed"
                onClick={(e) => {
                  changeTodoType(e.target.value);
                }}
              >
                منجز
              </ToggleButton>
              <ToggleButton
                value="all"
                onClick={(e) => {
                  changeTodoType(e.target.value);
                }}
              >
                الكل
              </ToggleButton>
            </ToggleButtonGroup>
            {/* ==== End ToggleButton ==== */}
            {/* ==== Start TODOS ==== */}
            <div className="cards_container">{todoJSX}</div>
            {/* ==== End TODOS ==== */}
            {/* ==== Start ADD TODOS ==== */}
            <Grid container spacing={2}>
              <Grid xs={8}>
                <TextField
                  id="outlined-basic"
                  label="اضف مهمة جديدة"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid xs={4}>
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => handleAddClick()}
                  disabled={title !== "" ? false : true}
                >
                  أضف
                </Button>
              </Grid>
            </Grid>
            {/* ==== End ADD TODOS ==== */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
