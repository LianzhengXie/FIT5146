import { useEffect, useRef, useState } from "react";

// const LevelRating = ({ handleChange, initialLevelValue = 0, readOnly = false }) => {
const LevelRating = ({ handleUpdate, initialLevelValue = 0, readOnly = false }) => {
    const maxRating = 10;
    const firstUpdate = useRef(true);
    const [levelValue, setLevelValue] = useState(initialLevelValue);

    const onLevelChange = (newValue) => {
        setLevelValue(newValue)
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        const timeoutId = setTimeout(async () => {
            handleUpdate(levelValue)
        }, 700)
        // Cleanup function to cancel the previous request if a new one is made
        return () => {
            clearTimeout(timeoutId);
        };
    }, [levelValue])

    return (
        <div className='w-full px-10 flex flex-col items-center'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selected: {levelValue}</label>
            <div className='min-w-full relative'>
                <input type="range"
                    className="min-w-full"
                    min="0" max={maxRating} step="1"
                    defaultValue={levelValue}
                    // onChange={(e) => setLevelValue(e.target.value)}
                    onChange={(e) => onLevelChange(e.target.value)}
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-4">0</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">5</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-4">10</span>
            </div>
        </div>
    )
}

export default LevelRating