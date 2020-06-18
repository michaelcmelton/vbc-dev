import React, { Component } from 'react'
import BusinessList from './BusinessList';

class IndustryList extends Component {

    state = {showChild:false};

    handleCollapse(e) {
        e.stopPropagation();
        console.log(e.target);
        this.setState({showChild:!this.state.showChild});
    }
    render() {
        let children;
        if(this.state.showChild && this.props.children) {
            children = this.props.children.map(function (childnode) {
                return <BusinessList node={childnode} children={childnode.people} />
            })
        }

        return (
            <li key={this.props.node.name.toString()} onMouseUp={this.handleCollapse.bind(this)}>
            <span>{this.props.node.name}</span>
            {children ? <ul>{children}</ul> : null}
            </li>
        )
    }
}

export default IndustryList
