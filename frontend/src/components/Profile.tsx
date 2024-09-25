import { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { UserRoundIcon, ArrowRight, PlusIcon, BookIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../App.css"


const Profile = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const {user} = useUserContext();

    useEffect(() => {
        setIsVisible(true);
    }, [])

    const logOutHandler = () => {
        localStorage.removeItem('jwt')
        navigate('/signin')
    }

    const createPostHandler = () => {
        navigate('/create-post')
    }

    return (
        <>
            <div>
                <div className={`h-[42vh] w-[35vh] p-5 bg-slate-400 z-10 rounded-lg ${isVisible ? 'slide-in' : 'opacity-0'} `}>
                    <div className="flex justify-around items-center border border-zinc-800 p-4 rounded-lg bg-zinc-300 mt-2">
                        <div>
                            <UserRoundIcon />
                        </div>
                        <div className="font-semibold text-lg ">
                            {user?.name.toUpperCase()}
                        </div>
                    </div>
                    <div className="flex justify-around items-center p-4 rounded-lg bg-zinc-400 mt-2 cursor-pointer border border-zinc-800" onClick={createPostHandler}>
                        <div>
                            <PlusIcon color="white" />
                        </div>
                        <div className="font-semibold text-lg text-white">
                            Create a Blog
                        </div>
                    </div>
                    <div className="flex justify-around items-center p-4 rounded-lg bg-zinc-500 border border-zinc-800 mt-2 cursor-pointer" onClick={() => navigate('/my-posts')}>
                        <div>
                            <BookIcon color="white" />
                        </div>
                        <div className="font-semibold text-lg text-white" >
                            Your Posts
                        </div>
                    </div>
                    <div className="flex justify-around items-center p-4 rounded-lg bg-red-600 mt-2 border border-zinc-800 cursor-pointer" onClick={logOutHandler}>
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