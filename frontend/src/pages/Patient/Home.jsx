import { useQuery } from 'react-query'

import Loading from '@components/loading'
import { getQuestionsMandatoryWithAnswers, insertAnswerToQuestionsMandatory } from '../../api/questions_mandatory'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_NAME_TITLE } from '../../constants'

const CategoryRankInputMandatory = ({ handleUpdate, question }) => {
    const firstUpdate = useRef(true);
    const inputElement = useRef(null);
    const numOptions = question.options.split(',').length
    const [value, setValue] = useState(question.answer || ','.repeat(numOptions - 1)) // value is a comma separated string of numbers [1-10]

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
        }, 300)
        // Cleanup function to cancel the previous request if a new one is made
        return () => {
            clearTimeout(timeoutId);
        };
    }, [value])

    const handleInputChange = (index, newValue) => {
        const newValueArray = value.split(',')
        newValueArray[index] = newValue
        setValue(newValueArray.join(','))
    }


    return (
        <div className='flex flex-col items-center'>
            {
                question.options &&
                question.options.split(',').map((option, index) => {
                    option = option.trim()
                    return (
                        <div key={index}
                            className="flex items-center p-1 mb-1 text-gray-900 dark:text-white justify-between">
                            <label htmlFor={option} className="w-28">{option}</label>
                            <input type="number" id={option} name="answer"
                                className="w-20 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                min="1" max="10"
                                value={value.split(',')[index]}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                        </div>

                    )
                })
            }
        </div>
    )
}

const SingleAnswerInputMandatory = ({ handleUpdate, question }) => {
    const firstUpdate = useRef(true);
    const inputElement = useRef(null);
    const [value, setValue] = useState(question.answer || '')

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
        }, 300)
        // Cleanup function to cancel the previous request if a new one is made
        return () => {
            clearTimeout(timeoutId);
        };
    }, [value])

    return (
        <div className='flex flex-col items-center'>
            {
                question.options &&
                question.options.split(',').map((option, index) => {
                    option = option.trim()
                    return (
                        <div key={index}
                            className="flex items-center p-1 mb-1 text-gray-900 dark:text-white"
                        >
                            <input type="radio" id={option} name="answer"
                                checked={value === option}
                                onChange={() => setValue(option)}
                                value={option} />
                            <label htmlFor={option}>{option}</label>
                        </div>
                    )
                })
            }
        </div>
    )
}


const QuestionMandatory = ({ question, handleCardChange }) => {
    const firstUpdate = useRef(true);
    const [answerValue, setAnswerValue] = useState(question.answer || '')

    const handleUpdate = (newValue) => {
        // Send request to API to update answer
        setAnswerValue(newValue)
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        const timeoutId = setTimeout(async () => {
            const data = { question_mandatory_id: question.id, answer: answerValue }
            insertAnswerToQuestionsMandatory(data)
            handleCardChange(data)
        }, 150)
        // Cleanup function to cancel the previous request if a new one is made
        return () => {
            clearTimeout(timeoutId);
        };
    }, [answerValue])

    const renderQuestionComponent = () => {
        switch (question.question_type) {
            case 'single_answer':
                return <SingleAnswerInputMandatory handleUpdate={handleUpdate} question={question} />
            default: // case 'category_rank'
                return <CategoryRankInputMandatory handleUpdate={handleUpdate} question={question} />
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <label htmlFor="countries" className="block p-4 mb-2 text-lg font-medium text-gray-900 dark:text-white">{question.id}. {question.text}</label>
            {renderQuestionComponent()}
        </div>
    );
};


