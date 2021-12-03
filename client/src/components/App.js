import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import history from '../history'
import AppHeader from './AppHeader'
import SubscribeUser from './user/SubscribeUser'
import EditUser from './user/EditUser'
import Welcome from './Welcome'

const mapStateToProps = (state) => {
  return {
    isSignIn: state.auth.isSignIn,
    user: {
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      userToken: state.user.userToken
    }
  }
}

export default connect(mapStateToProps)(class App extends Component {
  render() {
    const { isSignIn } = this.props
    return (
      <Container>
        <Router history={history}>
          <AppHeader isSignIn={this.props.isSignIn}/>
          <Switch>
            <Route path="/" exact>
              <Welcome />
            </Route>
            <Route path="/subscribe" exact>
              {isSignIn ? <Redirect to="/" /> : <SubscribeUser />}
            </Route>
            <Route path="/editUser" exact>
              {!isSignIn ? <Redirect to="/" /> : <EditUser />}
            </Route>
          </Switch>
        </Router>
      </Container>
    )
  }
})