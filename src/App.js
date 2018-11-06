import React, { Component } from 'react';
import './App.css';
import LayoutManager from './layout-manager/LayoutManager';

const style = {
  gridItem: {
    backgroundColor: 'gray'
  }
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
      <div className="App" style={{height: '800px'}}>
        <LayoutManager layouts={layouts} margin={[2,2]} rowHeight={1}>
          <div key="0" style={style.gridItem}>Side</div>
          <div key="1" style={style.gridItem}>Top</div>
          <div key="2" style={style.gridItem}>Middle</div>
        </LayoutManager>
      </div>
    );
  }

}

export default App;
