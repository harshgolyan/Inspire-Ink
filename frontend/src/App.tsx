import React from "react";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Blogs from "./components/main/Blogs";
import CreatePost from "./components/CreatePost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from './context/userContext'

const App = () => {
  return (
    <UserProvider> 
      <div className="bg-slate-800">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
