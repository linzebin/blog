import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Link from 'gatsby-link'

enum SideBarTabType {
  INDEX,
  BIO,
}

export default class SideBar extends React.Component<any, { tabType: SideBarTabType }> {
  _el: any
  portalContainer: any

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.portalContainer = document.getElementById('___gatsby')
    }
  }

  constructor(props: any) {
    super(props)
    this.state = { tabType: SideBarTabType.BIO }
  }

  _changTab = () => {
    this.setState(prevState => {
      return {
        tabType: prevState.tabType === SideBarTabType.INDEX ? SideBarTabType.BIO : SideBarTabType.INDEX,
      }
    })
  }

  render() {
    const showToc = this.props.children && this.props.children.props.headings.length > 0
    this._el = (
      <aside className="site-sidebar">
        {showToc && (
          <div className="sidebar-switch">
            <a onClick={this._changTab} className={`dark-btn${this.state.tabType === SideBarTabType.INDEX ? ' active' : ''}`}>
              <span>Index</span>
            </a>
            <a onClick={this._changTab} className={`dark-btn${this.state.tabType === SideBarTabType.BIO ? ' active' : ''}`}>
              <span>BIO</span>
            </a>
          </div>
        )}
        <div className={`site-toc${this.state.tabType === SideBarTabType.INDEX ? ' show' : ''}`}>{this.props.children}</div>
        <div className={`site-bio${this.state.tabType === SideBarTabType.BIO ? ' show' : ''}`}>
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
            <Link to="/album" className="menu-item dark-btn">
              Album
            </Link>
            <Link to="/link" className="menu-item dark-btn">
              Link
            </Link>
          </div>
        </div>
      </aside>
    )

    return this.portalContainer ? ReactDOM.createPortal(this._el, this.portalContainer) : null
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
