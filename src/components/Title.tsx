import DarkMode from "./DarkMode.tsx";

export default function Title() {
    return(
        <div className="flex items-center justify-between w-full px-4 py-2 bg-[#95BAE6] font-24px p-3 text-2xl dark:bg-[#345376]">
            <div className="flex-grow text-center">
                <span className="text-[#FBFDFF]">LockedIn</span>
            </div>
            <div className='-ml-20 flex items-center'>
                <DarkMode />
            </div>
        </div>
    );
}