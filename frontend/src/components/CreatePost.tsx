import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://backend.harshgolyan308.workers.dev/api/v1/blog/create-blog", {
                title, content
            },
            {
                headers : {
                    "Content-Type":"application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        finally {
            navigate('/blogs')
        }
    };

    return (
        <div className="bg-slate-800 min-h-screen flex justify-center items-center">
            <div className="border rounded-lg p-5 w-[90vw] md:w-[50vw] ">
                <h1 className="text-2xl font-bold mb-4 text-center text-white">Create a New Post</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <label className="block font-bold text-lg mb-2 text-white">Title</label>
                        <textarea 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded-lg bg-slate-800 text-white"
                            placeholder="Enter your post title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-bold text-lg mb-2 text-white">Content</label>
                        <textarea 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 border rounded-lg h-32 bg-slate-800 text-white "
                            placeholder="Write your content here"
                            required
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Create a Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
