import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const HomeRoute = () => (
  <div className="home-main-bg-conatiner">
    <Header />
    <div className="home-body-conatiner">
      <h1 className="home-heading">Find The Job That Fits Your Life</h1>
      <p className="content-msg">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="findJob-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)
export default HomeRoute
