import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import ViewPost from "../Pages/ViewPost";
import CreatePost from "../Pages/CreatePost";
import EditPost from "../Pages/EditPost";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/post/:id" element={<ViewPost />} />
    <Route path="/create" element={<CreatePost />} />
    <Route path="/edit/:id" element={<EditPost />} />
  </Routes>
);

export default AppRoutes;
