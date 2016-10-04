require("../../css/user-details.css");
import React from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux'

import UserDetail from './user-detail'
import {filterDetails} from '../actions'

class UserDetails extends React.Component {

    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(filterDetails(this.props.params.id));
    }
    componentDidUpdate(prevProps){
        let {dispatch} = this.props;
        if(prevProps.params.id!==this.props.params.id){
            dispatch(filterDetails(this.props.params.id));
        }
    }

    render(){
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

function mapStateToProps(state) {
    return {
        details: state.details
    }
}

export default connect(
    mapStateToProps
)(UserDetails)
