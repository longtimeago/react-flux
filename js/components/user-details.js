require("../../css/user-details.css");
import React from 'react';
import {render} from 'react-dom';

import UserDetail from './user-detail'
import {filterDetails, loadDataAndFilterDetails} from '../actions'

export default class UserDetails extends React.Component {

    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(loadDataAndFilterDetails(this.props.params.id));
    }
    componentDidUpdate(prevProps){
        let {dispatch} = this.props;
        if(prevProps.params.id!==this.props.params.id){
            dispatch(loadDataAndFilterDetails(this.props.params.id));
        }
    }

    render(){
        console.log(this.props);
        return (
            <div>
                {this.props.details.map((detail, i)=>{
                    return <UserDetail key={i} detail={detail}/>
                })}
            </div>
        )
    }
}

UserDetails.propTypes = {
    details: React.PropTypes.array.isRequired
};

