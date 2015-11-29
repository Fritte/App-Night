import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';
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
        <div className="entitiesWrapper">
          { entities.map( v => {
              var cName = ClassNames({
                'btn entity': true,
                'selected': v == this.state.selected,
                'positive': v.sentiment.type === 'positive',
                'neutral': v.sentiment.type === 'neutral',
                'negative': v.sentiment.type === 'negative'
              });
              var sObj = {};
              return ( 
                <button className={cName} style={sObj} 
                  title={v.text} key={v.text} onClick={this.handleSelect.bind(this, v)}
                >
                  <span>{v.text}</span>
                </button>
              );
            })
          }
        </div>
      </div>);
  }
}
