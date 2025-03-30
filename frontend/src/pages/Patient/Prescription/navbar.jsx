import { APP_NAME_TITLE } from "../../../constants";

const Navbar = ({ subtitle }) => {

    return (
        <nav className="z-50 w-full bg-slate-500 text-black shadow-sm font-mono dark:text-white">
            <div className='flex flex-col items-center justify-between mx-auto p-2 h-full'>
                <span className="text-lg sm:text-2xl self-center font-semibold whitespace-nowrap dark:text-white">{APP_NAME_TITLE}</span>
                <span className="text-lg sm:text-2xl self-center font-semibold whitespace-nowrap dark:text-white">{subtitle}</span>
            </div>
        </nav>
    )
}

export default Navbar