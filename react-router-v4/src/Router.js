/**
 * Router.js
 *
 * @author bigggge
 */
/* eslint-disable no-restricted-globals */

import React from 'react'
import PropTypes from 'prop-types'

let instances = []

export class Route extends React.Component {
  static propTypes = {
    exact: PropTypes.bool,
    path: PropTypes.string,
    component: PropTypes.func,
    render: PropTypes.func
  }

  handlePop = () => {
    this.forceUpdate()
  }

  componentWillMount () {
    addEventListener('popstate', this.handlePop)
    instances.push(this)
  }

  componentWillUnmount () {
    instances.splice(instances.indexOf(this), 1)
    removeEventListener('popstate', this.handlePop)
  }

  render () {
    const {path, exact, component, render} = this.props
    const match = matchPath(location.pathname, {path, exact})

    if (!match) {
      return null
    }

    if (component) {
      return React.createElement(component, {match})
    }

    if (render) {
      return render({match})
    }

    return null
  }

}

const matchPath = (pathname, options) => {
  const {exact = false, path} = options
  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true
    }
  }

  const match = new RegExp(`^${path}`).exec(pathname)

  if (!match) {
    return null
  }

  const url = match[0]
  const isExact = pathname === url

  if (exact && !isExact) {
    return null
  }

  return {
    path,
    url,
    isExact
  }
}

export class Link extends React.Component {
  static propTypes = {
    // to 是一个指向跳转目标地址的字符串
    to: PropTypes.string.isRequired,
    // replace 则是布尔变量来指定当用户点击跳转时是替换 history 栈中的记录还是插入新的记录
    replace: PropTypes.bool
  }

  handleClick = (event) => {
    const {replace, to} = this.props
    event.preventDefault()
    replace ? historyReplace(to) : historyPush(to)
  }

  render () {
    const {to, children} = this.props

    return (
      <a href={to} onClick={this.handleClick}>
        {children}
      </a>
    )
  }
}

const historyPush = (path) => {
  history.pushState({}, null, path)
  instances.forEach(instance => instance.forceUpdate())
}

const historyReplace = (path) => {
  history.replaceState({}, null, path)
  instances.forEach(instance => instance.forceUpdate())
}

export class Redirect extends React.Component {
  static defaultProps = {
    push: false
  }

  static propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    push: PropTypes.bool.isRequired,
    exact: PropTypes.bool
  }

  componentDidMount () {
    const {from, to, push, exact} = this.props
    let match = matchPath(location.pathname, {path: from, exact})
    console.log(match)
    if (match) {
      push ? historyPush(to) : historyReplace(to)
    }
  }

  render () {
    return null
  }
}