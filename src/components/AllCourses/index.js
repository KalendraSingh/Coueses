import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import CourseItem from '../CourseItem/index'
import Header from '../Header/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class AllCourses extends Component {
  state = {coursesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.findData()
  }

  findData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()

      const fetchedData = data.courses.map(eachData => ({
        id: eachData.id,
        logoUrl: eachData.logo_url,
        name: eachData.name,
      }))

      this.setState({
        coursesList: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {
    const failureUrl =
      'https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png'

    return (
      <div className="failure-cont">
        <img src={failureUrl} alt="failure view" />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button onClick={this.findData} className="retry-btn" type="button">
          Retry
        </button>
      </div>
    )
  }

  onRenderCourseItem = () => {
    const {coursesList} = this.state
    return (
      <>
        <h1>Courses</h1>
        <ul className="all-course-list">
          {coursesList.map(eachCCourse => (
            <CourseItem eachCCourse={eachCCourse} key={eachCCourse.id} />
          ))}
        </ul>
      </>
    )
  }

  renderAllDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.onRenderCourseItem()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderAllDetails()}
      </div>
    )
  }
}

export default AllCourses
