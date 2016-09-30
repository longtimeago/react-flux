import React from 'react';
import {render} from 'react-dom';

class GridRecord extends React.Component {

    handleLastNameChange(e){
        this.props.updateLastName(e.target.value);
    }

    render(){
        let {record} = this.props;
        return <tr>
            <th>{record.firstName}</th>
            <th><input type="text" value={record.lastName} onChange={this.handleLastNameChange.bind(this)}/></th>
            <th><input type="checkbox" checked={record.active} onChange={this.props.toggleActive} /></th>
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
