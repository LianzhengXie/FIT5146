import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import Navbar from "./navbar"
import Loading from '@components/loading';
import { getPrescriptionsForPatient } from '@api/prescription';
import { getCategories } from '@api/categories';
import PrescriptionView from "./prescriptions";

const HomePrescription = () => {
    const { patient_id } = useParams();

    const { data: categories, isLoading: isLoadingCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        staleTime: Infinity,
    })
    const { data: prescriptions, isLoading: isLoadingPrescriptions } = useQuery({
        queryKey: ['patient_prescriptions'],
        queryFn: () => getPrescriptionsForPatient(patient_id),
    })

    if (isLoadingCategories || isLoadingPrescriptions) {
        return <Loading />;
    }

    let prescriptionsForView = {};
    // Get the first prescription for progress and the rest for history given that prescritions is a dictionary with key as the visit_date and a list of prescriptions as value


    if (Object.keys(prescriptions).length > 0) {
        const [firstEntryKey, firstEntryValue] = Object.entries(prescriptions)[0];
        prescriptionsForView[firstEntryKey] = firstEntryValue;
    }
    console.log(prescriptionsForView)

    return (
        <section className='h-dvh w-full flex flex-col max-h-screen items-center justify-between dark:bg-gray-700'>
            <Navbar subtitle='Progress' />
            <PrescriptionView categories={categories} prescriptions={prescriptionsForView} />
        </section>
    )
}

export default HomePrescription
