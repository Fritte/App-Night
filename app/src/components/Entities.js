import React, { Component, PropTypes } from 'react';

import './Entities.scss';

export default class Entities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    }; 
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entities !== this.props.entities) {
      console.log('ENTITIES: reset');
      //this.setState({selected: null});
      this.handleSelect(null);
    }
  }

  handleSelect(entity) {
    console.log(entity);
    this.setState({selected: entity});
    this.props.setEntity(entity);
  }

  render() {
    var entities = [];
    if (this.props.entities && this.props.entities.entities) entities = this.props.entities.entities;

    return (
      <div className="entitiesComp">
        <h5>Most frequent Entities</h5>
        { entities.map( v => 
            <button className={'btn entity' + (v == this.state.selected ? ' selected' : '')} 
              title={v.text} key={v.text} onClick={this.handleSelect.bind(this, v)}
            >
              <span>{v.text}</span>
            </button>)
        }
      </div>);
  }
}
