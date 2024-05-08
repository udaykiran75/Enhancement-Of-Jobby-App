import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onLogoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="ms-header-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="icons-container">
          <li>
            <Link to="/">
              <button type="button" className="icon-button" label="home-button">
                <AiFillHome className="react-icon" />
              </button>
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <button
                type="button"
                className="icon-button"
                label="jobCase-button"
              >
                <BsBriefcaseFill className="react-icon" />
              </button>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="icon-button"
              onClick={onLogoutButton}
              label="logout-button"
            >
              <FiLogOut className="react-icon" />
            </button>
          </li>
        </ul>
      </div>
      <div className="route-buttons-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-lg"
          />
        </Link>
        <ul className="buttons-con">
          <li>
            <Link to="/">
              <button className="route-btn" type="button">
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <button className="route-btn" type="button">
                Jobs
              </button>
            </Link>
          </li>
        </ul>
        <button
          className="logout-button"
          onClick={onLogoutButton}
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
export default withRouter(Header)
