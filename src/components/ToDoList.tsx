import React, { useEffect, useState } from 'react';
import {
    Tabs,
    Tab,
    Box,
    TextField,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Checkbox,
    Typography,
    // Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';


interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const StyledTabs: React.FC = () => {
    const [tabs, setTabs] = useState<string[]>(['General', 'Work', 'Personal']);
    const [activeTab, setActiveTab] = useState(0);
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
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [newTabName, setNewTabName] = useState('');

    
    //===== FOR TESTING TASKS IN localStorage =====
    // Gets called every time tasks change
    useEffect(() => {
        // console.log('Tasks changed, saving to localStorage:', tasks); // Log to see current tasks
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
    

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTabName(event.target.value);
    };

    const handleBlur = () => {
        if (editingIndex === null) return;
        const updatedTabs = [...tabs];
        updatedTabs[editingIndex] = newTabName;
        setTabs(updatedTabs);
        setEditingIndex(null);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleBlur();
        }
    };

    const handleDoubleClick = (index: number) => {
        setEditingIndex(index);
        setNewTabName(tabs[index]);
    };

    const handleAddTask = () => {
        if (!newTask.trim()) return;
        const currentTab = tabs[activeTab];
        const task: Task = { id: Date.now(), text: newTask , completed: false,};
        setTasks((prevTasks) => ({
            ...prevTasks,
            [currentTab]: [...(prevTasks[currentTab] || []), task],
        }));
        setNewTask('');
    };

    const handleAddTab = () => {
        const newTabName = `Tab ${tabs.length + 1}`;
        setTabs((prevTabs) => [...prevTabs, newTabName]);
        setTasks((prevTasks) => ({ ...prevTasks, [newTabName]: [] }));
        setActiveTab(tabs.length);
        useEffect(() => {
            localStorage.setItem('tabs', JSON.stringify(tabs))
        },[setTabs]);
    };

    const handleTabClose = (index: number) => {
        setTabs(tabs.filter((_, tabIndex) => tabIndex !== index));
        if (activeTab === index) {
            setActiveTab((prevTab) => (prevTab > 0 ? prevTab - 1 : 0));
        }
    };

    const handleDeleteTask = (tab: any , id: number) => {
        setTasks((prevTasks) => ({
            ...prevTasks,
            [tab]: prevTasks[tab].filter((task) => task.id !== id),
        }));
    };
    
    const handleCheckboxChange = (tab: any, id: number) => {
        setTasks((prevTasks) => ({
            ...prevTasks,
            [tab]: prevTasks[tab].map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            ),
        }));
    }

    const renderTasks = (tab: string) => (
        <List>
            {(tasks[tab] || []).map((task) => (
                <ListItem
                    key={task.id}
                    sx={{
                        // backgroundColor: '#f9f9f9',
                        backgroundColor: task.completed ? '#ebffef' : '#f9f9f9',
                        borderRadius: 2,
                        mb: 1,
                        boxShadow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '100%',
                        wordWrap: 'break-word',
                    }}
                >
                    <Checkbox
                        checked={task.completed}
                        onChange={() => handleCheckboxChange(tab, task.id)}
                    />
                    <ListItemText
                        primary={task.text}
                        primaryTypographyProps={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            sx:{
                                color: task.completed ? 'lightgray' : 'inherit',
                                textDecoration: task.completed ? 'line-through' : 'none',
                            }
                        }}
                    />
                    <IconButton
                        onClick={() => handleDeleteTask(tab, task.id)}
                        sx={{
                            '&:hover': { color: 'white', bgcolor: '#FF7E7E', borderRadius: '0.5rem', },
                        }}
                    >
                       <DeleteIcon></DeleteIcon>
                    </IconButton>
                </ListItem>
            ))}
        </List>
    );

    return (
        <div className="flex items-center justify-center">
            <div className="flex space-x-2 w-1/2 bg-blue-100 rounded-lg px-5 py-5" aria-label="To Do List">
                <Box sx={{ width: '100%', typography: 'body1', p: 2 }}>
                    {/* Search Bar */}
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="Search for a Task"
                            sx={{
                                bgcolor: 'white',
                                borderRadius: 10,
                                outline: 'none',
                                boxShadow: 1,
                                maxHeight: 60,
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
                                }
                            }}
                        />
                    </Box>

                    {/* Tabs */}
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            mb: -2,
                            '.MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                minHeight: 20,
                                px: 2,
                                mx: 0.5,
                                py: 0.5,
                                bgcolor: 'white',
                                color: '#555',
                                transition: 'background-color 0.3s ease',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                            },
                            '.Mui-selected': {
                                bgcolor: '#1976d2 !important',
                                color: 'white !important',
                            },
                            '.MuiTabs-indicator': {
                                display: 'none',
                            },
                        }}
                    >
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                label={
                                    editingIndex === index ? (
                                        <TextField
                                            value={newTabName}
                                            onChange={handleNameChange}
                                            onBlur={handleBlur}
                                            onKeyDown={handleKeyDown}
                                            autoFocus
                                            size="small"
                                            sx={{
                                                width: 'auto',
                                                maxHeight: 20,
                                                maxWidth: 80,
                                                padding: 0,
                                                bgcolor: 'white',
                                                border: 'none',
                                                borderRadius: 1,
                                                mx: 0.5,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                '& .MuiInputBase-root': {
                                                    padding: 0,
                                                    margin: 0,
                                                    fontSize: '14px',
                                                    height: '100%',
                                                },
                                            }}
                                        />
                                    ) : (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <span onDoubleClick={() => setEditingIndex(index)}>{tab}</span>
                                            <IconButton
                                                onClick={() => handleTabClose(index)}
                                                sx={{
                                                    ml: 2,
                                                    mr: -1,
                                                    color: '#555',
                                                    maxHeight: 1,
                                                    maxWidth: 1,
                                                    padding: 0.5,
                                                    '&:hover': { color: 'white', bgcolor: '#FF7E7E' },
                                                    fontSize: "16px",
                                                }}
                                            >
                                                <ClearIcon fontSize="inherit" />
                                            </IconButton>
                                        </Box>
                                    )
                                }
                                onDoubleClick={() => handleDoubleClick(index)}
                            />
                        ))}
                        <Tab
                            icon={
                                <AddIcon
                                    sx={{
                                        fontSize: '20px',
                                        padding: 0,
                                    }}
                                />}
                            onClick={handleAddTab}
                            sx={{
                                minWidth: '20px',
                                padding: 0,
                                color: '#1976d2',
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                                bgcolor: '#f0f0f0',
                                fontSize: "16px",
                                ':hover': {
                                    color: 'white',
                                    bgcolor: '#4CE75F',
                                },
                            }}
                        />
                    </Tabs>

                    {/* Task Input and List */}
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 1,
                                p: 1,
                                bgcolor: 'white',
                                borderRadius: 1.5,
                                boxShadow: 1,
                            }}
                        >
                            <IconButton
                                onClick={handleAddTask}
                                color="primary"
                                size="small"
                                sx={{
                                    p: 1,
                                    bgcolor: '#1976d2',
                                    color: 'white',
                                    ':hover': { bgcolor: '#115293' },
                                }}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                            <TextField
                                placeholder="Add a new task"
                                variant="outlined"
                                size="small"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && newTask.trim() !== '') {
                                        handleAddTask()
                                    }
                                }}
                                onBlur={handleBlur}
                                sx={{
                                    flexGrow: 1,
                                    bgcolor: 'white',
                                    borderRadius: 2,
                                    m: 0.5,
                                }}
                            />
                        </Box>

                        {/* Task List */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                bgcolor: 'white',
                                borderRadius: 1.5,
                                boxShadow: 1,
                            }}
                        > 
                        {/* TESTING BELOW ONLY */}
{/*                         
                            {(tabs[activeTab] && tabs[activeTab].length === 0) ? (
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    // p={2}
                                    color='red'
                                >
                                     No Tasks To Complete
                                </Box>
                            ) : (
                                renderTasks(tabs[activeTab])
                            )} */}
                            
                            {renderTasks(tabs[activeTab])}
                        </Paper>
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default StyledTabs;
