import React from "react";
import Navbar from "./components/Navbar";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";

const App = () => {
  return (
    <>
    <div className="bg-slate-800">
      {/* <Signup /> */}
      <Signin />
    </div>
    </>
  )
}

export default App