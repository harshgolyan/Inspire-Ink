import React from "react";

const EllipsePop = () => {
    return (
        <>
            <div>
                <div className="flex flex-col p-3 bg-slate-400 rounded-lg">
                    <div className="h-[10vh] w-[20vh] bg-blue-500 text-white text-lg font-semibold rounded-lg flex justify-center items-center">
                        Update Post
                    </div>
                    <div className="h-[10vh] w-[20vh] bg-orange-400 text-white text-lg font-semibold rounded-lg mt-4 flex justify-center items-center">
                        Delete Post
                    </div>
                </div>
            </div>
        </>
    )
}

export default EllipsePop;