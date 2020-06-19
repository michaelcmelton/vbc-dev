import React, { Component } from 'react'

class List extends Component {

    state = {showChild:false};

    handleCollapse(e) {
        e.stopPropagation();
        this.setState({showChild:!this.state.showChild});
    }

    showBusiness(e) {
        e.stopPropagation();
        if(this.props.show) {
            this.props.close();
        } else {
            this.props.open();
            this.props.callback(this.props.node);
        }
    }
    render() {
        let children;
        if(this.state.showChild && this.props.children) {
            children = this.props.children.map(function (childnode) {
                return <List callback={this.props.callback.bind(this)} show={this.props.show} close={this.props.close} open={this.props.open} node={childnode} children={childnode.people} />
            }, this)
        }

        return (
            <li key={this.props.node.name.toString()} onClick={this.props.children !== undefined ? this.handleCollapse.bind(this) : this.showBusiness.bind(this)}>
            <span>{this.props.node.name}</span>
            {children ? <ul>{children}</ul> : null}
            </li>
        )
    }
}

export default List
