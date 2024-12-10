import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    const handleLogOut = () => navigate('/exit');

    return(
        <ul className="flex items-center justify-center p-5 text-[#8EC2FF] dark:text-[#FBFDFF]">
            <li className="px-6">
                <a href=""><HomeIcon className='dark:text-blue-300'/>Dashboard</a>
            </li>

            <li className="px-6">
                <a href=""><CalendarMonthIcon className='dark:text-blue-300'/>Calendar</a>
            </li>

            <li className="px-6">
                <a href=""><StickyNote2Icon className='dark:text-blue-300'/>Notes</a>
            </li>

            <li className="px-6">
                <a href=""><SettingsIcon className='dark:text-blue-300'/>Settings</a>
            </li>
            <li className="px-6" onClick={(e) => {e.preventDefault(); if(window.confirm('Are you sure you want to Log Out?')){handleLogOut()};}}>
                <a href=""><LogoutIcon className='dark:text-blue-300' sx={{ fontSize: '26px' }}/>Log out</a> 
            </li>
        </ul>
    )
}