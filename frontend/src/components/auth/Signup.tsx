import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { setUser } = useUserContext();

    const signupHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const loadingToast = toast.loading("Signing up...");

        try {
            const response = await axios.post("https://backend.harshgolyan308.workers.dev/api/v1/user/signup", {
                name, email, password
            });
            setUser(response.data.user);
            if (response.data.message) {
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
        <div className="flex min-h-screen w-full">
            <div className="w-1/2 bg-primary flex justify-center items-center p-10">
                <h1 className="text-secondary text-4xl font-bold leading-relaxed text-center">
                    "Every story begins with a name. <br />
                    Sign up and start writing yours."
                </h1>
            </div>
            <div className="w-1/2 bg-secondary flex flex-col justify-center items-center px-20">
                <div className="font-bold text-4xl font-mono text-primary mb-10">Sign Up</div>

                <div className="flex flex-col mb-6 w-full max-w-sm">
                    <label htmlFor="name" className="text-primary font-medium mb-2">Name</label>
                    <input 
                        className="border-2 border-primary p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        type="text"
                        placeholder="enter your name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col mb-6 w-full max-w-sm">
                    <label htmlFor="email" className="text-primary font-medium mb-2">Email</label>
                    <input 
                        className="border-2 border-primary p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        type="text"
                        placeholder="enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col mb-6 w-full max-w-sm">
                    <label htmlFor="password" className="text-primary font-medium mb-2">Password</label>
                    <input 
                        className="border-2 border-primary p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        type="password"
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex underline justify-end w-full max-w-sm text-sm text-primary cursor-pointer mb-6" onClick={() => { navigate('/signin') }}>
                    Already have an Account?
                </div>

                <div className="w-full max-w-sm">
                    <button 
                        onClick={signupHandler} 
                        className="w-full bg-primary text-secondary font-semibold py-2 rounded-lg hover:opacity-90 transition duration-300"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
