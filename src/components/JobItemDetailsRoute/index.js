import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import {withRouter} from 'react-router-dom'
import Header from '../Header'

const apiStatusConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class JobItemDetailsRoute extends Component {
  state = {jobDetails: [], apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getjobItemDetails()
  }

  getjobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const jobData = await response.json()
    console.log(jobData)

    if (response.ok) {
      const formatedData = {
        jobItemDetails: {
          companyLogoUrl: jobData.job_details.company_logo_url,
          companyWebsiteUrl: jobData.job_details.company_website_url,
          employmentType: jobData.job_details.employment_type,
          jobDescription: jobData.job_details.job_description,
          location: jobData.job_details.location,
          packagePerAnnum: jobData.job_details.package_per_annum,
          rating: jobData.job_details.rating,
          title: jobData.job_details.title,
          skills: jobData.job_details.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
          lifeAtCompany: {
            description: jobData.job_details.life_at_company.description,
            imageUrl: jobData.job_details.life_at_company.image_url,
          },
        },
        similarJobs: jobData.similar_jobs.map(eachJobItem => ({
          companyLogoUrl: eachJobItem.company_logo_url,
          employmentType: eachJobItem.employment_type,
          jobdescription: eachJobItem.job_description,
          id: eachJobItem.id,
          location: eachJobItem.location,
          rating: eachJobItem.rating,
          title: eachJobItem.title,
        })),
      }
      this.setState({
        jobDetails: formatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failed-img"
        alt="failure view"
      />
      <h1 className="faied-head">Oops! Something Went Wrong</h1>
      <p className="faied-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="re-try-button"
        onClick={this.getjobItemDetails}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails} = this.state
    const {jobItemDetails, similarJobs} = jobDetails

    return (
      <div className="JobItemDetailsRoute-body">
        <div className="jobitem-bg-container">
          <div className="logo-heading-container">
            <img
              src={jobItemDetails.companyLogoUrl}
              className="company-logo"
              alt="job details company logo"
            />
            <div>
              <h1 className="company-title">{jobItemDetails.title}</h1>
              <div className="rating-container">
                <FaStar id="star-icon" />
                <p className="no-star">{jobItemDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="job-icons-con">
              <div className="employment-type-on">
                <MdLocationOn className="react-icon-job" />
                <p>{jobItemDetails.location}</p>
              </div>
              <div className="employment-type-on">
                <BsBriefcaseFill className="react-icon-job" />
                <p>{jobItemDetails.employmentType}</p>
              </div>
            </div>
            <p className="salary-for-annum">{jobItemDetails.packagePerAnnum}</p>
          </div>
          <hr className="horizantal" />
          <div>
            <div className="discription-heding-website-link-con">
              <h1 className="description-head">Description</h1>
              <a
                className="link-element"
                href={jobItemDetails.companyWebsiteUrl}
              >
                Visit <FiExternalLink />
              </a>
            </div>
            <p className="job-description">{jobItemDetails.jobDescription}</p>
          </div>
          <div>
            <h1 className="skill-head">Skills</h1>
            <ul className="skills-list">
              {jobItemDetails.skills.map(skill => (
                <li className="skill-div" key={skill.name}>
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="skill-image"
                  />
                  <p className="skill-name">{skill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="C-life-head">Life at Company</h1>
            <p className="company-description">
              {jobItemDetails.lifeAtCompany.description}
            </p>
            <img
              src={jobItemDetails.lifeAtCompany.imageUrl}
              className="company-life-image"
              alt="life at company"
            />
          </div>
        </div>
        <div>
          <h1 className="similarJobs-heding">Similar Jobs</h1>
          <ul className="similarJobs-list">
            {similarJobs.map(eachJob => (
              <li className="similarJobs-container" key={eachJob.id}>
                <div className="logo-heading-container">
                  <img
                    src={eachJob.companyLogoUrl}
                    className="company-logo"
                    alt="similar job company logo"
                  />
                  <div>
                    <h1 className="company-title">{eachJob.title}</h1>
                    <div className="rating-container">
                      <FaStar id="star-icon" />
                      <p className="no-star">{eachJob.rating}</p>
                    </div>
                  </div>
                </div>
                <div className="similarJobs-discription-con">
                  <h1 className="description-head">Description</h1>
                  <p className="job-description">{eachJob.jobdescription}</p>
                  <div className="job-icons-con">
                    <div className="employment-type-on">
                      <MdLocationOn className="react-icon-job" />
                      <p>{eachJob.location}</p>
                    </div>
                    <div className="employment-type-on">
                      <BsBriefcaseFill className="react-icon-job" />
                      <p>{eachJob.employmentType}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.loading:
        return this.renderLoadingView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobItem-detail-container">
          {this.renderApiStatusView()}
        </div>
      </>
    )
  }
}
export default withRouter(JobItemDetailsRoute)
