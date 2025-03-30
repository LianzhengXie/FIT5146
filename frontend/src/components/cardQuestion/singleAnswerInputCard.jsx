import { useEffect, useRef, useState } from "react";

const parseExtraParams = (extraParams) => {
    const params = extraParams.split('||');
    const parsedParams = {};
    for (let i = 0; i < params.length; i++) {
        const [key, value] = params[i].split(':');
        parsedParams[key] = value;
    }
    return parsedParams;
}

const SingleAnswerInputCard = ({ handleUpdate, initialValue = "", question }) => {
    const firstUpdate = useRef(true);
    const inputElement = useRef(null);
    const [value, setValue] = useState(initialValue);
    const extraParams = parseExtraParams(question.extra_params);

    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        const timeoutId = setTimeout(() => {
            // console.log(`SingleAnswerInputCard: Send data ${value}`)
            handleUpdate(value);
        }, 250)
        // Cleanup function to cancel the previous request if a new one is made
        return () => {
            clearTimeout(timeoutId);
        };
    }, [value])

    return (
        <div className='flex flex-col items-center' >
            {
                question.options &&
                question.options.split(';').map((option, index) => {
                    return (
                        <div key={`${option}-${index}`}
                            id={`${option}-${index}`}
                            className="flex items-center p-1 mb-1 text-gray-900 dark:text-white" >
                            <input type="radio" id={option} name={`answer-${question.id}`}
                                checked={value === option}
                                onChange={() => setValue(option)}
                                value={option} />
                            <label htmlFor={option} className="pl-2">{option}</label>
                        </div>
                    )
                })
            }
            {
                extraParams.image_name &&
                <img src={`/questionnaire/${extraParams.image_name}`}
                    alt={extraParams.image_name}
                    className="w-3/4 p-2"
                />
            }
        </div>
    )
}

export default SingleAnswerInputCard
