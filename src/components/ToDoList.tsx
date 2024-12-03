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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from './SearchBar';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const ToDoList = () => {
    const [tabs, setTabs] = useState<string[]>(() => {
        const savedTabs = localStorage.getItem('tabs');
        if (savedTabs) {
            return JSON.parse(savedTabs);
        }
        return {
            General: [],
            Work: [],
            Personal: [],
        }
    });

    const [activeTab, setActiveTab] = useState(0); // Sets Default Active Tab State

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
    const [newTask, setNewTask] = useState(''); // Sets Default Task Name
    const [editingIndex, setEditingIndex] = useState<number | null>(null); // Sets Default Tab Index
    const [newTabName, setNewTabName] = useState(''); // Sets Default Tab Name

    
    // Updates localStorage for tasks on any change
    useEffect(() => {
        // console.log('Tasks changed, saving to localStorage:', tasks); // Logging test to print current tasks
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
    
    // Updates localStorage for tabs on any change
    useEffect(() => {
        localStorage.setItem('tabs', JSON.stringify(tabs));
    }, [tabs]);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const changeTabName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTabName(event.target.value);
    };

    const saveTabName = () => {
        if (editingIndex === null) return;
        const updatedTabs = [...tabs]; // Copy current tabs to updatedTabs
        updatedTabs[editingIndex] = newTabName; // Adds new tab name to current editing tab (AKA active tab) 
        setTabs(updatedTabs); // Update tabs
        setEditingIndex(null);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            saveTabName();
        }
    };

    const handleDoubleClick = (index: number) => {
        setEditingIndex(index);
        setNewTabName(tabs[index]);
    };

    const addNewTask = () => {
        if (!newTask.trim()) return;
        const currentTab = tabs[activeTab];
        const task: Task = { id: Date.now(), text: newTask , completed: false,};
        setTasks((prevTasks) => {
            const updatedTasks = {
            ...prevTasks, // Copy all tasks 
            [currentTab]: [...(prevTasks[currentTab] || []), task], // Add prevTasks to currentTab (either task list or empty list) and after, append the new task to it
            };

            // Updates localStorage to include task in list immediately
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });
        setNewTask(''); // Resets input field to be empty
    };

    const addNewTab = () => {
        const newTabName = `Tab ${tabs.length + 1}`; // Default tab name
        setTabs((prevTabs) => { 
            const updatedTabs = [...prevTabs, newTabName]; // Copy all tabs and append the newTabName to this new list
            localStorage.setItem('tabs', JSON.stringify(updatedTabs));
            return updatedTabs;
        });
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks, [newTabName]: [] }; // Copy all tasks and set the new tab to have an empty task list
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks   
        });
            setActiveTab(tabs.length); // Make newly created tab the active one
    };

    const closeTab = (index: number) => {
        const updatedTabs = tabs.filter((_, tabIndex) => tabIndex !== index); // Create updatedTabs to be a list of tabs skipping the one being closed
        setTabs(updatedTabs); // Update the tabs without the closed tab
        localStorage.setItem('tabs', JSON.stringify(updatedTabs)); // Update localStorage

        const updatedTasks = { ...tasks };
        delete updatedTasks[tabs[index]]; // When closing a tab, the tasks living in this tab are deleted
        setTasks(updatedTasks); // Update localStorage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        if (activeTab === index) {
            setActiveTab((prevTab) => (prevTab > 0 ? prevTab - 1 : 0)); // Make previous tab the active one
        }

    };

    const deleteTask = (tab: any , id: number) => {
        setTasks((prevTasks) => {
            const updatedTasks = {
                ...prevTasks, // copy all tasks
                [tab]: prevTasks[tab].filter((task) => task.id !== id), // only the active tab will be updated to have all tasks added except the one that originally called this function (by skipping, we remove the task)
            }

            // Updates localStorage to remove task immediately
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };
    
    const updateCheckbox = (tab: any, id: number) => {
        setTasks((prevTasks) => ({
            ...prevTasks, // Copy all tasks 
            [tab]: prevTasks[tab].map((task) => // only the active tab will be updated and we will check all tasks we have for matching id's
                task.id === id ? { ...task, completed: !task.completed } : task // if we find a task with the id that we are checking off, copy over all task attributes and invert only the completed property
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
                        onChange={() => updateCheckbox(tab, task.id)}
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
                        onClick={() => deleteTask(tab, task.id)}
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
                    <SearchBar setActiveTab={setActiveTab}/>

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
                                            onChange={changeTabName}
                                            onBlur={saveTabName}
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
                                                onClick={() => closeTab(index)}
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
                            onClick={addNewTab}
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
                                onClick={addNewTask}
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
                                        addNewTask()
                                    }
                                }}
                                onBlur={saveTabName}
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
                            )} 
                        */}
                            
                            {renderTasks(tabs[activeTab])}
                        </Paper>
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default ToDoList;