import { useParams } from 'react-router-dom'

// import Button from '@components/ui/button'
import Navbar from './navbar'
import PatientResponse from './components/patientResponse'
import Prescription from './components/prescription'
import ProgressHistory from './components/progressHistory'

const AdminVisit = () => {
    const { visit_id } = useParams()

    // const handlePrint = () => {
    //     console.log('Print')
    // }
    return (
        <>
            <Navbar />
            <div className="p-4 grid gap-8 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 dark:bg-gray-700">
                <PatientResponse visit_id={visit_id} />
                {/* <DoctorEntries visit_id={visit_id} /> */}
                <ProgressHistory visit_id={visit_id} />
                <Prescription visit_id={visit_id} />
            </div>

            {/* <div className='flex justify-center'>
                <div><Button textButton='Print' onClick={handlePrint} /></div>
            </div> */}
        </>
    )
}

export default AdminVisit