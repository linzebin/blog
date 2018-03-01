import * as React from 'react'
import Link from 'gatsby-link'
import * as ReactDOM from 'react-dom'

const portalContainer = document.getElementById('___gatsby')

export default class SideBar extends React.Component<any, any> {
  render() {
    const content = (
      <aside className="site-sidebar">
        <div className="site-toc">{this.props.children}</div>
        <div className="site-bio">
          <div className="about-me">
            <div className="avator">
              <img src="" alt="" />
            </div>
            <div className="info">
              <Link to="/about" className="name dark-btn">
                linzebingo
              </Link>
            </div>
            <div className="info">「Stay hungry, Stay foolish」</div>
          </div>
          <div className="menu">
            <Link to="/about" className="menu-item dark-btn">
              About
            </Link>
            <Link to="/works" className="menu-item dark-btn">
              Works
            </Link>
            <Link to="/archives" className="menu-item dark-btn">
              Archives
            </Link>
            <Link to="/link" className="menu-item dark-btn">
              Link
            </Link>
          </div>
        </div>
      </aside>
    )

    return ReactDOM.createPortal(content, portalContainer)
  }
}

function changeSideBarVisible() {
  const oldCls = document.body.className
  const isOpen = document.body.className.indexOf('menu-open') > -1
  if (isOpen) {
    document.body.classList.remove('menu-open')
  } else {
    document.body.classList.add('menu-open')
  }
}

export { changeSideBarVisible }
