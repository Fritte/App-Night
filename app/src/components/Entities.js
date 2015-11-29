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
    if (this.props.entities && this.props.entities.entities) entities = this.props.entities.entities.slice(0);

    entities.sort(function(a,b) {
      var asent = a.sentiment.mixed !== '1' ? a.sentiment.type : 'mixed', bsent = b.sentiment.mixed !== '1' ? b.sentiment.type : 'mixed';
      //var arelev = a.relevance, brelev = b.relevance;
      if (asent == 'positive')  asent = 3;
      else if (asent == 'negative') asent = 2;
      else if (asent == 'mixed')  asent = 1;
      else  asent = 0;

      if (bsent == 'positive')  bsent = 3;
      else if (bsent == 'negative') bsent = 2;
      else if (bsent == 'mixed')  bsent = 1;
      else  bsent = 0;

      return asent < bsent ? 1 : -1;
    });

    return (
      <div className="entitiesComp">
        <h5>Most frequent Entities</h5>
        <div className="entitiesWrapper">
          { entities.map( v => {
              var cName = ClassNames({
                'chip entity': true,
                'selected': v == this.state.selected,
                'mixed': v.sentiment.mixed === '1',
                'positive': v.sentiment.type === 'positive' && v.sentiment.mixed !== '1',
                'neutral': v.sentiment.type === 'neutral' && v.sentiment.mixed !== '1',
                'negative': v.sentiment.type === 'negative' && v.sentiment.mixed !== '1'
              });
              var sObj = {};
              return ( 
                <div className={cName} style={sObj} 
                  title={v.text} key={v.pseudoHash} onClick={this.handleSelect.bind(this, v)}
                >
                  <span>{v.text}</span>
                </div>
              );
            })
          }
        </div>
      </div>);
  }
}
