import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { BodyContainer } from 'phenomic'
import Svg from 'react-svg-inline'
import Page from '../Page'
import authorData from '../../pages/Blog/authors.json'
import ContentLoading from '../../components/ContentLoading/Paragraph'
import FixedSocialButtons from '../../components/FixedSocialButtons'
import gitHubSvg from '../../assets/icons/github.svg'
import styles from './Post.css'
import disqus from './disqus-script'

class Post extends Component {
  static hasLoadingState = true
  render() {
    const { props } = this
    const { head, body, isLoading, loadingData } = props
    let pageDate
    let postMeta
    let githubURL
    let author
    let authorBio
    let avatarURL
    let title = (head) ? head.title : 'Default Loading Title'

    if (loadingData && loadingData.title) {
      title = loadingData.title
    }

    if (!isLoading) {
      pageDate = head.date ? new Date(head.date) : null
      let postDataContent
      if (pageDate) {
        const actualDate = new Date(pageDate.getTime() + Math.abs(pageDate.getTimezoneOffset() * 60000))
        postDataContent = (
          <span className={styles.publishMeta}>
          Published on&nbsp;
            <time key={actualDate.toISOString()}>
              {actualDate.toDateString()}
            </time>
          </span>
        )
      }

      githubURL = `https://github.com/serverless/blog/edit/master/posts${head.gitLink}`
      postMeta = (
        <header className={styles.postMeta}>
          {postDataContent}
          <span className={styles.editLink}>
            <Svg svg={gitHubSvg} cleanup />
            <a target='_blank' rel='noopener noreferrer' href={githubURL}>
              Edit this post
            </a>
          </span>
        </header>
      )

      title = head.title

      if (head.authors && Array.isArray(head.authors)) {
        // console.log('page.authors', page.authors)
        const authorInfo = head.authors.map((a) => {
          return authorData[a]
        })
        const authorNames = authorInfo.map((auth) => {
          return auth.name
        })
        // console.log('authorInfo', authorInfo)
        if (authorNames.length < 2) {
          // single author
          author = authorNames[0]
          // console.log('authorInfo[0].avatar', authorInfo[0].avatar)
          avatarURL = (authorInfo[0].avatar) ? authorInfo[0].avatar : false
          authorBio = (authorInfo[0].bio && authorInfo[0].bio.long) ? authorInfo[0].bio.long : false
        }
      }
    }
    const bodyContent = body || ''
    let markdownContent = (
      <BodyContainer>
        {bodyContent}
      </BodyContainer>
    )
    let authorBox
    if (author) {
      authorBox = (
        <div className={styles.authorBox}>
          <div className={styles.authorImage}>
            <img src={avatarURL} role='presentation' />
          </div>
          <div className={styles.authorDetails}>
            <h3>About {author}</h3>
            <div className={styles.authorBio}>{authorBio}</div>
          </div>
        </div>
      )
    }

    if (isLoading) {
      markdownContent = <ContentLoading numberOfLines={30} />
    }

    return (
      <Page {...props} className={styles.postPage}>
        <FixedSocialButtons
          url={`https://davidwells.io${this.props.__url}`}
          title={title}
        />
        <div className={styles.postWrapper}>
          <div className={styles.contentWrapper}>

            <h1 className={styles.title}>{title}</h1>

            <div className={styles.postMetaWrapper}>
              {postMeta}
            </div>
            <div className={styles.postContent}>
              {markdownContent}
              {authorBox}
            </div>
          </div>
        </div>
        <div className={styles.comments} id='disqus_thread' />
        <Helmet script={[{ type: 'text/javascript', innerHTML: disqus }]} />
      </Page>
    )
  }
}

Post.propTypes = {
  head: PropTypes.object.isRequired,
  __url: PropTypes.string,
  phenomicLoading: PropTypes.bool,
}

export default Post
