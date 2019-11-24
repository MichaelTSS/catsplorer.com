import React from 'react';
import './App.css';

class Loader extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onLoadingToggle()
  }
  render() {
    if (this.props.isLoading) {
      return <h4 className="App-Loader" onClick={this.handleClick}>Loading...</h4>
    } else return null
  }
}

class CardImage extends React.Component {
  render() {
    return (
      <div className="Card-image"
        style={{ backgroundImage: `url(${this.props.url})` }}>
        {/* <img src={this.props.url} alt={this.props.id} /> */}
      </div>
    )
  }
}

class Card extends React.Component {
  render() {
    if (this.props.breeds.length) {
      const url = this.props.breeds[0].wikipedia_url
      const name = this.props.breeds[0].name
      //
      return (
        <div className="Card">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <CardImage id={this.props.id} url={this.props.url} />
            <p>{name}</p>
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
    //
    if (this.props.isLoading) {
      return null
    }
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
    this.handleLoadingToggle = this.handleLoadingToggle.bind(this)
    this.state = { isLoading: true, cats: [] }
  }

  componentDidMount() {
    const cats = [
      {
        "breed_ids": null,
        "breeds": [],
        "created_at": "2018-12-12T07:20:42.000Z",
        "height": 1620,
        "id": "sh8QhVGeE",
        "original_filename": "e3dcb4d.jpg",
        "sub_id": "demo-c33d19",
        "url": "https://cdn2.thecatapi.com/images/sh8QhVGeE.jpg",
        "width": 1080
      }, {
        "breeds": [],
        "height": 334,
        "id": "bv6",
        "url": "https://cdn2.thecatapi.com/images/bv6.jpg",
        "width": 500
      }, {
        "breeds": [
          {
            "adaptability": 5,
            "affection_level": 5,
            "alt_names": "Sacred Birman, Sacred Cat Of Burma",
            "cfa_url": "http://cfa.org/Breeds/BreedsAB/Birman.aspx",
            "child_friendly": 4,
            "country_code": "FR",
            "country_codes": "FR",
            "description": "The Birman is a docile, quiet cat who loves people and will follow them from room to room. Expect the Birman to want to be involved in what you’re doing. He communicates in a soft voice, mainly to remind you that perhaps it’s time for dinner or maybe for a nice cuddle on the sofa. He enjoys being held and will relax in your arms like a furry baby.",
            "dog_friendly": 5,
            "energy_level": 3,
            "experimental": 0,
            "grooming": 2,
            "hairless": 0,
            "health_issues": 1,
            "hypoallergenic": 0,
            "id": "birm",
            "indoor": 0,
            "intelligence": 3,
            "lap": 1,
            "life_span": "14 - 15",
            "name": "Birman",
            "natural": 0,
            "origin": "France",
            "rare": 0,
            "rex": 0,
            "shedding_level": 3,
            "short_legs": 0,
            "social_needs": 4,
            "stranger_friendly": 3,
            "suppressed_tail": 0,
            "temperament": "Affectionate, Active, Gentle, Social",
            "vcahospitals_url": "https://vcahospitals.com/know-your-pet/cat-breeds/birman",
            "vetstreet_url": "http://www.vetstreet.com/cats/birman",
            "vocalisation": 1,
            "weight": {
              "imperial": "6 - 15",
              "metric": "3 - 7"
            },
            "wikipedia_url": "https://en.wikipedia.org/wiki/Birman"
          }
        ],
        "height": 1536,
        "id": "3rK7HGo7r",
        "url": "https://cdn2.thecatapi.com/images/3rK7HGo7r.jpg",
        "width": 1024
      }
    ]
    setTimeout(() => {
      this.setState({
        isLoading: false,
        cats: cats.slice()
      })
    }, 1000)
  }

  handleLoadingToggle() {
    this.setState({
      isLoading: false
    })
  }

  render() {
    const subdomain = document.location.hostname.split('.')[0]
    return (
      <div className="App">
        <header className="App-header">
          <p> Salut, {subdomain}. Regarde tous ces chats !</p>
        </header>
        <main className="App-main">
          <Loader isLoading={this.state.isLoading} onLoadingToggle={this.handleLoadingToggle} />
          <CatsList isLoading={this.state.isLoading} cats={this.state.cats} />
        </main>
      </div>
    )
  }
}

export default App;
