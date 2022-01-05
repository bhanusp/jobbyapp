import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogo,
    employmentType,
    id,
    jobDescription,
    location,
    salaryPackage,
    rating,
    title,
  } = jobData

  return (
    <li>
      <Link to={`/jobs/:${id}`} className="link-item">
        <img src={companyLogo} className="company-logo" alt="company logo" />
        <h1 className="title-heading">{title}</h1>
        <p className="rating">{rating}</p>
        <p className="location">{location}</p>
        <p className="employment-type">{employmentType}</p>
        <p>{salaryPackage}</p>
        <hr className="horizontal-line" />
        <p className="jobDescription">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
