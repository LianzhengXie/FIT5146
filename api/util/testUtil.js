/**
 * Creates an array of visit objects based on the given dates array.
 * Dates array are in ascending order from earliest to latest by one day.
 * Last date in the array is the current date.
 *
 * @param {Array<Date>} dates - The array of dates for the visits.
 * @returns {Array<Object>} - The array of visit objects.
 */
exports.createVisits = (totalDays) => {
    let today = new Date()
    today.setDate(today.getDate() - (totalDays - 1))
    const dates = [today]
    for (let i = 1; i < totalDays; i++) {
        const newDay = new Date(today)
        newDay.setDate(today.getDate() + i)
        dates.push(newDay)
    }
    const visits = dates.map((date, index) => {
        return {
            id: index + 1,
            patient_id: global.patientData.id,
            visit_dt_tm: date
        }
    })
    return visits
}
/**
 * Creates an array of prescription objects based on the given visits array.
 * Only one prescription is created for each visit.
 *
 * @param {Array<Object>} visits - The array of visit objects.
 * @returns {Array<Object>} - The array of prescription objects.
 */
exports.createPrescriptionsFromVisits = (visits) => {
    const prescriptions = visits.map((visit, index) => {
        return {
            id: index + 1,
            visit_id: visit.id,
            category_id: 1,
            description: `description for ${visit.id} in category 1`,
            answer: 5
        }
    })
    return prescriptions
}