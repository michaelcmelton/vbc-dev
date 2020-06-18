import React, { Component } from 'react'
import IndustryList from './IndustryList';

class List extends Component {

    state = {showChild:false};

    handleCollapse(e) {
        e.stopPropagation();
        this.setState({showChild:!this.state.showChild});
    }
    render() {
        let children;
        if(this.state.showChild && this.props.children) {
            children = this.props.children.map(function (childnode) {
                return <IndustryList node={childnode} children={childnode.people} />
            })
        }

        return (
            <li key={this.props.node.name.toString()} onClick={this.handleCollapse.bind(this)}>
            <span>{this.props.node.name}</span>
            {children ? <ul>{children}</ul> : null}
            </li>
        )
    }
}

export default List
