import { useState } from 'react'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom';

import CardReadiness from './cardReadiness';
import ExitTab from '@components/exitTab';
import Loading from '@components/loading';
import NavbarReadiness from './navbarReadiness';
import { getReadinessOptions, getReadinessAnswers } from '@api/readiness';
import { getCategoriesAnswered } from '@api/questions';

const Readiness = () => {
    const [indexCategory, setIndexCategory] = useState(0)
    // Load Readiness Options
    const { data: readiness, isLoading: isLoadingReadiness } = useQuery({
        queryKey: ['readiness'],
        queryFn: () => getReadinessOptions(),
        staleTime: Infinity,
    })
    // Load Categories Answered
    const { data: categoriesAnswered, isLoading: isLoadingCategoriesAnswered } = useQuery({
        queryKey: ['categories_answered'],
        queryFn: () => getCategoriesAnswered(),
        staleTime: 0
    })
    // Load Readiness Answers
    const { data: readinessAnswers, isLoading: isLoadingReadinessAnswers } = useQuery({
        queryKey: ['readiness_answered'],
        queryFn: () => getReadinessAnswers(),
    })

    if (isLoadingCategoriesAnswered || isLoadingReadiness || isLoadingReadinessAnswers) {
        return <Loading />;
    }
    // If there are no categories answered, redirect to Questionnaire
    if (categoriesAnswered.length === 0) {
        console.log('No categories answered', categoriesAnswered.length)
        alert('No categories answered')
        return <Navigate to="/home" />
    }

    return (
        <div className='h-dvh flex flex-col justify-between'>
            <NavbarReadiness title={categoriesAnswered[indexCategory].name}/>
            <div className='grow flex'>
                <button onClick={() => setIndexCategory(indexCategory - 1)} type="button" disabled={indexCategory < 1} className="disabled:disabled-button z-30 flex items-center justify-center h-full pl-4 cursor-pointer group focus:outline-none" data-carousel-prev="">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-white/30 bg-gray-800/30 dark:group-hover:bg-white/50 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"></path>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <div className=' w-full flex items-center justify-around dark:bg-gray-700'>
                    {
                        categoriesAnswered.map((category, index) => {
                            const answer = readinessAnswers.find((answer) => answer.category_id === category.id)
                            return (
                                <div key={category.id} className={index != indexCategory ? "hidden" : ""}>
                                    <CardReadiness category={category} readiness={readiness} answer={answer?.readiness_id} />
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={() => setIndexCategory(indexCategory + 1)} type="button" disabled={indexCategory >= categoriesAnswered.length - 1} className="disabled:disabled-button z-30 flex items-center justify-center h-full pr-4 cursor-pointer group focus:outline-none" data-carousel-next="">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-white/30 bg-gray-800/30 dark:group-hover:bg-white/50 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"></path>
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
            <ExitTab goToPage={'/'} />
        </div>
    )
}

export default Readiness