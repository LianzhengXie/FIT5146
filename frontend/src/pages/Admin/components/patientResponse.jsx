import { useQuery } from 'react-query'

import ViewTitle from '../../../components/ui/viewTitle'
import Loading from '@components/loading'
import { getCategories } from '@api/categories'
import { getQuestionsAnsweredForVisit } from '@api/questions'

const CategoryItem = ({ category, questions }) => {
    return (
        <div className='flex flex-col p-1'>
            {/* ICON + NAME */}
            <div className="flex items-center">
                <img className="rounded-t-sm w-12 h-12" src={`/${category.logo}`} alt="" />
                <div className='text-gray-800 dark:text-white mx-5'>{category.name}</div>
            </div>
            {/* QUESTION + ANSWERS */}
            <div className="w-full dark:text-white">
                {questions.map(({ answer, question }) => {
                    return (
                        <div key={`cq-${question.id}`} className='pl-4 p-2 flex items-center'>
                            <div className="pr-3 w-full">Q{question.category_order}. {question.text}</div>
                            {question.question_type === 'bool' && <input type="checkbox" checked={Boolean(answer)} disabled />}
                            {question.question_type !== 'bool' && <div type="text" className="">{answer}</div>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const PatientResponse = ({ visit_id }) => {
    const { data: categories, isLoading: isLoadingCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        staleTime: Infinity,
    })
    const { data: questionsAnswered, isLoading: isLoadingQuestions } = useQuery({
        queryKey: ['questions_answered', visit_id],
        queryFn: () => getQuestionsAnsweredForVisit(visit_id),
        staleTime: Infinity,
    })
    const isLoadingData = isLoadingCategories || isLoadingQuestions

    return (
        <div className={`relative h-96 overflow-y-scroll p-5 dark:text-white bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ${isLoadingData ? 'pointer-events-none' : ''}`}>
            <ViewTitle title="Patient's Responses" />
            {
                isLoadingData ? <Loading /> :
                    (
                        Object.keys(questionsAnswered).length === 0 ?
                            <div className="flex justify-center items-center h-full text-center">No questions answered</div>
                            :
                            Object.keys(questionsAnswered).map((category_id) => {
                                const category = categories.find((category) => category.id === parseInt(category_id));
                                return (
                                    <CategoryItem key={`c-${category.id}`} category={category} questions={questionsAnswered[category_id]} />
                                )
                            })
                    )
            }
        </div>
    )
}

export default PatientResponse