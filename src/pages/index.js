import { Box, Button, Container, TextField } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/task"
    : "https://next-todo-app-with-db.vercel.app/api/task";
export default function Home(props) {
  const [state, setState] = useState(props?.data?.data || "");
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState("");

  const handleEditIcon = (payload) => {
    setValue(payload?.name);
    setTask(payload);
    setEdit(!false);
  };

  const handleSubmit = async () => {
    try {
      const response = !edit
        ? await axios.post(url, { name: value })
        : await axios.put(url + "/" + task?._id, {
            name: value,
            completed: false,
          });
      if (edit) {
        let filtered = [...state].filter((item) => item?._id !== response?._id);
        setState([...filtered, response.data?.data]);
        setEdit(false);
        setTask();
        setValue("");
      } else {
        setState([...state, response?.data?.data]);
        setValue("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(url + "/" + id);

      if (response.status === 200) {
        let filtered = [...state].filter((item) => item?._id !== id);
        setState([...filtered]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ my: 1 }}>
            <TextField
              label={"Name"}
              value={value}
              margin="normal"
              name={"name"}
              variant={"outlined"}
              fullWidth
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={handleSubmit}
            >
              {"Submit"}
            </Button>
          </Box>
          {state?.length > 0 && (
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
              <nav aria-label="main mailbox folders">
                <List>
                  {state.map((item) => (
                    <ListItem key={item?._id} disablePadding>
                      <ListItemButton>
                        <ListItemText primary={item?.name} />
                        <ListItemIcon onClick={() => handleEditIcon(item)}>
                          <EditIcon />
                        </ListItemIcon>
                        <ListItemIcon onClick={() => deleteTask(item?._id)}>
                          <DeleteIcon />
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </nav>
            </Box>
          )}
        </Box>
      </Container>
    </Fragment>
  );
}

export const getServerSideProps = async () => {
  try {
    // await dbConnect();
    const response = await axios.get(url);
    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
};
