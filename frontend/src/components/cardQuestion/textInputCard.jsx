import { useEffect, useRef, useState } from "react";

const TextInputCard = ({ handleUpdate, initialValue = "" }) => {
    const firstUpdate = useRef(true);
    const inputElement = useRef(null);
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        const timeoutId = setTimeout(() => {
            handleUpdate(value);
        }, 1000)
        // Cleanup function to cancel the previous request if a new one is made
        return () => {
            clearTimeout(timeoutId);
        };
    }, [value])

    return <input type="text" defaultValue={value}
        ref={inputElement}
        autoFocus={true}
        onChange={(e) => setValue(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
}

export default TextInputCard