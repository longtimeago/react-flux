import React from 'react';
import {render} from 'react-dom';

class GridRecord extends React.Component {
    render(){
        let {record} = this.props;
        return <tr>
            <th>{record.firstName}</th>
            <th>{record.lastName}</th>
            <th><input type="checkbox" checked={record.active} onChange={this.props.toggleActive}/></th>
        </tr>
    }
}

export default GridRecord;