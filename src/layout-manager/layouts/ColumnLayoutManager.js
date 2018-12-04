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
            return <Grid item {...item} xs={item.w} key={child.key}>
                {React.cloneElement(child, { width, height })}
            </Grid>;
        });
    }

    const { breakpoint, layouts, layoutName,
        breakpoints, onBreakpointChange, height, style, ...rest } = props;

    if (breakpoint !== currentBreakpoint && onBreakpointChange)
        onBreakpointChange(breakpoint);
        
    const muGridStyle = style ? style : { height };
    return (<Grid container {...rest} style={muGridStyle}>
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
