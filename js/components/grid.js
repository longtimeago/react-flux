import { connect } from 'react-redux'
import React from 'react';
import {render} from 'react-dom';

import GridRecord from '../components/record';
import {filterGrid, toggleActive} from '../actions'

class GridComponent extends React.Component {
    constructor(){
        super();
    }
    componentDidMount(){
        this.refs.filterInput && this.refs.filterInput.focus();
    }

    toggleActive(index){
        let {dispatch} = this.props;
        dispatch(toggleActive(index));
    }
    handleFilterChange(e){
        let {dispatch} = this.props;
        dispatch(filterGrid(e.target.value));
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
                    {this.props.records.map((record, index)=> {
                            return <GridRecord record={record} key={index}
                                               toggleActive={this.toggleActive.bind(this, index)}
                                               updateLastName={this.updateLastName.bind(this, index)}/>
                        }
                    )}
                    </tbody>
                </table>
                <div>{this.props.children &&
                React.cloneElement(this.props.children, { records: this.props.records })}</div>
            </div>
        )
    }
}

GridComponent.propTypes = {
    records: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        records: state.grid
    }
}

export default connect(
    mapStateToProps
)(GridComponent)
