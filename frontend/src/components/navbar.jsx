import { APP_NAME_TITLE } from '../constants';
import LogoutButton from './ui/logoutButton';
import DarkModeButton from './ui/darkModeButton';
import HomeButton from '../pages/Patient/components/ui/homeButton';
import ExitButton from './ui/exitButton';

const Navbar = ({ title, subtitle }) => {
    return (
        <nav className="z-50 w-full bg-slate-500 text-black shadow-sm font-mono dark:text-white min-h-16">
            <div className="flex flex-wrap items-center justify-between mx-auto p-2 h-full">
                <HomeButton />
                <div className='flex flex-col'>
                    <span className="text-lg sm:text-2xl self-center font-semibold whitespace-nowrap dark:text-white">{title || APP_NAME_TITLE}</span>
                    {
                        subtitle &&
                        <span className="text-lg sm:text-2xl self-center font-semibold whitespace-nowrap dark:text-white">{subtitle}</span>
                    }
                </div>
                <div className='flex items-center justify-between'>
                    <DarkModeButton />
                    <LogoutButton />
                    <ExitButton goToPage='/readiness' />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
