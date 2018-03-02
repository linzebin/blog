import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Link from 'gatsby-link'

interface PostHeading {
  value: string
  depth: number
  chilren?: Array<PostHeading>
  parent?: PostHeading
  index?: number
  level?: Array<number>
}
interface PostTocProps {
  headings: Array<PostHeading>
}

interface PostTocChildProps extends PostTocProps {
  level: number
}

function anchorFmt(rawString: string) {
  return rawString
    .replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
      return $1.toLowerCase() + $2
    })
    .split(' ')
    .join('-')
}

class PostTocChild extends React.PureComponent<PostTocChildProps> {
  render() {
    return (
      <ol className="toc-child">
        {this.props.headings.map((head, index) => (
          <li className="toc-item " key={index}>
            <a className="toc-link" href={`#${anchorFmt(head.value)}`}>
              <span className="toc-number">{head.level.join('.')}.</span>
              <span className="toc-text">{head.value}</span>
            </a>
            {head.chilren && head.chilren.length > 0 && <PostTocChild headings={head.chilren} level={this.props.level + 1} />}
          </li>
        ))}
      </ol>
    )
  }
}
export default class PostToc extends React.Component<PostTocProps, {}> {
  render() {
    const tree = { value: '', depth: 1, chilren: new Array<PostHeading>() }
    this.props.headings.map((head, index) => {
      buildTree(head, tree)
    })
    return (
      <ol className="toc">
        {tree.chilren.map((head, index) => (
          <li className="toc-item " key={index}>
            <a className="toc-link" href={`#${anchorFmt(head.value)}`}>
              <span className="toc-number">{head.level.join('.')}.</span>
              <span className="toc-text">{head.value}</span>
            </a>
            <PostTocChild headings={head.chilren} level={2} />
          </li>
        ))}
      </ol>
    )
  }
}

function buildTree(curNode: PostHeading, preNode: PostHeading) {
  if (curNode.depth > preNode.depth) {
    if (curNode.depth === preNode.depth + 1) {
      let index = preNode.chilren.length + 1
      let level = preNode.level ? preNode.level.concat(index) : [index]
      preNode.chilren.push(Object.assign(curNode, { parent: preNode, level, chilren: [] }))
    } else {
      buildTree(curNode, preNode.chilren[preNode.chilren.length - 1])
    }
  }
}
