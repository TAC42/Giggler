import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useModal } from '../customHooks/ModalContext.jsx'
import { useDeviceType } from '../customHooks/DeviceTypeContext.jsx'

import { socialMediaLinks } from '../services/gallery.service.js'

import SvgIcon from './SvgIcon.jsx'

export function AppFooter() {
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const { openLogin } = useModal()
  const deviceType = useDeviceType()

  return deviceType === 'desktop' || deviceType === 'tablet' ? (
    <footer className="desktop-footer flex full">
      <div className="footer-part flex">
        <h1>Giggler</h1>
        <h2>© Giggler International Ltd. 2023</h2>
      </div>

      <div className="footer-part flex">
        <div className="social-icons flex row">
          {socialMediaLinks.map((link, idx) => (
            <div key={idx} className="icon-container">
              {/* <a href={link.url} target="_blank" rel="noopener noreferrer"> */}
              <Link to="/about">
                <img src={link.img} alt="Social Media Icon" />
              </Link>
              {/* </a> */}
            </div>
          ))}
        </div>

        <div className="access-icon flex">
          <SvgIcon iconName="accessIcon" />
        </div>

        <Link to="/about" className="about-icon flex">
          <SvgIcon iconName="questionMarkIcon" />
        </Link>
      </div>
    </footer>
  ) : (
    <footer className="mobile-footer grid">
      <NavLink to="/">
        <SvgIcon iconName="appHomeIcon" />
      </NavLink>

      <NavLink
        to={`chat/${loggedinUser?._id}`}
        onClick={(e) => {
          if (!loggedinUser) {
            e.preventDefault()
            openLogin()
          }
        }}
      >
        <SvgIcon iconName="appEnvelopeIcon" />
      </NavLink>

      <NavLink to="/explore">
        <SvgIcon iconName="appMagnifyingGlassIcon" />
      </NavLink>

      <NavLink
        to="orders"
        onClick={(e) => {
          if (!loggedinUser) {
            e.preventDefault()
            openLogin()
          }
        }}
      >
        <SvgIcon iconName="appOrdersIcon" />
      </NavLink>

      <NavLink
        to={loggedinUser ? `/user/${loggedinUser._id}` : '/void'}
        onClick={(e) => {
          if (!loggedinUser) {
            e.preventDefault()
            openLogin()
          }
        }}
      >
        <SvgIcon iconName="appProfileIcon" />
      </NavLink>
    </footer>
  )
}
