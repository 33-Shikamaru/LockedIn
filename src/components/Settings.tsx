import Navbar from './Navbar.tsx'
import Title from './Title.tsx'
import {useState} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

const Settings = () => {
    const [data, updateData] = useState(() => {
        const savedData = JSON.parse(localStorage.getItem('userData') || '{}');
        return savedData;
    });
    const maskedPassword = data.password ? '*'.repeat(data.password.length) : '';

    const [isEditingUsername, setEditingUsername] = useState(false);
    const [isEditingPassword, setEditingPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const getCompletedTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')|| '{}')
        let count = 0;
        for (const tab in tasks) {
            if (Array.isArray(tasks[tab])) {
                for (const task of tasks[tab]) {
                    if (task.completed === true) {
                        count += 1;
                    }
                }
            }
        }
        return count 
    };
    const totalCompletedTasks = getCompletedTasks();

    const validateAndUpdatePassword = (newPassword: string) => {
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;
        
        if (passwordRegex.test(newPassword)) {
            updateData((prevData: any) => {
                const updatedData = { ...prevData, password: newPassword };
                localStorage.setItem('userData', JSON.stringify(updatedData));
                return updatedData;
            });
            setEditingPassword(false);
            setPasswordError(false);
            return true;
        } else {
            setPasswordError(true);
            return false;
        }
    };

  return (
    <>
    <Title />
    <Navbar />
    <div className='flex flex-col items-center justify-center p-6 gap-3'>
        <div className='flex flex-row items-center justify-between w-1/2 p-3 bg-blue-100 border rounded shadow-md dark:bg-[] dark:text-white dark:bg-[#95BAE6] dark:border-[#345376]'>
        <label className='pl-2'>Username: {isEditingUsername ? (
        <input
            type="text"
            className="ml-5 p-1 h-6 w-1/2 border rounded dark:text-slate-700"
            defaultValue={data.username}
            autoFocus
            onBlur={(e) => {
                const newUsername = (e.target as HTMLInputElement).value.trim();
                
                if (newUsername) {
                    updateData((prevData: any) => {
                        const updatedData = { ...prevData, username: newUsername };
                        localStorage.setItem('userData', JSON.stringify(updatedData));
                        return updatedData;
                    });
                    setEditingUsername(false);
                } else {
                    setEditingUsername(false);
                }
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    const newUsername = (e.target as HTMLInputElement).value.trim();
                    
                    if (newUsername) {
                        updateData((prevData: any) => {
                            const updatedData = { ...prevData, username: newUsername };
                            localStorage.setItem('userData', JSON.stringify(updatedData));
                            return updatedData;
                        });
                        setEditingUsername(false);
                    }
                    e.preventDefault();
                } else if (e.key === 'Escape') {
                    setEditingUsername(false);
                }
            }}
        />
        ) : (
        <span className="ml-5" onClick={() => setEditingUsername(true)}>
            {data.username}
        </span>
        )}
        </label>
            <EditIcon className="mr-2 hover:cursor-pointer hover:bg-slate-300 rounded p-0.5 dark:hover:bg-slate-600" 
                onClick={(e) => {
                    e.preventDefault();
                    setEditingUsername(true);
                }}
            />
        </div>
        <div className='flex flex-row items-center justify-between w-1/2 p-3 bg-blue-100 border rounded shadow-md dark:bg-[] dark:text-white dark:bg-[#95BAE6] dark:border-[#345376]'>
        <label className='flex pl-2 justify-left items-center'>Password: {isEditingPassword ? (
            <div className="relative w-1/2 inline-block">
                <input
                    type="text"
                    className={`ml-5 p-1 h-6 w-full border rounded dark:text-slate-700 ${
                        passwordError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    defaultValue={data.password}
                    autoFocus
                    onBlur={(e) => {
                        const newPassword = (e.target as HTMLInputElement).value.trim();
                        validateAndUpdatePassword(newPassword);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const newPassword = (e.target as HTMLInputElement).value.trim();
                            validateAndUpdatePassword(newPassword);
                            e.preventDefault();
                        } else if (e.key === 'Escape') {
                            setEditingPassword(false);
                            setPasswordError(false);
                        }
                    }}
                />
                {passwordError && (
                    <div className="ml-5 mt-1 text-red-500 text-xs w-full">
                        Password must be 8+ chars, 1 digit, 1 symbol.
                    </div>
                )}
            </div>
        ) : (
            <span className="ml-5" onClick={() => setEditingPassword(true)}>
                {maskedPassword}
            </span>
        )}
        </label>
            <EditIcon className="mr-2 hover:cursor-pointer hover:bg-slate-300 rounded p-0.5 dark:hover:bg-slate-600" 
                onClick={(e) => {
                    e.preventDefault();
                    setEditingPassword(true);
                }}
            />
        </div>
        <div className='flex flex-row items-center justify-between w-1/2 p-3 bg-blue-100 border rounded shadow-md dark:bg-[] dark:text-white dark:bg-[#95BAE6] dark:border-[#345376]'>
            <label className='pl-2'>Tasks Completed: <span className='ml-5'>{totalCompletedTasks}</span></label> 
        </div>
    </div>
    </>
  )
}

export default Settings
