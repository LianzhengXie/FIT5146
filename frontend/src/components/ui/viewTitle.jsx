import PropTypes from 'prop-types'

const ViewTitle = ({ title }) => {
    return (
        <div className="font-bold text-center dark:text-white text-lg">{title}</div>
    )
}
ViewTitle.propTypes = {
    title: PropTypes.string.isRequired
}

export default ViewTitle