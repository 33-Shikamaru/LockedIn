
export default function Exit() {
    return (
        <div className="flex items-center justify-center h-screen bg-blue-50 dark:bg-[#4B6D94]">
            <div className="flex flex-col items-center justify-center w-1/3 h-fit p-6 rounded-lg shadow-md bg-blue-200 dark:bg-[#345376] text-white dark:text-white">
                <p className="text-xl text-center md:text-2xl">
                    You are now...
                    <br></br>
                    <br></br>
                    <span className="text-5xl">LockedOut</span>
                    <br></br>
                    <br></br>
                    See you next Time!
                </p>
            </div>
        </div>
    );
}