import * as React from 'react'
import Link from 'gatsby-link'

import '../styles/Header.scss'
import { changeSideBarVisible } from './SideBar'

export default class Header extends React.Component<any, any> {
  _onClick = () => {
    changeSideBarVisible()
  }

  render() {
    return (
      <header className="site-header">
        <div className="header-wrapper">
          <Link to="/" className="site-header__logo">
            <span className="site-header__title">剑与魔法</span>
            <span className="site-header__desc">次元壁垒即将打破</span>
          </Link>
          <button className="site-nav-switch" onClick={this._onClick}>
            <i className="iconfont icon-menu" />
          </button>
        </div>
      </header>
    )
  }
}
