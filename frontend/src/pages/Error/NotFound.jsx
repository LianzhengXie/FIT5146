import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <section className="bg-white dark:bg-gray-900 h-screen flex items-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-9xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-white">404</h1>
                    <p className="mb-4 text-4xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Page Not Found.</p>
                    <p className="mb-4 text-xl font-light text-gray-500 dark:text-gray-400">Sorry, we can&apos;t find that page.</p>
                    <Link to='/home' className="inline-flex dark:text-white bg-primary-600 hover:bg-primary-800 hover:underline focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Go to Homepage</Link>
                </div>
            </div>
        </section>
    )
}

export default NotFound