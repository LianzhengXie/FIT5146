import { NavLink } from 'react-router-dom';

const Footer = ({ categories }) => {
    return (
        <footer className="w-full bg-white border-t border-gray-200 shadow p-4 md:p-6 dark:bg-gray-800 dark:border-gray-600 flex justify-between items-center ">
            {categories.map((category) => (
                <NavLink key={category.id} to={`/questionnaire/${category.id}`} className="hover:underline text-xs sm:text-sm lg:text-lg">
                    {category.name}
                </NavLink>
            ))}
        </footer>
    )
}

export default Footer