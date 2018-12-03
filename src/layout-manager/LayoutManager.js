import React, { Component } from 'react';
import GridLayoutManager from './layouts/GridLayoutManager';
import ColumnLayoutManager from './layouts/ColumnLayoutManager';
import { withSize } from './SizeProvider';

const layoutManagerComponents = {
    GridLayoutManager,
    ColumnLayoutManager
};

class LayoutManager extends Component {

    static defaultProps = {
        onLayoutChange: function (layout, layouts) {
            console.log('on layouts changed', layouts);
        },
        onBreakpointChange: function (breakpoint) {
            console.log('breakpoint changed', breakpoint)
        },
        layoutName: 'ColumnLayoutManager',
        layouts: {},
        autoResize: true
    };

    render() {
        const { autoResize, children, layoutName } = this.props;
        const LayoutManagerComponent = layoutManagerComponents[layoutName];
        const SizedLayout = withSize(LayoutManagerComponent,
            { height: '100%', width: '100%' }, autoResize);

        return (<SizedLayout
            {...this.props}>
            {children}
        </SizedLayout>);
    }
}

export default LayoutManager;