import React, { Component } from 'react';
//import _ from "lodash";
import { Responsive } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { withSize } from './SizeProvider';

const computeItemHeight = (itemHeight, totalHeight, accumulatedHeight, rowHeight, margin) => {
    if (itemHeight.indexOf('%') !== -1) {
        const h = (parseFloat(itemHeight) / 100.0) * totalHeight;
        return Math.round(h / (rowHeight + margin));
    }
    if (itemHeight === 'rest') {
        return Math.round(totalHeight - accumulatedHeight / (rowHeight + margin));
    }
    return itemHeight;
}

const computeItemWidth = (itemWidth, totalWidth, accumulatedWidth, numberCols, margin) => {
    if (itemWidth.indexOf('%') !== -1) {
        const w = (parseFloat(itemWidth) / 100.0) * totalWidth;
        return Math.round(w - margin * 2 / numberCols);
    }
    if (itemWidth === 'rest') {
        return Math.round(totalWidth - accumulatedWidth - margin * 2 / numberCols);
    }
}

class LayoutManager extends Component {

    static defaultProps = {
        className: "layout",
        rowHeight: 1,
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        onLayoutChange: function() {},
        onBreakpointChange: function() {},
        measureBeforeMount: true,
        useCSSTransforms: true,
        compactType: 'vertical',
        preventCollision: true,
        margin: [0, 0],
        breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
      };

    constructor(props) {
        super(props);
        this.state = {
            height: props.height,
            width: props.width
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            height: props.height,
            width: props.width
        }
    }

    generateLayouts(layouts, height, width, rowHeight, cols, margin) {
        const generatedLayout = {};
        let accumulatedHeight, accumulatedWidth = 0;
        Object.keys(layouts).forEach(layoutKey => {
            generatedLayout[layoutKey] = layouts[layoutKey].map(layout => {
                const item = { ...layout };
                if (typeof item.h === 'string') {
                    item.h = computeItemHeight(item.h, height, accumulatedHeight, rowHeight, margin[1]);
                }
                if (typeof item.y === 'string') {
                    item.y = computeItemHeight(item.y, height, accumulatedHeight, rowHeight, margin[1]);
                }
                if (typeof item.w === 'string') {
                    item.w = computeItemWidth(item.w, width, accumulatedWidth, cols[layoutKey], margin[0]);
                }
                if (typeof item.x === 'string') {
                   item.x = computeItemWidth(item.x, width, accumulatedWidth, cols[layoutKey], margin[0]);
                }   
                accumulatedHeight += item.y;
                accumulatedWidth += item.w;
                return item;
            });
        });
        return generatedLayout;
    }

    render() {
        const { height, width } = this.state;
        const { layouts, rowHeight, compactType, preventCollision, measureBeforeMount, useCSSTransforms, children,
            cols, className, margin, breakpoints
        } = this.props;
        return (<Responsive className={className} 
                    layouts={this.generateLayouts(layouts, height, width, rowHeight, cols, margin)}
                    breakpoints={breakpoints}
                    compactType={compactType}
                    preventCollision={preventCollision}
                    measureBeforeMount={measureBeforeMount}
                    useCSSTransforms={useCSSTransforms}
                    rowHeight={rowHeight}
                    width={width}
                    margin={margin}
                >
                    {children}
                </Responsive>);
    }
}

export default withSize(LayoutManager, { height: '100%', width: '100%' });