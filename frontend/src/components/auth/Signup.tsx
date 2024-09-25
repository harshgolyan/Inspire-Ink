import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import Signin from "./Signin";

const Signup : React.FC = () => {
    const navigate = useNavigate()
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const {setUser} = useUserContext();

    const signupHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // Show loading toast
        const loadingToast = toast.loading("Signing up...");

        try {
            const response = await axios.post("https://backend.harshgolyan308.workers.dev/api/v1/user/signup", {
                name,email, password
            });
            setUser(response.data.user)
            console.log(response.data);
            if(response.data.message) {
                localStorage.setItem("jwt", response.data.jwt);
                toast.update(loadingToast, { render: response.data.message, type: "success", isLoading: false, autoClose: 3000 });
                navigate("/blogs");
            } else {
                toast.update(loadingToast, { render: response.data.error, type: "error", isLoading: false, autoClose: 3000 });
            }
        } catch (error) {
            console.log(error);
            toast.update(loadingToast, { render: "Signup failed. Please try again.", type: "error", isLoading: false, autoClose: 3000 });
        }
    };


    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div className=" relative h-[58.5vh] w-[40vh] bg-gradient-to-r from-fuchsia-700 to-blue-900 p-1 rounded-lg">
                    <div className="bg-slate-800 p-[1px] rounded-lg">
                        <div className="font-bold text-4xl font-mono p-2 flex justify-center text-white mt-3">Sign Up</div>
                        <div className="flex flex-col p-2 text-white font-medium">
                            <label htmlFor="name">Name</label>
                            <input className="border-2 p-2 rounded-lg bg-slate-800 border-fuchsia-800" type="text" placeholder="enter your name" onChange={(e) => setName(e.target.value)} required/>
                        </div>
                        <div className="flex flex-col p-2 text-white font-medium">
                            <label htmlFor="email">Email</label>
                            <input className="border-2 p-2 rounded-lg bg-slate-800 border-fuchsia-800" type="text" placeholder="enter your email" onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="flex flex-col p-2 text-white">
                            <label htmlFor="password">Password</label>
                            <input className="border-2 p-2 rounded-lg bg-slate-800 border-fuchsia-800" type="text" placeholder="********" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div>
                            <div className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 to-blue-900 flex justify-end p-2 font-medium cursor-pointer" onClick={() => {navigate('/signin')}}>
                                Already have an Account ?
                            </div>
                        </div>
                        <div className="flex justify-center m-2 p-2 border-2 rounded-lg bg-gradient-to-r from-fuchsia-700 to-blue-900 text-white font-semibold text-lg">
                            <button onClick={signupHandler}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;