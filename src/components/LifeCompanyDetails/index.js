import './index.css'

const LifeCompanyDetails = props => {
  const {companyDetails} = props
  const {lifeCompanyDescription, lifeCompanyUrl} = companyDetails

  return (
    <li>
      <img
        src={lifeCompanyUrl}
        alt="life at company"
        className="life-company"
      />
      <p>{lifeCompanyDescription}</p>
    </li>
  )
}

export default LifeCompanyDetails
