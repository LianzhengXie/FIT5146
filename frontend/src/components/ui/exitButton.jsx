import { useNavigate } from 'react-router-dom'

const ExitButton = ({goToPage}) => {
    const navigate = useNavigate()

    const handleExit = () => {
        navigate(goToPage)
    }
    return (
        <button
            onClick={handleExit} >
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6m0 12L6 6" />
            </svg>
        </button>
    )
}

export default ExitButton