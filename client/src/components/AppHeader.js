import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header, Menu } from 'semantic-ui-react'
import Auth from './auth/Auth'
import { signOut } from '../actions'

const mapStateToProps = (state) => {
  return { userToken: state.user.userToken }
}


export default connect(mapStateToProps, { signOut })(class AppHeader extends Component {
  state = { activeItem: 'home', signIn: this.props.isSignIn }
  
  // removeToken = () => this.props.isSignIn === false ? localStorage.removeItem('TOKEN') : '' 
  
  componentDidUpdate(){
    if (this.state.signIn !== this.props.isSignIn){
      this.setState({ signIn: this.props.isSignIn })
      // this.removeToken()
    }
    // this.removeToken()
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogout = () => {
    this.props.signOut()
  }

  render() {
    return (
      <Menu pointing secondary>
        <Menu.Item
          name='home'
          active={this.state.activeItem === 'home'}
          onClick={this.handleItemClick}
          >
          <Link to="/"><Header as='h1'>Back To Work</Header></Link>
        </Menu.Item>
        {this.state.signIn ? (
          <Menu.Item
          name='logout'
          activeItem={this.state.activeItem === 'logout'}
          onClick={this.handleItemClick}
          className="right">
              <Button content='Logout' color='red' onClick={this.handleLogout}/>
            </Menu.Item>
        ):( 
          <Menu.Item
          name='login'
          active={this.state.activeItem === 'login'}
          onClick={this.handleItemClick}
          className="right"
          >
            <Auth />
          </Menu.Item>
        )}
      </Menu>
    )
  }
})