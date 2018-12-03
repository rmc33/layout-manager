import React, { Component } from 'react';

export function withSize(WrappedComponent, style, autoResize) {

    return class extends Component {
        
        constructor(props) {
            super(props);
            this.state = {};
            this.setSize = this.setSize.bind(this);
            this.componentRef = React.createRef();
        }

        componentDidMount() {
            if (autoResize)
                window.addEventListener('resize', this.setSize);
            this.setSize();
        }

        setSize() {
            const el = this.componentRef.current;
            const windowWidth = isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
            const windowHeight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
            el && this.setState({
                width: el.clientWidth, 
                height: el.clientHeight,
                offsetTop: el.offsetTop,
                offsetLeft: el.offsetLeft,
                windowWidth,
                windowHeight
            });
        }

        componentWillUnmount() {
            if (autoResize)
                window.removeEventListener('resize', this.setSize);
        }

        render() {
            const { width, height } = this.state;
            return(<div ref={this.componentRef} style={style}>
                {width !== undefined && height !== undefined &&
                    <WrappedComponent width={width} height={height} {...this.props}/>
                }
            </div>);
        }
    }
}