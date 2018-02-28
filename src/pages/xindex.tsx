import * as React from 'react'
import Link from 'gatsby-link'
// import get from 'lodash/get'
import Helmet from 'react-helmet'
import Header from '../components/Header'

// import typography from '../utils/typography'

class BlogIndex extends React.Component<any, any> {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allMarkdownRemark.edges
    // const { rhythm } = typography;
    return (
      <section className="post-list">
        <Helmet title={siteTitle} />
        {posts.map(({ node }: { node: any }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug} className="post">
              <h3 className="post__title">
                <Link to={node.fields.slug}>{title}</Link>
              </h3>
              <time className="post__time">{node.frontmatter.date}</time>
              <section className="post__content">
                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </section>
            </article>
          )
        })}
      </section>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery2 {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
