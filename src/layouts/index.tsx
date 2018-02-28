import * as React from 'react'
import Link from 'gatsby-link'
import Header from '../components/Header'
import Footer from '../components/Footer'

import './normalize.css'
import './iconfont.css'
import './base.scss'

class Template extends React.Component<any, any> {
  render() {
    const { location, children } = this.props

    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }
    return (
      <div className="site-wrapper">
        <Header />
        <main className="site-main">{children()}</main>
        <Footer />
      </div>
    )
  }
}

export default Template
