// import { useEffect, useRef, useState } from 'react'
import { useEffect, useRef, useState } from 'react'

// import { API_URL, postOptions } from '../../../constants';
import StarRating from '@components/cardQuestion/starRating';
import LevelRating from '@components/cardQuestion/levelRating';
import TextInputCard from '@components/cardQuestion/textInputCard';
import NumberInputCard from '@components/cardQuestion/numberInputCard';
import BoolInputCard from '@components/cardQuestion/boolInputCard';
import SingleAnswerInputCard from '../../../components/cardQuestion/singleAnswerInputCard';

const CardQuestion = ({ question, answer, handleCardChange }) => {
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
            const data = { question_id: question.id, answer: answerValue }
            handleCardChange(data)
        }, 550)
        // Cleanup function to cancel the previous request if a new one is made
        return () => {
            clearTimeout(timeoutId);
        };
    }, [answerValue])

    const renderQuestionComponent = () => {
        switch (question.question_type) {
            case 'bool':
                return <BoolInputCard handleUpdate={handleUpdate} initialValue={answerValue} />
            case 'num':
                return <NumberInputCard handleUpdate={handleUpdate} initialValue={answer} />
            case 'text':
                return <TextInputCard handleUpdate={handleUpdate} initialValue={answer} />
            case 'single_answer':
                return <SingleAnswerInputCard handleUpdate={handleUpdate} initialValue={answer} question={question} />
            case 'level':
                return <LevelRating handleUpdate={handleUpdate} initialLevelValue={answer} readOnly={false} />
            default:
                return <StarRating handleStarClick={handleUpdate} initialStarValue={answer} />
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <label htmlFor="countries" className="block p-4 mb-2 text-lg font-medium text-gray-900 dark:text-white">{question.category_order}. {question.text}</label>
            {renderQuestionComponent()}
        </div>
    );
};

export default CardQuestion
