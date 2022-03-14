import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Places/auth/Login";
import Register from "./Places/auth/Register";
import MainPage from "./Places/Main/MainPage";
import Reset from "./Places/auth/Reset";
import {  Fragment } from "react";

function App() {


  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainPage/*" element={<MainPage/>} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Fragment>
  );
}

export default App;
