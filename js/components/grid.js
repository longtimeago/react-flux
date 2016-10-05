import { connect } from 'react-redux'
import React from 'react';
import {render} from 'react-dom';

import GridRecord from '../components/record';
import {filterGrid, toggleActive, loadDataInGrid} from '../actions'

class GridComponent extends React.Component {
    componentDidMount(){
        this.refs.filterInput && this.refs.filterInput.focus();
        this.loadData();
    }

    loadData(){
        let {dispatch} = this.props;
        dispatch(loadDataInGrid());
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
        let recordsToShow = this.props.records.filter((record)=>{
            return this.props.filtered.indexOf(record.id)==-1;
        });

        if(this.props.loading){
            return (
                <div style={{width:300, height: 300, padding: 20}}>Loading...</div>
            )
        }

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
                    {recordsToShow.map((record, index)=> {
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
    records: React.PropTypes.array.isRequired,
    filtered: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        records: state.grid.records,
        filtered: state.grid.filtered,
        loading: state.grid.loading
    }
}

export default connect(
    mapStateToProps
)(GridComponent)
