import React, { Component } from 'react';
import List from './List';

import './Directory.css'
import Backdrop from '../Backdrop/Backdrop';
import BusinessDetail from './BusinessDetail';
class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directoryData: [],
      directoryFormat: [],
      businessDetailData: {}
    };
  }

  passBusinessDetailBack = (childData) => {
    this.setState({businessDetailData: childData}, () => console.log(this.state.businessDetailData));
  }

  componentDidMount() {
    fetch('/api/business')
      .then(res => res.json())
      .then(data => {
        const states = [...new Set(data.data.map(i => { return i.state }))];
        let object = {};
        states.forEach((st, index) => {
          object.name = st;
          object.id = index;
          const industries = data.data.filter(i => i.state === st).map( i => i.industry);
          object.people = [];
          for (let industry of industries) {
            let obj = {};
            obj.name = industry;
            obj.people = data.data.filter(i => i.state === st && i.industry === industry).map(i => {
              i.name = i.businessName; 
              delete i.businessName; 
              return i;
            });
            object.people.push(obj);
          }
          this.setState({directoryData: [...this.state.directoryData, JSON.parse(JSON.stringify(object))]});
        })
      })
  }

  render() {
    let backdrop;
    let businessDetail;
    if(this.props.show) {
      backdrop = <Backdrop drawerClickHandler={this.props.close}/>
      businessDetail = <BusinessDetail close={this.props.close} data={this.state.businessDetailData} />
    }
    console.log(this.props);
    let nodes = this.state.directoryData.map(function(person) {                   
      return (
        <List callback={this.passBusinessDetailBack.bind(this)} show={this.props.show} close={this.props.close} open={this.props.open} node={person} children={person.people} />
      );
    }, this);

    return (
      <div className="Directory">
        <h1>Directory Search</h1>
        <div>
          <h4>What are you looking for today?</h4>

        </div>
        <div className="directory">
          <ul>
            {nodes}
          </ul>
        </div>
        {backdrop}
        {businessDetail}
      </div>
    )
  }
}


export default Directory;