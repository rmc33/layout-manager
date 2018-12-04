import React, { Component } from 'react';
import './App.css';
import LayoutManager from './layout-manager/LayoutManager';

const style = {
  gridItem: {
    backgroundColor: 'gray',
    height: '100%'
  }
}

const Side = (props) => {
  return <div>Side</div>
}

const Top = (props) => {
  return <div style={props.style}>Top</div>
}

class App extends Component {

  render() {

    const componentConfig = {
      layoutName: 'GridLayoutManager',
      margin: [1, 1],
      rowHeight: 1,
      layouts: {
        lg: [
          { x: 0, y: 0, w: 2, h: '100%', i: 'side', static: true },
          { x: 2, y: 0, w: 10, h: '20%', i: 'top', static: false },
          { x: 2, y: '20%', w: 10, h: '80%', i: 'middle', static: false}
        ],
        md: [
          { x: 0, y: 0, w: 5, h: '25%', i: 'side', static: true },
          { x: 5, y: 0, w: 5, h: '25%', i: 'top', static: true },
          { x: 0, y: 0, w: 10, h: '70%', i: 'middle', static: false }
        ]
      },
      cols: { lg: 12, md: 10 },
      breakpoints: { lg: 1200, md: 0 },
      preventCollision: false
    };

    return (
      <div className='App' style={{ height: '100vh'}}>
        <LayoutManager
          {...componentConfig}
          onLayoutChange={(layout, layouts) => {
            console.log('on layouts changed', layouts);
          }}
          onBreakpointChange={(breakpoint) => {
            console.log('breakpoint changed', breakpoint)
          }}
        >
          <div key='side' style={style.gridItem}><Side /></div>
          <Top key='top' style={style.gridItem}>Top</Top>
          <div key='middle' style={style.gridItem}>Middle</div>
        </LayoutManager>
      </div>
    );
  }

}

export default App;
