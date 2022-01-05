import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <div className="home-bg-container">
        <div className="home-container">
          <h1 className="home-heading">Find the Job that Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs,salary information,
            company reviews .Find the job that fits your abilities and potential
          </p>
          <Link to="/jobs">
            <button className="job-button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
