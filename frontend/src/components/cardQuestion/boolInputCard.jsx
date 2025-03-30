import { useEffect, useRef, useState } from "react";

const BoolInputCard = ({ handleUpdate, initialValue = 'false' }) => {
    // const firstUpdate = useRef(true);
    const [value, setValue] = useState(initialValue);

    // useEffect(() => {
    //     if (firstUpdate.current) {
    //         firstUpdate.current = false;
    //         return;
    //     }
    //     const timeoutId = setTimeout(() => {
    //         handleUpdate(value);
    //     }, 200)
    //     // Cleanup function to cancel the previous request if a new one is made
    //     return () => {
    //         clearTimeout(timeoutId);
    //     };
    // }, [value])

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked={value === 'true'}
                onChange={() => handleUpdate((!(value === 'true')).toString())} />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{value === 'true' ? "Yes" : "No"}</span>
        </label>
    )
    // <input type="number" defaultValue={value}
    //     onChange={(e) => setValue(e.target.value)}
    //     className="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
}

export default BoolInputCard