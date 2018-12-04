This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
### `npm install`
### `npm start`

This project allows changing a component's layout or how child components are displayed based on a standard layout configuration and interface.

It has two different layout components to choose from React Grid Layout or Material UI's Grid. React Grid Layout allows resizing and dragging of layout child components. Material UI's Grid is much like a React flex container implementation.

#### https://material-ui.com/layout/grid/
#### https://github.com/STRML/react-grid-layout

LayoutManager example:

`
render() {
    
    const layouts = {  
      lg: [
          { x: 0, y: 0, w: 2, h: '80', i: '0', static: true },
          { x: 2, y: 0, w: 10, h: '10', i: '1', static: false },
          { x: 2, y: '10', w: 10, h: '70', i: '2', static: false }
      ]
    };

    return (
      <div className="App" style={{height: '100vh'}}>
        <LayoutManager layouts={layouts} layoutName='GridLayoutManager' margin={[0,0]} rowHeight={1}>
          <div key="0" style={style.gridItem}><Side/></div>
          <Top key="1" style={style.gridItem}>Top</Top>
          <div key="2" style={style.gridItem}>Middle</div>
        </LayoutManager>
      </div>
    );
 }`
 
### Layout Interface

#### children props: 
components with key matching item id in layouts object. Note that these can be of any component type.

#### layouts Object:
Object with all defined breakpoints and layoutItem Object configurations.
{ breakpointSize: [...items] }

#### layoutItem Object:

{i: 'item id', w: item width or cols (int),...(other react grid layout or material ui specific item props}}

#### layoutName String:
('GridLayoutManger' for React Grid Layout or 'ColumnLayoutManager' for Material UI Grid)

#### onBreakpointChange(String Breakpoint):
Callback made when a layout breakpoint has changed

#### onLayoutChange(Object currentLayout, Object layouts):
Callback made when a layout has changed. Implemented in GridLayoutManager (React Grid Layout) when a layout item is dragged or resized.
