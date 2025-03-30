import Navbar from './navbar'

import { useQuery, useQueryClient } from 'react-query'
import { getPatientsLatest } from '@api/patient'
import Loading from '@components/loading'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ModalReminder from './components/ui/modalReminder'
import { send_questionnaire_sms } from '../../api/admin'
import { deleteReminderForPatient, insertReminder } from '../../api/reminder'
import { validateMobileNumber } from '../../util'

// // Mock data to simulate active reminders
// const mockReminders = {
//     'f64aff8b-1e6d-4d87-a96d-144dc7793a8c': { hasReminder: false, isActive: false },
//     'ebbc0716-6ed5-4235-a690-aa949e486ecc': { hasReminder: true, isActive: true },
//     '9ea1a370-9678-4923-9406-31062d6715d2': { hasReminder: true, isActive: false },
//     '9df7264c-730a-42fe-b1bc-fb7f95f9a631': { hasReminder: false, isActive: false },
// };

const PatientTable = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null);
    const queryClient = useQueryClient()

    const { data: patients, isLoading: isLoadingPatients } = useQuery({
        queryKey: 'patients_latest',
        queryFn: () => getPatientsLatest()
    })

    const handleOpenModal = (patient) => {
        setSelectedPatient(patient);
        // setIsOpen(true);
    };

    const handleSubmitReminder = async (data) => {
        // Logic to handle the form submission
        const record = {
            patient_id: selectedPatient.id,
            start_date: data.firstDate,
            end_date: data.lastDate,
            frequency_days: data.frequency_days
        }
        console.log('handleSubmitReminder', record);
        const res = await insertReminder(record);
        if (res) {
            queryClient.invalidateQueries({ queryKey: ['patients_latest'] });
        }
        setIsOpen(false);
    }

    const handleCloseModal = () => {
        // setIsOpen(false)
        setSelectedPatient(null)
    }

    const handleDeactivateReminder = (patient_id) => {
        deleteReminderForPatient({ patient_id })
            .then((json) => {
                console.log('Reminder deleted', json)
                queryClient.invalidateQueries({ queryKey: ['patients_latest'] })
            })
    };


    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {
                    isLoadingPatients ? <Loading /> :
                        <>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Patient Code
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Visit Datetime
                                        </th>
                                        <th scope="col" className="px-6 py-3 hidden md:block">
                                            Patient Created Datetime
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            History
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Reminder
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        patients.map((patient) => {
                                            const options = {
                                                weekday: 'short',
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            }
                                            const visitDatetime = new Date(patient.visit_dt_tm).toLocaleDateString(undefined, options)
                                            const createdAt = new Date(patient.created_at).toLocaleDateString(undefined, options)
                                            const reminder = patient.reminder
                                            const hasReminder = reminder ? true : false
                                            const isActiveReminder = hasReminder
                                            const buttonClass = hasReminder
                                                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                                                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';
                                            return (
                                                <tr key={`patient-${patient.id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                                                        {patient.code}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                                                        {visitDatetime}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap dark:text-white hidden md:block">
                                                        {createdAt}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                                                        <Link to={`/admin/${patient.visit_id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                                                        {/* <!-- Modal toggle --> */}
                                                        <button onClick={() => handleOpenModal(patient)}
                                                            className={`${buttonClass} text-white focus:ring-4 focus:outline-none px-2.5 py-1.5 text-center font-medium rounded-lg text-xs`} >
                                                            {hasReminder ? 'Edit Reminder' : 'Set Reminder'}
                                                        </button>
                                                        {/* <button onClick={() => handleReviewReminder(patient.id)} */}
                                                        {/*     className={`text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-2.5 py-1.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ms-2 ${!hasReminder ? 'bg-gray-400 cursor-not-allowed' : ''}`} */}
                                                        {/*     disabled={!hasReminder}> */}
                                                        {/*     Review */}
                                                        {/* </button> */}
                                                        {isActiveReminder ? (
                                                            <button onClick={() => handleDeactivateReminder(patient.id)}
                                                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-2.5 py-1.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ms-2">
                                                                Deactivate
                                                            </button>
                                                        ) : (
                                                            hasReminder && (
                                                                <span className="text-gray-500 dark:text-gray-400 text-xs ms-2">
                                                                    Not activated, Review to activate it
                                                                </span>
                                                            )
                                                        )}
                                                        {/* {!hasReminder && ( */}
                                                        {/*     <span className="text-gray-500 dark:text-gray-400 text-xs ms-2"> */}
                                                        {/*         No reminder has been set */}
                                                        {/*     </span> */}
                                                        {/* )} */}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            {/* TODO: Implement pagination */}
                            {/* <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 mb-2 mx-2" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                                </li>
                            </ul>
                        </nav> */}
                        </>
                }
            </div>
            <ModalReminder isOpen={!!selectedPatient} handleClose={handleCloseModal} handleSubmit={handleSubmitReminder} patient={selectedPatient} />
        </>
    )
}

const Admin = () => {
    const [countryCode, setCountryCode] = useState('+61')
    const [local_number, setLocal_number] = useState('')
    const handleSendQuestionnaire = () => {
        //Validate mobile number is valid
        const cleaned_number = validateMobileNumber(countryCode, local_number)
        send_questionnaire_sms(cleaned_number)
    }
    return (
        <div className='relative flex flex-col'>
            <Navbar />
            {/* <Button textButton="Send Message" onClick={handleSendFollowUp} /> */}
            <div className='md:p-5 items-center'>
                <div className="p-8 font-bold text-center dark:text-white text-lg">Send Questionnaire Link to Patient</div>
                <div className="w-full flex flex-wrap items-center space-x-2 justify-center">
                    <input type="text" placeholder="e.g. +61"
                        onChange={(e) => setCountryCode(e.target.value)}
                        defaultValue={countryCode}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-14"
                    />
                    <input type="text" placeholder="e.g. 422388572"
                        onChange={(e) => setLocal_number(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/5 md:w-2/5"
                    />
                    <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => handleSendQuestionnaire(`${countryCode}${local_number}`)}
                    >Send</button>
                </div>

                <div className="p-8 font-bold text-center dark:text-white text-lg">List of Latest Patients</div>
                <div className="lg:px-24 md:px-5 px-2">
                    <PatientTable />
                </div>
            </div>
        </div>
    )
}

export default Admin
