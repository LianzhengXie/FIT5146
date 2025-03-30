
const SendFollowUpButton = () => {
    const handleClick = () => {
        console.log('Send follow up email')
    }

    return (
        <button
            type="button"
            className='sm:block hidden rounded-full text-sm p-2 m-1 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-white'
            onClick={handleClick}
        >
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
            </svg>
        </button>
    )
}

export default SendFollowUpButton
