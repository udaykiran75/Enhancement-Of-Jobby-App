import './index.css'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="jobItem-container">
      <Link to={`/jobs/${id}`} className="link-component-container">
        <div className="logo-heading-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div>
            <h1 className="company-title">{title}</h1>
            <div className="rating-container">
              <FaStar id="star-icon" />
              <p className="no-star">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary-container">
          <div className="job-icons-con">
            <div className="employment-type-on">
              <MdLocationOn className="react-icon-job" />
              <p>{location}</p>
            </div>
            <div className="employment-type-on">
              <BsBriefcaseFill className="react-icon-job" />
              <p>{employmentType}</p>
            </div>
          </div>
          <h1 className="salary-for-annum">{packagePerAnnum}</h1>
        </div>
        <hr className="horizantal" />
        <div>
          <h1 className="description-head">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobItem
