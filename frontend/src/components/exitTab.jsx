import { useNavigate } from 'react-router-dom'
import { PatientAuthContext } from '../contexts/patientAuthContext';
import { useContext } from 'react';

const ExitTab = ({goToPage, text="Finish"}) => {
    const { logout } = useContext(PatientAuthContext);
    const navigate = useNavigate()

    const handleExit = () => {
        if (text === "Finish") {
            logout()
        } else {
            navigate(goToPage)
        }
    }

    return (
        <button
            onClick={handleExit}
            className="z-20 flex justify-center w-full p-2 bg-neutral-300 border-t border-gray-900 shadow hover:bg-neutral-400">
            {text}
        </button>
    )
}

export default ExitTab