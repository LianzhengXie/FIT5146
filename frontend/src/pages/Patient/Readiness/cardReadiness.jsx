import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from 'react-query';

import { upsertReadinessAnswer } from '@api/readiness';


const CardReadiness = ({ category, readiness, answer }) => {
    const queryClient = useQueryClient()
    const firstUpdate = useRef(true);
    const [answerValue, setAnswerValue] = useState(answer);

    const handleUpdate = (newValue) => {
        setAnswerValue(newValue)
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (answerValue === null || answerValue === undefined) {
            return;
        }
        const timeoutId = setTimeout(async () => {
            const body = { category_id: category.id, readiness_id: answerValue }
            console.log('body', body)
            await upsertReadinessAnswer(body)
            queryClient.invalidateQueries({ queryKey: ['readiness_answered'] })
            // TODO: Implement error handling
        }, 500)
        // Cleanup function to cancel the previous request if a new one is made
        return () => {
            clearTimeout(timeoutId);
        };
    }, [answerValue])
    // }, [answerValue, category])


    return (
        <div className='flex flex-col items-center'>
            <label htmlFor="countries" className="block p-3 mb-4 text-lg font-bold text-gray-900 dark:text-white">{`Are you ready to change your "${category.name}" habits?`}</label>
            {
                readiness.map((option) => {
                    return (
                        <div key={`div-${category.id}-${option.id}`} className="flex items-start mb-4">
                            <input checked={answerValue === option.id}
                                onChange={() => handleUpdate(option.id)}
                                id={`c${category.id}-r${option.id}`} type="radio" value="" name={`c${category.id}-r${option.id}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor={`c${category.id}-r${option.id}`} className="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">{option.option}</label>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default CardReadiness