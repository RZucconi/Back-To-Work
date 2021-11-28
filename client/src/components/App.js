import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { onCreateUser } from '../actions'
import AppHeader from './AppHeader'
import SubscribeUser from './user/SubcribeUser'
import Welcome from './Welcome'
import history from '../history'

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

export default connect(mapStateToProps, { onCreateUser })(class App extends Component {
  onCreateUser = async (formValues) => {
    await this.props.onCreateUser(formValues)
  }

  render() {
    return (
      <Container>
        <Router history={history}>
          <AppHeader isSignIn={this.props.isSignIn}/>
          <Switch>
            <Route path="/" exact>
              <Welcome firstName={this.props.user.firstName} lastName={this.props.user.lastName} isSignIn={this.props.isSignIn} />         
            </Route>
            <Route path="/subscribe" exact>
              <SubscribeUser onCreateUser={this.onCreateUser} />
            </Route>
          </Switch>
        </Router>
      </Container>
    )
  }
})