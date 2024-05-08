import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    employmentTypes,
    selectEmploymentType,
    salaryRange,
    salaryRangesList,
    selectSalaryRange,
  } = props

  const renderEmploymentTypes = () => (
    <>
      <h1 className="checkboxs-title">Type of Employment</h1>
      <ul className="list-items-div">
        {employmentTypesList.map(eachItem => (
          <li key={eachItem.employmentTypeId} className="checkbox-container">
            <input
              type="checkbox"
              id={eachItem.employmentTypeId}
              value={eachItem.employmentTypeId}
              checked={employmentTypes.includes(eachItem.employmentTypeId)}
              onChange={selectEmploymentType}
              className="checkbox"
            />
            <label
              className="checkbox-label"
              htmlFor={eachItem.employmentTypeId}
            >
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  const renderSalaryRanges = () => (
    <>
      <h1 className="checkboxs-title">Salary Range</h1>
      <ul className="list-items-div">
        {salaryRangesList.map(salaryItem => (
          <li key={salaryItem.salaryRangeId} className="checkbox-container">
            <input
              type="radio"
              id={salaryItem.salaryRangeId}
              value={salaryItem.salaryRangeId}
              checked={salaryRange === salaryItem.salaryRangeId}
              onChange={selectSalaryRange}
              className="checkbox"
            />
            <label
              htmlFor={salaryItem.salaryRangeId}
              className="checkbox-label"
            >
              {salaryItem.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <>
      {renderEmploymentTypes()}
      <hr className="horizantal-line" />
      {renderSalaryRanges()}
    </>
  )
}
export default FiltersGroup
