import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
    return(
        <ul className="flex items-center justify-center p-5 text-[#8EC2FF]">
            <li className="px-6">
                <a href=""><HomeIcon/>Dashboard</a>
            </li>

            <li className="px-6">
                <a href=""><CalendarMonthIcon/>Calendar</a>
            </li>

            <li className="px-6">
                <a href=""><StickyNote2Icon/>Notes</a>
            </li>

            <li className="px-6">
                <a href=""><SettingsIcon/>Settings</a>
            </li>
            <li className="px-6">
                <a href=""><LogoutIcon sx={{ fontSize: '26px' }}/>Log out</a> 
            </li>
        </ul>
    )
}