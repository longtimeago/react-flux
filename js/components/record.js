import React from 'react';
import {render} from 'react-dom';

import {hashHistory} from 'react-router'

class GridRecord extends React.Component {

    showUserDetails(e){
        e.preventDefault();
        hashHistory.push(`/details/${this.props.record.id}`);
    }


    handleLastNameChange(e){
        this.props.updateLastName(e.target.value);
    }

    render(){
        let {record} = this.props;
        return <tr>
            <th onClick={this.showUserDetails.bind(this)}><a href="#">{record.id}</a></th>
            <th>{record.firstName}</th>
            <th>{record.lastName}</th>
            <th><input type="checkbox" checked={record.active} onChange={this.props.toggleActive}/></th>
        </tr>
    }
}

export default GridRecord;

GridRecord.defaultProps = {
    record: {firstName: "N/A", lastName: "N/A", active: false}
};

GridRecord.propTypes = {
    record: React.PropTypes.shape({
        firstName: React.PropTypes.string.isRequired,
        lastName: React.PropTypes.string.isRequired,
        active:React.PropTypes.bool.isRequired
    })
};
