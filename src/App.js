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
    
    const layouts = {  
      lg: [
          { x: 0, y: 0, w: 2, h: '100%', i: '0', static: true },
          { x: 2, y: 0, w: 10, h: '20%', i: '1', static: false },
          { x: 2, y: '20%', w: 10, h: '80%', i: '2', static: false }
      ]
    };

    return (
      <div className="App" style={{height: '100vh'}}>
        <LayoutManager 
            layouts={layouts} 
            onLayoutChange={function (layout, layouts) {
              console.log('on layouts changed', layouts);
            }}
            onBreakpointChange={function (breakpoint) {
              console.log('breakpoint changed', breakpoint)
            }}
            layoutName={'GridLayoutManager'}
            margin={[0,0]} 
            rowHeight={1}>
          <div key="0" style={style.gridItem}><Side/></div>
          <Top key="1" style={style.gridItem}>Top</Top>
          <div key="2" style={style.gridItem}>Middle</div>
        </LayoutManager>
      </div>
    );
  }

}

export default App;