const Home = () => {
    const navigate = useNavigate();
    // const queryClient = useQueryClient();
    let firstIndex = 0
    let [currentIndex, setCurrentIndex] = useState(firstIndex);
    const { data: questions_mandatory_with_answers, isLoading: isLoadingQuestionsMandatory } = useQuery({
        queryKey: ['questions_mandatory_with_answers'],
        queryFn: getQuestionsMandatoryWithAnswers,
    })

    // const { mutate: mutateInsertAnswer, isLoading: isLoadingInsertAnswer } = useMutation({
    //     mutationFn: insertAnswerToQuestionsMandatory,
    //     onSuccess: (data) => {
    //         console.log(`onSuccess: data ${JSON.stringify(data)}`)
    //         queryClient.setQueryData(['questions_mandatory_with_answers'], (oldData) => {
    //             oldData = oldData.filter((a) => a.question_id !== data.question_id)
    //             const newData = [...oldData, data]
    //             console.log(`newData ${JSON.stringify(newData)}`)
    //             return newData
    //         })
    //     }
    // })

    let previousQuestion = () => {
        if (currentIndex === 0) setCurrentIndex(questions_mandatory_with_answers.length - 1);
        else setCurrentIndex(currentIndex - 1);
    };

    let nextQuestion = () => {
        if (currentIndex === questions_mandatory_with_answers.length - 1) setCurrentIndex(0);
        else setCurrentIndex(currentIndex + 1);
    };

    const handleCardChange = (data) => {
        console.log(`handleCardChange: Send data ${data}`)
        // Invalidate query
        // mutateInsertAnswer(data)
    }

    if (isLoadingQuestionsMandatory) {
        return <Loading />;
    }

    const handleQuestionnaire = () => {
        navigate('/questionnaire')
    }

    return (
        <section className='h-dvh max-h-screen w-full flex flex-col items-center dark:bg-gray-700'>
            <nav className="z-50 w-full bg-slate-500 text-black shadow-sm font-mono dark:text-white min-h-20 flex">
                <div className="flex flex-wrap items-center justify-between mx-auto p-2 h-full">
                    <div className='flex flex-col'>
                        <span className="text-lg sm:text-2xl self-center font-semibold whitespace-nowrap dark:text-white">{APP_NAME_TITLE}</span>
                        <span className="text-lg sm:text-2xl self-center font-semibold whitespace-nowrap dark:text-white">Questionnaire</span>
                    </div>
                </div>
            </nav>

            <div className='relative flex-grow items-center w-full'>
                {/* <div className='flex flex-col grow items-center w-full'> */}
                <div className='items-center'>
                    {/* <div className='grow items-center'> */}
                    {
                        isLoadingQuestionsMandatory ? <Loading />
                            :
                            questions_mandatory_with_answers.map((q, i) => {
                                return (
                                    <div key={i} hidden={i != currentIndex}>
                                        <QuestionMandatory key={q.id} question={q} handleCardChange={handleCardChange} />
                                    </div>
                                )
                            })
                    }
                </div>

                <div className='absolute bottom-0 flex w-full justify-between h-1/3'>
                    <button onClick={previousQuestion} type="button" data-carousel-prev=""
                        className={`${currentIndex != 0 ? "cursor-pointer" : "disabled-button"} z-10 flex items-center justify-center h-full pl-4 group focus:outline-none`}>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-white/30 bg-gray-800/30 dark:group-hover:bg-white/50 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"
                                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"></path>
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button onClick={nextQuestion} type="button" data-carousel-next=""
                        className={`${currentIndex != questions_mandatory_with_answers.length - 1 ? "cursor-pointer" : "disabled-button"} z-10 flex items-center justify-center h-full pr-4 group focus:outline-none`}>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-white/30 bg-gray-800/30 dark:group-hover:bg-white/50 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"
                                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"></path>
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </div>
                <div className='absolute bottom-0 w-full flex justify-center'>
                    <button className={`btn-primary ${currentIndex === questions_mandatory_with_answers.length - 1 ? '' : 'hidden'}`}
                        onClick={handleQuestionnaire} >
                        Go to Questionnaire
                    </button>
                </div>
            </div>


            <div className='flex justify-between'>
                {
                    <div className="py-4 my-3 flex justify-center gap-1 md:gap-2 w-full">
                        {questions_mandatory_with_answers.map((q, i) => {
                            return (
                                <div
                                    onClick={() => {
                                        setCurrentIndex(i);
                                    }}
                                    key={"circle" + i}
                                    className={`rounded-full w-4 h-4 cursor-pointer ${i == currentIndex ? "bg-black dark:bg-white" : "bg-gray-500"}`}
                                ></div>
                            );
                        })}
                    </div>
                }
            </div>

        </section >
    );
}

export default Home

