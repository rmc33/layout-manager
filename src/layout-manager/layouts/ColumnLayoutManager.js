import React, { Component } from 'react';
//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import withWidth from '@material-ui/core/withWidth';
import toRenderProps from 'recompose/toRenderProps';
const WithWidth = toRenderProps(withWidth());
var currentBreakpoint = '';

function ColumnLayoutManager(props) {

    function renderGridItems() {
        const { children, layouts, width, height, breakpoint } = props;
        return children.map(child => {
            //wrap in grid item does not cause child to render twice
            const item = layouts[breakpoint].find(i => i.i === child.key);
            return <Grid item xs={item.w} key={child.key}>
                {React.cloneElement(child, { width, height })}
            </Grid>;
        });
    }

    const { spacing, breakpoint, onBreakpointChange } = props;

    if (breakpoint !== currentBreakpoint && onBreakpointChange) onBreakpointChange(breakpoint);

    return (<Grid container spacing={spacing}>
        {renderGridItems()}
    </Grid>);
}

export default class ColumnLayoutManagerWrapper extends Component {

    static defaultProps = {
        spacing: 0
    };

    render() {
        return (
            <WithWidth>
                {({ width }) => <ColumnLayoutManager
                    onBreakpointChange={this.props.onBreakpointChange}
                    breakpoint={width} {...this.props} />}
            </WithWidth>
        );
    }
}
