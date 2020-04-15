import React, { Component } from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import login from '../pages/login/login'
import logins from '../pages/login/logins'
import index from '../pages/index/index'

export default class router extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={login}/>
                        <Route path="/logins" component={logins}/>
                        <Route path="/index" component={index}/>
                        <Route path="/" component={login}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}
