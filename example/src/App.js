import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css'
import Demo from './components/Demo'
import AppBar from 'material-ui/AppBar'

const App = () => (
  <MuiThemeProvider className="baz">
    <div>
      <AppBar
        title="React Emoji"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <Demo />
    </div>
  </MuiThemeProvider>
)

export default App
