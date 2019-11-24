import React from 'react';
import { throttle } from 'throttle-debounce';
import ReactCountryFlag from 'react-country-flag';
import './App.css';

class Loader extends React.Component {
  render() {
    if (!this.props.isLoading) return null
    //
    return <h4 className="App-Loader">Loading...</h4>
  }
}

class CardImage extends React.Component {
  render() {
    return (
      <div className="Card-image"
        style={{ backgroundImage: `url(${this.props.url})` }}>
      </div>
    )
  }
}

class Card extends React.Component {
  render() {
    if (this.props.breeds.length) {
      const url = this.props.breeds[0].wikipedia_url
      const name = this.props.breeds[0].name
      const code = this.props.breeds[0].country_code.toLowerCase()
      //
      return (
        <div className="Card">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <CardImage id={this.props.id} url={this.props.url} />
            <p>{name}</p>
            <ReactCountryFlag
              styleProps={{
                width: '20px',
                height: '20px',
                position: 'absolute',
                margin: '-28px 0 0 0',
                left: '16vmin'
              }}
              code={code}
              svg
            />
          </a>
        </div>
      )
    }
    return (
      <div className="Card">
        <CardImage id={this.props.id} url={this.props.url} />
      </div>
    )
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

class CatsList extends React.Component {
  render() {
    const catCards = this.props.cats.map((cat) =>
      <Card key={cat.id} id={cat.id} breeds={cat.breeds} url={cat.url} />
    )
    return (
      <div className="Cards-list">
        {catCards}
      </div>
    )
  }
}

class App extends React.Component {
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
    const url = `${process.env.REACT_APP_API_HOST}/v1/images/search?size=small&format=json&limit=21&page=${this.state.page}`
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
    const maxHeight = Math.max(window.innerHeight * 1.5, window.innerHeight + 500)
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
    const subdomain = document.location.hostname.split('.')[0]
    return (
      <div className="App">
        <header className="App-header">
          <p> Salut, {subdomain}.</p>
        </header>
        <main className="App-main">
          <CatsList isLoading={this.state.isLoading} cats={this.state.cats} />
          <Loader isLoading={this.state.isLoading} />
          <LoadMore isLoading={this.state.isLoading} isDone={this.state.isDone} onLoadMore={this.handleLoadMore} />
        </main>
      </div>
    )
  }
}

export default App;
