import { useQuery } from 'react-query'

import Navbar from '@components/navbar'

import Carousel from './components/carousel';
// import Footer from '@components/footer';
import Loading from '@components/loading';
import { useParams } from 'react-router-dom';
import { getCategories } from '@api/categories';

import NotFound from '../Error/NotFound';

const Questionnaire = () => {
    const { category_id } = useParams();
    const { data: categories, isLoading: isLoadingCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        staleTime: Infinity,
    })

    if (isLoadingCategories) {
        return <Loading />;
    }
    // If category_id doesn't exist in categories, return page not found
    const category = categories.find((category) => category.id === parseInt(category_id));
    if (!category) {
        return <NotFound />
    }

    return (
        <div className='flex flex-col h-dvh max-h-screen dark:text-white'>
            <Navbar title={category.name} />
            {/* <section className='grow w-full flex items-center justify-around dark:bg-gray-700'> */}
            <section className='grow w-full flex flex-col items-center dark:bg-gray-700'>
                <Carousel category={category} />
            </section>
            {/* <Footer categories={categories} /> */}
        </div>
    )
}

export default Questionnaire