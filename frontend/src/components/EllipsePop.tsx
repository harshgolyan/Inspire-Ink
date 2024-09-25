import axios from "axios";
import React, { useState } from "react";
import Modal from './Modal'; // Import the Modal component
import UpdatePost from './UpdatePost'; // Import the UpdatePost component

interface EllipsePopProps {
    postId : string,
    onPostDeleted: (id: string) => void,
    onPostUpdated: (id: string, updatedPost: any) => void,
    setOpenIndex: (index: number | null) => void
}
const EllipsePop = ({ postId, onPostDeleted, onPostUpdated, setOpenIndex }: EllipsePopProps) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const onDeleteHandler = async () => {
        try {
            await axios.delete("https://backend.harshgolyan308.workers.dev/api/v1/blog/delete-blog",{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("jwt"),
                    },
                    data: { 
                        id: postId
                    },
                }
            );
            onPostDeleted(postId);
        } catch (error) {
            console.log(error);
        }
    };

    const openUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setOpenIndex(null);
    };

    return (
        <div>
            <div className="flex flex-col p-3 bg-slate-400 rounded-lg">
                <div
                    className="px-4 py-3 w-[20vh] bg-cyan-600 border border-cyan-950 text-white text-lg font-semibold rounded-lg flex justify-center items-center cursor-pointer"
                    onClick={openUpdateModal} // Open modal on click
                >
                    Update Post
                </div>
                <div
                    className="px-4 py-3 w-[20vh] bg-cyan-700 border border-cyan-950 text-white text-lg font-semibold rounded-lg mt-4 flex justify-center items-center cursor-pointer"
                    onClick={onDeleteHandler}
                >
                    Delete Post
                </div>
            </div>
            <Modal isOpen={showUpdateModal} onClose={closeUpdateModal}>
                <UpdatePost postId={postId} onClose={closeUpdateModal} onPostUpdated={onPostUpdated}/>
            </Modal>
        </div>
    );
};

export default EllipsePop;
