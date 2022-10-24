import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./pages/AddUser";
import Home from "./pages/Home";
import Update from "./pages/Update";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" exact />
          <Route element={<Update />} path="/update/:id" exact />
          <Route element={<AddUser />} path="/add" exact />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
