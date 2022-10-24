import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getuser();
  }, []);

  const getuser = () => {
    axios
      .get("http://localhost:3004/users")
      .then((res) => {
        setloading(false);
        console.log(res.data);
        setusers(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlenavigate = () => {
    navigate("/add");
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3004/users/${id}/`)
      .then((res) => {
        console.log(res);
        getuser()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="innercontainer">
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: 2 }}
          onClick={handlenavigate}
        >
          Add user
        </Button>
        {loading ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          </>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>phone</TableCell>
                    <TableCell align="center">action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <>
                      <TableRow key={index}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="warning"
                            sx={{ marginX: 2 }}
                            onClick={() => handleEdit(user.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
