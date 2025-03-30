import { useQuery } from 'react-query'

import Loading from '@components/loading'
import { SelectBinary } from '@components/ui/selectBinary'
import ViewTitle from './ui/viewTitle'
import { getQuestionsPerCategory } from '@api/questions'

const CategoryItem = ({ category, entry, handleSelect, handleOnChangeText }) => {
    const questions = category.questions
    const handleOnChoose = (data) => {
        handleSelect(data)
    }
    const handleText = (e) => {
        const data = {
            question_id: e.target.id,
            answer: e.target.value
        }
        console.log(`handleText: Send data ${e.target.value}`)
        handleOnChangeText(data)
    }
    return (
        <div className='flex flex-col p-1'>
            {/* ICON + NAME */}
            <div className="flex items-center">
                <img className="rounded-t-sm w-12 h-12" src={`/${category.logo}`} alt="" />
                <div className='text-gray-800 dark:text-white mx-5'>{category.name}</div>
            </div>
            {/* QUESTION + ANSWERS */}
            <div className="w-full dark:text-white">
                {questions.map((question) => {
                    return (
                        <div key={`cq-${question.id}`} className='pl-4 p-2 flex items-center justify-between'>
                            <div className="pr-3 w-full">Q{question.category_order}. {question.text}</div>
                            <div className="w-28">
                                {question.question_type === 'bool' && <SelectBinary id={question.id} handleUpdate={handleOnChoose} />}
                                {question.question_type !== 'bool' && <input id={question.id} defaultValue={entry?.answer} type="text" onChange={handleText} className="w-24"></input>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const DoctorEntries = ({ visit_id }) => {
    const { data: questionsPerCategory, isLoading: isLoadingQuestions } = useQuery({
        queryKey: ['questions_per_category'],
        queryFn: () => getQuestionsPerCategory(),
    })
    const isLoadingData = isLoadingQuestions

    const handleOnChangeText = (data) => {
        data.visit_id = visit_id
        console.log(`handleOnChangeInputText: Send data ${data}`)
    }
    const handleSelect = () => {
        console.log(`handleOnChangeSelect: Send data with ${visit_id}`)
    }

    return (
        <div className={`relative h-96 overflow-y-scroll p-5 dark:text-white bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ${isLoadingData ? 'pointer-events-none' : ''}`}>
            <ViewTitle title="Doctor's Entries" />
            {
                isLoadingData ? <Loading /> :
                    (
                        questionsPerCategory.length === 0 ?
                            <div className="flex justify-center items-center h-full text-center">No questions answered</div> :
                            questionsPerCategory.map((category) => {
                                return (
                                    <CategoryItem key={`c-${category.id}`} category={category} handleSelect={handleSelect} handleOnChangeText={handleOnChangeText} />
                                )
                            })
                    )
            }
        </div>
    )
}

export default DoctorEntries