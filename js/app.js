require("bootstrap/dist/css/bootstrap.css");
import React from 'react';
import {render} from 'react-dom';

import GridRecord from './record';
import SummaryActive from './summary'
import UserDetails from './user-details'

import { Router, Route, Link, hashHistory} from 'react-router'

const dataSource = [
    {firstName: "John", lastName: "Doe", active: false, id: 1},
    {firstName: "Mary", lastName: "Moe", active: false, id: 2},
    {firstName: "Peter", lastName: "Noname", active: true, id: 3}
];

class GridComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            records:[]
        }
    }
    componentDidMount(){
        this.refs.filterInput && this.refs.filterInput.focus();
        this.setState({
            records:dataSource
        });

        this.setState({
            records:dataSource
        })
    }

    toggleActive(index){
        let {records} = this.state;
        records[index].active = !records[index].active;
        this.setState({
            records:records
        })
    }

    handleFilterChange(e){
        let value = e.target.value,
            records = dataSource.filter((record) => record.firstName.toUpperCase().includes(value.toUpperCase()));
        this.setState({
            records:records
        });
    }

    updateLastName(index, newValue){
        let {records} = this.state;
        records[index].lastName = newValue;
        this.setState({
            records:records
        })
    }



    render(){
        return (
            <div style={{width:300, height: 300, padding: 20}}>
                <p>
                    <input type="text" ref="filterInput" placeholder="Filter by..." onChange={this.handleFilterChange.bind(this)}/>
                </p>
                <table className="table table-condensed">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Active</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.records.map((record, index)=> {
                            return <GridRecord record={record} key={index}
                                               toggleActive={this.toggleActive.bind(this, index)}
                                               updateLastName={this.updateLastName.bind(this, index)}/>
                        }
                    )}
                    </tbody>
                </table>
                <div>{this.props.children &&
                React.cloneElement(this.props.children, { records: this.state.records })}</div>
            </div>
        )
    }
}

class App extends React.Component {
    render(){
        return (
            <div>
                <h1>Our awesome app</h1>
                <ul role="nav">
                    <li><Link to="/grid">Grid</Link></li>
                    <li><Link to="/details">Details</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="grid" component={GridComponent}/>
            <Route path="details" component={UserDetails}>
                <Route path="/details/:id" component={UserDetails}/>
            </Route>
        </Route>
    </Router>,
    document.getElementById('app')
);
