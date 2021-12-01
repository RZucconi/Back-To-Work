import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

import { onCreateUser } from '../../actions'
import CustomReduxForm from '../CustomReduxForm'

export default connect(null, { onCreateUser })(class SubscribeUser extends Component {
  getFields = () => {
    return [
      {
        name: 'firstName',
        type:  'text',
        label: 'Prénom',
        require: true
      },
      {
        name: 'lastName',
        type:  'text',
        label: 'Nom',
        require: true
      },
      {
        name: 'email',
        type:  'email',
        label: 'Email',
        require: true
      },
      {
        name: 'password',
        type:  'password',
        label: 'Mot de Passe',
        require: true
      }
    ]
  }

  onCreateUser = async (formValues) => {
    await this.props.onCreateUser(formValues)
  }

  render() {
    return(
      <>
        <Header content="Formulaire d' inscription:" />
        <CustomReduxForm 
          formName='subscribeForm'
          fields={this.getFields()}
          onSubmit={this.onCreateUser}
          cancelButtonPath="/"
          displayCancelButton
          />
      </>
    )
  }
})