import React from 'react';
import ReactCountryFlag from 'react-country-flag';


class CardImage extends React.Component {
  render() {
    return (
      <div className="Card-image"
        style={{ backgroundImage: `url(${this.props.url})` }}>
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
            <CardCaption name={name} code={code} />
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

export default CatsList;
