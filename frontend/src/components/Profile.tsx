import React from "react";
import { useUserContext } from "../context/userContext";
import { UserRoundIcon, ArrowRight, PlusIcon, BookIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreatePost from "./CreatePost";
const Profile = () => {
    const navigate = useNavigate();
    const {user} = useUserContext();
    console.log(user)

    const logOutHandler = () => {
        localStorage.removeItem('jwt')
        console.log("jwt removed")
        navigate('/signin')
    }

    const createPostHandler = () => {
        navigate('/create-post')
    }

    return (
        <>
            <div>
                <div className="h-[42vh] w-[35vh] p-5 bg-slate-400 z-10 rounded-lg ">
                    <div className="flex justify-around items-center border p-4 rounded-lg bg-white mt-2">
                        <div>
                            <UserRoundIcon />
                        </div>
                        <div className="font-semibold text-lg ">
                            {user?.name.toUpperCase()}
                        </div>
                    </div>
                    <div className="flex justify-around items-center p-4 rounded-lg bg-green-600 mt-2 cursor-pointer" onClick={createPostHandler}>
                        <div>
                            <PlusIcon color="white" />
                        </div>
                        <div className="font-semibold text-lg text-white">
                            Create a Blog
                        </div>
                    </div>
                    <div className="flex justify-around items-center p-4 rounded-lg bg-yellow-600 mt-2">
                        <div>
                            <BookIcon color="white" />
                        </div>
                        <div className="font-semibold text-lg text-white">
                            Your Posts
                        </div>
                    </div>
                    <div className="flex justify-around items-center p-4 rounded-lg bg-red-600 mt-2 cursor-pointer" onClick={logOutHandler}>
                        <div className="font-semibold text-lg text-white uppercase">
                           Log Out
                        </div>
                        <div>
                            <ArrowRight color="white" />
                        </div>
                    </div>
                </div>
            </div>        
        </>
    )
}

export default Profile;