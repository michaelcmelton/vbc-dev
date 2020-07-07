import React, { Component } from 'react';
import List from './List';

import './Directory.css'
import Backdrop from '../Backdrop/Backdrop';
import BusinessDetail from './BusinessDetail';
class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usStates: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'U.S. Virgin Islands','Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
      rawData: [],
      directoryData: [],
      originalData: [],
      directoryFormat: [],
      businessDetailData: {},
      industries: [],
      service: '',
      industry: ''
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { service, industry } = this.state;
    let searchData;

    this.setState({ directoryData: [] }, () => {
      if (service === '' && industry === '') {
        this.setState({ directoryData: this.state.originalData });
      } else if (service !== '') {
        searchData = this.state.rawData.filter(i => i.biography !== null).filter(i => i.biography.toUpperCase().includes(service.toUpperCase()) || i.name.toUpperCase().includes(service.toUpperCase()));
        const states = [...new Set(searchData.map(i => { return i.state }))];
        let object = {};
        states.forEach((st, index) => {
          object.name = st;
          object.id = index;
          const industries = searchData.filter(i => i.state === st).map(i => i.industry).sort((a, b) => a < b ? -1 : 1);
          object.people = [];
          for (let industry of industries) {
            let obj = {};
            obj.name = industry;
            obj.people = searchData.filter(i => i.state === st && i.industry === industry).map(i => {
              return i;
            });
            object.people.push(obj);
          }
          this.setState({ directoryData: [...this.state.directoryData, JSON.parse(JSON.stringify(object))] }, () => {
            console.log(this.state.directoryData.length);
            if (this.state.directoryData.length < 10) {
              document.getElementById('maindirectory').style.columns = 'auto 1';
            } else {
              document.getElementById('maindirectory').style.columns = 'auto 2';
            }
          });
        })
      } else if (industry !== '') {
        searchData = this.state.rawData.filter(i => i.industry === industry);
        const states = [...new Set(searchData.map(i => { return i.state }))];
        let object = {};
        states.forEach((st, index) => {
          object.name = st;
          object.id = index;
          const industries = searchData.filter(i => i.state === st).map(i => i.industry).sort((a, b) => a < b ? -1 : 1);
          object.people = [];
          for (let industry of industries) {
            let obj = {};
            obj.name = industry;
            obj.people = searchData.filter(i => i.state === st && i.industry === industry).map(i => {
              return i;
            });
            object.people.push(obj);
          }
          this.setState({ directoryData: [...this.state.directoryData, JSON.parse(JSON.stringify(object))] }, () => {
            console.log(this.state.directoryData.length);
            if (this.state.directoryData.length < 10) {
              document.getElementById('maindirectory').style.columns = 'auto 1';
            } else {
              document.getElementById('maindirectory').style.columns = 'auto 2';
            }
          });
        })
      }
    });
  }

  passBusinessDetailBack = (childData) => {
    this.setState({ businessDetailData: childData }, () => console.log(this.state.businessDetailData));
  }

  componentDidMount() {
    fetch('/api/business')
      .then(res => res.json())
      .then(data => {
        this.setState({ rawData: data.data });
        const states = [...new Set(this.state.usStates)];
        let object = {};
        states.forEach((st, index) => {
          object.name = st;
          object.id = index;
          const industriesAll = data.data.map(i => i.industry);
          this.setState({ industries: industriesAll });
          const industries = data.data.filter(i => i.state === st).map(i => i.industry).sort((a, b) => a < b ? -1 : 1);
          object.people = [];
          if (industries.length > 0) {
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
          } else {
            let obj = {};
            obj.name="Be the first veteran to list!";
            obj.people = [];
            object.people.push(obj);
          }
          this.setState({ directoryData: [...this.state.directoryData, JSON.parse(JSON.stringify(object))] });
          this.setState({ originalData: this.state.directoryData });
        })
      })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let backdrop;
    let businessDetail;
    let optionValues;

    if (this.props.show) {
      backdrop = <Backdrop drawerClickHandler={this.props.close} />
      businessDetail = <BusinessDetail close={this.props.close} data={this.state.businessDetailData} />
    }

    optionValues = this.state.industries.map((option) => {
      return <option key={option} value={option}>{option}</option>
    })

    let nodes = this.state.directoryData.map(function (person) {
      return (
        <List key={person.id + ' - ' + person.name} callback={this.passBusinessDetailBack.bind(this)} show={this.props.show} close={this.props.close} open={this.props.open} node={person} children={person.people} />
      );
    }, this);

    return (
      <div className="directory-main">
        <div className='search-form'>
          <h4>What are you looking for today?</h4>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="service">Service: </label>
              <input onChange={this.onChange} id="service" name="service" type="input" placeholder="Service Needed" />
            </div>
            <h3>or</h3>
            <div className="form-group">
              <label htmlFor="industry">Industry: </label>
              <select onChange={this.onChange} name="industry" id="industry">
                <option value="">Select an industry</option>
                {optionValues}
              </select>
            </div>
            <button>Search</button>
          </form>
        </div>
        <div className="directory">
          <ul id="maindirectory">
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
