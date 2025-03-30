
const NavbarReadiness = ({ title }) => {
    return (
        <nav className="h-16 w-full flex justify-between bg-slate-500 text-black shadow-sm font-mono dark:text-white items-center">
            <div></div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{title}</span>
            <div></div>
        </nav>
    )
}

export default NavbarReadiness