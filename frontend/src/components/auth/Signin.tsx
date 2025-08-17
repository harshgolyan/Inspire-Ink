import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const Signin: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { setUser } = useUserContext();

    const signinHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const loadingToast = toast.loading("Signing in...");

        try {
            const response = await axios.post("https://backend.harshgolyan308.workers.dev/api/v1/user/signin", {
                email, password
            });
            setUser(response.data.user);
            if (response.data.message) {
                localStorage.setItem("jwt", response.data.jwt);
                toast.update(loadingToast, { render: response.data.message, type: "success", isLoading: false, autoClose: 2000 });
                navigate("/blogs");
            } else {
                toast.update(loadingToast, { render: response.data.error, type: "error", isLoading: false, autoClose: 2000 });
            }
        } catch (error) {
            console.log(error);
            toast.update(loadingToast, { render: "Signin failed. Please try again.", type: "error", isLoading: false, autoClose: 2000 });
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            <div className="w-1/2 bg-primary flex justify-center items-center p-10">
                <h1 className="text-secondary text-4xl font-bold leading-relaxed text-center">
                    "Writing is the painting of the voice. <br />
                    Sign in to let your words shine."
                </h1>
            </div>
            <div className="w-1/2 bg-secondary flex flex-col justify-center items-center px-20">
                <div className="font-bold text-4xl font-mono text-primary mb-10">Sign In</div>

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

                <div className="flex underline justify-end w-full max-w-sm text-sm text-primary cursor-pointer mb-6" onClick={() => { navigate('/') }}>
                    Create an Account!
                </div>

                <div className="w-full max-w-sm">
                    <button 
                        onClick={signinHandler} 
                        className="w-full bg-primary text-secondary font-semibold py-2 rounded-lg hover:opacity-90 transition duration-300"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signin;