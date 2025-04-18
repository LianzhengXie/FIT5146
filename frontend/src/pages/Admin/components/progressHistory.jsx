import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import StarRating from '@components/cardQuestion/starRating'
import ViewTitle from '@components/ui/viewTitle'
import Loading from '@components/loading'
import { getCategories } from '@api/categories'
import { getPrescriptionHistory, updatePrescription } from '@api/prescription'

const PrescriptionDateItem = ({ visit_date, categories, prescriptions }) => {
    const initValues = prescriptions.reduce((acc, prescription) => {
        acc[prescription.id] = prescription.answer
        return acc
    }, {})
    const [prescriptionStarValues, setPrescriptionStarValues] = useState(initValues) // {prescription_id: starValue, ...}
    const { mutate, isLoading: isLoadingUpdate } = useMutation({
        mutationFn: updatePrescription,
        onSuccess: (data) => {
            setPrescriptionStarValues((oldData) => {
                const newData = { ...oldData }
                newData[data.id] = data.answer
                return newData
            })
        }
    })
    const handleStarClick = (rating, prescription) => {
        const data = {
            id: prescription.id,
            answer: rating,
        }
        mutate(data)
    }
    return (
        <div className='flex flex-col p-1'>
            {/* VISIT_DATE */}
            <div className='text-gray-800 dark:text-white text-lg'>{visit_date}</div>
            {/* PRESCRIPTION */}
            <div className="w-full dark:text-white">
                {prescriptions.map((prescription) => {
                    const category = categories.find((category) => category.id === prescription.category_id);
                    return (
                        <div key={`p-${prescription.id}`} className='pl-4 p-2 flex flex-col items-center'>
                            <div className='w-full flex items-center'>
                                <img className="rounded-t-sm w-10 h-10 mr-3" src={`/${category.logo}`} alt="" />
                                <input type="text" disabled className="w-full p-1 m-1" value={prescription.description} />
                            </div>
                            <div className='ml-10'>
                                {
                                    isLoadingUpdate ? <Loading /> :
                                        <StarRating handleStarClick={(rating) => handleStarClick(rating, prescription)} initialStarValue={prescriptionStarValues[prescription.id]} starSize={5} margin={1} readOnly={true} />
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const ProgressHistory = ({ visit_id }) => {
    const { data: categories, isLoading: isLoadingCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        staleTime: Infinity,
    })
    const { data: prescriptionHistory, isLoading: isLoadingPrescriptionHistory } = useQuery({
        queryKey: ['prescription_history'],
        queryFn: () => getPrescriptionHistory(visit_id),
        staleTime: Infinity,
    })
    const isLoadingData = isLoadingCategories || isLoadingPrescriptionHistory

    return (
        <div className={`relative h-96 overflow-y-scroll p-5 dark:text-white bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ${isLoadingData ? 'pointer-events-none' : ''}`}>
            <ViewTitle title="Progress History" />
            {
                isLoadingData ? <Loading /> :
                    (
                        Object.keys(prescriptionHistory).length === 0 ?
                            <div className="flex justify-center items-center h-full text-center">No Patient History</div>
                            :
                            Object.keys(prescriptionHistory).map((visit_date) => {
                                const prescriptions = prescriptionHistory[visit_date];
                                return (
                                    <PrescriptionDateItem key={`pd-${visit_date}`} visit_date={visit_date} categories={categories} prescriptions={prescriptions} />
                                )
                            })
                    )
            }
        </div>
    )
}

export default ProgressHistory
