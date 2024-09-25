import axios from "axios";
import React from "react";

const EllipsePop = ({ postId, onPostDeleted, onPostUpdated }) => {

  const onDeleteHandler = async () => {
    try {
      const response = await axios.delete(
        "https://backend.harshgolyan308.workers.dev/api/v1/blog/delete-blog",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          data: {
            id: postId,
          },
        }
      );
      console.log(response);

      // Call the onPostDeleted function to update the state in the parent component
      onPostDeleted(postId);

    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateHandler = async () => {
    try {
      const response = await axios.get(
        "https://backend.harshgolyan308.workers.dev/api/v1/blog/update-blog",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          data: {
            id: postId,
          },
        }
      );
      console.log(response);
      onPostUpdated(postId, response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col p-3 bg-slate-400 rounded-lg">
        <div
          className="h-[10vh] w-[20vh] bg-blue-500 text-white text-lg font-semibold rounded-lg flex justify-center items-center cursor-pointer"
          onClick={onUpdateHandler}
        >
          Update Post
        </div>
        <div
          className="h-[10vh] w-[20vh] bg-orange-400 text-white text-lg font-semibold rounded-lg mt-4 flex justify-center items-center cursor-pointer"
          onClick={onDeleteHandler}
        >
          Delete Post
        </div>
      </div>
    </div>
  );
};

export default EllipsePop;
