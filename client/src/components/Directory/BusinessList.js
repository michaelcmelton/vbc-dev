import React, { Component } from 'react'

class BusinessList extends Component {

    state = {showChild:false};

    handleCollapse() {
        this.setState({showChild:!this.state.showChild});
        return false;
    }
    render() {
        let children;
        if(this.state.showChild && this.props.children) {
            children = this.props.children.map(function (childnode) {
                return <BusinessList node={childnode} children={childnode.people} />
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

export default BusinessList
