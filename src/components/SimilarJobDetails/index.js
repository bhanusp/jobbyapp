import './index.css'

const SimilarJobDetails = props => {
  const {jobDetails} = props

  const {
    companyLogo,

    employmentType,

    jobDescription,
    location,
    title,

    rating,
  } = jobDetails

  return (
    <li className="similar-job-item">
      <img src={companyLogo} alt="company Logo" className="similar-logo" />
      <h1>{title}</h1>
      <p>{rating}</p>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <div>
        <p>{location}</p>
        <p>{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobDetails
