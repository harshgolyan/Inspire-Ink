import React from "react";

const Signup = () => {
    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div className=" relative h-[47.2vh] w-[40vh] bg-gradient-to-r from-fuchsia-700 to-blue-900 p-1 rounded-lg">
                    <div className="bg-slate-800 p-[1px] rounded-lg">
                        <div className="font-bold text-4xl font-mono p-2 flex justify-center text-white mt-3">Sign Up</div>
                        <div className="flex flex-col p-2 text-white font-medium">
                            <label htmlFor="email">Email</label>
                            <input className="border-2 p-2 rounded-lg bg-slate-800 border-fuchsia-800" type="text" placeholder="enter your email" />
                        </div>
                        <div className="flex flex-col p-2 text-white">
                            <label htmlFor="password">Password</label>
                            <input className="border-2 p-2 rounded-lg bg-slate-800 border-fuchsia-800" type="text" placeholder="********" />
                        </div>
                        <div className="">
                            <div className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 to-blue-900 flex justify-end p-2 font-medium">
                                Already have an Account ?
                            </div>
                        </div>
                        <div className="flex justify-center m-2 p-2 border-2 rounded-lg bg-gradient-to-r from-fuchsia-700 to-blue-900 text-white font-semibold text-lg">
                            <button>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;