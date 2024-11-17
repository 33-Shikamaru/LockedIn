type NameProp = {
    username : string;
};

{/* Sample function for displaying username */}
// function getUserInfo() {

// }

export default function DashNote({ username } :NameProp) {
    return(
        <div className="flex items-center justify-center">
        <div className="flex space-x-2 w-1/2 bg-blue-100 rounded-lg px-5 py-5" aria-label="dashboard note">
            <p className='bg-blue-100 text-[#8EC2FF]'>Welcome to your Task Management Dashboard <span className="text-green-500 text-xl">{username}</span> ! </p>
            {/* <Clock /> */}
            <p>clock should go here</p>
        </div>
        </div>
    );
}