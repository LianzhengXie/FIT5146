import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react';

const ModalReminder = ({ isOpen, handleClose, handleSubmit, patient }) => {

    const [reminderState, setReminderState] = useState({
        firstDate: '',
        frequency: 'Custom',
        customFrequency: '7',
        lastDate: ''
    });

    useEffect(() => {
        if (patient) {
            setReminderState({
                firstDate: patient?.reminder?.start_date || '',
                frequency: 'Custom',
                customFrequency: patient?.reminder?.frequency_days || '7',
                lastDate: patient?.reminder?.end_date || ''
            });
        } else {
            setReminderState({
                firstDate: '',
                frequency: 'Custom',
                customFrequency: '7',
                lastDate: ''
            });
        }
    }, [patient]);

    if (!isOpen) return null;

    const onSubmit = (e) => {
        e.preventDefault();
        // TODO: Logic to handle the form submission
        const data = {
            firstDate: reminderState?.firstDate,
            // frequency: frequency === 'Custom' ? customFrequency : 7, //only number allowed, default 7
            frequency_days: reminderState?.customFrequency || 7, //only number allowed, default 7
            lastDate: reminderState?.lastDate,
        }
        handleSubmit(data);
        handleClose();
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReminderState((prevState) => ({ ...prevState, [name]: value }));
        console.log('change:', reminderState);
    };

    const handleCancel = () => {
        const confirmCancel = window.confirm("You have unsaved changes. Do you really want to cancel?");
        if (!confirmCancel) {
            return;
        }
        handleClose();
    }

    return createPortal(
        <>
            {/* <!-- Main modal --> */}
            <div tabIndex="-1" aria-hidden="true"
                className="fixed top-0 left-0 z-50 inset-0 bg-black bg-opacity-25 w-screen h-screen">
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Set Reminder
                            </h3>
                            <button type="button" onClick={handleClose}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <form className="p-4 md:p-5" onSubmit={onSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="firstDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Date for Reminder</label>
                                    <input type="date" name="firstDate" id="firstDate"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={reminderState?.firstDate}
                                        onChange={handleInputChange} required />
                                </div>
                                {/* <div className="col-span-2 sm:col-span-1"> */}
                                {/*     <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frequency for Reminder</label> */}
                                {/*     <select id="frequency" name="frequency" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={frequency} onChange={(e) => setFrequency(e.target.value)} required> */}
                                {/*         <option value="" disabled>Select frequency</option> */}
                                {/*         <option value="Daily">Daily</option> */}
                                {/*         <option value="Weekly">Weekly</option> */}
                                {/*         <option value="Bi-Weekly">Bi-Weekly</option> */}
                                {/*         <option value="Monthly">Monthly</option> */}
                                {/*         <option value="Custom">Custom</option> */}
                                {/*     </select> */}
                                {/* </div> */}
                                <div className="col-span-2">
                                    <label htmlFor="customFrequency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Custom Frequency (Every 1-7 days)</label>
                                    <input type="number" name="customFrequency" id="customFrequency"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={reminderState?.customFrequency}
                                        onChange={handleInputChange} min="1" max="7" placeholder="e.g., 3" required />
                                </div>
                                {/* <div className="col-span-2 sm:col-span-1"> */}
                                {/*     <label htmlFor="lastDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Date for Reminder</label> */}
                                {/*     <input type="date" name="lastDate" id="lastDate" */}
                                {/*         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" */}
                                {/*         value={reminderState?.lastDate} */}
                                {/*         onChange={handleInputChange} required /> */}
                                {/* </div> */}
                                {/* <div className="col-span-2"> */}
                                {/*     <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label> */}
                                {/*     <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea> */}
                                {/* </div> */}
                            </div>
                            <div className="flex justify-end">
                                <button type="submit"
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ms-2">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Set Reminder
                                </button>
                                <button type="button"
                                    className="text-gray-500 inline-flex items-center bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-500 ms-2"
                                    onClick={handleCancel} >
                                    Cancel
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
        , document.getElementById('root-modal'))
}

export default ModalReminder
