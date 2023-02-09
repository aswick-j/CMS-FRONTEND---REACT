import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  AdminElement,
  PublicElement,
  TaskElement,
  UseElement,
} from "./components/helpers/RouteElements";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/NavBar/Navbar";
import NotFound from "./components/NotFound/NotFound";
import Tasks from "./components/Tasks/Tasks";
import User from "./components/User/User";

const App = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <PublicElement>
                <Home />
              </PublicElement>
            }
          ></Route>
          <Route
            path="/user"
            element={
              <UseElement>
                <User />
              </UseElement>
            }
          ></Route>

          <Route
            path="/tasks"
            element={
              <TaskElement>
                <Tasks />
              </TaskElement>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
