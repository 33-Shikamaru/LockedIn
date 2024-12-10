import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
    const navigate = useNavigate();
    const calendarTab = () => {
        navigate('/calendar');
    };
    const dashboardTab = () => {
        navigate('/home');
    };
    const notesTab = () => {
        navigate('/notes');
    };
    const settingsTab = () => {
        navigate('/settings');
    };
    const logout = () => {
        navigate('/');
    };

    return(
        <ul className="flex items-center justify-center p-5 text-[#8EC2FF] dark:text-[#FBFDFF]">
            <li className="cursor-pointer flex items-center px-6"
                onClick={dashboardTab}
            >
                <HomeIcon className='dark:text-blue-300'/>
                <span>Dashboard</span>
            </li>

            <li className="cursor-pointer flex items-center px-6"
                onClick={calendarTab}
            >
                <CalendarMonthIcon className='dark:text-blue-300'/>
                <span>Calendar</span>
            </li>

            <li className="cursor-pointer flex items-center px-6"
                onClick={notesTab}>

                <StickyNote2Icon className='dark:text-blue-300'/>
                <span>Notes</span>
            </li>

            <li className="cursor-pointer flex items-center px-6"
                onClick={settingsTab}>

                <SettingsIcon className='dark:text-blue-300'/>
                <span>Settings</span>
            </li>
            <li className="cursor-pointer flex items-center px-6"
                onClick={logout}>

                <LogoutIcon className='dark:text-blue-300' sx={{ fontSize: '26px' }}/>
                <span>Log out</span>
            </li>
        </ul>
    )
}

export default Navbar