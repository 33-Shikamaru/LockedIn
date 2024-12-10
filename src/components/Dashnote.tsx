import DigitalClock from "./DigitalClock";

type NameProp = {
    username : string;
};

export default function DashNote({ username } :NameProp) {
    return(
        <div className="flex items-center justify-center">
        <div className="flex justify-center space-x-2 w-1/2 bg-blue-100 rounded-lg px-5 py-5 dark:bg-[#95BAE6]" aria-label="dashboard note">
            <p className='text-[#8EC2FF] dark:text-[#FBFDFF]'>Welcome to your Task Management Dashboard <span className="text-blue-500 text-xl">{username}</span> ! </p>
            <DigitalClock />
        </div>
        </div>
    );
}