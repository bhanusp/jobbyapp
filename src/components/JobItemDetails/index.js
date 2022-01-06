import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import NotFound from '../NotFound'
import JobCard from '../JobCard'
import FiltersGroup from '../FiltersGroup'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobList: [],
    apiStatus: apiStatusConstants.initial,
    activeEmploy: [],
    isChecked: false,

    activeSalary: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobList()
  }

  getJobList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {activeEmploy, activeSalary, searchInput} = this.state

    const employmentType = activeEmploy.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${activeSalary}&search=${searchInput}`
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
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogo: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        salaryPackage: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  reset = () => {
    this.setState({
      jobList: [],
      apiStatus: apiStatusConstants.initial,
      activeEmploy: '',
      activeSalary: '',
      searchInput: '',
    })
  }

  updateChecked = () => {
    const {isChecked} = this.state
    this.setState({isChecked: !isChecked})
    console.log('checked')
    if (isChecked === true) {
      this.setState({activeEmploy: employmentTypesList.employmentTypeId})
    }
  }

  changeActiveSalary = activeSalary => {
    this.setState({activeSalary}, this.getJobList)
  }

  enterSearchInput = () => {
    this.getJobList()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  renderFailureView = () => (
    <div>
      <NotFound />
      <h1>Oops! Something Went Wrong</h1>
      <button type="button" onClick={this.reset()}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobList = () => {
    const {jobList} = this.state
    const showJobs = jobList.length > 0

    return showJobs ? (
      <ul>
        {jobList.map(job => (
          <JobCard jobData={job} key={job.id} />
        ))}
      </ul>
    ) : (
      <div>
        <NotFound />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs.Try other filters</p>
      </div>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeEmploy, searchInput, activeSalary, isChecked} = this.state

    return (
      <div>
        <FiltersGroup
          searchInput={searchInput}
          activeEmploy={activeEmploy}
          activeSalary={activeSalary}
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          enterSearchInput={this.enterSearchInput}
          changeSearchInput={this.changeSearchInput}
          changeActiveSalary={this.changeActiveSalary}
          changeActiveEmploy={this.changeActiveEmploy}
          updateChecked={this.updateChecked}
          isChecked={isChecked}
        />
        {this.renderAllJobs()}
      </div>
    )
  }
}

export default JobItemDetails
