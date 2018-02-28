const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.tsx')
    const blogIndex = path.resolve('./src/templates/blog-index.tsx')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges

        // 创建分页
        const PAGE_SIZE = 2
        const total = Math.ceil(posts.length / PAGE_SIZE)
        for (let i = 1; i <= total; i++) {
          createPage({
            path: i === 1 ? '/' : `page/${i}`,
            component: blogIndex,
            context: {
              current: i,
              skip: (i - 1) * PAGE_SIZE,
              total,
            },
          })
        }

        // Create blog posts pages.
        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? false : posts[index + 1].node
          const next = index === 0 ? false : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField, createRedirect } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
