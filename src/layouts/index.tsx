import * as React from 'react'
import Link from 'gatsby-link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { changeSideBarVisible } from '../components/SideBar'

import '../styles/normalize.css'
import '../styles/iconfont.css'
import '../styles/base.scss'

class Template extends React.Component<any, any> {
  _onClick = () => {
    changeSideBarVisible()
  }

  render() {
    const { location, children } = this.props

    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    const portalContainer = document.body
    return (
      <React.Fragment>
        <div className="site-wrapper">
          <div className="site-wrapper__overlay" onClick={this._onClick} />
          <Header />
          <main className="site-main">{children()}</main>
          <Footer />
        </div>
      </React.Fragment>
    )
  }
}

export default Template
