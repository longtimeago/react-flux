require("bootstrap/dist/css/bootstrap.css");
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from '../store/index'

import GridContainer from '../containers/gridContainer';
import UserDetailsContainer from '../containers/userDetailsContainer';

import { Router, Route, Link, hashHistory} from 'react-router'

const store = configureStore();

class App extends React.Component {
    render(){
        return (
            <div>
                <h1>Our awesome app</h1>
                <ul role="nav">
                    <li><Link to="/grid">Grid</Link></li>
                    <li><Link to="/details">Details</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route path="grid" component={GridContainer}/>
                <Route path="details" component={UserDetailsContainer}>
                    <Route path="/details/:id" component={UserDetailsContainer}/>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
