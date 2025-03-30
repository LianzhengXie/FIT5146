import { useNavigate } from "react-router-dom"

const HomeButton = () => {
    const navigate = useNavigate()

    const onClick = () => {
        navigate("/questionnaire")
    }

    return (
        <button onClick={onClick} id="theme-toggle" type="button"
            className="rounded-full text-sm p-2 m-1 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-white">
            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19c0 .6.4 1 1 1h3v-3c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v3h3c.6 0 1-.4 1-1v-8.5" />
            </svg>
        </button>
    )
}

export default HomeButton
