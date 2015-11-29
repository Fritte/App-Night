import React, { Component, PropTypes } from 'react';

import './Entities.scss';

export default class Entities extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }; 
  }

  render() {
    var entities = [];
    if (this.props.entities && this.props.entities.entities) entities = this.props.entities.entities;

    return (
      <div className="entitiesComp">
        { entities.map( v => 
            <button className="btn entity" title={v.text}>
              <span>{v.text}</span>
            </button>)
        }
      </div>);
  }
}
