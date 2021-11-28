import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import history from '../history'
import AppHeader from './AppHeader'
import Auth from './auth/Auth'

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
    console.log('TOKEN_IN_APP:::::', localStorage.getItem('TOKEN'))
    return (
      <Container>
        <Router history={history}>
          <AppHeader isSignIn={this.props.isSignIn}/>
          {this.props.isSignIn ? 
              <div>
                <p>Bienvenue {this.props.user.firstName} {this.props.user.lastName} sur votre application de gestion d' offres d' emploi</p>
              </div>
            :
            <div>non connecter</div>
            }          
          <Switch>
            <Route path="/auth" exact component={Auth} />
          </Switch>
        </Router>
      </Container>
    )
  }
})