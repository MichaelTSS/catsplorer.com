// react
import React from 'react'
import {
  BrowserRouter as Router,
  Link,
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
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="App-main">
          <Switch>
            <Route path="/about">
              <About className="About-page" />
            </Route>
            <Route path="/">
              <BrowseCats className="Home-page" />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  )
}

export default App
