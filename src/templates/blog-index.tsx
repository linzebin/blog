import * as React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import 'prismjs/themes/prism-tomorrow.css'

class BlogIndexTemplate extends React.Component<any, any> {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allMarkdownRemark.edges
    const { previous, next } = this.props.pathContext

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

export default BlogIndexTemplate

export const pageQuery = graphql`
  query IndexQuery($skip: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      skip: $skip
      limit: 10
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          html
          timeToRead
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  }
`
