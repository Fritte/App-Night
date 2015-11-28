import React, { Component, PropTypes } from 'react';

export default class GenericComponentWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, ...props} = this.props;
    return React.cloneElement(children, props);
  }
}
