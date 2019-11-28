// react
import React from 'react'

// libs
import { throttle } from 'throttle-debounce'
import Spinner from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

// home-brewed
import CatsList from './CatList.js'
import CategoriesList from './CategoriesList.js'

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

export class Explore extends React.Component {
  constructor(props) {
    super(props)
    this.handleLoadMore = this.handleLoadMore.bind(this)
    this.setStateCategories = this.setStateCategories.bind(this)
    this.throttled = throttle(500, this.handleScroll.bind(this))
    this.state = { isLoading: true, cats: [], page: 0, categories: [], store: {} }
  }

  setStateCategories(data) {
    const categories = [...this.state.categories]
    categories.forEach(x => x.isActive = (x.id === data.id && !data.isActive))
    this.setState({ categories, cats: [], page: 0, isLoading: true })
    this.fetch()
  }

  componentDidMount() {
    this.fetchCategories()
    this.fetch()
    window.addEventListener('scroll', this.throttled)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttled)
  }

  getUrl(categoryId='', page=this.state.page) {
    return `${process.env.REACT_APP_API_HOST}/v1/images/search?size=small&format=json&limit=20&page=${page}&category_ids=${categoryId}`
  }

  fetchCategories() {
    const url = `${process.env.REACT_APP_API_HOST}/v1/categories`
    return fetch(url, {
        headers: { 'x-api-key': process.env.REACT_APP_API_KEY }
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ categories: data.slice() })
        return data.map(x => x.id)
      })
      .then(categoryIds => {
        // pre-fetch all categories
        const promises = categoryIds.map(categoryId => {
          const url = this.getUrl(categoryId, 0)
          return fetch(url, {
            headers: { 'x-api-key': process.env.REACT_APP_API_KEY }
          })
          .then(response => response.json())
          .then(data => {
            this.setState(state => {
              state.store[categoryId] = data.slice()
            })
          })
        })
        //
        return Promise.all(promises) // done so fetchCategories can be thenable
      })
  }

  fetch() {
    const category = this.state.categories.find(x => x.isActive)
    const categoryId = (category != null) ? category.id : ''
    const storeKey = categoryId || 'default'
    // 1. pre-fetch
    if (this.state.store[storeKey] != null && // matches null and undefined
        this.state.store[storeKey].length &&
        this.state.page === 0) {
      this.setState({
        isLoading: false,
        cats: this.state.store[storeKey].slice()
      })
      return Promise.resolve()
    }
    // 2. fetch
    const url = this.getUrl(categoryId, this.state.page)
    return fetch(url, {
        headers: { 'x-api-key': process.env.REACT_APP_API_KEY }
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          cats: this.state.cats.concat(data.slice())
        })
        if (storeKey === 'default' && this.state.page === 0) {
          // save the opening request in store
          this.setState(state => {
            state.store[storeKey] = data.slice()
          })
        }
        if (data.length) return Promise.resolve()
        //
        this.setState({ isDone: true })
      })
  }

  handleScroll() {
    const THRESHOLD = 3000
    //
    const maxHeight = Math.max(window.innerHeight * 1.5, window.innerHeight + THRESHOLD)
    const isThresholdReached = maxHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight
    if (this.state.isLoading || this.state.isDone || !isThresholdReached) return
    //
    this.handleLoadMore()
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
        <CategoriesList categories={this.state.categories} setStateCategories={this.setStateCategories} />
        <CatsList isLoading={this.state.isLoading} cats={this.state.cats} />
        <Loader isLoading={this.state.isLoading} />
        <LoadMore isLoading={this.state.isLoading} isDone={this.state.isDone} onLoadMore={this.handleLoadMore} />
      </div>
    )
  }
}

export default Explore
