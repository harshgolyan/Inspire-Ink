const Skeleton = () => {
    return (
        <> 
        <div role="status" className="max-w-sm animate-pulse">
                <div className="h-auto w-[90vw] mx-5 rounded-lg border m-5 p-3 flex flex-col bg-slate-700">
                    <div className="flex items-center mb-3">
                        <div>
                        <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-500 mb-4"></div>
                        </div>
                        <div className="text-white font-thin pl-4">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-48 mb-4"></div>
                        </div>
                    </div>
                    <div className="font-bold text-4xl text-white mb-2">
                        <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-500 w-48 mb-4"></div>
                    </div>
                    <div className="font-medium text-lg text-white mb-2">
                        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-500 w-full mb-4"></div>
                        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-500 w-full mb-4"></div>
                    </div>
                    <div className="mt-auto text-white">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-48 mb-4"></div>
                    </div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </>
    )
}

export default Skeleton;