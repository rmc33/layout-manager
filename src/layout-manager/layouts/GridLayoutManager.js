import React, { Component } from 'react';
//import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import { generatePercentageLayouts } from '../utils';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class GridLayoutManager extends Component {

    static defaultProps = {
        className: "layout",
        rowHeight: 1,
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        measureBeforeMount: false,
        useCSSTransforms: true,
        compactType: 'vertical',
        preventCollision: true,
        margin: [0, 0],
        breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    };
    
    renderGridItems = () => {
        const { children, width, height } = this.props;
        return children.map(child => {
            return <div key={child.key}>
                {React.cloneElement(child, { width, height })}
            </div>;
        });
    }

    render() {
        const {
            height,
            width,
            layouts,
            rowHeight,
            cols,
            margin
        } = this.props;
        
        const gridLayouts = generatePercentageLayouts(layouts, height, width,
            rowHeight, cols, margin);

        return (<ResponsiveReactGridLayout
            {...this.props}
            onBreakpointChange={this.onBreakpointChange}
            layouts={gridLayouts.layouts}
            rowHeight={rowHeight}
            width={width}
            margin={margin}
        >
            {this.renderGridItems()}
        </ResponsiveReactGridLayout>);
    }
}

export default GridLayoutManager;