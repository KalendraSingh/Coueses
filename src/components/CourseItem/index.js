import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {eachCCourse} = props
  const {logoUrl, name, id} = eachCCourse
  return (
    <Link to={`courses/${id}`}>
      <li className="list-item">
        <img src={logoUrl} alt={name} className="logo-style" />
        <p>{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
