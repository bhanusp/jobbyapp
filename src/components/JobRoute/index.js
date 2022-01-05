import Header from '../Header'
import Profile from '../Profile'
import JobItemDetails from '../JobItemDetails'

import './index.css'

const JobRoute = () => (
  <>
    <div>
      <Header />
      <div className="jobs-container">
        <Profile />
        <JobItemDetails />
      </div>
    </div>
  </>
)

export default JobRoute
