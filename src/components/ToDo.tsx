export default function ToDo() {
    return(

        <div className="min-h-screen flex items-center justify-center">
        <div className="w-1/2 h-1/4 bg-blue-100 rounded-lg px-5 py-5" aria-label="to do container"> 
            <div className="w-full h-full rounded-lg px-2 py-2 bg-white my-5" aria-label="search bar">
                <p>This is a search bar</p>
            </div>

            {/* reference this to implement to do list categories: https://mui.com/material-ui/react-tabs/ */}
            <div className="w-full h-full rounded-lg px-2 py-2 bg-gray-50 my-5" aria-label="to-do">
                <p className="py-2 py-2 border-b border-gray-300">To Do Item</p>
                <p className="py-2 border-b border-gray-300">To Do Item</p>
                <p className="py-2 border-b border-gray-300">To Do Item</p>
                <p className="py-2">To Do Item</p>
            </div>
            
        </div>
        </div>
    );
}