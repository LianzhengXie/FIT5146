import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import CardQuestion from './cardQuestion';
import Loading from '@components/loading';
import { getQuestionsForCategory, getAsnwersForCategory, upsertAnswer } from '@api/questions';

const Carousel = ({ category }) => {
    const category_id = category.id;
    const queryClient = useQueryClient();
    const { data: questions, isLoading: isLoadingQuestions } = useQuery({
        queryKey: ['questions', category_id],
        queryFn: () => getQuestionsForCategory(category_id),
        staleTime: Infinity,
    })
    const { data: answers, isLoading: isLoadingAnswers } = useQuery({
        queryKey: ['answers', category_id],
        queryFn: () => getAsnwersForCategory(category_id),
    })

    let firstIndex = 0
    let [currentIndex, setCurrentIndex] = useState(firstIndex);

    useEffect(() => {
        setCurrentIndex(firstIndex);
    }, [firstIndex, category_id]);

    const { mutate: mutateUpsertAnswer, isLoading: isLoadingUpsertAnswer } = useMutation({
        mutationFn: upsertAnswer,
        onSuccess: (data) => {
            console.log(`onSuccess: data ${JSON.stringify(data)}`)
            queryClient.setQueryData(['answers', category_id], (oldData) => {
                oldData = oldData.filter((a) => a.question_id !== data.question_id)
                const newData = [...oldData, data]
                console.log(`newData ${JSON.stringify(newData)}`)
                return newData
            })
        }
    })

    if (isLoadingQuestions || isLoadingAnswers) {
        return <Loading />;
    }

    let firstNotRatedQuestion = questions.find((q) => !answers.find((a) => a.question_id === q.id));
    firstIndex = firstNotRatedQuestion === undefined ? questions.length - 1 : questions.indexOf(firstNotRatedQuestion);

    // let firstAnswerYes = false;
    // if (answers && answers.length > 0) {
    //     firstAnswerYes = answers[0].answer === 'true';
    // }

    let previousQuestion = () => {
        if (currentIndex === 0) setCurrentIndex(questions.length - 1);
        else setCurrentIndex(currentIndex - 1);
    };

    let nextQuestion = () => {
        if (currentIndex === questions.length - 1) setCurrentIndex(0);
        else setCurrentIndex(currentIndex + 1);
    };

    const handleCardChange = (data) => {
        console.log(`handleCardChange: Send data ${data}`)
        mutateUpsertAnswer(data)

        // queryClient.invalidateQueries({ queryKey: ['answers'] })
    }

    if (questions.length == 0) {
        return <div className='py-10'>{`No questions for category "${category.name}"`}</div >
    }

    return (
        <>
            {
                isLoadingUpsertAnswer ? <Loading />
                    :
                    questions.map((q, i) => {
                        let answer = answers?.find((a) => a.question_id === q.id)?.answer;
                        // if answer is not null or undefined, trim the answer
                        if (answer) { answer = answer.trim() }
                        return (
                            <div key={i} hidden={isLoadingUpsertAnswer || i != currentIndex}>
                                <CardQuestion key={q.id} question={q} answer={answer} handleCardChange={handleCardChange} />
                            </div>
                        )
                    })
            }

            <div className='flex grow w-full justify-between'>
                <button onClick={previousQuestion} type="button" className={`${currentIndex != 0 ? "cursor-pointer" : "disabled-button"} z-10 flex items-center justify-center h-full pl-4 group focus:outline-none`} data-carousel-prev="">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-white/30 bg-gray-800/30 dark:group-hover:bg-white/50 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"></path>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                {/* <button onClick={nextQuestion} type="button" className={`${currentIndex != questions.length - 1 && firstAnswerYes ? "cursor-pointer" : "disabled-button"} z-10 flex items-center justify-center h-full pr-4 group focus:outline-none`} data-carousel-next=""> */}
                <button onClick={nextQuestion} type="button" className={`${currentIndex != questions.length - 1 ? "cursor-pointer" : "disabled-button"} z-10 flex items-center justify-center h-full pr-4 group focus:outline-none`} data-carousel-next="">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-white/30 bg-gray-800/30 dark:group-hover:bg-white/50 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"></path>
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>

            <div className='flex justify-between'>
                <div className="py-4 my-3 flex justify-center gap-1 md:gap-2 w-full">
                    {questions.map((q, i) => {
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
                {/* { */}
                {/*     firstAnswerYes && */}
                {/*     // <div className="fixed bottom-36 py-4 flex justify-center gap-2 w-full"> */}
                {/*     <div className="py-4 my-3 flex justify-center gap-1 md:gap-2 w-full"> */}
                {/*         {questions.map((q, i) => { */}
                {/*             return ( */}
                {/*                 <div */}
                {/*                     onClick={() => { */}
                {/*                         setCurrentIndex(i); */}
                {/*                     }} */}
                {/*                     key={"circle" + i} */}
                {/*                     className={`rounded-full w-4 h-4 cursor-pointer ${i == currentIndex ? "bg-black dark:bg-white" : "bg-gray-500"}`} */}
                {/*                 ></div> */}
                {/*             ); */}
                {/*         })} */}
                {/*     </div> */}
                {/* } */}
            </div>

        </>
    );
};

export default Carousel;
