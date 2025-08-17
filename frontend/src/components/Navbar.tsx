import React, { useState } from "react";
import { SigmaIcon, CircleUserRoundIcon, SearchIcon } from "lucide-react";
import Profile from "./Profile";
import { useUserContext } from "../context/userContext";

const Navbar: React.FC = () => {
    const [showProfile, setShowProfile] = useState(false);
    const { user } = useUserContext();

    const handleProfileClick = () => {
        setShowProfile((prev) => !prev);
    };

    return (
        <div className="fixed top-0 z-10 bg-primary w-full p-5 border-b border-secondary">
            <div className="flex justify-between items-center">
                <div className="text-secondary font-bold text-lg flex items-center space-x-3">
                    <SigmaIcon color="white" size={40} />
                    <div className="text-secondary font-bold text-2xl">
                        Inspire Ink
                    </div>
                </div>
                <div className="relative w-1/3">
                    <input
                        className="w-full bg-secondary text-primary p-2 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                        type="text"
                        placeholder="Search the blog..."
                    />
                    <SearchIcon 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" 
                        size={24} 
                    />
                </div>
                <div className="text-secondary font-medium flex items-center space-x-3">
                    <span>Hello, {user?.name}</span>
                    <div onClick={handleProfileClick} className="cursor-pointer">
                        <CircleUserRoundIcon color="white" size={40} />
                    </div>
                </div>
            </div>
            {showProfile && (
                <div className="absolute right-5 top-20 mt-2 z-20">
                    <Profile />
                </div>
            )}
        </div>
    );
};

export default Navbar;
