/**
 * 404 page template
 */
import React, { Component, PropTypes } from 'react'
import { twitterShare } from '../../utils/social/share'
import styles from './index.css'

export default class PageError extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    errorText: PropTypes.string,
  }
  static defaultProps = {
    error: 404,
    errorText: 'Page Not Found',
  }
  componentDidMount() {
    const { error } = this.props
    const url = window.location.href
    if (error === 404 && !url.match(/localhost/)) {
      // post 404 data
    }
  }
  render() {
    const { error, errorText } = this.props
    const tweet = twitterShare(
      'Hi @DavidWells, It looks like this page is missing ☞', // msg
      (typeof window !== 'undefined') ? window.location.href : 'localhost.com', // url
      ['FYI'] // hashtags
    )
    const content = (
      <div className={styles.content}>
        <div className={styles.message}>
          It seems you found a broken link. Do not hesitate to report this page!
        </div>
        <div>
          Tweet at <a target='_blank' rel='noopener noreferrer' href={tweet}>@DavidWells</a> or&nbsp;
          <a
            href='https://github.com/davidwells/site/issues'
            target='_blank'
            rel='noopener noreferrer'
          >
          open a github issue
          </a>
        </div>
        <div className={styles.otherLinks}>
          <a href='/' title='Go to the homepage'>
            Visit homepage
          </a>
        </div>
      </div>
    )
    return (
      <div className={styles.container}>
        <a href='/' title='Go to the homepage'>
          <img alt='Serverless logo' src={'https://www.fillmurray.com/130/130'} draggable='false' />
        </a>
        <div className={styles.text}>
          <p className={styles.title}>
            <strong>{error}</strong>
            {' '}
            {errorText}
          </p>
          {error === 404 && content}
        </div>
      </div>
    )
  }
}
