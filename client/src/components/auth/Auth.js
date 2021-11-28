import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal } from 'semantic-ui-react'
import { signIn } from '../../actions'
import AuthForm from './AuthForm'

const mapStateToProps = (state) => {
  return {
    isSignIn: state.auth.isSignIn, 
    signInError: state.auth.signInError,
    userToken: state.user.userToken
  }
}

export default connect(mapStateToProps, { signIn })(class Auth extends Component {
  state = { firstOpen: false, secondOpen: false }

  onSubmit = async (formValues) => {
    await this.props.signIn(formValues)

    if (this.props.signInError) {
      this.setState({ secondOpen: true })
    } else {
      this.setState({ firstOpen: false })
    }
  }

  closeModal = () => this.setState({ firstOpen: false })

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ firstOpen: true })} color='green'>Login</Button>

        <Modal
          onClose={() => this.setState({ firstOpen: false })}
          onOpen={() => this.setState({ firstOpen: true })}
          open={this.state.firstOpen}
          dimmer='blurring'
        >
          <Modal.Header>
            <p>Connection</p>
          </Modal.Header>
          <Modal.Content>
            <p>Veuillez entrer une adresse email valide et votre mot de passe:</p>
            <AuthForm onSubmit={this.onSubmit} closeModal={this.closeModal} />
          </Modal.Content>
          <Modal
            onClose={() => this.setState({ secondOpen: false })}
            open={this.state.secondOpen}
            size='small'
          >
            <Modal.Header>Erreur de connection</Modal.Header>
            <Modal.Content>
              <p>Email ou mot de passe incorrect.</p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                content='Fermer'
                onClick={() => this.setState({ secondOpen: false})}
              />
            </Modal.Actions>
          </Modal>
        </Modal>
      </div>
    )
  }
})