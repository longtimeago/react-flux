require("../css/user-details.css");
import React from 'react';
import {render} from 'react-dom';

import UserDetail from './user-details'

let detailsRecords = [{
    id:1,
    name:"John Doe",
    about:"Nice guy",
    hobby:"Likes drinking wine",
    skills:["html", "javascript", "redux"]
},{
    id:2,
    name:"Mary Moe",
    about:"Cute girl",
    hobby:"Likes playing xbox whole days long",
    skills:["Fortran", "Lua", "R#"]
}];

let UserDetails = class UserDetails extends React.Component {
    constructor(){
        super();
        this.state = {
            details:[]
        }
    }
    componentDidMount(){
        let {id} = this.props.params;
        console.log(id);
        if(id){
            this.setState({
                details:detailsRecords.filter((record)=>{
                    return record.id != id;
                })
            })
        } else {
            this.setState(
                this.setState({
                    details:detailsRecords
                })
            )
        }
    }
    render(){
        return (
            <div>
                {this.props.params.id && <h1>THIS IS PARAM FROM GRIDCOMPONENT: {this.props.params.id}</h1>}
                {this.state.details.map((detail, i)=>{
                    return <UserDetail key={i} detail={detail}/>
                })}
            </div>
        )
    }
};


export default UserDetails;