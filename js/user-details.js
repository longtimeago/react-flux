require("../css/user-details.css");
import React from 'react';
import {render} from 'react-dom';

import UserDetail from './user-detail'

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

class UserDetails extends React.Component {
    constructor(){
        super();
        this.state = {
            details:[]
        }
    }
    componentDidMount(){
        const par = this.props.params;
        if (par) {
            let {id} = par;
            console.log("id = " + id);
            if(id){
                this.setState({
                    details:detailsRecords.filter((record)=>{
                        return record.id != id;
                    })
                })
            } else {
                this.setState({
                    details:detailsRecords
                })
            }
        } else {
            this.setState({
                details:detailsRecords
            })
        }
    }
    render(){
        return (
            <div>
                {this.state.details.map((detail, i)=>{
                    return <UserDetail key={i} detail={detail}/>
                })}
            </div>
        )
    }
};


export default UserDetails;