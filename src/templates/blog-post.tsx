import * as React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import PostToc from '../components/PostToc'
import SideBar from '../components/SideBar'

class BlogPostTemplate extends React.Component<any, any> {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pathContext

    return (
      <section className="post">
        <SideBar>
          <PostToc headings={post.headings} />
        </SideBar>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <h1 className="post__title">{post.frontmatter.title}</h1>
        <div className="post__time">{post.frontmatter.date}</div>
        <div className="post__content" dangerouslySetInnerHTML={{ __html: post.html }} />

        <hr style={{ margin: '40px 0 20px', opacity: 0.3 }} />

        <nav className="page-nav">
          {previous && (
            <Link className="page-nav__prev" to={previous.fields.slug} rel="prev">
              <span className="iconfont icon-pre icon" />
              <span className="text">{previous.frontmatter.title}</span>
            </Link>
          )}
          {next && (
            <Link className="page-nav__next" to={next.fields.slug} rel="next">
              <span className="text">{next.frontmatter.title}</span>
              <span className="iconfont icon-next icon" />
            </Link>
          )}
        </nav>
      </section>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      headings {
        value
        depth
      }
    }
  }
`
