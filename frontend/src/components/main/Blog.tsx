import React, { useState } from "react";
import Avatar from "../Avatar";

const Blog = ({ title, content, author }) => {

    return (
            <div>
                <div className="h-auto w-[90vw] mx-5 rounded-lg border m-5 p-3 flex flex-col bg-slate-700">
                    <div className="flex items-center mb-3">
                        <div>
                            <Avatar initials={author ? author[0].toUpperCase() : "N/A"} />
                        </div>
                        <div className="text-white font-thin pl-4">
                            {author || "Unknown Author"} {/* Display a fallback if author is undefined */}
                        </div>
                    </div>
                    <div className="font-bold text-4xl text-white mb-2">
                        {title}
                    </div>
                    <div className="font-medium text-lg text-white mb-2">
                        {content.length > 200 ? `${content.substr(0, 247)}...` : content}
                    </div>
                    <div className="mt-auto text-white">
                        Read time: {Math.ceil(content.length / 100)} minutes
                    </div>
                </div>
            </div>
        )
}

export default Blog;
