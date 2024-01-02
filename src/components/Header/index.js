import {Link} from 'react-router-dom'
import './index.css'

const Header = () => {
  const logoUrl =
    'https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png'
  return (
    <div className="header-cont">
      <Link to="/">
        <img src={logoUrl} alt="website logo" className="header-logo-style" />
      </Link>
    </div>
  )
}

export default Header
