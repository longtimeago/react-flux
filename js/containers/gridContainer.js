import React from 'react';
import { connect } from 'react-redux'
import GridComponent from '../components/grid'

let GridContainer = class extends React.Component {
    render(){
        return <GridComponent {...this.props}/>
    }
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
)(GridContainer)


