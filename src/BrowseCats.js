// react
import React from 'react'

// libs
import { throttle } from 'throttle-debounce'
import Spinner from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

// home-brewed
import CatsList from './CatList.js'

class Loader extends React.Component {
  render() {
    if (!this.props.isLoading) return null
    //
    return <Spinner
      type="TailSpin"
      color="#eaeaea"
      height={40}
      width={100}

    />
  }
}

class LoadMore extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onLoadMore()
  }
  render() {
    if (this.props.isLoading || this.props.isDone) {
      return null
    }
    return <h4 className="App-LoadMore" onClick={this.handleClick}>Load more</h4>
  }
}

export class BrowseCats extends React.Component {
  constructor(props) {
    super(props)
    this.handleLoadMore = this.handleLoadMore.bind(this)
    this.state = { isLoading: true, cats: [], page: 0 }
    this.throttled = throttle(500, this.handleScroll.bind(this))
  }

  componentDidMount() {
    this.fetch()
    window.addEventListener('scroll', this.throttled)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttled)
  }

  fetch() {
    const url = `${process.env.REACT_APP_API_HOST}/v1/images/search?size=small&format=json&limit=20&page=${this.state.page}`
    return fetch(url, {
        headers: { 'x-api-key': process.env.REACT_APP_API_KEY }
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          cats: this.state.cats.concat(data.slice())
        })
        if (!data.length) {
          this.setState({
            isDone: true
          })
        }
      })
  }

  handleScroll() {
    const THRESHOLD = 1000
    //
    const maxHeight = Math.max(window.innerHeight * 1.5, window.innerHeight + THRESHOLD)
    const isThresholdReached = maxHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight
    if (this.state.isLoading || this.state.isDone || !isThresholdReached) return
    //
    this.handleLoadMore()
  }

  paneDidMount = (node) => {
    if (node) {
      node.addEventListener('scroll', () => console.log('scroll!'));
    }
  }

  handleLoadMore() {
    this.setState({
      isLoading: true,
      page: this.state.page + 1
    })
    this.fetch()
      .then(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div className={this.props.className}>
        <CatsList isLoading={this.state.isLoading} cats={this.state.cats} />
        <Loader isLoading={this.state.isLoading} />
        <LoadMore isLoading={this.state.isLoading} isDone={this.state.isDone} onLoadMore={this.handleLoadMore} />
      </div>
    )
  }
}

export default BrowseCats;
