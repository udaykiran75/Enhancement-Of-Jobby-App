import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const profileApiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProfileDetails extends Component {
  state = {
    apiStatus: 'INITIAL',
    userDetails: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: profileApiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const userData = {
        profileImage: data.profile_details.profile_image_url,
        username: data.profile_details.name,
        userbio: data.profile_details.short_bio,
      }
      this.setState({
        apiStatus: profileApiStatus.success,
        userDetails: userData,
      })
    } else {
      this.setState({apiStatus: profileApiStatus.failure})
    }
  }

  getFailureView = () => {
    const onClickButton = () => this.getProfileDetails()
    return (
      <div className="user-profile-failure">
        <button className="retry-btn" type="button" onClick={onClickButton}>
          Retry
        </button>
      </div>
    )
  }

  getLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getSuccessView = () => {
    const {userDetails} = this.state
    const {profileImage, username, userbio} = userDetails
    return (
      <div className="user-profile-success">
        <img src={profileImage} className="avator-image" alt="profile" />
        <h1 className="username">{username}</h1>
        <p className="userbio">{userbio}</p>
      </div>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case profileApiStatus.success:
        return this.getSuccessView()
      case profileApiStatus.loading:
        return this.getLoadingView()
      case profileApiStatus.failure:
        return this.getFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderApiStatus()}</>
  }
}
export default ProfileDetails
