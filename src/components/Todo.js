import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";
import CheckTodo from "./CheckTodo";
// icons imports
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { checkContext } from "../contexts/checkContext";


export default function Todo({deleteProp, EditProp}) {
  const { todo } = useContext(checkContext);
  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#00796b",
          color: "white",
          marginBlock: 2,
          direction: "rtl",
        }}
      >
        <CardContent>
          <Grid container spacing={2} className="addTodo">
            <Grid xs={8} textAlign="right">
              <Typography
                variant="h5"
                className={todo.isCompleted ? "del" : ""}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="#ccc"
                className={todo.isCompleted ? "del" : ""}
              >
                {todo.description}
              </Typography>
            </Grid>
            <Grid
              xs={4}
              display="flex"
              alignItems="center"
              justifyContent="space-around"
            >
              {/* ==== Check BTN ==== */}
              <CheckTodo />
              {/* ==== Check BTN ==== */}
              {/* ==== Edit BTN ==== */}
              <IconButton
                className="iconBtn"
                onClick={EditProp}
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "3px solid #1769aa",
                }}
              >
                <EditIcon />
              </IconButton>
              {/* ==== Edit BTN ==== */}
              {/* ==== Delete BTN ==== */}
              <IconButton
                className="iconBtn"
                onClick={deleteProp}
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "3px solid #b23c17",
                }}
              >
                <DeleteIcon />
              </IconButton>
              {/* ==== Delete BTN ==== */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
