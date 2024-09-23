import React from "react";
import Navbar from "./components/Navbar";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Blogs from "./components/main/Blogs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
    <div className="bg-slate-800">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
    </div>
    </>
  )
}

export default App