// react
import React from 'react'
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

// home-brewed
import Explore from './Explore.js'
import About from './About.js'

// styles
import './App.scss'

function App () {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <nav>
            <NavLink exact to="/" activeClassName="active">Explore</NavLink>
            <NavLink exact to="/about" activeClassName="active">About</NavLink>
          </nav>
        </header>
        <main className="App-main">
          <Switch>
            <Route exact path="/about">
              <About className="About-page" />
            </Route>
            <Route exact path="/">
              <Explore className="Explore-page" />
            </Route>
            <Route>
              {/* redirect to root if no match */}
              <Redirect to="/" />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  )
}

export default App
