import { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ setActiveTab }: { setActiveTab: (tabIndex: number) => void}) {

    interface Task {
        id: number;
        text: string;
        completed: boolean;
    }

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Task[]>([]);
    const [tasks, setTasks] = useState<Record<string, Task[]>>(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            return JSON.parse(savedTasks);
        }
        return {
            General: [],
            Work: [],
            Personal: [],
        };
    });
    

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }
        const storedTasks: Record<string, Task[]> = JSON.parse(localStorage.getItem('tasks') || '{}');
        const allTasks = Object.values(storedTasks).flat();
        const filteredTasks = allTasks.filter((task) => 
            task.text.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(filteredTasks);
    }, [query]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const openTab = (taskId: number) => {
        const tabName = Object.keys(tasks).find((tab) =>
            tasks[tab].some((task) => task.id === taskId)
        );

        if (tabName) {
            const tabIndex = Object.keys(tasks).indexOf(tabName);
            setActiveTab(tabIndex);
        }
    };
    
    return (
        <Box className="mb-2">
            <TextField
                fullWidth
                placeholder="Search for a Task"
                className="bg-white rounded-3xl shadow-md max-h-60"
                value = {query}
                onChange={e => setQuery(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none',
                        },
                        '&:hover fieldset': {
                            border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                            border: 'none',
                        },
                    },
                    '& .MuiInputBase-input': {
                        padding: 1.25,
                        ml: 1,
                    },
                }}
                slotProps={{
                    input: { 
                        style: {
                            fontFamily: "'Lazydog', sans-serif",
                        },
                        startAdornment: (
                            <InputAdornment position="start" sx={{ marginRight: -1 }}>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }
                }}
            /> 
            {searchResults.length > 0 && (
                <ul className='bg-white rounded-black-solid rounded-md shadow-md text-md p-2 mt-1'>
                    {searchResults.map((task) => (
                        <li className='p-2 hover:bg-slate-100 rounded-md cursor-pointer' key={task.id} onClick={() => openTab(task.id)}>
                            {task.text}
                        </li>
                    ))}
                </ul>
            )}
        </Box>
    );
}