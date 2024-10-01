import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import FiltersGroup from '../FiltersGroup'
import JobItem from '../JobItem'

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

const locationBasedList = [
  {
    locationId: 'HYDERABAD',
    label: 'Hyderabad',
  },
  {
    locationId: 'BANGALORE',
    label: 'Bangalore',
  },
  {
    locationId: 'CHENNAI',
    label: 'Chennai',
  },
  {
    locationId: 'DELHI',
    label: 'Delhi',
  },
  {
    locationId: 'MUMBAI',
    label: 'Mumbai',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobsRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentTypes: [],
    salaryRange: '',
    jobLocations: [],
    allJobsData: [],
  }

  componentDidMount() {
    this.getAllJobsData()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getAllJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, employmentTypes, salaryRange} = this.state
    const employmentTypesJoined = employmentTypes.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesJoined}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const jobsData = await response.json()
    if (response.ok) {
      const updatedData = jobsData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        allJobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  selectEmploymentType = event => {
    const {value, checked} = event.target
    const {employmentTypes} = this.state
    if (checked === true) {
      this.setState(
        {employmentTypes: [...employmentTypes, value]},
        this.getAllJobsData,
      )
    } else {
      const removedEmploymentId = employmentTypes.filter(
        eachId => eachId !== value,
      )
      this.setState({employmentTypes: removedEmploymentId}, this.getAllJobsData)
    }
  }

  selectSalaryRange = event => {
    const {value} = event.target
    this.setState({salaryRange: value}, this.getAllJobsData)
  }

  getLocationBasedJobs = () => {
    const {jobLocations, allJobsData} = this.state
    const filteredJobs = allJobsData.filter(jobItem =>
      jobLocations.includes(jobItem.location),
    )
    console.log(filteredJobs)
    if (filteredJobs.length > 0) {
      this.setState({allJobsData: filteredJobs})
    } else {
      this.getAllJobsData()
    }
  }

  selectJobLoactions = event => {
    const {value, checked} = event.target
    const {jobLocations} = this.state
    if (checked === true) {
      this.setState(
        {jobLocations: [...jobLocations, value]},
        this.getLocationBasedJobs,
      )
    } else {
      const removedJobLocationId = jobLocations.filter(
        eachId => eachId !== value,
      )
      this.setState(
        {jobLocations: removedJobLocationId},
        this.getLocationBasedJobs,
      )
    }
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="input-container">
        <input
          type="search"
          className="searchInput-box"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <button
          className="search-icon-btn"
          type="button"
          data-testid="searchButton"
          onClick={this.getAllJobsData}
          label="search-button"
        >
          <BsSearch />
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.getAllJobsData}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {allJobsData} = this.state
    const numberOfJobs = allJobsData.length === 0

    return numberOfJobs ? (
      <div className="jobs-notFound-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="nojobs-heading">No Jobs Found</h1>
        <p className="nojobs-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    ) : (
      <div className="job-description-container">
        <ul className="jobs-list-container">
          {allJobsData.map(eachJob => (
            <JobItem key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {employmentTypes, salaryRange, allJobsData, jobLocations} = this.state
    console.log(allJobsData)
    return (
      <div>
        <Header />
        <div className="jobsRoute-main-container">
          <div className="medium-large-view-one">
            <div className="only-small-device">{this.renderSearchInput()}</div>
            <ProfileDetails />
            <hr className="horizantal-line" />
            <FiltersGroup
              employmentTypes={employmentTypes}
              employmentTypesList={employmentTypesList}
              selectEmploymentType={this.selectEmploymentType}
              salaryRange={salaryRange}
              salaryRangesList={salaryRangesList}
              selectSalaryRange={this.selectSalaryRange}
              jobLocations={jobLocations}
              jobLocationsList={locationBasedList}
              selectJobLoactions={this.selectJobLoactions}
            />
          </div>
          <div className="medium-large-view-two">
            <div className="only-medium-above-device">
              {this.renderSearchInput()}
            </div>
            {this.renderApiStatusView()}
          </div>
        </div>
      </div>
    )
  }
}
export default JobsRoute
