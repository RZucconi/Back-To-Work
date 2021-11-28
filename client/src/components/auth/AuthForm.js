import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Message } from 'semantic-ui-react'

const validate = (formValues) => {
  const errors = {}
  
    if (!formValues.email) {
      errors.email = ' Veuillez entrer un email valide.'
    }

  if (!formValues.password) {
    errors.password = ' Vous devez saisir un mot de passe.'
  }
  return errors
}

export default reduxForm({ form: 'authForm', validate})(class AuthForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <Message
          error
          content={error}
        />
      )
    }
  }

  renderInput = ({ input, type, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`

    return (
      <div className={className}>
          <label>{label}</label>
          <input {...input } type={type} autoComplete="off" />
          {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
  }
  
  render() {
    return (
      <Form error={true} onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="email" type="email" component={this.renderInput} label="Email" />
        <Field name="password" type="password" component={this.renderInput} label="Mot de Passe" />
        <Button positive content="Se connecter" />
        <div className="ui button negative" onClick={this.props.closeModal} >Annuler</div>
      </Form>
      )
    }
  })