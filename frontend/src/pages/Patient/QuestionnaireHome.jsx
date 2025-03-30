import { useQuery } from 'react-query'

import CardCategory from './components/cardCategory'
import Navbar from '@components/navbar'
import Loading from '@components/loading'
import { getCategories } from '@api/categories'

const QuestionnaireHome = () => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        staleTime: Infinity,
    })

    return (
        <section className='h-dvh max-h-screen w-full flex flex-col items-center dark:bg-gray-700'>
            <Navbar subtitle="Questionnaire" />
            <div className='grow grid items-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
                {
                    isLoading ?
                        <Loading />
                        :
                        categories.map((category) => (
                            <CardCategory key={category.id} category={category} />
                        ))
                }
            </div>
        </section>
    );
}

export default QuestionnaireHome

