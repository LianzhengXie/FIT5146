import { Link } from 'react-router-dom';

const CardCategory = ({ category }) => {
    return (
        <div className="mx-4 h-44 sm:h-52 md:m-5 md:h-56 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/questionnaire/${category.id}`} className='p-2 md:p-3'>
                <img className="rounded-t-sm h-32 sm:h-auto" src={`/${category.logo}`} alt="" />
            </Link>
            <h5 className="sm:p-2 text-gray-900 dark:text-white">{category.name}</h5>
        </div>
    )
}

export default CardCategory
