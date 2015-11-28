import React, { Component, PropTypes } from 'react';

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
      <div>
        { entities.map( v => <button className="btn">v.text</button>)}
        {/*
          !entities.length ? 'nothing' : 
          entities.reduce( (prev, curr, currIndex) => currIndex % 2 == 0 ? prev.push([curr]) : prev[prev.length-1].push(curr) )
          .map( v => (
              <tr>
                {v.map(vv => (<td>vv.text</td>))}
              </tr>
            ))
        */}
      </div>);
  }
}
