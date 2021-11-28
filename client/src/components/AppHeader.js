import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Image, Menu } from 'semantic-ui-react'
import Auth from './auth/Auth'
import { signOut, authenticate } from '../actions'
import { BTWLogo192 } from '../images'

const mapStateToProps = (state) => {
  return { userToken: state.user.userToken }
}

export default connect(mapStateToProps, { signOut, authenticate })(class AppHeader extends Component {
  state = { activeItem: 'home', signIn: this.props.isSignIn, currentToken: null, isAuth: false }
  
  componentDidMount() {
    this.setState({ currentToken: localStorage.getItem('TOKEN') })
  }

  componentDidUpdate() {
    if (this.state.isAuth === false && this.state.currentToken !== null) {
      if (localStorage.getItem('TOKEN')) {
        this.props.authenticate()
        this.setState({ isAuth: true })
      } 
    } 

    if (this.state.signIn !== this.props.isSignIn){
      this.setState({ signIn: this.props.isSignIn})
    }
    
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
          <Link to="/">
            <Image src={BTWLogo192} size='tiny' verticalAlign='middle'/>
            <span className='ui header'>{'  '}{'////'}{'  '}Back To Work</span>
          </Link>
        </Menu.Item>
        {this.state.signIn ? (
          <Menu.Item
            name='logout'
            activeItem={this.state.activeItem === 'logout'}
            onClick={this.handleItemClick}
            className="right"
          >
            <Button content='Déconnection' color='red' onClick={this.handleLogout}/>
          </Menu.Item>
        ):( 
          <Menu.Item
          name='login'
          active={this.state.activeItem === 'login'}
          onClick={this.handleItemClick}
          className="right"
          >
            <Link to="/subscribe"><Button primary>Souscrire</Button></Link>
            <Auth />
          </Menu.Item>
        )}
      </Menu>
    )
  }
})