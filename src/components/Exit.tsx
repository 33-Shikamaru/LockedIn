import { useEffect } from "react";

export default function Exit() {
    return (
        <div className="flex items-center justify-center bg-blue-100 dark:bg-[#345376] text-blue-400 dark:text-white h-screen w-screen">
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
    );
}