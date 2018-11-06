import React, { Component } from 'react';
import _ from "lodash";
import { Responsive } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { withSize } from './SizeProvider';

class LayoutManager extends Component {

    static defaultProps = {
        className: "layout",
        rowHeight: 25,
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
            rowHeight: props.rowHeight,
            className: props.className,
            breakpoints: props.breakpoints,
            height: props.height,
            width: props.width,
            layouts: props.layouts,
            cols: props.cols,
            margin: props.margin
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
        Object.keys(layouts).forEach(layoutKey => {
            generatedLayout[layoutKey] = layouts[layoutKey].map(layout => {
                const item = { ...layout };
                if (typeof item.h === 'string' && item.h.indexOf('%') !== -1) {
                    const h = (parseFloat(item.h) / 100.0) * height;
                    item.h = Math.round(h / (rowHeight + margin[1]));
                }
                if (typeof item.y === 'string' && item.y.indexOf('%') !== -1) {
                    const h = (parseFloat(item.y) / 100.0) * height;
                    item.y = Math.round(h / (rowHeight + margin[1]));
                }
                if (typeof item.w === 'string' && item.w.indexOf('%') !== -1) {
                    const w = (parseFloat(item.w) / 100.0) * width;
                    item.w = Math.round((w - margin[0] * 2) / cols[layoutKey]);
                }
                if (typeof item.x === 'string' && item.x.indexOf('%') !== -1) {
                    const w = (parseFloat(item.x) / 100.0) * width;
                    item.y = Math.round((w - margin[0] * 2) / cols[layoutKey]);
                }
                return item;
            });
        });
        return generatedLayout;
    }

    render() {
        const { layouts, rowHeight, cols, className, width, height, margin, breakpoints } = this.state;
        const { compactType, preventCollision, measureBeforeMount, useCSSTransforms } = this.props;
        return (<Responsive className={className} 
                    layouts={this.generateLayouts(layouts, height, width, rowHeight, cols, margin)}
                    breakpoints={breakpoints}
                    compactType={compactType}
                    preventCollision={preventCollision}
                    measureBeforeMount={measureBeforeMount}
                    useCSSTransforms={useCSSTransforms}
                    rowHeight={rowHeight}
                    width={width}
                    height={height}
                    margin={margin}
                >
                    {this.props.children}
                </Responsive>);
    }
}

export default withSize(LayoutManager, { height: '100%', width: '100%' });