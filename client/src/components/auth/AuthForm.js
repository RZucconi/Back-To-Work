import React, { Component } from 'react'
import CustomReduxForm from '../CustomReduxForm'

export default class AuthForm extends Component {
  getFields = () => {
    return [
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

  onSignIn = async (formValues) => {
    await this.props.onSubmit(formValues)
  }
  
  render() {
    return (
      <CustomReduxForm
        formName='AuthForm'
        fields={this.getFields()}
        onSubmit={this.onSignIn}
        cancelButtonPath="/"
        displayCancelButton={false}
      />
    )
  }
}