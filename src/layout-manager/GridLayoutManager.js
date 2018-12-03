import React, { Component } from 'react';
//import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import { generatePercentageLayouts } from './utils';
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

    render() {
        const {
            height,
            width,
            layouts,
            rowHeight,
            children,
            cols,
            margin
        } = this.props;
        
        const gridLayouts = generatePercentageLayouts(layouts, height, width,
            rowHeight, cols, margin);

        return (<ResponsiveReactGridLayout
            {...this.props}
            layouts={gridLayouts.layouts}
            rowHeight={rowHeight}
            width={width}
            margin={margin}
        >
            {children}
        </ResponsiveReactGridLayout>);
    }
}

export default GridLayoutManager;