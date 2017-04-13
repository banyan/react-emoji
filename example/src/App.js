import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ReactEmoji from 'react-emoji'
import './App.css'
import {Motion, spring, TransitionMotion} from 'react-motion'
import Demo from './Demo'
import Drawer from './Drawer'
import GlidList from './GlidList'
import AppBar from 'material-ui/AppBar';

const App = () => (
  <MuiThemeProvider className="baz">
    <div>
      <AppBar
        title="React Emoji"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <GlidList />
    </div>
  </MuiThemeProvider>
)

export default App
