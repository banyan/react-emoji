import React from 'react'
import { withHandlers, withState, compose } from 'recompose'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Subheader from 'material-ui/Subheader'
import Toggle from 'material-ui/Toggle'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import {List, ListItem} from 'material-ui/List';

import './App.css'
import Demo from './containers/Demo'

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
  toggle: {
    marginBottom: 16,
  },
};

const App = compose(
  withState('isOpen', 'toggleDrawer', false),
  withState('settings', 'updateSettings', {}),
  withHandlers({
    onSettingsChange: props => ({target: {name, value}}, isInputChecked) => {
      const val = value === 'on' ? isInputChecked : value // Handle difference about onToggle and onChange
      props.updateSettings({
        ...props.settings,
        ...{ [name]: val }
      })
    }
  }),
)(({
  isOpen,
  toggleDrawer,
  settings,
  onSettingsChange,
}) => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title="React Emoji"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={() => toggleDrawer(!isOpen)}
      />

      <Drawer
        docked={false}
        open={isOpen}
        openSecondary
        onRequestChange={(open) => toggleDrawer(open)}
      >
        <AppBar
          title="Settings"
          showMenuIconButton={false}
        />

        <div style={styles.block}>
          <List>
            <Subheader>emojiType</Subheader>
            <RadioButtonGroup name="emojiType" defaultSelected="twemoji" onChange={onSettingsChange} style={{width: '200px', padding: '15px 0 0 30px'}}>
              <RadioButton
                value="twemoji"
                label="twemoji"
                style={styles.radioButton}
              />
              <RadioButton
                value="emojione"
                label="emojione"
                style={styles.radioButton}
              />
            </RadioButtonGroup>
          </List>
        </div>

        <List>
          <Subheader>useEmoticon</Subheader>
          <Toggle
            name="useEmoticon"
            onToggle={onSettingsChange}
            label="Use emoticon"
            defaultToggled={true}
            style={{width: '200px', padding: '15px 0 0 30px'}}
          />
        </List>
      </Drawer>

      <Demo settings={settings} />
    </div>
  </MuiThemeProvider>
))

export default App
