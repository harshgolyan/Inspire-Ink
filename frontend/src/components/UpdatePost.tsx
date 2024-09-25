import axios from "axios";
import React, { useState, useEffect } from "react";

const UpdatePost = ({ postId, onClose, onPostUpdated }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`https://backend.harshgolyan308.workers.dev/api/v1/blog/get-blog/${postId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt"),
                    },
                });
                const postData = response.data;
                setTitle(postData.title);
                setContent(postData.content);
                onPostUpdated(postId, postData)
            } catch (error) {
                console.log("Error fetching post data:", error);
            }
        };

        fetchPostData();
    }, [postId]);

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put(" https://backend.harshgolyan308.workers.dev/api/v1/blog/update-blog", {
                headers : {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt"),
                },
                data : {
                    id : postId,
                    title : title,
                    content : content
                }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            onClose()
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-center">Update the Post</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                    <label className="block font-bold mb-2">Title</label>
                    <textarea 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border-2 rounded-lg bg-slate-400"
                        placeholder="Enter your post title"
                        required
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2">Content</label>
                    <textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border-2 rounded-lg h-32 bg-slate-400"
                        placeholder="Write your content here"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default UpdatePost;
