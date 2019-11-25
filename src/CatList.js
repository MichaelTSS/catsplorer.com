// react
import React from 'react'

// libs
import ReactCountryFlag from 'react-country-flag';
import handleViewport from 'react-in-viewport';


class CardImage extends React.Component {
  constructor(props) {
    super(props)
    this.handleError = this.handleError.bind(this)
  }

  handleError() {
    this.props.onInvalidImage()
  }

  render() {
    return (
      <div className="Card-image"
        style={{ backgroundImage: `url(${this.props.url})` }}>
          <img style={{ visibility: 'hidden', width: '10px' }} onError={this.handleError} src={this.props.url} alt={this.props.id} />
      </div>
    )
  }
}

class CardCaption extends React.Component {
  render() {
    return (
      <div className="Card-caption">
        <p>{this.props.name}</p>
        <ReactCountryFlag className="flag" code={this.props.code} svg />
      </div>
    )
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.handleInvalidImage = this.handleInvalidImage.bind(this)
    this.state = { error: false }
  }

  handleInvalidImage() {
    // this.setState({ error: true })
    console.error('Detected an invalid cat image... Sad cat is sad.')
  }

  getClass() {
    const { inViewport, enterCount } = this.props;
    // Fade in only the first time we enter the viewport
    if (inViewport || enterCount > 0) {
      return 'Card animate'
    }
    return 'Card'
  }

  render() {
    if (this.state.error) return null
    //
    if (this.props.breeds.length) {
      const url = this.props.breeds[0].wikipedia_url
      const name = this.props.breeds[0].name
      const code = this.props.breeds[0].country_code.toLowerCase()
      //
      return (
        <div className={this.getClass()}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <CardImage id={this.props.id} url={this.props.url} onInvalidImage={this.handleInvalidImage} />
            <CardCaption name={name} code={code} />
          </a>
        </div>
      )
    }
    return (
      <div className={this.getClass()}>
        <CardImage id={this.props.id} url={this.props.url} onInvalidImage={this.handleInvalidImage} />
      </div>
    )
  }
}

const ViewportBlock = handleViewport(Card)

class CatsList extends React.Component {
  render() {
    const catCards = this.props.cats.map((cat) =>
      // <Card key={cat.id} id={cat.id} breeds={cat.breeds} url={cat.url} />
      <ViewportBlock
        onEnterViewport={() => console.log('enter', cat.id)}
        onLeaveViewport={() => console.log('leave', cat.id)}
        key={cat.id}
        id={cat.id}
        breeds={cat.breeds}
        url={cat.url}
      />
    )
    return (
      <div className="Cards-list">
        {catCards}
      </div>
    )
  }
}

export default CatsList;
