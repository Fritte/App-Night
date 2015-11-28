import React, { Component, PropTypes } from 'react';

export default class Entities extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }; 
  }

  render() {
    const entities = this.props.entities;
    return (
      <div>
        Entities in here!
      </div>);
  }
}
