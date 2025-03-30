import { useState } from "react"

const ToggleButton = ({ id, selectedValue, handleUpdate }) => {
    const [checked, setChecked] = useState(selectedValue === 'true' || false)

    const onClickToggle = () => {
        console.log('bef:', checked)
        setChecked(!checked)
        handleUpdate(!checked)
        console.log('aft:', checked)
    }

    return (
        // <select id={id} defaultValue={defaultValue}
        //     onChange={(e) => handleUpdate(e.target.value)}
        //     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        //     <option value="" disabled>Choose</option>
        //     <option value="true">Yes</option>
        //     <option value="false">No</option>
        // </select>
        <label className="relative inline-flex items-center cursor-pointer">
            <input id={id} type="checkbox" checked={checked} onChange={onClickToggle} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{checked ? "Yes" : "No"}</span>
        </label>
    )
}

export default ToggleButton