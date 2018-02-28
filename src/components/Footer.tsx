import * as React from 'react'

export default class Footer extends React.Component<any, any> {
  render() {
    return (
      <footer className="site-footer">
        <div className="social-wrapper">
          <a href="https://github.com/linzebin">
            <i className="iconfont icon-github" />
          </a>
          <a href="">
            <i className="iconfont icon-wechat" />
          </a>
        </div>
        <div>Powered by Gatsby.</div>
        <div>© linzebingo</div>
      </footer>
    )
  }
}
