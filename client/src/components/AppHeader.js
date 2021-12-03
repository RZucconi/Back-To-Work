import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Dropdown, Icon, Image, Menu } from 'semantic-ui-react'

import Auth from './auth/Auth'
import CustomModal from './CustomModal'
import { logOut, logOutAll, authenticate } from '../actions'
import { BTWLogo192 } from '../images'

const mapStateToProps = (state) => {
  return { 
    userToken: state.user.userToken,
    userName: `${state.user.firstName} ${state.user.lastName}`
  }
}

export default connect(mapStateToProps, { logOut, logOutAll, authenticate })(class AppHeader extends Component {
  state = { signIn: this.props.isSignIn, currentToken: null, isAuth: false, open: false }
  
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
    this.props.logOut()
  }

  handleLogoutAll = () => {
    this.setState({ open: true })
  }

  render() {
    return (
      <Menu pointing secondary>
        <Menu.Item
          name='home'
          onClick={this.handleItemClick}
        >
          <Link to="/">
            <Image src={BTWLogo192} size='tiny' verticalAlign='middle'/>
            <span className='ui header'>{'    '}{'/////'}{'    '}Back To Work</span>
          </Link>
        </Menu.Item>
        {this.state.signIn ? (
          <Menu.Item
            name='logout'
            onClick={this.handleItemClick}
            className="right"
          >
            <Dropdown className="ui medium header" item text={this.props.userName}>
              <Dropdown.Menu>
                <Link to="/editUser">
                  <Dropdown.Item>
                    <Icon name="edit" verticalAlign='middle' color="black" />
                    <span>Modifier vos informations</span>
                  </Dropdown.Item>
                </Link>
                <CustomModal
                  modalTrigger={
                    <Dropdown.Item>
                      <Icon name="sign out alternate" verticalAlign='middle' color="red" />
                      <span style={{color: "red"}}>Déconnection de tous les appareils</span>
                    </Dropdown.Item>}
                  header='Déconnection de tous les appareils'
                  content='Vous êtes sur le point de déconnecter votre compte de tous les appareils sur lesquel il est connecté. Êtes-vous sûr de vouloir continuer?'
                  onValidate={this.props.logOutAll}
                />
              </Dropdown.Menu>
            </Dropdown>
            <Button content='Déconnection' negative onClick={this.handleLogout}/>
          </Menu.Item>
        ):( 
          <Menu.Item
            name='login'
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