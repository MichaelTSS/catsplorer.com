// react
import React from 'react'
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route
} from 'react-router-dom'

// home-brewed
import BrowseCats from './BrowseCats.js'
import About from './About.js'

// styles
import './App.scss'

function App () {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <nav>
            <NavLink exact={true} to="/" activeClassName="active">Explore</NavLink>
            <NavLink exact={true} to="/about" activeClassName="active">About</NavLink>
          </nav>
        </header>
        <main className="App-main">
          <Switch>
            <Route path="/about">
              <About className="About-page" />
            </Route>
            <Route path="/">
              <BrowseCats className="Explore-page" />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  )
}

export default App
