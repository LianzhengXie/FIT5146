const Button = ({ textButton, onClick }) => {
    return (
        <button type="button"
            onClick={onClick}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-7 py-3.5 text-center m-6">{textButton}</button>
    )
}

export default Button