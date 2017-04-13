import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import TextField from 'material-ui/TextField';
import ReactEmoji from 'react-emoji'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  foo: {
    width: '350px',
    margin: '0 auto',
    overflowY: 'auto',
  },
};

const tilesData = [
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'images/grid-list/burger-827309_64099.jpg',
    title: 'faadsfaburger',
    author: 'pashminu',
  },
  {
    img: 'images/grid-list/burger-827309_64099.jpg',
    title: 'faadsfaburger',
    author: 'pashminu',
  },
  {
    img: 'images/grid-list/burger-827309_640999.jpg',
    title: 'faadsfaburger',
    author: 'pashminu',
  },
  {
    img: 'images/grid-list/burger-827309_6409908.jpg',
    title: 'faadsfaburger',
    author: 'pashminu',
  },
];

const GridListExampleSimple = () => (
  <div style={styles.root}>
    <div style={styles.foo}>
      <GridList
        cellHeight={70}
        style={styles.gridList}
        cols={1}
      >
        {tilesData.map((tile, i) => (
          <GridTile
            key={tile.img}
            title={tile.title}
            style={styles.gridTile}
            titleBackground='#11DDCC'
          />
        ))}

      </GridList>

    </div>

    <div>
      <input className="foo" type="text" placeholder="Type here!" />
    </div>
  </div>
)

export default GridListExampleSimple
