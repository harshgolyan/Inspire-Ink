import React from "react";
import {
    SigmaIcon,
    CircleUserRoundIcon,
    SearchIcon,
    PlusCircleIcon,
    BookIcon
} from "lucide-react";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();

    const createPostHandler = () => {
        navigate("/create-post");
    };

    return (
        <div className="fixed top-0 z-10 bg-primary w-full p-5 border-b border-secondary">
            <div className="flex justify-between items-center">
                <div className="text-secondary font-bold text-lg flex items-center space-x-3" onClick={() => navigate("/")}>
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
                <div className="flex items-center space-x-4">
                    <div
                        className="flex justify-around items-center p-4 cursor-pointer"
                        onClick={createPostHandler}
                    >
                        <div>
                            <PlusCircleIcon color="white" size={36}/>
                        </div>
                    </div>
                    <div className="flex justify-around items-center p-2 cursor-pointer border-2 border-white rounded-full" onClick={() => navigate('/my-posts')}>
                        <div>
                            <BookIcon color="white" size={16}/>
                        </div>
                    </div>
                    <div className="text-secondary font-medium flex items-center space-x-3">
                        <span>Hello, {user?.name}</span>
                        <div
                            className="cursor-pointer"
                        >
                            <CircleUserRoundIcon color="white" size={40} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
