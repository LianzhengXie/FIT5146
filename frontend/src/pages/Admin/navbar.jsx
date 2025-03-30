import { useContext, useEffect, useRef, useState } from "react";
import { AdminAuthContext } from "../../contexts/adminAuthContext";

const Navbar = () => {
    const { admin, logout } = useContext(AdminAuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const currentDate = new Date().toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    const imgRef = useRef(null);
    const menuRef = useRef(null);
    useEffect(() => {
        const x = window.addEventListener('click', (e) => {
            if (e.target !== imgRef.current && e.target !== menuRef.current) {
                setShowMenu(false);
            }
        })
        return () => {
            window.removeEventListener('click', x);
        }
    }, [])
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <>
            <nav className="p-4 h-20 w-full flex justify-between items-center bg-slate-500 text-black shadow-sm font-mono dark:text-white">
                <div className="sm:block hidden">Date: {currentDate}</div>
                <div className="flex flex-col">
                    <span className="self-center text-lg md:text-2xl font-semibold whitespace-nowrap dark:text-white">APriMe</span>
                    <span className="self-center text-lg md:text-2xl font-semibold whitespace-nowrap dark:text-white">(<span className='text-decoration'>A</span>ssess, <span className='text-decoration'>Pr</span>escr<span className='text-decoration'>i</span>be, <span className='text-decoration'>M</span>anag<span className='text-decoration'>e</span>)</span>
                </div>
                <div className="flex flex-col items-center relative">
                    <button ref={imgRef} onClick={toggleMenu} className="mt-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-white rounded-full">
                        <svg className="pointer-events-none w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 18">
                            <path className="pointer-events-none" d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                        </svg>
                    </button>
                    <span className="text-xs">{admin.username}</span>
                    <div ref={menuRef} hidden={!showMenu} className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-gray-700 dark:divide-gray-600 absolute -left-20 top-16">
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div>User: {admin.username}</div>
                        </div>
                        {/* <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                            </li>
                        </ul> */}
                        <div className="py-2">
                            <div onClick={logout} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</div>
                        </div>
                    </div>
                </div>
            </nav>


        </>
    )
}

export default Navbar