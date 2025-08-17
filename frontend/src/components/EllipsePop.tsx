import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";
import UpdatePost from "./UpdatePost";

interface EllipsePopProps {
  postId: string;
  onPostDeleted: (id: string) => void;
  setOpenIndex: (index: number | null) => void;
}

const EllipsePop = ({ postId, onPostDeleted, setOpenIndex }: EllipsePopProps) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const onDeleteHandler = async () => {
    try {
      await axios.delete("https://backend.harshgolyan308.workers.dev/api/v1/blog/delete-blog", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        data: {
          id: postId,
        },
      });
      onPostDeleted(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const openUpdateModal = () => setShowUpdateModal(true);
  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setOpenIndex(null);
  };

  return (
    <div>
      <div className="flex flex-col p-3 bg-secondary border border-neutral-200 shadow-md rounded-lg min-w-[150px]">
        <button
          className="w-full py-2 px-4 mb-2 text-primary font-semibold bg-primary/10 border border-primary rounded-md hover:bg-primary/20 transition"
          onClick={openUpdateModal}
        >
          Update Post
        </button>
        <button
          className="w-full py-2 px-4 text-primary font-semibold bg-red-500/10 border border-red-500 rounded-md hover:bg-red-500/20 transition"
          onClick={onDeleteHandler}
        >
          Delete Post
        </button>
      </div>
      <Modal isOpen={showUpdateModal} onClose={closeUpdateModal}>
        <UpdatePost postId={postId} onClose={closeUpdateModal} />
      </Modal>
    </div>
  );
};

export default EllipsePop;
