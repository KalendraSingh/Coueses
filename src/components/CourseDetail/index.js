import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {detail: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.onCourseDetail()
  }

  onCourseDetail = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(url)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.course_details
      const details = {
        imageUrl: fetchedData.image_url,
        name: fetchedData.name,
        description: fetchedData.description,
      }
      this.setState({
        detail: details,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCourseDetails = () => {
    const {detail} = this.state
    const {imageUrl, name, description} = detail
    return (
      <div className="course-cont">
        <img src={imageUrl} alt={name} className="course-image" />
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => {
    const failureUrl =
      'https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png'

    return (
      <div className="failure-cont">
        <img src={failureUrl} alt="failure view" />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button
          onClick={this.onCourseDetail}
          className="retry-btn"
          type="button"
        >
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderCourseDetails()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderAllDetails()}
      </>
    )
  }
}

export default CourseDetails
