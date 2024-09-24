import React, { useState } from "react";
import { SigmaIcon, CircleUserRoundIcon, SearchIcon } from "lucide-react";
import Profile from "./Profile";

const Navbar: React.FC = () => {
    const [showProfile, setShowProfile] = useState(false);

    const handleProfileClick = () => {
        setShowProfile((prev) => !prev);
    };

    return (
        <div className="fixed top-0 z-10 backdrop-blur-sm bg-opacity-50 mx-5 my-3 p-5 rounded-lg w-[97%] border">
            <div className="flex justify-between items-center">
                <div className="text-white font-bold text-lg flex justify-evenly items-center">
                    <div>
                        <SigmaIcon color="white" size={50} />
                    </div>
                    <div className="text-white font-bold text-4xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
                        Inspire Ink
                    </div>
                </div>
                <div className="relative text-white font-bold text-2xl">
                    <input
                        className="bg-slate-800 p-2 px-5 border rounded-2xl pl-10"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                        type="text"
                        placeholder="search the blog ..."
                    />
                    <SearchIcon className="absolute left-3 top-1/2 pr-3 transform -translate-y-1/2 text-white" size={35} />
                </div>
                <div className="text-white font-bold text-2xl flex justify-evenly items-center">
                    <div className="text-white font-bold text-2xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
                        Hello, 
                    </div>
                    <div onClick={handleProfileClick} className="cursor-pointer">
                        <CircleUserRoundIcon color="white" size={50} />
                    </div>
                </div>
            </div>
            {showProfile && (
                <div className="absolute right-5 top-18 mt-2 z-20">
                    <Profile />
                </div>
            )}
        </div>
    );
};

export default Navbar;
