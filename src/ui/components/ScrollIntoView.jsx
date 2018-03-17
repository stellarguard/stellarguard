import React from 'react';

class ScrollIntoView extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.node.scrollIntoView();
    }, 100);
  }

  render() {
    return <div ref={node => (this.node = node)}>{this.props.children}</div>;
  }
}

export default ScrollIntoView;
