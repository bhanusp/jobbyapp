import {BsSearch} from 'react-icons/bs'

import './index.css'

const FiltersGroup = props => {
  const renderEmployments = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(employment => {
      const {updateChecked, isChecked} = props
      const onClickEmploymentType = () => updateChecked(isChecked)

      return (
        <li className="employment-list" key={employment.employmentTypeId}>
          <label key="label">
            <input
              type="checkbox"
              id="label"
              onChange={onClickEmploymentType}
            />
            {employment.label}
          </label>
        </li>
      )
    })
  }
  const renderTypeEmployment = () => (
    <div>
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="employment-list">{renderEmployments()}</ul>
    </div>
  )

  const renderSalary = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(salary => {
      const {changeActiveSalary} = props
      const onClickSalary = () => changeActiveSalary(salary.salaryRangeId)

      return (
        <li className="salary-list" key={salary.salaryRangeId}>
          <label key="label">
            <input
              type="radio"
              id="label"
              name="range"
              onClick={onClickSalary}
            />
            {salary.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div>
      <h1 className="salary-heading">Salary Range</h1>
      <ul className="salary-list">{renderSalary()}</ul>
    </div>
  )

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button type="button" testid="searchButton">
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  return (
    <div className="filters-group-container">
      {renderSearchInput()} {renderTypeEmployment()} {renderSalaryRange()}
    </div>
  )
}
export default FiltersGroup
