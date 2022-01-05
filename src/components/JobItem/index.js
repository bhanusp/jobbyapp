import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import SimilarJobDetails from '../SimilarJobDetails'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItem extends Component {
  state = {
    jobItemData: {},
    similarJobsData: [],

    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItem()
  }

  getFormattedSkill = data => ({
    skillImage: data.image_url,
    skillName: data.name,
  })

  getFormattedData = data => ({
    companyLogo: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
  })

  getJobItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = this.getFormattedData(fetchedData)
      const updateSimilarJobs = fetchedData.similar_jobs.map(eachSimilar =>
        this.getFormattedData(eachSimilar),
      )

      this.setState({
        jobItemData: updatedData,
        similarJobsData: updateSimilarJobs,

        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button">Retry</button>
    </div>
  )

  renderJobItemView = () => {
    const {jobItemData, similarJobsData} = this.state
    const {
      companyLogo,
      companyWebsiteUrl,

      employmentType,

      jobDescription,

      location,
      packagePerAnnum,
      rating,
    } = jobItemData

    return (
      <div className="success-view">
        <div className="image-container">
          <img src={companyLogo} alt="company logo" className="logo-img" />
          <div>
            <p className="rating">{rating}</p>
          </div>
          <div>
            <p>{location}</p>
            <p>{employmentType}</p>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <h1 className="description">Description</h1>

          <p className="job-description">{jobDescription}</p>
          <div>
            <a href={companyWebsiteUrl}>Visit</a>
          </div>
          <div>
            <h1 className="skills-heading">Skills</h1>
          </div>
          <div>
            <h1>Life at Company</h1>
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul>
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobDetails
              jobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderJobItemDetails()}</div>
      </>
    )
  }
}

export default JobItem
