import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import ViewTitle from '../../../components/ui/viewTitle'
import InputText from '@components/ui/inputText'
import Loading from '@components/loading'
import { getCategories } from '@api/categories'
import { addPrescription, deletePrescription, getPrescriptionsForVisit } from '@api/prescription'

const PrescriptionItem = ({ categories, prescription, handleAction, disabled = false }) => {
    const initialCategory = categories.find((category) => category.id === prescription?.category_id)
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)
    const [text, setText] = useState(prescription?.description || "")
    const handleOnChangeSelected = (category_id) => {
        setSelectedCategory(categories.find((category) => category.id == category_id))
    }
    const handleOnChangeText = (newText) => {
        setText(newText)
    }
    const handleSave = () => {
        if (!selectedCategory || text === "") {
            alert('Please select category and fill prescription')
            return
        }
        const data = {
            action: 'save',
            data: {
                category_id: selectedCategory.id,
                description: text,
            }
        }
        handleAction(data)
    }
    const handleDelete = () => {
        const data = {
            action: 'delete',
            data: {
                prescription_id: prescription.id
            }
        }
        handleAction(data)
    }
    return (
        <div className='flex items-center py-2'>
            {/* CATEGORY */}
            <select id="select-prescription" defaultValue={selectedCategory?.id || ""}
                onChange={(e) => handleOnChangeSelected(e.target.value)}
                className="bg-gray-50 border mr-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" disabled>Select</option>
                {
                    categories.map((category) => {
                        return <option key={`p-c-${category.id}`} value={category.id}>{category.name}</option>
                    })
                }
            </select>
            {/* PRESCRIPTION */}
            <div className="mx-2 w-full dark:text-white">
                <InputText text={prescription?.description || ""} handleOnChange={handleOnChangeText} disabled={disabled} />
            </div>
            {/* SAVE/DELETE BUTTON */}
            <>
                {
                    prescription ?
                        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded">
                            <svg className="w-4 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                            </svg>
                        </button>
                        :
                        <button onClick={handleSave} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded">
                            <svg className="w-4 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
                            </svg>
                        </button>
                }
            </>
        </div>
    )
}


const Prescription = ({ visit_id }) => {
    const [key, setKey] = useState(1);
    const queryClient = useQueryClient()
    const { data: categories, isLoading: isLoadingCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        staleTime: Infinity,
    })
    const { data: prescriptions, isLoading: isLoadingPrescriptions } = useQuery({
        queryKey: ['prescriptions', visit_id],
        queryFn: () => getPrescriptionsForVisit(visit_id),
        staleTime: Infinity,
    })

    const { mutate: mutateSave, isLoading: isLoadingSave } = useMutation({
        mutationFn: addPrescription,
        onSuccess: (data) => {
            queryClient.setQueryData(['prescriptions', visit_id], (oldData) => [...oldData, data] )
        }
    })
    const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
        mutationFn: deletePrescription,
        onSuccess: (data) => {
            queryClient.setQueryData(['prescriptions', visit_id], (oldData) => oldData.filter((prescription) => prescription.id !== data.id))
        }
    })
    const isLoadingDataChange = isLoadingSave || isLoadingDelete

    const handleAction = (dataPrescription) => {
        dataPrescription.data.visit_id = visit_id
        if (dataPrescription.action === 'save') {
            mutateSave(dataPrescription.data)
            setKey(key + 1)
        } else {
            mutateDelete(dataPrescription.data)
        }
    }

    return (
        <div className={`relative h-96 overflow-y-scroll p-5 md:col-span-2 sm:col-span-1 dark:text-white bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ${isLoadingDataChange ? 'pointer-events-none' : ''}`}>
            <ViewTitle title="Prescription" />
            {
                (isLoadingCategories || isLoadingPrescriptions) ? <Loading /> :
                <>
                    {prescriptions.map((prescription) => {
                        return <PrescriptionItem key={`p-${prescription.id}`} categories={categories} handleAction={handleAction} prescription={prescription} disabled={true} />
                    })}
                    <PrescriptionItem key={key} categories={categories} handleAction={handleAction} />
                </>
            }
            {
                ( isLoadingDataChange ) && <Loading />
            }
        </div>
    )
}

export default Prescription