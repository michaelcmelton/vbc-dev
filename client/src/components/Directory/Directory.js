import React, { Component } from 'react';
import List from './List';

import './Directory.css'
class Directory extends Component {

  state = {
    directoryData: [],
    directoryFormat: []
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
            obj.people = data.data.filter(i => i.state === st && i.industry === industry).map(i => {return {name: i.businessName}});
            object.people.push(obj);
          }
          this.setState({directoryData: [...this.state.directoryData, JSON.parse(JSON.stringify(object))]});
        })
      })
  }

  render() {

    let nodes = this.state.directoryData.map(function(person) {                   
      return (
        <List node={person} children={person.people} />
      );
    });

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
      </div>
    )
  }
}


export default Directory;